"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_PaymentMethods_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      payment_method: {
        payment_method_settings: 0,
        cod_payment_method: 0,
        cod_mode: "",
        paypal_payment_method: 0,
        paypal_mode: "",
        paypal_currency_code: "",
        paypal_business_email: "",
        paypal_notification_url: this.$baseUrl + "/customer/ipn",
        payumoney_payment_method: 0,
        payumoney_mode: "",
        payumoney_merchant_key: "",
        payumoney_merchant_id: "",
        payumoney_salt: "",
        razorpay_payment_method: 0,
        razorpay_key: "",
        razorpay_secret_key: "",
        paystack_payment_method: 0,
        paystack_public_key: "",
        paystack_secret_key: "",
        paystack_currency_code: "",
        flutterwave_payment_method: 0,
        flutterwave_public_key: "",
        flutterwave_secret_key: "",
        flutterwave_encryption_key: "",
        flutterwave_currency_code: "",
        stripe_payment_method: 0,
        stripe_publishable_key: "",
        stripe_secret_key: "",
        stripe_webhook_secret_key: "",
        stripe_webhook_url: this.$baseUrl + "/webhook/stripe",
        stripe_currency_code: "",
        stripe_mode: "",
        paytm_payment_method: 0,
        paytm_mode: "",
        paytm_merchant_key: "",
        paytm_merchant_id: "",
        ssl_commerce_payment_method: 0,
        ssl_commerece_mode: "",
        ssl_commerece_store_id: "",
        ssl_commerece_secret_key: "",
        direct_bank_transfer: 0,
        account_name: "",
        account_number: "",
        bank_name: "",
        bank_code: "",
        notes: "",
        midtrans_payment_method: 0,
        midtrans_mode: "",
        midtrans_server_key: "",
        midtrans_notification_url: this.$baseUrl + "/midtrans/callback",
        midtrans_return_url: this.$websiteUrl + "/web-payment-status",
        phonepay_payment_method: 0,
        phonepay_mode: "",
        //phonepay_api_key: "",
        //phonepay_salt_index: "",
        //phonepay_app_id: "",
        phonepay_merchant_id: "",
        phonepay_client_id: "",
        phonepay_client_version: "",
        phonepay_client_secret: "",
        phonepay_payment_endpoint_url: this.$baseUrl + "/phonepe/callback",
        cashfree_payment_method: 0,
        cashfree_mode: "",
        cashfree_app_id: "",
        cashfree_secret_key: "",
        cashfree_notification_url: this.$baseUrl + "/cashfree/callback",
        paytabs_payment_method: 0,
        paytabs_mode: "",
        paytabs_profile_id: "",
        paytabs_secret_key: "",
        paytabs_notification_url: this.$baseUrl + "/paytabs/callback"
      },
      record: null
    };
  },
  created: function created() {
    this.getPaymentMethods();
  },
  methods: {
    getPaymentMethods: function getPaymentMethods() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/payment_methods').then(function (response) {
        if (response.data.data) {
          var _this$record$payment_, _this$record$cod_paym, _this$record$cod_mode, _this$record$paypal_m, _this$record$paypal_c, _this$record$paypal_n, _this$record$payumone, _this$record$paystack, _this$record$flutterw, _this$record$stripe_w, _this$record$paytm_mo, _this$record$ssl_comm;
          _this.record = response.data.data;
          _this.payment_method.payment_method_settings = (_this$record$payment_ = _this.record.payment_method_settings) !== null && _this$record$payment_ !== void 0 ? _this$record$payment_ : 0;
          _this.payment_method.cod_payment_method = (_this$record$cod_paym = _this.record.cod_payment_method) !== null && _this$record$cod_paym !== void 0 ? _this$record$cod_paym : 0;
          _this.payment_method.cod_mode = (_this$record$cod_mode = _this.record.cod_mode) !== null && _this$record$cod_mode !== void 0 ? _this$record$cod_mode : "";
          _this.payment_method.paypal_payment_method = _this.record.paypal_payment_method;
          _this.payment_method.paypal_mode = (_this$record$paypal_m = _this.record.paypal_mode) !== null && _this$record$paypal_m !== void 0 ? _this$record$paypal_m : "";
          _this.payment_method.paypal_currency_code = (_this$record$paypal_c = _this.record.paypal_currency_code) !== null && _this$record$paypal_c !== void 0 ? _this$record$paypal_c : "";
          _this.payment_method.paypal_business_email = _this.record.paypal_business_email;
          _this.payment_method.paypal_notification_url = (_this$record$paypal_n = _this.record.paypal_notification_url) !== null && _this$record$paypal_n !== void 0 ? _this$record$paypal_n : "";
          _this.payment_method.payumoney_payment_method = _this.record.payumoney_payment_method;
          _this.payment_method.payumoney_mode = (_this$record$payumone = _this.record.payumoney_mode) !== null && _this$record$payumone !== void 0 ? _this$record$payumone : "";
          _this.payment_method.payumoney_merchant_key = _this.record.payumoney_merchant_key;
          _this.payment_method.payumoney_merchant_id = _this.record.payumoney_merchant_id;
          _this.payment_method.payumoney_salt = _this.record.payumoney_salt;
          _this.payment_method.razorpay_payment_method = _this.record.razorpay_payment_method;
          _this.payment_method.razorpay_key = _this.record.razorpay_key;
          _this.payment_method.razorpay_secret_key = _this.record.razorpay_secret_key;
          _this.payment_method.paystack_payment_method = _this.record.paystack_payment_method;
          _this.payment_method.paystack_public_key = _this.record.paystack_public_key;
          _this.payment_method.paystack_secret_key = _this.record.paystack_secret_key;
          _this.payment_method.paystack_currency_code = (_this$record$paystack = _this.record.paystack_currency_code) !== null && _this$record$paystack !== void 0 ? _this$record$paystack : "";
          _this.payment_method.flutterwave_payment_method = _this.record.flutterwave_payment_method;
          _this.payment_method.flutterwave_public_key = _this.record.flutterwave_public_key;
          _this.payment_method.flutterwave_secret_key = _this.record.flutterwave_secret_key;
          _this.payment_method.flutterwave_encryption_key = _this.record.flutterwave_encryption_key;
          _this.payment_method.flutterwave_currency_code = (_this$record$flutterw = _this.record.flutterwave_currency_code) !== null && _this$record$flutterw !== void 0 ? _this$record$flutterw : "";
          _this.payment_method.midtrans_payment_method = _this.record.midtrans_payment_method;
          _this.payment_method.stripe_payment_method = _this.record.stripe_payment_method;
          _this.payment_method.stripe_publishable_key = _this.record.stripe_publishable_key;
          _this.payment_method.stripe_secret_key = _this.record.stripe_secret_key;
          _this.payment_method.stripe_webhook_secret_key = _this.record.stripe_webhook_secret_key;
          _this.payment_method.stripe_webhook_url = (_this$record$stripe_w = _this.record.stripe_webhook_url) !== null && _this$record$stripe_w !== void 0 ? _this$record$stripe_w : "";
          _this.payment_method.stripe_currency_code = _this.record.stripe_currency_code;
          _this.payment_method.stripe_mode = _this.record.stripe_mode;
          _this.payment_method.paytm_payment_method = _this.record.paytm_payment_method;
          _this.payment_method.paytm_mode = (_this$record$paytm_mo = _this.record.paytm_mode) !== null && _this$record$paytm_mo !== void 0 ? _this$record$paytm_mo : "";
          _this.payment_method.paytm_merchant_key = _this.record.paytm_merchant_key;
          _this.payment_method.paytm_merchant_id = _this.record.paytm_merchant_id;
          _this.payment_method.ssl_commerce_payment_method = _this.record.ssl_commerce_payment_method;
          _this.payment_method.ssl_commerece_mode = (_this$record$ssl_comm = _this.record.ssl_commerece_mode) !== null && _this$record$ssl_comm !== void 0 ? _this$record$ssl_comm : "";
          _this.payment_method.ssl_commerece_store_id = _this.record.ssl_commerece_store_id;
          _this.payment_method.ssl_commerece_secret_key = _this.record.ssl_commerece_secret_key;
          _this.payment_method.direct_bank_transfer = _this.record.direct_bank_transfer;
          _this.payment_method.account_name = _this.record.account_name;
          _this.payment_method.account_number = _this.record.account_number;
          _this.payment_method.bank_name = _this.record.bank_name;
          _this.payment_method.bank_code = _this.record.bank_code;
          _this.payment_method.notes = _this.record.notes;
          _this.payment_method.midtrans_payment_method = _this.record.midtrans_payment_method;
          _this.payment_method.midtrans_mode = _this.record.midtrans_mode;
          _this.payment_method.midtrans_server_key = _this.record.midtrans_server_key;
          _this.payment_method.phonepay_payment_method = _this.record.phonepay_payment_method;
          _this.payment_method.phonepay_mode = _this.record.phonepay_mode;
          // this.payment_method.phonepay_api_key = this.record.phonepay_api_key;
          _this.payment_method.phonepay_merchant_id = _this.record.phonepay_merchant_id;
          // this.payment_method.phonepay_salt_index = this.record.phonepay_salt_index;
          // this.payment_method.phonepay_app_id = this.record.phonepay_app_id;
          _this.payment_method.phonepay_client_id = _this.record.phonepay_client_id;
          _this.payment_method.phonepay_client_version = _this.record.phonepay_client_version;
          _this.payment_method.phonepay_client_secret = _this.record.phonepay_client_secret;
          _this.payment_method.phonepay_payment_endpoint_url = _this.record.phonepay_payment_endpoint_url;
          _this.payment_method.cashfree_payment_method = _this.record.cashfree_payment_method;
          _this.payment_method.cashfree_mode = _this.record.cashfree_mode;
          _this.payment_method.cashfree_app_id = _this.record.cashfree_app_id;
          _this.payment_method.cashfree_secret_key = _this.record.cashfree_secret_key;
          _this.payment_method.paytabs_payment_method = _this.record.paytabs_payment_method;
          _this.payment_method.paytabs_mode = _this.record.paytabs_mode;
          _this.payment_method.paytabs_profile_id = _this.record.paytabs_profile_id;
          _this.payment_method.paytabs_secret_key = _this.record.paytabs_secret_key;
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      this.isLoading = true;
      var payment_methodObject = this.payment_method;
      var formData = new FormData();
      for (var key in payment_methodObject) {
        if (payment_methodObject[key] == false) {
          formData.append(key, 0);
        } else if (payment_methodObject[key] == true) {
          formData.append(key, 1);
        } else {
          formData.append(key, payment_methodObject[key]);
        }
      }
      var vm = this;
      if (this.payment_method.cod_payment_method == 1 || this.payment_method.paypal_payment_method == 1 || this.payment_method.razorpay_payment_method == 1 || this.payment_method.paystack_payment_method == 1 || this.payment_method.stripe_payment_method == 1 || this.payment_method.paytm_payment_method == 1 || this.payment_method.midtrans_payment_method == 1 || this.payment_method.phonepay_payment_method == 1 || this.payment_method.cashfree_payment_method == 1 || this.payment_method.paytabs_payment_method == 1) {
        var url = this.$apiUrl + '/payment_methods/save';
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
          var data = res.data;
          if (data.status === 1) {
            _this2.showMessage("success", data.message);
            setTimeout(function () {
              vm.$swal.close();
              vm.getPaymentMethods();
              vm.$router.push({
                path: '/payment_methods'
              });
              vm.isLoading = false;
            }, 100);
          } else {
            vm.showError(data.message);
            vm.isLoading = false;
          }
        })["catch"](function (error) {
          if (error.request.statusText) {
            _this2.showError(error.request.statusText);
          } else if (error.message) {
            _this2.showError(error.message);
          } else {
            _this2.showError(__('something_went_wrong'));
          }
          vm.isLoading = false;
        });
      } else {
        this.showMessage("error", "At lease one payment method is should enable");
        vm.isLoading = false;
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/PaymentMethods.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Setting/PaymentMethods.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaymentMethods.vue?vue&type=template&id=555362ea */ "./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea");
/* harmony import */ var _PaymentMethods_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaymentMethods.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PaymentMethods_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__.render,
  _PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/PaymentMethods.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaymentMethods_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaymentMethods.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaymentMethods_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaymentMethods_vue_vue_type_template_id_555362ea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaymentMethods.vue?vue&type=template&id=555362ea */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PaymentMethods.vue?vue&type=template&id=555362ea ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "page-heading" }, [
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [
              _vm._v(_vm._s(_vm.__("payment_gateways_methods_settings"))),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-12 col-md-6 order-md-2 order-first" }, [
            _c(
              "nav",
              {
                staticClass: "breadcrumb-header float-start float-lg-end",
                attrs: { "aria-label": "breadcrumb" },
              },
              [
                _c("ol", { staticClass: "breadcrumb" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/dashboard" } }, [
                        _vm._v(_vm._s(_vm.__("dashboard"))),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      staticClass: "breadcrumb-item active",
                      attrs: { "aria-current": "page" },
                    },
                    [
                      _vm._v(
                        _vm._s(_vm.__("payment_gateways_methods_settings"))
                      ),
                    ]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c(
          "form",
          {
            attrs: {
              id: "payment_method_settings_form",
              method: "post",
              enctype: "multipart/form-data",
            },
            on: {
              submit: function ($event) {
                $event.preventDefault()
                return _vm.saveRecord.apply(null, arguments)
              },
            },
          },
          [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("cod_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.payment_method.payment_method_settings,
                          expression: "payment_method.payment_method_settings",
                        },
                      ],
                      attrs: {
                        type: "hidden",
                        id: "payment_method_settings",
                        name: "payment_method_settings",
                        required: "",
                        value: "1",
                        "aria-required": "true",
                      },
                      domProps: {
                        value: _vm.payment_method.payment_method_settings,
                      },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.payment_method,
                            "payment_method_settings",
                            $event.target.value
                          )
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("div", {}, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "cod_payment_method" } }, [
                          _vm._v(_vm._s(_vm.__("cod_payments")) + " "),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]),
                        _c("br"),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-check form-switch" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.cod_payment_method,
                                expression: "payment_method.cod_payment_method",
                              },
                            ],
                            staticClass: "form-check-input",
                            attrs: {
                              id: "cod_payment_method",
                              type: "checkbox",
                              "true-value": "1",
                              "false-value": "0",
                            },
                            domProps: {
                              checked: _vm.payment_method.cod_payment_method,
                              checked: Array.isArray(
                                _vm.payment_method.cod_payment_method
                              )
                                ? _vm._i(
                                    _vm.payment_method.cod_payment_method,
                                    null
                                  ) > -1
                                : _vm._q(
                                    _vm.payment_method.cod_payment_method,
                                    "1"
                                  ),
                            },
                            on: {
                              change: function ($event) {
                                var $$a = _vm.payment_method.cod_payment_method,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? "1" : "0"
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        _vm.payment_method,
                                        "cod_payment_method",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        _vm.payment_method,
                                        "cod_payment_method",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(
                                    _vm.payment_method,
                                    "cod_payment_method",
                                    $$c
                                  )
                                }
                              },
                            },
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.payment_method.cod_payment_method == 1
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", { attrs: { for: "cod_mode" } }, [
                              _vm._v(_vm._s(_vm.__("cod_mode"))),
                            ]),
                            _c("br"),
                            _vm._v(" "),
                            _c("p", [
                              _c("small", [
                                _c("b", [
                                  _vm._v(_vm._s(_vm.__("global")) + " :"),
                                ]),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.__(
                                        "will_be_considered_for_all_the_products"
                                      )
                                    ) +
                                    "."
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("p", [
                              _c("small", [
                                _c("b", [
                                  _vm._v(_vm._s(_vm.__("product_wise")) + " :"),
                                ]),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.__(
                                        "product_wise_cod_will_be_considered"
                                      )
                                    ) +
                                    "."
                                ),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.payment_method.cod_mode,
                                    expression: "payment_method.cod_mode",
                                  },
                                ],
                                staticClass: "form-control form-select",
                                attrs: { name: "cod_mode", id: "cod_mode" },
                                on: {
                                  change: function ($event) {
                                    var $$selectedVal = Array.prototype.filter
                                      .call(
                                        $event.target.options,
                                        function (o) {
                                          return o.selected
                                        }
                                      )
                                      .map(function (o) {
                                        var val =
                                          "_value" in o ? o._value : o.value
                                        return val
                                      })
                                    _vm.$set(
                                      _vm.payment_method,
                                      "cod_mode",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  },
                                },
                              },
                              [
                                _c(
                                  "option",
                                  { attrs: { value: "global", selected: "" } },
                                  [_vm._v(_vm._s(_vm.__("global")))]
                                ),
                                _vm._v(" "),
                                _c("option", { attrs: { value: "product" } }, [
                                  _vm._v(_vm._s(_vm.__("product_wise"))),
                                ]),
                              ]
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("paypal_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "paypal_payment_method" } }, [
                        _vm._v(" " + _vm._s(_vm.__("paypal_payments"))),
                        _c("small", [
                          _vm._v(
                            "[ " +
                              _vm._s(_vm.__("enable")) +
                              " / " +
                              _vm._s(_vm.__("disable")) +
                              " ] "
                          ),
                        ]),
                      ]),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.paypal_payment_method,
                              expression:
                                "payment_method.paypal_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "paypal_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.paypal_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.paypal_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.paypal_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.paypal_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.paypal_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paypal_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paypal_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "paypal_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.paypal_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "paypal_mode" } }, [
                            _vm._v(" " + _vm._s(_vm.__("payment_mode"))),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.paypal_mode,
                                  expression: "payment_method.paypal_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "paypal_mode",
                                id: "paypal_mode",
                                required: "",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "paypal_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode")) + " "),
                              ]),
                              _vm._v(" "),
                              _c(
                                "option",
                                { attrs: { value: "sandbox", selected: "" } },
                                [
                                  _vm._v(
                                    _vm._s(_vm.__("sandbox")) +
                                      " ( " +
                                      _vm._s(_vm.__("testing")) +
                                      " )"
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  " " +
                                    _vm._s(_vm.__("production")) +
                                    "( " +
                                    _vm._s(_vm.__("live")) +
                                    " )"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paypal_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paypal_currency_code" } },
                            [
                              _vm._v(_vm._s(_vm.__("currency_code")) + " "),
                              _c("small", [
                                _vm._v(
                                  "[ " +
                                    _vm._s(_vm.__("paypal_supported")) +
                                    " ]"
                                ),
                              ]),
                              _vm._v(" "),
                              _vm._m(0),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.payment_method.paypal_currency_code,
                                  expression:
                                    "payment_method.paypal_currency_code",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "paypal_currency_code",
                                id: "paypal_currency_code",
                                required: "",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "paypal_currency_code",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(
                                  " " + _vm._s(_vm.__("select_currency_code"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "INR" } }, [
                                _vm._v(
                                  "Indian rupee " +
                                    _vm._s(_vm.__("indian_rupee"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AUD" } }, [
                                _vm._v(
                                  "Australian dollar" +
                                    _vm._s(_vm.__("australian_dollar")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BRL" } }, [
                                _vm._v(
                                  "Brazilian real" +
                                    _vm._s(_vm.__("brazilian_real")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CAD" } }, [
                                _vm._v(
                                  "Canadian dollar" +
                                    _vm._s(_vm.__("canadian_doller")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CNY" } }, [
                                _vm._v(
                                  "Chinese Renmenbi" +
                                    _vm._s(_vm.__("chinese_renmenbi")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CZK" } }, [
                                _vm._v(
                                  "Czech koruna" +
                                    _vm._s(_vm.__("czech_koruna")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "DKK" } }, [
                                _vm._v(
                                  "Danish krone " +
                                    _vm._s(_vm.__("danish_krone"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "EUR" } }, [
                                _vm._v("Euro " + _vm._s(_vm.__("euro"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HKD" } }, [
                                _vm._v(
                                  "Hong Kong dollar " +
                                    _vm._s(_vm.__("hong_kong_dollar"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HUF" } }, [
                                _vm._v(
                                  "Hungarian forint " +
                                    _vm._s(_vm.__("hungarian_forint"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ILS" } }, [
                                _vm._v(
                                  "Israeli new shekel" +
                                    _vm._s(_vm.__("israeli_new_shekel")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "JPY" } }, [
                                _vm._v(
                                  "Japanese yen" +
                                    _vm._s(_vm.__("japanese_yen")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MYR" } }, [
                                _vm._v(
                                  "Malaysian ringgit" +
                                    _vm._s(_vm.__("malaysian_ringgit")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MXN" } }, [
                                _vm._v(
                                  "Mexican peso " +
                                    _vm._s(_vm.__("mexican_peso"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TWD" } }, [
                                _vm._v(
                                  "New Taiwan dollar " +
                                    _vm._s(_vm.__("new_taiwan_dollar"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NZD" } }, [
                                _vm._v(
                                  "New Zealand dollar" +
                                    _vm._s(_vm.__("new_zealand_dollar")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NOK" } }, [
                                _vm._v(
                                  "Norwegian krone" +
                                    _vm._s(_vm.__("norwegian_krone")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PHP" } }, [
                                _vm._v(
                                  "Philippine peso " +
                                    _vm._s(_vm.__("philippine_peso"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PLN" } }, [
                                _vm._v(
                                  "Polish złoty " +
                                    _vm._s(_vm.__("polish_zloty"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GBP" } }, [
                                _vm._v(
                                  "Pound sterling" +
                                    _vm._s(_vm.__("pound_sterling")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "RUB" } }, [
                                _vm._v(
                                  "Russian ruble" +
                                    _vm._s(_vm.__("russian_ruble")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SGD" } }, [
                                _vm._v(
                                  "Singapore dollar " +
                                    _vm._s(_vm.__("singapore_dollar"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SEK" } }, [
                                _vm._v(
                                  "Swedish krona" +
                                    _vm._s(_vm.__("swedish_krona")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CHF" } }, [
                                _vm._v(
                                  "Swiss franc" +
                                    _vm._s(_vm.__("swiss_franc")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "THB" } }, [
                                _vm._v(
                                  "Thai baht" +
                                    _vm._s(_vm.__("thai_baht")) +
                                    " "
                                ),
                              ]),
                              _vm._v(" "),
                              _c(
                                "option",
                                { attrs: { value: "USD", selected: "" } },
                                [
                                  _vm._v(
                                    "United States dollar" +
                                      _vm._s(_vm.__("united_states_dollar")) +
                                      " "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paypal_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paypal_business_email" } },
                            [_vm._v(_vm._s(_vm.__("paypal_business_email")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paypal_business_email,
                                expression:
                                  "payment_method.paypal_business_email",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paypal_business_email",
                              id: "paypal_business_email",
                              placeholder: "Paypal Business Email",
                              required: "",
                            },
                            domProps: {
                              value: _vm.payment_method.paypal_business_email,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paypal_business_email",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paypal_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paypal_notification_url" } },
                            [
                              _vm._v(_vm._s(_vm.__("notification_url"))),
                              _c("small", [
                                _vm._v(
                                  "(Set this as IPN notification URL in you PayPal account" +
                                    _vm._s(
                                      _vm.__(
                                        "set_this_as_ipn_notification_url_in_you_paypal_account"
                                      )
                                    ) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.paypal_notification_url,
                                expression:
                                  "payment_method.paypal_notification_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paypal_notification_url",
                              id: "paypal_notification_url",
                              placeholder: "Paypal IPN notification URL",
                              disabled: "",
                            },
                            domProps: {
                              value: _vm.payment_method.paypal_notification_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paypal_notification_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("razorpay_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "razorpay_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("razorpay_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.razorpay_payment_method,
                              expression:
                                "payment_method.razorpay_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "razorpay_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.razorpay_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.razorpay_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.razorpay_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.razorpay_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.razorpay_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "razorpay_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "razorpay_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "razorpay_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.razorpay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "razorpay_key" } }, [
                            _vm._v(_vm._s(_vm.__("razorpay_key_id"))),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.razorpay_key,
                                expression: "payment_method.razorpay_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "razorpay_key",
                              id: "razorpay_key",
                              placeholder: "Razor Key ID",
                            },
                            domProps: {
                              value: _vm.payment_method.razorpay_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "razorpay_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.razorpay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "razorpay_secret_key" } },
                            [_vm._v(_vm._s(_vm.__("secret_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.razorpay_secret_key,
                                expression:
                                  "payment_method.razorpay_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "razorpay_secret_key",
                              id: "razorpay_secret_key",
                              placeholder: "Razorpay Secret Key ",
                            },
                            domProps: {
                              value: _vm.payment_method.razorpay_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "razorpay_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("paystack_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "paystack_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("paystack_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.paystack_payment_method,
                              expression:
                                "payment_method.paystack_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "paystack_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.paystack_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.paystack_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.paystack_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.paystack_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.paystack_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paystack_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paystack_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "paystack_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.paystack_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paystack_public_key" } },
                            [_vm._v(_vm._s(_vm.__("paystack_public_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paystack_public_key,
                                expression:
                                  "payment_method.paystack_public_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paystack_public_key",
                              id: "paystack_public_key",
                              placeholder: "Paystack Public key",
                              required: "",
                            },
                            domProps: {
                              value: _vm.payment_method.paystack_public_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paystack_public_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paystack_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paystack_secret_key" } },
                            [_vm._v(_vm._s(_vm.__("paystack_secret_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paystack_secret_key,
                                expression:
                                  "payment_method.paystack_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paystack_secret_key",
                              id: "paystack_secret_key",
                              placeholder: "Paystack Secret Key ",
                              required: "",
                            },
                            domProps: {
                              value: _vm.payment_method.paystack_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paystack_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paystack_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paystack_currency_code" } },
                            [
                              _vm._v(" " + _vm._s(_vm.__("currency_code"))),
                              _c("small", [
                                _vm._v(
                                  "[" +
                                    _vm._s(_vm.__("paystack_supported")) +
                                    "]"
                                ),
                              ]),
                              _vm._v(" "),
                              _vm._m(1),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.payment_method.paystack_currency_code,
                                  expression:
                                    "payment_method.paystack_currency_code",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "paystack_currency_code",
                                id: "paystack_currency_code",
                                required: "",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "paystack_currency_code",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_currency_code"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GHS" } }, [
                                _vm._v(_vm._s(_vm.__("ghana")) + " - GHS"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NGN" } }, [
                                _vm._v(_vm._s(_vm.__("nigeria")) + " - NGN"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "USD" } }, [
                                _vm._v(_vm._s(_vm.__("nigeria")) + " - USD"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ZAR" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("south_africa")) + "- ZAR"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("stripe_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "stripe_payment_method" } }, [
                        _vm._v(_vm._s(_vm.__("stripe_payments")) + " "),
                        _c("small", [
                          _vm._v(
                            "[ " +
                              _vm._s(_vm.__("enable")) +
                              " / " +
                              _vm._s(_vm.__("disable")) +
                              " ] "
                          ),
                        ]),
                      ]),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.stripe_payment_method,
                              expression:
                                "payment_method.stripe_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "stripe_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.stripe_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.stripe_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.stripe_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.stripe_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.stripe_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "stripe_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "stripe_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "stripe_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "stripe_publishable_key" } },
                            [_vm._v(_vm._s(_vm.__("stripe_publishable_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.stripe_publishable_key,
                                expression:
                                  "payment_method.stripe_publishable_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "stripe_publishable_key",
                              id: "stripe_publishable_key",
                              placeholder: "Stripe Publishable Key",
                            },
                            domProps: {
                              value: _vm.payment_method.stripe_publishable_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "stripe_publishable_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "stripe_secret_key" } }, [
                            _vm._v(_vm._s(_vm.__("stripe_secret_key"))),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.stripe_secret_key,
                                expression: "payment_method.stripe_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "stripe_secret_key",
                              id: "stripe_secret_key",
                              placeholder: "Stripe Secret Key ",
                            },
                            domProps: {
                              value: _vm.payment_method.stripe_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "stripe_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "stripe_webhook_secret_key" } },
                            [
                              _vm._v(
                                _vm._s(_vm.__("stripe_webhook_secret_key"))
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.stripe_webhook_secret_key,
                                expression:
                                  "payment_method.stripe_webhook_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "stripe_webhook_secret_key",
                              id: "stripe_webhook_secret_key",
                              placeholder: "Stripe Webhook Secret Key",
                            },
                            domProps: {
                              value:
                                _vm.payment_method.stripe_webhook_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "stripe_webhook_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "stripe_webhook_url" } },
                            [
                              _vm._v(
                                _vm._s(_vm.__("payment_endpoint_url")) + " "
                              ),
                              _c("small", [
                                _vm._v(
                                  "(" +
                                    _vm._s(
                                      _vm.__(
                                        "set_this_as_url_in_your_stripe_account"
                                      )
                                    ) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.stripe_webhook_url,
                                expression: "payment_method.stripe_webhook_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "stripe_webhook_url",
                              id: "stripe_webhook_url",
                              readonly: "",
                            },
                            domProps: {
                              value: _vm.payment_method.stripe_webhook_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "stripe_webhook_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "stripe_currency_code" } },
                            [
                              _vm._v(_vm._s(_vm.__("currency_code")) + " "),
                              _c("small", [
                                _vm._v(
                                  "[ " +
                                    _vm._s(_vm.__("stripe_supported")) +
                                    "]"
                                ),
                              ]),
                              _vm._v(" "),
                              _vm._m(2),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.payment_method.stripe_currency_code,
                                  expression:
                                    "payment_method.stripe_currency_code",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "stripe_currency_code",
                                id: "stripe_currency_code",
                                required: "",
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "stripe_currency_code",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v("Select Currency Code "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "INR" } }, [
                                _vm._v(" Indian rupee "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "USD" } }, [
                                _vm._v(" United States dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AED" } }, [
                                _vm._v(" United Arab Emirates Dirham "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AFN" } }, [
                                _vm._v(" Afghan Afghani "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ALL" } }, [
                                _vm._v(" Albanian Lek "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AMD" } }, [
                                _vm._v(" Armenian Dram "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ANG" } }, [
                                _vm._v(" Netherlands Antillean Guilder "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AOA" } }, [
                                _vm._v(" Angolan Kwanza "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ARS" } }, [
                                _vm._v(" Argentine Peso"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AUD" } }, [
                                _vm._v(" Australian Dollar"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AWG" } }, [
                                _vm._v(" Aruban Florin"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "AZN" } }, [
                                _vm._v(" Azerbaijani Manat "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BAM" } }, [
                                _vm._v(" Bosnia-Herzegovina Convertible Mark "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BBD" } }, [
                                _vm._v(" Bajan dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BDT" } }, [
                                _vm._v(" Bangladeshi Taka"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BGN" } }, [
                                _vm._v(" Bulgarian Lev "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BIF" } }, [
                                _vm._v(" Burundian Franc"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BMD" } }, [
                                _vm._v(" Bermudan Dollar"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BND" } }, [
                                _vm._v(" Brunei Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BOB" } }, [
                                _vm._v(" Bolivian Boliviano "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BRL" } }, [
                                _vm._v(" Brazilian Real "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BSD" } }, [
                                _vm._v(" Bahamian Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BWP" } }, [
                                _vm._v(" Botswanan Pula "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "BZD" } }, [
                                _vm._v(" Belize Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CAD" } }, [
                                _vm._v(" Canadian Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CDF" } }, [
                                _vm._v(" Congolese Franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CHF" } }, [
                                _vm._v(" Swiss Franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CLP" } }, [
                                _vm._v(" Chilean Peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CNY" } }, [
                                _vm._v(" Chinese Yuan "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "COP" } }, [
                                _vm._v(" Colombian Peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CRC" } }, [
                                _vm._v(" Costa Rican Colón "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CVE" } }, [
                                _vm._v(" Cape Verdean Escudo "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "CZK" } }, [
                                _vm._v(" Czech Koruna "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "DJF" } }, [
                                _vm._v(" Djiboutian Franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "DKK" } }, [
                                _vm._v(" Danish Krone "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "DOP" } }, [
                                _vm._v(" Dominican Peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "DZD" } }, [
                                _vm._v(" Algerian Dinar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "EGP" } }, [
                                _vm._v(" Egyptian Pound "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ETB" } }, [
                                _vm._v(" Ethiopian Birr "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "EUR" } }, [
                                _vm._v(" Euro "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "FJD" } }, [
                                _vm._v(" Fijian Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "FKP" } }, [
                                _vm._v(" Falkland Island Pound "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GBP" } }, [
                                _vm._v(" Pound sterling "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GEL" } }, [
                                _vm._v(" Georgian Lari "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GIP" } }, [
                                _vm._v(" Gibraltar Pound "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GMD" } }, [
                                _vm._v(" Gambian dalasi "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GNF" } }, [
                                _vm._v(" Guinean Franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GTQ" } }, [
                                _vm._v(" Guatemalan Quetzal "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "GYD" } }, [
                                _vm._v(" Guyanaese Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HKD" } }, [
                                _vm._v(" Hong Kong Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HNL" } }, [
                                _vm._v(" Honduran Lempira "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HRK" } }, [
                                _vm._v(" Croatian Kuna "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HTG" } }, [
                                _vm._v(" Haitian Gourde "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "HUF" } }, [
                                _vm._v(" Hungarian Forint "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "IDR" } }, [
                                _vm._v(" Indonesian Rupiah "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ILS" } }, [
                                _vm._v(" Israeli New Shekel "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ISK" } }, [
                                _vm._v(" Icelandic Króna "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "JMD" } }, [
                                _vm._v(" Jamaican Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "JPY" } }, [
                                _vm._v(" Japanese Yen "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KES" } }, [
                                _vm._v(" Kenyan Shilling "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KGS" } }, [
                                _vm._v(" Kyrgystani Som "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KHR" } }, [
                                _vm._v(" Cambodian riel "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KMF" } }, [
                                _vm._v(" Comorian franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KRW" } }, [
                                _vm._v(" South Korean won "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KYD" } }, [
                                _vm._v(" Cayman Islands Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "KZT" } }, [
                                _vm._v(" Kazakhstani Tenge "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "LAK" } }, [
                                _vm._v(" Laotian Kip "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "LBP" } }, [
                                _vm._v(" Lebanese pound "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "LKR" } }, [
                                _vm._v(" Sri Lankan Rupee "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "LRD" } }, [
                                _vm._v(" Liberian Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "LSL" } }, [
                                _vm._v(" Lesotho loti "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MAD" } }, [
                                _vm._v(" Moroccan Dirham "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MDL" } }, [
                                _vm._v(" Moldovan Leu "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MGA" } }, [
                                _vm._v(" Malagasy Ariary "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MKD" } }, [
                                _vm._v(" Macedonian Denar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MMK" } }, [
                                _vm._v(" Myanmar Kyat "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MNT" } }, [
                                _vm._v(" Mongolian Tugrik "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MOP" } }, [
                                _vm._v(" Macanese Pataca "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MRO" } }, [
                                _vm._v(" Mauritanian Ouguiya "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MUR" } }, [
                                _vm._v(" Mauritian Rupee"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MVR" } }, [
                                _vm._v(" Maldivian Rufiyaa "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MWK" } }, [
                                _vm._v(" Malawian Kwacha "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MXN" } }, [
                                _vm._v(" Mexican Peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MYR" } }, [
                                _vm._v(" Malaysian Ringgit "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "MZN" } }, [
                                _vm._v(" Mozambican metical "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NAD" } }, [
                                _vm._v(" Namibian dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NGN" } }, [
                                _vm._v(" Nigerian Naira "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NIO" } }, [
                                _vm._v(" Nicaraguan Córdoba "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NOK" } }, [
                                _vm._v(" Norwegian Krone "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NPR" } }, [
                                _vm._v(" Nepalese Rupee "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "NZD" } }, [
                                _vm._v(" New Zealand Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PAB" } }, [
                                _vm._v(" Panamanian Balboa "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PEN" } }, [
                                _vm._v(" Sol "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PGK" } }, [
                                _vm._v(" Papua New Guinean Kina "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PHP" } }, [
                                _vm._v(" Philippine peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PKR" } }, [
                                _vm._v(" Pakistani Rupee "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PLN" } }, [
                                _vm._v(" Poland złoty "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PYG" } }, [
                                _vm._v(" Paraguayan Guarani "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "QAR" } }, [
                                _vm._v(" Qatari Rial "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "RON" } }, [
                                _vm._v(" Romanian Leu "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "RSD" } }, [
                                _vm._v(" Serbian Dinar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "RUB" } }, [
                                _vm._v(" Russian Ruble "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "RWF" } }, [
                                _vm._v(" Rwandan franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SAR" } }, [
                                _vm._v(" Saudi Riyal "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SBD" } }, [
                                _vm._v(" Solomon Islands Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SCR" } }, [
                                _vm._v(" Seychellois Rupee "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SEK" } }, [
                                _vm._v(" Swedish Krona "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SGD" } }, [
                                _vm._v(" Singapore Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SHP" } }, [
                                _vm._v(" Saint Helenian Pound "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SLL" } }, [
                                _vm._v(" Sierra Leonean Leone "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SOS" } }, [
                                _vm._v(" Somali Shilling "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SRD" } }, [
                                _vm._v(" Surinamese Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "STD" } }, [
                                _vm._v(" Sao Tome Dobra "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "SZL" } }, [
                                _vm._v(" Swazi Lilangeni "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "THB" } }, [
                                _vm._v(" Thai Baht "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TJS" } }, [
                                _vm._v(" Tajikistani Somoni "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TOP" } }, [
                                _vm._v(" Tongan Paʻanga "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TRY" } }, [
                                _vm._v(" Turkish lira "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TTD" } }, [
                                _vm._v(" Trinidad & Tobago Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TWD" } }, [
                                _vm._v(" New Taiwan dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "TZS" } }, [
                                _vm._v(" Tanzanian Shilling "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "UAH" } }, [
                                _vm._v(" Ukrainian hryvnia "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "UGX" } }, [
                                _vm._v(" Ugandan Shilling "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "UYU" } }, [
                                _vm._v(" Uruguayan Peso "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "UZS" } }, [
                                _vm._v(" Uzbekistani Som "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "VND" } }, [
                                _vm._v(" Vietnamese dong "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "VUV" } }, [
                                _vm._v(" Vanuatu Vatu "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "WST" } }, [
                                _vm._v(" Samoa Tala"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "XAF" } }, [
                                _vm._v(" Central African CFA franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "XCD" } }, [
                                _vm._v(" East Caribbean Dollar "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "XOF" } }, [
                                _vm._v(" West African CFA franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "XPF" } }, [
                                _vm._v(" CFP Franc "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "YER" } }, [
                                _vm._v(" Yemeni Rial "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ZAR" } }, [
                                _vm._v(" South African Rand "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "ZMW" } }, [
                                _vm._v(" Zambian Kwacha "),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.stripe_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "stripe_mode" } }, [
                            _vm._v(" " + _vm._s(_vm.__("mode")) + " "),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.stripe_mode,
                                  expression: "payment_method.stripe_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "stripe_mode",
                                id: "stripe_mode",
                                required:
                                  _vm.payment_method.stripe_payment_method == 1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "stripe_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode")) + " "),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (" +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (" +
                                    _vm._s(_vm.__("live")) +
                                    " )"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("paytm_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "paytm_payment_method" } }, [
                        _vm._v(_vm._s(_vm.__("paytm_payments"))),
                        _c("small", [
                          _vm._v(
                            "[ " +
                              _vm._s(_vm.__("enable")) +
                              " / " +
                              _vm._s(_vm.__("disable")) +
                              " ] "
                          ),
                        ]),
                      ]),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.paytm_payment_method,
                              expression: "payment_method.paytm_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "paytm_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.paytm_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.paytm_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.paytm_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.paytm_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.payment_method.paytm_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paytm_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paytm_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytm_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.paytm_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "paytm_mode" } }, [
                            _vm._v(_vm._s(_vm.__("paytm_payment_mode")) + " "),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.paytm_mode,
                                  expression: "payment_method.paytm_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "paytm_mode",
                                id: "paytm_mode",
                                required:
                                  _vm.payment_method.paytm_payment_method == 1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "paytm_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("select_paytm_payment_mode"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (  " +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (  " +
                                    _vm._s(_vm.__("live")) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paytm_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paytm_merchant_key" } },
                            [_vm._v(_vm._s(_vm.__("merchant_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paytm_merchant_key,
                                expression: "payment_method.paytm_merchant_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paytm_merchant_key",
                              id: "paytm_merchant_key",
                              placeholder: "Paytm Merchant Key",
                            },
                            domProps: {
                              value: _vm.payment_method.paytm_merchant_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytm_merchant_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paytm_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "paytm_merchant_id" } }, [
                            _vm._v(_vm._s(_vm.__("merchant_id"))),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paytm_merchant_id,
                                expression: "payment_method.paytm_merchant_id",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paytm_merchant_id",
                              id: "paytm_merchant_id",
                              placeholder: "Paytm Merchant ID",
                            },
                            domProps: {
                              value: _vm.payment_method.paytm_merchant_id,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytm_merchant_id",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("midtrans_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "midtrans_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("midtrans_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.midtrans_payment_method,
                              expression:
                                "payment_method.midtrans_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "midtrans_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.midtrans_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.midtrans_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.midtrans_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.midtrans_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.midtrans_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "midtrans_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "midtrans_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "midtrans_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.midtrans_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "midtrans_mode" } }, [
                            _vm._v(
                              _vm._s(_vm.__("midtrans_payment_mode")) + " "
                            ),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.midtrans_mode,
                                  expression: "payment_method.midtrans_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "midtrans_mode",
                                id: "midtrans_mode",
                                required:
                                  _vm.payment_method.midtrans_payment_method ==
                                  1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "midtrans_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (  " +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (  " +
                                    _vm._s(_vm.__("live")) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.midtrans_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "midtrans_server_key" } },
                            [_vm._v(_vm._s(_vm.__("server_key")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.midtrans_server_key,
                                expression:
                                  "payment_method.midtrans_server_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "midtrans_server_key",
                              id: "midtrans_server_key",
                              placeholder: "Midtrans Server Key",
                            },
                            domProps: {
                              value: _vm.payment_method.midtrans_server_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "midtrans_server_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.midtrans_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paypal_notification_url" } },
                            [
                              _vm._v(_vm._s(_vm.__("notification_url")) + " "),
                              _c("small", [
                                _vm._v(_vm._s(_vm.__("set_webhook_url"))),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.midtrans_notification_url,
                                expression:
                                  "payment_method.midtrans_notification_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "midtrans_notification_url",
                              placeholder: "Midtrans Webhook URL",
                              disabled: "",
                            },
                            domProps: {
                              value:
                                _vm.payment_method.midtrans_notification_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "midtrans_notification_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.midtrans_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "midtrans_return_url" } },
                            [
                              _vm._v(_vm._s(_vm.__("return_url")) + " "),
                              _c("small", [
                                _vm._v(_vm._s(_vm.__("set_webhook_url"))),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.midtrans_return_url,
                                expression:
                                  "payment_method.midtrans_return_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "midtrans_return_url",
                              placeholder: "Midtrans Return URL",
                              disabled: "",
                            },
                            domProps: {
                              value: _vm.payment_method.midtrans_return_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "midtrans_return_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("small", [
                            _vm._v(_vm._s(_vm.__("set_website_url"))),
                          ]),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("phonepay_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "phonepay_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("phonepay_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.phonepay_payment_method,
                              expression:
                                "payment_method.phonepay_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "phonepay_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.phonepay_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.phonepay_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.phonepay_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.phonepay_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.phonepay_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "phonepay_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "phonepay_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "phonepay_mode" } }, [
                            _vm._v(
                              _vm._s(_vm.__("phonepay_payment_mode")) + " "
                            ),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.phonepay_mode,
                                  expression: "payment_method.phonepay_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "phonepay_mode",
                                id: "phonepay_mode",
                                required:
                                  _vm.payment_method.phonepay_payment_method ==
                                  1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "phonepay_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (  " +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (  " +
                                    _vm._s(_vm.__("live")) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "phonepay_merchant_id" } },
                            [_vm._v(_vm._s(_vm.__("merchant_id")) + " ")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.phonepay_merchant_id,
                                expression:
                                  "payment_method.phonepay_merchant_id",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "phonepay_merchant_id",
                              placeholder: "Phonepe Merchant ID",
                            },
                            domProps: {
                              value: _vm.payment_method.phonepay_merchant_id,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_merchant_id",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "phonepay_client_id" } },
                            [_vm._v(_vm._s(_vm.__("client_id")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.phonepay_client_id,
                                expression: "payment_method.phonepay_client_id",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "phonepay_client_id",
                              id: "phonepay_client_id",
                              placeholder: "Phonepe Client ID",
                            },
                            domProps: {
                              value: _vm.payment_method.phonepay_client_id,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_client_id",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "phonepay_client_version" } },
                            [_vm._v(_vm._s(_vm.__("client_version")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.phonepay_client_version,
                                expression:
                                  "payment_method.phonepay_client_version",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "phonepay_client_version",
                              id: "phonepay_client_version",
                              placeholder: "Phonepe Client Version",
                            },
                            domProps: {
                              value: _vm.payment_method.phonepay_client_version,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_client_version",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "phonepay_client_secret" } },
                            [_vm._v(_vm._s(_vm.__("client_secret")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.phonepay_client_secret,
                                expression:
                                  "payment_method.phonepay_client_secret",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "phonepay_client_secret",
                              id: "phonepay_client_secret",
                              placeholder: "Phonepe Client Secret",
                            },
                            domProps: {
                              value: _vm.payment_method.phonepay_client_secret,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_client_secret",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.phonepay_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "phonepay_payment_endpoint_url" } },
                            [
                              _vm._v(
                                _vm._s(_vm.__("payment_endpoint_url")) + " "
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method
                                    .phonepay_payment_endpoint_url,
                                expression:
                                  "payment_method.phonepay_payment_endpoint_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "phonepay_payment_endpoint_url",
                              placeholder: "Phonepe Payment Endpoint URL",
                            },
                            domProps: {
                              value:
                                _vm.payment_method
                                  .phonepay_payment_endpoint_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "phonepay_payment_endpoint_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("cashfree_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "phonepay_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("cashfree_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.cashfree_payment_method,
                              expression:
                                "payment_method.cashfree_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "cashfree_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.cashfree_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.cashfree_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.cashfree_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.cashfree_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.cashfree_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "cashfree_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "cashfree_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "cashfree_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.cashfree_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "cashfree_mode" } }, [
                            _vm._v(
                              _vm._s(_vm.__("cashfree_payment_mode")) + " "
                            ),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.cashfree_mode,
                                  expression: "payment_method.cashfree_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "cashfree_mode",
                                id: "cashfree_mode",
                                required:
                                  _vm.payment_method.cashfree_payment_method ==
                                  1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "cashfree_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (  " +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (  " +
                                    _vm._s(_vm.__("live")) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.cashfree_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "cashfree_app_id" } }, [
                            _vm._v(_vm._s(_vm.__("app_id"))),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.cashfree_app_id,
                                expression: "payment_method.cashfree_app_id",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "cashfree_app_id",
                              id: "cashfree_app_id",
                              placeholder: "Cashfree APP ID",
                            },
                            domProps: {
                              value: _vm.payment_method.cashfree_app_id,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "cashfree_app_id",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.cashfree_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "cashfree_secret_key" } },
                            [_vm._v(_vm._s(_vm.__("secret_key")) + " ")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.cashfree_secret_key,
                                expression:
                                  "payment_method.cashfree_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "cashfree_secret_key",
                              placeholder: "Cashfree Secret Key",
                            },
                            domProps: {
                              value: _vm.payment_method.cashfree_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "cashfree_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.cashfree_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "cashfree_notification_url" } },
                            [
                              _vm._v(_vm._s(_vm.__("notification_url")) + " "),
                              _c("small", [
                                _vm._v(
                                  _vm._s(_vm.__("set_webhook_url_for_cashfree"))
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.cashfree_notification_url,
                                expression:
                                  "payment_method.cashfree_notification_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "cashfree_notification_url",
                              placeholder: "Cashfree Webhook URL",
                              disabled: "",
                            },
                            domProps: {
                              value:
                                _vm.payment_method.cashfree_notification_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "cashfree_notification_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-6 mb-4" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", { staticClass: "card-title" }, [
                      _vm._v(_vm._s(_vm.__("paytabs_payments"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "paytabs_payment_method" } },
                        [
                          _vm._v(_vm._s(_vm.__("paytabs_payments"))),
                          _c("small", [
                            _vm._v(
                              "[ " +
                                _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " ] "
                            ),
                          ]),
                        ]
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-check form-switch" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.payment_method.paytabs_payment_method,
                              expression:
                                "payment_method.paytabs_payment_method",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            id: "paytabs_payment_method",
                            type: "checkbox",
                            "true-value": "1",
                            "false-value": "0",
                          },
                          domProps: {
                            checked: _vm.payment_method.paytabs_payment_method,
                            checked: Array.isArray(
                              _vm.payment_method.paytabs_payment_method
                            )
                              ? _vm._i(
                                  _vm.payment_method.paytabs_payment_method,
                                  null
                                ) > -1
                              : _vm._q(
                                  _vm.payment_method.paytabs_payment_method,
                                  "1"
                                ),
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.payment_method.paytabs_payment_method,
                                $$el = $event.target,
                                $$c = $$el.checked ? "1" : "0"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paytabs_payment_method",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.payment_method,
                                      "paytabs_payment_method",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytabs_payment_method",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.payment_method.paytabs_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "paytabs_mode" } }, [
                            _vm._v(
                              _vm._s(_vm.__("paytabs_payment_mode")) + " "
                            ),
                            _c("small", [
                              _vm._v(
                                "[ " +
                                  _vm._s(_vm.__("sandbox")) +
                                  " / " +
                                  _vm._s(_vm.__("live")) +
                                  " ]"
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.payment_method.paytabs_mode,
                                  expression: "payment_method.paytabs_mode",
                                },
                              ],
                              staticClass: "form-control form-select",
                              attrs: {
                                name: "paytabs_mode",
                                id: "paytabs_mode",
                                required:
                                  _vm.payment_method.paytabs_payment_method ==
                                  1,
                              },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.payment_method,
                                    "paytabs_mode",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v(_vm._s(_vm.__("select_mode"))),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "sandbox" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("sandbox")) +
                                    " (  " +
                                    _vm._s(_vm.__("testing")) +
                                    ")"
                                ),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "production" } }, [
                                _vm._v(
                                  _vm._s(_vm.__("production")) +
                                    " (  " +
                                    _vm._s(_vm.__("live")) +
                                    ")"
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paytabs_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paytabs_profile_id" } },
                            [_vm._v(_vm._s(_vm.__("profile_id")))]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paytabs_profile_id,
                                expression: "payment_method.paytabs_profile_id",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paytabs_profile_id",
                              id: "paytabs_profile_id",
                              placeholder: "Paytabs Profile ID",
                            },
                            domProps: {
                              value: _vm.payment_method.paytabs_profile_id,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytabs_profile_id",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paytabs_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paytabs_secret_key" } },
                            [_vm._v(_vm._s(_vm.__("secret_key")) + " ")]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.payment_method.paytabs_secret_key,
                                expression: "payment_method.paytabs_secret_key",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paytabs_secret_key",
                              placeholder: "Paytabs Secret Key",
                            },
                            domProps: {
                              value: _vm.payment_method.paytabs_secret_key,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytabs_secret_key",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.payment_method.paytabs_payment_method == 1
                      ? _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "paytabs_notification_url" } },
                            [
                              _vm._v(_vm._s(_vm.__("notification_url")) + " "),
                              _c("small", [
                                _vm._v(
                                  _vm._s(_vm.__("set_webhook_url_for_paytabs"))
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value:
                                  _vm.payment_method.paytabs_notification_url,
                                expression:
                                  "payment_method.paytabs_notification_url",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "paytabs_notification_url",
                              placeholder: "Paytabs Webhook URL",
                              disabled: "",
                            },
                            domProps: {
                              value:
                                _vm.payment_method.paytabs_notification_url,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.payment_method,
                                  "paytabs_notification_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _vm.$can("manage_payment_methods")
                    ? _c(
                        "b-button",
                        {
                          attrs: {
                            type: "submit",
                            id: "btn_update",
                            variant: "primary",
                            disabled: _vm.isLoading,
                          },
                        },
                        [
                          _vm._v(
                            " " +
                              _vm._s(_vm.__("update")) +
                              "\n                            "
                          ),
                          _vm.isLoading
                            ? _c("b-spinner", {
                                attrs: { small: "", label: "Spinning" },
                              })
                            : _vm._e(),
                        ],
                        1
                      )
                    : _vm._e(),
                ],
                1
              ),
            ]),
          ]
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        attrs: {
          href: "https://developer.paypal.com/docs/api/reference/currency-codes/",
          target: "_BLANK",
        },
      },
      [_c("i", { staticClass: "fa fa-link" })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        attrs: {
          href: "https://support.paystack.com/hc/en-us/articles/360009973779-What-currency-is-available-to-my-business-",
          target: "_BLANK",
        },
      },
      [_c("i", { staticClass: "fa fa-link" })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        attrs: { href: "https://stripe.com/docs/currencies", target: "_BLANK" },
      },
      [_c("i", { staticClass: "fa fa-link" })]
    )
  },
]
render._withStripped = true



/***/ })

}]);