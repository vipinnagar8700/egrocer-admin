<template>
    <div>
        <div class="page-heading">
            <div class="row">
            <div class="col-12 col-md-6 order-md-1 order-last">
                <h3>{{ __('manage_sellers') }}</h3>
            </div>
            <div class="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">{{ __('manage_sellers') }}</li>
                    </ol>
                </nav>
            </div>
        </div>
            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('sellers') }}</h4>
                            <span class="pull-right">
                                <router-link to="/sellers/create" class="btn btn-primary" v-b-tooltip.hover  title="Add New Seller" v-if="$can('seller_create')">{{ __('add_seller') }}</router-link>
                            </span>
                        </div>
                        <div class="card-body">

                            <b-row>
                                <b-col md="3">

                                    <div class="form-group">
                                        <h6 for="filterStatus">Filter Seller by Status {{ __('filter_seller_by_status') }}</h6>
                                        <select id="filterStatus" name="filterStatus" v-model="filterStatus" @change="getRecords()" class="form-control form-select">
                                            <option value=""> {{ __('all') }}</option>
                                            <option value="0"> {{ __('registered') }}</option>
                                            <option value="1"> {{ __('approve') }}</option>
                                            <option value="2"> {{ __('not_approved') }}</option>
                                            <option value="3"> {{ __('deactivate') }}</option>
                                            <option value="7"> {{ __('removed') }}</option>
                                        </select>
                                    </div>
                                </b-col>
                                <b-col md="3" offset-md="5">
                                    <h6 class="box-title">{{ __('search') }}</h6>
                                    <b-form-input
                                        id="filter-input"
                                        v-model="filter"
                                        type="search"
                                        placeholder="Search"
                                    ></b-form-input>
                                </b-col>
                                <b-col md="1" class="text-center">
                                    <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getRecords()">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </b-col>
                            </b-row>
                            <b-row class="table-responsive">
                            <b-table
                                :items="records"
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

                                <template #cell(email)="row">
                                    {{ row.item.email | emailMask }}
                                </template>
                                <template #cell(mobile)="row">
                                    {{ row.item.mobile | mobileMask }}
                                </template>

                                <template #cell(logo)="row">
                                    <span v-if="!row.item.logo"> {{ __('no_image') }}</span>
                                    <img v-else :src="$storageUrl + row.item.logo" height="50" />
                                </template>
                                <template #cell(catWiseEditCommission)="row">
                                    <button class="btn btn-sm btn-primary" @click="edit_record = row.item" v-if="$can('seller_update')"><i class="fa fa-edit"></i></button>
                                </template>

                                <template #cell(status)="row">
                                    <label v-if="row.item.status == 0" class='badge bg-primary'>{{ __('registered') }}</label>
                                    <label v-else-if="row.item.status == 1" class='badge bg-success'>{{ __('approved') }}</label>
                                    <label v-else-if="row.item.status == 2" class='badge bg-warning'>{{ __('not_approved') }}</label>
                                    <label v-else-if="row.item.status == 3" class='badge bg-danger'> {{ __('deactive') }}</label>
                                    <label v-else-if="row.item.status == 7" class='badge bg-danger'> {{ __('removed') }}</label>
                                </template>
                                <template #cell(require_products_approval)="row">
                                    <label v-if="row.item.require_products_approval == 1" class='badge bg-success'> {{ __('yes') }}</label>
                                    <label v-else-if="row.item.require_products_approval == 0" class='badge bg-danger'> {{ __('no') }}</label>
                                </template>
                                <template #cell(availability)="row">
                            <span  v-if="$can('seller_update')" @click="updateStatusSeller(row.index,row.item.id,row.item.status)">
                                <span class="primary-toggal" v-if="row.item.status == 1">
                                    <a class="btn btn-sm">
                                <i class="fa fa-toggle-on fa-2x"></i>
                                    </a>
                                </span>
                                <span class="text-danger" v-if="row.item.status == 3">
                                    <a class="btn btn-sm">
                                <i class="fa fa-toggle-off fa-2x"></i>
                                </a>
                                </span>
                            </span>
                            </template>
                            <template #cell(categories_array)="row">
                                <small :id="'bonus'+row.item.id" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                    <i class="fa fa-info-circle"></i>
                                </small>
                                <b-popover :target="'bonus'+row.item.id" triggers="hover" placement="left">
                                   
                                   {{row.item.categories_array}}
                                </b-popover>
                                {{ row.item.bonus_percentage }}
                            </template>
                                <template #cell(actions)="row">
                                    <router-link :to="{ name: 'EditSeller',params: { id: row.item.id, record : row.item }}" v-b-tooltip.hover title="Edit" class="btn btn-primary btn-sm" v-if="$can('seller_update')" v-b-tooltip.hover :title="__('edit')">
                                        <i class="fa fa-pencil-alt"></i>
                                    </router-link>
                                    <button class="btn btn-sm btn-danger" @click="deleteSeller(row.index,row.item.id)" v-if="$can('seller_delete')" v-b-tooltip.hover :title="__('delete')">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </template>

                            </b-table>
                            </b-row>

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
                                    <label>{{__('total_records')}} :- {{ totalRows }} </label>
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
                </div>
            </div>
        </div>
        <!-- Add / Edit -->
        <app-edit-record
            v-if="edit_record"
            :record="edit_record"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Commissions/Edit.vue';
export default {
    components: {
        'app-edit-record' : EditRecord,
    },
    data: function() {
        return {
            fields: [
                { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc' },
                { key: 'name', label:  __('name'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'store_name', label:  __('store_name'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'email', label:  __('email'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'mobile', label:  __('mobile'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'balance', label:  __('balance'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'logo', label:  __('logo'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'commission', label:  __('commission'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'categories_array', label:  __('categories'), class: 'text-center', sortable: true, sortDirection: 'desc' }, 
                { key: 'status', label:  __('status'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'availability', label:  __('availability'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'require_products_approval', label:  __('require_products_approval'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'actions', label:  __('action') }
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
            records: [],
            edit_record : null,
            filterStatus : ""
        }
    },
    created: function() {
        this.category_id = this.$route.params.id;
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });
        this.$eventBus.$on('commissionsSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });
        this.getRecords();
    },
    methods: {
        getRecords(){
            this.isLoading = true;
            axios.get(this.$apiUrl + '/sellers', {
                params: {
                        filterStatus: this.filterStatus
                }
            }).then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.records = data.data;
                    this.totalRows = this.records.length
                });
            },
        updateStatusSeller(index, id, status) {
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want to change status.",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true;
                    let newStatus = status === 1 ? 3 : 1;
                    let postData = {
                        id: id,
                        status : newStatus
                    }
                    axios.post(this.$apiUrl + '/sellers/update_status', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.getRecords();
                            this.showMessage("success", response.data.message);
                        });
                }
            });
        },
        deleteSeller(index, id){
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
                    axios.post(this.$apiUrl + '/sellers/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.records.splice(index, 1)
                            this.showMessage('success', data.message);
                        });
                }
            });
        },
        updateSellerCommission(){
            this.$swal.fire({
                title: "Are you sure you want to credit seller commission?",
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
                    axios.get(this.$apiUrl + '/sellers/updateCommission')
                        .then((response) => {
                            let data = response.data;
                            if (data.status === 1) {
                                //this.showSuccess(data.message)
                                this.showMessage('success', data.message);
                            }else{
                                this.showError(data.message);
                            }
                            this.isLoading = false
                        });
                }
            });
        },
        hideModal() {
            this.edit_record = false
        },
    }
};
</script>
