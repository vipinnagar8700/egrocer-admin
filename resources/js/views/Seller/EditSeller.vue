<template>
    <div>
        <div class="page-heading">

            <div class="row">
                <div class="col-12 col-md-6 order-md-1 order-last">
                    <h3 v-if="this.$roleSeller === this.login_user.role.name" >
                        {{__('my_profile')}}
                    </h3>
                    <h3 v-else>
                        <template v-if="id">{{__('edit')}}</template>
                        <template v-else>{{__('create')}}</template>
                        {{__('seller')}}
                    </h3>
                </div>
                <div class="col-12 col-md-6 order-md-2 order-first">
                    <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <router-link to="/seller" v-if="this.$roleSeller === this.login_user.role.name" >{{__('dashboard')}}</router-link>
                                <router-link to="/dashboard" v-else>{{__('dashboard')}}</router-link>
                            </li>
                            <template v-if="this.$roleSeller === this.login_user.role.name" >
                                <li class="breadcrumb-item" aria-current="page">{{__('my_profile')}}</li>
                            </template>
                            <template v-else>

                                <li class="breadcrumb-item" aria-current="page">
                                    <router-link to="/sellers">{{__('manage_sellers')}}</router-link>
                                </li>

                                <li class="breadcrumb-item active" aria-current="page">
                                    <template v-if="id">{{__('edit')}}</template>
                                    <template v-else>{{__('create')}}</template>
                                    {{__('seller')}}
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
                            <div class="card-header">
                                <h4>{{__('seller_information')}} </h4>
                                <span class="pull-right"  v-if="this.$roleSeller !== this.login_user.role.name">
                                    <router-link to="/sellers" class="btn btn-primary" v-b-tooltip.hover title="Manage Seller">{{__('manage_seller')}}</router-link>
                                </span>
                            </div>
                            <div class="card-body">
                                <label><span class="text-danger text-xs">*</span> {{__('required_fields')}}.</label>
                                <div class="divider" v-if="this.$roleSeller !== this.login_user.role.name"><div class="divider-text">{{__('new_seller_register_form')}}</div></div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('name')}} <i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="name"
                                                   placeholder="Enter name.">
                                        </div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('email')}} <i class="text-danger">*</i></label>
                                            <input type="email" class="form-control" v-model="email"
                                                   placeholder="Enter email.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('mobile')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="mobile" placeholder="Enter mobile number" inputmode="numeric" @input="validateMobileNumber">
                                                    <span v-if="mobilevalidationError" class="error">{{ mobilevalidationError }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4" v-if="this.$roleSeller !== this.login_user.role.name">
                                        <div class="form-group">
                                            <label>{{__('password')}} <i v-if="!id" class="text-danger">*</i></label>
                                            <div class="input-group">
                                                <input :type="showPassword ? 'text' : 'password'"  class="form-control" v-model="password" placeholder="Enter password.">
                                                <button type="button" v-on:click="showPassword = !showPassword" class="btn btn-primary font-bold">
                                                    <i v-if="showPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                                    <i v-else class="fa fa-eye" aria-hidden="true"></i>
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group col-md-4" v-if="this.$roleSeller !== this.login_user.role.name">
                                        <div class="form-group">
                                            <label>{{__('confirm_password')}}<i v-if="!id" class="text-danger">*</i></label>
                                            <div class="input-group">
                                                <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" v-model="confirm_password" placeholder="Enter confirm password.">
                                                <button type="button" v-on:click="showConfirmPassword = !showConfirmPassword" class="btn btn-primary font-bold">
                                                    <i v-if="showConfirmPassword" class="fa fa-eye-slash" aria-hidden="true"></i>
                                                    <i v-else class="fa fa-eye" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4> {{__('store_information')}}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('store_name')}} <i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="store_name"
                                                   placeholder="Enter store name.">
                                        </div>
                                    </div>
                                    <div class="form-group col-md-5">
                                        <div class="form-group">
                                            <label>{{__('category_ids')}}<i class="text-danger">*</i> <small>( Ex : 100,205, 360 )
                                            </small></label>
                                            <Select2 v-model="categories_ids"
                                                     placeholder="select categories"
                                                     :options="categories_options"
                                                     :settings="{ multiple: 'multiple'}"/>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-3">
                                                <label class="control-label">{{ __('product_status') }}</label><br>
                                                <div id="status" class="btn-group">
                                                    <label class="btn btn-primary" data-toggle-class="btn-primary"
                                                           data-toggle-passive-class="btn-default">
                                                        <input type="radio" v-model="status" value="1"> {{__('active')}}
                                                    </label>
                                                    <label class="btn btn-danger" data-toggle-class="btn-danger"
                                                           data-toggle-passive-class="btn-default">
                                                        <input type="radio" v-model="status" value="3">
                                                        {{__('deactive')}}
                                                    </label>
                                                </div>
                                            </div>
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('tax_name')}}</label>
                                            <input type="text" class="form-control" v-model="tax_name"
                                                   placeholder="Enter tax name.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('tax_number')}}</label>
                                            <input type="text" class="form-control" v-model="tax_number"
                                                   placeholder="Enter tax number.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label>{{__('pan_number')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="pan_number"
                                                   placeholder="Enter PAN number.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4" v-if="this.$roleSeller !== this.login_user.role.name">
                                        <label>{{__('commission')}}<i class="text-danger">*</i></label>
                                        <input type="number" class="form-control" v-model="commission"
                                               placeholder="Enter commission (%)" @input="validateCommission">

                                        <p v-if="commissionvalidationError" class="error">{{ commissionvalidationError }}</p>
                                        <span class="text text-success font-size-13"> 
                                            <a href="javascript:void(0)" @click="commissionRule = true"
                                               title="How it works">How seller commission works?</a>
                                        </span>
                                    </div>
                                    <br>
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('national_identity_card')}}<i v-if="!id" class="text-danger">*</i></label>
                                            <input type="file" class="file-input" accept="image/*,application/pdf,.doc,.docx" ref="file_national_id_card" v-if="this.$roleSeller !== this.login_user.role.name" v-on:change="handleFileNationalIdCard">
                                            <div class="file-input-div bg-gray-100" v-if="this.$roleSeller !== this.login_user.role.name" @click="$refs.file_national_id_card.click()" @drop="dropFileNationalIdCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                <template v-if="national_id_card && national_id_card.name !== ''">
                                                    <label>Selected file name:- {{__('selected_file_name')}}{{ national_id_card.name }}</label>
                                                </template>
                                                <template v-else>
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </template>
                                            </div>
                                            <div class="row" v-if="national_id_card_url">
                                                <div v-if="isImage(national_id_card_url)" class="col-md-2">
                                                    <img class="custom-image" :src="national_id_card_url" title='Identity Card' alt='Identity Card'/>
                                                </div>
                                                <div v-else class="col-md-2 mt-2">
                                                    <a target="_blank" :href="national_id_card_url" class="badge bg-success"> <i class="fa fa-eye"></i> Identity Card</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('address_proof')}}<i v-if="!id" class="text-danger">*</i></label>
                                            <input type="file" class="file-input" accept="image/*,application/pdf,.doc,.docx"  ref="file_address_proof" v-if="this.$roleSeller !== this.login_user.role.name" v-on:change="handleFileAddressProof">
                                            <div class="file-input-div bg-gray-100" v-if="this.$roleSeller !== this.login_user.role.name" @click="$refs.file_address_proof.click()" @drop="dropFileAddressProof" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                <template v-if="address_proof_name == '' ">
                                                    <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                    <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                </template>
                                                <template v-else>
                                                    <label>{{__('selected_file_name')}} {{ address_proof_name }}</label>
                                                </template>
                                            </div>
                                            <div class="row" v-if="address_proof_url">
                                                <div  v-if="isImage(address_proof_url)"  class="col-md-2">
                                                    <img class="custom-image" :src="address_proof_url" title='Address Proof' alt='Address Proof'/>
                                                </div>
                                                <div v-else class="col-md-2 mt-2">
                                                    <a target="_blank" :href="address_proof_url" class="badge bg-success"> <i class="fa fa-eye"></i> Address Proof</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="form-group col-md-12">

                                        <label for="logo"> {{__('logo')}} <i v-if="!id" class="text-danger">*</i></label>
                                        <input type="file" accept="image/*" id="logo" class="file-input" ref="file_store_logo" v-on:change="handleFileStoreLogo">
                                        <div class="file-input-div bg-gray-100" @click="$refs.file_store_logo.click()" @drop="dropFileStoreLogo" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                            <template v-if="store_logo && store_logo.name !== ''">
                                                <label>{{__('selected_file_name')}}{{ store_logo.name }}</label>
                                            </template>
                                            <template v-else>
                                                <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                            </template>
                                        </div>

                                        <div class="row" v-if="store_logo_url">
                                            <div class="col-md-2">
                                                <img class="custom-image" :src="store_logo_url" title='Store Logo' alt='Store Logo'/>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="col-md-12" v-if="id && this.$roleSeller !== this.login_user.role.name">
                                        <div class="row">
                                            <div class="form-group col-md-5">
                                                <label class="control-label"> {{__('status')}} <i class="text-danger">*</i></label><br>
                                                <b-form-radio-group
                                                    v-model="status"
                                                    :options="[
                                                    { text: ' Registered', 'value': 0 },
                                                    { text: ' Approved', 'value': 1 },
                                                    { text: ' Not-Approved', 'value': 2 },
                                                    { text: ' Deactive', 'value': 3 },
                                                ]"
                                                    buttons
                                                    button-variant="outline-primary"
                                                    required
                                                ></b-form-radio-group>
                                            </div>
                                            <div v-if="[2,3].includes(status)" class="form-group col-md-4">

                                                <label for="remark">Remark <i class="text-danger">*</i></label>
                                                <div class="form-floating">
                                                    <textarea class="form-control" name="remark" id="remark" required v-model="remark" placeholder="Add a remark of this status..." spellcheck="true"></textarea>
                                                    <label for="remark">Add a remark of this status...</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-12">

                                        <label> {{__('store_description')}}</label>
                                        <editor
                                            placeholder="Enter store description"
                                            v-model="store_description"
                                            
                                            :init="{
                                                            height:400,
                                                            plugins: this.$editorPlugins ,
                                                            toolbar: this.$editorToolbar,
                                                            font_size_formats: this.$editorFont_size_formats,
                                                        }"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4> {{__('store_location_information')}}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label for="city_name">{{__('select_or_search_city')}}<i class="text-danger">*</i></label>
                                       
                                         <Select2 v-model="city_id"
                                                     placeholder="select cities"
                                                     :options="cities_options"
                                                     :settings="{ multiple: 'multiple'}"/>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('state')}}</label>
                                            <input type="text" class="form-control" v-model="state" readonly placeholder="Enter state">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('street')}}</label>
                                            <input type="text" class="form-control" v-model="street"
                                                   readonly placeholder="Enter street.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <label for="location">{{__('search_location')}}</label>



                                        <div class="input-group">
                                            <GmapAutocomplete type="search" class="form-control" placeholder="Search you location on map."
                                                              @place_changed="setPlace"
                                                              :options="{ fields: ['formatted_address', 'geometry', 'name'], strictBounds: false}"
                                                              id="location">
                                            </GmapAutocomplete>

                                            <b-button type="button" variant="primary" class="search_location_btn" v-b-tooltip.hover  title="Add current location" @click="getCurrentLocation">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFFFF">
                                                    <title>current-location</title>
                                                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                                                </svg>



                                            </b-button>
                                        </div>

                                        <span class="text-danger d-block font-size-13"> {{__('only_search_location_when_update_is_necessary')}}</span>
                                        <span class="text text-primary font-size-13"> {{__('search_your_seller_name_and_you_will_get_the_location_points_latitude_longitude_below')}}</span>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('latitude')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="latitude" readonly placeholder="Enter latitude.">
                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                                        <div class="form-group">
                                            <label> {{__('longitude')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="longitude" readonly placeholder="Enter longitude.">
                                        </div>
                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <div v-if="formatted_address" class="text-danger">{{__('draf_and_click_marker_to_your_shop_proper_location')}}</div>
                                        <div id="map" style="position: relative; overflow: hidden;">
                                            <GmapMap
                                                :center="center"
                                                :zoom="13"
                                                :mapTypeControl=true
                                                style="width: 100%; height: 400px; margin-top: 20px"
                                                ref="mapRef"
                                                @click="handleMapClick"
                                            >
                                                <GmapMarker
                                                    :key="index"
                                                    v-for="(m, index) in markers"
                                                    :position="m.position"
                                                    :clickable="true"
                                                    :draggable="true"
                                                    @drag="updateCoordinates"
                                                    @click="updateCoordinates"
                                                />
                                                <!--                                                    @click="center = m.position"-->
                                                <gmap-info-window
                                                    :options="{
                                                                  maxWidth: 300,
                                                                  pixelOffset: { width: 0, height: -35 }
                                                                }"
                                                    :position="infoWindow.position"
                                                    :opened="infoWindow.open"
                                                    @closeclick="infoWindow.open=false">
                                                    <div v-html="infoWindow.template"></div>
                                                </gmap-info-window>
                                            </GmapMap>
                                        </div>
                                        <div v-if="formatted_address">
                                            <span class="title font-weight-bolder"><b>{{
                                                    place_name
                                                }}</b> - {{ formatted_address }}</span>
                                        </div>
                                    </div>



                                </div>
                            </div>
                           
                        </div>

                        <div class="card" v-if="this.$roleSeller !== this.login_user.role.name">
                            <div class="card-header">
                                <h4> {{__('seller_bank_information')}}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">

                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label>{{__('bank_name')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="bank_name"
                                                   placeholder="Enter bank name." required>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label> {{__('account_number')}}<i class="text-danger">*</i></label>
                                            <input type="number" class="form-control" v-model="account_number" placeholder="Enter account number." @input="validateAccountNumber" required> 
                                            <span v-if="account_numbervalidationError" class="error">{{ account_numbervalidationError }}</span>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label>{{__('bank_ifsc_code')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control" v-model="ifsc_code"
                                                   placeholder="Enter bank's IFSC code." required>
                                        </div>
                                    </div>

                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label> {{__('bank_account_name')}}<i class="text-danger">*</i></label>
                                            <input type="text" class="form-control valid" v-model="account_name"
                                                   placeholder="Enter bank account name." required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h4>{{__('other_setting')}}</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label class="control-label"> {{__('require_product_approval')}}</label><br>
                                            <b-form-radio-group
                                                v-model="require_products_approval"
                                                :options="[
                                                                { text: ' Yes', 'value': 1 },
                                                                { text: ' No', 'value': 0 },
                                                            ]"
                                                buttons
                                                button-variant="outline-primary"
                                                required
                                            ></b-form-radio-group>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-3">
                                        <div class="form-group">
                                            <label class="control-label"> {{__('view_customer_details')}}</label><br>
                                            <b-form-radio-group
                                                v-model="customer_privacy"
                                                :options="[
                                                                { text: ' Yes', 'value': 1 },
                                                                { text: ' No', 'value': 0 },
                                                            ]"
                                                buttons
                                                button-variant="outline-primary"
                                                required
                                            ></b-form-radio-group>
                                        </div>
                                    </div>
                                    
                                    

                                    
                                </div>
                            </div>
                            <div class="card-footer">
                                <template v-if="id">
                                    <b-button type="submit" variant="primary" :disabled="isLoading">  {{__('update')}}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </template>
                                <template v-else>
                                    <b-button type="submit" variant="primary" :disabled="isLoading"> {{__('save')}}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                    <button type="reset" class="btn btn-danger"> {{__('clear')}}</button>
                                </template>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <!-- Commission Rule Modal-->
        <b-modal v-model="commissionRule" size="lg" title="How commission (Admin commission) will get credited?">
            <b-container fluid>
                <ol>
                   
                    <li>
                        Formula for commision (Admin commission) is <b>Sub total (Excluding delivery charge) / 100 * 
                        commission percentage</b>
                    </li>
                    <li>
                        For example sub total is 1378 and commission is 20% then 1378 / 100 X 20 = 275.6 so 1378
                        - 275.6 = 1102.4 will get credited into seller's wallet.
                    </li>
                    <li>
                       275.6  is commission for Admin and 1102.4 is earning of seller .
                    </li>
                    <li>
                        If Order status is delivered then only seller will get earning.
                    </li>
                    <li>
                        Ex - 1. Order placed on 11-Aug-21 and product return days are set to 0 so 11-Aug + 0 days =
                        11-Aug seller earning will get credited when admin is logged in admin panel.
                    </li>
                    <li>
                        Ex - 2. Order placed on 11-Aug-21 and product return days are set to 7 so 11-Aug + 7 days =
                        18-Aug seller earning will get credited when admin is logged in admin panel.
                    </li>
                    
                </ol>
            </b-container>
            <template #modal-footer>
                <b-button variant="secondary" size="sm" class="float-right" @click="commissionRule=false">Close
                </b-button>
            </template>
        </b-modal>
    </div>
</template>
<script>
import {VuejsDatatableFactory} from 'vuejs-datatable';
import axios from "axios";
import Select2 from 'v-select2-component';

import Multiselect from 'vue-multiselect';
import {gmapApi} from 'vue2-google-maps';
import Editor from '@tinymce/tinymce-vue';

import Auth from '../../Auth.js';

export default {
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
        'editor': Editor
    },
    data: function () {
        return {
            login_user: Auth.user,

            isLoading: false,
            center: {lat: 0, lng: 0},
            map:"",
            drawingManager:"",

            currentPlace: null,
            markers: [],
            place_name: "",
            formatted_address: "",
            infoWindow: {
                position: {lat: 0, lng: 0},
                open: false,
                template: ''
            },
            city: "",
            cities: [],

            name: "",
            email: "",
            mobile: "",
            store_url: "",

            password: "",
            showPassword: false,
            confirm_password: "",
            showConfirmPassword:false, 

            store_name: "",
            street: "",
            pincode_id: "",
            city_id: [],
            categories_ids: [],
            state: "",
            remark:"",
            account_number: "",
            ifsc_code: "",
            bank_name: "",
            account_name: "",
            commission: "",
            tax_name: "",
            tax_number: "",
            pan_number: "",
            latitude: "",
            longitude: "",
            store_description: "",
            require_products_approval: 0,
            customer_privacy: 0,
            view_order_otp: 0,
            assign_delivery_boy: 0,
            change_order_status_delivered: 0,
            status: 0,
            store_logo: "",
            store_logo_url: "",
            national_id_card: "",
            national_id_card_url: "",
            national_id_card_name: "",

            address_proof: "",
            address_proof_url: "",
            address_proof_name: "",

            categories: [],
            id: null,
            admin_id: null,
            record: null,
            id_card: "",
            proof: "",

            commissionRule: false,
            mobilevalidationError: null,
            commissionvalidationError: null,
            account_numbervalidationError: null
        }
    },
    created: function () {
        this.getCategories();
        this.getCities();
        this.getSellerCommission();

        this.id = this.$route.params.id;
        if(this.$roleSeller === this.login_user.role.name){
            this.id = this.login_user.seller.id;
        }

        if (this.id) {
            this.getSeller();
        }
    },
    computed: {
        categories_options: function () {
            var temp = [];
            if(this.categories.length !== 0 ) {
                this.categories.forEach(category => {
                    //Only Main Categories
                    if (category.parent_id == 0) {
                        temp.push({id: category.id, text: category.name})
                    }
                });
            }
            return temp;
        },
        cities_options: function () {
            var temp = [];
            if(this.cities.length !== 0 ) {
                this.cities.forEach(city => {
                        temp.push({id: city.id, text: city.name +'-'+ city.zone})
                });
            }
            return temp;
        },
        google: gmapApi
    },
    methods: {
        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.cities = data.data
                }).catch(error => {
                this.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getCategories() {

            this.isLoading = true
            axios.get(this.$apiUrl + '/categories/main')
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    this.categories = data.data;
                }).catch(error => {
                this.isLoading = false;
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });
        },
        getSellerCommission() {
            axios.get(this.$sellerApiUrl + '/seller_commission')
                .then((response) => {
                    let data = response.data;
                    this.commission = data.data.value;
                });
        },

        setPlace(place) {
            this.currentPlace = place;
            this.addMarker()
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                    lat: this.currentPlace.geometry.location.lat(),
                    lng: this.currentPlace.geometry.location.lng(),
                    draggable:true,
                };
                this.markers.push({position: marker});
                this.center = marker;

                this.latitude = this.currentPlace.geometry.location.lat();
                this.longitude = this.currentPlace.geometry.location.lng();

                let addressArr = this.currentPlace.formatted_address.split(",");
                this.street = addressArr[0]+" "+addressArr[1];

                this.place_name = this.currentPlace.name;
                this.formatted_address = this.currentPlace.formatted_address;

                this.infoWindow.position = {lat: this.latitude, lng: this.longitude}
                this.infoWindow.template = `<b>${this.place_name}</b><br>${this.formatted_address}`
                this.infoWindow.open = true;
                this.currentPlace = null;
            }
        },

        getCurrentLocation(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    let latlng = new google.maps.LatLng(this.latitude, this.longitude);
                    this.mapConfig(latlng);
                });
            } else {
                this.showError("Geolocation is not supported by this browser.");
            }
        },
        handleMapClick(place){
            this.latitude = place.latLng.lat();
            this.longitude = place.latLng.lng();
            let latlng = place.latLng;
            this.mapConfig(latlng);
        },
        mapConfig(latlng){
            let vm = this;
            let geocoder = new google.maps.Geocoder;
            geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        let clikedPlace = results[1];

                        let addressArr = clikedPlace.formatted_address.split(",");
                        vm.street = addressArr[0]+" "+addressArr[1];
                        vm.place_name = addressArr[1];
                        vm.formatted_address = clikedPlace.formatted_address;
                        vm.infoWindow.position = {lat: vm.latitude, lng: vm.longitude}
                        vm.infoWindow.template = `<b>${vm.place_name}</b><br>${vm.formatted_address}`
                        vm.infoWindow.open = true;
                        vm.currentPlace = null;

                        vm.markers = [];
                        const marker = {
                            lat: parseFloat(vm.latitude),
                            lng: parseFloat(vm.longitude),
                            draggable:true,
                        }
                        vm.markers.push({position: marker});
                        vm.center = marker;

                    } else {
                        console.warn('No results found');
                    }
                }
            });
        },

        updateCoordinates(location) {
            this.handleMapClick(location);
        },
        setCityId() {
            this.state = this.city.state;
            this.city_id = this.city.id;
        },
        handleFileStoreLogo() {
            this.store_logo = this.$refs.file_store_logo.files[0];
            this.store_logo_url = URL.createObjectURL(this.store_logo);
        },
        dropFileStoreLogo(event) {
            event.preventDefault();
            this.$refs.file_store_logo.files = event.dataTransfer.files;
            this.handleFileStoreLogo(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        handleFileNationalIdCard() {
            this.national_id_card = this.$refs.file_national_id_card.files[0];
            this.national_id_card_url = URL.createObjectURL(this.national_id_card);
        },

        dropFileNationalIdCard(event) {
            event.preventDefault();
            this.$refs.file_national_id_card.files = event.dataTransfer.files;
            this.handleFileNationalIdCard(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },

        handleFileAddressProof() {
            this.address_proof = this.$refs.file_address_proof.files[0];
            this.address_proof_url = URL.createObjectURL(this.address_proof);
            this.address_proof_name = this.address_proof.name;
        },
        dropFileAddressProof(event) {
            event.preventDefault();
            this.$refs.file_address_proof.files = event.dataTransfer.files;
            this.handleFileAddressProof(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        validateMobileNumber() {
            const mobileNumber = this.mobile;
            if (!/^\d{1,16}$/.test(mobileNumber)) {
                this.mobilevalidationError = "Mobile Number must be maximum 16 digits numbers.";
                this.mobile = null;
            } else {
                this.mobilevalidationError = null;
            }
        },
        validateCommission() {
          if (this.commission < 1 || this.commission > 100) {
                this.commissionvalidationError = "Percentage must be between 1 and 100.";
                this.commission = null;
            } else {
                this.commissionvalidationError = null;
            }
        },
        validateAccountNumber() {
          if (this.account_number < 1) {
                this.account_numbervalidationError = "Account Number must be numeric value.";
                this.account_number= null;
            } else {
                this.account_numbervalidationError = null;
            }
        },
        getSeller() {
            axios.get(this.$apiUrl + '/sellers/edit/' + this.id)
                .then((response) => {
                    this.isLoading = false
                    let data = response.data;
                    if (data.status === 1) {

                        this.record = data.data
                        this.admin_id = this.record.admin.id ?? this.record.admin_id;
                        this.name = this.record.admin.username ?? this.record.name;
                        this.email = this.record.admin.email ?? this.record.email;

                        this.mobile = this.record.mobile;
                        this.store_url = this.record.store_url;

                        this.password = "";
                        this.confirm_password = "";

                        this.store_name = this.record.store_name;
                        this.street = this.record.street;
                        this.pincode_id = "";
                        this.city_id = this.record.city_id?.split(",");
                        this.categories_ids = this.record.categories?.split(",");       
                        this.state = this.record.state;
                        this.remark = this.record.remark;
                        this.account_number = this.record.account_number;
                        this.ifsc_code = this.record.bank_ifsc_code;
                        this.bank_name = this.record.bank_name;
                        this.account_name = this.record.account_name;
                        this.commission = this.record.commission;
                        this.tax_name = this.record.tax_name;
                        this.tax_number = this.record.tax_number;
                        this.pan_number = this.record.pan_number;
                        this.latitude = this.record.latitude;
                        this.longitude = this.record.longitude;

                        this.place_name = this.record.place_name;
                        this.formatted_address = this.record.formatted_address;

                        this.store_description = this.record.store_description;
                        this.require_products_approval = this.record.require_products_approval;
                        this.customer_privacy = this.record.customer_privacy;
                        this.view_order_otp = this.record.view_order_otp;
                        this.assign_delivery_boy = this.record.assign_delivery_boy;
                        this.change_order_status_delivered = this.record.change_order_status_delivered;
                        this.status = this.record.status;
                        this.store_logo = this.record.store_logo;

                        this.store_logo_url = this.$storageUrl + this.record.logo;
                        this.national_id_card_url = this.$storageUrl + this.record.national_identity_card;
                        this.address_proof_url = this.$storageUrl + this.record.address_proof;


                        const marker = {
                            lat: parseFloat(this.latitude),
                            lng: parseFloat(this.longitude),
                            draggable:true,
                        }
                        this.markers.push({position: marker});
                        this.center = marker;

                        this.infoWindow.position = {lat: parseFloat(this.latitude), lng: parseFloat(this.longitude)}
                        this.infoWindow.template = `<b>${this.place_name}</b><br>${this.formatted_address}`
                        this.infoWindow.open = true;

                    } else {
                        this.showError(data.message);
                        setTimeout(() => {
                            this.$router.back();
                        }, 1000);
                    }
                }).catch(error => {
                    this.isLoading = false;
                    if (error?.request?.statusText) {
                        this.showError(error.request.statusText);
                    }else if (error.message) {
                        this.showError(error.message);
                    } else {
                        this.showError(__('something_went_wrong'));
                    }
                });
        },
        saveRecord: function () {
            this.isLoading = true;
            let vm = this;
            let formData = new FormData();
            if (this.id) {
                formData.append('id', this.id);
                formData.append('admin_id', this.admin_id);
            }
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('mobile', this.mobile);
            formData.append('store_url', this.store_url);
            formData.append('password', this.password);
            formData.append('confirm_password', this.confirm_password);
            formData.append('store_name', this.store_name);
            formData.append('street', this.street);
            formData.append('pincode_id', this.pincode_id);
            formData.append('city_id', this.city_id);
            formData.append('categories_ids', this.categories_ids);
            formData.append('state', this.state);
            formData.append('remark', this.remark);
            formData.append('account_number', this.account_number);
            formData.append('ifsc_code', this.ifsc_code);
            formData.append('bank_name', this.bank_name);
            formData.append('account_name', this.account_name);
            formData.append('commission', this.commission);
            formData.append('tax_name', this.tax_name);
            formData.append('tax_number', this.tax_number);
            formData.append('pan_number', this.pan_number);
            formData.append('latitude', this.latitude);
            formData.append('longitude', this.longitude);

            formData.append('place_name', this.place_name);
            formData.append('formatted_address', this.formatted_address);


            formData.append('store_description', this.store_description);
            formData.append('require_products_approval', this.require_products_approval);
            formData.append('customer_privacy', this.customer_privacy);
            formData.append('view_order_otp', this.view_order_otp);
            formData.append('assign_delivery_boy', this.assign_delivery_boy);
            formData.append('change_order_status_delivered', this.change_order_status_delivered);
            formData.append('status', this.status);
            formData.append('store_logo', this.store_logo);
            formData.append('national_id_card', this.national_id_card);
            formData.append('address_proof', this.address_proof);

            let url = this.$apiUrl + '/sellers/save';
            if (this.id) {
                url = this.$apiUrl + '/sellers/update';
            }
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            if(vm.$roleSeller === vm.login_user.role.name){
                                vm.$router.push({path: '/seller/profile'})
                            }else{
                                vm.$router.push({path: '/sellers'})
                            }
                            vm.isLoading = false;
                            //vm.showSuccess(data.message);
                            vm.showMessage("success", data.message);
                        }, 2000);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                if (error?.request?.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
                vm.isLoading = false;
            });
        }
    },
    mounted() {
    }
};
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>

