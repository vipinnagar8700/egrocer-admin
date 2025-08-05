<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" size="lg" scrollable no-close-on-backdrop no-fade static id="mymodal">
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">{{ __('save') }}
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">{{ __('cancel') }}</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">

            <div v-if="emailError" class="alert alert-light-warning color-warning alert-dismissible fade show" role="alert">
                <strong><i class="bi bi-exclamation-triangle"></i> {{ __('warning') }}</strong>
                {{ emailErrorMessage }}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>

            <div class="row">

                <div class="form-group">
                    <label for="type">Type {{ __('type') }}</label>
                    <select name="type" id="type" required v-model="type" class="form-control form-select">
                        <option value=""> {{ __('select_type') }}</option>
                        <option value="default"> {{ __('default') }}</option>
                        <option value="user"> {{ __('customer') }}</option>
                        
                    </select>
                </div>

              

                <div class="form-group" v-if="type === 'user'">


                    <label> {{ __('customer') }}<small>( Ex : 100,205, 360 <comma separated="">)</comma></small></label>
                    <Select2 v-model="type_ids"
                             placeholder="Select customers"
                             :options="users_options"
                             :settings="{ multiple: 'multiple', width:'100%',dropdownParent:'#mymodal' }" required />

                </div>
              
                <div class="form-group">
                    <label for="title"> {{ __('title') }}</label>
                    <input type="text" name="title" id="title" required v-model="title" class="form-control" placeholder="Enter title">
                </div>

               



                <div class="form-group">
    <label for="message"> {{ __('message') }} <code>[Customer Name]</code></label>
    <div class="type-list">
        <span 
            v-for="template in email_templates_options" 
            :key="template.id"
            :class="['btn', { 'btn-primary': type_ids.includes(template.id), 'btn-outline-primary': !type_ids.includes(template.id) }]"
            @click="selectTemplate(template)"
        >
            {{ template.type }}
        </span>
    </div>
    <div class="form-floating mb-3">
        <editor
            :placeholder="__('enter_message')"
            v-model="message"
            :init="{
                height: 400,
                plugins: $editorPlugins,
                toolbar: $editorToolbar,
                font_size_formats: $editorFont_size_formats,
            }"
        />
        <label for="message"> {{ __('enter_email_message_here') }}</label>
    </div>
</div>


                <div class="form-group">
                    <input name="include_image" id="include_image" v-model="include_image" type="checkbox" class="form-check-input">
                    <label for="include_image">{{ __('include_image') }}</label>
                </div>
                <div class="form-group" v-if="(include_image === true && id) || include_image === true">


                    <input type="file" name="email_image" accept="image/*,application/pdf" v-on:change="handleFileUpload" ref="file_image"  class="file-input">
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
import Editor from '@tinymce/tinymce-vue';
export default {
    props: ['record','users','email_templates'],
    components: {
        Select2,'editor': Editor 
    },
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            type: this.record ? this.record.type : "" ,
            type_ids: this.record ? this.record.type_id : [] ,
            email_templates: this.record ? this.record.email_templates : [] ,
            type_id: this.record ? this.record.type_id : 0 ,
            title: this.record ? this.record.title : "" ,
            message: this.record ? this.record.message : "" ,
            include_image:false,
            image: this.record ? this.record.image : "" ,
            image_url: this.record ? this.record.image : "" ,

            emailError:false,
            emailErrorMessage:"",
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? __('edit') : __('add') ;
            title += " ";
            title += __('email');
            return title;
        },
        users_options: function(){
            var temp = [];
            this.users.forEach(user => {
                temp.push({id: user.id, text: user.name})
            });
            return temp;
        },
       email_templates_options() {
            return this.email_templates.map(template => ({
                id: template.id,
                type: template.type,
                title: template.title,
                message: template.message,
            }));
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
         selectTemplate(template) {
            this.message = template.message;
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
            let url = this.$apiUrl + '/emails/save';
            if(this.id){
                url = this.$apiUrl + '/emails/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    let email = data.data;

                    if(email && email?.status === 0){
                        this.emailError = true;
                        this.emailErrorMessage = email.message;
                    }

                    setTimeout(function () {
                        vm.$eventBus.$emit('emailSaved', data.message);
                        vm.hideModal();
                        vm.$swal.close();
                        vm.$router.push({path: '/emails'});
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
