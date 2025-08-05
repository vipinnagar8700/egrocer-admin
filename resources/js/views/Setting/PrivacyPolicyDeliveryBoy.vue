<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('delivery_boy_privacy_policy_and_term_conditions') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('delivery_boy_privacy_policy_and_term_conditions') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="contact_us_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('update_privacy_policy') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <div class="d-flex justify-content-between mb-2">
                                    <label>{{ __('privacy_policy') }}</label>
                                    <a :href="$baseUrl+'/delivery-boy-privacy-policy'" v-b-tooltip.hover title="Privacy Policy" target="_blank" class="btn btn-sm btn-primary"><i class="fa fa-eye"></i></a>
                                </div>
                                <editor
                                    placeholder="Enter Privacy Policy"
                                    v-model="policies.privacy_policy_delivery_boy"
                                    
                                    :init="{
                                        height:400,
                                        plugins: this.$editorPlugins ,
                                        toolbar: this.$editorToolbar,
                                        font_size_formats: this.$editorFont_size_formats,
                                    }"
                                />
                            </div>
                            <h4 class="card-title">{{ __('update_term_conditions') }}</h4>
                            <div class="form-group">
                                <div class="d-flex justify-content-between mb-2">
                                    <label>{{ __('term_conditions') }} : </label>
                                    <a :href="$baseUrl+'/delivery-boy-terms-conditions'" v-b-tooltip.hover title="Terms & Conditions" target="_blank" class="btn btn-sm btn-primary"><i class="fa fa-eye"></i></a>
                                </div>
                                <editor
                                    placeholder="Enter Terms & Conditions"
                                    v-model="policies.terms_conditions_delivery_boy"
                                    
                                    :init="{
                                        height:400,
                                        plugins: this.$editorPlugins ,
                                        toolbar: this.$editorToolbar,
                                        font_size_formats: this.$editorFont_size_formats,
                                    }"
                                />
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
import Editor from "@tinymce/tinymce-vue";

export default {
    components: { 'editor': Editor },
    data: function () {
        return {
            isLoading:false,
            policies: {
                privacy_policy_delivery_boy:"",
                terms_conditions_delivery_boy:""
            },
            record: null
        }
    },
    created: function () {
        this.getPrivacyPolicyDeliveryBoy()
    },
    methods: {
        getPrivacyPolicyDeliveryBoy() {
            axios.get(this.$apiUrl + '/privacy_policy_delivery_boy').then((response) => {
                this.record = response.data.data;
                this.record.map((item, index)=>{
                    this.policies[item.variable] = item.value;
                });
            });
        },
        saveRecord: function(){
            this.isLoading = true;
            let formData = this.policies;
            let url = this.$apiUrl + '/privacy_policy_delivery_boy/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.isLoading = false;
                            vm.$router.push({path:'/privacy_policy_delivery_boy'})
                        }, 1000);
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
                vm.isLoading = false;
            });
        }
    }
}
</script>
