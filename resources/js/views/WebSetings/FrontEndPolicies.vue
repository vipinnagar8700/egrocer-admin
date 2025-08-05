<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>Update Policies</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Update Policies</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="contact_us_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Update Refund Policies</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label>Refund Policy : </label>
                                <ckeditor :editor="editor" v-model="policies.refund_policy" :config="editorConfig"></ckeditor>
                            </div>
                            <h4 class="card-title">Update Shipping Policies</h4>
                            <div class="form-group">
                                <label>Shipping Policies : </label>
                                <ckeditor :editor="editor" v-model="policies.shipping_policy" :config="editorConfig"></ckeditor>
                            </div>
                            <h4 class="card-title">Update Delivery & Return Policies</h4>
                            <div class="form-group">
                                <label>Delivery & Return Policies : </label>
                                <ckeditor :editor="editor" v-model="policies.delivery_returns_policy" :config="editorConfig"></ckeditor>
                            </div>
                        </div>
                        <div class="card-footer">
                            <input type="submit" class="btn-primary btn" :value="__('update')" name="btn_update" v-if="$can('manage_policies')">
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
            policies: {},
            record: null
        }
    },
    created: function () {
        this.getFrontEndPolicies()
    },
    methods: {
        getFrontEndPolicies() {
            axios.get(this.$apiUrl + '/front_end_policies').then((response) => {
                this.policies = response.data.data.policiesObject;
                this.record = response.data.data.policies;
                this.record.map((item, index)=>{
                    this.policies[item.variable] = item.value;
                });
            });
        },
        saveRecord: function(){
            let formData = this.policies;
            let url = this.$apiUrl + '/front_end_policies/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/front_end_policies'})
                        }, 2000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                this.showError("Something went wrong!");
            });
        }
    }
}
</script>
