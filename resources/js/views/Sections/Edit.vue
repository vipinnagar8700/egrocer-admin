<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="xxl"  scrollable no-close-on-backdrop no-fade static id="mymodal">
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-md-6">
                    <label for='title'>{{ __('title_for_section') }}</label><i class="text-danger">*</i>
                    <input type='text' name='title' id='title' v-model="section.title" class='form-control' placeholder='Ex : Featured Products / Products on Sale' required />
                </div>
                <div class="form-group col-md-6"><i class="text-danger">*</i>
                    <label for='short_description'>{{ __('short_descrption') }}</label>
                    <input type='text' name='short_description' id='short_description' v-model="section.short_description" class='form-control' placeholder='Ex : Weekends deal goes here' required />
                </div>

                <div class="form-group">
                    <label>{{ __('category_ids_with_ex') }}</label>

                    <Select2 v-model="section.category_ids"
                             placeholder="Select Categories"
                             :options="categories_options"
                             :settings="{ multiple: 'multiple', width:'100%',dropdownParent:'#mymodal' }" />
                </div>
                <div class="form-group col-md-3">
                    <label for='product_type'> {{ __('product_types') }}</label><i class="text-danger">*</i>
                    <select name='product_type' id='product_type' v-model="section.product_type"  class='form-control form-select'>
                        <option value=""> {{ __('select_product_type') }}</option>
                        <option value="all_products"> {{ __('all_products') }}</option>
                        <option value="new_added_products"> {{ __('new_added_products') }}</option>
                        <option value="products_on_sale"> {{ __('products_on_sale') }}</option>
                        <option value="most_selling_products">{{ __('most_selling_products') }}</option>
                        <option value="custom_products"> {{ __('custom_products') }}</option>
                    </select>
                </div>
                 <div class="form-group col-md-3">
                    <label for='position'> {{ __('position') }}</label><i class="text-danger">*</i>
                    <select name='position' id='position' v-model="section.position"  class='form-control form-select'>
                        <option value=""> {{ __('select_position') }}</option>
                        <option value="top"> {{ __('top') }}</option>
                        <option value="below_slider"> {{ __('below_slider') }}</option>
                        <option value="below_category"> {{ __('below_category') }}</option>
                        <option value="below_shop_by_seller">{{ __('below_shop_by_seller') }}</option>
                        <option value="below_shop_by_country_of_origin"> {{ __('below_shop_by_country_of_origin') }}</option>
                        <option value="custom_below_shop_by_brands"> {{ __('below_shop_by_brands') }}</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label for="background color (Light theme)">{{ __('background_color_for_light_theme') }}</label>
                    <i class="text-danger">*</i>
                    <b-input-group prepend class="mb-2">
                        <input type="text" v-model="section.background_color_for_light_theme" class="form-control">
                        <input type="color" id="color" name='color' v-model="section.background_color_for_light_theme" class="form-control">
                    </b-input-group>
                </div>
                <div class="form-group col-md-3">
                    <label for="background color (Dark theme)">{{ __('background_color_for_dark_theme') }}</label>
                    <i class="text-danger">*</i>
                    <b-input-group prepend class="mb-2">
                        <input type="text" v-model="section.background_color_for_dark_theme" class="form-control">
                        <input type="color" id="color" name='color' v-model="section.background_color_for_dark_theme" class="form-control">
                    </b-input-group>
                </div>
                <div class="form-group" v-if="section.product_type === 'custom_products'" >
                    <label >{{ __('products') }}</label>

                    <Select2 v-model="section.product_ids"
                             placeholder="Select Products"
                             :options="products_options"
                             :settings="{ multiple: 'multiple', width:'100%',dropdownParent:'#mymodal' }" />

                </div>
                <div class="col-md-6 form-group">
                    <div class="form-group row">
                        <div class="col-md-12 col-sm-12">
                            <label class="required">{{ __('select_style_for_app_section') }}</label><i class="text-danger">*</i>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio"  value="style_1" v-model="section.style_app" required class="form-control">
                                <img :src="$baseUrl + '/images/app_style/App_Style_1.jpg'" alt="style_1" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio"  value="style_2" v-model="section.style_app">
                                <img :src="$baseUrl + '/images/app_style/App_Style_2.jpg'" alt="style_2" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio" value="style_3" v-model="section.style_app">
                                <img :src="$baseUrl + '/images/app_style/App_Style_3.jpg'" alt="style_3" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                        <label class="radio-img">
                            <input type="radio"  value="style_4" v-model="section.style_app">
                            <img :src="$baseUrl + '/images/app_style/App_Style_4.jpg'" alt="style_4" class="style_image">
                        </label>
                        </div>
                    </div>

                    <!-- Show file upload input if style_4 is selected -->
                   <div class="form-group"  v-if="section.style_app === 'style_4'">
                    <label for="banner_app">{{ __('banner_image') }}<i class="text-danger">*</i></label>

                    <span v-if="section.error" class="error">{{ section.error }}</span>
                    <input type="file" name="banner_app" accept="image/*" id="banner_app" @change="handleFileUploadBannerApp" ref="file_banner_app" class="file-input">

                    <div class="file-input-div bg-gray-100" @click="$refs.file_banner_app.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                        <template v-if="section.banner_app && section.banner_app.name !== ''">
                            <label> {{ __('selected_file_name') }} {{ section.banner_app.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>
                    </div>

                    <div class="row" v-if="section.banner_app_url">
                        <div class="col-md-2">
                            <img class="custom-image" :src="section.banner_app_url" title="Offer Image" alt="Offer Image"/>
                        </div>
                    </div>
                </div>
                </div>
                <div class="col-md-6 form-group">
                    <div class="form-group row">
                        <div class="col-md-12 col-sm-12">
                            <label class="required">{{ __('select_style_for_web_section') }}</label><i class="text-danger">*</i>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio" value="style_1" required="" class="form-control" v-model="section.style_web">
                                <img :src="$baseUrl + '/images/web_style/Web_Style_1.jpg'" alt="style_1" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio" value="style_2" v-model="section.style_web">
                                <img :src="$baseUrl + '/images/web_style/Web_Style_2.jpg'" alt="style_2" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio" value="style_3" v-model="section.style_web">
                                <img :src="$baseUrl + '/images/web_style/Web_Style_3.jpg'" alt="style_3" class="style_image">
                            </label>
                        </div>
                        <div class="col-md-3 col-sm-3">
                            <label class="radio-img">
                                <input type="radio" value="style_4" v-model="section.style_web">
                                <img :src="$baseUrl + '/images/web_style/Web_Style_4.jpg'" alt="style_4" class="style_image">
                            </label>
                        </div>
                        
                    </div>
                    <!-- Show file upload input if style_4 is selected -->
                    <div class="form-group row" v-if="section.style_web === 'style_4'">
                    <div class="col-md-12">
                        <label for="banner_web"> {{ __('banner_image') }}<i class="text-danger">*</i></label>
                        <span v-if="section.error_web" class="error">{{ section.error_web }}</span>
                        <input type="file" name="banner_web" accept="image/*" id="banner_web" @change="handleFileUploadBannerWeb" ref="file_banner_web" class="file-input">
                        <div class="file-input-div bg-gray-100 mt-2" @click="$refs.file_banner_web.click()" @drop="dropFileWeb" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                            <template v-if="section.banner_web && section.banner_web.name !== ''">
                                <label> {{ __('selected_file_name') }} {{ section.banner_web.name }}</label>
                            </template>
                            <template v-else>
                                <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                            </template>
                        </div>

                        <div class="row mt-2" v-if="section.banner_web_url">
                            <div class="col-md-2">
                                <img class="custom-image" :src="section.banner_web_url" title="Banner Web Image" alt="Banner Web Image"/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>

import axios from 'axios';
import Multiselect from 'vue-multiselect'
import Select2 from "v-select2-component";
export default {
    props: ['record'],
    components: {
        Multiselect,
        Select2
    },
    data : function(){
        return {
            isLoading: false,
            categories:[],
            products:[],
            category_id: '',
            section : {
                id: this.record ? this.record.id : null,
                title: this.record ? this.record.title : "",
                short_description: this.record ? this.record.short_description : "",
                category_ids: (this.record && this.record.category_ids) ? this.record.category_ids.split(",") : "",
                product_type: this.record ? this.record.product_type : "",
                product_ids: (this.record && this.record.product_ids) ? this.record.product_ids.split(",") : "",
                position: this.record ? this.record.position : "",
                style_app: this.record ? this.record.style_app : "",
                style_web: this.record ? this.record.style_web : "",
                background_color_for_light_theme: this.record ? this.record.background_color_for_light_theme : "",
                background_color_for_dark_theme: this.record ? this.record.background_color_for_dark_theme : "",
                banner_app: this.record ? this.record.banner_app : "",
                banner_app_url: this.record ? this.record.banner_app_url : "" ,
                banner_web: this.record ? this.record.banner_web : "",
                banner_web_url: this.record ? this.record.banner_web_url : "",
                error_web: null,
                error: null
            },
        };
    },
    created: function () {
        this.getCategories();
        this.getProducts();
    },

    computed: {
        modal_title: function(){
            let title = this.section.id ?  __('edit') : __('create') ;
            title += __('manage_featured_products_section');
            return title;
        },
         categories_options: function(){

var temp = [];
            if(this.categories.length !== 0 ){
                this.categories.forEach(category => {
                    //Only Main Categories
                    if (category.parent_id == 0) {
                        if(category.cat_active_childs.length !== 0){
                            temp.push({id: category.id, text: category.name, disabled:true});
                            category.cat_active_childs.forEach(subcat => {
                                if(subcat.cat_active_childs.length !== 0){
                                    temp.push({id: subcat.id, text: '-'+subcat.name, disabled:true});
                                }else{
                                    temp.push({id: subcat.id, text: '-'+subcat.name, disabled:false});
                                }
                                subcat.cat_active_childs.forEach(subcat2 => {
                                    if(subcat2.cat_active_childs.length !== 0){
                                        temp.push({id: subcat2.id, text: '--'+subcat2.name, disabled:true});
                                    }else{
                                        temp.push({id: subcat2.id, text: '--'+subcat2.name, disabled:false});
                                    }
                                    subcat2.cat_active_childs.forEach(subcat3 => {
                                        if(subcat3.cat_active_childs.length !== 0){
                                            temp.push({id: subcat3.id, text: '---'+subcat3.name, disabled:true});
                                        }else{
                                            temp.push({id: subcat3.id, text: '---'+subcat3.name, disabled:false});
                                        }
                                        subcat3.cat_active_childs.forEach(subcat4 => {
                                            if(subcat4.cat_active_childs.length !== 0){
                                                temp.push({id: subcat4.id, text: '----'+subcat4.name, disabled:true});
                                            }else{
                                                temp.push({id: subcat4.id, text: '----'+subcat4.name, disabled:false});
                                            }
                                            subcat4.cat_active_childs.forEach(subcat5 => {
                                                if(subcat5.cat_active_childs.length !== 0){
                                                    temp.push({id: subcat5.id, text: '-----'+subcat5.name, disabled:true});
                                                }else{
                                                    temp.push({id: subcat5.id, text: '-----'+subcat5.name, disabled:false});
                                                }
                                             });
                                        });
                                    });
                                });
                            });
                        }
                        else{
                          temp.push({id: category.id, text: category.name, disabled:false});  
                        }
                    }
                });
            }
           
             return temp;
        },
        products_options: function(){
            var temp = [];
            if(this.products.length !== 0 ) {
                this.products.forEach(product => {
                    temp.push({id: product.id, text: product.name})
                });
            }
            return temp;
        },
    },

    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        getCategories(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/categories/active')
                .then((response) => {
                    this.isLoading = false
                    this.categories = response.data.data;
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
        getProducts(){
            this.isLoading = true
            axios.get(this.$apiUrl + '/products/active')
                .then((response) => {
                    this.isLoading = false
                    this.products = response.data.data;
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
        dropFile(event) {
            event.preventDefault();
            this.$refs.file_banner_app.files = event.dataTransfer.files;
            this.handleFileUploadBannerApp(); // Trigger the onChange event manually
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleFileUploadBannerApp() {
            const file = this.$refs.file_banner_app.files[0];

        // Reset previous error message
        this.section.error = null;

        // Check if a file was selected
        if (!file) return;

        // Perform image validation
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
        if (!validTypes.includes(file.type)) {
            this.section.error = "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or WEBP image.";
            return;
        }

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            this.section.error = "File size exceeds the maximum allowed limit (2MB).";
            return;
        }

        // Create a URL for the uploaded image and display it
        this.section.banner_app_url = URL.createObjectURL(file);
        this.section.banner_app = file;
        },
         dropFileWeb(event) {
        event.preventDefault();
        this.$refs.file_banner_web.files = event.dataTransfer.files;
        this.handleFileUploadBannerWeb(); // Trigger the onChange event manually
        event.currentTarget.classList.add('bg-gray-100');
        event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUploadBannerWeb() {
        const file = this.$refs.file_banner_web.files[0];

        // Reset previous error message
        this.section.error_web = null;

        // Check if a file was selected
        if (!file) return;

        // Perform image validation
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
        if (!validTypes.includes(file.type)) {
            this.section.error_web = "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, or WEBP image.";
            return;
        }

        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            this.section.error_web = "File size exceeds the maximum allowed limit (2MB).";
            return;
        }

        // Create a URL for the uploaded image and display it
        this.section.banner_web_url = URL.createObjectURL(file);
        this.section.banner_web = file;
    },
        saveRecord: function(){



            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            let data = this.section;
            for(let key in data){
                if (data[key]!== null)
                {
                        formData.append(key, data[key]);
                }
            }



            let url = this.$apiUrl + '/sections/save';
            if(this.section.id){
                url = this.$apiUrl + '/sections/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('sectionSaved', data.message);
                    vm.$router.push({path: '/sections'});
                    this.hideModal();
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
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
        addCategoryTag (newTag) {
            const tag = {
                name: newTag,
            }
            this.categories_ids.push(tag)
        },
    },
    mounted(){
        this.showModal();
    }
}
</script>

<style scoped>

.select2-search__field input[type=search] {
    width: 5000px !important;
}
</style>
