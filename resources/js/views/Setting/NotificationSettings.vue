<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3> {{ __('notification_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('notification_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="notification_settings_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('update_notification_settings') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="fcm_server_key"> {{ __('fcm_server_key') }} : </label>
                                <textarea class="form-control" name="fcm_server_key" v-model="notification_settings.fcm_server_key" id="fcm_server_key" placeholder="FCM Server Key" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="card-footer">
                            <b-button type="submit" variant="primary" :disabled="isLoading"> {{ __('update') }}
                                <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                            </b-button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data: function () {
        return {
            isLoading:false,
            notification_settings: {
                fcm_server_key:""
            },
            record: null
        }
    },
    created: function () {
        this.getNotificationSettings()
    },
    methods: {
        getNotificationSettings() {
            axios.get(this.$apiUrl + '/notification_settings').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;
                    this.notification_settings.fcm_server_key = this.record.value;
                }
            });
        },
        saveRecord: function(){
            let formData = this.notification_settings;
            let url = this.$apiUrl + '/notification_settings/save';
            let vm = this;
            vm.isLoading = true;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/notification_settings'});
                            vm.isLoading = false;
                        }, 100);
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
                vm.isLoading = false;
            });
        }
    }
}
</script>

