<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('manage_customer_wallet') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('manage_customer_wallet') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('wallet_transactions') }}</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary" @click="create_new=true">{{ __('add_transactions') }}</button>
                        </span>
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
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getWalletTransactions()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                                :items="walletTransactions"
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

                                <template #cell(type)="row">
                                    <span v-if="row.item.type === 'credit'" class="badge bg-success">{{ __('credit') }}</span>
                                    <span v-else class="badge bg-danger">{{ __('debit') }}</span>
                                </template>

                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>
                                <template #cell(updated_at)="row">
                                    {{ new Date(row.item.updated_at).toLocaleString() }}
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
                {key: 'id', label:  __('id') , sortable: true, sortDirection: 'desc'},
                {key: 'user_id', label:  __('user_id'), sortable: true, class: 'text-center'},
                {key: 'name', label:  __('user_name'), sortable: true, class: 'text-center'},
                {key: 'type', label:  __('type'), sortable: true, class: 'text-center'},
                {key: 'payment_type', label:  __('payment_type'), sortable: true, class: 'text-center'},
                {key: 'txn_id', label:  __('txn_id'), sortable: true, class: 'text-center'},
                {key: 'amount', label:  __('amount'), sortable: true, class: 'text-center'},
                {key: 'message', label:  __('message'), sortable: true, class: 'text-center'},
                {key: 'created_at', label:  __('transaction_date'), sortable: true, class: 'text-center'},
                {key: 'updated_at', label:  __('last_updated'), sortable: true, class: 'text-center'}
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
            walletTransactions: [],
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
        this.totalRows = this.walletTransactions.length
    },
    created: function () {
        this.$eventBus.$on('walletTransactionsSaved', (message) => {
            //this.showSuccess(message);
            this.showMessage("success", message);
            this.getWalletTransactions();
            this.create_new = null;
        });
        this.getWalletTransactions();
    },
    methods: {
        getWalletTransactions() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/wallet_transactions')
                .then((response) => {
                    this.isLoading = false
                    this.walletTransactions = response.data.data.walletTransactions;
                    this.customers = response.data.data.customers;
                    this.totalRows = this.walletTransactions.length
                });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
    }
};
</script>
