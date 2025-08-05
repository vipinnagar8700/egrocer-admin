<template>
    <div>
        <div class="page-heading">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('store_settings') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/dashboard">{{ __('dashboard') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">{{ __('store_settings') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('update_system_settings') }}</h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                               <div class="vertical-tabs-container">
                                    <div class="tab-buttons">
                                    <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab" :class="{ 'active': activeTab === tab }">
                                        {{ tab }}
                                    </button>
                                    </div>

                                    <div class="tab-content">
                                        <div v-if="activeTab === __('store_setting') ">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('store_setting') }}</h4>
                        </div>
                        <div class="card-body">
                                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                                                <div class="row">
                                                    <input type="hidden" id="system_configurations" name="system_configurations" v-model="store_settings.system_configurations" required="" aria-required="true">
                                                    <input type="hidden" id="system_timezone_gmt" name="system_timezone_gmt" v-model="store_settings.system_timezone_gmt" aria-required="true">
                                                    <input type="hidden" id="system_configurations_id" name="system_configurations_id" v-model="store_settings.system_configurations_id" aria-required="true">

                                                    <div class="form-group col-md-4">
                                                        <label for="app_name">{{ __('app_name') }}:</label>
                                                            <input type="text" class="form-control" required name="app_name" id="app_name" v-model="store_settings.app_name" placeholder="Name of the App - used in whole system"/>

                                                    </div>

                                                    <div class="form-group col-md-4">
                                                        <label for="support_number">{{ __('support_number') }}:</label>
                                                        <input type="text" class="form-control" required name="support_number" id="support_number" v-model="store_settings.support_number" inputmode="numeric" placeholder="Customer support mobile number - used in whole system +91 9876543210" @input="validateMobileNumber"/>
                                                        <span v-if="mobilevalidationError" class="error">{{ mobilevalidationError }}</span>
                                                    </div>

                                                    <div class="form-group col-md-4">
                                                        <label for="support_email">{{ __('support_email') }}:</label>
                                                        <input type="text" class="form-control" required name="support_email" id="support_email" v-model="store_settings.support_email" placeholder="Customer support email - used in whole system"/>
                                                    </div>

                                                  

                                                    <div class="form-group col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <label for="logo">{{ __('logo') }}</label>
                                                                <input type='file' name='logo' id='logo' v-on:change="handleLogoUpload" ref="logo" accept="image/*" class="file-input"/>
                                                                <div class="file-input-div" @click="$refs.logo.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">     
                                                                    <span v-if="Logoerror" class="error">{{ Logoerror }}</span>
                                                                    <template v-if="logo_name && logo_name !== ''">
                                                                        <label> {{ __('selected_file_name') }}{{ logo_name }}</label>
                                                                    </template>
                                                                    <template v-else>
                                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                                    </template>
                                                                </div>
                                                                <div v-if="logo_url">
                                                                    <img class="custom-row-image" :src="logo_url" title='Store Logo' alt='Store Logo'/>
                                                                </div>
                                                            </div>

                                                            <div class="col-md-4">
                                                                <label for="logo">{{ __('fssai_lic_image') }}</label>
                                                                <input type='file' name='fssai_lic_img' id='fssai_lic_img' v-on:change="handleFssaiLicImgUpload" ref="fssai_lic_img" accept="image/*" class="file-input"/>
                                                                <div class="file-input-div" @click="$refs.fssai_lic_img.click()" @drop="dropFileFssaiLicImg" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                                    <span v-if="Fssaierror" class="error">{{ Fssaierror }}</span>
                                                                    <template v-if="fssai_lic_img_name && fssai_lic_img_name !== ''">
                                                                        <label>{{ __('selected_file_name') }} {{ fssai_lic_img_name }}</label>
                                                                    </template>
                                                                    <template v-else>
                                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                                    </template>
                                                                </div>
                                                                <div v-if="fssai_lic_img_url">
                                                                    <img class="custom-row-image" :src="fssai_lic_img_url" title='Fssai Lic Image' alt='Fssai Lic Image'/>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label for="panel_login_background_img">{{ __('panel_login_background_img') }}</label>
                                                                <input type='file' name='panel_login_background_img' id='panel_login_background_img' v-on:change="handlePanelLoginBackgroundImgUpload" ref="panel_login_background_img" accept="image/*" class="file-input"/>
                                                                <div class="file-input-div" @click="$refs.panel_login_background_img.click()" @drop="dropFile" @dragover="$dragoverFile" @dragleave="$dragleaveFile">     
                                                                    <span v-if="Panel_login_background_imgerror" class="error">{{ Panel_login_background_imgerror }}</span>
                                                                    <template v-if="panel_login_background_img_name && panel_login_background_img_name !== ''">
                                                                        <label> {{ __('selected_file_name') }}{{ panel_login_background_img_name }}</label>
                                                                    </template>
                                                                    <template v-else>
                                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                                    </template>
                                                                </div>
                                                                <div v-if="panel_login_background_img_url">
                                                                    <img class="custom-row-image" :src="panel_login_background_img_url" title='panel_login_background_img' alt='panel_login_background_img'/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group col-md-4">
                                                        <label for="copyright_details">{{ __('copyright_details') }}</label>
                                                        <i class="text-danger">*</i>

                                                        <textarea name="copyright_details" id="copyright_details" v-model="store_settings.copyright_details" rows="4" cols="70" class="form-control" :placeholder="__('enter_copyright_details_here')"></textarea>
                                                    </div>
                                                </div>
                                                <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                                </b-button>
                                            </form>
                        </div>
                        </div>
                                        </div>
                                        <div v-if="activeTab === __('address_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('store_address_settings') }}</h4>
                        </div>
                        <div class="card-body">
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="store_address">{{ __('address') }} </label>
                                    <textarea class="form-control" required name="store_address" id="store_address"
                                              rows="2" v-model="store_settings.store_address"></textarea>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="map_latitude"> {{ __('latitude') }}</label>
                                    <input type="text" class="form-control" required name="map_latitude"
                                           id="map_latitude" v-model="store_settings.map_latitude"
                                           :placeholder='__("latitude") '/>
                                           
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="map_longitude"> {{ __('longitude') }}</label>
                                    <input type="text" class="form-control" required name="map_longitude"
                                           id="map_longitude" v-model="store_settings.map_longitude"
                                           :placeholder="__('longitude')"/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="currency"> {{ __('store_currency') }}(Symbol or Code - $ or USD):</label>
                                    <input type="text" class="form-control" required name="currency" id="currency"
                                           v-model="store_settings.currency"
                                           placeholder="Either Symbol or Code - For Example $ or USD"/>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="currency_code">  {{ __('currency_code') }}</label>
                                    <select class="form-control form-select" required name="currency_code" id="currency_code" v-model="store_settings.currency_code">
                                        <option value="">Select Country Currency Code</option>
                                        <option v-for="code in currency_codes" v-if="code.currencyCode !== '' " :value='code.currencyCode'>
                                            {{ code.currencyCode+' - '+code.countryName }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="currency_code">Decimal Point{{ __('decimal_point') }}</label>
                                    <select class="form-control form-select" required name="decimal_point" id="decimal_point" v-model="store_settings.decimal_point">
                                        <option value="">{{ __('select_currency_decimal_point') }}</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="system_timezone" for="system_timezone">{{ __('system_timezone') }}</label>
                                    <select class="form-control form-select col-md-12" name="system_timezone"
                                            id="system_timezone" v-model="store_settings.system_timezone">
                                        <option v-for="timezone_option in timezone_options" :value="timezone_option[2]"
                                                :data-gmt="timezone_option[1]">
                                            {{ timezone_option[2] }} - GMT {{ timezone_option[1] }} -
                                            {{ timezone_option[0] }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label class="system_timezone" for="system_timezone">{{ __('default_city') }}</label>

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

                                    <p v-if="cities.length === 0" class="text-muted">
                                        {{ __('city_not_found') }}. <router-link target="_blank" class="text-muted" to="/cities/create" v-if="$can('city_create')">Add new city here.</router-link>
                                    </p>
                                </div>


                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>
                        </div>
                        
                    </div>
                   
                                        </div>
                                         <div v-if="activeTab === __('other_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('other_setting') }}</h4>
                        </div>
                         <div class="card-body">
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">

                                <div class="form-group col-md-4">
                                    <label for="max_cart_items_count"> {{ __('maximum_items_allowed_in_cart') }} </label> <i class="text-danger">*</i>
                                    <input type="number" required class="form-control" name="max_cart_items_count"
                                           id="max_cart_items_count" v-model="store_settings.max_cart_items_count"
                                           placeholder='Maximum Items Allowed In Cart' min='1'/>
                                    <span class="text text-primary font-size-13">(  {{ __('maximum_items_user_can_add_to_cart_at_once') }})</span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="min_order_amount">  {{ __('minimum_order_amount') }}</label>
                                    <input type="number" required class="form-control" name="min_order_amount"
                                           id="min_order_amount" v-model="store_settings.min_order_amount"
                                           placeholder='Minimum total amount to place order' min='1'/>
                                    <span class="text text-primary font-size-13"> ( Below this user will not allowed to place order {{ __('below_this_user_will_not_allowed_to_place_order') }})</span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="low_stock_limit">{{ __('low_stock_limit') }}</label>
                                    <input type="number" class="form-control" required name="low_stock_limit"
                                           id="low_stock_limit" v-model="store_settings.low_stock_limit"
                                           placeholder='Product low stock limit'/>
                                    <span class="text text-primary font-size-13"> ( {{ __('product_will_be_considered_as_low_stock_if_stock_goes_below_this_limit') }} ) </span>
                                </div>

                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>
                        </div>
                        
                    </div>
                   
                                        </div>
                                        <div v-if="activeTab === __('delivery_boy_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('delivery_boy_setting') }}</h4>
                        </div>
                                            <div class="card-body">
                                                <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">

                                <div class="form-group col-md-4">
                                    <label for="delivery_boy_bonus_settings">{{ __('bonus_settings') }}</label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input"
                                               name="delivery_boy_bonus_settings" id="delivery_boy_bonus_settings"
                                               v-model="store_settings.delivery_boy_bonus_settings">
                                    </div>
                                </div>
                                <div v-if="store_settings.delivery_boy_bonus_settings == 1" class="form-group col-md-4">
                                    <label for="delivery_boy_bonus_type">{{ __('bonus_type') }}</label>
                                    <select name="delivery_boy_bonus_type" id="delivery_boy_bonus_type"
                                            v-model="store_settings.delivery_boy_bonus_type" class="form-control form-select">
                                        <option value="">{{ __('select') }}</option>
                                        <option value="1">{{ __('commission') }}</option>
                                        <option value="0">{{ __('fixed') }}/{{ __('salaried') }}</option>
                                    </select>
                                </div>
                                <div v-if="store_settings.delivery_boy_bonus_settings == 1 && store_settings.delivery_boy_bonus_type == 1" class="form-group col-md-4">
                                    <label for="delivery_boy_bonus_percentage">{{ __('delivery_boy_bonus_percentage') }}(%)</label>
                                    <input type="number"
                                           min="0.1" max="100" step="0.1"
                                           class="form-control"
                                           name="delivery_boy_bonus_percentage" id="delivery_boy_bonus_percentage"
                                           v-model="store_settings.delivery_boy_bonus_percentage"
                                           placeholder='Delivery Boy Bonus'/>
                                </div>

                                <div v-if="store_settings.delivery_boy_bonus_settings == 1 && store_settings.delivery_boy_bonus_type == 1" class="form-group col-md-4">
                                    <label for="delivery_boy_bonus_min_amount">{{ __('minimum_bonus_amount') }}</label>
                                    <input type="number" min="0" step="0.1" required class="form-control" name="delivery_boy_bonus_min_amount"
                                           id="delivery_boy_bonus_min_amount" v-model="store_settings.delivery_boy_bonus_min_amount"
                                           placeholder='Minimum bonus amount'/>
                                    <span class="text text-primary font-size-13">{{ __('set_0_if_you_want_to_remove_limit') }}.</span>
                                </div>

                                <div v-if="store_settings.delivery_boy_bonus_settings == 1 && store_settings.delivery_boy_bonus_type == 1" class="form-group col-md-4">
                                    <label for="delivery_boy_bonus_max_amount">{{ __('maximum_bonus_amount') }}</label>
                                    <input type="number" min="0" step="0.1" required class="form-control" name="delivery_boy_bonus_max_amount"
                                           id="delivery_boy_bonus_max_amount" v-model="store_settings.delivery_boy_bonus_max_amount"
                                           placeholder='Maximum bonus amount'/>
                                    <span class="text text-primary font-size-13">{{ __('set_0_if_you_want_to_remove_limit') }}.</span>
                                </div>

                            </div>
                            <div class="row">

                                <div class="form-group col-md-4">
                                    <label for="generate_otp">{{ __('Order Delivery OTP System') }}</label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input"
                                               name="generate_otp" id="generate_otp"
                                               v-model="store_settings.generate_otp">
                                    </div>
                                </div>
                                </div>
                             <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>
                        </div>
                   
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('app_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('app_setting') }}</h4>
                        </div>
                                            <div class="card-body">
                            <span class=" text text-primary font-size-13">In this mode you can set your app in Maintenance and that Appilication will not work till not disabled from here{{ __('in_this_mode_you_can_set_your_app_in_maitenance_and_that_application_will_not_work_till_not_disabled_from_here') }}</span>
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="app_mode_customer">{{ __('customer_app') }} <span
                                        class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }}
                                        )</span></label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="app_mode_customer"
                                               id="app_mode_customer" v-model="store_settings.app_mode_customer">
                                    </div>

                                    <div class="form-floating mb-3" v-if="store_settings.app_mode_customer == 1" >
                                        <textarea name="message" id="app_mode_customer_remark" :required="store_settings.app_mode_customer == 1"  v-model="store_settings.app_mode_customer_remark" class="form-control" placeholder="Enter Notification Message Here!"></textarea>
                                        <label for="app_mode_customer_remark">{{ __('customer_app_remark') }}</label>
                                    </div>


                                </div>
                                <div class="form-group col-md-4">
                                    <label for="app_mode_seller">{{ __('seller_app') }} <span
                                        class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }}
                                        )</span></label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="app_mode_seller"
                                               id="app_mode_seller" v-model="store_settings.app_mode_seller">
                                    </div>
                                    <div class="form-floating mb-3" v-if="store_settings.app_mode_seller == 1">
                                        <textarea name="message" id="app_mode_seller_remark" :required="store_settings.app_mode_seller == 1"  v-model="store_settings.app_mode_seller_remark" class="form-control" placeholder="Enter Notification Message Here!"></textarea>
                                        <label for="app_mode_seller_remark">{{ __('seller_app_remark') }}</label>
                                    </div>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="app_mode_delivery_boy">{{ __('delivery_boy_app') }}<span
                                        class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }}
                                        )</span></label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="app_mode_delivery_boy"
                                               id="app_mode_delivery_boy"
                                               v-model="store_settings.app_mode_delivery_boy">
                                    </div>

                                    <div class="form-floating mb-3" v-if="store_settings.app_mode_delivery_boy == 1">
                                        <textarea name="message" id="app_mode_delivery_boy_remark" :required="store_settings.app_mode_delivery_boy == 1" v-model="store_settings.app_mode_delivery_boy_remark" class="form-control" placeholder="Enter Notification Message Here!"></textarea>
                                        <label for="app_mode_delivery_boy_remark">{{ __('delivery_boy_app_remark') }}</label>
                                    </div>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="playstore_url">{{ __('playstore_url') }}</label><br>
                                    <input type="url" class="form-control" name="playstore_url" id="playstore_url" v-model="store_settings.playstore_url" :placeholder='__("playstore_url") '/>
                                </div>
                                 <div class="form-group col-md-4">
                                    <label for="appstore_url">{{ __('appstore_url') }}</label><br>
                                    <input type="url" class="form-control" name="appstore_url" id="appstore_url" v-model="store_settings.appstore_url" :placeholder='__("appstore_url") '/>            
                                </div>
                                  <div class="mt-3">
                                                        <div class="row">
                                                            <div class="form-group col-md-4">
                                                                <label for="is_version_system_on">{{ __('android_version_system_status') }}</label><br>
                                                                <div class="form-check form-switch">
                                                                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_version_system_on" id="is_version_system_on" v-model="store_settings.is_version_system_on">
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-4" v-if="store_settings.is_version_system_on == 1">
                                                                <label for="required_force_update">{{ __('android_required_force_update') }}</label><br>
                                                                <div class="form-check form-switch">
                                                                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="required_force_update" id="required_force_update" v-model="store_settings.required_force_update">
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-4" v-if="store_settings.is_version_system_on == 1">
                                                                <label for="current_version">{{ __('android_current_version_of_app') }}</label>
                                                                <input type="text" class="form-control" required name="current_version" id="current_version" v-model="store_settings.current_version" placeholder='Current Version'/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <div class="row">
                                                            <div class="form-group col-md-4">
                                                                <label for="ios_is_version_system_on">{{ __('ios_version_system_status') }}</label><br>
                                                                <div class="form-check form-switch">
                                                                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="ios_is_version_system_on" id="ios_is_version_system_on" v-model="store_settings.ios_is_version_system_on">
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-4" v-if="store_settings.ios_is_version_system_on == 1">
                                                                <label for="ios_required_force_update">{{ __('ios_required_force_update') }}</label><br>
                                                                <div class="form-check form-switch">
                                                                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="ios_required_force_update" id="ios_required_force_update" v-model="store_settings.ios_required_force_update">
                                                                </div>
                                                            </div>

                                                            <div class="form-group col-md-4" v-if="store_settings.ios_is_version_system_on == 1">
                                                                <label for="ios_current_version">{{ __('ios_current_version_of_app') }}</label>
                                                                <input type="text" class="form-control" required name="ios_current_version" id="ios_current_version" v-model="store_settings.ios_current_version" placeholder='IOS Current Version'/>
                                                            </div>
                                                        </div>
                                                    </div>
                            </div>
                             <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>

                        </div>
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('frontend_home_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('frontend_home_setting') }}</h4>
                        </div>
                                           <div class="card-body">
                            <span class=" text text-primary font-size-13">{{ __('in_this_mode_you_can_set_your_app_web_home_page') }}.</span>
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="">{{ __('display_category_section_in_home_page') }}? </label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_category_section_in_homepage" id="is_category_section_in_homepage" v-model="store_settings.is_category_section_in_homepage">
                                    </div>
                                    <div class="form-floating mb-6" v-if="store_settings.is_category_section_in_homepage == 1" >
                                        <input type="number" name="message" id="count_category_section_in_homepage" :min="1" :required="store_settings.is_category_section_in_homepage == 1"  v-model="store_settings.count_category_section_in_homepage" class="form-control" placeholder="Enter Category Number Here!" @input="validateInput">
                                        <label for="">{{ __('count_category_display_in_homepage') }}</label>
                                        <span v-if="validationCategoryError" class="error">{{ validationCategoryError }}</span>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">{{ __('display_brand_section_in_home_page') }}? </label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_brand_section_in_homepage" id="is_brand_section_in_homepage" v-model="store_settings.is_brand_section_in_homepage" >
                                    </div>
                                    <div class="form-floating mb-3" v-if="store_settings.is_brand_section_in_homepage == 1" >
                                        <input type="number" name="message" id="count_brand_section_in_homepage" :min="1" :required="store_settings.is_brand_section_in_homepage == 1"  v-model="store_settings.count_brand_section_in_homepage" class="form-control" placeholder="Enter Brand Number Here!" @input="validateInput">
                                        <label for="">{{ __('count_brand_display_in_homepage') }}</label>
                                        <span v-if="validationBrandError" class="error">{{ validationBrandError }}</span>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">{{ __('display_seller_section_in_home_page') }}?</label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_seller_section_in_homepage" id="is_seller_section_in_homepage" v-model="store_settings.is_seller_section_in_homepage" >
                                    </div>
                                    <div class="form-floating mb-3" v-if="store_settings.is_seller_section_in_homepage == 1" >
                                        <input type="number" name="message" id="count_seller_section_in_homepage" :min="1" :required="store_settings.is_seller_section_in_homepage == 1"  v-model="store_settings.count_seller_section_in_homepage" class="form-control" placeholder="Enter Seller Number Here!" @input="validateInput">
                                        <label for="">{{ __('count_seller_display_in_homepage') }}</label>
                                        <span v-if="validationSellerError" class="error">{{ validationSellerError }}</span>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="">{{ __('display_country_section_in_home_page') }}? </label><br>
                                    <div class="form-check form-switch">
                                        <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="is_country_section_in_homepage" id="is_country_section_in_homepage" v-model="store_settings.is_country_section_in_homepage" >
                                    </div>
                                    <div class="form-floating mb-3" v-if="store_settings.is_country_section_in_homepage == 1" >
                                        <input type="number" name="message" id="count_country_section_in_homepage" :min="1" :required="store_settings.is_country_section_in_homepage == 1"  v-model="store_settings.count_country_section_in_homepage" class="form-control" placeholder="Enter Country Number Here!" @input="validateInput">
                                        <label for="">{{ __('count_country_display_in_homepage') }}</label>
                                        <span v-if="validationCountryError" class="error">{{ validationCountryError }}</span>
                                    </div>
                                </div>
                                
                            </div>
                             <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>

                        </div>
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('smtp_mail_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('smtp_mail_setting') }}</h4>
                        </div>
                                          <div class="card-body">
                                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="smtp_from_mail">{{ __('from_email_id') }}:</label>
                                    <input type="text" class="form-control" required name="smtp_from_mail"
                                           id="smtp_from_mail" v-model="store_settings.smtp_from_mail"
                                           placeholder='From SMTP Email ID'/>
                                    <span class="text text-primary font-size-13">( {{ __('this_email_id_will_be_used_in_smtp_mail_system') }})</span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="smtp_reply_to">{{ __('reply_to_email_id') }}:</label>
                                    <input type="email" class="form-control" required name="smtp_reply_to"
                                           id="smtp_reply_to" v-model="store_settings.smtp_reply_to"
                                           placeholder='From SMTP Email ID'/>
                                    <span class="text text-primary font-size-13">({{ __('this_email_id_will_be_used_in_smtp_mail_system') }})</span>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="smtp_email_password">{{ __('smtp_email_password') }}: </label>
                                    <input type="text" class="form-control" required name="smtp_email_password"
                                           id="smtp_email_password" v-model="store_settings.smtp_email_password"
                                           placeholder='Enter your SMTP email password'/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="smtp_host">{{ __('smtp_host') }}: </label>
                                    <input type="text" class="form-control" required name="smtp_host" id="smtp_host"
                                           v-model="store_settings.smtp_host" placeholder='SMTP Host address'/>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="smtp_port">{{ __('smtp_port') }}:</label> <span class="text text-primary font-size-13"> ( <b>TLS: </b>587 <b>SSL: </b>465 )</span>
                                    <input type="text" class="form-control" required name="smtp_port" id="smtp_port"
                                           v-model="store_settings.smtp_port" placeholder='SMTP Port'/>
                                    
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="smtp_content_type">{{ __('smtp_email_content_type') }}: </label>
                                    <select name="smtp_content_type" id="smtp_content_type"
                                            v-model="store_settings.smtp_content_type" class="form-control form-select">
                                        <option value="">{{ __('select_smtp_email_content_tpe') }}</option>
                                        <option value="html">{{ __('html') }}</option>
                                        <option value="text">{{ __('text') }}</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="smtp_encryption_type">{{ __('smtp_encryption') }}: </label>
                                    <select name="smtp_encryption_type" id="smtp_encryption_type" v-model="store_settings.smtp_encryption_type"  class="form-control form-select">
                                        <option value="">{{ __('select_smtp_encryption_type') }}</option>
                                        <option value="tls">{{ __('tls') }}</option>
                                        <option value="ssl">{{ __('ssl') }}</option>
                                    </select>
                                </div>
                            </div>
                             

                            <hr>
                            <div class="row">
                                <h6>{{ __('email_test') }}</h6>
                                <div class="form-group col-md-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" name="test_email" v-model="store_settings.test_email" placeholder='Enter Email Address for Test'>
                                        <b-button type="button" variant="primary" @click="testMail" :disabled="isSendingTestEmail">
                                            {{ __('test_mail') }}
                                            <b-spinner v-if="isSendingTestEmail" small label="Spinning"></b-spinner>
                                        </b-button>
                                    </div>
                                    <p>{{ __('test_mail_for_test_your_smtp_configuration') }}</p>
                                </div>
                            </div>
                             <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>

                        </div>
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('google_place_apis')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('google_place_apis') }}</h4>
                        </div>
                                         <div class="card-body" v-if="$isDemo != 1">
                                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class=" row -align-items-center"  >
                                <div class="form-group col-md-4">
                                    <label for="google_place_api_key">{{ __('place_api_key') }}</label>
                                    <input type="text" class="form-control" name="google_place_api_key" id="google_place_api_key" v-model="store_settings.google_place_api_key" placeholder="Google Place Api Key">
                                   <input type="hidden" class="form-control" name="apiKey" id="apiKey" v-model="store_settings.apiKey" placeholder="apiKey">
                                  
                                </div>
                            </div>
                             <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>
                        </div>
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('seller_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('seller_setting') }}</h4>
                        </div>
                                         <div class="card-body">
                                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                                                <div class=" row -align-items-center"  >
                                                    <div class="form-group col-md-4">
                                                        <label for="one_seller_cart">{{ __('one_seller_cart') }}<span class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }} )</span></label><br>
                                                        <div class="form-check form-switch">
                                                            <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="one_seller_cart" id="one_seller_cart" v-model="store_settings.one_seller_cart">
                                                        </div>
                                                    </div>
                                                    <div class="form-group col-md-4">
                                                        <label for="google_place_api_key">{{ __('seller_commission') }}</label>
                                                        <input type="number" class="form-control" name="seller_commission" id="seller_commission" v-model="store_settings.seller_commission" placeholder="Seller Commission" step="0.1" min="1" max="100">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-md-4">
                                                        <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                                        </b-button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        </div>
                                        </div>
                                        <div v-if="activeTab === __('login_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('login_setting') }}</h4>
                        </div>
                                         <div class="card-body">
    <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecordLoginSetting">
        <div class="row">
            <div class="form-group col-md-3">
                <label for="phone_login">{{ __('phone_login') }}
                    <span class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }} )</span>
                </label><br>
                <div class="form-check form-switch">
                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="phone_login" id="phone_login" v-model="login_settings.phone_login">
                   
                </div>
            </div>
            <div class="form-group col-md-3">
                <label for="google_login">{{ __('google_login') }}
                    <span class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }} )</span>
                </label><br>
                <div class="form-check form-switch">
                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="google_login" id="google_login" v-model="login_settings.google_login">
                </div>
            </div>
            <div class="form-group col-md-3">
                <label for="apple_login">{{ __('apple_login') }}
                    <span class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }} )</span>
                </label><br>
                <div class="form-check form-switch">
                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="apple_login" id="apple_login" v-model="login_settings.apple_login">
                </div>
            </div>
            <div class="form-group col-md-3">
                <label for="apple_login">{{ __('email_login') }}
                    <span class="text text-primary font-size-13">( {{ __('enable') }}/{{ __('disable') }} )</span>
                </label><br>
                <div class="form-check form-switch">
                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input" name="email_login" id="email_login" v-model="login_settings.email_login">
                </div>
            </div>
            <div v-if="login_settings.phone_login == '1'" class="form-group col-md-6" >
               
               <label for="phone_auth_otp">{{ __('phone_auth_otp') }}
                   <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small>
               </label><br>
               <div class='form-check form-switch'>
                   <input class='form-check-input' id="phone_auth_otp" type='checkbox' true-value="1" false-value="0" v-model="login_settings.phone_auth_otp">
               </div>
           
       </div>
       <div v-if="login_settings.phone_login == '1'" class="form-group col-md-6" >
               
               <label for="phone_auth_password">{{ __('phone_auth_password') }}
                   <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small>
               </label><br>
               <div class='form-check form-switch'>
                   <input class='form-check-input' id="phone_auth_password" type='checkbox' true-value="1" false-value="0" v-model="login_settings.phone_auth_password">
               </div>
           
       </div>
       <div v-if="login_settings.phone_auth_otp == '1' || login_settings.phone_auth_password == '1'" class="form-group col-md-6">

               
                    <label for="firebase_authentication">{{ __('firebase_authentication') }}
                        <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small>
                    </label><br>
                    <div class='form-check form-switch'>
                        <input class='form-check-input' id="firebase_authentication" type='checkbox' true-value="1" false-value="0" v-model="login_settings.firebase_authentication">
                    </div>
                
            </div>
            
            <div v-if="login_settings.phone_auth_otp == '1' || login_settings.phone_auth_password == '1'" class="form-group col-md-6">

               
                    <label for="custom_sms_gateway_otp_based">{{ __('custom_sms_gateway_otp_based') }}
                        <small>[ {{ __('enable') }} / {{ __('disable') }} ] </small>
                    </label><br>
                    <div class='form-check form-switch'>
                        <input class='form-check-input' id="custom_sms_gateway_otp_based" type='checkbox' true-value="1" false-value="0" v-model="login_settings.custom_sms_gateway_otp_based">
                    </div>
                
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-4">
                <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">
                    {{ __('update') }}
                    <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                </b-button>
            </div>
        </div>
    </form>
</div>

                                        </div>
                                        </div>
                                         <div v-if="activeTab === __('cart_setting')">
                                            <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{{ __('cart_setting') }}</h4>
                        </div>
                         <div class="card-body">
                            <form method="post" enctype="multipart/form-data" @submit.prevent="saveRecord">
                            <div class="row">
                                 <div class="form-group col-md-2">
                                    <label for="low_stock_limit">{{ __('cart_notification') }} </label> <i class="fa fa-question-circle tooltip-icon"> <span class="tooltip-text">{{ __('product_will_be_add_incart_without_login') }}</span></i> 
                                    <div class="form-check form-switch">
                                    <input type="checkbox" true-value="1" false-value="0" class="form-check-input"
                                               name="cart_notification" id="cart_notification"
                                               v-model="store_settings.cart_notification">
                                               </div>
                                </div>
                                <div class="form-group col-md-4" v-if="store_settings.cart_notification == 1" >
                                    <label for="notification_delay_after_cart_addition"> {{ __('notification_delay_after_cart_addition') }}</label> <i class="text-danger">* </i><i class="fa fa-question-circle tooltip-icon"> <span class="tooltip-text">{{ __('notification_delay_after_cart_addition_tooltip') }}</span></i> 
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text myDivClass" style="height: 42px;">
                                                <span class="mySpanClass">{{ __('minutes') }}</span>
                                            </div>
                                        </div>
                                        <input type="number" style="height: 42px;" class="form-control" name="notification_delay_after_cart_addition" id="notification_delay_after_cart_addition" min="0"  v-model="store_settings.notification_delay_after_cart_addition">
                                    </div>
                                </div>
                                <div class="form-group col-md-3" v-if="store_settings.cart_notification == 1">
                                    <label for="notification_interval"> {{ __('notification_interval') }}</label> <i class="text-danger">* </i><i class="fa fa-question-circle tooltip-icon"> <span class="tooltip-text">{{ __('notification_delay_after_cart_addition_tooltip') }}</span></i> 
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text myDivClass" style="height: 42px;">
                                                <span class="mySpanClass">{{ __('minutes') }}</span>
                                            </div>
                                        </div>
                                        <input type="number" style="height: 42px;" class="form-control" name="notification_interval" id="notification_interval" min="0"  v-model="store_settings.notification_interval">
                                    </div>
                                </div>
                                    
                                <div class="form-group col-md-3" v-if="store_settings.cart_notification == 1">
                                    <label for="notification_stop_time" > {{ __('notification_stop_time') }}</label> <i class="text-danger">* </i><i class="fa fa-question-circle tooltip-icon"> <span class="tooltip-text">{{ __('notification_stop_time_tooltip') }}</span></i> 
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text myDivClass" style="height: 42px;">
                                                <span class="mySpanClass">{{ __('minutes') }}</span>
                                            </div>
                                        </div>
                                        <input type="number" style="height: 42px;" class="form-control" name="notification_stop_time" id="notification_stop_time" min="0"  v-model="store_settings.notification_stop_time">
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <b-button type="submit" variant="primary" :disabled="isLoading" v-if="$can('manage_store_settings')">{{ __('update') }}
                                        <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                                    </b-button>
                                </div>
                            </div>
                            </form>
                        </div>
                        
                    </div>
                   
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </section>
        </div>
    </div>
</template>
<script>
import axios from "axios";

import Multiselect from 'vue-multiselect';
import {VuejsDatatableFactory} from "vuejs-datatable";
import Select2 from "v-select2-component";
import CryptoJS from "crypto-js";


export default {
    components: {
        Multiselect,
    },
    data: function () {
        return {
            isLoading: false,
            city: "",
            cities: [],
            store_settings: {},
            login_settings: {
                phone_login:0,
                phone_auth_otp: 0,
                phone_auth_password:0,
                firebase_authentication: 0,
                custom_sms_gateway_otp_based:0
            },
            record: null,
            timezone_options: null,
            currency_codes: null,
            logo_url:"",
            logo_name:"",
            panel_login_background_img_url:"",
            panel_login_background_img_name:"",
            fssai_lic_img_url:"",
            fssai_lic_img_name:"",
            isSendingTestEmail : false,
            validationCategoryError: null,
            validationBrandError: null,
            validationSellerError: null,
            validationCountryError: null,
            mobilevalidationError: null,
            Logoerror: null,
            Panel_login_background_imgerror:null,
            Fssaierror: null,
            tabs: [ __('store_setting'), __('address_setting'), __('other_setting'), __('delivery_boy_setting'), __('app_setting'), __('frontend_home_setting'), __('smtp_mail_setting'), __('google_place_apis'), __('seller_setting'), __('login_setting'), __('cart_setting')],
            activeTab:  __('store_setting')
        }
    },
    watch: {
        'login_settings.phone_auth_otp': function (newValue) {
            if (newValue == 1) {
                this.login_settings.phone_auth_password = 0;
                this.login_settings.phone_auth_otp = 1;
            }
        },
        'login_settings.phone_auth_password': function (newValue) {
            if (newValue == 1) {
                this.login_settings.phone_auth_otp = 0;
                this.login_settings.phone_auth_password = 1;
            }
        },
        'login_settings.firebase_authentication': function (newValue) {
            if (newValue == 1) {
                this.login_settings.custom_sms_gateway_otp_based = 0;
                this.login_settings.firebase_authentication = 1;
            }
        },
        'login_settings.custom_sms_gateway_otp_based': function (newValue) {
            if (newValue == 1) {
                this.login_settings.firebase_authentication = 0;
                this.login_settings.custom_sms_gateway_otp_based = 1;
            }
        },
        'store_settings.google_place_api_key'(newValue) {
            this.store_settings.apiKey = newValue;
        }
    },
    created: function () {
        this.getCities();
        this.getStoreSetting();
    },
    methods: {
        dropFile(event) {
            event.preventDefault();
            this.$refs.logo.files = event.dataTransfer.files;
            this.handleLogoUpload();
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        dropFileFssaiLicImg(event) {
            event.preventDefault();
        
            this.$refs.fssai_lic_img.files = event.dataTransfer.files;          
            this.handleFssaiLicImgUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        dropFilePanelLoginackground_imgImg(event) {
            event.preventDefault();
        
            this.$refs.panel_login_background_img.files = event.dataTransfer.files;          
            this.handlePanelLoginBackgroundImgUpload(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        handleLogoUpload: function () {
            const file = this.$refs.logo.files[0];
      
            // Reset previous error message
            this.error = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.Logoerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image.";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.Logoerror = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }

            // Create a URL for the uploaded image and display it
            this.store_settings.logo = this.$refs.logo.files[0];
            this.logo_url = URL.createObjectURL(this.store_settings.logo);
            this.logo_name = this.store_settings.logo.name;
        },
        handleFssaiLicImgUpload: function () {
            const file = this.$refs.fssai_lic_img.files[0];
      
            // Reset previous error message
            this.error = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.Fssaierror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image.";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.Fssaierror = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }
            this.store_settings.fssai_lic_img = this.$refs.fssai_lic_img.files[0];
            this.fssai_lic_img_url = URL.createObjectURL(this.store_settings.fssai_lic_img);
            this.fssai_lic_img_name = this.store_settings.fssai_lic_img.name;
        },
        handlePanelLoginBackgroundImgUpload: function () {
            const file = this.$refs.panel_login_background_img.files[0];
      
            // Reset previous error message
            this.error = null;

            // Check if a file was selected
            if (!file) return;

            // Perform image validation
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.Panel_login_background_imgerror = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF, WEBP or SVG image.";
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                this.Panel_login_background_imgerror = "File size exceeds the maximum allowed limit (2MB).";
                return;
            }

            // Create a URL for the uploaded image and display it
            this.store_settings.panel_login_background_img = this.$refs.panel_login_background_img.files[0];
            this.panel_login_background_img_url = URL.createObjectURL(this.store_settings.panel_login_background_img);
            this.panel_login_background_img_name = this.store_settings.panel_login_background_img.name;
        },
        validateInput() {
            const count_category_section_in_homepage = this.store_settings.count_category_section_in_homepage;
            if (count_category_section_in_homepage < 1 ) {
                this.validationCategoryError = "Category count must be greater than 0.";
            } else {
                this.validationCategoryError = null;
            }
            const count_brand_section_in_homepage = this.store_settings.count_brand_section_in_homepage;
            if (count_brand_section_in_homepage < 1 ) {
                this.validationBrandError = "Brand count must be greater than 0.";
            } else {
                this.validationBrandError = null;
            }
            const count_seller_section_in_homepage = this.store_settings.count_seller_section_in_homepage;
            if (count_seller_section_in_homepage < 1 ) {
                this.validationSellerError = "Seller count must be greater than 0.";
            } else {
                this.validationSellerError = null;
            }
            const count_country_section_in_homepage = this.store_settings.count_country_section_in_homepage;
            if (count_country_section_in_homepage < 1 ) {
                this.validationCountryError = "Country count must be greater than 0.";
            } else {
                this.validationCountryError = null;
            }
        },
        validateMobileNumber() {
            const mobileNumber = this.store_settings.support_number;
            if (!/^\d{1,16}$/.test(mobileNumber)) {
                this.mobilevalidationError = "Support Number must be maximum 16 digits numbers.";
                this.store_settings.support_number = null;
            } else {
                this.mobilevalidationError = null;
            }
        },
        getCities() {
            this.isLoading = true
            axios.get(this.$apiUrl + '/cities')
            .then((response) => {
                this.isLoading = false
                let data = response.data;
                this.cities = data.data

                if(this.deliveryBoys.id){
                    this.city = this.cities.filter((item) => {
                        return item.id === this.record.city_id;
                    });
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            })
        },
        setCityId() {
           this.store_settings.default_city_id = this.city && this.city.id !== undefined ? this.city.id : 0;
        },

        getStoreSetting() {
            let url = this.$apiUrl + '/store_settings';
            let vm = this;
            axios.get(url).then((response) => {
          
                this.store_settings = response.data.data.store_settingsObject;
                this.timezone_options = response.data.data.timezone_options;
                this.currency_codes = response.data.data.currency_code.country;

                this.record = response.data.data.store_settings;
                this.record.map((item, index) => {

                    if (item.value === '0' || item.value === '1') {
                        this.store_settings[item.variable] = (item.value === '0') ? 0 : 1;
                    } else {
                        this.store_settings[item.variable] = item.value;
                    }
                });
                this.login_record = response.data.data.login_settings;
                this.login_record.map((item, index) => {

                    if (item.value === '0' || item.value === '1') {
                        this.login_settings[item.variable] = (item.value === '0') ? 0 : 1;
                    } else {
                        this.login_settings[item.variable] = item.value;
                    }
                });

                this.city = this.cities.filter((item) => {
                    return item.id === parseInt(this.store_settings.default_city_id);
                });

                if(this.store_settings.logo != ""){
                    this.logo_url = this.$storageUrl + this.store_settings.logo;
                }else{
                    this.logo_url = this.$baseUrl + '/images/logo.png';
                }
                if(this.store_settings.fssai_lic_img != ""){
                    this.fssai_lic_img_url = this.$storageUrl + this.store_settings.fssai_lic_img;
                }else{
                    this.fssai_lic_img_url = this.$baseUrl + '/images/fssai_lic_img.png';
                }
                if(this.store_settings.panel_login_background_img != ""){
                    this.panel_login_background_img_url = this.$storageUrl + this.store_settings.panel_login_background_img;
                }else{
                    this.panel_login_background_img_url = this.$baseUrl + '/images/panel_login_background_img.png';
                }
                if(this.store_settings.copyright_details != ""){
                    this.store_settings.copyright_details = this.store_settings.copyright_details.replace(/<br\s*\/?>/g, '\n');
                }
                const secretKey = "ewgrrtoecaemr";
                const bytes = CryptoJS.AES.decrypt( this.store_settings.google_place_api_key, secretKey);
                this.store_settings.google_place_api_key =  bytes.toString(CryptoJS.enc.Utf8);
                console.log(this.store_settings.google_place_api_key);
            });
        },
        saveRecord: function () {
            this.isLoading = true;

            let store_settingsObject = this.store_settings;
            let formData = new FormData();
            for (let key in store_settingsObject) {
                let value = store_settingsObject[key];

                // Encrypt google_place_api_key before sending
                if (key === "google_place_api_key" && value) {
                    const secretKey = "ewgrrtoecaemr";
                   
                    value = CryptoJS.AES.encrypt(value, secretKey).toString();
                    console.log(value);
                }
            
                formData.append(key, value);
            }

            let url = this.$apiUrl + '/store_settings/save'; 
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.getStoreSetting();
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            vm.isLoading = false;
                            window.location.reload();
                            vm.$router.push({path: '/store_settings'});
                        }, 2000);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                vm.isLoading = false;
            });
        },
        saveRecordLoginSetting: function () {
            this.isLoading = true;

            let login_settingsObject = this.login_settings;
            let formData = new FormData();
            for (let key in login_settingsObject) {
                formData.append(key, login_settingsObject[key]);
            }

            let url = this.$apiUrl + '/store_settings/save_login_setting'; 
            let vm = this;
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    this.getStoreSetting();
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            vm.isLoading = false;
                            window.location.reload();
                            vm.$router.push({path: '/store_settings'});
                        }, 2000);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
                vm.isLoading = false;
            });
        },

        testMail: function () {

            let data = {
                'email' : this.store_settings.test_email,
                'host' : this.store_settings.smtp_host,
                'username' : this.store_settings.smtp_from_mail,
                'password' : this.store_settings.smtp_email_password,
                'port' : this.store_settings.smtp_port,
                'encryption' : this.store_settings.smtp_encryption_type,
                'support_email' : this.store_settings.support_email,
            };

            let url = this.$apiUrl + '/store_settings/test_mail';
            let vm = this;
            vm.isSendingTestEmail = true;
            axios.post(url, data).then(res => {
                vm.isSendingTestEmail = false;
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                } else {
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isSendingTestEmail = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            })
        }
    }
}
</script>
<style scoped>
@import "../../../../node_modules/vue-multiselect/dist/vue-multiselect.min.css";
</style>