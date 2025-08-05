<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('popup_offer') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('popup_offer') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ __('popup_offer') }}</h4>
                        <span class="pull-right">
                            <button type="button" class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getPopupData()">
                                <i class="fa fa-refresh" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <div class="form-group col-md-4">
                                <div class="form-group">
                                    <label class="control-label"> {{ __('popup_offer_enabled_on_off') }}</label><br>
                                    <b-form-radio-group
                                        v-model="popup_enabled"
                                        :options="[
                                                                { text:  __('ON') , 'value': 1 },
                                                                { text:  __('OFF'), 'value': 0 },
                                                            ]"
                                        buttons
                                        button-variant="outline-primary"
                                        required
                                    ></b-form-radio-group>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
                                <label> {{ __('type') }}</label>
                                <select class="form-control form-select" v-model="popup_type" @change="popup_type_id = ''" required>
                                    <option value="default"> {{ __('default') }}</option>
                                    <option value="category"> {{ __('category') }}</option>
                                    <option value="product"> {{ __('product') }}</option>
                                    <option value="popup_url"> {{ __('popup_url') }}</option>
                                </select>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group" v-if="popup_type=='category'">
                                    <label>Category</label>
                                    <select class="form-control form-select" v-model="popup_type_id">
                                        <option value="">{{ __('select_category') }}</option>
                                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group" v-if="popup_type=='product'">
                                    <label> {{ __('products') }}</label>
                                    <select class="form-control form-select" v-model="popup_type_id">
                                        <option value=""> {{ __('select_product') }}</option>
                                        <option v-for="product in products" :value="product.id">{{ product.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group" v-if="popup_type=='popup_url'">
                                    <label> {{ __('link') }}</label>
                                    <input type="url" class="form-control" v-model="popup_url" placeholder="Enter Link">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>{{ __('image') }}</label>
                                    <p class="text-muted">{{ __('please_choose_square_image_of_larger_than_500_500') }}</p>
                                    <span v-if="error" class="error">{{ error }}</span>
                                    <input type="file" name="slider_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
                                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                        <template v-if="image && image.name !== ''">
                                            <label> {{ __('selected_file_name') }}{{ image.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>
                                    </div>
                                    <div class="row" v-if="image_url">
                                        <div class="col-md-4">
                                            <img class="img-thumbnail custom-image" :src="image_url" title='Popup Offer Image' alt='Popup Offer Image'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <b-button type="submit" variant="primary" :disabled="isLoading">{{ __('save') }}
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </b-button>
                    </div>
                </div>
            </form>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading: false,
            categories:[],
            products:[],

            popup_enabled: 0,
            popup_always_show_home: 0,
            popup_type:  'default',
            popup_type_id: "",
            image: "",
            image_url: "",
            popup_url: "",
            error: null
        };
    },

    created: function () {
        this.getCategories();
        this.getProducts();
        this.getPopupData();
    },
    methods: {
        getPopupData() {
            axios.get(this.$apiUrl + '/popup').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;
                    this.popup_enabled = this.record.popup_enabled ?? 0;
                    this.popup_always_show_home = this.record.popup_always_show_home??0;
                    this.popup_type = this.record.popup_type;
                    this.popup_type_id = this.record.popup_type_id;
                    this.popup_url = this.record.popup_url;
                    this.image_url = this.record.popup_image ?? "";

                    this.record.map((item, index) => {
                        if (item.value === '0' || item.value === '1') {
                            this.firebase[item.variable] = (item.value === '0') ? 0 : 1;
                        } else {
                            this.firebase[item.variable] = item.value;
                        }
                    });

                }
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        dropFile(event) {
            event.preventDefault();
            this.$refs.file_image.files = event.dataTransfer.files;
            this.handleFileUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleFileUpload() {
            const file = this.$refs.file_image.files[0];
      
            // Reset previous error message
            this.error = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
            if (!validTypes.includes(file.type)) {
                this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.error = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }

            // Create a URL for the uploaded image and display it
            this.imageUrl = URL.createObjectURL(file);
            this.image = this.$refs.file_image.files[0];
            this.image_url = URL.createObjectURL(this.image);
        },
        getCategories(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/categories/active')
                .then((response) => {
                    this.isLoading = false
                    this.categories = response.data.data;
                }).catch(error => {
                    if (error.request.statusText) {
                        this.showError(error.request.statusText);
                    }else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                    this.isLoading = false;
                });
        },
        getProducts(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/active')
                .then((response) => {
                    this.isLoading = false
                    this.products = response.data.data;
                }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                this.isLoading = false;
            });
        },

        saveRecord: function(){
            this.isLoading = true;
            let formData = new FormData();
            formData.append('popup_enabled', this.popup_enabled);
            formData.append('popup_always_show_home', this.popup_always_show_home);
            formData.append('popup_type', this.popup_type);
            formData.append('popup_type_id', this.popup_type_id);
            formData.append('popup_image', this.image);
            formData.append('popup_url', this.popup_url);

            let url = this.$apiUrl + '/popup/save';
            let vm = this;

            axios.post(url, formData).then(res => {

                let data = res.data;
                if (data.status === 1) {
                    //this.showSuccess(data.message);
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/popup'});
                            vm.getPopupData();
                            vm.isLoading = false;

                        }, 1000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }

            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                vm.isLoading = false;
            });

        }
    }
}
</script>
