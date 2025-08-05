<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>About Us</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">About Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form id="contact_us_form" method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Web Front-End About Us Settings</h4>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label>About Us</label>
                                <ckeditor :editor="editor" v-model="about.front_end_about_us" :config="editorConfig"></ckeditor>
                            </div>
                        </div>
                        <div class="card-footer">
                            <input type="submit" class="btn-primary btn" :value="__('update')" name="btn_update" v-if="$can('manage_about')">
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
            about: {},
            record: null
        }
    },
    created: function () {
        this.getAbout()
    },
    methods: {
        getAbout() {
            axios.get(this.$apiUrl + '/front_end_about').then((response) => {
                this.about = response.data.data.aboutObject;
                this.record = response.data.data.about;
                this.record.map((item, index)=>{
                    this.about[item.variable] = item.value;
                });
            });
        },
        saveRecord: function(){
            let formData = this.about;
            let url = this.$apiUrl + '/front_end_about/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.$router.push({path:'/front_end_about'})
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
