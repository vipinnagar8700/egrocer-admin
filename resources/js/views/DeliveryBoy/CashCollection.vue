<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Cash Collection</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/delivery_boy/dashboard">Dashboard</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">Cash Collection</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="row">
                    <div class="col-6 col-lg-3 col-md-6 col-xl-8 col-xxl-4">
                        <div class="card">
                            
                                <div class="card-body px-3 py-4-5">
                                    <div class="row">
                                        <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                            <div class="stats-icon purple mb-2">
                                                <i class="fa fa-handshake-o"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h5 class="text-muted font-semibold">Cash In Hand</h5>
                                            <h3 class="font-extrabold mb-0">{{ $currency+" "+cash_in_hand }}</h3>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                    <div class="col-6 col-lg-3 col-md-6 col-xl-8 col-xxl-4">
                        <div class="card">
                            <div class="card-body px-3 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon green mb-2">
                                            <i class="fa fa-money"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h5 class="text-muted font-semibold">Cash Collected</h5>
                                        <h3 class="font-extrabold mb-0">{{ $currency+" "+Math.abs(cash_collected) }}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Cash Collection list</h4>
                    </div>
                    <div class="card-body">
                        <b-row class="mb-2">
                            <b-col md="3">
                                <h6 class="box-title">From & To Date</h6>
                                <div class="d-flex justify-content-center align-items-center">
                                    <date-range-picker
                                        :autoApply=false
                                        :showDropdowns = true
                                        v-model="dateRange"
                                        :maxDate="maxDate"
                                        @update="getTransactions"
                                    ></date-range-picker>
                                    <button class="btn btn-sm btn-danger ml-1" @click="dateRange.startDate = null, dateRange.endDate = null, getTransactions()">
                                        {{ __('clear') }}
                                    </button>
                                </div>
                            </b-col>

                            <b-col md="3" offset-md="5">
                                <h6 class="box-title">Search</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Search"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getTransactions()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                                :items="transactions"
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
                                 <template #cell(amount)="row">
                                    <span v-if="row.item.type === 'Delivery Boy Cash Collection'">{{row.item.collected_amount}}</span>
                                    <span v-else >{{row.item.amount}}</span>
                                </template>
                                <!-- <template #cell(status)="row">
                                    <span v-if="row.item.status === '1'" class="badge bg-success">Active</span>
                                    <span v-else class="badge bg-danger">Deactive</span>
                                </template> -->
                                <template #head(amount)="row">
                                    {{ __('amount') }}{{' ('+$currency+')' }}
                                </template>
                                <template #cell(created_at)="row">
                                    {{ new Date(row.item.transaction_date).toLocaleString() }}
                                </template>
                                 <template #cell(status)="row">
                                    <div class="badge bg-success">
                                    {{ row.item.status }}
                                    </div>
                                </template>
                            </b-table>
                        </div>

                        <b-row>
                            <div class="col-md-4 text-success h6">Total Amount :- {{ $currency }} {{ total_amount }}</div>
                        </b-row>

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
import DateRangePicker from 'vue2-daterange-picker'
import moment from "moment";
export default {
    name: "range_dates",
    components: {DateRangePicker},
    data: function () {
        return {
            dateRange: {startDate:null, endDate:null},
            maxDate : new Date(),
            fields: [
                {key: 'id', label: 'ID', sortable: true, sortDirection: 'desc'},
                {key: 'order_id', label: 'Order Id', sortable: true, class: 'text-center'},
                 {key: 'message', label: 'Message', sortable: true, class: 'text-center'},
                {key: 'amount', label: 'Amount', sortable: true, class: 'text-center'},
                {key: 'status', label: 'Status', sortable: true, class: 'text-center'},
                {key: 'transaction_date', label: 'Date Time', sortable: true, class: 'text-center'}
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

            transactions: [],
            cash_in_hand:0,
            cash_collected:0,
            total_amount:0
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
        this.totalRows = this.transactions.length
    },
    created: function () {
        this.$eventBus.$on('transactionsSaved', (message) => {
            //this.showSuccess(message);
            this.showMessage("success", message);
            this.getTransactions();
            this.create_new = null;
        });
        this.getTransactions();
    },
    methods: {
        getTransactions() {
            this.isLoading = true
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD'):"",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD'):"",
            }
            axios.get(this.$deliveryBoyApiUrl + '/cash_collection',{
                params: param
            }).then((response) => {
                this.transactions = response.data.data.transactions;
                this.cash_in_hand = response.data.data.cash_in_hand;
                this.cash_collected = response.data.data.cash_collected;

                this.totalRows = this.transactions.length;
                this.total_amount = this.transactions.map(item => item.amount).reduce((prev, curr) => prev + curr, 0).toFixed(2);

                this.isLoading = false;
            });
        },
    }
};
</script>
<style>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";
.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}
@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}
</style>
