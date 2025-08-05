<template>
    <b-modal
        ref="my-modal"
        :title="modal_title"
        @hidden="$emit('modalClose')"
        scrollable
        no-close-on-backdrop
        no-fade
        static
    >
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">
                {{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>

        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-md-12">
                    <label>{{ __("SEO Page") }}</label>
                    <select v-model="page_type" class="form-control">
                        <option v-for="page in pages" :key="page.id" :value="page.name">
                            {{ page.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group col-md-12">
                    <label>{{ __('meta_title') }}</label>
                    <input type="text" class="form-control" v-model="meta_title" :placeholder="__('enter_meta_title')">
                </div>

                <div class="form-group col-md-12">
                    <label>{{ __('meta_keyword') }}</label>
                    <input type="text" class="form-control" v-model="meta_keyword" :placeholder="__('enter_meta_keyword')">
                </div>

                <div class="form-group col-md-12">
                    <label>
                        {{ __('schema_markup') }}
                        <small :id="'schema_markup'" class="d-inline-flex px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary rounded-2">
                            <i class="fa fa-info-circle"></i>
                        </small>
                        <b-popover :target="'schema_markup'" triggers="hover" placement="left">
                            <p>Schema markup helps search engines understand your content. Generate markup using 
                                <a href="https://www.rankranger.com/schema-markup-generator" target="_blank">this tool</a>.
                            </p>
                        </b-popover>
                    </label>
                    <textarea class="form-control" v-model="schema_markup" :placeholder="__('enter_schema_markup')" rows="4"></textarea>
                </div>

                <div class="form-group col-md-12">
                    <label>{{ __('meta_description') }}</label>
                    <textarea class="form-control" v-model="meta_description" :placeholder="__('enter_meta_description')" rows="4"></textarea>
                </div>
                <div class="form-group">
                    <label>{{ __('og_image') }}</label><i class="text-danger">*</i>
                    <p class="text-muted">Please choose square image of larger than 350px*350px &amp; smaller than 550px*550px.</p>
                    <span v-if="error" class="error">{{ error }}</span>

                    <input type="file" name="og_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">

                        <template v-if="og_image && og_image.name !== ''">
                            <label>Selected file name:- {{ og_image.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>

                    </div>
                    <div class="row" v-if="og_image_url">
                        <div class="col-md-4">
                            <img class="custom-image" :src="og_image_url" title='OG Image' alt='OG Image'/>
                        </div>
                    </div>
                </div>   
            </div>

            <button ref="dummy_submit" style="display: none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data() {
        return {
            isLoading: false,
            og_image: null,
            error: null,
            id: this.record?.id || null,
            page_type: this.record?.page_type || '',
            meta_title: this.record?.meta_title || '',
            meta_keyword: this.record?.meta_keyword || '',
            schema_markup: this.record?.schema_markup || '',
            meta_description: this.record?.meta_description || '',
            og_image_url: this.record ? this.record.og_image_url : null,
            pages: [
                { id: 1, name: __('Home') },
                { id: 2, name: __('About us') },
                { id: 3, name: __('Contact us') },
                { id: 4, name: __('Faqs') },
                { id: 5, name: __('Term condition') },
                { id: 6, name: __('Product listing page') },
                { id: 7, name: __('Privacy policy') },
                { id: 8, name: __('Return exchange policy') },
                { id: 9, name: __('Shipping policy') },
                { id: 10, name: __('Cancellation policy') }
            ]
        };
    },
  
     computed: {
        modal_title: function () {
            let title = this.id ? __('edit_seo_setting') : __('add_seo_setting');
            return title;
        },
         
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show();
        },
        hideModal() {
            this.$refs['my-modal'].hide();
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
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image.";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.error = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }

            // Create a URL for the uploaded image and display it
            this.imageUrl = URL.createObjectURL(file);
            this.og_image = this.$refs.file_image.files[0];
            this.og_image_url = URL.createObjectURL(this.og_image);
        },
        saveRecord: function(){
            let vm = this;
               this.isLoading = true;

               let formData = new FormData();
                if (this.id) formData.append('id', this.id);
            formData.append('page_type', this.page_type);
            formData.append('meta_title', this.meta_title);
            formData.append('meta_keyword', this.meta_keyword);
            formData.append('schema_markup', this.schema_markup);
            formData.append('meta_description', this.meta_description);
            formData.append('og_image', this.og_image);

            const url = this.$apiUrl + (this.id ? '/seo_settings/update' : '/seo_settings/save');

               axios.post(url, formData, {
                   headers: {
                       'Content-Type': 'multipart/form-data'
                   }
               }).then(res => {
                   let data = res.data;
                   
                   if (data.status === 1) {
                       this.$eventBus.$emit('SmsTemplatesSaved', data.message);
                      this.$emit('modalClose');
                   } else {
                       this.showError(data.message);
                       this.isLoading = false;
                   }
               }).catch(error => {
                   this.isLoading = false;
                   if (error.request.statusText) {
                       this.showError(error.request.statusText);
                   } else if (error.message) {
                       this.showError(error.message);
                   } else {
                       this.showError(__('something_went_wrong'));
                   }
               });
           }
       
    },
    mounted() {
        this.showModal();
    }
};
</script>

<style scoped>
.image_preview {
    margin-top: 5px;
}
</style>
