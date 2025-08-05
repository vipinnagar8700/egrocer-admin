<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop no-fade static id="mymodal">
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">

            <div v-if="notificationError" class="alert alert-light-warning color-warning alert-dismissible fade show" role="alert">
                <strong><i class="bi bi-exclamation-triangle"></i> {{ __('warning') }}</strong>
                {{ notificationErrorMessage }}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>

            <div class="row">

                <div class="form-group">
                    <label for="type">Type {{ __('type') }}</label> <i class="text-danger">*</i>
                    <select name="type" id="type" required v-model="type" class="form-control form-select">
                        <option value=""> {{ __('select_type') }}</option>
                        <option value="default"> {{ __('default') }}</option>
                        <option value="category"> {{ __('category') }}</option>
                        <option value="product"> {{ __('product') }}</option>
                        <option value="user"> {{ __('customer') }}</option>
                        <option value="url"> {{ __('url') }}</option>
                    </select>
                </div>

                <div class="form-group" v-if="type === 'url'">
                    <label> {{ __('type_link') }}</label> <i class="text-danger">*</i>
                    <input type="url" class="form-control" v-model="type_link" placeholder="Enter Link">
                </div>

                <div class="form-group" v-if="type === 'user'">


                    <label> {{ __('customer') }}<small>( Ex : 100,205, 360 <comma separated="">)</comma></small></label> <i class="text-danger">*</i>
                    <Select2 v-model="type_ids"
                             placeholder="Select customers"
                             :options="users_options"
                             :settings="{ multiple: 'multiple', width:'100%',dropdownParent:'#mymodal' }" required />

                </div>
                <div class="form-group" v-if="type === 'category'">
                    <label for="category"> {{ __('categories') }}</label> <i class="text-danger">*</i>
                    <select name="category" id="category" v-model="type_id" class="form-control form-select" required>
                        <option >Select Category</option>
                        <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                    </select>
                </div>
                <div class="form-group" v-if="type === 'product'" >
                    <label for="product"> {{ __('products') }}</label> <i class="text-danger">*</i>
                    <select name="product" id="product" v-model="type_id" class="form-control form-select" required>
                        <option>Select Product</option>
                        <option v-for="product in products" :value="product.id">{{product.name}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="title"> {{ __('title') }}</label> <i class="text-danger">*</i>
                    <input type="text" name="title" id="title" required v-model="title" class="form-control" placeholder="Enter title">
                </div>

                <div class="form-group">
                    <label for="message"> {{ __('message') }}</label> <i class="text-danger">*</i>
                    <div class="form-floating mb-3">
                        <textarea name="message" id="message" v-model="message" rows="40" cols="70" class="form-control" placeholder="Enter Notification Message Here!"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <input name="include_image" id="include_image" v-model="include_image" type="checkbox" class="form-check-input">
                    <label for="include_image">{{ __('include_image') }}</label>
                </div>
                <div class="form-group" v-if="(include_image === true && id) || include_image === true">


                    <input type="file" name="notification_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image"  class="file-input">
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
                        <div class="col-md-2">
                            <img class="custom-image" :src="image_url" title='Store Logo' alt='Store Logo'/>
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
import Select2 from 'v-select2-component';
export default {
    props: ['record','users','categories','products'],
    components: {
        Select2
    },
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            type: this.record ? this.record.type : "" ,
            type_ids: this.record ? this.record.type_id : [] ,
            type_id: this.record ? this.record.type_id : 0 ,
            type_link: this.record ? this.record.type_link : "",
            title: this.record ? this.record.title : "" ,
            message: this.record ? this.record.message : "" ,
            include_image:false,
            image: this.record ? this.record.image : "" ,
            image_url: this.record ? this.record.image : "" ,

            notificationError:false,
            notificationErrorMessage:"",
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? __('edit') : __('add') ;
            title += " ";
            title += __('notification');
            return title;
        },
        users_options: function(){
            var temp = [];
            this.users.forEach(user => {
                temp.push({id: user.id, text: user.name})
            });
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
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if(this.id) {
                formData.append('id', this.id);
            }
            formData.append('type', this.type);
            formData.append('type_ids', this.type_ids);
            formData.append('type_id', this.type_id);
            formData.append('type_link', this.type_link);
            formData.append('title', this.title);
            formData.append('message', this.message);
            formData.append('include_image', this.include_image);
            formData.append('image', this.image);
            let url = this.$apiUrl + '/notifications/save';
            if(this.id){
                url = this.$apiUrl + '/notifications/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    let notification = data.data;

                    if(notification && notification?.status === 0){
                        this.notificationError = true;
                        this.notificationErrorMessage = notification.message;
                    }

                    setTimeout(function () {
                        vm.$eventBus.$emit('notificationSaved', data.message);
                        vm.hideModal();
                        vm.$swal.close();
                        vm.$router.push({path: '/notifications'});
                    }, 2000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;

                if (error.message) {
                    this.showError(error.message);
                } else if (error.request.statusText && error.request.statusText !== "" && typeof error.request.statusText !== 'undefined') {
                    this.showError(error.request.statusText);
                }else {
                    this.showError("Something went wrong!");
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
