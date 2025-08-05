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
                    <input type="text" name="type" id="type" required v-model="type" class="form-control" placeholder="Enter type">
                </div>
              
                <div class="form-group">
                    <label for="title"> {{ __('title') }}</label>
                    <input type="text" name="title" id="title" required v-model="title" class="form-control" placeholder="Enter title">
                </div>

                <div class="form-group">
                    <label for="message"> {{ __('message') }}</label>
                    <div class="form-floating mb-3">
                        
                        <editor
                            :placeholder="__('enter_message')"
                            v-model="message"
                            :init="{
                                height: 400,
                                plugins: this.$editorPlugins.filter(plugin => !['image', 'link', 'media'].includes(plugin)), // Exclude 'image', 'link', and 'media' plugins
                                toolbar: this.$editorToolbar
                                    .replace('image', '') // Remove 'image' button
                                    .replace('link', '') // Remove 'link' button
                                    .replace('media', '') // Remove 'media' button
                                    .replace('||', '|') // Clean up any extra pipes
                                    .trim(),
                                font_size_formats: this.$editorFont_size_formats,
                            }"
                        />
                        <label for="message"> {{ __('enter_email_message_here') }}</label>
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
    props: ['record'],
    components: {
        Select2,'editor': Editor 
    },
    data : function(){
        return {
            isLoading: false,
            id: this.record ? this.record.id : null ,
            type: this.record ? this.record.type : "" ,
            title: this.record ? this.record.title : "" ,
            message: this.record ? this.record.message : "" ,
          

            emailError:false,
            emailErrorMessage:"",
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? __('edit') : __('add') ;
            title += " ";
            title += __('email_template');
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
       
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formData = new FormData();
            if(this.id) {
                formData.append('id', this.id);
            }
            formData.append('type', this.type);
            formData.append('title', this.title);
            formData.append('message', this.message);
            let url = this.$apiUrl + '/email_templates/save';
            if(this.id){
                url = this.$apiUrl + '/email_templates/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    let email_templates = data.data;

                    if(email_templates && email_templates?.status === 0){
                        this.emailError = true;
                        this.emailErrorMessage = email.message;
                    }

                    setTimeout(function () {
                        vm.$eventBus.$emit('emailSaved', data.message);
                        vm.hideModal();
                        vm.$swal.close();
                        vm.$router.push({path: '/email_templates'});
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
