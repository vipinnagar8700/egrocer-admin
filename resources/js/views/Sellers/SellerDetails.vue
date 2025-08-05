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
                <h4>Seller Complete Profile</h4>
                <p class="auth-subtitle text-primary">Please Complete the form to complete your registration</p>
                <form ref="my-form" @submit.prevent="saveSellerDetails">
                    <div class="row">
                        <div class="content">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Store Information</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Name</label>
                                                <input type="text" class="form-control" v-model="name" required
                                                       placeholder="Enter name.">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Store Name</label>
                                                <input type="text" class="form-control" v-model="store_name" required
                                                       placeholder="Enter store name.">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Store URL</label>
                                                <input type="text" class="form-control" v-model="store_url"
                                                       placeholder="Enter store URL.">
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Categories</label>
                                                <Select2 v-model="categories_ids"
                                                         placeholder="Select Categories"
                                                         :options="categories_options"
                                                         :settings="{ multiple: 'multiple'}"
                                                />

                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Tax Name</label>
                                                <input type="text" class="form-control" v-model="tax_name"
                                                       placeholder="Enter tax name." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Tax Number</label>
                                                <input type="text" class="form-control" v-model="tax_number"
                                                       placeholder="Enter tax number." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>PAN Number</label>
                                                <input type="text" class="form-control" v-model="pan_number"
                                                       placeholder="Enter PAN number." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4"> 
                                            <div class="form-group">
                                                <label>National Identity Card</label>

                                                <input type="file" class="file-input" ref="file_national_id_card"
                                                       v-on:change="handleFileNationalIdCard" required v-if="!id">
                                                <input type="file" class="file-input" ref="file_national_id_card"
                                                       v-on:change="handleFileNationalIdCard" v-if="id">

                                                <div class="file-input-div bg-gray-100" @click="$refs.file_national_id_card.click()" @drop="dropFileNationalIdCard" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <template v-if="national_id_card && national_id_card.name !== ''">
                                                        <label>Selected file name:- {{ national_id_card.name }}</label>
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
                                                <label>Address Proof</label>
                                                <input type="file" class="file-input" ref="file_address_proof"
                                                       v-on:change="handleFileAddressProof" required v-if="!id">
                                                <input type="file" class="file-input" ref="file_address_proof"
                                                       v-on:change="handleFileAddressProof" v-if="id">

                                                <div class="file-input-div bg-gray-100" @click="$refs.file_address_proof.click()" @drop="dropFileAddressProof" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                    <template v-if="address_proof_name == '' ">
                                                        <label><i class="fa fa-cloud-upload-alt fa-2x"></i></label>
                                                        <label>{{ __('drop_files_here_or_click_to_upload') }}</label>
                                                    </template>
                                                    <template v-else>
                                                        <label>Selected file name:- {{ address_proof_name }}</label>
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

                                            <label for="logo">Logo</label>
                                            <input type="file" id="logo" accept="image/*" class="file-input" ref="file_store_logo" v-on:change="handleFileStoreLogo" :required="!id">

                                            <div class="file-input-div bg-gray-100" @click="$refs.file_store_logo.click()" @drop="dropFileStoreLogo" @dragover="$dragoverFile" @dragleave="$dragleaveFile">
                                                <template v-if="store_logo && store_logo.name !== ''">
                                                    <label>Selected file name:- {{ store_logo.name }}</label>
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
                                        <div class="form-group col-md-12">

                                            <label>Store Description :</label>
                                            <
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
                                    <h4>Store Location Information</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <label for="city_name">Select or Search City</label>
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
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>State</label>
                                                <input type="text" class="form-control" v-model="state" readonly placeholder="Enter state">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Street</label>
                                                <input type="text" class="form-control" v-model="street"
                                                       readonly placeholder="Enter street.">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Latitude</label>
                                                <input type="text" class="form-control" v-model="latitude" readonly placeholder="Enter latitude.">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Longitude</label>
                                                <input type="text" class="form-control" v-model="longitude" readonly placeholder="Enter longitude.">
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="location">Search Location</label>
                                            <div class="input-group">
                                                <GmapAutocomplete type="search" class="form-control" placeholder="Search you location on map."
                                                                  @place_changed="setPlace"
                                                                  :options="{ fields: ['formatted_address', 'geometry', 'name'], strictBounds: false}"
                                                                  id="location">
                                                </GmapAutocomplete>
                                                <b-button type="button" variant="primary" v-b-tooltip.hover  title="Add current location" @click="getCurrentLocation">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFFFF">
                                                        <title>current-location</title>
                                                        <path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                                                    </svg>
                                                </b-button>
                                            </div>
                                            <span class="text-danger d-block font-size-13">*Only Search Location, When Update is necessary</span>
                                            <span class="text text-primary font-size-13">Search your seller name and you will get the location points(Latitude & Longitude) below.</span>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div v-if="formatted_address" class="text-danger">*Drag and click marker to your shop proper location (This will affect into delivery charge calculation)</div>
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
                            <div class="card">
                                <div class="card-header">
                                    <h4>Seller Bank Information</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Bank Name</label>
                                                <input type="text" class="form-control" v-model="bank_name"
                                                       placeholder="Enter bank name." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Account Number</label>
                                                <input type="number" class="form-control" v-model="account_number"
                                                       placeholder="Enter account number." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Bank's IFSC Code</label>
                                                <input type="text" class="form-control" v-model="ifsc_code"
                                                       placeholder="Enter bank's IFSC code." required>
                                            </div>
                                        </div>

                                        <div class="form-group col-md-4">
                                            <div class="form-group">
                                                <label>Bank Account Name</label>
                                                <input type="text" class="form-control valid" v-model="account_name"
                                                       placeholder="Enter bank account name." required>
                                            </div>
                                        </div>
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block btn-lg shadow-lg mt-5">
                            Complete
                            <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
                        </button>
                    </div>
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
import {gmapApi} from "vue2-google-maps";
export default {
    components: {
        VuejsDatatableFactory,
        Select2,
        Multiselect,
        'editor': Editor
    },
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data : function(){
        return {
            isLoading: false,
            loggedUser: Auth.user,
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

            name: Auth.user.username,
            email: Auth.user.email,
            mobile: "",
            store_url: "",
            password: "",
            confirm_password: "",
            store_name: "",
            street: "",
            pincode_id: "",
            city_id: "",
            categories_ids: [],
            state: "",
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
            status: 0,
            store_logo: "",
            store_logo_url: "",
            national_id_card: "",
            national_id_card_url: "",
            address_proof: "",
            address_proof_url: "",
            address_proof_name: "",
            categories: [],


            id: null,
            record: null,
            id_card: "",
            proof: "",

            commissionRule: false
        };
    },
    created: function () {
        this.getCategories();
        this.getCities();
    },
    mounted() {
        if(!this.loggedUser){
            this.$router.push('/login');
        }
    },
    computed: {
        categories_options: function () {
            var temp = [];
            this.categories.forEach(category => {
                //Only Main Categories
                if (category.parent_id == 0) {
                    temp.push({id: category.id, text: category.name})
                }
            });
            return temp;
        },
        google: gmapApi
    },
    methods: {
        getCities() {
            axios.get(this.$apiUrl + '/cities')
                .then((response) => {
                    let data = response.data;
                    this.cities = data.data
                });
        },
        getCategories() {
            axios.get(this.$apiUrl + '/categories')
                .then((response) => {
                    let data = response.data;
                    this.categories = data.data
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


        saveSellerDetails: function () {
            let vm = this;
            this.isLoading = true;

            let formData = new FormData();

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
            formData.append('account_number', this.account_number);
            formData.append('ifsc_code', this.ifsc_code);
            formData.append('bank_name', this.bank_name);
            formData.append('account_name', this.account_name);
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
            formData.append('store_logo', this.store_logo);
            formData.append('national_id_card', this.national_id_card);
            formData.append('address_proof', this.address_proof);

            let url = this.$apiUrl + '/seller/details';
            axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.showMessage("success", data.message);
                    setTimeout(
                        function () {
                            vm.$swal.close();
                            Auth.logout();
                            vm.$router.push({path: '/login'})
                        }, 2000);

                } else {
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
#auth{
    overflow: auto!important;
}
.auth {
    overflow-x: hidden!important;
}
.auth-logo {
    padding-bottom: 10px;
}

</style>
