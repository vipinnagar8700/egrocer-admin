<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('general_web_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard') }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('general_web_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('header_settings') }}</h4>
                        </div>
                        <div class="card-body">
                            <label><span class="text-danger text-xs">*</span> {{__('required_fields')}}</label>
                            <div class="divider"><div class="divider-text">{{__('web_settings_form')}}</div></div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="site_title">{{ __('site_title') }}</label>
                                    <i class="text-danger">*</i>
                                    <input type="text" name="site_title" id="site_title" v-model="settings.site_title" class="form-control" :placeholder="__('site_title')" />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="website_url">{{ __('website_url')}}</label>
                                    <i class="text-danger">*</i>
                                    <div class="input-group">
                                        <input type="text" name="website_url" id="website_url" v-model="settings.website_url" class="form-control" :placeholder="__('website_url')" />
                                        <button type="button" class="btn btn-primary" v-if="settings.website_url" @click="openUrl(settings.website_url)">
                                            <i class="fa fa-solid fa-globe fs-5"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="common_meta_title">{{ __('common_meta_title')}}</label>
                                    <i class="text-danger">*</i>
                                    <div class="input-group">
                                        <input type="text" name="common_meta_title" id="common_meta_title" v-model="settings.common_meta_title" class="form-control" :placeholder="__('common_meta_title')" />
                                    </div>
                                </div>
                                <div class="form-group col-md-8">
                                    <label for="common_meta_description">{{ __('common_meta_description')}}</label>
                                    <i class="text-danger">*</i>
                                    <div class="input-group">
                                        <textarea type="text" name="common_meta_description" id="common_meta_description" v-model="settings.common_meta_description" class="form-control" :placeholder="__('common_meta_description')" />
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="website_mode" class="website_maitenance_mode">{{ __('website_maitenance_mode') }} <span
                                        class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }}
                                        ) </span> &nbsp; &nbsp;
                                    <span class="form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="website_mode"
                                               id="website_mode" v-model="settings.website_mode">
                                    </span>
                                    </label>
                                    <div class="form-floating mb-3" v-if="settings.website_mode == 1">
                                        <textarea name="message" id="website_mode_remark" :required="settings.website_mode == 1"  v-model="settings.website_mode_remark" class="form-control" placeholder="Enter Notification Message Here!"></textarea>
                                        <label for="website_mode_remark">{{ __('website_remark') }}</label>
                                    </div>
                                </div>
                               
                                <div class="row mt-3 mb-3">
                                    <div class="form-group col-md-4">
                                        <div class="row">
                                            <div class="col-md-12 col-xxl-12">
                                                <label for="web_logo">{{ __('web_logo') }}</label>
                                                <i class="text-danger">*</i>
                                                <input type='file' name='web_logo' id='web_logo' v-on:change="handleWebLogoUpload" ref="web_logo" accept="image/*" class="file-input"/>
                                                <div class="file-input-div" @click="$refs.web_logo.click()" @drop="dropFileWebLogo" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <template v-if="web_logo_name && web_logo_name !== ''">
                                                        <label>Selected file name:- {{ web_logo_name }}</label>
                                                    </template>
                                                    <template v-else>
                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-xxl-12" v-if="web_logo_url">
                                                <img class="custom-row-image" :src="web_logo_url" title='Web Logo' alt='Web Logo'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <div class="row">
                                            <div class="col-md-12 col-xxl-12">
                                                <label for="favicon">{{ __('favicon_icon') }} </label>
                                                <i class="text-danger">*</i>
                                                <input type='file' name='favicon' id='favicon' v-on:change="handleFaviconUpload" ref="favicon" accept="image/*" class="file-input"/>
                                                <div class="file-input-div" @click="$refs.favicon.click()" @drop="dropFileFavicon" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <template v-if="favicon_name && favicon_name !== ''">
                                                        <label>Selected file name:- {{ favicon_name }}</label>
                                                    </template>
                                                    <template v-else>
                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-xxl-12" v-if="favicon_url">
                                                <img class="custom-row-image" :src="favicon_url" title='Favicon Icon' alt='Favicon Icon'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <div class="row">
                                            <div class="col-md-12 col-xxl-12">
                                                <label for="placeholder_image">{{ __('placeholder_image') }} </label>
                                                <i class="text-danger">*</i>
                                                <input type='file' name='placeholder_image' id='placeholder_image' v-on:change="handlePlaceholderImageUpload" ref="placeholder_image" accept="image/*" class="file-input"/>
                                                <div class="file-input-div" @click="$refs.placeholder_image.click()" @drop="dropFilePlaceholderImage" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <template v-if="placeholder_image_name && placeholder_image_name !== ''">
                                                        <label>Selected file name:- {{ placeholder_image_name }}</label>
                                                    </template>
                                                    <template v-else>
                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                    </template>
                                                </div>
                                            </div>
                                            <div class="col-md-12 col-xxl-12" v-if="placeholder_image_url">
                                                <img class="custom-row-image" :src="placeholder_image_url" title="__('placeholder_image')" alt='Placeholder Image'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="color">{{ __('color')?__('color'):'Color' }}</label>
                                    <i class="text-danger">*</i>
                                    <b-input-group prepend class="mb-2">
                                        <input type="text" v-model="settings.color" class="form-control">
                                        <input type="color" id="color" name='color' v-model="settings.color" class="form-control">
                                    </b-input-group>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="light_color">{{ __('light_color')?__('light_color'):'Light Color' }}</label>
                                    <i class="text-danger">*</i>
                                    <b-input-group prepend class="mb-2">
                                        <input type="text" v-model="settings.light_color" class="form-control">
                                        <input type="color" id="light_color" name='light_color' v-model="settings.light_color" class="form-control">
                                    </b-input-group>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="dark_color">{{ __('dark_color')?__('dark_color'):'Dark Color' }}</label>
                                    <i class="text-danger">*</i>
                                    <b-input-group prepend class="mb-2">
                                        <input type="text" v-model="settings.dark_color" class="form-control">
                                        <input type="color" id="dark_color" name='dark_color' v-model="settings.dark_color" class="form-control">
                                    </b-input-group>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('app_download_section') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="app_title">{{ __('app_title') }}</label>
                                    <input type="text" name="app_title" id="app_title" v-model="settings.app_title" class="form-control" :placeholder="__('enter_app_title')">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="short_description">{{ __('short_description') }}</label>s
                                    <div class="mb-3">
                                        <textarea name="short_description" id="short_description" v-model="settings.app_short_description" rows="5" cols="1" class="form-control" :placeholder="__('enter_app_short_description_here')"></textarea>
                                      
                                    </div>
                                </div>

                                <div class="form-group col-md-6">
                                    <div class="list-group-item">
                                        <div class="form-group">
                                            <label for="is_android_app">{{__('android_app')}}</label> <i class="text-danger">*</i><br>
                                           
                                            <div class="form-check form-switch">
                                                <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_android_app"
                                                       id="is_android_app" v-model="settings.is_android_app">
                                            </div>
                                        </div>
                                        <div class="form-group" v-if="settings.is_android_app == 1">
                                            <label for="android_app_url">{{__('android_application_url')}}</label>
                                            <i class="text-danger">*</i>
                                            <input type="text" name="android_app_url" id="android_app_url" v-model="settings.android_app_url" class="form-control"
                                                   :placeholder="__('enter_android_app_url')" />
                                        </div>
                                        <div class="form-group" v-if="settings.is_android_app == 1">
                                            <label for="android_app_url">{{ __('android_play_store_logo') }}</label>
                                            <i class="text-danger">*</i>
                                            <input type='file' name='play_store_logo' id='play_store_logo' v-on:change="handlePlayStoreLogoUpload" ref="play_store_logo" accept="image/*" class="file-input"/>
                                            <div class="file-input-div" @click="$refs.play_store_logo.click()" @drop="dropFilePlayStoreLogo" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                <template v-if="play_store_logo_name && play_store_logo_name !== ''">
                                                    <label>Selected file name:- {{ play_store_logo_name }}</label>
                                                </template>
                                                <template v-else>
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </template>
                                            </div>
                                            <div v-if="play_store_logo_url">
                                                <img class="custom-row-image" :src="play_store_logo_url" title='Web Logo' alt='Web Logo'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group col-md-6">
                                    <div class="list-group-item">
                                        <div class="form-group">
                                            <label for="is_ios_app">{{ __('ios_app') }}</label>
                                            <i class="text-danger">*</i>
                                            <div class="form-check form-switch">
                                                <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_ios_app"
                                                       id="is_ios_app" v-model="settings.is_ios_app">
                                            </div>
                                        </div>
                                        <div class="form-group" v-if="settings.is_ios_app == 1">
                                            <label for="ios_app_url">{{__('ios_application_url')}}</label>
                                            <i class="text-danger">*</i>
                                            <input type="text" name="ios_app_url" id="ios_app_url" v-model="settings.ios_app_url" class="form-control" :placeholder="__('enter_ios_spp_url')" />
                                        </div>
                                        <div class="form-group" v-if="settings.is_ios_app == 1">
                                            <label for="android_app_url">{{ __('ios_store_logo') }}</label>
                                            <i class="text-danger">*</i>
                                            <input type='file' name='ios_store_logo' id='ios_store_logo' v-on:change="handleIosStoreLogoUpload" ref="ios_store_logo" accept="image/*" class="file-input"/>
                                            <div class="file-input-div" @click="$refs.ios_store_logo.click()" @drop="dropFileIosStoreLogo" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                <template v-if="ios_store_logo_name && ios_store_logo_name !== ''">
                                                    <label>Selected file name:- {{ ios_store_logo_name }}</label>
                                                </template>
                                                <template v-else>
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </template>
                                            </div>
                                            <div class="col-md-3" v-if="ios_store_logo_url">
                                                <img class="custom-row-image" :src="ios_store_logo_url" title='IOS store Logo' alt='IOS store Logo'/>
                                            </div>
                                        </div>
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

    data: function () {
        return {
            colors:"",

            isLoading: false,
            editor : ClassicEditor,
            editorConfig: {},
            settings: {},
            record: null,

            web_logo_url:"",
            web_logo_name:"",

            favicon_url:"",
            favicon_name:"",
            placeholder_image_url:"",
            placeholder_image_name:"",

            play_store_logo_url:"",
            play_store_logo_name:"",

            ios_store_logo_url:"",
            ios_store_logo_name:"",

        }
    },
    created: function () {
        this.getSettings()
    },
    methods: {

        ValidURL(str) {
            var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex .test(str)) {
                this.showError("Please enter valid URL.");
                return false;
            } else {
                return true;
            }
        },
        openUrl(url){
            if(this.ValidURL(url)){
                window.open(url, '__blank');
            }
        },



        getSettings() {
            axios.get(this.$apiUrl + '/web_settings').then((response) => {
                this.settings = response.data.data.settingsObject;
                this.record = response.data.data.settings;

                this.record.map((item, index)=>{
                    this.settings[item.variable] = item.value;
                });

                if(this.settings.web_logo != ""){
                    this.web_logo_url = this.$storageUrl + this.settings.web_logo;
                }else{
                    this.web_logo_url = this.$baseUrl + '/images/logo.png';
                }
                this.favicon_url = this.$storageUrl + this.settings.favicon;
                this.placeholder_image_url = this.$storageUrl + this.settings.placeholder_image;
                this.play_store_logo_url = this.$storageUrl + this.settings.play_store_logo;
                this.ios_store_logo_url = this.$storageUrl + this.settings.ios_store_logo;

            });
        },
        handlePlayStoreLogoUpload: function (){
            this.settings.play_store_logo = this.$refs.play_store_logo.files[0];
            this.play_store_logo_url = URL.createObjectURL(this.settings.play_store_logo);
            this.play_store_logo_name = this.settings.play_store_logo.name;
        },
        dropFilePlayStoreLogo(event) {
            event.preventDefault();
            this.$refs.play_store_logo.files = event.dataTransfer.files;
            this.handlePlayStoreLogoUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleIosStoreLogoUpload: function (){
            this.settings.ios_store_logo = this.$refs.ios_store_logo.files[0];
            this.ios_store_logo_url = URL.createObjectURL(this.settings.ios_store_logo);
            this.ios_store_logo_name = this.settings.ios_store_logo.name;
        },
        dropFileIosStoreLogo(event) {
            event.preventDefault();
            this.$refs.ios_store_logo.files = event.dataTransfer.files;
            this.handleIosStoreLogoUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        handleFaviconUpload: function (){
            this.settings.favicon = this.$refs.favicon.files[0];
            this.favicon_url = URL.createObjectURL(this.settings.favicon);
            this.favicon_name = this.settings.favicon.name;
        },

        dropFileFavicon(event) {
            event.preventDefault();
            this.$refs.favicon.files = event.dataTransfer.files;
            this.handleFaviconUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        handlePlaceholderImageUpload: function (){
            this.settings.placeholder_image = this.$refs.placeholder_image.files[0];
            this.placeholder_image_url = URL.createObjectURL(this.settings.placeholder_image);
            this.placeholder_image_name = this.settings.placeholder_image.name;
        },

        dropFilePlaceholderImage(event) {
            event.preventDefault();
            this.$refs.placeholder_image.files = event.dataTransfer.files;
            this.handlePlaceholderImageUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        handleWebLogoUpload: function (){
            this.settings.web_logo = this.$refs.web_logo.files[0];
            this.web_logo_url = URL.createObjectURL(this.settings.web_logo);
            this.web_logo_name = this.settings.web_logo.name;
        },
        dropFileWebLogo(event) {
            event.preventDefault();
            this.$refs.web_logo.files = event.dataTransfer.files;
            this.handleWebLogoUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        saveRecord: function(){
            this.isLoading = true;
            let settingsObject = this.settings;
            let formData = new FormData();
            for(let key in settingsObject){
                formData.append(key, settingsObject[key]);
            }
            let url = this.$apiUrl + '/web_settings/save';
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.getSettings();
                    setTimeout(
                        function() {
                            vm.$swal.close();
                            vm.isLoading = false;
                            window.location.reload();
                            vm.$router.push({path:'/general_settings'})
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
                vm.isLoading = false;
            });
        }
    }
}
</script>
<style>

</style>
