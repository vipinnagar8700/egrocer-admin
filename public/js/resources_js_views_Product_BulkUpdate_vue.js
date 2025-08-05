"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Product_BulkUpdate_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isLoading: false,
      isLoadingDownload: false,
      sampleFileurl: this.$baseUrl + '/sample-file/products.csv',
      instructionsFileurl: this.$baseUrl + '/sample-file/products.txt',
      file: null
    };
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    }
  },
  created: function created() {},
  mounted: function mounted() {},
  methods: {
    handleFileUpload: function handleFileUpload() {
      this.file = this.$refs.file_csv.files[0];
    },
    downloadProductDataExcel: function downloadProductDataExcel() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        url: this.$apiUrl + '/products/download_product_data_excel',
        method: 'get',
        responseType: 'blob'
      }).then(function (response) {
        _this.isLoadingDownload = false;
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products_data.csv'); // Set the download file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError("Something went wrong!");
        }
        _this.isLoading = false;
      });
    },
    saveRecord: function saveRecord() {
      var _this2 = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      formData.append('file', this.file);
      var url = this.$apiUrl + '/products/bulk_update';
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this2.showMessage("success", data.message);
          _this2.$refs.file_csv.value = null;
          _this2.file = null;
          vm.isLoading = false;
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError("Something went wrong!");
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Product/BulkUpdate.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/Product/BulkUpdate.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BulkUpdate.vue?vue&type=template&id=23df579a */ "./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a");
/* harmony import */ var _BulkUpdate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BulkUpdate.vue?vue&type=script&lang=js */ "./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BulkUpdate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__.render,
  _BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Product/BulkUpdate.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpdate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BulkUpdate.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpdate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BulkUpdate_vue_vue_type_template_id_23df579a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BulkUpdate.vue?vue&type=template&id=23df579a */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Product/BulkUpdate.vue?vue&type=template&id=23df579a ***!
  \************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
          _c("h3", [_vm._v(_vm._s(_vm.__("bulk_update")))]),
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
                _vm.isSellerRoute
                  ? _c(
                      "li",
                      { staticClass: "breadcrumb-item" },
                      [
                        _c(
                          "router-link",
                          { attrs: { to: "/seller/dashboard" } },
                          [_vm._v(_vm._s(_vm.__("dashboard")))]
                        ),
                      ],
                      1
                    )
                  : _c(
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
                      "\n                            " +
                        _vm._s(_vm.__("bulk_update")) +
                        "\n                        "
                    ),
                  ]
                ),
              ]),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 col-md-12 order-md-1 order-last" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", [_vm._v(_vm._s(_vm.__("product_bulk_update_form")))]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _c(
                  "form",
                  {
                    ref: "my-form",
                    attrs: { method: "post", enctype: "multipart/form-data" },
                    on: {
                      submit: function ($event) {
                        $event.preventDefault()
                        return _vm.saveRecord.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("div", { staticClass: "col-md-12" }, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "upload_file" } }, [
                          _vm._v(_vm._s(_vm.__("csv_file"))),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          ref: "file_csv",
                          staticClass: "form-control",
                          attrs: {
                            type: "file",
                            name: "upload_file",
                            id: "upload_file",
                            required: "",
                            accept: ".csv",
                          },
                          on: { change: _vm.handleFileUpload },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-12" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: {
                            type: "submit",
                            id: "submit_btn",
                            name: "btnAdd",
                            disabled: _vm.isLoading,
                          },
                        },
                        [
                          !_vm.isLoading
                            ? _c("i", { staticClass: "fa fa-upload" })
                            : _vm._e(),
                          _vm._v(
                            " " +
                              _vm._s(_vm.__("update")) +
                              "\n                                        "
                          ),
                          _vm.isLoading
                            ? _c("b-spinner", {
                                attrs: { small: "", label: "Spinning" },
                              })
                            : _vm._e(),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn btn-secondary",
                          attrs: { type: "reset" },
                        },
                        [
                          _c("i", {
                            staticClass: "fa fa-undo",
                            attrs: { "aria-hidden": "true" },
                          }),
                          _vm._v(
                            " " +
                              _vm._s(_vm.__("clear")) +
                              "\n                                    "
                          ),
                        ]
                      ),
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
                          staticClass: "btn btn-info",
                          attrs: {
                            title: "Download Excel",
                            disabled: _vm.isLoadingDownload,
                          },
                          on: { click: _vm.downloadProductDataExcel },
                        },
                        [
                          _vm.isLoadingDownload
                            ? [
                                _c("b-spinner", {
                                  attrs: { small: "", label: "Spinning" },
                                }),
                                _vm._v(
                                  " Downloading...\n                                        "
                                ),
                              ]
                            : [
                                _c("i", { staticClass: "fa fa-download" }),
                                _vm._v(
                                  " " +
                                    _vm._s(
                                      _vm.__("download_product_data_file")
                                    ) +
                                    "\n                                        "
                                ),
                              ],
                        ],
                        2
                      ),
                    ]),
                  ]
                ),
              ]),
            ]),
          ]),
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
    return _c("div", { staticClass: "alert alert-info" }, [
      _c("p", [
        _vm._v(
          "Always download and use new sample file if you did updated admin panel version."
        ),
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v("Read and follow instructions carefully before proceed."),
      ]),
      _vm._v(" "),
      _c("p", [_c("b", [_vm._v("Instruction:")])]),
      _vm._v(
        "\n                            -- Download Product Data file as CSV. "
      ),
      _c("br"),
      _vm._v(
        "\n                            -- Change product name, price, stock relate information and update.\n                        "
      ),
    ])
  },
]
render._withStripped = true



/***/ })

}]);