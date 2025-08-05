<template>
    <div>
        <div class="page-heading">
            <h3>{{ __('dashboard') }}</h3>
        </div>
        <div class="page-content">
            <section class="row">
                <div class="row">
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <router-link to="/delivery_boy/orders">
                                <div class="card-body px-3 py-4-5">
                                    <div class="row">
                                        <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                            <div class="stats-icon blue mb-2">
                                                <img :src="$baseUrl + '/assets/images/dashboard/Total_Orders.svg'" style="height: 31px; width: 33px;">
                                            </div>
                                        </div>
                                        <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                            <h5 class="text-muted font-semibold">{{ __('orders') }}</h5>
                                            <h3 class="font-extrabold mb-0">{{ record.order_count }}</h3>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body px-3 py-4-5">
                                <div class="row">
                                    <div class="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start">
                                        <div class="stats-icon red mb-2">
                                            <i class="fa fa-money"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                        <h5 class="text-muted font-semibold">Balance</h5>
                                        <h3 class="font-extrabold mb-0">{{ $currency+" "+record.balance }}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">{{__('latest_orders')}}</h4>
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
                                                @update="getLatestOrders"
                                                :ranges="customRanges"
                                            ></date-range-picker>
                                            <button class="btn btn-sm btn-danger ml-1" @click="dateRange.startDate = null, dateRange.endDate = null, getLatestOrders()">
                                                {{ __('clear') }}
                                            </button>
                                        </div>
                                    </b-col>

                                    <b-col md="3">
                                        <div class="form-group">
                                            <h6 class="box-title" for="status">{{__('status')}}</h6>
                                            <select id="status" name="status" v-model="status"
                                                    @change="getLatestOrders()" class="form-control form-select">
                                                <option value="">{{__('all_orders')}}</option>
                                                <option v-for="status in statuses" :value='status.id'>{{ status.status }}</option>
                                            </select>
                                        </div>
                                    </b-col>
                                    <b-col md="3"> 
                                        <h6 class="box-title">{{ __('from_and_to_delivery_date') }}</h6>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <date-range-picker
                                                :autoApply=false
                                                :showDropdowns = true
                                                v-model="deliveryDateRange"
                                                :maxDate="maxDate"
                                                @update="getLatestOrders"
                                                :ranges="customRanges"
                                            ></date-range-picker>
                                            <button class="btn btn-sm btn-danger ml-1" @click="deliveryDateRange.startDate = null, deliveryDateRange.endDate = null, getOrders()">
                                                {{ __('clear') }}
                                            </button>
                                        </div>
                                    </b-col>
                                    <b-col md="2">
                                        <h6 class="box-title">{{__('search')}}</h6>
                                        <b-form-input
                                            id="filter-input"
                                            v-model="filter"
                                            type="search"
                                            :placeholder="__('search')"
                                        ></b-form-input>
                                    </b-col>
                                    <b-col md="1" class="text-center">
                                        <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getLatestOrders()">
                                            <i class="fa fa-refresh" aria-hidden="true"></i>
                                        </button>
                                    </b-col>

                                </b-row>
                                <div class="table-responsive">
                                    <b-table
                                        :items="orders"
                                        :fields="orderFields"
                                        :current-page="orderCurrentPage"
                                        :per-page="orderPerPage"
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
                                                <strong>{{__('loading')}}</strong>
                                            </div>
                                        </template>

                                        <template #head(total)="row">
                                            {{ __('total') +' ('+$currency+')' }}
                                        </template>
                                        <template #head(delivery_charge)="row">
                                            {{ __('dcharges')+' ('+$currency+')' }}
                                        </template>
                                        <template #head(tax)="row">
                                            {{ __('tax')+' ('+$currency+') (%)' }}
                                        </template>
                                        <template #head(discount)="row">
                                            {{ __('disc')+' ('+$currency+') (%)' }}
                                        </template>
                                        <template #head(promo_discount)="row">
                                            {{ __('promo_disc')+' ('+$currency+')' }}
                                        </template>
                                        <template #head(wallet_balance)="row">
                                            {{ __('wallet_used')+' ('+$currency+')' }}
                                        </template>
                                        <template #head(final_total)="row">
                                            {{ __('ftotal')+' ('+$currency+')' }}
                                        </template>

                                        <template #cell(mobile)="row">
                                            {{ row.item.mobile | mobileMask }}
                                        </template>

                                        <template #cell(actions)="row">
                                            <router-link
                                                :to="{ name: 'DeliveryBoyOrder',params: { id: row.item.id, record : row.item }}"
                                                v-b-tooltip.hover title="View" class="btn btn-primary btn-sm"><i
                                                class="fa fa-eye"></i></router-link>
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
                                                v-model="orderPerPage"
                                                :options="pageOptions"
                                                size="sm"
                                                class="form-control form-select"
                                            ></b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="4" class="my-1" offset-md="6">
                                        <b-pagination
                                            v-model="orderCurrentPage"
                                            :total-rows="orderTotalRows"
                                            :per-page="orderPerPage"
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
            </section>
        </div>
    </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';
import axios from "axios";
import moment from "moment";
export default {
    name: "range_dates",
    components: {DateRangePicker},
    data: function () {
        let startDate = new Date();
        let endDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        return {
            dateRange: {startDate, endDate},
            deliveryDateRange: { startDate: null, endDate: null },
            customRanges: {
                'Today': this.getTodayRange(),
                'Yesterday': this.getYesterdayRange(),
                'This Week': this.getThisWeekRange(),
                'This Month': this.getThisMonthRange(),
                'This Year': this.getThisYearRange(),
                'Last Month': this.getLastMonthRange(),
            },
            maxDate : new Date(),
            isLoading: false,
            record: {
                balance:0,
                order_count : 0
            },
            orderFields: [
                {key: 'id', label: __('oid'), sortable: true, sortDirection: 'desc'},
                {key: 'user_name', label: __('user'), sortable: true, class: 'text-center'},
                {key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center'},
                {key: 'total', label: __('total'), sortable: true, class: 'text-center'},
                {key: 'delivery_charge', label: __('dcharges'), sortable: true, class: 'text-center'},
                {key: 'final_total', label: __('ftotal'), sortable: true, class: 'text-center'},
                {key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center'},
                {key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center'},
                {key: "actions", label: __('actions')}
            ],

            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,


            statuses: [],
            orders: [],
            orderTotalRows: 1,
            orderCurrentPage: 1,
            orderPerPage: this.$perPage,
            status: "",

        };
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
        this.orderTotalRows = this.orders.length
    },
    created() {
        this.getRecord();
        this.getOrderStatus();
        this.getLatestOrders();
    },
    methods: {
        getTodayRange() {
      let startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Start of today

      let endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // End of today
     this.dateRange = { startDate, endDate };
      //this.deliveryDateRange = { startDate, endDate };
      return [startDate, endDate];
    },
    getYesterdayRange() {
      let endDate = new Date();
      endDate.setDate(endDate.getDate() - 1); // Yesterday

      let startDate = new Date(endDate);
      startDate.setHours(0, 0, 0, 0); // Start of yesterday

      endDate.setHours(23, 59, 59, 999); // End of yesterday

      return [startDate, endDate];
    },
    getThisWeekRange() {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1); // Start of the current week (Sunday as start day)
      startDate.setHours(0, 0, 0, 0); // Start of the day

      let endDate = new Date();
      endDate.setDate(startDate.getDate() + 6); // End of the current week (Saturday as end day)
      endDate.setHours(23, 59, 59, 999); // End of the day

      return [startDate, endDate];
    },
    getThisMonthRange() {
      let startDate = new Date();
      startDate.setDate(1); // Start of the current month
      startDate.setHours(0, 0, 0, 0); // Start of the day

      let endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Move to next month
      endDate.setDate(0); // Last day of the previous month
      endDate.setHours(23, 59, 59, 999); // End of the day

      return [startDate, endDate];
    },
    getThisYearRange() {
      let startDate = new Date();
      startDate.setMonth(0); // Start of the current year
      startDate.setDate(1); // Start of the day

      let endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1); // Move to next year
      endDate.setMonth(0); // Start of next year
      endDate.setDate(0); // Last day of the previous year
      endDate.setHours(23, 59, 59, 999); // End of the day

      return [startDate, endDate];
    },
    getLastMonthRange() {
      let startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1); // Move to last month
      startDate.setDate(1); // Start of the last month
      startDate.setHours(0, 0, 0, 0); // Start of the day

      let endDate = new Date();
      endDate.setDate(0); // Last day of the previous month
      endDate.setHours(23, 59, 59, 999); // End of the day

      return [startDate, endDate];
    },
        getRecord: function () {
            let vm = this;
            this.isLoading = true;
            axios.get(this.$deliveryBoyApiUrl + '/dashboard').then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                this.statuses = response.data.data;
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getLatestOrders: function () {
            this.isLoading = true;
            let vm = this;
            let param = {
                "startDate": (this.dateRange.startDate != null) ? moment(this.dateRange.startDate).format('YYYY-MM-DD'):"",
                "endDate": (this.dateRange.endDate != null) ? moment(this.dateRange.endDate).format('YYYY-MM-DD'):"",
                "status": this.status,
                startDeliveryDate: this.deliveryDateRange.startDate ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: this.deliveryDateRange.endDate ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
            }
            axios.get(this.$deliveryBoyApiUrl + '/orders', {
                params: param
            }).then((response) => {
                let data = response.data;
                if (data.status === 1) {
                    this.orders = response.data.data.orders;
                    this.orderTotalRows = this.orders.length;
                    this.isLoading = false
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
    },
};
</script>

<style scoped>
@import "../../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";
.vue-daterange-picker[data-v-1ebd09d2] {
    min-width: 80%;
}
@media only screen and (min-width: 600px) {
    .vue-daterange-picker[data-v-1ebd09d2] {
        min-width: 90%;
    }
}

.btn_product_count{
    margin-bottom: 10px;
}
</style>
