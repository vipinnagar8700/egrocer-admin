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
                    <label for="name">{{ __('name') }} </label>
                    <input name="name" id="name" v-model="name"  class="form-control">
                </div>
                <div class="form-group">
                    <label for="dial_code">{{ __('dial_code') }} </label>
                    <input name="dial_code" id="dial_code" v-model="dial_code"  class="form-control">
                </div>
                <div class="form-group">
                    <label for="code">{{ __('code') }} </label>
                    <input name="code" id="code" v-model="code"  class="form-control">
                </div>

                <div class="form-group">
                    <label>{{ __('logo') }}</label>
                    <p class="text-muted">{{ __('please_choose_square_image_of_larger_than_350px_350px_and_smaller_than_550px_550px') }}</p>
                    <span v-if="error" class="error">{{ error }}</span>
                    <input type="file" name="logo" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                        <template v-if="logo && logo.name !== ''">
                            <label>{{ __('selected_file_name') }} {{ logo.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>

                    </div>
                    <div class="row" v-if="logo_url">
                        <div class="col-md-4">
                            <img class="custom-image" :src="logo_url" title='Country Logo' alt='Country Logo'/>
                        </div>
                    </div>
                </div>
                <div class="form-group" v-if="id">
                    <label>{{ __('status') }} </label>
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
            logo: null,
            id: this.record ? this.record.id : null,
            name:this.record ? this.record.name : "",
            dial_code:this.record ? this.record.dial_code : "",
            code:this.record ? this.record.code : "",
            logo_url: this.record ? this.record.logo_url : null,
            status: this.record ? this.record.status : 1,
            error: null,
        };
    },
    computed: {
        modal_title: function () {
            let title = this.id ? __('edit_country') : __('add_country');
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
            this.logo = this.$refs.file_image.files[0];
            this.logo_url = URL.createObjectURL(this.logo);
        },
        saveRecord: function () {

            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('name', this.name);
            formData.append('dial_code', this.dial_code);
            formData.append('code', this.code);
            formData.append('logo', this.logo);
            formData.append('status', this.status);

            let url = this.$apiUrl + '/countries/save';
            if (this.id) {
                url = this.$apiUrl + '/countries/update';
            }

            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('recordSaved', data.message);
                    vm.$router.push({path: '/countries'});
                    this.hideModal();
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
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
