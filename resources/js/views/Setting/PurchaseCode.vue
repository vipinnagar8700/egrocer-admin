<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('purchase_code') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('purchase_code') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="api_key_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('validate_the_authentic_purchase_of_egrocer') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="row" v-if="isLoading">
                                <div class="text-center">
                                    <b-spinner label="Spinning"></b-spinner>
                                </div>
                            </div>
                            <div class="row" v-if="!isLoading">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="purchase_code">{{ __('enter_the_purchase_code') }}</label>
                                        <input type="text" name="purchase_code" id="purchase_code" v-model="purchase_code" required placeholder="Enter the purchase code here" class="form-control" :disabled="hasValid">
                                    </div>
                                    <div class="form-group" v-if="!hasValid">
                                        <button type="submit" class="btn btn-primary" name="btnValidate" :disabled="isValidation">
                                            {{ __('validate_now') }}
                                            <b-spinner small label="Spinning" v-if="isValidation"></b-spinner>
                                        </button>
                                        <button type="reset" class="btn-warning btn">{{ __('clear') }}</button>
                                    </div>
                                    <div v-if="hasValid">
                                        <label class="alert alert-success">
                                            {{ __('purchase_code_verified_successfully') }}!
                                        </label>
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
            isLoading:true,
            purchase_code:"",
            hasValid:false,
            isValidation:false,
        }
    },
    created: function () {
        this.getRecord();
    },
    methods: {

        getRecord: function(){
            let url = this.$apiUrl +'/store_settings/purchase_code';
            axios.get(url).then((response) => {
                let data = response.data;
                this.isLoading = false;
                if (data.status && data.data!=''){
                    this.purchase_code = data.data;
                    this.hasValid = true;
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
        },

        saveRecord: function(){
            let url = this.$apiUrl +'/store_settings/purchase_code/'+ this.purchase_code;
            this.isValidation = true;
            axios.get(url).then((response) => {
                this.isValidation = false;
                let data = JSON.parse(response.data.data);
                if (data.error === true){
                    this.showError(data.message);
                }else {
                    this.showMessage("success", data.message);
                    this.hasValid = true;
                }
            }).catch(error => {
                this.isValidation = false;
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
