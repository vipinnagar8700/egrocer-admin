<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('about_us') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('about_us') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="contact_us_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('update_information') }}</h4>
                            <span class="pull-right">
                                <button type="button" class="btn btn-primary btn_refresh" v-b-tooltip.hover :title="__('refresh')" @click="getAboutUs()">
                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                </button>
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label>{{ __('about_us') }} : </label>
                                <editor
                                    placeholder="Enter About us"
                                    v-model="about.about_us"
                                    
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Editor from '@tinymce/tinymce-vue';

export default {
    components: { 'editor': Editor },
    data: function () {
        return {
            isLoading: false,
            about: {
                about_us:""
            },
            record: null
        }
    },
    created: function () {
        this.getAboutUs()
    },
    methods: {
        getAboutUs() {
            this.isLoading = true;
            axios.get(this.$apiUrl + '/about_us').then((response) => {
                if(response.data.data) {
                    this.record = response.data.data;
                    this.about.about_us = this.record.value;
                }
                this.isLoading = false;
            }).catch(error => {
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                this.isLoading = false;
            });
        },
        saveRecord: function(){
            let formData = this.about;
            let url = this.$apiUrl + '/about_us/save';
            let vm = this;
            vm.isLoading = true;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/about_us'})
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
