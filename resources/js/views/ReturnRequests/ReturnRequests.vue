<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Return Requests</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Return Requests</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Return Requests</h4>
                    </div>
                    <div class="card-body">

                        <b-row class="mb-2">
                            <b-col md="3" offset-md="8">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input id="filter-input" v-model="filter" type="search"
                                              :placeholder="__('search')"></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getReturnRequests()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>

                        <b-table
                            :items="returnRequests"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :filter-included-fields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            :bordered="true"
                            :busy="isLoading"
                            stacked="md"
                            show-empty
                            small>

                            <template #table-busy>
                                <div class="text-center text-black my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>{{ __('loading') }}...</strong>
                                </div>
                            </template>

                            <template #head(price)="row">
                                {{'Price ('+$currency+')' }}
                            </template>
                            <template #head(discounted_price)="row">
                                {{'Discounted Price ('+$currency+')' }}
                            </template>

                            <template #cell(status)="row">
                                <span v-if="row.item.status === 1" class="badge bg-warning">Pending</span>
                                <span v-else-if="row.item.status === 2" class="badge bg-success">Approved</span>
                                <span v-else-if="row.item.status === 3" class="badge bg-danger">Rejected</span>
                                <span v-else class="badge bg-danger">Undefine</span>
                            </template>
                            <template #cell(created_at)="row">
                                {{ new Date(row.item.created_at).toLocaleString() }}
                            </template>
                            <template #cell(actions)="row">
                                <button class="btn btn-sm btn-secondary" @click="edit_record = row.item" v-if="$can('return_request_update')" v-b-tooltip.hover :title="__('edit')"><i class="fa fa-pencil-alt"></i></button>
                                <button class="btn btn-sm btn-danger" @click="deleteReturnRequests(row.index,row.item.id)" v-if="$can('return_request_delete')" v-b-tooltip.hover :title="__('delete')"><i class="fa fa-trash"></i></button>
                            </template>

                        </b-table>

                        <b-row>
                            <b-col  md="2" class="my-1">
                                <b-form-group
                                    :label="__('per_page')"
                                    label-for="per-page-select"
                                    label-align-sm="right"
                                    label-size="sm"
                                    class="mb-0">
                                    <b-form-select
                                        id="per-page-select"
                                        v-model="perPage"
                                        :options="pageOptions"
                                        size="sm"
                                        class="form-control form-select"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col  md="4" class="my-1" offset-md="6">
                                <b-pagination
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    align="fill"
                                    size="sm"
                                    class="my-0"
                                ></b-pagination>
                            </b-col>
                        </b-row>

                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record
            v-if="create_new || edit_record"
            :record="edit_record"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
export default {
    components: {
        'app-edit-record' : EditRecord,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
                { key: 'user_id', label: 'U.ID', sortable: true, class: 'text-center' },
                { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
                { key: 'product_name', label: 'Product Name', sortable: true, class: 'text-center' },
                // { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
                // { key: 'discounted_price', label: 'Discounted Price', sortable: true, class: 'text-center' },
                { key: 'quantity', label: 'Quantity', sortable: true, class: 'text-center' },
                { key: 'sub_total', label: 'Total', sortable: true,  class: 'text-center' },
                { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
                { key: 'reason', label: 'Reason', sortable: true, class: 'text-center' },
                { key: 'created_at', label: 'Date', sortable: true, class: 'text-center' },
                { key: 'actions', label: 'Action' }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,
            sectionStyle : 'style_1',
            max_visible_units : 12,
            max_col_in_single_row : 3,
            create_new : null,
            edit_record : null,
            returnRequests: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.returnRequests.length
    },
    created: function() {
        this.$eventBus.$on('returnRequestSaved', (message) => {
            this.showMessage("success", message);
            this.getReturnRequests();
            this.create_new = null;
        });
        this.getReturnRequests();
    },
    methods: {
        getReturnRequests(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/return_requests')
                .then((response) => {
                    this.returnRequests = response.data.data;
                    this.totalRows = this.returnRequests.length;
                    this.isLoading = false;
                });
        },
        deleteReturnRequests(index, id){
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want be able to revert this",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id : id
                    }
                    axios.post(this.$apiUrl + '/return_requests/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.returnRequests.splice(index, 1)
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
