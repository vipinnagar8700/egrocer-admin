<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Fund Transfers</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/delivery_boy/dashboard">Dashboard</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Fund Transfers</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Fund Transfers</h4>
                        <span class="pull-right">
                            <button class="btn btn-primary" @click="create_new=true"
                                    v-if="$can('fund_transfers_create')">Add Fund Transfers</button>
                        </span>
                    </div>
                    <div class="card-body">
                        <b-row class="mb-2">
                            <b-col md="3" offset-md="8">
                                <h6 class="box-title">Search</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getFundTransfers()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                                :items="fundTransfers"
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
                                <template #head(opening_balance)="row">
                                    {{'Opening Balance ('+$currency+')' }}
                                </template>
                                <template #head(closing_balance)="row">
                                    {{'Closing Balance ('+$currency+')' }}
                                </template>
                                <template #head(amount)="row">
                                    {{'Amount ('+$currency+')' }}
                                </template>

                                <template #cell(type)="row">
                                    <span v-if="row.item.type === 'credit'" class="badge bg-success">Credit</span>
                                    <span v-else class="badge bg-danger">Debit</span>
                                </template>

                                <template #cell(status)="row">
                                    <span v-if="row.item.status === '1'" class="badge bg-success">Active</span>
                                    <span v-else class="badge bg-danger">Deactive</span>
                                </template>
                                

                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.created_at).toLocaleString() }}
                                </template>

                            </b-table>
                        </div>
                        <b-row>
                            <b-col md="2" class="my-1">
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
                            <b-col md="4" class="my-1" offset-md="6">
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
    </div>
</template>
<script>

export default {

    data: function () {
        return {
            fields: [
                {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc'},
                {key: 'opening_balance', label: 'Opening Balance', sortable: true, class: 'text-center'},
                {key: 'closing_balance', label: 'Closing Balance', sortable: true, class: 'text-center'},
                {key: 'amount', label: 'Amount', sortable: true, class: 'text-center'},
                {key: 'type', label: 'Type', sortable: true, class: 'text-center'},
                {key: 'message', label: 'Message', sortable: true, class: 'text-center'},
                {key: 'status', label: 'Status', sortable: true, class: 'text-center'},
                {key: 'created_at', label: 'Date Created', sortable: true, class: 'text-center'}
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

            max_visible_units: 12,
            max_col_in_single_row: 3,

            fundTransfers: [],
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
        this.totalRows = this.fundTransfers.length
    },
    created: function () {
        this.getFundTransfers();
    },
    methods: {
        getFundTransfers() {
            this.isLoading = true
            axios.get(this.$deliveryBoyApiUrl + '/fund_transfers')
                .then((response) => {
                    this.isLoading = false
                    this.fundTransfers = response.data.data;
                    this.totalRows = this.fundTransfers.length;
                    this.isLoading = false;
                });
        },
    }
};
</script>
