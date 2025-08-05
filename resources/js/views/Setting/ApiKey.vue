<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Manage Api Keys</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Manage Api Keys</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="api_key_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Manage Api Keys</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="admin_key">User APP Api Link <small>(Use this link as your API link in user app)</small></label>
                                        <input type="text" class="form-control" name="admin_key" id="admin_key" value="http://localhost/client/ecart/ecart_php/api-firebase/" disabled="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="delivery_boy_key">Delivery Boy APP Api Link <small>(Use this link as your api link in delivery boy app)</small></label>
                                        <input type="text" class="form-control" name="delivery_boy_key" id="delivery_boy_key" value="http://localhost/client/ecart/ecart_php/delivery-boy/api/api-v1.php" disabled="">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="api_link">Seller APP Api Link <small>(Use this link as your api link in seller app)</small></label>
                                        <input type="text" class="form-control" name="api_link" id="api_link" value="http://localhost/client/ecart/ecart_php/seller/api/api-v1.php" disabled="">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="secret_key">Secret Key<small>(use this secret key in android application)</small></label>
                                        <input type="text" class="form-control" name="secret_key" id="secret_key" value="replace_with_your_strong_jwt_secret_key" disabled="">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="bearer_token">Bearer Token <small>(Use token for testing purpose in API)</small></label>
                                        <textarea name="bearer_token" id="bearer_token" class="form-control" rows="2" disabled="">eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTIzNTgwMzQsImlzcyI6ImVLYXJ0IiwiZXhwIjoxNjUyMzU5ODM0LCJzdWIiOiJlS2FydCBBdXRoZW50aWNhdGlvbiJ9.bkfMiHRTSqWdmGJVqYIrZ-NpO7FRk8T3Usnx_QiClb8</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data: function () {
        return {
            editor : ClassicEditor,
            editorConfig: {},
            contact: {
                contact_us:""
            },
            record: null
        }
    },
    created: function () {
        this.getContactUs()
    },
    methods: {
        getContactUs() {
            axios.get(this.$apiUrl + '/contact_us').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;
                    this.contact.contact_us = this.record.value;
                }
            });
        },
        saveRecord: function(){
            let formData = this.contact;
            let url = this.$apiUrl + '/contact_us/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    //this.showSuccess(data.message);
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/contact_us'})
                        }, 2000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    }
}
</script>
