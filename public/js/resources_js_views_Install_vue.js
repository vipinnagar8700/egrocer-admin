"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Install_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-form-wizard */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.js");
/* harmony import */ var vue_form_wizard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_form_wizard_dist_vue_form_wizard_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-form-wizard/dist/vue-form-wizard.min.css */ "./node_modules/vue-form-wizard/dist/vue-form-wizard.min.css");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    FormWizard: vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__.FormWizard,
    TabContent: vue_form_wizard__WEBPACK_IMPORTED_MODULE_1__.TabContent
  },
  data: function data() {
    return {
      loadingWizard: false,
      errorMsg: null,
      count: 0,
      phpSupportInfo: [],
      requirements: [],
      permissions: [],
      database: {
        database_host: '127.0.0.1',
        database_port: 3306,
        database_name: '',
        database_username: 'root',
        database_password: '',
        admin_email: '',
        admin_password: ''
      },
      showAdminPassword: false,
      purchase_code: ''
    };
  },
  mounted: function mounted() {
    if (this.loggedUser) {
      this.$router.push('/dashboard');
    }
  },
  created: function created() {
    this.getRequirements();
  },
  methods: {
    getRequirements: function getRequirements() {
      var _this = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/install/requirements').then(function (response) {
        _this.isLoading = false;
        var data = response.data.data;
        _this.phpSupportInfo = data.phpSupportInfo;
        _this.requirements = data.requirements;
        _this.permissions = data.permissions;
      })["catch"](function (error) {
        var _error$request;
        vm.isLoading = false;
        if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError("Something went wrong!");
        }
      });
    },
    onComplete: function onComplete() {},
    setLoading: function setLoading(value) {
      this.loadingWizard = value;
    },
    handleValidation: function handleValidation(isValid, tabIndex) {},
    handleErrorMessage: function handleErrorMessage(errorMsg) {
      this.errorMsg = errorMsg;
    },
    validateAsync: function validateAsync() {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        if (_this2.requirements['errors'] === true || !_this2.phpSupportInfo['supported'] || _this2.permissions['errors'] === true || _this2.permissions['permissions'][0]['permission'] === false) {
          _this2.count++;
          reject('Please Check the requirements and Try again after fixing it.');
        } else {
          _this2.count = 0;
          resolve(true);
        }
      });
    },
    onCreateDatabase: function onCreateDatabase() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this3.$apiUrl + '/install/database', _this3.database).then(function (response) {
          var data = response.data;
          if (data.status) {
            _this3.count = 0;
            resolve(true);
          } else {
            _this3.count++;
            reject(data.message);
          }
        })["catch"](function (error) {
          _this3.count++;
          reject(error.toString());
        });
      });
    },
    purchaseCode: function purchaseCode() {
      var _this4 = this;
      return new Promise(function (resolve, reject) {
        var data = {
          'purchase_code': _this4.purchase_code
        };
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this4.$apiUrl + '/install/purchase_code', data).then(function (response) {
          var data = response.data;
          if (data.status) {
            _this4.count = 0;
            resolve(true);
          } else {
            _this4.count++;
            reject(data.message);
          }
        })["catch"](function (error) {
          _this4.count++;
          reject(error.toString());
        });
      });
    },
    finish: function finish() {
      window.location.reload();
      this.$router.push({
        path: '/login'
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.auth-card[data-v-ca351768] {\n    max-width: 100% !important;\n}\nspan.error[data-v-ca351768]{\n    color:#e74c3c;\n    font-size:20px;\n    display:flex;\n    justify-content:center;\n}\na[data-v-ca351768]{\n    color: rgb(55, 162, 121);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_style_index_0_id_ca351768_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_style_index_0_id_ca351768_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_style_index_0_id_ca351768_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Install.vue":
/*!****************************************!*\
  !*** ./resources/js/views/Install.vue ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Install.vue?vue&type=template&id=ca351768&scoped=true */ "./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true");
/* harmony import */ var _Install_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Install.vue?vue&type=script&lang=js */ "./resources/js/views/Install.vue?vue&type=script&lang=js");
/* harmony import */ var _Install_vue_vue_type_style_index_0_id_ca351768_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css */ "./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Install_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ca351768",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Install.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Install.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./resources/js/views/Install.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Install.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_style_index_0_id_ca351768_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=style&index=0&id=ca351768&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Install_vue_vue_type_template_id_ca351768_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Install.vue?vue&type=template&id=ca351768&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Install.vue?vue&type=template&id=ca351768&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      staticClass: "auth",
      style: {
        backgroundImage:
          "url(" +
          _vm.$baseUrl +
          "/images/panel_login_background_img.jpg" +
          ")",
      },
    },
    [
      _c("div", { staticClass: "login-wrapper" }, [
        _c("div", { staticClass: "auth-section col-lg-6 mt-5" }, [
          _c(
            "div",
            { staticClass: "auth-card" },
            [
              _c(
                "form-wizard",
                {
                  attrs: {
                    shape: "circle",
                    color: "#37a279",
                    "error-color": "#e74c3c",
                    title: "",
                    subtitle: "",
                  },
                  on: {
                    "on-complete": _vm.onComplete,
                    "on-loading": _vm.setLoading,
                    "on-validate": _vm.handleValidation,
                    "on-error": _vm.handleErrorMessage,
                  },
                },
                [
                  _c("tab-content", { attrs: { title: "Welcome" } }, [
                    _c("div", { staticClass: "text-center" }, [
                      _c("p", { staticClass: "display-4 py-3" }, [
                        _vm._v("🙌"),
                      ]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "Thank you for choosing the eGrogcer script from WRTeam."
                        ),
                      ]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "This quick setup wizard will help you configure your new website."
                        ),
                      ]),
                      _vm._v(" "),
                      _c("p", [_vm._v("It should only take 3-5 minutes.")]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "tab-content",
                    {
                      attrs: {
                        title: "Requirements",
                        "before-change": _vm.validateAsync,
                      },
                    },
                    [
                      _vm._l(
                        _vm.requirements["requirements"],
                        function (requirement, type) {
                          return _c("table", { staticClass: "table" }, [
                            _c("thead", [
                              _c("tr", [
                                _c("th", { staticClass: "ps-2" }, [
                                  _vm._v(
                                    "PHP >= " +
                                      _vm._s(_vm.phpSupportInfo["minimum"])
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("th", { staticClass: "text-end pe-2" }, [
                                  _c("strong", [
                                    _vm._v(
                                      _vm._s(_vm.phpSupportInfo["current"])
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("i", {
                                    staticClass: "fa fa-fw",
                                    class: _vm.phpSupportInfo["supported"]
                                      ? "fa-check-circle text-success"
                                      : "fa-exclamation-circle text-danger",
                                  }),
                                ]),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "tbody",
                              _vm._l(
                                _vm.requirements["requirements"][type],
                                function (enabled, extension) {
                                  return _c(
                                    "tr",
                                    { class: enabled ? "" : "text-danger" },
                                    [
                                      _c("td", [_vm._v(_vm._s(extension))]),
                                      _vm._v(" "),
                                      _c("td", { staticClass: "text-end" }, [
                                        _c("i", {
                                          staticClass: "fa fa-fw",
                                          class: enabled
                                            ? "fa-check-circle text-success"
                                            : "fa-exclamation-circle text-danger",
                                        }),
                                      ]),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        }
                      ),
                      _vm._v(" "),
                      _c("table", { staticClass: "table" }, [
                        _c("thead", [
                          _c("tr", [
                            _c(
                              "th",
                              { staticClass: "ps-2", attrs: { colspan: "2" } },
                              [_vm._v("Permissions")]
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c(
                          "tbody",
                          [
                            _vm._l(
                              _vm.permissions["permissions"],
                              function (permission) {
                                return [
                                  permission["folder"] == ".env"
                                    ? [
                                        _c(
                                          "tr",
                                          {
                                            class: permission["permission"]
                                              ? ""
                                              : "text-danger",
                                          },
                                          [
                                            _c("td", [
                                              _c("input", {
                                                staticClass: "form-control",
                                                attrs: {
                                                  type: "text",
                                                  disabled: "",
                                                },
                                                domProps: {
                                                  value: permission["folder"],
                                                },
                                              }),
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "td",
                                              {
                                                staticClass:
                                                  "text-end align-middle",
                                              },
                                              [
                                                _c("strong", [
                                                  _vm._v(
                                                    _vm._s(
                                                      permission["permission"]
                                                        ? ""
                                                        : _vm.__(
                                                            "The file is not writable!"
                                                          )
                                                    )
                                                  ),
                                                ]),
                                                _vm._v(" "),
                                                _c("i", {
                                                  staticClass: "fa fa-fw",
                                                  class: permission[
                                                    "permission"
                                                  ]
                                                    ? "fa-check-circle text-success"
                                                    : "fa-exclamation-circle text-danger",
                                                }),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]
                                    : [
                                        _c(
                                          "tr",
                                          {
                                            class: permission["isSet"]
                                              ? ""
                                              : "text-danger",
                                          },
                                          [
                                            _c("td", [
                                              _c("input", {
                                                staticClass: "form-control",
                                                attrs: {
                                                  type: "text",
                                                  disabled: "",
                                                },
                                                domProps: {
                                                  value: permission["folder"],
                                                },
                                              }),
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "td",
                                              {
                                                staticClass:
                                                  "text-end align-middle",
                                              },
                                              [
                                                _c("strong", [
                                                  _vm._v(
                                                    _vm._s(
                                                      permission["permission"]
                                                    )
                                                  ),
                                                ]),
                                                _vm._v(" "),
                                                _c("i", {
                                                  staticClass: "fa fa-fw",
                                                  class: permission["isSet"]
                                                    ? "fa-check-circle text-success"
                                                    : "fa-exclamation-circle text-danger",
                                                }),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ],
                                ]
                              }
                            ),
                          ],
                          2
                        ),
                      ]),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c(
                    "tab-content",
                    {
                      attrs: {
                        title: "Database",
                        "before-change": _vm.onCreateDatabase,
                      },
                    },
                    [
                      _c("div", [
                        _c("p", { staticClass: "text-center" }, [
                          _vm._v(
                            "Below you should enter your database connection details. If you are not sure about these, contact your host."
                          ),
                        ]),
                        _vm._v(" "),
                        _c("form", [
                          _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "database_host" },
                                  },
                                  [
                                    _vm._v("Database Host"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.database_host,
                                      expression: "database.database_host",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "text",
                                    placeholder: "Database Host",
                                    id: "database_host",
                                    required: "",
                                  },
                                  domProps: {
                                    value: _vm.database.database_host,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "database_host",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "database_port" },
                                  },
                                  [
                                    _vm._v("Database Port"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.database_port,
                                      expression: "database.database_port",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "text",
                                    placeholder: "Database Port",
                                    id: "database_port",
                                    required: "",
                                  },
                                  domProps: {
                                    value: _vm.database.database_port,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "database_port",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "database_name" },
                                  },
                                  [
                                    _vm._v("Database Name"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.database_name,
                                      expression: "database.database_name",
                                    },
                                  ],
                                  staticClass: "form-control ",
                                  attrs: {
                                    type: "text",
                                    placeholder: "Database Name",
                                    id: "database_name",
                                    required: "",
                                  },
                                  domProps: {
                                    value: _vm.database.database_name,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "database_name",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "database_username" },
                                  },
                                  [
                                    _vm._v("Database Username"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.database_username,
                                      expression: "database.database_username",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "text",
                                    placeholder: "Database Usersname",
                                    id: "database_username",
                                    required: "",
                                  },
                                  domProps: {
                                    value: _vm.database.database_username,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "database_username",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "database_password" },
                                  },
                                  [
                                    _vm._v("Database Password"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.database_password,
                                      expression: "database.database_password",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "password",
                                    placeholder: "Database Password",
                                    id: "database_password",
                                    required: "",
                                    autocomplete: "off",
                                  },
                                  domProps: {
                                    value: _vm.database.database_password,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "database_password",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "divider" }, [
                              _c("div", { staticClass: "divider-text" }, [
                                _vm._v("Admin Details"),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "admin_email" },
                                  },
                                  [
                                    _vm._v("Admin Email"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.database.admin_email,
                                      expression: "database.admin_email",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "email",
                                    placeholder: "Admin Email",
                                    id: "admin_email",
                                    required: "",
                                  },
                                  domProps: { value: _vm.database.admin_email },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.database,
                                        "admin_email",
                                        $event.target.value
                                      )
                                    },
                                  },
                                }),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group mb-3" }, [
                                _c(
                                  "label",
                                  {
                                    staticClass: "form-label",
                                    attrs: { for: "admin_password" },
                                  },
                                  [
                                    _vm._v("Admin Password"),
                                    _c(
                                      "span",
                                      { staticClass: "text-danger text-xs" },
                                      [_vm._v("*")]
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "input-group" }, [
                                  (_vm.showAdminPassword
                                    ? "text"
                                    : "password") === "checkbox"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.database.admin_password,
                                            expression:
                                              "database.admin_password",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          placeholder: "Admin Password",
                                          name: "admin_password",
                                          id: "admin_password",
                                          required: "",
                                          autocomplete: "off",
                                          type: "checkbox",
                                        },
                                        domProps: {
                                          checked: Array.isArray(
                                            _vm.database.admin_password
                                          )
                                            ? _vm._i(
                                                _vm.database.admin_password,
                                                null
                                              ) > -1
                                            : _vm.database.admin_password,
                                        },
                                        on: {
                                          change: function ($event) {
                                            var $$a =
                                                _vm.database.admin_password,
                                              $$el = $event.target,
                                              $$c = $$el.checked ? true : false
                                            if (Array.isArray($$a)) {
                                              var $$v = null,
                                                $$i = _vm._i($$a, $$v)
                                              if ($$el.checked) {
                                                $$i < 0 &&
                                                  _vm.$set(
                                                    _vm.database,
                                                    "admin_password",
                                                    $$a.concat([$$v])
                                                  )
                                              } else {
                                                $$i > -1 &&
                                                  _vm.$set(
                                                    _vm.database,
                                                    "admin_password",
                                                    $$a
                                                      .slice(0, $$i)
                                                      .concat(
                                                        $$a.slice($$i + 1)
                                                      )
                                                  )
                                              }
                                            } else {
                                              _vm.$set(
                                                _vm.database,
                                                "admin_password",
                                                $$c
                                              )
                                            }
                                          },
                                        },
                                      })
                                    : (_vm.showAdminPassword
                                        ? "text"
                                        : "password") === "radio"
                                    ? _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.database.admin_password,
                                            expression:
                                              "database.admin_password",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          placeholder: "Admin Password",
                                          name: "admin_password",
                                          id: "admin_password",
                                          required: "",
                                          autocomplete: "off",
                                          type: "radio",
                                        },
                                        domProps: {
                                          checked: _vm._q(
                                            _vm.database.admin_password,
                                            null
                                          ),
                                        },
                                        on: {
                                          change: function ($event) {
                                            return _vm.$set(
                                              _vm.database,
                                              "admin_password",
                                              null
                                            )
                                          },
                                        },
                                      })
                                    : _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.database.admin_password,
                                            expression:
                                              "database.admin_password",
                                          },
                                        ],
                                        staticClass: "form-control",
                                        attrs: {
                                          placeholder: "Admin Password",
                                          name: "admin_password",
                                          id: "admin_password",
                                          required: "",
                                          autocomplete: "off",
                                          type: _vm.showAdminPassword
                                            ? "text"
                                            : "password",
                                        },
                                        domProps: {
                                          value: _vm.database.admin_password,
                                        },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              _vm.database,
                                              "admin_password",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "btn btn-primary font-bold",
                                      attrs: { type: "button" },
                                      on: {
                                        click: function ($event) {
                                          _vm.showAdminPassword =
                                            !_vm.showAdminPassword
                                        },
                                      },
                                    },
                                    [
                                      _vm.showAdminPassword
                                        ? _c("i", {
                                            staticClass: "fa fa-eye-slash",
                                            attrs: { "aria-hidden": "true" },
                                          })
                                        : _c("i", {
                                            staticClass: "fa fa-eye",
                                            attrs: { "aria-hidden": "true" },
                                          }),
                                    ]
                                  ),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "tab-content",
                    {
                      attrs: {
                        title: "Purchase Code",
                        "before-change": _vm.purchaseCode,
                      },
                    },
                    [
                      _c("div", { staticClass: "form-group mb-3" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label",
                            attrs: { for: "purchase_code" },
                          },
                          [
                            _vm._v("Purchase Code"),
                            _c("span", { staticClass: "text-danger text-xs" }, [
                              _vm._v("*"),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.purchase_code,
                              expression: "purchase_code",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            id: "purchase_code",
                            placeholder: "Purchase Code",
                          },
                          domProps: { value: _vm.purchase_code },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.purchase_code = $event.target.value
                            },
                          },
                        }),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "tab-content",
                    { attrs: { title: "Finish", "before-change": _vm.finish } },
                    [
                      _c("div", { staticClass: "text-center" }, [
                        _c("i", {
                          staticClass:
                            "fa fa-check-circle fa-5x text-success mx-auto my-3",
                        }),
                        _vm._v(" "),
                        _c("h1", { staticClass: "text-success my-3" }, [
                          _vm._v("Congratulations!"),
                        ]),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v(
                            "Your website is ready now. Login to your Admin dashboard to make changes and modify any of the default content to suit your needs."
                          ),
                        ]),
                        _vm._v(" "),
                        _c("p", [
                          _vm._v("Please come back and"),
                          _c(
                            "a",
                            {
                              staticClass: "text-primary",
                              attrs: {
                                href: "https://codecanyon.net/item/egrocer-online-grocery-store-ecommerce-marketplace-flutter-full-app-with-admin-panel/reviews/41423150",
                              },
                            },
                            [_vm._v(" Leave a 5-star rating ")]
                          ),
                          _vm._v(" if you are happy with this script."),
                        ]),
                        _vm._v(" "),
                        _c("small", { staticClass: "form-hint" }, [
                          _vm._v(
                            "For security reasons, the system will remove the install link automatically."
                          ),
                        ]),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.loadingWizard
                    ? _c("div", { staticClass: "loader" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.errorMsg
                    ? _c("div", [
                        _c("span", { staticClass: "error" }, [
                          _vm._v(_vm._s(_vm.errorMsg)),
                        ]),
                      ])
                    : _vm._e(),
                ],
                1
              ),
            ],
            1
          ),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);