<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('firebase_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('firebase_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="api_key_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('firebase_setup_keys') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <label><span class="text-danger text-xs">*</span> {{ __('required_fields') }}.</label>
                                <div class="divider"><div class="divider-text">{{ __('firebase_setup_keys_form') }}</div></div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="apiKey">{{ __('apikey') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="apiKey" id="apiKey" v-model="firebase.apiKey" placeholder="Enter api key.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="authDomain">{{ __('authdomain') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="authDomain" id="authDomain" v-model="firebase.authDomain" placeholder="Enter aith domain.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="projectId">{{ __('projectid') }} <span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="projectId" id="projectId" v-model="firebase.projectId" placeholder="Enter project id.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="storageBucket">{{ __('storagebucket') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="storageBucket" id="storageBucket" v-model="firebase.storageBucket" placeholder="Enter storage bucket.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="messagingSenderId"> {{ __('messagingsenderid') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="messagingSenderId" id="messagingSenderId" v-model="firebase.messagingSenderId" placeholder="Enter messaging sender id.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="appId"> {{ __('appid') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="appId" id="appId" v-model="firebase.appId" placeholder="Enter app id.">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="measurementId">{{ __('measurementid') }}<span class="text-danger text-xs">*</span></label>
                                        <input type="text" class="form-control" name="measurementId" id="measurementId" v-model="firebase.measurementId" placeholder="Enter measurement id.">
                                    </div>
                                </div>



                                <div class="divider">
                                    <div class="divider-text">{{ __('firebase_json_file_upload') }}</div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="jsonFile">{{ __('firebase_json_file') }}</label>
                                        <input type="file" name="jsonFile" id="jsonFile" ref="jsonFile" v-on:change="handleFileUpload" class="form-control" accept=".json"/>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div class="card-footer">
                            <b-button type="submit" variant="primary" :disabled="isLoading">{{ __('update') }}
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
            isLoading: false,

            editorConfig: {},
            firebase: {
                apiKey:"",
                authDomain:"",
                databaseURL:"",
                projectId:"",
                storageBucket:"",
                messagingSenderId:"",
                appId:"",
                measurementId:"",
                jsonFile:""
            },
            record: null
        }
    },
    created: function () {
        if(this.$isDemo != 1) {
            this.getFirebaseData();
        }
    },
    methods: {
        getFirebaseData() {
            axios.get(this.$apiUrl + '/firebase').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;
                    this.record.map((item, index) => {
                        if (item.value === '0' || item.value === '1') {
                            this.firebase[item.variable] = (item.value === '0') ? 0 : 1;
                        } else {
                            this.firebase[item.variable] = item.value;
                        }
                    });
                }
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },

        handleFileUpload() {
            this.firebase.jsonFile = this.$refs.jsonFile.files[0];
            this.image_url = URL.createObjectURL(this.image);
        },

        saveRecord: function(){
            this.isLoading = true;

            let object = this.firebase;
            let formData = new FormData();
            for (let key in object) {
                formData.append(key, object[key]);
            }

            let url = this.$apiUrl + '/firebase/save';
            let vm = this;

            axios.post(url, formData).then(res => {

                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/firebase'});
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
                    this.showError(__('something_went_wrong'));
                }
                vm.isLoading = true;
            });

        }
    }
}
</script> 
