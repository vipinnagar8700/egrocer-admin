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
                    <label>{{ __('type') }}</label>
                    <select class="form-control form-select" v-model="type">
                        <option value="default"> {{ __('default') }}</option>
                        <option value="category"> {{ __('category') }}</option>
                        <option value="product"> {{ __('product') }}</option>
                        <option value="slider_url"> {{ __('slider_url') }}</option>
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
                        <option value="">{{ __('select_product') }}</option>
                        <option v-for="product in products" :value="product.id">{{ product.name }}</option>
                    </select>
                </div>
                <div class="form-group" v-if="type=='slider_url'">
                    <label> {{ __('link') }}</label>
                    <input type="url" class="form-control" v-model="slider_url" placeholder="Enter Link" required>
                </div>
                <div class="form-group">
                    <label> {{ __('image') }}</label>
                    <p class="text-muted"> {{ __('please_choose_square_image_of_larger_than_smaller_than') }}</p>
                    <input type="file" name="slider_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
                    <div class="file-input-div bg-gray-100" @click="$refs.file_image.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">

                        <template v-if="image && image.name !== ''">
                            <label>{{ __('selected_file_name') }}{{ image.name }}</label>
                        </template>
                        <template v-else>
                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                        </template>

                    </div>
                    <div class="row" v-if="image_url">
                        <div class="col-md-6">
                            <img class="custom-slider-image" :src="image_url" title='Store Logo' alt='Store Logo'/>
                        </div>
                    </div>
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
    props: ['record', 'categories', 'products'],
    data: function () {
        return {
            isLoading: false,
            image: null,
            id: this.record ? this.record.id : null,
            type: this.record ? this.record.type : 'default',
            type_id: this.record ? this.record.type_id : "",
            image_url: this.record ? this.record.image_url : null,
            slider_url: this.record ? this.record.slider_url : "",
            status: this.record ? this.record.status : 1,
        };
    },
    computed: {
        modal_title: function () {
            let title = this.id ? "Edit" : "Add";
            title += " Home Slider Image";
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
            formData.append('type', this.type);
            formData.append('type_id', this.type_id);
            formData.append('image', this.image);
            formData.append('slider_url', this.slider_url);
            formData.append('status', this.status);
            let url = this.$apiUrl + '/home_slider_images/save';
            if (this.id) {
                url = this.$apiUrl + '/home_slider_images/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('SliderSaved', data.message);
                    vm.$router.push({path: '/home_sliders'});
                    this.hideModal();
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

</style>
