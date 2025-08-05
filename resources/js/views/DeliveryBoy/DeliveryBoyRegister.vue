<template>
    <div class="auth" :style="{ backgroundImage: 'url('+ $panelLoginBackgroundImg + ')' }">
        <div class="login-wrapper">
            <div class="detail-card">
                <div class="auth-logo">
                    <a href="javascript:void(0)"
                       style="display: flex; align-items: center; justify-content: flex-start;">
                        <img v-if="$appLogo != ''" :src="$storageUrl+$appLogo" style="height: 70px; width: 70px;"
                             alt='Logo'/>
                        <img v-else :src="$baseUrl + '/images/logo.png'" style="height: 70px; width: 70px;"
                             alt='Logo'/>
                        <h2 style="margin: 10px;">{{ $appName }}</h2>
                    </a>
                </div>
                <h4>Delivery Boy Complete Profile</h4>
                <p class="auth-subtitle text-primary">Please Complete the form to complete your registration</p>
                <form ref="my-form" @submit.prevent="saveRecord" novalidate> 
                    <div class="content">
                        <h6>Delivery Boy Information</h6>
                        <div class="row">
                             <div class="col-md-4">
                    <div class="form-group">
                        <label for="name">Name <span class="text-danger text-xs">*</span></label>
                        <input type="text" name="name" id="name" v-model="deliveryBoys.name" class="form-control" placeholder="Enter name.">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="dob">Date Of Birth <span class="text-danger text-xs">*</span></label>
                        <input type="date" name="dob" id="dob" v-model="deliveryBoys.dob" required class="form-control" placeholder="Enter date of birth" @input="validateDateOfBirth">
                        <span v-if="dobvalidationError" class="error">{{ dobvalidationError }}</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group mobile">
                        <label for="mobile">Mobile No. <span class="text-danger text-xs">*</span></label>
                        <input type="number" name="mobile" id="mobile" v-model="deliveryBoys.mobile" class="form-control" placeholder="Enter mobile no." @input="validateMobileNumber">
                        <span v-if="mobilevalidationError" class="error">{{ mobilevalidationError }}</span>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label for="email">Email <span class="text-danger text-xs">*</span></label>
                        <input type="email" name="email" id="email" v-model="deliveryBoys.email" class="form-control" placeholder="Enter email id.">
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label for="password">Password <span class="text-danger text-xs">*</span></label>
                        <div class="input-group">
                            <input :type="showPassword ? 'text' : 'password'" name="password" id="password" v-model="deliveryBoys.password" class="form-control" placeholder="Enter password.">
                            <button type="button" v-on:click="showPassword = !showPassword" class="btn btn-primary font-bold">
                                <i v-if="showPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i v-else class="fa fa-eye" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="confirm_password">Confirm Password <span class="text-danger text-xs">*</span></label>
                        <div class="input-group">
                            <input :type="showConfirmPassword ? 'text' : 'password'" name="confirm_password" id="confirm_password" v-model="deliveryBoys.confirm_password" class="form-control" placeholder="Enter again password.">
                            <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword" class="btn btn-primary font-bold">
                                <i v-if="showConfirmPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i v-else class="fa fa-eye" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                  

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="driving_license">Driving License <span class="text-danger text-xs">*</span></label>
                                    <input type="file" name="driving_license" id="driving_license" v-on:change="handleFileUploadLicense" ref="file_license" :required="!deliveryBoys.id" class="file-input" />
                                  

                                    <div class="file-input-div bg-gray-100" @click="$refs.file_license.click()" @drop="dropFileUploadLicense" @dragover="$dragoverFile" @dragleave="$dragleaveFile">


                                        <template v-if="deliveryBoys.driving_license && deliveryBoys.driving_license.name !== ''">
                                            <label>Selected file name:- {{ deliveryBoys.driving_license.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>

                                    </div>

                                    <div class="row" v-if="deliveryBoys.driving_license_url">
                                        <div v-if="isImage(deliveryBoys.driving_license_url)" class="col-md-2">
                                            <img class="custom-image" :src="deliveryBoys.driving_license_url" title='Driving License' alt='Driving License'/>
                                        </div>
                                        <div v-else class="col-md-2 mt-2">
                                            <a target="_blank" :href="deliveryBoys.driving_license_url" class="badge bg-success"> <i class="fa fa-eye"></i> Driving License</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="national_identity_card">National Identity Card <span class="text-danger text-xs">*</span></label>
                                    <input type="file" name="national_identity_card" id="national_identity_card" v-on:change="handleFileUploadCard" ref="file_card" :required="!deliveryBoys.id" class="file-input" />
                                    
                                    <div class="file-input-div bg-gray-100" @click="$refs.file_card.click()" @drop="dropFileUploadCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                        <template v-if="deliveryBoys.national_identity_card && deliveryBoys.national_identity_card.name !== ''">
                                            <label>Selected file name:- {{ deliveryBoys.national_identity_card.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>
                                    </div>

                                    <div class="row" v-if="deliveryBoys.national_identity_card_url">
                                        <div v-if="isImage(deliveryBoys.national_identity_card_url)" class="col-md-2">
                                            <img class="custom-image" :src="deliveryBoys.national_identity_card_url" title='National Identity Card' alt='National Identity Card'/>
                                        </div>
                                        <div v-else class="col-md-2 mt-2">
                                            <a target="_blank" :href="deliveryBoys.national_identity_card_url" class="badge bg-success"> <i class="fa fa-eye"></i> Identity Card</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <label for="city_name">Select or Search City <span class="text-danger text-xs">*</span></label>
                                <multiselect v-model="city"
                                             :options="cities"
                                             @close="setCityId"
                                             placeholder="Select & Search City"
                                             label="name"
                                             track-by="name" id="city_name" required>
                                    <template slot="singleLabel" slot-scope="props">
                                                        <span class="option__desc">
                                                            <span class="option__title">{{ props.option.name }}</span>
                                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <div class="option__desc">
                                                            <span class="option__title">{{
                                                                    props.option.formatted_address
                                                                }}</span>
                                        </div>
                                    </template>
                                </multiselect>
                            </div>
                           
                             <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_type">Bonus Type <span class="text-danger text-xs">*</span></label>
                                            <select name="bonus_type" id="bonus_type"
                                                   @change="changeBonusType" v-model="deliveryBoys.bonus_type" class="form-control form-select">
                                                <option value="">Select</option>
                                                <option value="1">Commission</option>
                                                <option value="0">Fixed/Salaried</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div v-if="deliveryBoys.bonus_type == 1" class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_percentage">Bonus Percentage (%)<span class="text-danger text-xs">*</span></label>
                                            <input type="number" min="0.1" max="100" step="0.1" @input="validateCommission" name="bonus_percentage" id="bonus_percentage" v-model="deliveryBoys.bonus_percentage" class="form-control" placeholder="Enter Bonus (%)">
                                            <span v-if="bonusValidationMessage" class="error">{{ bonusValidationMessage }}</span>
                                        </div>
                                    </div>

                        </div>
                    </div>
                    <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                        Complete
                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                    </button>
                </form>
                <div class="auth-copyright">
                    <a href="javascript:void(0)" class="text-primary font-weight-normal"> {{ $copyrightDetails }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Auth from '../../Auth.js';
import {VuejsDatatableFactory} from "vuejs-datatable";
import Select2 from "v-select2-component";
import Multiselect from "vue-multiselect";
import Editor from "@tinymce/tinymce-vue";
export default {
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
        'editor': Editor
    },
    data : function(){
        return {
            isLoading: false,
            
            city:"",
            cities:[],
            deliveryBoys:{
               
                mobile: "" ,
                dob: "" ,

                driving_license: "" ,
                driving_license_url: "" ,
                national_identity_card: "" ,
                national_identity_card_url: "" ,   
                bonus_percentage: "",  
                city_id:"",
                password: "",
                confirm_password: "",
            },
             mobilevalidationError: null,
            dobvalidationError: null,
            account_numbervalidationError: null,
            drivingLicencevalidationerror: null,
            nationalIdentityCardvalidationerror: null,
            showPassword: false,
            showConfirmPassword:false,
            bonusValidationMessage: null, 

        };
    },
    created: function () {
        this.getCities();
    },
    mounted() {

    },
    methods: {

        handleFileUploadLicense() {
            this.deliveryBoys.driving_license = this.$refs.file_license.files[0];
            this.deliveryBoys.driving_license_url = URL.createObjectURL(this.deliveryBoys.driving_license);;
        },
        dropFileUploadLicense(event){
            event.preventDefault();
            this.$refs.file_license.files = event.dataTransfer.files;
            this.handleFileUploadLicense(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleFileUploadCard() {
            this.deliveryBoys.national_identity_card = this.$refs.file_card.files[0];
            this.deliveryBoys.national_identity_card_url = URL.createObjectURL(this.deliveryBoys.national_identity_card);;
        },
        dropFileUploadCard(event){
            event.preventDefault();
            this.$refs.file_card.files = event.dataTransfer.files;
            this.handleFileUploadCard(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        validateDateOfBirth() {
            const selectedDate = new Date(this.deliveryBoys.dob);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                this.dobvalidationError = "Date of Birth cannot be in the future.";
                this.deliveryBoys.dob = "";
            } else {
                this.dobvalidationError = "";
            }
        },
        validateMobileNumber() {
            const mobileRegex = /^[0-9]{1,16}$/; // Regular expression for numeric values with a maximum of 16 digits
    
            if (!mobileRegex.test(this.deliveryBoys.mobile)) {
                this.mobilevalidationError = "Mobile Number must be numeric and should not exceed 16 digits.";
                this.deliveryBoys.mobile = null;
            } else {
                this.mobilevalidationError = null;
            }
        },
        validateAccountNumber() {
          if (this.deliveryBoys.bank_account_number < 1) {
                this.account_numbervalidationError = "Account Number must be numeric value.";
                this.deliveryBoys.bank_account_number = null;
            } else {
                this.account_numbervalidationError = null;
            }
        },
        changeBonusType(){
            if(this.deliveryBoys.bonus_type == 0){
                this.deliveryBoys.bonus_percentage =  0;
                this.deliveryBoys.bonus_min_amount = 0;
                this.deliveryBoys.bonus_max_amount = 0;
            }else{
                this.deliveryBoys.bonus_percentage = this.record ? this.record.bonus_percentage : "";
                this.deliveryBoys.bonus_min_amount = this.record ? this.record.bonus_min_amount : "";
                this.deliveryBoys.bonus_max_amount = this.record ? this.record.bonus_max_amount : "";
            }
        },
        validateCommission() {
          if (this.deliveryBoys.bonus_percentage < 1 || this.deliveryBoys.bonus_percentage > 100) {
                this.bonusValidationMessage = "Percentage must be between 1 and 100.";
                this.deliveryBoys.bonus_percentage = "";
            } else {
                this.bonusValidationMessage = null;
            }
        },
        getCities() {
            this.isLoading = true
            axios.get(this.$deliveryBoyApiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data
                });
        },
        setCityId() {
            this.deliveryBoys.city_id = this.city.id;
        },
        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.deliveryBoys;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            let url = this.$deliveryBoyApiUrl + '/register';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.isLoading = false;
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            //Auth.logout();
                            vm.$router.push({path: '/delivery_boy/login'})
                        }, 2000);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
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

<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

.auth {
    overflow-x: hidden!important;
}
.auth-logo {
    padding-bottom: 10px;
}
</style>
