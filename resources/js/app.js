import Auth from "./Auth";
require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router'
import router from './router'
import { VuejsDatatableFactory } from 'vuejs-datatable';
import { BootstrapVue } from 'bootstrap-vue';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import Select2 from 'v-select2-component';
import CKEditor from '@ckeditor/ckeditor5-vue2';
// es modules
import Editor from '@tinymce/tinymce-vue';

import Permissions from './mixins/Permissions';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Clipboard from 'v-clipboard';
import * as VueGoogleMaps from 'vue2-google-maps';

import Sortable from 'vue-sortable';
import InputTag from 'vue-input-tag';
import VueApexCharts from 'vue-apexcharts';

import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

Vue.component('apexchart', VueApexCharts)

Vue.use(VueFormWizard);

Vue.component('InfiniteLoading', require('vue-infinite-loading'));
Vue.component('input-tag', InputTag);
Vue.use(Sortable);

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import CryptoJS from "crypto-js";

const secretKey = "ewgrrtoecaemr";

function decryptMapApiKey(encryptedKey) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedKey, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
}

// Example usage
let decryptedKey = decryptMapApiKey(window.MapApiKey);


Vue.use(VueGoogleMaps, {
                load: {
                    key: decryptedKey,
                    libraries: 'places,drawing',
                },
            })



Vue.prototype.$googleMapsKey = decryptedKey;
Vue.prototype.$appName = window.appName;
Vue.prototype.$appLogo = window.appLogo;
Vue.prototype.$panelLoginBackgroundImg = window.panelLoginBackgroundImg;
Vue.prototype.$currency = window.currency;
Vue.prototype.$supportEmail = window.supportEmail;
Vue.prototype.$supportNumber = window.supportNumber;
Vue.prototype.$isDemo = window.isDemo;
Vue.prototype.$currentVersion = window.currentVersion;
Vue.prototype.$deliveryBoyBonusSettings = window.deliveryBoyBonusSettings;

Vue.prototype.$websiteUrl = window.websiteUrl;
Vue.prototype.$copyrightDetails = window.copyrightDetails;



Vue.prototype.$mobileWidth = 991;
Vue.prototype.$currentWidth = window.innerWidth;
Vue.prototype.$currentHeight = window.innerHeight;

Vue.prototype.$setWindowSize = function () {
    if (typeof (window.innerWidth) == 'number') {
        Vue.prototype.$currentWidth = window.innerWidth;
        Vue.prototype.$currentHeight = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            Vue.prototype.$currentWidth = document.documentElement.clientWidth;
            Vue.prototype.$currentHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                Vue.prototype.$currentWidth = document.body.clientWidth;
                Vue.prototype.$currentHeight = document.body.clientHeight;
            }
        }
    }
}
Vue.prototype.$setWindowSize();
window.addEventListener('resize', Vue.prototype.$setWindowSize);
window.addEventListener('DOMContentLoaded', Vue.prototype.$setWindowSize);

window.Swal = Swal;
window.moment = require('moment');
window.toastr = require('toastr');


Vue.mixin(Permissions);

Vue.use(CKEditor);
Vue.use(VueToast);
Vue.use(VueRouter)
Vue.use(VuejsDatatableFactory);
Vue.use(BootstrapVue);
Vue.use(Clipboard);

Vue.component('Select2', Select2);

Vue.prototype.$baseUrl = window.baseUrl;
Vue.prototype.$apiUrl = window.baseUrl + '/api';
Vue.prototype.$sellerApiUrl = window.baseUrl + '/api/seller';
Vue.prototype.$deliveryBoyApiUrl = window.baseUrl + '/api/delivery_boy';
Vue.prototype.$storageUrl = window.baseUrl + '/storage/';


//Role
Vue.prototype.$roleSuperAdmin = "Super Admin";
Vue.prototype.$roleSeller = "Seller";
Vue.prototype.$roleDeliveryBoy = "Delivery Boy";
Vue.prototype.$roleName = "Super Admin";


//order_status_lists
Vue.prototype.$pending = "Payment Pending";
Vue.prototype.$received = "Received";
Vue.prototype.$processed = "Processed";
Vue.prototype.$shipped = "Shipped";
Vue.prototype.$outForDelivery = "Out For Delivery";
Vue.prototype.$delivered = "Delivered";
Vue.prototype.$cancelled = "Cancelled";
Vue.prototype.$returned = "Returned";


Vue.prototype.$editorPlugins = [

    "autolink",

    "lists",
    "link",
    "image",
    "charmap",

    "anchor",
    "searchreplace",
    "visualblocks",

    "media",

    "table",

    "wordcount",

];
Vue.prototype.$editorToolbar = "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat";
Vue.prototype.$editorFont_size_formats = '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt';

Vue.prototype.$swal = window.Swal;

Vue.prototype.$logo = '';

var lang = localStorage.getItem("language");

lang = JSON.parse(lang);
Vue.prototype.$perPage = 5;
vue__WEBPACK_IMPORTED_MODULE_17__["default"].prototype.$pageOptions = [2, 5, 10, 20, 50, {
    value: 100,
    text: lang && lang.show_a_lot ? lang.show_a_lot : 'View All'
}];



window.trans = window.__ = function (string) {

    var lang = localStorage.getItem("language");

    lang = JSON.parse(lang);

    window.i18n = lang;

    return _.get(lang, string);
};



Vue.prototype.trans = window.trans;
Vue.prototype.__ = window.__;

Vue.prototype.$eventBus = new Vue();

Vue.prototype.updateLogo = function (logo) {
    Vue.prototype.$logo = logo;
    window.localStorage.setItem('logo', logo);
};

Vue.prototype.isImage = function (url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

Vue.prototype.$dragoverFile = function (event) {
    event.preventDefault();
    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
    }
};
Vue.prototype.$dragleaveFile = function (event) {
    // Clean up
    event.currentTarget.classList.add('bg-gray-100');
    event.currentTarget.classList.remove('bg-green-300');
};



Vue.prototype.formattedName = function (name) {
    var newName = name.replace(/_/g, ' ');
    newName = newName.toLowerCase().replace(/(?<= )[^\s]|^./g, a => a.toUpperCase())
    return newName;
};


Vue.prototype.showMessage = function (variant, message) {
    Vue.$toast.open({
        type: variant,
        message: message,
    });
};

Vue.prototype.showSuccess = function (message) {
    this.$swal.fire({
        title: 'Success',
        text: message,
        icon: 'success',
        confirmButtonText: "Ok",
    });
};

Vue.prototype.showError = function (error_message) {
    this.$swal.fire({
        title: 'Error',
        text: error_message,
        icon: 'error',
        confirmButtonText: "Ok",
    });
};
Vue.prototype.showWarning = function (error_message) {
    this.$swal.fire({
        title: 'Warning',
        text: error_message,
        icon: 'warning',
        confirmButtonText: "Ok",
    });
};

Vue.filter('emailMask', function (value) {
    if (Vue.prototype.$isDemo === 0 || Vue.prototype.$isDemo === "0") return value;
    if (!value) return '';
    const [username, domain] = value.split('@');
    let first = username.substring(0, 2);
    let last = username.slice(-2);
    let center = username.slice(2, -2);
    let maskedCenter = center.replace(/./g, '*');
    const maskedUsername = first + maskedCenter + last;
    return `${maskedUsername}@${domain}`;

});

Vue.filter('mobileMask', function (value) {
    if (Vue.prototype.$isDemo === 0 || Vue.prototype.$isDemo === "0") return value;
    if (!value) return '';
    let first = value.substring(0, 2);
    let last = value.slice(-3);
    let center = value.slice(2, -3);
    const maskedCenter = center.replace(/./g, '*');
    return `${first}${maskedCenter}${last}`;
});


const app = new Vue({
    router
}).$mount('#app')
