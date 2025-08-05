<template>
    <div>
        <div class="page-heading">
            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3>View Product</h3>
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

                             <li class="breadcrumb-item" v-if="isSellerRoute">
                                <router-link to="/seller/manage_products">Manage Product</router-link>
                            </li>
                            <li class="breadcrumb-item" v-else>
                                <router-link to="/manage_products">Manage Product</router-link>
                            </li>

                            <li class="breadcrumb-item active" aria-current="page">
                                Product Details
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <div class="card">
                        <div class="card-header">
                            <h4>Product Details</h4>
                            <span class="pull-right">
                                <router-link to="/manage_products" class="btn btn-primary">Manage Product</router-link>
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 table-responsive">
                                    <table class="table table-bordered table-responsive">
                                        <tbody>
                                        <tr>
                                            <th class="th-width">Name</th>
                                            <td>{{ record.name }}</td>
                                            <th class="th-width">Seller</th>
                                            <td>{{ record.seller.name }}</td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Product Id</th>
                                            <td>{{ record.id }}</td>
                                            <th class="th-width">Indicator</th>
                                            <td>
                                                <span v-if="record.status === 0" class="badge bg-info">None</span>
                                                <span v-if="record.status === 1" class="badge bg-success">Veg</span>
                                                <span v-if="record.status === 2" class="badge bg-danger">Non-Veg</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Tax</th>
                                            <td>
                                                <template v-if="record.tax">
                                                    {{ record.tax.title }} {{ record.tax.percentage }}%
                                                </template>
                                            </td>
                                            <th class="th-width">Made In</th>
                                            <td>
                                                <template v-if="record.made_in_country">
                                                    {{ record.made_in_country.name }}
                                                </template>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Status</th>
                                            <td>
                                                <span v-if="record.status === 1" class="badge bg-success">Active</span>
                                                <span v-if="record.status === 0" class="badge bg-danger">Deactive</span>
                                            </td>
                                            <th class="th-width">Return</th>
                                            <td>
                                                <span class='badge bg-danger' v-if="record.return_status === 0">Not-Allowed</span>
                                                <span class='badge bg-success'
                                                      v-if="record.return_status === 1">Allowed</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Manufacturer</th>
                                            <td>
                                                {{ record.manufacturer }}
                                            </td>
                                            <th class="th-width">Till Status</th>
                                            <td>
                          
                                                <span class='badge bg-danger' v-if="record.till_status == 0">Not Applicable</span>
                                                <span class='badge bg-success' v-if="record.till_status == 2">Received</span>
                                                <span class='badge bg-success' v-if="record.till_status == 3">Processed</span>
                                                <span class='badge bg-success' v-if="record.till_status == 4">Shipped</span>
                                                <span class='badge bg-success' v-if="record.till_status == 5">Delivered</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Is Approved</th>
                                            <td>
                                                <span class='badge bg-success'
                                                      v-if="record.is_approved === 1">Approved</span>
                                                <span class='badge bg-danger' v-if="record.is_approved === 0">Not-Approved</span>
                                            </td>
                                            <th class="th-width">Main Image</th>
                                            <td>
                                                <img :src="$storageUrl + record.image" height="75" v-if="record.image"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Cancellation</th>
                                            <td>
                                                <span class='badge bg-danger' v-if="record.cancelable_status === 0">Not-Allowed</span>
                                                <span class='badge bg-success' v-if="record.cancelable_status === 1">Allowed</span>
                                            </td>
                                            <th class="th-width">Category</th>
                                            <td>
                                                <template v-if="record.category">
                                                    {{ record.category.name }}
                                                </template>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="th-width">Other Images</th>
                                            <td colspan="3">
                                                <template v-if="other_images" v-for="image in other_images">
                                                    <img :src="$storageUrl + image.image" height="75"
                                                         style="margin-right: 2px;"/>
                                                </template>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4>Product Description</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <editor
                                                :placeholder="__('enter_product_description')"
                                                v-model="record.description"
                                                 readonly = true 
                                                disabled = true
                                                
                                                :init="{
                                                    height:400,
                                                    readonly: true,
                                                    disabled: true
                                                   }"
                                            />

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4>Product Variants List</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 table-responsive  " v-for="variant in record.variants">
                                    <table class="table table-bordered ">
                                        <tbody>

                                        <tr>
                                            <th class="th-width">Product Name</th>
                                            <th class="th-width">Variant Id</th>
                                            <th class="th-width">Measurement</th>
                                            <th class="th-width">Stock</th>
                                            <th class="th-width">Price({{ $currency }})</th>
                                            <th class="th-width">Discounted Price({{ $currency }})</th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <template v-if="variant.unit">
                                                    {{ record.name+" "+variant.measurement+" "+variant.unit.short_code }}
                                                </template>
                                                <template v-else>
                                                    {{ record.name+" "+variant.measurement }}
                                                </template>
                                            </td>
                                            <td>{{ variant.id }}</td>
                                            <td>
                                                <template v-if="variant.unit">
                                                    {{ variant.measurement+" "+variant.unit.short_code }}
                                                </template>
                                                <template v-else>
                                                    {{ variant.measurement }}
                                                </template>
                                            </td>
                                            <td>{{ variant.stock }}</td>
                                            <td>{{ variant.price }}</td>
                                            <td>{{ variant.discounted_price }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from '@tinymce/tinymce-vue';
export default {
    components: {  'editor': Editor },
    data: function () {
        return {
            editor: ClassicEditor,
            editorConfig: {toolbar: []},
            image: null,
            main_image_path: "",
            other_images: null,
            id: null,
            record: null,
        }
    },
    computed: {
        isSellerRoute() {
        // Use this.$route to access the current route
        return this.$route.path.startsWith('/seller/');
        },
    },
    created: function () {
        this.id = this.$route.params.id;
        if (this.id) {
            this.getProduct();
        }
    },
    methods: {
        getProduct() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/edit/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.record = data.data
                        this.main_image_path = this.record.image;
                        this.other_images = this.record.images;
                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },
        deleteRecord(variant_id) {
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
                    let postData = {
                        id: variant_id
                    }
                    axios.post(this.$apiUrl + '/products/delete', postData)
                        .then((response) => {
                            let data = response.data;
                            this.getProduct();
                            //this.showSuccess(data.message);
                            this.showMessage("success", data.message);
                        });
                }
            });

        },
    }
};
</script>
<style scoped>
.th-width {
    width: 170px;
}
</style>
