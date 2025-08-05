<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" scrollable no-close-on-backdrop no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group">
                    <label>{{ __("parent_category") }}</label>
                    <select v-model="parent_id" class="form-control form-select" v-html="parent_categories"></select>
                    <span class="text-danger" v-if="id">{{ __('parent_category_note') }}</span>      
                </div>
                <div class="form-group">
                    <label>{{ __('category_name') }}</label>
                    <input type="text" class="form-control" required v-model="name" :placeholder="__('enter_category_name')"  v-on:keyup="createSlug">
                </div>
                 <div class="form-group">
                    <label>{{ __('slug') }}</label>
                    <i class="text-danger">*</i>
                    <input type="text" class="form-control" :placeholder="__('enter_category_slug')" v-model="slug">
                </div>
                <div class="form-group">
                    <label>{{ __('category_subtitle') }}</label><i class="text-danger">*</i>
                    <input type="text" class="form-control" required v-model="subtitle" :placeholder="__('enter_category_subtitle')">
                </div>
                <div class="form-group">
                    <label>{{ __('image') }}</label><i class="text-danger">*</i>
                    <p class="text-muted">Please choose square image of larger than 350px*350px &amp; smaller than 550px*550px.</p>
                    <span v-if="error" class="error">{{ error }}</span>

                    <input type="file" name="category_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">

                        <template v-if="image && image.name !== ''">
                            <label>Selected file name:- {{ image.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>

                    </div>
                    <div class="row" v-if="image_url">
                        <div class="col-md-4">
                            <img class="custom-image" :src="image_url" title='Category Image' alt='Category Image'/>
                        </div>
                    </div>
                </div>             
                <div class="form-group">
                    <label>{{ __('meta_title') }} </label>
                    <input type="text" class="form-control" v-model="meta_title" :placeholder="__('enter_meta_title')">
                </div>
                <div class="form-group">
                    <label>{{ __('meta_keywords') }} </label>
                    <input type="text" class="form-control" v-model="meta_keywords" :placeholder="__('enter_meta_keywords')">
                </div>
                <div class="form-group">
                    <label>{{ __('schema_markup') }} <small :id="'schema_markup'" class="d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2">
                                    <i class="fa fa-info-circle"></i>
                                </small>
                                <b-popover :target="'schema_markup'" triggers="hover" placement="left">
                                   <p>Schema markup, also known as structured data, is the language search engines use to read and understand the content on your pages. By language, we mean a semantic vocabulary (code) that helps search engines characterize and categorize the content of web pages. Learn more about schema markup and generate it for your website using the <a href="https://www.rankranger.com/schema-markup-generator" target="_blank">Rank Ranger Schema Markup Generator</a></p>
                                </b-popover></label>
                    <input type="text" class="form-control" v-model="schema_markup" :placeholder="__('enter_schema_markup')">
                </div>
            
                <div class="form-group">
                    <label>{{ __('meta_description') }} </label>
                    <textarea type="text" class="form-control" v-model="meta_description" :placeholder="__('enter_meta_description')" rows="4"></textarea>
                </div>
                <div class="form-group" v-if="id">
                    <label>{{ __('status') }}</label>
                    <div class="col-md-9 text-left mt-1">
                        <b-form-radio-group
                            v-model="status"
                            :options="[
                                    { text: ' Deactivated', 'value': 0 },
                                    { text: ' Activated', 'value': 1 },
                                ]"
                            buttons
                            button-variant="outline-primary"
                            required
                        ></b-form-radio-group>
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" style="display:none;"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data: function () {
        return {
            isLoading: false,
            image: null,

            id: this.record ? this.record.id : null,
            name: this.record ? this.record.name : null,
            slug:  this.record ? this.record.slug : null,
            subtitle: this.record ? this.record.subtitle : null,
            image_url: this.record ? this.record.image_url : null,
            status: this.record ? this.record.status : 1,
            parent_id: this.record ? this.record.parent_id : 0,
            error: null,
           
            editedCategoryId: null, // ID of the category being edited
            selectedCategories: [],
            parent_categories: null,

            meta_title: this.record ? this.record.meta_title : null,
            meta_keywords: this.record ? this.record.meta_keywords : null,
            schema_markup: this.record ? this.record.schema_markup : null,
            meta_description: this.record ? this.record.meta_description : null,
        };
    },
     watch: {
    editedCategoryId(newVal) {
      // Set the selectedParentId to the ID of the category being edited
      this.selectedParentId = newVal;
    },
  },
  created: function() {
        this.getParentCategories();
        
    },
    computed: {
        modal_title: function () {
            let title = this.id ? __('edit_category') : __('add_category');
            return title;
        },
         
    },
  
    methods: {
            createSlug() {
                if (this.name !== "") {
                    let slug = this.name.toLowerCase()
                        .replace(/[^\w ]+/g, '')
                        .replace(/ +/g, '-');

                    // Check for uniqueness
                    axios.get(this.$apiUrl +`/categories/check-slug/${slug}`)
                        .then(response => {
                            if (response.data.unique) {
                                this.slug = slug;
                            } else {
                                this.slug = slug + '-' + response.data.count;
                            }
                        })
                        .catch(error => {
                            console.error('Error checking slug uniqueness: ' + error);
                        });
                }
            },
            getParentCategories() {
            axios.get(this.$apiUrl + '/categories/options', {
        params: {
            exclude_id: this.record ? this.record.id : 0
        }
            })
                .then((response) => {
                   this.parent_categories = response.data;
                   
                });
        },
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
            this.image = this.$refs.file_image.files[0];
            this.image_url = URL.createObjectURL(this.image);
        },
        saveRecord: function () {
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('name', this.name);
            formData.append('slug', this.slug);
            formData.append('subtitle', this.subtitle);
            formData.append('image', this.image);
            formData.append('status', this.status);
            formData.append('parent_id', this.parent_id);
            formData.append('meta_title', this.meta_title);
            formData.append('meta_keywords', this.meta_keywords);
            formData.append('schema_markup', this.schema_markup);
            formData.append('meta_description', this.meta_description);
            let url = this.$apiUrl + '/categories/save';

            if (this.id) {
                url = this.$apiUrl + '/categories/update';
            }

            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                   
                    vm.$eventBus.$emit('categorySaved', data.message);
                    vm.hideModal();
                    vm.$router.push({path: '/manage_categories'});
                  

                } else {
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
    mounted() {
        this.showModal();
    }
}
</script>

<style scoped>

.image_preview {
    margin-top: 5px;
}
</style>
