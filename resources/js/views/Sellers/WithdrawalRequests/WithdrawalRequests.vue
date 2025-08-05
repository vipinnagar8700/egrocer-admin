<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('manage_withdrawal_requests') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('manage_withdrawal_requests') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('withdrawal_request') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary" @click="create_new=true">{{ __('create_withdraw_request') }}</button>
                        </span>
                    </div>
                    <div class="card-body">
                        <b-row class="mb-2">
                            <b-col md="3" offset-md="5">
                                <h6 class="box-title">{{ __('filter_by_status') }}</h6>
                                <form method="post">
                                    <select @change="getWthdrawalRequests()" v-model="status"
                                            class="form-control form-select">
                                        <option value="">{{__('select_status')}}</option>
                                        <option value="0">{{__('pending')}}</option>
                                        <option value="1">{{__('approved')}}</option>
                                        <option value="2">{{__('rejected')}}</option>
                                    </select>
                                </form>
                            </b-col>
                            <b-col md="3" >
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getWthdrawalRequests()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                            :items="withdrawalRequests"
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
                            <template #head(amount)="row">
                                {{'Amount ('+$currency+')' }}
                            </template>
                           
                            <template #cell(status)="row">
                                <span v-if="row.item.status === 0" class="badge bg-warning">{{ __('pending') }}</span>
                                <span v-else-if="row.item.status === 1" class="badge bg-success">{{ __('approved') }}</span>
                                <span v-else-if="row.item.status === 2" class="badge bg-danger">{{ __('rejected') }}</span>
                                <span v-else class="badge bg-danger">{{ __('undefine') }}Undefine</span>
                            </template>
                            <template #cell(receipt_image)="row">
                                    <img :src="row.item.receipt_image_url" height="50" />
                                </template>
                            <template #cell(created_at)="row">
                                {{ new Date(row.item.created_at).toLocaleString()  }}
                            </template>
                            <template #cell(message)="row">
                                <small :id="'bonus'+row.item.id" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                    <i class="fa fa-info-circle"></i>
                                </small>
                                <b-popover :target="'bonus'+row.item.id" triggers="hover" placement="left">
                                    {{ row.item.message }}
                                </b-popover>

                            </template>
                        </b-table>
                        </div>
                        <b-row>
                            <b-col md="2" class="my-1">
                                <label>
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
                                </label>
                            </b-col>
                            <b-col md="4" class="my-1" offset-md="6">
                                <label>{{__('total_records')}}:- {{ totalRows }}</label>
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
            :customers="customers"
            :balance="balance"
            @modalClose="hideModal()"
        ></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
               { key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc' },
                { key: 'amount', label: __('amount'), sortable: true, class: 'text-center' },            
                { key: 'message', label: __('message'), sortable: true,  class: 'text-center',tdClass: 'custom-message-width'  },
                { key: 'status', label: __('status'), sortable: true, class: 'text-center' },
                { key: 'remark', label: __('remark'), sortable: true, class: 'text-center',tdClass: 'custom-message-width' },
                { key: 'receipt_image', label: __('receipt_image'), sortable: true, class: 'text-center' },
                { key: 'created_at', label:__('date'), sortable: true, class: 'text-center' },
               
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
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,

            customers: null,
            withdrawalRequests: [
                
            ],
            balance: 0,
            status : ""
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return {text: f.label, value: f.key}
                })
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.withdrawalRequests.length
    },
   
    created: function () {
        this.$eventBus.$on('withdrawalRequestsSaved', (message) => {
            this.showMessage("success", message);
            this.getWthdrawalRequests();
            this.create_new = null;
        });
        this.getWthdrawalRequests();
    },
    methods: {
        getWthdrawalRequests() {
            this.isLoading = true
            let param = {
                "status": this.status
            }
            axios.get(this.$apiUrl + '/withdrawal_requests/get',{
                params: param
            }).then((response) => {
                    this.isLoading = false
                    this.withdrawalRequests = response.data.data.withdraw_requests;
                    this.totalRows = this.withdrawalRequests.length;
                    this.balance = response.data.data.balance
                });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
