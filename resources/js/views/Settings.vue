<template>
    <div>
        <div class="page-heading">
            <h3>{{ __('settings') }}</h3>
        </div>
        <div class="page-content">
            <section class="row">
                <div class="col-12 col-lg-12">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <form @submit.prevent="saveMailSetting">
                                <div class="card">
                                    <div class="card-body px-3 py-4-5">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h3>{{ __('order_mail_settings') }}</h3>
                                                <div class="mt-5">
                                                    <div class="col-8 col-md-8 mb-2 offset-md-1">
                                                        <div class="row d-flex justify-content-between ">
                                                            <div class="col-6"><h6>{{ __('order_status') }}</h6></div>
                                                            <div class="col-2"><h6>{{ __('mail') }}</h6></div>
                                                            <div class="col-2"><h6>{{ __('sms') }}</h6></div>
                                                        </div>
                                                        <div v-for="(status,index) in statuses" class="row d-flex justify-content-between ">
                                                            <div class="col-6">
                                                                <label :for="'checkbox_'+status.id"> {{ formattedName(status.status) }} </label>
                                                            </div>
                                                            <div class="form-check form-switch col-2">
                                                                <input class='form-check-input' type='checkbox'
                                                                       :id="'checkbox_'+status.id"
                                                                       :value="status.id" v-model="mail_statuses"
                                                                       :checked="mail_statuses.includes(status.id)">
                                                            </div>
                                                          
                                                            <div class="form-check form-switch col-2">
                                                                <input class='form-check-input' type='checkbox'
                                                                       :id="'checkbox_'+status.id"
                                                                       :value="status.id" v-model="sms_statuses"
                                                                       :checked="sms_statuses.includes(status.id)">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                            {{ __('save') }} <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                        </button>
                                        <button type="button" class="btn btn-danger" @click="$router.go(-1)">{{ __('back') }}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <form @submit.prevent="saveRecord">
                            <div class="card">
                                <div class="card-body px-3 py-4-5">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h3>{{ __('change_username_and_password') }}</h3>
                                            <div class="mt-5">
                                                <div class="form-group">
                                                     <label for='username'>{{ __('username') }}</label>
                                                     <input type='text' id='username' v-model="settings.username" class='form-control' :placeholder="__('username')" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for='current_password'>{{ __('current_password') }}</label>
                                                    <input type='password' id='current_password' v-model="settings.current_password" class='form-control' :placeholder="__('current_password')" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for='password'>{{ __('password') }}</label>
                                                    <input type='password' id='password' v-model="settings.password" class='form-control' :placeholder="__('password')" required />
                                                </div>
                                                <div class="form-group">
                                                    <label for='confirm_password'>{{ __('confirm_password') }}</label>
                                                    <input type='password' id='confirm_password' v-model="settings.confirm_password" class='form-control' :placeholder="__('confirm_password')" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                        {{ __('save') }} <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="$router.go(-1)">{{ __('back') }}</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    </div>
</template>
<script>
import axios from "axios";
import Auth from '../Auth.js';
export default {
    data : function(){
        return {
            isLoading: false,
            statuses:[],
            mail_statuses:[],
            mobile_statuses:[],
            sms_statuses:[],
            settings : {
                username: Auth.user.username,
                current_password: "",
                password: "",
                confirm_password: "",
            }
        };
    },
    created: function() {
        this.getOrderStatus();
        this.getMailSetting();
    },
    methods: {
        getOrderStatus: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/order_statuses').then((response) => {
                this.isLoading = false
                this.statuses = response.data.data;
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
        },
        getMailSetting: function () {
            let vm = this;
            axios.get(this.$apiUrl + '/mail_settings').then((response) => {
                this.isLoading = false
                let data = response.data.data;
                data.forEach((status)=>{
                    if(status.mail_status === 1){
                        this.mail_statuses.push(status.order_status_id);
                    }
                    if(status.mobile_status === 1){
                        this.mobile_statuses.push(status.order_status_id);
                    }
                    if(status.sms_status === 1){
                        this.sms_statuses.push(status.order_status_id);
                    }
                });
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
        },
        saveMailSetting: function() {
            let vm = this;
            this.isLoading = true;

            let formData = new FormData();
            this.statuses.forEach((status)=>{
                formData.append('status_ids[]', status.id);
                if(this.mail_statuses.includes(status.id)){
                    formData.append('mail_statuses[]', "1");
                }else{
                    formData.append('mail_statuses[]', "0");
                }
                if(this.mobile_statuses.includes(status.id)){
                    formData.append('mobile_statuses[]', "1");
                }else{
                    formData.append('mobile_statuses[]', "0");
                }
                if(this.sms_statuses.includes(status.id)){
                    formData.append('sms_statuses[]', "1");
                }else{
                    formData.append('sms_statuses[]', "0");
                }
            });
            axios.post(this.$apiUrl + '/mail_settings/save', formData).then(res => {
                let data = res.data;
                vm.isLoading = false;
                if (data.status === 1) {
                    vm.showSuccess(data.message);
                    this.getMailSetting();
                }else{
                    vm.showError(data.message);
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
        },

        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            axios.post(this.$apiUrl + '/system_users/change_password', this.settings).then(res => {
                let data = res.data;
                vm.isLoading = false;
                if (data.status === 1) {
                    vm.showMessage("success", data.message);
                    let role_id = Auth.user.role_id;
                    if (role_id === 3) {
                        this.$router.push('/seller');
                    } else if (role_id === 4) {
                        this.$router.push('/delivery_boy');
                    } else {
                        this.$router.push({path:'/'});
                    }
                }else{
                    vm.showError(data.message);
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
};
</script>
