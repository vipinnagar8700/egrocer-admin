<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer">
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">Save
                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
            <b-button variant="secondary" @click="hideModal">Cancel</b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord" novalidate>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="status" >{{ __('status') }}</label><br>
                        <input name="amount" id="amount" type="number" v-model="amount" hidden>
                        <div id="status" class="form-group btn-group">
                            <label class="btn btn-warning" data-toggle-class="btn-warning" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="status" value="0" class="form-check-input" > Pending
                            </label>
                            <label class="btn btn-success" data-toggle-class="btn-success" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="status" value="1" class="form-check-input"> Approved
                            </label>
                            <label class="btn btn-danger" data-toggle-class="btn-danger" data-toggle-passive-class="btn-default">
                                <input type="radio" v-model="status" value="2" class="form-check-input"> Rejected
                            </label>
                        </div>
                       
                        <div class="form-group" v-if="status == 1">
                            <label>{{ __('upload_receipt_image') }}</label><i class="text-danger">*</i>
                            <span v-if="error" class="error">{{ error }}</span>

                            <input type="file" name="receipt_image" accept="image/*" v-on:change="handleFileUpload" ref="file_image" class="file-input">
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
                                    <img class="custom-image" :src="image_url" title='Receipt Image' alt='Receipt Image'/>
                                </div>
                            </div>
                </div>
                        <div class="form-group">
                            <label for="remark">{{ __('remark') }}</label><i class="text-danger">*</i>
                            <textarea  v-model="remark" class="form-control" placeholder="Enter Remark" required>
                            </textarea>
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

export default {
    props: ['record'],
    data : function(){
        return {
            isLoading: false,
       
            id: this.record ? this.record.id : null ,
            status: this.record ? this.record.status : "" ,
            receipt_image: this.record ? this.record.receipt_image : null,
            remark: this.record ? this.record.remark : "" ,
            amount: this.record ? this.record.amount : "" ,
            image: ''
           
        };
    },
    computed: {
        modal_title: function(){
            let title = this.id ? "Edit" : "Add" ;
            title += " Withdrawal Request";
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
                this.error = "Invalid file type. Please upload a JPEG, PNG, JPG.";
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
             if (this.id) {
                formData.append('id', this.id);
            }
            formData.append('status', this.status);
            formData.append('receipt_image', this.image);
            formData.append('remark', this.remark);
            formData.append('amount', this.amount);
            let url = this.$apiUrl + '/withdrawal_requests/save';
            if(this.id){
                url = this.$apiUrl + '/withdrawal_requests/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('withdrawalRequestSaved', data.message);
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
