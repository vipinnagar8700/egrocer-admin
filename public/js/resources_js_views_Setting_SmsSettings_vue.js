"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_SmsSettings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      sms_settings: {
        sms_method_settings: 0,
        twilio_method: 0,
        twilio_sid: '',
        twilio_auth_token: '',
        twilio_phone_number: ''
      },
      record: null
    };
  },
  created: function created() {
    this.getSmsMethods();
  },
  methods: {
    getSmsMethods: function getSmsMethods() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/sms_settings').then(function (response) {
        if (response.data.data) {
          var _this$record$twilio_m, _this$record$twilio_s, _this$record$twilio_p;
          _this.record = response.data.data;
          _this.sms_settings.twilio_method = (_this$record$twilio_m = _this.record.twilio_method) !== null && _this$record$twilio_m !== void 0 ? _this$record$twilio_m : 0;
          _this.sms_settings.twilio_sid = (_this$record$twilio_s = _this.record.twilio_sid) !== null && _this$record$twilio_s !== void 0 ? _this$record$twilio_s : "";
          _this.sms_settings.twilio_auth_token = _this.record.twilio_auth_token;
          _this.sms_settings.twilio_phone_number = (_this$record$twilio_p = _this.record.twilio_phone_number) !== null && _this$record$twilio_p !== void 0 ? _this$record$twilio_p : "";
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      this.isLoading = true;
      var sms_settingsObject = this.sms_settings;
      var formData = new FormData();
      for (var key in sms_settingsObject) {
        if (sms_settingsObject[key] == false) {
          formData.append(key, 0);
        } else if (sms_settingsObject[key] == true) {
          formData.append(key, 1);
        } else {
          formData.append(key, sms_settingsObject[key]);
        }
      }
      var vm = this;
      if (this.sms_settings.twilio_method == 1) {
        var url = this.$apiUrl + '/sms_settings/save';
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
          var data = res.data;
          if (data.status === 1) {
            _this2.showMessage("success", data.message);
            setTimeout(function () {
              vm.$swal.close();
              vm.getSmsMethods();
              vm.$router.push({
                path: '/sms-settings'
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
        this.showMessage("error", "At lease one sms method is should enable");
        vm.isLoading = false;
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/SmsSettings.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Setting/SmsSettings.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmsSettings.vue?vue&type=template&id=1acac124 */ "./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124");
/* harmony import */ var _SmsSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmsSettings.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SmsSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__.render,
  _SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/SmsSettings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SmsSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SmsSettings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SmsSettings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124 ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmsSettings_vue_vue_type_template_id_1acac124__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SmsSettings.vue?vue&type=template&id=1acac124 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/SmsSettings.vue?vue&type=template&id=1acac124 ***!
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
  return _c("div", [
    _c("div", { staticClass: "page-heading" }, [
      _c("div", { staticClass: "page-title" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("sms_gateways_methods_settings")))]),
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
                    [_vm._v(_vm._s(_vm.__("sms_gateways_methods_settings")))]
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
              id: "sms_method_settings_form",
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
                      _vm._v(_vm._s(_vm.__("twilio"))),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.sms_settings.sms_method_settings,
                          expression: "sms_settings.sms_method_settings",
                        },
                      ],
                      attrs: {
                        type: "hidden",
                        id: "sms_method_settings",
                        name: "sms_method_settings",
                        required: "",
                        value: "1",
                        "aria-required": "true",
                      },
                      domProps: { value: _vm.sms_settings.sms_method_settings },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.sms_settings,
                            "sms_method_settings",
                            $event.target.value
                          )
                        },
                      },
                    }),
                    _vm._v(" "),
                    _c("div", {}, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "twilio_method" } }, [
                          _vm._v(_vm._s(_vm.__("twilio")) + " "),
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
                                value: _vm.sms_settings.twilio_method,
                                expression: "sms_settings.twilio_method",
                              },
                            ],
                            staticClass: "form-check-input",
                            attrs: {
                              id: "sms_settings",
                              type: "checkbox",
                              "true-value": "1",
                              "false-value": "0",
                            },
                            domProps: {
                              checked: _vm.sms_settings.twilio_method,
                              checked: Array.isArray(
                                _vm.sms_settings.twilio_method
                              )
                                ? _vm._i(_vm.sms_settings.twilio_method, null) >
                                  -1
                                : _vm._q(_vm.sms_settings.twilio_method, "1"),
                            },
                            on: {
                              change: function ($event) {
                                var $$a = _vm.sms_settings.twilio_method,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? "1" : "0"
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        _vm.sms_settings,
                                        "twilio_method",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        _vm.sms_settings,
                                        "twilio_method",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(
                                    _vm.sms_settings,
                                    "twilio_method",
                                    $$c
                                  )
                                }
                              },
                            },
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.sms_settings.twilio_method == 1
                        ? _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "col-md-6" }, [
                              _c("div", { staticClass: "form-group" }, [
                                _c("label", { attrs: { for: "twilio_sid" } }, [
                                  _vm._v(_vm._s(_vm.__("twilio_sid"))),
                                  _c(
                                    "span",
                                    { staticClass: "text-danger text-xs" },
                                    [_vm._v("*")]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.sms_settings.twilio_sid,
                                      expression: "sms_settings.twilio_sid",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "text",
                                    name: "twilio_sid",
                                    id: "twilio_sid",
                                    placeholder: "Enter twilio sid.",
                                  },
                                  domProps: {
                                    value: _vm.sms_settings.twilio_sid,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.sms_settings,
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
                                _c(
                                  "label",
                                  { attrs: { for: "twilio_auth_token" } },
                                  [
                                    _vm._v(_vm._s(_vm.__("twilio_auth_token"))),
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
                                      value: _vm.sms_settings.twilio_auth_token,
                                      expression:
                                        "sms_settings.twilio_auth_token",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  attrs: {
                                    type: "text",
                                    name: "authDomain",
                                    id: "authDomain",
                                    placeholder: "Enter twilio auth token.",
                                  },
                                  domProps: {
                                    value: _vm.sms_settings.twilio_auth_token,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.sms_settings,
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
                                    _vm._v(
                                      _vm._s(_vm.__("twilio_phone_number"))
                                    ),
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
                                      value:
                                        _vm.sms_settings.twilio_phone_number,
                                      expression:
                                        "sms_settings.twilio_phone_number",
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
                                    value: _vm.sms_settings.twilio_phone_number,
                                  },
                                  on: {
                                    input: function ($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.sms_settings,
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
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);