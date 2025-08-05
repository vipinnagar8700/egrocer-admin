"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_AuthenticationMode_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      editorConfig: {},
      firebase: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: "",
        jsonFile: ""
      },
      record: null
    };
  },
  created: function created() {
    if (this.$isDemo != 1) {
      this.getFirebaseData();
    }
  },
  methods: {
    getFirebaseData: function getFirebaseData() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/firebase').then(function (response) {
        if (response.data.data) {
          _this.record = response.data.data;
          _this.record.map(function (item, index) {
            if (item.value === '0' || item.value === '1') {
              _this.firebase[item.variable] = item.value === '0' ? 0 : 1;
            } else {
              _this.firebase[item.variable] = item.value;
            }
          });
        }
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError(__('something_went_wrong'));
        }
      });
    },
    handleFileUpload: function handleFileUpload() {
      this.firebase.jsonFile = this.$refs.jsonFile.files[0];
      this.image_url = URL.createObjectURL(this.image);
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      this.isLoading = true;
      var object = this.firebase;
      var formData = new FormData();
      for (var key in object) {
        formData.append(key, object[key]);
      }
      var url = this.$apiUrl + '/firebase/save';
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          //this.showSuccess(data.message);
          _this2.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
            // vm.$router.push({path:'/firebase'}).catch(err => {});
            vm.$router.push({
              path: '/authentication-mode'
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
        vm.isLoading = true;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/AuthenticationMode.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/Setting/AuthenticationMode.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthenticationMode.vue?vue&type=template&id=4fb4f5d9 */ "./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9");
/* harmony import */ var _AuthenticationMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AuthenticationMode.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AuthenticationMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__.render,
  _AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/AuthenticationMode.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AuthenticationMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AuthenticationMode.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AuthenticationMode_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9 ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AuthenticationMode_vue_vue_type_template_id_4fb4f5d9__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AuthenticationMode.vue?vue&type=template&id=4fb4f5d9 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/AuthenticationMode.vue?vue&type=template&id=4fb4f5d9 ***!
  \********************************************************************************************************************************************************************************************************************************/
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
            _c("h3", [_vm._v(_vm._s(_vm.__("firebase_settings")))]),
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
                    [_vm._v(_vm._s(_vm.__("firebase_settings")))]
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
              id: "api_key_form",
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
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("h4", { staticClass: "card-title" }, [
                    _vm._v(_vm._s(_vm.__("firebase_setup_keys"))),
                  ]),
                  _vm._v(" "),
                  _c("label", [
                    _c("span", { staticClass: "text-danger text-xs" }, [
                      _vm._v("*"),
                    ]),
                    _vm._v(" " + _vm._s(_vm.__("required_fields")) + "."),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "divider" }, [
                    _c("div", { staticClass: "divider-text" }, [
                      _vm._v(_vm._s(_vm.__("firebase_setup_keys_form"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "apiKey" } }, [
                        _vm._v(_vm._s(_vm.__("apikey"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.apiKey,
                            expression: "firebase.apiKey",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "apiKey",
                          id: "apiKey",
                          placeholder: "Enter api key.",
                        },
                        domProps: { value: _vm.firebase.apiKey },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "apiKey",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "authDomain" } }, [
                        _vm._v(_vm._s(_vm.__("authdomain"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.authDomain,
                            expression: "firebase.authDomain",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "authDomain",
                          id: "authDomain",
                          placeholder: "Enter aith domain.",
                        },
                        domProps: { value: _vm.firebase.authDomain },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "authDomain",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "projectId" } }, [
                        _vm._v(_vm._s(_vm.__("projectid")) + " "),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.projectId,
                            expression: "firebase.projectId",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "projectId",
                          id: "projectId",
                          placeholder: "Enter project id.",
                        },
                        domProps: { value: _vm.firebase.projectId },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "projectId",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "storageBucket" } }, [
                        _vm._v(_vm._s(_vm.__("storagebucket"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.storageBucket,
                            expression: "firebase.storageBucket",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "storageBucket",
                          id: "storageBucket",
                          placeholder: "Enter storage bucket.",
                        },
                        domProps: { value: _vm.firebase.storageBucket },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "storageBucket",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "messagingSenderId" } }, [
                        _vm._v(" " + _vm._s(_vm.__("messagingsenderid"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.messagingSenderId,
                            expression: "firebase.messagingSenderId",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "messagingSenderId",
                          id: "messagingSenderId",
                          placeholder: "Enter messaging sender id.",
                        },
                        domProps: { value: _vm.firebase.messagingSenderId },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "messagingSenderId",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "appId" } }, [
                        _vm._v(" " + _vm._s(_vm.__("appid"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.appId,
                            expression: "firebase.appId",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "appId",
                          id: "appId",
                          placeholder: "Enter app id.",
                        },
                        domProps: { value: _vm.firebase.appId },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.firebase, "appId", $event.target.value)
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "measurementId" } }, [
                        _vm._v(_vm._s(_vm.__("measurementid"))),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.firebase.measurementId,
                            expression: "firebase.measurementId",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: "measurementId",
                          id: "measurementId",
                          placeholder: "Enter measurement id.",
                        },
                        domProps: { value: _vm.firebase.measurementId },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.firebase,
                              "measurementId",
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
                      _vm._v(_vm._s(_vm.__("firebase_json_file_upload"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-6" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "jsonFile" } }, [
                        _vm._v(_vm._s(_vm.__("firebase_json_file"))),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        ref: "jsonFile",
                        staticClass: "form-control",
                        attrs: {
                          type: "file",
                          name: "jsonFile",
                          id: "jsonFile",
                          accept: ".json",
                        },
                        on: { change: _vm.handleFileUpload },
                      }),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _vm.firebase.custom_sms_gateway_otp_based == 1
                  ? _c("div", { staticClass: "row" }, [
                      _c("h4", { staticClass: "card-title" }, [
                        _vm._v(_vm._s(_vm.__("twillio_setup"))),
                      ]),
                      _vm._v(" "),
                      _c("label", [
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                        _vm._v(" " + _vm._s(_vm.__("required_fields")) + "."),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "divider" }, [
                        _c("div", { staticClass: "divider-text" }, [
                          _vm._v(_vm._s(_vm.__("twillio_setup_form"))),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "twilio_sid" } }, [
                            _vm._v(_vm._s(_vm.__("twilio_sid"))),
                            _c("span", { staticClass: "text-danger text-xs" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.firebase.twilio_sid,
                                expression: "firebase.twilio_sid",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "twilio_sid",
                              id: "twilio_sid",
                              placeholder: "Enter twilio sid.",
                            },
                            domProps: { value: _vm.firebase.twilio_sid },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.firebase,
                                  "twilio_sid",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("div", { staticClass: "form-group" }, [
                          _c("label", { attrs: { for: "twilio_auth_token" } }, [
                            _vm._v(_vm._s(_vm.__("twilio_auth_token"))),
                            _c("span", { staticClass: "text-danger text-xs" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.firebase.twilio_auth_token,
                                expression: "firebase.twilio_auth_token",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "authDomain",
                              id: "authDomain",
                              placeholder: "Enter twilio auth token.",
                            },
                            domProps: { value: _vm.firebase.twilio_auth_token },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.firebase,
                                  "twilio_auth_token",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("div", { staticClass: "form-group" }, [
                          _c(
                            "label",
                            { attrs: { for: "twilio_phone_number" } },
                            [
                              _vm._v(_vm._s(_vm.__("twilio_phone_number"))),
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
                                value: _vm.firebase.twilio_phone_number,
                                expression: "firebase.twilio_phone_number",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              name: "twilio_phone_number",
                              id: "twilio_phone_number",
                              placeholder: "Enter twilio phone number.",
                            },
                            domProps: {
                              value: _vm.firebase.twilio_phone_number,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.firebase,
                                  "twilio_phone_number",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ]),
                      ]),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "card-footer" },
                [
                  _c(
                    "b-button",
                    {
                      attrs: {
                        type: "submit",
                        variant: "primary",
                        disabled: _vm.isLoading,
                      },
                    },
                    [
                      _vm._v(
                        _vm._s(_vm.__("update")) +
                          "\n                                "
                      ),
                      _vm.isLoading
                        ? _c("b-spinner", {
                            attrs: { small: "", label: "Spinning" },
                          })
                        : _vm._e(),
                    ],
                    1
                  ),
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
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);