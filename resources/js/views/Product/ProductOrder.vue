<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>{{ __('products_order') }}</h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">{{ __('products_order') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>{{ __('products_order_list') }}</h4>
                        </div>
                        <div class="card-body">
                            <b-row class="mb-2">
                                <b-col md="3">
                                    <h6 class="box-title">{{ __('categories') }}</h6>
                                    <form method="post">
                                        <select @change="getProducts()" v-model="category_id"
                                                class="form-control form-select" v-html="categories"></select>
                                    </form>
                                    <span class="text-danger d-block font-size-13">{{ __('select_a_categories_for_update_products_order_list') }}</span>
                                </b-col>
                            </b-row>

                            <b-row v-if="list.length>0">
                                <b-col md="6">
                                    <div class="mb-2 d-flex justify-content-between align-items-center">
                                        <div class="form-check form-switch">
                                            <label> <input type="checkbox" v-model="editable" class="form-check-input">
                                                {{ __('enable_drag_and_drop') }}</label>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-primary" @click="orderList">{{ __('sort_by_original_order') }}
                                        </button>
                                    </div>
                                </b-col>
                            </b-row>

                            <div v-if="list.length>0">
                                <b-row>
                                    <b-col md="6" style="overflow-y:scroll;height:300px;">

                                        <ul id="sortable-row" class="list-group">
                                            <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"
                                                       :move="onMove" :options="{ animation:200 }"
                                                       @start="isDragging=true" @end="isDragging=false"
                                                       @change="updateList()">

                                                <li v-for="product in list" :key="product.row_order"
                                                    class="list-group-item d-flex justify-content-between align-items-center">
                                                    <span>
                                                        <span class="text-left mr-2">{{ product.row_order }}</span>
                                                        <span class="text-left mr-2">-</span>
                                                        <span class="text-left mr-2">{{ product.id }} </span>
                                                        <span class="text-left mr-2"><img :src="product.image_url"
                                                                                          height="30"></span>
                                                        <span class="text-left mr-2">{{ product.name }}</span>
                                                    </span>
                                                    <span><i class="fa fa-arrows"></i></span>
                                                </li>

                                            </draggable>
                                        </ul>

                                    </b-col>
                                </b-row>
                                <b-row>
                                    <div class="modal-footer col-md-6">
                                        <button type="type" @click="updateProductsOrder()" class="btn btn-success"
                                                :disabled="isLoading">
                                            {{ __('save_order') }}
                                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                        </button>
                                    </div>
                                </b-row>
                            </div>

                            <template v-if="list.length==0 && category_id>0"> 
                                <span>{{ __('no_products_found') }}</span>
                            </template>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";

export default {
    components: {
        draggable,
    },
    data: function () {
        return {
            products: [],
            list: [],
            editable: true,
            isDragging: false,
            delayedDragging: false,
            isLoading: false,
            categories: null,
            category_id: 0,
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        list2String() {
            return JSON.stringify(this.list2, null, 2);
        }
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    },
    mounted() {

    },
    created: function () {
        this.getCategories();
    },
    methods: {
        orderList() {
            this.getProducts();
        },
        onMove({relatedContext, draggedContext}) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        updateList() {
            this.list.map((product, index) => {
                product.row_order = index + 1;
            });
        },
        getProducts() {
            axios.get(this.$apiUrl + '/products/order_list?category_id=' + this.category_id)
                .then((response) => {
                    let data = response.data.data;
                    this.list = data.map((product, index) => {
                        return {
                            id: product.id,
                            name: product.name,
                            row_order: product.row_order,
                            image_url: product.image_url,
                            fixed: false
                        };
                    })
                });
        },
        updateProductsOrder() {
            this.isLoading = true;
            let formData = this.list;
            let url = this.$apiUrl + '/products/updateOrder';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.isLoading = false;
                    this.getProducts();
                } else {
                    this.showError(data.message);
                    this.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getCategories() {
            axios.get(this.$apiUrl + '/categories/options')
                .then((response) => {
                    this.categories = response.data;
                });
        },
    }
};
</script>
<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}
</style>
