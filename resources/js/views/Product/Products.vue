<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('manage_products') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('manage_products') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">

                        <div class="card-header">
                            <h4>{{ __('products') }}</h4>
                            <span class="pull-right">
                                <template v-if="$roleSeller == login_user.role.name">
                                     <router-link to="/seller/manage_products/create" class="btn btn-primary" v-b-tooltip.hover title="Add Product">{{ __('add_product') }}</router-link>
                                </template>
                                <template v-else>
                                    <router-link to="/manage_products/create" class="btn btn-primary" v-b-tooltip.hover title="Add Product">{{ __('add_product') }}</router-link>
                                </template>
                            </span>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="form-group col-md-3">
                                    <b-dropdown size="sm" dropright :text=" __('actions')" split-variant="outline-primary"
                                                variant="primary" class="m-2" :disabled="selectedItems.length === 0">
                                        <b-dropdown-item href="javascript:void(0);" @click="multipleDelete"><span
                                            class="text-danger" style="font-weight: bold;"><i class="fa fa-trash"></i> {{ __('delete_selected_products') }}</span>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                            <b-row class="mb-2">
                                <b-col md="2">
                                    <h6 class="box-title">{{ __('filter_by_products_category') }}</h6>
                                    <form method="post">
                                        <select @change="getRecords()" v-model="category"
                                                class="form-control form-select">
                                            <option value="">{{__('all_categories')}}</option>
                                            <option v-for="category in categories" :value="category.id">
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </form>
                                </b-col>
                                <b-col md="2">
                                    <h6 class="box-title">{{ __('filter_products_by_status') }} </h6>
                                    <select id="is_approved" name="is_approved" @change="getRecords()"
                                            v-model="is_approved" class="form-control form-select">
                                        <option value="">{{__('select_status')}}</option>
                                        <option value="1">Approved</option>
                                        <option value="0">Not-Approved</option>
                                    </select>
                                </b-col>

                                <template v-if="$roleSeller == login_user.role.name">

                                    <input type="hidden" v-model="seller = login_user.seller.id" >
                                </template>
                                <template v-else>
                                    <b-col md="3">
                                        <h6 class="box-title">{{ __('filter_products_by_seller') }} </h6>
                                        <select @change="getRecords()" v-model="seller" class="form-control form-select">
                                            <option value="">{{ __('all_sellers') }}</option>
                                            <option v-for="seller in sellers" :value="seller.id">{{ seller.name }}</option>
                                        </select>
                                    </b-col>
                                </template>
                                <b-col md="3" v-bind:class = "($roleSeller == login_user.role.name)?'offset-3':''">
                                    <h6 class="box-title">{{ __('search') }}</h6>
                                    <b-form-input
                                        id="filter-input"
                                        v-model="filter"
                                        type="search"
                                        :placeholder="__('search')"
                                        @input="getRecords()"
                                    ></b-form-input>
                                </b-col>
                                <b-col md="2" class="text-center">

                                    <div class="btn-group btn_tool" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary" v-b-tooltip.hover :title="__('refresh')" @click="getRecords()">
                                            <i class="fa fa-refresh" aria-hidden="true"></i>
                                        </button>

                                        <b-dropdown dropleft menu-class="w-100 border dropdownOverflow" v-b-tooltip.hover title="Columns">
                                            <template #button-content>
                                                <i class="fa fa-th-list"></i>
                                            </template>
                                            <li class="m-1" v-for="field in fields" :key="field.key" v-if=" field.key !== 'select' " >
                                                <input type="checkbox" :id="field.key"
                                                       :disabled="visibleFields.length == 1 && field.visible"
                                                       v-model="field.visible"
                                                       class="form-check-input">
                                                <label :for="field.key">{{ field.label }}</label>
                                                <b-dropdown-divider></b-dropdown-divider>
                                            </li>
                                        </b-dropdown>
                                    </div>

                                    <b-sidebar id="sidebar-right" title="Sidebar" backdrop right shadow>
                                        <div class="px-3 py-2">
                                            <p>
                                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                            </p>
                                            <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
                                        </div>
                                    </b-sidebar>
                                </b-col>
                            </b-row>
                            <div class="table-responsive">
                                <b-table
                                    :items="products"
                                    :fields="visibleFields"
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

                                    <template #head(select)="row">
                                        <input type="checkbox" v-model="all_select" @click="allSelectCheckBox"
                                               class="form-check-input">
                                    </template>
                                    <template #cell(select)="row">
                                        <input type="checkbox" v-model="selectedItems" @change="selectCheckBox"
                                               :value="`${row.item.product_variant_id}`" class="form-check-input">
                                    </template>

                                    <template #cell(seller_name)="row">
                                        {{ row.item.seller_name }}
                                    </template>
                                    
                                    <template #cell(image)="row">
                                        <img :src="$storageUrl + row.item.image" @click="openLightbox($storageUrl + row.item.image)" alt="Image" height="50"    />

                                        <FsLightbox :toggler="toggler" :sources="lightboxSources" 	:onClose="handleClose" 
                                    >  </FsLightbox>
                                            
                                    </template>
                                    <template #cell(measurement)="row">

                                        {{ row.item.measurement }} <span v-if="row.item.stock_unit">{{row.item.stock_unit}}</span>
                                    </template>

                                    <template #cell(stock)="row">

                                       <span v-if="row.item.is_unlimited_stock === 1 || row.item.is_unlimited_stock === '1'">Unlimited</span>


                                        <template v-else>
                                            {{ Math.floor(row.item.stock) }}
                                        </template>

                                    </template>

                                    <template #cell(availability)="row">
                                        <a class="btn btn-sm" @click="updateStatusProduct(row.index,row.item.id)"
                                           v-if="$can('product_update')">
                                            <span class="primary-toggal" v-if="row.item.status == 1"><i
                                                class="fa fa-toggle-on fa-2x"></i></span>
                                            <span class="text-danger" v-else><i
                                                class="fa fa-toggle-off fa-2x"></i></span>
                                        </a>
                                    </template>

                                    <template #cell(status)="row">
                                        <span class='badge bg-success' v-if="row.item.status == 1">Available</span>
                                        <span class='badge bg-danger' v-if="row.item.status == 0">Sold Out</span>
                                    </template>


                                    <template #cell(indicator)="row">
                                        <span class='badge bg-info' v-if="row.item.indicator == 0">None</span>
                                        <span class='badge bg-success' v-if="row.item.indicator == 1">Veg</span>
                                        <span class='badge bg-danger' v-if="row.item.indicator == 2">Non-Veg</span>
                                    </template>
                                    <template #cell(is_approved)="row">
                                        <span class='badge bg-success' v-if="row.item.is_approved == 1">Approved</span>
                                        <span class='badge bg-danger'
                                              v-if="row.item.is_approved == 0">Not-Approved</span>
                                    </template>
                                    <template #cell(return_status)="row">
                                        <span class='badge bg-danger'
                                              v-if="row.item.return_status == 0">Not-Allowed</span>
                                        <span class='badge bg-success'
                                              v-if="row.item.return_status == 1">Allowed</span>
                                    </template>
                                    <template #cell(cancelable_status)="row">
                                        <span class='badge bg-danger' v-if="row.item.cancelable_status === 0">Not-Allowed</span>
                                        <span class='badge bg-success'
                                              v-if="row.item.cancelable_status == 1">Allowed</span>
                                    </template>

                                    <template #cell(till_status)="row">
                                        <span class='badge bg-danger' v-if="row.item.till_status == '0'">Not Applicable</span>
                                        <span class='badge bg-success' v-if="row.item.till_status == '2'">{{ row.item.till_status_name }}</span>
                                        <span class='badge bg-success' v-if="row.item.till_status == '3'">{{ row.item.till_status_name }}</span>
                                        <span class='badge bg-success' v-if="row.item.till_status == '4'">{{ row.item.till_status_name }}</span>
                                        <span class='badge bg-success' v-if="row.item.till_status == '6'">{{ row.item.till_status_name }}</span>
                                    </template>


                                    <template #cell(actions)="row">
                                        <div>

                                            <template v-if="$roleSeller == login_user.role.name">
                                                <router-link
                                                    :to="{ name: 'SellerViewProduct',params: { id: row.item.id, record : row.item }}"
                                                     class="btn btn-primary btn-sm" v-b-tooltip.hover :title="__('view')" >
                                                    <i class="fa fa-eye"></i>
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'SellerEditProduct',params: { id: row.item.id, record : row.item }}"
                                                     class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('edit')">
                                                    <i class="fa fa-pencil-alt"></i>
                                                </router-link>
                                                 <router-link
                                                    :to="{ name: 'SellerProductRatings',params: { id: row.item.id, record : row.item }}"
                                                     class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('view')">
                                                    <i class="fa fa-star"></i>
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'SellerCloneProduct',params: { id: row.item.id, record : row.item, clone: true  }}"
                                                     class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('clone_product')">
                                                    <i class="fa fa-clone"></i>
                                                </router-link>
                                            </template>
                                            <template v-else>
                                                <router-link
                                                    :to="{ name: 'ViewProduct',params: { id: row.item.id, record : row.item }}"
                                                    class="btn btn-primary btn-sm" v-b-tooltip.hover :title="__('view')" >
                                                    <i class="fa fa-eye"></i>
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'EditProduct',params: { id: row.item.id, record : row.item }}"
                                                    class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('edit')">
                                                    <i class="fa fa-pencil-alt"></i>
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'ProductRatings',params: { id: row.item.id, record : row.item }}"
                                                     class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('view_ratings')">
                                                    <i class="fa fa-star"></i>
                                                </router-link>
                                                <router-link
                                                    :to="{ name: 'CloneProduct',params: { id: row.item.id, record : row.item, clone: true  }}"
                                                     class="btn btn-success btn-sm"
                                                    v-if="$can('product_update')" v-b-tooltip.hover :title="__('clone_product')">
                                                    <i class="fa fa-clone"></i>
                                                </router-link>
                                            </template>

                                            <button class="btn btn-danger btn-sm"
                                                    @click="deleteRecord(row.index,row.item.product_variant_id)"
                                                    v-if="$can('product_delete')" v-b-tooltip.hover :title="__('delete')">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </template>

                                </b-table>
                            </div>
                            <b-row>
                                <b-col md="2">
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
                                <b-col md="4" offset-md="6">
                                    <label>{{__('total_records')}} :- {{ totalRows }} </label>
                                    <b-pagination
                                        v-model="currentPage" 
                                        :total-rows="totalRows"
                                        :per-page="perPage"
                                        align="fill"
                                        size="sm"
                                        class="my-0"
                                    >
                                    </b-pagination>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import {VuejsDatatableFactory} from 'vuejs-datatable';
import axios from "axios";
import Auth from '../../Auth.js';
import Vue from "vue";
import FsLightbox from "fslightbox-vue";
export default {
    components: {
        VuejsDatatableFactory,
        FsLightbox,
    },
    data: function () {
        return {
            login_user: Auth.user,

            fields: [
                {key: 'select', label: '', visible: true},
                {key: 'product_variant_id', label: __('id'), visible: true, sortable: true, sortDirection: 'desc'},
                {key: 'product_id', label: __('product_id'), visible: true, sortable: true, sortDirection: 'desc'},
                {key: 'tax_id', label: __('tax_id'), visible: false, sortable: true, class: 'text-center'},
                {key: 'seller_name', label: __('seller_name'), visible: true, class: 'text-center', sortable: true},
                {key: 'name', label: __('name'), visible: true, sortable: true, class: 'text-center'},
                {key: 'image', label: __('image'), visible: true, class: 'text-center'},
                {key: 'price', label: __('price')+'('+ this.$currency +')', visible: true, class: 'text-center', sortable: true},
                {key: 'discounted_price', label: 'D.Price',visible: true, class: 'text-center', sortable: true},
              
                {key: 'indicator', label: __('indicator'), visible: false, class: 'text-center', sortable: true},
                {key: 'is_approved', label: __('is_approved'), visible: false, class: 'text-center', sortable: true},
                {key: 'return_status', label: __('return'), visible: false, class: 'text-center', sortable: true},
                {key: 'cancelable_status', label: __('cancellation'), visible: false, class: 'text-center', sortable: true},
                {key: 'till_status', label: __('till_status'), visible: false, class: 'text-center', sortable: true},
                {key: 'actions', label: __('actions'), visible: true}
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
            categories: [],
            sellers: [],
            products: [],

            category: "",
             seller: (Auth.user.seller !== null) ? Auth.user.seller.id : "",
            is_approved: "",

            selectedItems: [],
            select: '',
            all_select: false,
            isLoading : false,
            toggler: false,
            lightboxSources: [],
            slide: 1,
        
      activeImageIndex: 0,
        }
    },
    computed: {
        visibleFields() {
            return this.fields.filter(field => field.visible)
        },
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
    },

    mounted() {
  
    },
    created: function () {
        if(this.$roleSeller === this.login_user.role.name){
            this.fields.forEach((field, index) =>{
                if(field.key === 'seller_name'){
                   this.fields.splice(index,1);
                }
            });
        }
        this.getRecords();
    },
    watch: {
        currentPage() {
            this.getRecords();
        },
        perPage() {
            this.getRecords();
        },
    },
    methods: {
        openLightbox(image) {
        
            this.lightboxSources = [image];
            this.toggler = !this.toggler;
        },
        handleClose() {
            this.lightboxSources = null;
            this.toggler = false;
        
        },
        getRecords() {
            this.isLoading = true
            let param = {
                "category": this.category,
                "seller": this.seller,
                "is_approved": this.is_approved,
                page: this.currentPage,
                per_page: this.perPage,
                filter: this.filter
            }
            axios.get(this.$apiUrl + '/products', {
                params: param
            }).then((response) => {
                this.isLoading = false;
                this.categories = response.data.data.categories;
                this.sellers = response.data.data.sellers;
                this.products = response.data.data.products;
                this.totalRows = response.data.total

            });
        },
        getSubCategories() {

            this.isLoading = true

            let url = this.$apiUrl + '/subcategories';
            if (this.category_id) {
                url = this.$apiUrl + '/subcategories/' + this.category_id;
            }
            axios.get(url)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.subcategories = data.data
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
                            //this.showSuccess(data.message);
                            this.showMessage("success", data.message);
                        });
                }
            });


        },
        updateStatusProduct(index, id) {
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
                        id: id
                    }
                    axios.post(this.$apiUrl + '/products/change', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.getRecords();
                            this.showMessage("success", response.data.message);
                        });
                }
            });
        },

        allSelectCheckBox() {
            if (this.all_select === false) {
                this.all_select = true;
                // Assuming `pageSize` is the number of products to display per page
                const startIndex = (this.currentPage - 1) * this.perPage;
                const endIndex = startIndex + this.perPage;
                const selectedProducts = this.products.slice(startIndex, endIndex);
                selectedProducts.forEach(product => {
                    this.selectedItems.push(product.product_variant_id);
                });
                // Now you may want to update the display to show only selected products with pagination
                this.displayProducts = selectedProducts;
            } else {
                this.all_select = false;
                this.selectedItems = [];
                // Reset the displayed products to the original list if all items are deselected
                this.displayProducts = this.products.slice(
                    (this.currentPage - 1) * this.perPage,
                    this.currentPage * this.perPage
                );
            }
        },
        selectCheckBox() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (this.products.length === uniqueSelectedItems.length) {
                this.all_select = true
            } else {
                this.all_select = false
            }
        },
        multipleDelete() {
            let uniqueSelectedItems = [...new Set(this.selectedItems)];
            if (uniqueSelectedItems.length !== 0) {
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
                        let ids = uniqueSelectedItems.toString();
                        this.isLoading = true
                        let postData = {
                            ids: ids
                        }
                        axios.post(this.$apiUrl + '/products/multiple_delete', postData)
                            .then((response) => {
                                this.isLoading = false
                                let data = response.data;
                                //this.products.splice(index, 1)
                                this.getRecords();
                                this.selectedItems = [];
                                this.all_select = false;
                                //this.all_select === true ? this.all_select = false : this.all_select = true;
                                //this.showSuccess(data.message);
                                this.showMessage("success", data.message);

                            });
                    }
                });
            } else {
                this.showWarning("Select at least one record!");
            }
        }
    }
};
</script>
