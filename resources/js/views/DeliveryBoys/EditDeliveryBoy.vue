<template>
    <div>
        <div class="page-heading">

            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3 v-if="this.$roleDeliveryBoy === this.login_user.role.name" >
                        {{ __('my_profile') }}
                    </h3>
                    <h3 v-else>
                        <template v-if="id">{{ __('edit') }}</template>
                        <template v-else>{{ __('create') }}</template>
                        {{ __('delivery_boy') }}
                    </h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">

                                <router-link to="/delivery_boy" v-if="this.$roleDeliveryBoy === this.login_user.role.name" >{{ __('dashboard') }}</router-link>
                                <router-link to="/dashboard" v-else >{{ __('dashboard') }}</router-link>
                            </li>
                            <template v-if="this.$roleDeliveryBoy === this.login_user.role.name">
                                <li class="breadcrumb-item" aria-current="page">{{ __('my_profile') }}</li>
                            </template>
                            
                            <template v-else>

                                <li class="breadcrumb-item" aria-current="page">
                                    <router-link to="/delivery_boys">{{ __('manage_delivery_boy') }}</router-link>
                                </li>

                                <li class="breadcrumb-item active" aria-current="page">
                                    <template v-if="id">{{ __('edit') }}</template>
                                    <template v-else>{{ __('create') }}</template>
                                    {{ __('delivery_boy') }}
                                </li>
                            </template>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 order-md-1 order-last">
                    <form ref="my-form" @submit.prevent="saveRecord">
                    <div class="card">
                        <div class="card-header" v-if="this.$roleDeliveryBoy !== this.login_user.role.name">
                            <h4>{{ __('delivery_boy') }}</h4>
                            <span class="pull-right">
                                <router-link to="/delivery_boys" class="btn btn-primary" v-b-tooltip.hover  title="View Delivery boys">{{ __('view_delivery_boys') }}</router-link>
                            </span>
                        </div>
                        <div class="card-body">
                        <label><span class="text-danger text-xs">*</span> {{ __('required_fields') }}</label>
                        <div class="divider"><div class="divider-text">{{ __('new_delivery_boy_register_form') }}New Delivery Boy Register Form</div></div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">{{ __('name') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="name" id="name" v-model="deliveryBoys.name" required class="form-control" placeholder="Enter name.">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="dob">{{ __('date_of_birth') }} <span class="text-danger text-xs">*</span></label>
                                    <input type="date" name="dob" id="dob" v-model="deliveryBoys.dob" class="form-control" placeholder="Enter date of birth" @input="validateDateOfBirth">
                                    <span v-if="dobvalidationError" class="error">{{ dobvalidationError }}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="mobile">{{ __('mobile') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="number" name="mobile" id="mobile" v-model="deliveryBoys.mobile" class="form-control" placeholder="Enter mobile no." @input="validateMobileNumber">
                                    <span v-if="mobilevalidationError" class="error">{{ mobilevalidationError }}</span>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email">{{ __('email') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="mobile" id="email" v-model="deliveryBoys.email" :readonly="this.$roleDeliveryBoy === this.login_user.role.name" class="form-control" placeholder="Enter email id.">
                                </div>
                            </div>
                            <div class="col-md-4" v-if="this.$roleDeliveryBoy !== this.login_user.role.name">
                                <div class="form-group">
                                    <label for="password"> {{ __('password') }}<span class="text-danger text-xs">*</span></label>
                                    <div class="input-group">
                                        <input :type="showPassword ? 'text' : 'password'" name="password" id="password" v-model="deliveryBoys.password" class="form-control" placeholder="Enter password.">
                                        <button type="button" v-on:click="showPassword = !showPassword" class="btn btn-primary font-bold">
                                            <i v-if="showPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                            <i v-else class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4" v-if="this.$roleDeliveryBoy !== this.login_user.role.name">
                                <div class="form-group">
                                    <label for="confirm_password">{{ __('confirm_password') }}<span class="text-danger text-xs">*</span></label>

                                    <div class="input-group">
                                        <input :type="showConfirmPassword ? 'text' : 'password'" name="confirm_password" id="confirm_password" v-model="deliveryBoys.confirm_password" class="form-control" placeholder="Enter again password.">
                                        <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword" class="btn btn-primary font-bold">
                                            <i v-if="showConfirmPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                            <i v-else class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="ifsc_code"> {{ __('bank_ifsc_code') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="ifsc_code" id="ifsc_code" v-model="deliveryBoys.ifsc_code" required :readonly="this.$roleDeliveryBoy === this.login_user.role.name" class="form-control" placeholder="Enter bank's IFSC code.">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="bank_name">{{ __('bank_name') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="bank_name" id="bank_name" v-model="deliveryBoys.bank_name" required :readonly="this.$roleDeliveryBoy === this.login_user.role.name" class="form-control" placeholder="Enter bank name">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account_number"> {{ __('account_number') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="number" name="account_number" id="account_number" v-model="deliveryBoys.bank_account_number" required :readonly="this.$roleDeliveryBoy === this.login_user.role.name" class="form-control" placeholder="Enter account number" @input="validateAccountNumber">
                                    <span v-if="account_numbervalidationError" class="error">{{ account_numbervalidationError }}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="account_name">{{ __('bank_account_name') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="text" name="account_name" id="account_name" v-model="deliveryBoys.account_name" required :readonly="this.$roleDeliveryBoy === this.login_user.role.name" class="form-control" placeholder="Enter bank account name">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="city_name"> {{ __('select_or_search_city') }}<span class="text-danger text-xs">*</span></label>
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

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="address"> {{ __('address') }}<span class="text-danger text-xs">*</span></label>
                                    <textarea name="address" id="address" v-model="deliveryBoys.address" rows='3' class="form-control" placeholder="Enter address"></textarea>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="other_payment_info">{{ __('other_payment_information') }}</label>
                                    <textarea name="other_payment_info" id="other_payment_info" v-model="deliveryBoys.other_payment_information" rows='3' class="form-control" placeholder="Enter other payment information"></textarea>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="driving_license"> {{ __('driving_licence') }}<span class="text-danger text-xs">*</span></label>

                                    <input type="file" class="file-input" accept="image/*,application/pdf,.doc,.docx" name="driving_license" id="driving_license" v-if="this.$roleDeliveryBoy !== this.login_user.role.name" v-on:change="handleFileUploadLicense" ref="file_license"/>
                                    <div class="file-input-div bg-gray-100" v-if="this.$roleDeliveryBoy !== this.login_user.role.name" @click="$refs.file_license.click()" @drop="dropFileUploadLicense" @dragover="$dragoverFile" @dragleave="$dragleaveFile">

                                        <template v-if="deliveryBoys.driving_license && deliveryBoys.driving_license.name !== ''">
                                            <label> {{ __('selected_file_name') }}{{ deliveryBoys.driving_license.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>

                                    </div>
                                    <p v-if="drivingLicencevalidationerror" class="error">{{ drivingLicencevalidationerror }}</p>
                                    <div class="row" v-if="deliveryBoys.driving_license_url">
                                        <div v-if="isImage(deliveryBoys.driving_license_url)" class="col-md-2">
                                            <img class="custom-image" :src="deliveryBoys.driving_license_url" title='Driving License' alt='Driving License'/>
                                        </div>
                                        <div v-else class="col-md-2 mt-2">
                                            <a target="_blank" :href="deliveryBoys.driving_license_url" class="badge bg-success"> <i class="fa fa-eye"></i> {{ __('identity_card') }}Identity Card</a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="national_identity_card"> {{ __('national_identity_card') }}<span class="text-danger text-xs">*</span></label>
                                    <input type="file" accept="image/*,application/pdf,.doc,.docx" name="national_identity_card" id="national_identity_card" v-if="this.$roleDeliveryBoy !== this.login_user.role.name" v-on:change="handleFileUploadCard" ref="file_card" class="file-input" />
                                    <div class="file-input-div bg-gray-100" v-if="this.$roleDeliveryBoy !== this.login_user.role.name" @click="$refs.file_card.click()" @drop="dropFileUploadCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                        <template v-if="deliveryBoys.national_identity_card && deliveryBoys.national_identity_card.name !== ''">
                                            <label> {{ __('selected_file_Name') }}{{ deliveryBoys.national_identity_card.name }}</label>
                                        </template>
                                        <template v-else>
                                            <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                            <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                        </template>
                                    </div>
                                    <p v-if="nationalIdentityCardvalidationerror" class="error">{{ nationalIdentityCardvalidationerror }}</p>

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

                            <div class="col-md-6" v-if="deliveryBoys.id && this.$roleDeliveryBoy !== this.login_user.role.name">
                                <div class="form-group">
                                    <label>Status {{ __('status') }}<span class="text-danger text-xs">*</span></label><br>
                                    <b-form-radio-group
                                        v-model="deliveryBoys.status"
                                        :options="[
                                                { text: ' Registered', 'value': 0 },
                                                { text: ' Activated', 'value': 1 },
                                                { text: ' Not-Approved', 'value': 2 },
                                                { text: ' Deactivated', 'value': 3 },
                                            ]"
                                        buttons
                                        button-variant="outline-primary"
                                        required
                                    ></b-form-radio-group>

                                </div>
                            </div>
                            <div class="col-md-6" v-if="[2,3].includes(deliveryBoys.status)">
                                <div class="form-group">
                                    <label for="remark">Remark {{ __('remark') }}<span class="text-danger text-xs">*</span></label>
                                    <textarea class="form-control" name="remark" id="remark" required v-model="deliveryBoys.remark" placeholder="Add a remark of this status..." ></textarea>
                                </div>
                            </div>

                            <div class="list-group-item m-2" v-if="this.$roleDeliveryBoy !== this.login_user.role.name" >
                                <div class="d-flex justify-content-between align-content-center">
                                    <h6>{{ __('delivery_boy_bonus_details') }}</h6>

                                    <b-button-group>
                                        <b-button @click="getBonusSettings" v-if="$deliveryBoyBonusSettings == 1" type="button" variant="primary" size="sm">
                                             {{ __('add_default_bonus') }}
                                        </b-button>
                                        <b-button @click="resetBonus" v-if="deliveryBoys.id" type="button" size="sm">
                                        {{ __('reset_bonus') }}
                                        </b-button>

                                    </b-button-group>


                                </div>


                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_type">{{ __('bonus_type') }}<span class="text-danger text-xs">*</span></label>
                                            <select name="bonus_type" id="bonus_type"
                                                   @change="changeBonusType" v-model="deliveryBoys.bonus_type" class="form-control form-select">
                                                <option value="">{{ __('select') }}</option>
                                                <option value="1">{{ __('commission') }}</option>
                                                <option value="0">{{ __('fixed_salaried') }}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div v-if="deliveryBoys.bonus_type == 1" class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_percentage"> {{ __('bonus_percentage') }}<span class="text-danger text-xs">*</span></label>
                                            <input type="number" min="0.1" max="100" step="0.1" name="bonus_percentage" id="bonus_percentage" v-model="deliveryBoys.bonus_percentage" class="form-control" placeholder="Enter Bonus (%)">
                                        </div>
                                    </div>
                                    <div v-if="deliveryBoys.bonus_type == 1" class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_min_amount"> {{ __('minimum_bonus_amount') }}</label>
                                            <input type="number" min="0" step="0.1" required class="form-control" name="bonus_min_amount"
                                                   id="bonus_min_amount" v-model="deliveryBoys.bonus_min_amount"
                                                   placeholder='Minimum bonus amount'/>
                                            <span class="text text-primary font-size-13">{{ __('set_0_if_you_want_to_remove_limit') }}</span>
                                        </div>
                                    </div>
                                    <div v-if="deliveryBoys.bonus_type == 1" class="col-md-3">
                                        <div class="form-group">
                                            <label for="bonus_max_amount">{{ __('maximum_bonus_amount') }}</label>
                                            <input type="number" min="0" step="0.1" required class="form-control" name="bonus_max_amount"
                                                   id="bonus_max_amount" v-model="deliveryBoys.bonus_max_amount"
                                                   placeholder='Maximum bonus amount'/>
                                            <span class="text text-primary font-size-13">{{ __('set_0_if_you_want_to_remove_limit') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        </div>
                        <div class="card-footer">
                            <template v-if="deliveryBoys.id">
                                <b-button type="submit" variant="primary" :disabled="isLoading"> {{ __('update') }}
                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                </b-button>
                            </template>
                            <template v-else>
                                <b-button type="submit" variant="primary" :disabled="isLoading">{{ __('save') }}
                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                </b-button>

                                <button v-if="this.$roleDeliveryBoy !== this.login_user.role.name" type="reset" class="btn btn-danger">{{ __('clear') }}</button>
                                <button v-else type="button" class="btn btn-danger" @click="$router.go(-1)">{{ __('back') }}</button>
                            </template>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
import {VuejsDatatableFactory} from 'vuejs-datatable';
import axios from "axios";
import Select2 from 'v-select2-component';
import Multiselect from 'vue-multiselect';

import Auth from '../../Auth.js';

export default {
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
    },
    data: function () {
        return {
            login_user: Auth.user,

            isLoading: false,
            showPassword: false,
            showConfirmPassword:false,

            record:null,
            city: "",
            cities: [],
            id: null,
            bonusSettings: null,
            deliveryBoys:{
                id: null ,
                admin_id: "",

                name: "",
                dob: "",
                mobile: "",
                email: "",
                password:"",
                confirm_password:"",
                ifsc_code: "",
                bank_name: "",
                bank_account_number: "",
                account_name: "",
                city_id: "",
                address: "",
                other_payment_information: "",

                driving_license: "" ,
                driving_license_url: "",

                national_identity_card: "" ,
                national_identity_card_url: "",

                status: 0,
                remark: "",

                bonus_type : "",
                bonus_percentage: "",
                bonus_min_amount: "",
                bonus_max_amount: "",
            },
            mobilevalidationError: null,
            dobvalidationError: null,
            account_numbervalidationError: null,
            drivingLicencevalidationerror: null,
            nationalIdentityCardvalidationerror: null
        };
    },
    created: function () {

        this.id = this.$route.params.id;
        if(this.$roleDeliveryBoy === this.login_user.role.name){
            this.id = this.login_user.delivery_boy.id;
        }
        if (this.id) {
            this.deliveryBoys.id = this.id;
            this.getDeliveryBoy();
        }
        this.getCities();
    },
    methods: {
        handleFileUploadLicense() {
            const file = this.$refs.file_license.files[0];

           // Reset previous error message
            this.drivingLicencevalidationerror = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                this.drivingLicencevalidationerror = "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, WEBP image or PDF or DOC file ";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.drivingLicencevalidationerror = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }
            this.deliveryBoys.driving_license = this.$refs.file_license.files[0];
            this.deliveryBoys.driving_license_url = URL.createObjectURL(this.deliveryBoys.driving_license);
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
            const file = this.$refs.file_card.files[0];

           // Reset previous error message
            this.nationalIdentityCardvalidationerror = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                this.nationalIdentityCardvalidationerrorv = "Invalid file type. Please upload a JPEG, PNG, JPG, GIF, WEBP image or PDF or DOC file ";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.drivingLicencevalidationerror = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }
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
                this.deliveryBoys.dob = null;
            } else {
                this.dobvalidationError = null;
            }
        },
        validateMobileNumber() {
          if (this.deliveryBoys.mobile < 0) {
                this.mobilevalidationError = "Mobile Number must be numeric value.";
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
        getBonusSettings() {
            axios.get(this.$apiUrl + '/delivery_boys/bonus_settings')
                .then((response) => {
                    let data = response.data;
                    this.bonusSettings = data.data

                    if(this.bonusSettings.delivery_boy_bonus_settings == 1){
                        this.deliveryBoys.bonus_type = this.bonusSettings.delivery_boy_bonus_type;
                        this.deliveryBoys.bonus_percentage = this.bonusSettings.delivery_boy_bonus_percentage;
                        this.deliveryBoys.bonus_min_amount = this.bonusSettings.delivery_boy_bonus_min_amount;
                        this.deliveryBoys.bonus_max_amount = this.bonusSettings.delivery_boy_bonus_max_amount;
                    }
                });
        },
        resetBonus(){
            this.deliveryBoys.bonus_type = this.record ? this.record.bonus_type : 0;
            this.deliveryBoys.bonus_percentage = this.record ? this.record.bonus_percentage : 0;
            this.deliveryBoys.bonus_min_amount = this.record ? this.record.bonus_min_amount : 0;
            this.deliveryBoys.bonus_max_amount = this.record ? this.record.bonus_max_amount : 0;
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

        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data

                    if(this.deliveryBoys.id && this.record?.city_id){
                        this.city = this.cities.filter((item) => {
                            return item.id === this.record.city_id;
                        });
                    }
                });
        },
        setCityId() {
            this.deliveryBoys.city_id = this.city.id;
        },

        getDeliveryBoy(){
            axios.get(this.$apiUrl + '/delivery_boys/edit/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {
                        this.record = data.data

                        this.deliveryBoys.id = this.record ? this.record.id : null;
                        this.deliveryBoys.admin_id = this.record ? this.record.admin_id : "";

                        this.deliveryBoys.name = this.record ? this.record.name : "";
                        this.deliveryBoys.dob = this.record ? this.record.dob : "";
                        this.deliveryBoys.mobile = this.record ? this.record.mobile : "";
                        this.deliveryBoys.email = this.record ? this.record.admin.email : "";
                        this.deliveryBoys.password = "";
                        this.deliveryBoys.confirm_password = "";



                        this.deliveryBoys.ifsc_code = this.record ? this.record.ifsc_code : "";
                        this.deliveryBoys.bank_name = this.record ? this.record.bank_name : "";
                        this.deliveryBoys.bank_account_number = this.record ? this.record.bank_account_number : "";
                        this.deliveryBoys.account_name = this.record ? this.record.account_name : "";

                        this.city = this.cities.filter((item) => {
                            return item.id === this.record.city_id;
                        });
                        this.deliveryBoys.city_id = this.record ? this.record.city_id : "";

                        this.deliveryBoys.address = this.record ? this.record.address : "";
                        this.deliveryBoys.other_payment_information = this.record ? this.record.other_payment_information : "";

                        this.deliveryBoys.driving_license = "";
                        this.deliveryBoys.driving_license_url = this.record ? this.$storageUrl + this.record.driving_license : "";
                        this.deliveryBoys.national_identity_card = "";
                        this.deliveryBoys.national_identity_card_url = this.record ? this.$storageUrl + this.record.national_identity_card : "";

                        this.deliveryBoys.status = this.record ? this.record.status : 0;
                        this.deliveryBoys.remark = this.record ? this.record.remark : "";

                        this.deliveryBoys.bonus_type = this.record ? this.record.bonus_type : 0;
                        this.deliveryBoys.bonus_percentage = this.record ? this.record.bonus_percentage : 0;
                        this.deliveryBoys.bonus_min_amount = this.record ? this.record.bonus_min_amount : 0;
                        this.deliveryBoys.bonus_max_amount = this.record ? this.record.bonus_max_amount : 0;

                    }else{
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                this.isLoading = false;
                if (error.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        },

        saveRecord: function(){
            let vm = this;
            this.isLoading = true;
            let formObject = this.deliveryBoys;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key] ?? "");
            }
            let url = this.$apiUrl + '/delivery_boys/save';
            if(this.deliveryBoys.id){
                url = this.$apiUrl + '/delivery_boys/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    //this.showSuccess(data.message);
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            if(vm.$roleDeliveryBoy !== vm.login_user.role.name){
                                vm.$router.push({path: '/delivery_boys'});
                            } else {
                                vm.getDeliveryBoy();
                            }
                        }, 2000);

                    //this.$eventBus.$emit('deliveryBoysSaved', data.message);
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request?.statusText) {
                    this.showError(error.request?.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    }
};
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>
