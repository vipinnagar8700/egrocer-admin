<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('delivery_boys') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('new_registered_delivery_boys') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('new_registered_delivery_boys') }}</h4>
                    </div>
                    <div class="card-body">

                        <b-row class="mb-2">
                            <b-col md="3" offset-md="8">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getDeliveryBoys()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                        <b-table
                            :items="deliveryBoys"
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

                           
                            <template #cell(mobile)="row">
                                {{ row.item.mobile | mobileMask }}
                            </template>
                            <template #cell(status)="row">
                                <label v-if="row.item.status == 0" class='badge bg-primary'>{{ __('registered') }}</label>
                                <label v-else-if="row.item.status == 1" class='badge bg-success'>{{ __('active') }}</label>
                                <label v-else-if="row.item.status == 2" class='badge bg-warning'>{{ __('not_approved') }}</label>
                                <label v-else-if="row.item.status == 3" class='badge bg-danger'>{{ __('deactive') }}</label>
                                <label v-else-if="row.item.status == 7" class='badge bg-danger'>{{ __('removed') }}</label>
                            </template>

                            <template #cell(is_available)="row">
                                <span v-if="row.item.status == 1" class="badge bg-success">{{ __('yes') }}</span>
                                <span v-else class="badge bg-danger">{{ __('no') }}</span>
                            </template>
                            <template #cell(bonus_percentage)="row">
                                <small :id="'bonus'+row.item.id" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                    <i class="fa fa-info-circle"></i>
                                </small>
                                <b-popover :target="'bonus'+row.item.id" triggers="hover" placement="left">
                                    <template #title>
                                         {{ __('bonus_details') }}
                                    </template>
                                    <table class="table table-borderless">
                                        <tr>
                                            <th> {{ __('bonus_type') }}</th>
                                            <td class="text-center">{{ row.item.bonus_type === 1?"Commission":"Fixed/Salaried" }}</td>
                                        </tr>
                                        <tr>
                                            <th>  {{ __('min_amount') }}({{ $currency }})</th>
                                            <td class="text-end">{{ row.item.bonus_min_amount }}</td>
                                        </tr>
                                        <tr>
                                            <th>  {{ __('max_amount') }}({{ $currency }})</th>
                                            <td class="text-end">{{ row.item.bonus_max_amount }}</td>
                                        </tr>
                                    </table>
                                </b-popover>
                                {{ row.item.bonus_percentage }}
                            </template>
                             <template #cell(documents)="row">
                                    <small :id="'other'+row.item.id" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                        <i class="fa fa-info-circle"></i>
                                    </small>
                                    <b-popover :target="'other'+row.item.id" triggers="hover" placement="left">
                                        <template #title>
                                             {{__('store_details')}}
                                        </template>
                                        
                                        <p> <a target="_blank" :href="row.item.driving_license_url" class="badge bg-success"> <i class="fa fa-eye"></i>  {{__('driving_licence')}}</a></p>
                                        <p><a target="_blank" :href="row.item.national_identity_card_url" class="badge bg-success"> <i class="fa fa-eye"></i>  {{__('national_identity_card')}} </a></p>
                                    </b-popover>
                                    {{ row.item.store_name }}
                                </template>
                            <template #cell(created_at)="row">
                                {{ new Date(row.item.created_at).toLocaleDateString('en-GB') }}
                            </template>
                            <template #cell(dob)="row">
                               {{ new Date(row.item.dob).toLocaleDateString('en-GB') }}
                            </template>
                            <template #cell(actions)="row">
                                <button class="btn btn-sm btn-success"
                                        type="button"
                                        @click="updateStatus(row.index,row.item.id, 1)" v-if="$can('delivery_boy_update')" v-b-tooltip.hover title="Change Status">
                                    Approved
                                </button>
                                <button class="btn btn-sm btn-danger"
                                        type="button"
                                        @click="updateStatus(row.index,row.item.id, 2)" v-if="$can('delivery_boy_update')" v-b-tooltip.hover title="Change Status">
                                    Reject
                                </button>

                            </template>
                            

                        </b-table>
                        </div>
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
                { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc' },
                { key: 'name', label: __('name'), sortable: true, class: 'text-center' },
                { key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center' },
                { key: 'admin.email', label: __('email'), sortable: true,  class: 'text-center' },
                { key: 'bonus_percentage', label: __('bonus'), sortable: true, class: 'text-center' },
                { key: 'documents', label: __('documents'), sortable: true, class: 'text-center' },
                { key: 'dob', label: __('date_of_birth'), sortable: true,  class: 'text-center' },
                { key: 'city.formatted_address', sortable: true, label: __('city'),  class: 'text-center' },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'created_at', label: __('date'),  class: 'text-center' },
                { key: 'actions', label: __('actions') }
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

            categories: null,
            products: null,

            deliveryBoys: [],
            filterStatus : 0
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
        this.totalRows = this.deliveryBoys.length
    },
    watch: {
        $route(to, from) {
            this.showCreateModal();
        }
    },
    created: function() {
        this.showCreateModal();
        this.$eventBus.$on('deliveryBoysSaved', (message) => {
            this.showMessage("success", message);
            this.getDeliveryBoys();
            this.create_new = null;
        });
        this.getDeliveryBoys();
    },
    methods: {
        getDeliveryBoys(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/delivery_boys',{
                params: {
                    filterStatus: this.filterStatus
                }
            })
                .then((response) => {
                    this.isLoading = false
                    this.deliveryBoys = response.data.data;
                    this.totalRows = this.deliveryBoys.length
                });
        },
        updateStatus(index, id, selectedStatus){
            this.$swal.fire({
                title: "Are you Sure?",
                text: "You want be able to revert this",
                confirmButtonText: "Yes, Sure",
                cancelButtonText: "Cancel",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(async result => {
                if (result.value) {
                    let remarks = "";
                    if (selectedStatus === 2) {
                        const {value: text} = await this.$swal.fire({
                            title: 'Remarks',
                            input: 'textarea',
                           
                            inputPlaceholder: 'Type your remarks here...',
                            inputAttributes: {
                                'aria-label': 'Type your remarks here'
                            },
                            confirmButtonText: "Submit",
                            cancelButtonText: "Cancel",
                            showCancelButton: true,

                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    if (value !== '') {
                                        resolve()
                                    } else {
                                        resolve('The Remarks field is required')
                                    }
                                })
                            }
                        })
                        if (text) {
                            remarks = text;
                        }
                    }
                    if (selectedStatus === 1 || (selectedStatus === 2 && remarks !== "") ){
                        this.isLoading = true
                        let postData = {
                            id : id,
                            status: selectedStatus,
                            remark : remarks
                        }

                        axios.post(this.$apiUrl + '/delivery_boys/update-status',postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                this.getDeliveryBoys();
                                this.showMessage('success', data.message);
                            });
                    }
                }
            });
        },



        deleteDeliveryBoys(index, id){
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
                    axios.post(this.$apiUrl + '/delivery_boys/delete',postData)
                        .then((response) => {
                            this.isLoading = false
                            this.deliveryBoys.splice(index, 1)
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
        showCreateModal(){
            let create = this.$route.params.create;
            if(create){
                this.create_new = true;
            }
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
            this.$router.push({path: '/delivery_boys'});
        },
    }
};
</script>
