<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('stock_management') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('stock_management') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12 col-md-12 order-md-1 order-last">
                <div class="card">
                    <div class="card-body">
                        <b-row class="mb-2">
                            <b-col md="3" offset-md="8">
                                <h6 class="box-title">{{ __('search') }}</h6>
                                <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    :placeholder="__('search')"
                                    @input="getRecords()"
                                ></b-form-input>
                            </b-col>
                            <b-col md="1" class="text-center">
                                <button class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getRecords()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </b-col>
                        </b-row>
                        <b-table
            :items="groupedProducts"
            :fields="fields"
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
            
            <!-- ID column -->
            <template #cell(product_variant_id)="row">
                
                {{ row.item.product_variant_id }}
               
            </template>

            <!-- Product Name column with rowspan -->
            <template #cell(name)="row">
                {{ row.item.name }}
            </template>

            <!-- Variant column -->
            <template #cell(variant)="row">
                
                {{ row.item.measurement }} 
              
            </template>

            <!-- Type column with rowspan for 'loose' type products -->
            <template #cell(type)="row">
                {{ row.item.type }}
            </template>

            <template #cell(image_url)="row">
               <img :src="row.item.image_url" alt="Image" class="img-thumbnail" width="100" @click="openLightbox(row.item.image_url)" />
               <FsLightbox :toggler="toggler" :sources="lightboxSources" 	:onClose="handleClose" >  </FsLightbox>
            </template>


            <!-- Stock column -->
            <template #cell(stock)="row">
                
                <div v-if="edit_record && edit_record.product_variant_id === row.item.product_variant_id">
                    <b-form-input
                        v-model="edit_record.stock"
                        type="number"
                        min="0"
                        @keyup.enter="updateStock(row.item.product_variant_id)"
                    ></b-form-input>
                </div>
                <div v-else>
                    {{ row.item.stock }}
                </div>
                
            </template>

            <!-- Status column -->
            <template #cell(pv_status)="row">
               
                <span v-if="row.item.pv_status == 1" class="badge bg-success">Available</span>
                <span v-else class="badge bg-danger">Sold Out</span>
              
            </template>

            <!-- Actions column -->
            <template #cell(actions)="row">
                
                <button v-if="edit_record && edit_record.product_variant_id === row.item.product_variant_id"
                    class="btn btn-sm btn-success" @click="updateStock(row.item.product_variant_id)">
                    <i class="fa fa-check"></i>
                </button>
                <button v-else class="btn btn-sm btn-primary" @click="edit_record = { ...row.item }" v-b-tooltip.hover :title="__('edit')">
                    <i class="fa fa-pencil-alt"></i>
                </button>
               
            </template>
        </b-table>
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
                                <label>{{ __('total_records') }} :- {{ totalRows }} </label>
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
</template>

<script>
import { VuejsDatatableFactory } from 'vuejs-datatable';
import FsLightbox from "fslightbox-vue";


export default {
    components: {
        VuejsDatatableFactory,
        FsLightbox,
    },
    data() {
        return {
            fields: [
                { key: 'product_variant_id', label: __('id'), class: 'text-center', sortable: true, sortDirection: 'desc' },
                { key: 'image_url', label: __('image'), class: 'text-center' },
                { key: 'name', label: __('name'), class: 'text-center' },
                { key: 'variant', label: __('variant'), class: 'text-center' },
                { key: 'type', label: __('type'), class: 'text-center' },
                { key: 'stock', label: __('stock'), class: 'text-center' },
                { key: 'pv_status', label: __('status'), class: 'text-center' },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 0,
            currentPage: 1,
            perPage: this.$perPage || 10,
            pageOptions: this.$pageOptions || [5, 10, 15, 20],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: ['name'],
            isLoading: false,
            products: [],
            edit_record: null,
            groupedProducts: [],
            lightboxSources: [],
        }
    },
    created() {
        this.$eventBus.$on('recordSaved', (message) => {
            this.showMessage('success', message);
            this.getRecords();
        });
        this.getRecords();
    },
    watch: {
         currentPage() {
            this.getRecords();
        },
        perPage() {
            this.getRecords();
        }
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
            this.isLoading = true;
            axios.get(this.$apiUrl + '/products/get_product_variants', {
                params: {
                    page: this.currentPage,
                    per_page: this.perPage,
                    filter: this.filter
                }
            }).then((response) => {
                this.isLoading = false;
                const data = response.data.data;
                this.groupedProducts = data;
                this.totalRows = response.data.total;
            }).catch(() => {
                this.isLoading = false;
            });
        },
        updateStock(product_variant_id) {
            if (this.edit_record.stock < 0) {
                this.showMessage('error', __('stock_must_be_positive'));
                return;
            }
            this.isLoading = true;
            axios.post(this.$apiUrl + '/products/update_variant_stock', {
                id: product_variant_id,
                stock: this.edit_record.stock
            }).then((response) => {
                this.isLoading = false;
                if (response.data.status === 1) {
                this.showMessage('success', response.data.message);
                this.getRecords(); // Refresh data after updating stock
                }else{
                    this.showMessage('error', response.data.message);
                }
                this.edit_record = null; // Reset edit state
               
            }).catch(() => {
                this.isLoading = false;
                this.showMessage('error', __('update_failed'));
            });
        }
    }
};
</script>
