<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }} 
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label>{{ __('type') }}</label>
                    <select class="form-control form-select" v-model="type">
                        <option value="default"> {{ __('default') }}</option>
                        <option value="category"> {{ __('category') }}</option>
                        <option value="product"> {{ __('product') }}</option>
                        <option value="offer_url"> {{ __('offer_url') }}</option>
                    </select>
                </div>
                <div class="form-group" v-if="type=='category'">
                    <label>{{ __('category') }}</label>
                    <select class="form-control form-select" v-model="type_id" required >
                        <option value="">{{ __('select_category') }}</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="form-group" v-if="type=='product'">
                    <label> {{ __('products') }}</label>
                    <select class="form-control form-select" v-model="type_id" required>
                        <option value=""> {{ __('select_product') }}</option>
                        <option v-for="product in products" :value="product.id">{{ product.name }}</option>
                    </select>
                </div>
                <div class="form-group" v-if="type=='offer_url'">
                    <label> {{ __('link') }}</label>
                    <input type="url" class="form-control" v-model="offer_url" placeholder="Enter Link" required>
                </div>
             
                <div class="form-group">
                    <label for="offer_image">{{ __('offer_image') }}<i class="text-danger">*</i></label>
                    <p class="text-muted">Image prefer size 1024px(width)*200px(height).</p>
                    <span v-if="error" class="error">{{ error }}</span>
                    <input type="file" name="offer_image" accept="image/*" id="offer_image" v-on:change="handleFileUpload" ref="file_image" class="file-input">

                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                        <template v-if="image && image.name !== ''">
                            <label> {{ __('selected_file_name') }} {{ image.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>
                    </div>

                    <div class="row" v-if="image_url">
                        <div class="col-md-2">
                            <img class="custom-image" :src="image_url" title='Offer Image' alt='Offer Image'/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="position"> {{ __('position') }}<i class="text-danger">*</i></label>
                    <select name="position" id="position" v-model="position" class="form-control form-select">
                        <option value="top"> {{ __('top') }}</option>
                        <option value="below_slider"> {{ __('below_slider') }}</option>
                        <option value="below_category"> {{ __('below_category') }}</option>
                        <option value="below_section"> {{ __('below_section') }}</option>
                    </select>
                </div>

                <div class="form-group" v-if="position === 'below_section'">
                    <label for="section_id"> {{ __('section_position') }}<i class="text-danger">*</i></label>
                    <select name="section_id" id="section_id" v-model="section_id" class="form-control form-select">
                        <option value=""> {{ __('select_section') }}</option>
                        <option v-for="section in sections" :value="section.id">{{section.title}}</option>
                    </select>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record','sections','categories', 'products'],
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            type: this.record ? this.record.type : 'default',
            type_id: this.record ? this.record.type_id : "",
            offer_url: this.record ? this.record.offer_url : "",
            image: this.record ? this.record.image : "" ,
            image_url: this.record ? this.record.image_url : "" ,
            position: this.record ? this.record.position : "top",
            section_id: this.record ? this.record.section_position : "",
            error: null
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? __('edit') :  __('add') ;
             title += ' ';
            title +=  __('offers_images');
            return title;
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
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
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if(this.id) {
                formData.append('id', this.id);
            }
            formData.append('image', this.image);
            formData.append('type', this.type);
            formData.append('type_id', this.type_id);
            formData.append('offer_url', this.offer_url);
            formData.append('position', this.position);
            formData.append('section_id', this.section_id);
            let url = this.$apiUrl + '/offers/save';
            if(this.id){
                url = this.$apiUrl + '/offers/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('offerSaved', data.message);
                    vm.$router.push({path: '/offers'});
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
        }
    },
    mounted(){
        this.showModal();
    }
}
</script>

<style scoped>

</style>
