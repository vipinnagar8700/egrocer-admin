"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Sellers_ProductInfo_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      category: "",
      fields: [{
        key: 'product_variant_id',
        label: 'ID',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'product_id',
        label: 'Product ID',
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'tax_id',
        label: 'Tax ID',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'seller_name',
        label: 'Seller Name',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'name',
        label: 'Name',
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'image',
        label: 'Image',
        "class": 'text-center'
      }, {
        key: 'price',
        label: 'Price',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'discounted_price',
        label: 'D.Price',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'measurement',
        label: 'Measurement',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'stock',
        label: 'Stock',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'status',
        label: 'Availability',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'indicator',
        label: 'Indicator',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'is_approved',
        label: 'Is Approved?',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'return_status',
        label: 'Return',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'cancelable_status',
        label: 'Cancellation',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'till_status',
        label: 'Till Status',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'status',
        label: 'Status',
        "class": 'text-center',
        sortable: true
      }, {
        key: 'actions',
        label: __('actions')
      }],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      page: 1,
      isLoading: false,
      sectionStyle: 'style_1',
      max_visible_units: 12,
      max_col_in_single_row: 3,
      products: null,
      categories: null,
      type: null
    };
  },
  computed: {
    sortOptions: function sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(function (f) {
        return f.sortable;
      }).map(function (f) {
        return {
          text: f.label,
          value: f.key
        };
      });
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalRows = this.products.length;
  },
  created: function created() {
    this.type = this.$route.params.type;
    if (this.type) {
      this.getProducts();
    }
  },
  methods: {
    getProducts: function getProducts() {
      var _this = this;
      this.isLoading = true;
      var param = {
        "category": this.category,
        "type": this.type
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$sellerApiUrl + '/products/product_info', {
        params: param
      }).then(function (response) {
        _this.isLoading = false;
        _this.products = response.data.data.products;
        _this.totalRows = _this.products.length;
      });
    },
    deleteRecord: function deleteRecord(index, id) {
      var _this2 = this;
      this.$swal.fire({
        title: "Are you Sure?",
        text: "You want be able to revert this",
        confirmButtonText: "Yes, Sure",
        cancelButtonText: "Cancel",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        if (result.value) {
          _this2.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this2.$apiUrl + '/products/delete', postData).then(function (response) {
            _this2.isLoading = false;
            var data = response.data;
            _this2.products.splice(index, 1);
            _this2.showSuccess(data.message);
          });
        }
      });
    },
    updateStatusProduct: function updateStatusProduct(index, id) {
      var _this3 = this;
      this.$swal.fire({
        title: "Are you Sure?",
        text: "You want to change status.",
        confirmButtonText: "Yes, Sure",
        cancelButtonText: "Cancel",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#37a279',
        cancelButtonColor: '#d33'
      }).then(function (result) {
        if (result.value) {
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this3.$apiUrl + '/products/change', postData).then(function (response) {
            _this3.isLoading = false;
            //this.customers.splice(index, 1)
            _this3.getProducts();
            _this3.showSuccess(response.data.message);
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Sellers/ProductInfo.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/Sellers/ProductInfo.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductInfo.vue?vue&type=template&id=30331313&scoped=true */ "./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true");
/* harmony import */ var _ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductInfo.vue?vue&type=script&lang=js */ "./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "30331313",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Sellers/ProductInfo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductInfo_vue_vue_type_template_id_30331313_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductInfo.vue?vue&type=template&id=30331313&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Sellers/ProductInfo.vue?vue&type=template&id=30331313&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
            _vm.type === "sold_out"
              ? _c("h3", [_vm._v("Sold Out Products")])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "low_stock"
              ? _c("h3", [_vm._v("Low Stock Products")])
              : _vm._e(),
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
                      _c(
                        "router-link",
                        { attrs: { to: "/seller/dashboard" } },
                        [_vm._v(_vm._s(_vm.__("dashboard")))]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.type === "sold_out"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [_vm._v("Sold Out Products")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.type === "low_stock"
                    ? _c(
                        "li",
                        {
                          staticClass: "breadcrumb-item active",
                          attrs: { "aria-current": "page" },
                        },
                        [_vm._v("Low Stock Products")]
                      )
                    : _vm._e(),
                ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "section" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-header" }, [
            _vm.type === "sold_out"
              ? _c("h4", { staticClass: "card-title" }, [
                  _vm._v("Sold Out Products List"),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "low_stock"
              ? _c("h4", { staticClass: "card-title" }, [
                  _vm._v("Low Stock Products List"),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "span",
              { staticClass: "pull-right" },
              [
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { to: "/manage_products/create" },
                  },
                  [_vm._v("Add New Product")]
                ),
              ],
              1
            ),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-body" },
            [
              _c(
                "b-row",
                { staticClass: "mb-2" },
                [
                  _c("b-col", { attrs: { md: "3" } }),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "3", "offset-md": "5" } },
                    [
                      _c("h6", { staticClass: "box-title" }, [
                        _vm._v(_vm._s(_vm.__("search"))),
                      ]),
                      _vm._v(" "),
                      _c("b-form-input", {
                        attrs: {
                          id: "filter-input",
                          type: "search",
                          placeholder: _vm.__("search"),
                        },
                        model: {
                          value: _vm.filter,
                          callback: function ($$v) {
                            _vm.filter = $$v
                          },
                          expression: "filter",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { staticClass: "text-center", attrs: { md: "1" } },
                    [
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
                          attrs: { title: _vm.__("refresh") },
                          on: {
                            click: function ($event) {
                              return _vm.getProducts()
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
                    ]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "table-responsive" },
                [
                  _c("b-table", {
                    attrs: {
                      items: _vm.products,
                      fields: _vm.fields,
                      "current-page": _vm.currentPage,
                      "per-page": _vm.perPage,
                      filter: _vm.filter,
                      "filter-included-fields": _vm.filterOn,
                      "sort-by": _vm.sortBy,
                      "sort-desc": _vm.sortDesc,
                      "sort-direction": _vm.sortDirection,
                      bordered: true,
                      busy: _vm.isLoading,
                      stacked: "md",
                      "show-empty": "",
                      small: "",
                    },
                    on: {
                      "update:sortBy": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sort-by": function ($event) {
                        _vm.sortBy = $event
                      },
                      "update:sortDesc": function ($event) {
                        _vm.sortDesc = $event
                      },
                      "update:sort-desc": function ($event) {
                        _vm.sortDesc = $event
                      },
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "table-busy",
                        fn: function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "text-center text-black my-2" },
                              [
                                _c("b-spinner", {
                                  staticClass: "align-middle",
                                }),
                                _vm._v(" "),
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.__("loading")) + "..."),
                                ]),
                              ],
                              1
                            ),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "cell(seller_name)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(row.item.seller_name) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(image)",
                        fn: function (row) {
                          return [
                            row.item.image
                              ? _c("img", {
                                  attrs: {
                                    src: _vm.$storageUrl + row.item.image,
                                    height: "50",
                                  },
                                })
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(measurement)",
                        fn: function (row) {
                          return [
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  row.item.measurement +
                                    " " +
                                    row.item.short_code
                                ) +
                                "\n                            "
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(stock)",
                        fn: function (row) {
                          return [
                            row.item.is_unlimited_stock
                              ? _c("span", [_vm._v("Unlimited")])
                              : [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(row.item.stock) +
                                      " "
                                  ),
                                  row.item.stock_unit
                                    ? _c("span", [
                                        _vm._v(_vm._s(row.item.stock_unit)),
                                      ])
                                    : _vm._e(),
                                ],
                          ]
                        },
                      },
                      {
                        key: "cell(status)",
                        fn: function (row) {
                          return [
                            _c(
                              "a",
                              {
                                staticClass: "btn btn-sm",
                                on: {
                                  click: function ($event) {
                                    return _vm.updateStatusProduct(
                                      row.index,
                                      row.item.id
                                    )
                                  },
                                },
                              },
                              [
                                row.item.status == 1
                                  ? _c(
                                      "span",
                                      { staticClass: "primary-toggal" },
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-toggle-on fa-2x",
                                        }),
                                      ]
                                    )
                                  : _c("span", { staticClass: "text-danger" }, [
                                      _c("i", {
                                        staticClass: "fa fa-toggle-off fa-2x",
                                      }),
                                    ]),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(indicator)",
                        fn: function (row) {
                          return [
                            row.item.indicator === 0
                              ? _c("span", { staticClass: "badge bg-info" }, [
                                  _vm._v("None"),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.indicator === 1
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Veg")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.indicator === 2
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v("Non-Veg"),
                                ])
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(is_approved)",
                        fn: function (row) {
                          return [
                            row.item.is_approved === 1
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Approved")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.is_approved === 0
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v("Not-Approved"),
                                ])
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(return_status)",
                        fn: function (row) {
                          return [
                            row.item.return_status === 0
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v("Not-Allowed"),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.return_status === 1
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Allowed")]
                                )
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(cancelable_status)",
                        fn: function (row) {
                          return [
                            row.item.cancelable_status === 0
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v("Not-Allowed"),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.cancelable_status === 1
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Allowed")]
                                )
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(till_status)",
                        fn: function (row) {
                          return [
                            row.item.till_status == 0
                              ? _c("span", { staticClass: "badge bg-danger" }, [
                                  _vm._v("Not Applicable"),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.till_status == "received"
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Received")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.till_status == "processed"
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Processed")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.till_status == "shipped"
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Shipped")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            row.item.till_status == "delivered"
                              ? _c(
                                  "span",
                                  { staticClass: "badge bg-success" },
                                  [_vm._v("Delivered")]
                                )
                              : _vm._e(),
                          ]
                        },
                      },
                      {
                        key: "cell(actions)",
                        fn: function (row) {
                          return [
                            _c(
                              "div",
                              { staticStyle: { width: "120px" } },
                              [
                                _c(
                                  "router-link",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true },
                                      },
                                    ],
                                    staticClass: "btn btn-primary btn-sm",
                                    attrs: {
                                      to: {
                                        name: "ViewProduct",
                                        params: {
                                          id: row.item.id,
                                          record: row.item,
                                        },
                                      },
                                      title: "View",
                                    },
                                  },
                                  [_c("i", { staticClass: "fa fa-eye" })]
                                ),
                                _vm._v(" "),
                                _c(
                                  "router-link",
                                  {
                                    directives: [
                                      {
                                        name: "b-tooltip",
                                        rawName: "v-b-tooltip.hover",
                                        modifiers: { hover: true },
                                      },
                                    ],
                                    staticClass: "btn btn-success btn-sm",
                                    attrs: {
                                      to: {
                                        name: "EditProduct",
                                        params: {
                                          id: row.item.id,
                                          record: row.item,
                                        },
                                      },
                                      title: "Edit",
                                    },
                                  },
                                  [_c("i", { staticClass: "fa fa-pencil-alt" })]
                                ),
                                _vm._v(" "),
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
                                    staticClass: "btn btn-danger btn-sm",
                                    attrs: { title: "Delete" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.deleteRecord(
                                          row.index,
                                          row.item.product_variant_id
                                        )
                                      },
                                    },
                                  },
                                  [_c("i", { staticClass: "fa fa-trash" })]
                                ),
                              ],
                              1
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { staticClass: "my-1", attrs: { md: "2" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "mb-0",
                          attrs: {
                            label: _vm.__("per_page"),
                            "label-for": "per-page-select",
                            "label-align-sm": "right",
                            "label-size": "sm",
                          },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-control form-select",
                            attrs: {
                              id: "per-page-select",
                              options: _vm.pageOptions,
                              size: "sm",
                            },
                            model: {
                              value: _vm.perPage,
                              callback: function ($$v) {
                                _vm.perPage = $$v
                              },
                              expression: "perPage",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    {
                      staticClass: "my-1",
                      attrs: { md: "4", "offset-md": "6" },
                    },
                    [
                      _c("b-pagination", {
                        staticClass: "my-0",
                        attrs: {
                          "total-rows": _vm.totalRows,
                          "per-page": _vm.perPage,
                          align: "fill",
                          size: "sm",
                        },
                        model: {
                          value: _vm.currentPage,
                          callback: function ($$v) {
                            _vm.currentPage = $$v
                          },
                          expression: "currentPage",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);