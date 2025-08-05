"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_PrivacyPolicyDeliveryBoy_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tinymce/tinymce-vue */ "./node_modules/@tinymce/tinymce-vue/lib/es2015/main/ts/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    'editor': _tinymce_tinymce_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      policies: {
        privacy_policy_delivery_boy: "",
        terms_conditions_delivery_boy: ""
      },
      record: null
    };
  },
  created: function created() {
    this.getPrivacyPolicyDeliveryBoy();
  },
  methods: {
    getPrivacyPolicyDeliveryBoy: function getPrivacyPolicyDeliveryBoy() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/privacy_policy_delivery_boy').then(function (response) {
        _this.record = response.data.data;
        _this.record.map(function (item, index) {
          _this.policies[item.variable] = item.value;
        });
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      this.isLoading = true;
      var formData = this.policies;
      var url = this.$apiUrl + '/privacy_policy_delivery_boy/save';
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this2.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
            vm.isLoading = false;
            vm.$router.push({
              path: '/privacy_policy_delivery_boy'
            });
          }, 1000);
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
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8 */ "./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8");
/* harmony import */ var _PrivacyPolicyDeliveryBoy_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PrivacyPolicyDeliveryBoy_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__.render,
  _PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacyPolicyDeliveryBoy_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacyPolicyDeliveryBoy_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8 ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacyPolicyDeliveryBoy_vue_vue_type_template_id_2440e4c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/PrivacyPolicyDeliveryBoy.vue?vue&type=template&id=2440e4c8 ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
              _vm._v(
                _vm._s(
                  _vm.__("delivery_boy_privacy_policy_and_term_conditions")
                )
              ),
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
                        _vm._s(
                          _vm.__(
                            "delivery_boy_privacy_policy_and_term_conditions"
                          )
                        )
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
              id: "contact_us_form",
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
              _c("div", { staticClass: "card-header" }, [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.__("update_privacy_policy"))),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex justify-content-between mb-2" },
                      [
                        _c("label", [_vm._v(_vm._s(_vm.__("privacy_policy")))]),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            directives: [
                              {
                                name: "b-tooltip",
                                rawName: "v-b-tooltip.hover",
                                modifiers: { hover: true },
                              },
                            ],
                            staticClass: "btn btn-sm btn-primary",
                            attrs: {
                              href:
                                _vm.$baseUrl + "/delivery-boy-privacy-policy",
                              title: "Privacy Policy",
                              target: "_blank",
                            },
                          },
                          [_c("i", { staticClass: "fa fa-eye" })]
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("editor", {
                      attrs: {
                        placeholder: "Enter Privacy Policy",
                        init: {
                          height: 400,
                          plugins: this.$editorPlugins,
                          toolbar: this.$editorToolbar,
                          font_size_formats: this.$editorFont_size_formats,
                        },
                      },
                      model: {
                        value: _vm.policies.privacy_policy_delivery_boy,
                        callback: function ($$v) {
                          _vm.$set(
                            _vm.policies,
                            "privacy_policy_delivery_boy",
                            $$v
                          )
                        },
                        expression: "policies.privacy_policy_delivery_boy",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(_vm.__("update_term_conditions"))),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c(
                      "div",
                      { staticClass: "d-flex justify-content-between mb-2" },
                      [
                        _c("label", [
                          _vm._v(_vm._s(_vm.__("term_conditions")) + " : "),
                        ]),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            directives: [
                              {
                                name: "b-tooltip",
                                rawName: "v-b-tooltip.hover",
                                modifiers: { hover: true },
                              },
                            ],
                            staticClass: "btn btn-sm btn-primary",
                            attrs: {
                              href:
                                _vm.$baseUrl + "/delivery-boy-terms-conditions",
                              title: "Terms & Conditions",
                              target: "_blank",
                            },
                          },
                          [_c("i", { staticClass: "fa fa-eye" })]
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("editor", {
                      attrs: {
                        placeholder: "Enter Terms & Conditions",
                        init: {
                          height: 400,
                          plugins: this.$editorPlugins,
                          toolbar: this.$editorToolbar,
                          font_size_formats: this.$editorFont_size_formats,
                        },
                      },
                      model: {
                        value: _vm.policies.terms_conditions_delivery_boy,
                        callback: function ($$v) {
                          _vm.$set(
                            _vm.policies,
                            "terms_conditions_delivery_boy",
                            $$v
                          )
                        },
                        expression: "policies.terms_conditions_delivery_boy",
                      },
                    }),
                  ],
                  1
                ),
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