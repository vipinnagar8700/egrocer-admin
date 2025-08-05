<template>
    <div>
        <div class="page-heading">
            <h3>{{ __('dashboard') }}</h3>
        </div>
        <div class="page-content">
            <section class="row">
                <div class="row">
                    <div class="col-12 col-lg-7 col-md-6 dashboard-counter">
                        <div class="row">
                            <div class="col-6 col-lg-3 col-md-3 col-sm-6"> 
                                <div class="card">
                                    <router-link to="/orders">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row d-flex flex-column justify-content-center ">
                                                <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                    <div class="stats-icon-big blue">
                                                        <img :src="$baseUrl + '/assets/images/dashboard/Total_Orders.svg'">
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                    <h3 class="font-extrabold mb-0">{{ record.order_count }}</h3>
                                                    <h5 class="text-muted font-semibold">{{ __('orders') }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3 col-sm-6"> 
                                <div class="card">
                                    <router-link to="/manage_products">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                <div class="stats-icon-big orange">
                                                    <i class="fa fa-cubes"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                <h3 class="font-extrabold mb-0">{{ record.product_count }}</h3>
                                                <h5 class="text-muted font-semibold">{{ __('products') }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/users">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                    <div class="stats-icon-big sky">
                                                        <img :src="$baseUrl + '/assets/images/dashboard/Total_Customers.svg'">
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                    <h3 class="font-extrabold mb-0">{{ record.customer_count }}</h3>
                                                    <h5 class="text-muted font-semibold">{{__('customers')}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/sellers">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row">
                                                <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                    <div class="stats-icon-big lightgreen">
                                                        <i class="fa fa-solid fa-store"></i>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                    <h3 class="font-extrabold mb-0">{{ record.seller_count }}</h3>
                                                    <h5 class="text-muted font-semibold">{{__('sellers')}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                       
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/manage_categories">
                                        <div class="card-body px-3 py-4-5">
                                            <div class="row d-flex flex-column justify-content-center ">
                                                <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                    <div class="stats-icon-big lightgreen">
                                                        <i class="fa fa-bullseye"></i>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                    <h3 class="font-extrabold mb-0">{{ record.category_count }}</h3>
                                                    <h5 class="text-muted font-semibold">{{ __('categories') }}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/brands">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                <div class="stats-icon-big sky">
                                                    <i class="fa fa-code-branch"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                <h3 class="font-extrabold mb-0">{{ record.brand_count }}</h3>
                                                <h5 class="text-muted font-semibold">{{ __('brands') }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/sections">
                                    <div class="card-body px-0 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                <div class="stats-icon-big orange">
                                                    <i class="fa fa-puzzle-piece"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                <h3 class="font-extrabold mb-0">{{ record.section_count }}</h3>
                                                <h5 class="text-muted font-semibold">{{ __('sections') }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3 col-md-3"> 
                                <div class="card">
                                    <router-link to="/cities">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12 d-flex justify-content-center align-items-center">
                                                <div class="stats-icon-big blue">
                                                    <i class="fa fa-map"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mt-3 d-flex flex-column justify-content-center align-items-center">
                                                <h3 class="font-extrabold mb-0">{{ record.city_count }}</h3>
                                                <h5 class="text-muted font-semibold">{{ __('city') }}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                       
                    </div>

                    <div class="col-12 col-lg-5 col-md-6 product_category_count">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title text-center">{{__('product_category_count')}}</h4>
                            </div>
                            <div class="card-body">
                                <apexcharts width="100%" type="pie"
                                    :options="options2"
                                    :series="series2"
                                ></apexcharts>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">

                    <div class="col-12 col-lg-8 col-md-8 col-8">
                        <div class="card h-95">
                            <div class="card-header">
                                <h4 class="card-title me-1">{{__('weekly_sales')}}</h4>
                                <p>{{__('total_sale_in_last_week')}} ({{__('month')}}: {{ currentMonth }})</p>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <apexchart width="700" height="260" :options="options" :series="series"
                                               ref="apexBarChart"></apexchart>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-4 col-md-4 col-4 products_sold">
                        <div class="row">
                            <div class="col-12 col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h6> {{ __('packet_products') }} </h6>
                                    </div>
                                    <div class="card-body">
                                        <h2 class="text-center">{{ record.packet_products }}</h2>

                                        <router-link :to="{ name: 'ProductInfo',params: { type: 'packet_products' }}"
                                                    class="btn btn-block btn-light-primary btn-lg btn_product_count">{{ __('more_info')}}
                                        </router-link>
                                    </div>

                                </div>
                            </div>
                            <div class="col-12 col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h6> {{ __('loose_products') }} </h6>
                                    </div>
                                    <div class="card-body">
                                        <h2 class="text-center">{{ record.loose_products }}</h2>
                                        <router-link :to="{ name: 'ProductInfo',params: { type: 'loose_products' }}" class="btn btn-lg btn-block btn-light-primary btn-lg btn_product_count">
                                            {{ __('more_info') }}
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h6> {{ __('products_sold_out') }} </h6>
                                    </div>
                                    <div class="card-body">
                                        <h2 class="text-center">{{ record.sold_out_count }}</h2>

                                        <router-link :to="{ name: 'ProductInfo',params: { type: 'sold_out' }}"
                                                    class="btn btn-block btn-light-primary btn-lg btn_product_count">{{ __('more_info')}}
                                        </router-link>
                                    </div>

                                </div>
                            </div>
                            <div class="col-12 col-lg-6 col-md-6">
                                <div class="card">
                                    <div class="card-header text-center">
                                        <h6> {{ __('products_in_low_stock') }} </h6>
                                    </div>
                                    <div class="card-body">
                                        <h2 class="text-center">{{ record.low_stock_count }}</h2>
                                        <router-link :to="{ name: 'ProductInfo',params: { type: 'low_stock' }}" class="btn btn-lg btn-block btn-light-primary btn-lg btn_product_count">
                                            {{ __('more_info') }}
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


                <div class="row">
                    <h5> {{ __('order_out_lines') }} </h5>
                    <div class="col-6 col-lg-3 col-md-3" v-for="status in record.status_order_count">
                        <div class="card">
                            <div class="card-body px-3 py-4-5">
                                <div class="row">
                                    <div class="col-md-4">

                                        <div v-if="status.status == $pending" class="stats-icon payment_pending">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Payment_Pending.svg'">
                                        </div>
                                        <div v-else-if="status.status == $received" class="stats-icon received">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Received.svg'">
                                        </div>
                                        <div v-else-if="status.status == $processed" class="stats-icon processed">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Processed.svg'">
                                        </div>
                                        <div v-else-if="status.status == $shipped" class="stats-icon shipped">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Shipped.svg'">
                                        </div>
                                        <div v-else-if="status.status == $outForDelivery" class="stats-icon outForDelivery">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Out_For_Delivery.svg'">
                                        </div>
                                        <div v-else-if="status.status == $delivered" class="stats-icon delivered">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Delivered.svg'">
                                        </div>

                                        <div v-else-if="status.status == $cancelled" class="stats-icon cancelled">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Cancelled.svg'">
                                        </div>

                                        <div v-else-if="status.status == $returned" class="stats-icon returned">
                                            <img :src="$baseUrl + '/assets/images/dashboard/Returned.svg'">
                                        </div>

                                        <div v-else class="stats-icon purple">
                                            <i class="iconly-boldBag"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <h6 v-if="status.status == $pending" class="text-muted font-semibold">{{  __('payment_pending')  }}</h6>
                                        <h6 v-if="status.status == $received" class="text-muted font-semibold">{{  __('received') }}</h6>
                                        <h6 v-if="status.status == $processed" class="text-muted font-semibold">{{  __('processed') }}</h6>
                                        <h6 v-if="status.status == $shipped" class="text-muted font-semibold">{{  __('shipped') }}</h6>
                                        <h6 v-if="status.status == $outForDelivery" class="text-muted font-semibold">{{  __('outForDelivery') }}</h6>
                                        <h6 v-if="status.status == $delivered" class="text-muted font-semibold">{{  __('delivered') }}</h6>
                                        <h6 v-if="status.status == $cancelled" class="text-muted font-semibold">{{ __('cancelled')  }}</h6>
                                        <h6 v-if="status.status == $returned" class="text-muted font-semibold">{{  __('returned') }}</h6>
                                        <h4 class="font-extrabold mb-0">{{ status.order_count }}</h4>
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
                                        <h6 class="box-title">{{ __('from_and_to_date') }}</h6>
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
                                    <b-col md="2">
                                        <div class="form-group">
                                            <h6 class="box-title" for="status">{{__('status')}}</h6>
                                            <select id="status" name="status" v-model="status"
                                                    @change="getLatestOrders()" class="form-control form-select">
                                                <option value="">{{__('all_orders')}}</option>
                                                <option v-for="status in statuses" :value='status.id'>{{ status.status }}</option>
                                            </select>
                                        </div>
                                    </b-col>
                                    <b-col md="2">
                                        <div class="form-group">
                                            <h6 class="box-title" for="seller">{{__('seller')}}</h6>
                                            <select name="seller" id="seller" v-model="seller"
                                                    @change="getLatestOrders()" class="form-control form-select">
                                                <option value="">{{__('select_seller')}}</option>
                                                <option v-for="seller in filterSellers" :value="seller.id">{{ seller.name }}</option>
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
                                            <button class="btn btn-sm btn-danger ml-1" @click="deliveryDateRange.startDate = null, deliveryDateRange.endDate = null, getLatestOrders()">
                                                {{ __('clear') }}
                                            </button>
                                        </div>
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
                                        :filter="orderFilter"
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
                                                :to="{ name: 'ViewOrder',params: { id: row.item.id, record : row.item }}"
                                                v-b-tooltip.hover title="View" class="btn btn-primary btn-sm"><i
                                                class="fa fa-eye"></i></router-link>
                                            <button class="btn btn-danger btn-sm" v-b-tooltip.hover :title="__('delete')"
                                                    @click="deleteOrder(row.index,row.item.id)"><i
                                                class="fa fa-trash"></i></button>
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
                   
                        <div class="col-lg-6 col-md-12 col-sm-12">
                            <div class="card h-95">
                                <div class="card-header">
                                    <h4 class="card-title me-1">{{__('top_sellers')}}</h4>
                                    <small>({{__('month')}}: {{ currentMonth }})</small>
                                </div>
                                <div class="card-body">
                                    
                                    <div class="table-responsive">
                                        <b-table
                                            :items="sellers"
                                            :fields="sellerFields"
                                            :current-page="currentPage"
                                            :per-page="perPage"
                                            :filter="sellerFilter"
                                            :filter-included-fields="filterOn"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            :bordered="true"
                                            stacked="md"
                                            show-empty
                                            small>
                                            <template #head(total_revenue)="row">
                                                {{ __('total_revenue')+'('+$currency+')' }}
                                            </template>
                                            <template #cell(actions)="row">
                                                <router-link to="/sellers" v-b-tooltip.hover :title="__('view')"
                                                            class="btn btn-primary btn-sm"><i class="fa fa-eye"></i>
                                                </router-link>
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
                        </div>

                        <div class="col-lg-6 col-md-12 col-sm-12">
                            <div class="card h-95">
                                <div class="card-header">
                                    <h4 class="card-title me-1">{{__('top_categories')}}</h4>
                                    <small>({{__('month')}}: {{ currentMonth }})</small>
                                </div>
                                <div class="card-body">
                                   
                                    <div class="table-responsive">
                                        <b-table
                                            :items="categories"
                                            :fields="categoryFields"
                                            :current-page="categoryCurrentPage"
                                            :per-page="categoryPerPage"
                                            :filter="categoryFilter"
                                            :filter-included-fields="filterOn"
                                            :sort-by.sync="sortBy"
                                            :sort-desc.sync="sortDesc"
                                            :sort-direction="sortDirection"
                                            :bordered="true"
                                            stacked="md"
                                            show-empty
                                            small>
                                            <template #head(total_revenue)="row">
                                                {{ __('total_revenue') + ' ('+$currency+')' }}
                                            </template>
                                            <template #cell(actions)="row">
                                                <router-link to="/manage_categories" v-b-tooltip.hover :title="__('view')"
                                                            class="btn btn-primary btn-sm"><i class="fa fa-eye"></i>
                                                </router-link>
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
                                                    v-model="categoryPerPage"
                                                    :options="pageOptions"
                                                    size="sm"
                                                    class="form-control form-select"
                                                ></b-form-select>
                                            </b-form-group>
                                        </b-col>
                                        <b-col md="4" class="my-1" offset-md="6">
                                            <b-pagination
                                                v-model="categoryCurrentPage"
                                                :total-rows="categoryTotalRows"
                                                :per-page="categoryPerPage"
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
import DateRangePicker from 'vue2-daterange-picker'
import axios from "axios";
import {GChart} from 'vue-google-charts/legacy';
import moment from "moment";
import VueApexCharts from 'vue-apexcharts'
export default {
    name: 'Chart',
    components: {
        GChart,
        apexcharts: VueApexCharts,
        DateRangePicker
    },
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
            record: [],
            currentMonth: "",

            sellerFields: [
                {key: 'seller_id', label: __('seller_id'), sortable: false, sortDirection: 'desc'},
                {key: 'seller_name', label: __('sellers'), sortable: false, class: 'text-center'},
                {key: 'store_name', label: __('store_name'), sortable: false, class: 'text-center'},
                {key: 'total_revenue', label: __('total_revenue'), sortable: false, class: 'text-center'},
                {key: "actions", label: __('actions')}
            ],

            categoryFields: [
                {key: 'category_id', label: __('id'), sortable: false, sortDirection: 'desc'},
                {key: 'category_name', label: __('category'), sortable: false, class: 'text-center'},
                {key: 'product_name', label: __('product'), sortable: false, class: 'text-center'},
                {key: 'total_revenue', label:  __('total_revenue'), sortable: false, class: 'text-center'},
                {key: "actions", label: __('actions')}
            ],

            orderFields: [
                {key: 'id', label: __('oid'), sortable: true, sortDirection: 'desc'},
                {key: 'user_name', label: __('user'), sortable: true, class: 'text-center'},
                {key: 'mobile', label: __('mobile'), sortable: true, class: 'text-center'},
                { key: 'total', label: __('total')+'('+ this.$currency +')', sortable: true, class: 'text-center' },
                { key: 'delivery_charge', label: __('dcharges')+'('+ this.$currency +')', sortable: true, class: 'text-center' },

                { key: 'final_total', label: __('ftotal')+'('+ this.$currency +')', sortable: true, class: 'text-center' },
                { key: 'payment_method', label: __('p_method'), sortable: true, class: 'text-center' },
                { key: 'delivery_time', label: __('d_time'), sortable: true, class: 'text-center' },
                {key: "actions", label: __('actions')}
            ],

            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',

            orderFilter: null,
            sellerFilter: null,
            categoryFilter: null,

            filterOn: [ ],

            page: 1,

            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,

            sellers: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,

            categories: [],
            categoryTotalRows: 1,
            categoryCurrentPage: 1,
            categoryPerPage: 5,

            statuses: [],
            orders: [],
            orderTotalRows: 1,
            orderCurrentPage: 1,
            orderPerPage: 5,
            status: "",
            filterSellers: "",
            seller: "",

            graphOrders: [],
            isLoadingColumnChart: false,
            graphCategories: [],

            chartData:[],

            options: {
                chart: {
                    height: 500,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 2,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },

                fill: {
                    colors: ['#25B076']
                },

                xaxis: {
                    categories: [],
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#000',
                                colorTo: '#000',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                    }

                },
                noData: {
                    text: "No Data Found",
                    align: 'center',
                }
            },

            series: [{
                name: 'Total Sale',
                data: []
            }],
            options2: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                legend: {
                    show: true,
                    position: 'bottom'
                },
                labels: [],
                responsive: [{
                    breakpoint: 1000,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            series2: []
        };
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.sellers.length
        this.categoryTotalRows = this.categories.length
        this.orderTotalRows = this.orders.length
    },
    created() {
        this.barChart();
        this.pieChart();

        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let now = new Date();
        this.currentMonth = months[now.getMonth()];
        this.getRecord();
        this.getOrderStatus();
        this.getLatestOrders();
        this.setSellerWalletTransaction();
    },
    methods: {
         getTodayRange() {
      let startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Start of today

      let endDate = new Date();
      endDate.setHours(23, 59, 59, 999); // End of today
     this.dateRange = { startDate, endDate };
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
        barChart(){
            axios.get(this.$apiUrl + '/orders/weekly_sales').then((response) => {
                    this.graphOrders = response.data.data;
                    this.graphOrders.forEach((order) => {
                        this.options.xaxis.categories.push(moment(order.order_date).format('DD-MMM'));
                        this.series[0].data.push(order.total_sale);
                    });
                    this.$refs.apexBarChart.updateSeries([{
                        data: this.series[0].data,
                    }], false, true);
            })
        },
        pieChart(){
            axios.get(this.$apiUrl + '/categories/product_count').then((response) => {
                    this.graphCategories = response.data.data;
                    this.graphCategories.forEach((category) => {
                        if(category.product_count !== 0){
                            this.options2.labels.push(category.name);
                            this.series2.push(category.product_count);
                        }
                    });
            })
        },

        getRecord: function () {
            let vm = this;
            this.isLoading = true;
            axios.get(this.$apiUrl + '/dashboard').then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;
                    this.sellers = data.data.top_sellers;
                    this.totalRows = this.sellers.length;
                    this.categories = data.data.top_categories;
                    this.categoryTotalRows = this.categories.length;
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
        setSellerWalletTransaction: function () {
            
            let vm = this;
            this.isLoading = true;
            axios.get(this.$apiUrl + '/set_seller_wallet_transaction').then(res => {
                vm.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.record = data.data;
                    this.sellers = data.data.top_sellers;
                    this.totalRows = this.sellers.length;
                    this.categories = data.data.top_categories;
                    this.categoryTotalRows = this.categories.length;
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
                "seller": this.seller,
                "status": this.status,
                startDeliveryDate: this.deliveryDateRange.startDate ? moment(this.deliveryDateRange.startDate).format('YYYY-MM-DD') : '',
                endDeliveryDate: this.deliveryDateRange.endDate ? moment(this.deliveryDateRange.endDate).format('YYYY-MM-DD') : '',
            }
            axios.get(this.$apiUrl + '/orders', {
                params: param
            }).then((response) => {
                let data = response.data;
                if (data.status === 1) {
                    this.filterSellers = response.data.data.sellers;
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
        deleteOrder(index, id) {
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
                        id: id
                    }
                    axios.post(this.$apiUrl + '/orders/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.orders.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });
        },
    },
};
</script>

<style scoped>
@import "../../../node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css";
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
