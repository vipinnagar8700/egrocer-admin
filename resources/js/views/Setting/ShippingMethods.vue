<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Shipping Methods</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Shipping Methods</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="api_key_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Shipping Methods</h4>
                            <button type="button" class="btn" @click="modalShow = !modalShow">(What is shipping method?)</button>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="local_shipping">Enable Local Shipping </label><small>( Use Local Delivery Boy For Shipping)</small>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="local_shipping" type='checkbox' v-model="shipping.local_shipping" :checked="shipping.local_shipping === 1 ">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="standard_shipping">Standard delivery method (Shiprocket)</label>
                                        <small>( Enable/Disable ) <a href="https://app.shiprocket.in/api-user" target="_blank">Click here</a> to get credentials. <a href="https://www.shiprocket.in/" target="_blank">What is shiprocket?</a></small>
                                        <div class='form-check form-switch'>
                                            <input class='form-check-input' id="standard_shipping" type='checkbox' v-model="shipping.standard_shipping" :checked="shipping.standard_shipping === 1 ">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group ">
                                        <label for="shiprocket_email">Email</label>
                                        <input type="text"  name="shiprocket_email" id="shiprocket_email" v-model="shipping.shiprocket_email" class="form-control" placeholder='Shiprocket account email' />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="shiprocket_password">Password</label>
                                        <div class="input-group">
                                            <input v-bind:type="[showPassword ? 'text' : 'password']" name="shiprocket_password" id="shiprocket_password" v-model="shipping.shiprocket_password" placeholder='Shiprocket account password' class="form-control">
                                            <button type="button" class="btn btn-primary" @click="toggleShow">
                                                <i class="fa" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="shiprocket_email">Shiprocket Webhoook Url</label>
                                        <input type="text" name="shiprocket_email" id="Shiprocket Webhoook" disabled v-model="shipping.shiprocket_webhook" class="form-control" placeholder='Shiprocket Webhook url' />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="webhook_token">Shiprocket webhook token</label>
                                    <div class="input-group">
                                        <input type="text" name="webhook_token" id="webhook_token" readonly required v-model="shipping.webhook_token"  class="form-control" placeholder="Generating new token....">
                                        <button type="button" class="btn btn-primary"  @click="generateToken">
                                            <i class="fa fa-refresh" :class="{ 'fa-spin': refreshing, ' ': !refreshing }"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary" name="btnValidate">{{ __('save') }}</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
        <b-modal v-model="modalShow" title="What is Shipping methods">
            <b-container fluid>
                <b>Note:</b> In shipping methods Admin can select one shipping method at a time.

                <br>
                <br>
                <b>Available Shipping Methods:</b><br>
                <br>
                <b>1.Local Shipping:</b>in local shipping admin can use local delivery boys for delivered orders to customers .

                <br><br>
                <b>2.Standard Shipping Methods:</b> in standard shipping method admin can use other corrirer servic like shiporkcet for delivered orders to customers.
                <br><br>
                <b>Availabl Standard shipping:</b>
                <br><br>
                <b>1 Shiprocket:</b> Shiprocket, a product of Delhi based BigFoot Retail solution, is India's first automated shipping software that aims reduce ecommerce shipping to its bare bones. ... You can print bulk shipping labels and ship your products to in and around the world using a single platform.<a href="https://www.shiprocket.in/" target="blank"> Know more about shiprocket</a>
            </b-container>
            <template #modal-footer>
                    <b-button
                        variant="secondary"
                        size="sm"
                        class="float-right"
                        @click="modalShow=false"
                    >
                        Close
                    </b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>
import axios from "axios";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    data: function () {
        return {
            modalShow: false,
            showPassword: false,
            refreshing:false,
            shipping:{
                local_shipping:0,
                standard_shipping:0,
                shiprocket_email:"",
                shiprocket_password:"",
                webhook_token:"",
                shiprocket_webhook: this.$baseUrl +'/shiprocket_webhook',
            }
        }
    },
    created: function () {
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        generateToken(){
            this.shipping.webhook_token = 'Generating...';
            this.refreshing = true;
            setTimeout(()=> {
                let token = Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2) + '-' + Math.random().toString(36).substr(2);
                this.refreshing = false;
                this.shipping.webhook_token = token;
            },2000);
        },
        getShipping() {
            axios.get(this.$apiUrl + '/shipping_methods').then((response) => {
                let data = JSON.parse(response.data.data);
                this.shipping.standard_shipping = (data.shiprocket)?1:0;
                this.shipping.shiprocket_email = data.shiprocket_email;
                this.shipping.shiprocket_password = data.shiprocket_password;
                this.shipping.webhook_token = data.webhook_token;
            });
        },
        saveRecord: function(){
            let formData = this.shipping;
            let url = this.$apiUrl + '/shipping_methods/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.getShipping();
                    vm.showSuccess(data.message);
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
