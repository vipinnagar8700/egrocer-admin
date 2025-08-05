<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3  v-if="type === 'sold_out'">Sold Out Products</h3>
                        <h3  v-if="type === 'low_stock'">Low Stock Products</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li v-if="type === 'sold_out'" class="breadcrumb-item active" aria-current="page">Sold Out Products</li>
                                <li v-if="type === 'low_stock'" class="breadcrumb-item active" aria-current="page">Low Stock Products</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <h4 v-if="type === 'sold_out'" class="card-title">Sold Out Products List</h4>
                        <h4 v-if="type === 'low_stock'" class="card-title">Low Stock Products List</h4>
                        <span class="pull-right">
                            <router-link to="/manage_products/create" class="btn btn-primary">Add New Product</router-link>
                        </span>
                    </div>
                    <div class="card-body">
                        <b-row class="mb-2">

                            <b-col md="3">
                            </b-col>
                            <b-col md="3" offset-md="5">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    :placeholder="__('search')"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getProducts()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <div class="table-responsive">
                            <b-table
                                :items="products"
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
                                <template #cell(seller_name)="row">
                                    {{ row.item.seller_name }}
                                </template>
                                <template #cell(image)="row">
                                    <img :src="$storageUrl + row.item.image" height="50" v-if="row.item.image"/>
                                </template>
                                <template #cell(measurement)="row">
                                    {{ row.item.measurement + " " + row.item.short_code }}
                                </template>
                                <template #cell(stock)="row">
                                    <span v-if="row.item.is_unlimited_stock">Unlimited</span>
                                    <template v-else>
                                        {{ row.item.stock }} <span v-if="row.item.stock_unit">{{row.item.stock_unit}}</span>
                                    </template>
                                </template>
                                <template #cell(status)="row">
                                    <span class='badge bg-success' v-if="row.item.status == 1">Available</span>
                                    <span class='badge bg-danger' v-if="row.item.status == 0">Sold Out</span>
                                </template>
                                <template #cell(indicator)="row">
                                    <span class='badge bg-info' v-if="row.item.indicator === 0">None</span>
                                    <span class='badge bg-success' v-if="row.item.indicator === 1">Veg</span>
                                    <span class='badge bg-danger' v-if="row.item.indicator === 2">Non-Veg</span>
                                </template>
                                <template #cell(is_approved)="row">
                                    <span class='badge bg-success' v-if="row.item.is_approved === 1">Approved</span>
                                    <span class='badge bg-danger' v-if="row.item.is_approved === 0">Not-Approved</span>
                                </template>
                                <template #cell(return_status)="row">
                                    <span class='badge bg-danger' v-if="row.item.return_status === 0">Not-Allowed</span>
                                    <span class='badge bg-success' v-if="row.item.return_status === 1">Allowed</span>
                                </template>
                                <template #cell(cancelable_status)="row">
                                    <span class='badge bg-danger'
                                          v-if="row.item.cancelable_status === 0">Not-Allowed</span>
                                    <span class='badge bg-success'
                                          v-if="row.item.cancelable_status === 1">Allowed</span>
                                </template>
                                <template #cell(till_status)="row">
                                    <span class='badge bg-danger' v-if="row.item.till_status == 0">Not Applicable</span>
                                    <span class='badge bg-success'
                                          v-if="row.item.till_status == 'received'">Received</span>
                                    <span class='badge bg-success'
                                          v-if="row.item.till_status == 'processed'">Processed</span>
                                    <span class='badge bg-success'
                                          v-if="row.item.till_status == 'shipped'">Shipped</span>
                                    <span class='badge bg-success'
                                          v-if="row.item.till_status == 'delivered'">Delivered</span>
                                </template>
                                <template #cell(status)="row">
                                    <a class="btn btn-sm" @click="updateStatusProduct(row.index,row.item.id)">
                                        <span class="primary-toggal" v-if="row.item.status == 1"><i
                                            class="fa fa-toggle-on fa-2x"></i></span>
                                        <span class="text-danger" v-else><i class="fa fa-toggle-off fa-2x"></i></span>
                                    </a>
                                </template>
                                <template #cell(actions)="row">
                                    <div style="width: 120px">
                                        <router-link
                                            :to="{ name: 'ViewProduct',params: { id: row.item.id, record : row.item }}"
                                            v-b-tooltip.hover title="View" class="btn btn-primary btn-sm"><i
                                            class="fa fa-eye"></i></router-link>
                                        <router-link
                                            :to="{ name: 'EditProduct',params: { id: row.item.id, record : row.item }}"
                                            v-b-tooltip.hover title="Edit" class="btn btn-success btn-sm"><i
                                            class="fa fa-pencil-alt"></i></router-link>
                                        <button class="btn btn-danger btn-sm" v-b-tooltip.hover title="Delete"
                                                @click="deleteRecord(row.index,row.item.product_variant_id)"><i
                                            class="fa fa-trash"></i></button>
                                    </div>
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
import axios from "axios";

export default {
    data: function () {
        return {
            category: "",
            fields: [
                {key: 'product_variant_id', label: 'ID', sortable: true, sortDirection: 'desc'},
                {key: 'product_id', label: 'Product ID', sortable: true, sortDirection: 'desc'},
                {key: 'tax_id', label: 'Tax ID', sortable: true, class: 'text-center'},
                {key: 'seller_name', label: 'Seller Name', class: 'text-center', sortable: true},
                {key: 'name', label: 'Name', sortable: true, class: 'text-center'},
                {key: 'image', label: 'Image', class: 'text-center'},
                {key: 'price', label: 'Price', class: 'text-center', sortable: true},
                {key: 'discounted_price', label: 'D.Price', class: 'text-center', sortable: true},
                {key: 'measurement', label: 'Measurement', class: 'text-center', sortable: true},
                {key: 'stock', label: 'Stock', class: 'text-center', sortable: true},
                {key: 'status', label: 'Availability', class: 'text-center', sortable: true},
                {key: 'indicator', label: 'Indicator', class: 'text-center', sortable: true},
                {key: 'is_approved', label: 'Is Approved?', class: 'text-center', sortable: true},
                {key: 'return_status', label: 'Return', class: 'text-center', sortable: true},
                {key: 'cancelable_status', label: 'Cancellation', class: 'text-center', sortable: true},
                {key: 'till_status', label: 'Till Status', class: 'text-center', sortable: true},
                {key: 'status', label: 'Status', class: 'text-center', sortable: true},
                {key: 'actions', label: __('actions')}
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
            products: null,
            categories: null,
            type:null
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
        this.totalRows = this.products.length
    },
    created: function () {
        this.type = this.$route.params.type;
        if (this.type) {
            this.getProducts();
        }

    },
    methods: {
        getProducts() {
            this.isLoading = true;
            let param = {
                "category": this.category,
                "type": this.type
            }
            axios.get(this.$sellerApiUrl + '/products/product_info', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.products = response.data.data.products;
                this.totalRows = this.products.length
            });
        },

        deleteRecord(index, id) {

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
                    axios.post(this.$apiUrl + '/products/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            let data = response.data;
                            this.products.splice(index, 1)
                            this.showSuccess(data.message)
                        });
                }
            });


        },

        updateStatusProduct(index, id){
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
                    this.isLoading = true
                    let postData = {
                        id : id
                    }
                    axios.post(this.$apiUrl + '/products/change',postData)
                        .then((response) => {
                            this.isLoading = false
                            //this.customers.splice(index, 1)
                            this.getProducts();
                            this.showSuccess(response.data.message)
                        });
                }
            });
        },
    }
};
</script>
<style scoped>
</style>
