"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Offers_PopupOffer_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      categories: [],
      products: [],
      popup_enabled: 0,
      popup_always_show_home: 0,
      popup_type: 'default',
      popup_type_id: "",
      image: "",
      image_url: "",
      popup_url: "",
      error: null
    };
  },
  created: function created() {
    this.getCategories();
    this.getProducts();
    this.getPopupData();
  },
  methods: {
    getPopupData: function getPopupData() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/popup').then(function (response) {
        if (response.data.data) {
          var _this$record$popup_en, _this$record$popup_al, _this$record$popup_im;
          _this.record = response.data.data;
          _this.popup_enabled = (_this$record$popup_en = _this.record.popup_enabled) !== null && _this$record$popup_en !== void 0 ? _this$record$popup_en : 0;
          _this.popup_always_show_home = (_this$record$popup_al = _this.record.popup_always_show_home) !== null && _this$record$popup_al !== void 0 ? _this$record$popup_al : 0;
          _this.popup_type = _this.record.popup_type;
          _this.popup_type_id = _this.record.popup_type_id;
          _this.popup_url = _this.record.popup_url;
          _this.image_url = (_this$record$popup_im = _this.record.popup_image) !== null && _this$record$popup_im !== void 0 ? _this$record$popup_im : "";
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
    dropFile: function dropFile(event) {
      event.preventDefault();
      this.$refs.file_image.files = event.dataTransfer.files;
      this.handleFileUpload(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    handleFileUpload: function handleFileUpload() {
      var file = this.$refs.file_image.files[0];

      // Reset previous error message
      this.error = null;

      // Check if a file was selected
      if (!file) return;

      // Perform image validation
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        this.error = "Invalid file type. Please upload a JPEG, PNG, JPG,  GIF or WEBP image.";
        return;
      }
      var maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        this.error = "File size exceeds the maximum allowed limit (2MB).";
        return;
      }

      // Create a URL for the uploaded image and display it
      this.imageUrl = URL.createObjectURL(file);
      this.image = this.$refs.file_image.files[0];
      this.image_url = URL.createObjectURL(this.image);
    },
    getCategories: function getCategories() {
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/categories/active').then(function (response) {
        _this2.isLoading = false;
        _this2.categories = response.data.data;
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(__('something_went_wrong'));
        }
        _this2.isLoading = false;
      });
    },
    getProducts: function getProducts() {
      var _this3 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/products/active').then(function (response) {
        _this3.isLoading = false;
        _this3.products = response.data.data;
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
        _this3.isLoading = false;
      });
    },
    saveRecord: function saveRecord() {
      var _this4 = this;
      this.isLoading = true;
      var formData = new FormData();
      formData.append('popup_enabled', this.popup_enabled);
      formData.append('popup_always_show_home', this.popup_always_show_home);
      formData.append('popup_type', this.popup_type);
      formData.append('popup_type_id', this.popup_type_id);
      formData.append('popup_image', this.image);
      formData.append('popup_url', this.popup_url);
      var url = this.$apiUrl + '/popup/save';
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          //this.showSuccess(data.message);
          _this4.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
            vm.$router.push({
              path: '/popup'
            });
            vm.getPopupData();
            vm.isLoading = false;
          }, 1000);
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError(__('something_went_wrong'));
        }
        vm.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Offers/PopupOffer.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/Offers/PopupOffer.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PopupOffer.vue?vue&type=template&id=77f64199 */ "./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199");
/* harmony import */ var _PopupOffer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PopupOffer.vue?vue&type=script&lang=js */ "./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PopupOffer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__.render,
  _PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Offers/PopupOffer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PopupOffer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PopupOffer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PopupOffer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199":
/*!********************************************************************************!*\
  !*** ./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PopupOffer_vue_vue_type_template_id_77f64199__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PopupOffer.vue?vue&type=template&id=77f64199 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Offers/PopupOffer.vue?vue&type=template&id=77f64199 ***!
  \***********************************************************************************************************************************************************************************************************************/
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
            _c("h3", [_vm._v(_vm._s(_vm.__("popup_offer")))]),
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
                    [_vm._v(_vm._s(_vm.__("popup_offer")))]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("section", { staticClass: "section" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 col-md-12 order-md-1 order-last" }, [
          _c(
            "form",
            {
              attrs: { method: "post", enctype: "multipart/form-data" },
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
                    _vm._v(_vm._s(_vm.__("popup_offer"))),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "pull-right" }, [
                    _c(
                      "button",
                      {
                        directives: [
                          {
                            name: "b-tooltip",
                            rawName: "v-b-tooltip.hover",
                            modifiers: { hover: true },
                          },
                        ],
                        staticClass: "btn btn-primary btn_refresh",
                        attrs: { type: "button", title: _vm.__("refresh") },
                        on: {
                          click: function ($event) {
                            return _vm.getPopupData()
                          },
                        },
                      },
                      [
                        _c("i", {
                          staticClass: "fa fa-refresh",
                          attrs: { "aria-hidden": "true" },
                        }),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "card-body" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "form-group col-md-4" }, [
                      _c(
                        "div",
                        { staticClass: "form-group" },
                        [
                          _c("label", { staticClass: "control-label" }, [
                            _vm._v(
                              " " + _vm._s(_vm.__("popup_offer_enabled_on_off"))
                            ),
                          ]),
                          _c("br"),
                          _vm._v(" "),
                          _c("b-form-radio-group", {
                            attrs: {
                              options: [
                                { text: _vm.__("ON"), value: 1 },
                                { text: _vm.__("OFF"), value: 0 },
                              ],
                              buttons: "",
                              "button-variant": "outline-primary",
                              required: "",
                            },
                            model: {
                              value: _vm.popup_enabled,
                              callback: function ($$v) {
                                _vm.popup_enabled = $$v
                              },
                              expression: "popup_enabled",
                            },
                          }),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group col-md-4" }, [
                      _c("label", [_vm._v(" " + _vm._s(_vm.__("type")))]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.popup_type,
                              expression: "popup_type",
                            },
                          ],
                          staticClass: "form-control form-select",
                          attrs: { required: "" },
                          on: {
                            change: [
                              function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.popup_type = $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              },
                              function ($event) {
                                _vm.popup_type_id = ""
                              },
                            ],
                          },
                        },
                        [
                          _c("option", { attrs: { value: "default" } }, [
                            _vm._v(" " + _vm._s(_vm.__("default"))),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "category" } }, [
                            _vm._v(" " + _vm._s(_vm.__("category"))),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "product" } }, [
                            _vm._v(" " + _vm._s(_vm.__("product"))),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "popup_url" } }, [
                            _vm._v(" " + _vm._s(_vm.__("popup_url"))),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-12" }, [
                      _vm.popup_type == "category"
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", [_vm._v("Category")]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.popup_type_id,
                                    expression: "popup_type_id",
                                  },
                                ],
                                staticClass: "form-control form-select",
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
                                    _vm.popup_type_id = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  },
                                },
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v(_vm._s(_vm.__("select_category"))),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.categories, function (category) {
                                  return _c(
                                    "option",
                                    { domProps: { value: category.id } },
                                    [_vm._v(_vm._s(category.name))]
                                  )
                                }),
                              ],
                              2
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.popup_type == "product"
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", [
                              _vm._v(" " + _vm._s(_vm.__("products"))),
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.popup_type_id,
                                    expression: "popup_type_id",
                                  },
                                ],
                                staticClass: "form-control form-select",
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
                                    _vm.popup_type_id = $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  },
                                },
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v(
                                    " " + _vm._s(_vm.__("select_product"))
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.products, function (product) {
                                  return _c(
                                    "option",
                                    { domProps: { value: product.id } },
                                    [_vm._v(_vm._s(product.name))]
                                  )
                                }),
                              ],
                              2
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.popup_type == "popup_url"
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", [_vm._v(" " + _vm._s(_vm.__("link")))]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.popup_url,
                                  expression: "popup_url",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "url", placeholder: "Enter Link" },
                              domProps: { value: _vm.popup_url },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.popup_url = $event.target.value
                                },
                              },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-12" }, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v(_vm._s(_vm.__("image")))]),
                        _vm._v(" "),
                        _c("p", { staticClass: "text-muted" }, [
                          _vm._v(
                            _vm._s(
                              _vm.__(
                                "please_choose_square_image_of_larger_than_500_500"
                              )
                            )
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.error
                          ? _c("span", { staticClass: "error" }, [
                              _vm._v(_vm._s(_vm.error)),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("input", {
                          ref: "file_image",
                          staticClass: "file-input",
                          attrs: {
                            type: "file",
                            name: "slider_image",
                            accept: "image/*",
                          },
                          on: { change: _vm.handleFileUpload },
                        }),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "file-input-div bg-gray-100",
                            on: {
                              click: function ($event) {
                                return _vm.$refs.file_image.click()
                              },
                              drop: _vm.dropFile,
                              dragover: _vm.$dragoverFile,
                              dragleave: _vm.$dragleaveFile,
                            },
                          },
                          [
                            _vm.image && _vm.image.name !== ""
                              ? [
                                  _c("label", [
                                    _vm._v(
                                      " " +
                                        _vm._s(_vm.__("selected_file_name")) +
                                        _vm._s(_vm.image.name)
                                    ),
                                  ]),
                                ]
                              : [
                                  _vm._m(0),
                                  _vm._v(" "),
                                  _c("label", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__(
                                          "drop_files_here_or_click_to_upload"
                                        )
                                      )
                                    ),
                                  ]),
                                ],
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _vm.image_url
                          ? _c("div", { staticClass: "row" }, [
                              _c("div", { staticClass: "col-md-4" }, [
                                _c("img", {
                                  staticClass: "img-thumbnail custom-image",
                                  attrs: {
                                    src: _vm.image_url,
                                    title: "Popup Offer Image",
                                    alt: "Popup Offer Image",
                                  },
                                }),
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
                          _vm._s(_vm.__("save")) + "\n                        "
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
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("i", { staticClass: "fa fa-cloud-upload-alt fa-2x" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);