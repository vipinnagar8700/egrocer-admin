"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Orders_ViewOrder_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Auth.js */ "./resources/js/Auth.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    return _defineProperty({
      login_user: _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user,
      isLoading: false,
      isLoadingDboy: false,
      isLoadingUstatus: false,
      id: null,
      order: [],
      order_items: [],
      discount_in_rupees: 0,
      whatsapp_message: "",
      order_status_id: "",
      selectedItems: [],
      select: '',
      all_select: false,
      statuses: '',
      status_id: '',
      deliveryBoys: '',
      delivery_boy_id: '',
      itemModalShow: false,
      item: '',
      userRole: ''
    }, "order", {
      order_id: '' // Replace with the actual order ID
    });
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    },
    isDeliveryBoyRoute: function isDeliveryBoyRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/delivery_boy/');
    },
    invoiceRoute: function invoiceRoute() {
      // Define route configurations based on user roles
      var routeConfig = null;
      switch (this.login_user.role.name) {
        case 'Seller':
          routeConfig = {
            name: 'SellerInvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Delivery Boy':
          routeConfig = {
            name: 'DeliveryBoyInvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Admin':
          routeConfig = {
            name: 'InvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        case 'Super Admin':
          routeConfig = {
            name: 'InvoiceOrder',
            params: {
              id: this.order.order_id
            }
          };
          break;
        default:
          // Handle any other roles or cases
          break;
      }
      return routeConfig;
    },
    viewProductRoute: function viewProductRoute() {
      // Define route configurations based on user roles
      var routeConfig = null;
      switch (this.login_user.role.name) {
        case 'Seller':
          routeConfig = {
            name: 'SellerViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Delivery Boy':
          routeConfig = {
            name: 'DeliveryBoyViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Admin':
          routeConfig = {
            name: 'ViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        case 'Super Admin':
          routeConfig = {
            name: 'ViewProduct',
            params: {
              id: this.item.product_id
            }
          };
          break;
        default:
          // Handle any other roles or cases
          break;
      }
      return routeConfig;
    }
  },
  created: function created() {
    this.id = this.$route.params.id;
    //this.record = this.$route.params.record;
    if (this.id) {
      this.getOrderStatus();
      this.getOrder();
    }
    if (this.order.discount > 0) {
      var discounted_amount = this.order.total * this.order.discount / 100;
      var final_total = this.order.total - discounted_amount;
      this.discount_in_rupees = this.order.total - final_total;
    }
  },
  methods: {
    getOrderStatus: function getOrderStatus() {
      var _this = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this.isLoading = false;
        var data = response.data;
        var statusesToRemoveIds = [7, 8];
        _this.statuses = data.data.filter(function (status) {
          return !statusesToRemoveIds.includes(status.id);
        });
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError("Something went wrong!");
        }
      });
    },
    formatDate: function formatDate(dateTime) {
      var date = new Date(dateTime);
      var day = date.getDate().toString().padStart(2, '0');
      var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
      var year = date.getFullYear();
      return "".concat(day, "-").concat(month, "-").concat(year);
    },
    getOrder: function getOrder() {
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/orders/view/' + this.id).then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        if (data.status === 1) {
          _this2.order = response.data.data.order;
          _this2.order_items = response.data.data.order_items;
          _this2.deliveryBoys = response.data.data.deliveryBoys;
          _this2.delivery_boy_id = _this2.order.delivery_boy_id != 0 && _this2.order.delivery_boy_id != "" ? _this2.order.delivery_boy_id : "";
          _this2.order_status_id = _this2.order.active_status != 0 && _this2.order.active_status != "" ? _this2.order.active_status : "";
        } else {
          _this2.showError(data.message);
          setTimeout(function () {
            _this2.$router.back();
          }, 1000);
        }
      })["catch"](function (error) {
        _this2.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError("Something went wrong!");
        }
      });
    },
    sendInfo: function sendInfo(item) {
      this.item = item;
      this.itemModalShow = true;
    },
    whatsappMessageLink: function whatsappMessageLink(country_code, mobile, user_name, order_id, item_id) {
      return "https://api.whatsapp.com/send?phone=+" + country_code + " " + mobile + "&text=Hello " + user_name + " ,Your order with ID :" + order_id + " is  " + item_id + ". Please take a note of it. If you have further queries feel free to contact us. Thank you.";
    },
    updateStatus: function updateStatus() {
      var _this3 = this;
      var vm = this;
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
          _this3.isLoadingUstatus = true;
          var postData = {
            order_id: _this3.id,
            status_id: _this3.order_status_id,
            delivery_boy_id: _this3.delivery_boy_id
          };
          axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this3.$apiUrl + '/orders/update_status', postData).then(function (response) {
            _this3.isLoadingUstatus = false;
            var data = response.data;
            if (data.status === 1) {
              //this.showSuccess(data.message);
              _this3.order_status_id = '';
              _this3.getOrder();
              _this3.showMessage("success", data.message);
              setTimeout(function () {
                vm.$swal.close();
              }, 2000);
            } else {
              vm.showError(data.message);
              vm.isLoadingUstatus = false;
            }
          })["catch"](function (error) {
            vm.isLoadingUstatus = false;
            _this3.showError("Something went wrong!");
          });
        }
      });
    },
    assignDeliveryBoy: function assignDeliveryBoy() {
      var _this4 = this;
      this.isLoadingDboy = true;
      var postData = {
        order_id: this.id,
        delivery_boy_id: this.delivery_boy_id
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/orders/assign_delivery_boy', postData).then(function (response) {
        _this4.isLoadingDboy = false;
        var data = response.data;
        if (data.status === 1) {
          _this4.delivery_boy_id = '';
          _this4.getOrder();
          _this4.showMessage("success", data.message);
          setTimeout(function () {
            vm.$swal.close();
          }, 2000);
        } else {
          _this4.showMessage("error", data.message);
          _this4.isLoadingDboy = false;
        }
      })["catch"](function (error) {
        _this4.isLoadingDboy = false;
        _this4.showError("Something went wrong!");
      });
    },
    downloadInvoice: function downloadInvoice() {
      var _this5 = this;
      this.isLoading = true;
      var postData = {
        order_id: this.id
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default()({
        url: this.$apiUrl + '/orders/invoice_download',
        method: 'post',
        responseType: 'blob',
        data: postData
      }).then(function (response) {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Invoice-No:#' + _this5.id + '.pdf');
        document.body.appendChild(fileLink);
        fileLink.click();
        _this5.isLoading = false;
      })["catch"](function (error) {
        if (error.request.statusText) {
          _this5.showError(error.request.statusText);
        } else if (error.message) {
          _this5.showError(error.message);
        } else {
          _this5.showError("Something went wrong!");
        }
        _this5.isLoading = false;
      });
    },
    allSelectCheckBox: function allSelectCheckBox() {
      var _this6 = this;
      if (this.all_select == false) {
        this.all_select = true;
        this.order_items.forEach(function (item) {
          _this6.selectedItems.push(item.id);
        });
      } else {
        this.all_select = false;
        this.selectedItems = [];
      }
    },
    selectCheckBox: function selectCheckBox() {
      var uniqueSelectedItems = _toConsumableArray(new Set(this.selectedItems));
      if (this.order_items.length === uniqueSelectedItems.length) {
        this.all_select = true;
      } else {
        this.all_select = false;
      }
    },
    updateItemsStatus: function updateItemsStatus() {
      var _this7 = this;
      var vm = this;
      var uniqueSelectedItems = _toConsumableArray(new Set(this.selectedItems));
      if (uniqueSelectedItems.length !== 0) {
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
            var ids = uniqueSelectedItems.toString();
            _this7.isLoading = true;
            var postData = {
              ids: ids,
              status_id: _this7.status_id
            };
            axios__WEBPACK_IMPORTED_MODULE_0___default().post(_this7.$apiUrl + '/orders/update_items_status', postData).then(function (response) {
              _this7.isLoading = false;
              var data = response.data;
              if (data.status === 1) {
                _this7.getOrder();
                _this7.status_id = '';
                _this7.selectedItems = [];
                _this7.all_select = false;
                _this7.showMessage("success", data.message);
                setTimeout(function () {
                  vm.$swal.close();
                }, 2000);
              } else {
                vm.showError(data.message);
                vm.isLoading = false;
              }
            })["catch"](function (error) {
              vm.isLoading = false;
              _this7.showError("Something went wrong!");
            });
          }
        });
      } else {
        this.showWarning("Select at least one record!");
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.th-width[data-v-721c2304] {\n    width: auto;\n    background: #f7f7f7;\n}\n.modal-dialog[data-v-721c2304] {\n    border-radius: 20px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=template&id=721c2304&scoped=true */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true");
/* harmony import */ var _ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=script&lang=js */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js");
/* harmony import */ var _ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "721c2304",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Orders/ViewOrder.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_style_index_0_id_721c2304_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=style&index=0&id=721c2304&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewOrder_vue_vue_type_template_id_721c2304_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewOrder.vue?vue&type=template&id=721c2304&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Orders/ViewOrder.vue?vue&type=template&id=721c2304&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "page-heading view_order" },
      [
        _c("div", { staticClass: "row" }, [
          _vm._m(0),
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
                    : _vm.isDeliveryBoyRoute
                    ? _c(
                        "li",
                        { staticClass: "breadcrumb-item" },
                        [
                          _c(
                            "router-link",
                            { attrs: { to: "/delivery_boy/" } },
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
                  _vm.isSellerRoute
                    ? _c(
                        "li",
                        { staticClass: "breadcrumb-item" },
                        [
                          _c(
                            "router-link",
                            { attrs: { to: "/seller/orders" } },
                            [_vm._v("View Order")]
                          ),
                        ],
                        1
                      )
                    : _vm.isDeliveryBoyRoute
                    ? _c(
                        "li",
                        { staticClass: "breadcrumb-item" },
                        [
                          _c(
                            "router-link",
                            { attrs: { to: "/delivery_boy/orders" } },
                            [_vm._v("View Order")]
                          ),
                        ],
                        1
                      )
                    : _c(
                        "li",
                        { staticClass: "breadcrumb-item" },
                        [
                          _c("router-link", { attrs: { to: "/orders" } }, [
                            _vm._v("View Order"),
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
                        "\n                                Order Details\n                            "
                      ),
                    ]
                  ),
                ]),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _vm.order
          ? _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-6" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("table", { staticClass: "table table-bordered" }, [
                      _c("tbody", [
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Order Id"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.order_id))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Email"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.user_email))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("O. Note"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.order_note))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Status"),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              "\n                                            " +
                                _vm._s(_vm.order.status_name) +
                                "\n                                        "
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Name"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.user_name))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Contact"),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(
                                _vm._f("mobileMask")(_vm.order.user_mobile)
                              )
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Area"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.address))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Pincode"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.pincode))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Delivery Boy"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "td",
                            [
                              _vm.order.delivery_boy_name
                                ? [
                                    _vm._v(
                                      "\n                                                " +
                                        _vm._s(_vm.order.delivery_boy_name) +
                                        "\n                                            "
                                    ),
                                  ]
                                : [
                                    _vm._v(
                                      "\n                                                Not Assign\n                                            "
                                    ),
                                  ],
                            ],
                            2
                          ),
                        ]),
                        _vm._v(" "),
                        this.$roleDeliveryBoy !== this.login_user.role.name
                          ? _c("tr", [
                              _c("th", { staticClass: "th-width" }, [
                                _vm._v("Assign Delivery Boy"),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "form",
                                  {
                                    ref: "my-form",
                                    staticClass: "row g-3 align-items-center",
                                    on: {
                                      submit: function ($event) {
                                        $event.preventDefault()
                                        return _vm.assignDeliveryBoy.apply(
                                          null,
                                          arguments
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c("div", { staticClass: "input-group" }, [
                                      _c(
                                        "label",
                                        {
                                          staticClass: "visually-hidden",
                                          attrs: { for: "delivery_boy_id" },
                                        },
                                        [_vm._v("Delivery Boy")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.delivery_boy_id,
                                              expression: "delivery_boy_id",
                                            },
                                          ],
                                          staticClass:
                                            "form-control form-select",
                                          attrs: {
                                            id: "delivery_boy_id",
                                            name: "status",
                                          },
                                          on: {
                                            change: function ($event) {
                                              var $$selectedVal =
                                                Array.prototype.filter
                                                  .call(
                                                    $event.target.options,
                                                    function (o) {
                                                      return o.selected
                                                    }
                                                  )
                                                  .map(function (o) {
                                                    var val =
                                                      "_value" in o
                                                        ? o._value
                                                        : o.value
                                                    return val
                                                  })
                                              _vm.delivery_boy_id = $event
                                                .target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            },
                                          },
                                        },
                                        [
                                          _c(
                                            "option",
                                            { attrs: { value: "" } },
                                            [_vm._v("Select Delivery Boy")]
                                          ),
                                          _vm._v(" "),
                                          _vm._l(
                                            _vm.deliveryBoys,
                                            function (boy) {
                                              return _c(
                                                "option",
                                                { domProps: { value: boy.id } },
                                                [_vm._v(_vm._s(boy.name))]
                                              )
                                            }
                                          ),
                                        ],
                                        2
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "input-group-append" },
                                        [
                                          _c(
                                            "button",
                                            {
                                              staticClass: "btn btn-primary",
                                              attrs: {
                                                type: "submit",
                                                disabled:
                                                  _vm.delivery_boy_id === "" ||
                                                  _vm.isLoadingDboy,
                                              },
                                            },
                                            [
                                              _vm.isLoadingDboy
                                                ? [
                                                    _c("b-spinner", {
                                                      attrs: {
                                                        small: "",
                                                        label: "Spinning",
                                                      },
                                                    }),
                                                  ]
                                                : _vm._e(),
                                              _vm._v(" Update "),
                                            ],
                                            2
                                          ),
                                        ]
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Update Status"),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c(
                              "form",
                              {
                                ref: "my-form",
                                staticClass: "row g-3 align-items-center",
                                on: {
                                  submit: function ($event) {
                                    $event.preventDefault()
                                    return _vm.updateStatus.apply(
                                      null,
                                      arguments
                                    )
                                  },
                                },
                              },
                              [
                                _c("div", { staticClass: "input-group" }, [
                                  _c(
                                    "label",
                                    {
                                      staticClass: "visually-hidden",
                                      attrs: { for: "status" },
                                    },
                                    [_vm._v("Status")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.order_status_id,
                                          expression: "order_status_id",
                                        },
                                      ],
                                      staticClass: "form-control form-select",
                                      attrs: { id: "status", name: "status" },
                                      on: {
                                        change: function ($event) {
                                          var $$selectedVal =
                                            Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function (o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function (o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                          _vm.order_status_id = $event.target
                                            .multiple
                                            ? $$selectedVal
                                            : $$selectedVal[0]
                                        },
                                      },
                                    },
                                    [
                                      _c("option", { attrs: { value: "" } }, [
                                        _vm._v("Select Order Status"),
                                      ]),
                                      _vm._v(" "),
                                      _vm._l(_vm.statuses, function (status) {
                                        return _c(
                                          "option",
                                          { domProps: { value: status.id } },
                                          [_vm._v(_vm._s(status.status))]
                                        )
                                      }),
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "input-group-append" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "btn btn-primary",
                                          attrs: {
                                            type: "submit",
                                            disabled:
                                              _vm.order_status_id === "" ||
                                              _vm.isLoadingUstatus,
                                          },
                                        },
                                        [
                                          _vm.isLoadingUstatus
                                            ? [
                                                _c("b-spinner", {
                                                  attrs: {
                                                    small: "",
                                                    label: "Spinning",
                                                  },
                                                }),
                                              ]
                                            : _vm._e(),
                                          _vm._v(" Update "),
                                        ],
                                        2
                                      ),
                                    ]
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
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-6" }, [
                _c("div", { staticClass: "card h-100" }, [
                  _c("div", { staticClass: "card-header" }, [
                    _c("h4", [_vm._v("Billing Details")]),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "pull-right" },
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
                            staticClass: "btn btn-secondary btn-sm",
                            attrs: {
                              title: "Download Invoice",
                              disabled: _vm.isLoading,
                            },
                            on: { click: _vm.downloadInvoice },
                          },
                          [
                            _vm.isLoading
                              ? [
                                  _c("b-spinner", {
                                    attrs: { small: "", label: "Spinning" },
                                  }),
                                  _vm._v(
                                    " Downloading...\n                                    "
                                  ),
                                ]
                              : [
                                  _c("i", { staticClass: "fa fa-download" }),
                                  _vm._v(
                                    " Download Invoice\n                                    "
                                  ),
                                ],
                          ],
                          2
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
                            staticClass: "btn btn-primary btn-sm",
                            attrs: {
                              to: _vm.invoiceRoute,
                              title: "Generate Invoice",
                            },
                          },
                          [
                            _c("i", {
                              staticClass: "fa fa-file",
                              attrs: { "aria-hidden": "true" },
                            }),
                            _vm._v(
                              " Generate Invoice\n                                "
                            ),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body" }, [
                    _c("table", { staticClass: "table table-bordered" }, [
                      _c("tbody", [
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Order Date"),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              " " +
                                _vm._s(
                                  _vm.formatDate(_vm.order.orders_created_at)
                                )
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Address"),
                          ]),
                          _vm._v(" "),
                          _c("td", { attrs: { colspan: "3" } }, [
                            _vm._v(_vm._s(_vm.order.order_address)),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Delivery Time"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.delivery_time))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Total (" + _vm._s(_vm.$currency) + ")"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.total))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Disc. " + _vm._s(_vm.$currency) + "( % )"),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(
                                _vm.discount_in_rupees +
                                  " ( " +
                                  _vm.order.discount +
                                  "% )"
                              )
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v(
                              "Wallet Used (" + _vm._s(_vm.$currency) + ")"
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.wallet_balance))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v(
                              "Promo Disc. (" + _vm._s(_vm.$currency) + ")"
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.promo_discount))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Promo Code"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.promo_code))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("D.Charge (" + _vm._s(_vm.$currency) + ")"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.delivery_charge))]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v(
                              "Payable Total( " + _vm._s(_vm.$currency) + " )"
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _c("input", {
                              staticClass: "form-control",
                              attrs: {
                                type: "number",
                                name: "final_total",
                                disabled: "",
                              },
                              domProps: { value: _vm.order.final_total },
                            }),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("tr", [
                          _c("th", { staticClass: "th-width" }, [
                            _vm._v("Payment Method"),
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(_vm.order.payment_method))]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-12 col-md-12 mt-4" }, [
                _c("h4", [_vm._v("List of Order Items")]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "row" },
                  _vm._l(_vm.order_items, function (item) {
                    return _c(
                      "div",
                      { key: item.id, staticClass: "col-md-4" },
                      [
                        _c("div", { staticClass: "card position-relative" }, [
                          item.active_status == 7
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "badge bg-danger position-absolute",
                                  staticStyle: { top: "10px", right: "10px" },
                                },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(item.status_name) +
                                      "\n                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "card-body" }, [
                            _c("b", [_vm._v("Name :- ")]),
                            _vm._v(
                              _vm._s(
                                item.product_name +
                                  " (" +
                                  item.variant_name +
                                  ")"
                              ) + "\n                    "
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("b", [_vm._v("Quantity :- ")]),
                            _vm._v(
                              _vm._s(item.quantity) + "\n                    "
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("b", [_vm._v("Variant :- ")]),
                            _vm._v(
                              _vm._s(item.variant_name) +
                                "\n                    "
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("b", [
                              _vm._v(
                                "Subtotal( " + _vm._s(_vm.$currency) + " ) :- "
                              ),
                            ]),
                            _vm._v(
                              _vm._s(item.sub_total) + "\n                    "
                            ),
                            _c("br"),
                            _vm._v(" "),
                            _c("b", [_vm._v("Status :- ")]),
                            _vm._v(
                              _vm._s(item.status_name) +
                                "\n                    "
                            ),
                            _c("br"),
                            _vm._v(" "),
                            item.active_status == 7
                              ? _c("span", [
                                  _c("b", [_vm._v("Reason :- ")]),
                                  _vm._v(_vm._s(item.cancellation_reason)),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("div", { staticClass: "row mt-3" }, [
                              _c(
                                "div",
                                { staticClass: "col-6" },
                                [
                                  _c(
                                    "b-button",
                                    {
                                      directives: [
                                        {
                                          name: "b-tooltip",
                                          rawName: "v-b-tooltip.hover",
                                          modifiers: { hover: true },
                                        },
                                      ],
                                      staticClass: "btn btn-block btn-primary",
                                      attrs: { title: "View Item Details" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.sendInfo(item)
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        "\n                                View Item Details\n                            "
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm.isSellerRoute
                                ? _c(
                                    "div",
                                    { staticClass: "col-6" },
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
                                          staticClass:
                                            "btn btn-block btn-light-primary",
                                          attrs: {
                                            to: {
                                              name: "SellerViewProduct",
                                              params: { id: item.product_id },
                                            },
                                            title: "View Product",
                                          },
                                        },
                                        [_vm._v("View Product")]
                                      ),
                                    ],
                                    1
                                  )
                                : _vm.isDeliveryBoyRoute
                                ? _c(
                                    "div",
                                    { staticClass: "col-6" },
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
                                          staticClass:
                                            "btn btn-block btn-light-primary",
                                          attrs: {
                                            to: {
                                              name: "DeliveryBoyViewProduct",
                                              params: { id: item.product_id },
                                            },
                                            title: "View Product",
                                          },
                                        },
                                        [_vm._v("View Product")]
                                      ),
                                    ],
                                    1
                                  )
                                : _c(
                                    "div",
                                    { staticClass: "col-6" },
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
                                          staticClass:
                                            "btn btn-block btn-light-primary",
                                          attrs: {
                                            to: {
                                              name: "ViewProduct",
                                              params: { id: item.product_id },
                                            },
                                            title: "View Product",
                                          },
                                        },
                                        [_vm._v("View Product")]
                                      ),
                                    ],
                                    1
                                  ),
                            ]),
                          ]),
                        ]),
                      ]
                    )
                  }),
                  0
                ),
              ]),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            attrs: { "hide-footer": true, title: "Order Item Details" },
            model: {
              value: _vm.itemModalShow,
              callback: function ($$v) {
                _vm.itemModalShow = $$v
              },
              expression: "itemModalShow",
            },
          },
          [
            _c("b-container", { attrs: { fluid: "" } }, [
              _c("div", { staticClass: "row" }, [
                _c("ul", { staticClass: "list-group" }, [
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("Name :- ")]),
                    _vm._v(
                      _vm._s(
                        _vm.item.product_name +
                          " (" +
                          _vm.item.variant_name +
                          ")"
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.item.active_status
                    ? _c("li", { staticClass: "list-group-item capitalize" }, [
                        _c("b", [_vm._v("Status :- ")]),
                        _vm._v(
                          _vm._s(_vm.item.status_name) +
                            "\n                            "
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "li",
                    { staticClass: "list-group-item" },
                    [
                      _c("span", [
                        _c("b", [_vm._v("Product Id :- ")]),
                        _vm._v(_vm._s(_vm.item.product_id)),
                      ]),
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
                          staticClass: "btn btn-primary btn-sm pull-right",
                          attrs: { to: _vm.viewProductRoute, title: "View" },
                        },
                        [_c("i", { staticClass: "fa fa-eye" })]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.item.seller_name
                    ? _c("li", { staticClass: "list-group-item" }, [
                        _c("b", [_vm._v("Seller Name :- ")]),
                        _vm._v(_vm._s(_vm.item.seller_name)),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("User Name :- ")]),
                    _vm._v(_vm._s(_vm.item.user_name)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("Variant Id :- ")]),
                    _vm._v(_vm._s(_vm.item.product_variant_id)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("Quantity :- ")]),
                    _vm._v(_vm._s(_vm.item.quantity)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("Price :- ")]),
                    _vm._v(_vm._s(_vm.item.price)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [
                      _vm._v(
                        "Discounted Price( " + _vm._s(_vm.$currency) + " ) :- "
                      ),
                    ]),
                    _vm._v(_vm._s(_vm.item.discounted_price)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [
                      _vm._v("Tax Amount( " + _vm._s(_vm.$currency) + " ) :- "),
                    ]),
                    _vm._v(_vm._s(_vm.item.tax_amount)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [_vm._v("Tax Percentage(%) :- ")]),
                    _vm._v(_vm._s(_vm.item.tax_percentage)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c("b", [
                      _vm._v("Subtotal( " + _vm._s(_vm.$currency) + " ) :- "),
                    ]),
                    _vm._v(_vm._s(_vm.item.sub_total)),
                  ]),
                  _vm._v(" "),
                  _c("li", { staticClass: "list-group-item" }, [
                    _c(
                      "a",
                      {
                        staticClass: " col-sm-12 btn btn-success",
                        attrs: {
                          href: _vm.whatsappMessageLink(
                            _vm.order.country_code,
                            _vm.order.mobile,
                            _vm.order.user_name,
                            _vm.order.id,
                            _vm.item.id
                          ),
                          target: "_blank",
                          title: "Send Whatsapp Notification",
                        },
                      },
                      [_c("i", { staticClass: "fab fa-whatsapp" })]
                    ),
                  ]),
                ]),
              ]),
            ]),
          ],
          1
        ),
      ],
      1
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
      _c("h3", [_vm._v("View Order")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h4", [_vm._v("Order Details")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);