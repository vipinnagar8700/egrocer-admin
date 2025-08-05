"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_WithdrawalRequests_WithdrawalRequests_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['record'],
  data: function data() {
    return {
      isLoading: false,
      id: this.record ? this.record.id : null,
      status: this.record ? this.record.status : "",
      receipt_image: this.record ? this.record.receipt_image : null,
      remark: this.record ? this.record.remark : "",
      amount: this.record ? this.record.amount : "",
      image: ''
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? "Edit" : "Add";
      title += " Withdrawal Request";
      return title;
    }
  },
  methods: {
    showModal: function showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal: function hideModal() {
      this.$refs['my-modal'].hide();
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
      var validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type)) {
        this.error = "Invalid file type. Please upload a JPEG, PNG, JPG.";
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
    saveRecord: function saveRecord() {
      var _this = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      if (this.id) {
        formData.append('id', this.id);
      }
      formData.append('status', this.status);
      formData.append('receipt_image', this.image);
      formData.append('remark', this.remark);
      formData.append('amount', this.amount);
      var url = this.$apiUrl + '/withdrawal_requests/save';
      if (this.id) {
        url = this.$apiUrl + '/withdrawal_requests/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this.$eventBus.$emit('withdrawalRequestSaved', data.message);
          _this.hideModal();
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
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
    }
  },
  mounted: function mounted() {
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit */ "./resources/js/views/WithdrawalRequests/Edit.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    'app-edit-record': _Edit__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: 'id',
        label: __('id'),
        sortable: true,
        sortDirection: 'desc'
      }, {
        key: 'type',
        label: __('type'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'name',
        label: __('name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'amount',
        label: __('amount'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'message',
        label: __('message'),
        sortable: true,
        "class": 'text-center',
        tdClass: 'custom-message-width'
      }, {
        key: 'status',
        label: __('status'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'remark',
        label: __('remark'),
        sortable: true,
        "class": 'text-center',
        tdClass: 'custom-message-width'
      }, {
        key: 'receipt_image',
        label: __('receipt_image'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'created_at',
        label: __('date'),
        sortable: true,
        "class": 'text-center'
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
      create_new: null,
      edit_record: null,
      withdrawalRequests: [],
      status: "",
      remark: "",
      type: ""
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
    },
    filteredWithdrawRequests: function filteredWithdrawRequests() {
      var query = this.filter ? this.filter.toLowerCase() : '';
      return this.withdrawalRequests.filter(function (request) {
        return request.type && request.type.toLowerCase().includes(query) || request.remark && request.remark.toLowerCase().includes(query);
      });
    },
    totalRowsFilter: function totalRowsFilter() {
      return this.filteredWithdrawRequests.length;
    }
  },
  mounted: function mounted() {
    // Set the initial number of items
    this.totalRows = this.withdrawalRequests.length;
  },
  created: function created() {
    var _this = this;
    this.$eventBus.$on('withdrawalRequestSaved', function (message) {
      _this.showMessage("success", message);
      _this.getRecords();
      _this.create_new = null;
    });
    this.getRecords();
  },
  methods: {
    getRecords: function getRecords() {
      var _this2 = this;
      this.isLoading = true;
      var param = {
        "type": this.type,
        "status": this.status
      };
      axios.get(this.$apiUrl + '/withdrawal_requests/get', {
        params: param
      }).then(function (response) {
        _this2.withdrawalRequests = response.data.data.withdraw_requests;
        _this2.totalRows = _this2.withdrawalRequests.length;
        _this2.isLoading = false;
      });
    },
    deleteWithdrawalRequests: function deleteWithdrawalRequests(index, id) {
      var _this3 = this;
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
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this3.$apiUrl + '/withdrawal_requests/delete', postData).then(function (response) {
            _this3.isLoading = false;
            _this3.withdrawalRequests.splice(index, 1);
            _this3.showSuccess(response.data.message);
          });
        }
      });
    },
    hideModal: function hideModal() {
      this.create_new = false;
      this.edit_record = false;
    }
  }
});

/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/Edit.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/Edit.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=22f4bdde&scoped=true */ "./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "22f4bdde",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/WithdrawalRequests/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0 */ "./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0");
/* harmony import */ var _WithdrawalRequests_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WithdrawalRequests.vue?vue&type=script&lang=js */ "./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _WithdrawalRequests_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__.render,
  _WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/WithdrawalRequests/WithdrawalRequests.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WithdrawalRequests_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WithdrawalRequests.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WithdrawalRequests_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_22f4bdde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=22f4bdde&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true");


/***/ }),

/***/ "./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0 ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WithdrawalRequests_vue_vue_type_template_id_0e6fe0e0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/Edit.vue?vue&type=template&id=22f4bdde&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      ref: "my-modal",
      attrs: { title: _vm.modal_title, "no-fade": "", static: "" },
      on: {
        hidden: function ($event) {
          return _vm.$emit("modalClose")
        },
      },
    },
    [
      _c(
        "div",
        { attrs: { slot: "modal-footer" }, slot: "modal-footer" },
        [
          _c(
            "b-button",
            {
              attrs: { variant: "primary", disabled: _vm.isLoading },
              on: {
                click: function ($event) {
                  return _vm.$refs["dummy_submit"].click()
                },
              },
            },
            [
              _vm._v("Save\n            "),
              _vm.isLoading
                ? _c("b-spinner", { attrs: { small: "", label: "Spinning" } })
                : _vm._e(),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-button",
            { attrs: { variant: "secondary" }, on: { click: _vm.hideModal } },
            [_vm._v("Cancel")]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "form",
        {
          ref: "my-form",
          attrs: { novalidate: "" },
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.saveRecord.apply(null, arguments)
            },
          },
        },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-md-12" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "status" } }, [
                  _vm._v(_vm._s(_vm.__("status"))),
                ]),
                _c("br"),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.amount,
                      expression: "amount",
                    },
                  ],
                  attrs: {
                    name: "amount",
                    id: "amount",
                    type: "number",
                    hidden: "",
                  },
                  domProps: { value: _vm.amount },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.amount = $event.target.value
                    },
                  },
                }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "form-group btn-group",
                    attrs: { id: "status" },
                  },
                  [
                    _c(
                      "label",
                      {
                        staticClass: "btn btn-warning",
                        attrs: {
                          "data-toggle-class": "btn-warning",
                          "data-toggle-passive-class": "btn-default",
                        },
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.status,
                              expression: "status",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: { type: "radio", value: "0" },
                          domProps: { checked: _vm._q(_vm.status, "0") },
                          on: {
                            change: function ($event) {
                              _vm.status = "0"
                            },
                          },
                        }),
                        _vm._v(" Pending\n                        "),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "btn btn-success",
                        attrs: {
                          "data-toggle-class": "btn-success",
                          "data-toggle-passive-class": "btn-default",
                        },
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.status,
                              expression: "status",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: { type: "radio", value: "1" },
                          domProps: { checked: _vm._q(_vm.status, "1") },
                          on: {
                            change: function ($event) {
                              _vm.status = "1"
                            },
                          },
                        }),
                        _vm._v(" Approved\n                        "),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "btn btn-danger",
                        attrs: {
                          "data-toggle-class": "btn-danger",
                          "data-toggle-passive-class": "btn-default",
                        },
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.status,
                              expression: "status",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: { type: "radio", value: "2" },
                          domProps: { checked: _vm._q(_vm.status, "2") },
                          on: {
                            change: function ($event) {
                              _vm.status = "2"
                            },
                          },
                        }),
                        _vm._v(" Rejected\n                        "),
                      ]
                    ),
                  ]
                ),
                _vm._v(" "),
                _vm.status == 1
                  ? _c("div", { staticClass: "form-group" }, [
                      _c("label", [
                        _vm._v(_vm._s(_vm.__("upload_receipt_image"))),
                      ]),
                      _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
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
                          name: "receipt_image",
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
                                    "Selected file name:- " +
                                      _vm._s(_vm.image.name)
                                  ),
                                ]),
                              ]
                            : [
                                _c("label", [
                                  _c("i", {
                                    staticClass: "fa fa-cloud-upload-alt fa-2x",
                                  }),
                                ]),
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
                                staticClass: "custom-image",
                                attrs: {
                                  src: _vm.image_url,
                                  title: "Receipt Image",
                                  alt: "Receipt Image",
                                },
                              }),
                            ]),
                          ])
                        : _vm._e(),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "remark" } }, [
                    _vm._v(_vm._s(_vm.__("remark"))),
                  ]),
                  _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.remark,
                        expression: "remark",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: { placeholder: "Enter Remark", required: "" },
                    domProps: { value: _vm.remark },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.remark = $event.target.value
                      },
                    },
                  }),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("button", {
            ref: "dummy_submit",
            staticStyle: { display: "none" },
          }),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/WithdrawalRequests/WithdrawalRequests.vue?vue&type=template&id=0e6fe0e0 ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
    [
      _c("div", { staticClass: "page-heading" }, [
        _c("div", { staticClass: "page-title" }, [
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-12 col-md-6 order-md-1 order-last" },
              [_c("h3", [_vm._v(_vm._s(_vm.__("withdrawal_requests")))])]
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-12 col-md-6 order-md-2 order-first" },
              [
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
                        [_vm._v(_vm._s(_vm.__("withdrawal_requests")))]
                      ),
                    ]),
                  ]
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("section", { staticClass: "section" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.__("withdrawal_requests"))),
              ]),
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
                    _c("b-col", { attrs: { md: "3" } }, [
                      _c("h6", { staticClass: "box-title" }, [
                        _vm._v(_vm._s(_vm.__("filter_by_role"))),
                      ]),
                      _vm._v(" "),
                      _c("form", { attrs: { method: "post" } }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.type,
                                expression: "type",
                              },
                            ],
                            staticClass: "form-control form-select",
                            on: {
                              change: [
                                function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.type = $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                },
                                function ($event) {
                                  return _vm.getRecords()
                                },
                              ],
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v(_vm._s(_vm.__("all_roles"))),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "seller" } }, [
                              _vm._v(_vm._s(_vm.__("seller"))),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "delivery_boy" } }, [
                              _vm._v(_vm._s(_vm.__("delivery_boy"))),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("b-col", { attrs: { md: "3" } }, [
                      _c("h6", { staticClass: "box-title" }, [
                        _vm._v(_vm._s(_vm.__("filter_by_status"))),
                      ]),
                      _vm._v(" "),
                      _c("form", { attrs: { method: "post" } }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.status,
                                expression: "status",
                              },
                            ],
                            staticClass: "form-control form-select",
                            on: {
                              change: [
                                function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.status = $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                },
                                function ($event) {
                                  return _vm.getRecords()
                                },
                              ],
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v(_vm._s(_vm.__("select_status"))),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v(_vm._s(_vm.__("pending"))),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "1" } }, [
                              _vm._v(_vm._s(_vm.__("approved"))),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "2" } }, [
                              _vm._v(_vm._s(_vm.__("rejected"))),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-col",
                      { attrs: { md: "3", "offset-md": "2" } },
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
                                return _vm.getRecords()
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
                _c("b-table", {
                  attrs: {
                    items: _vm.withdrawalRequests,
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
                              _c("b-spinner", { staticClass: "align-middle" }),
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
                      key: "head(amount)",
                      fn: function (row) {
                        return [
                          _vm._v(
                            "\n                            " +
                              _vm._s("Amount (" + _vm.$currency + ")") +
                              "\n                        "
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(status)",
                      fn: function (row) {
                        return [
                          row.item.status === 0
                            ? _c("span", { staticClass: "badge bg-warning" }, [
                                _vm._v(_vm._s(_vm.__("pending"))),
                              ])
                            : row.item.status === 1
                            ? _c("span", { staticClass: "badge bg-success" }, [
                                _vm._v(_vm._s(_vm.__("approved"))),
                              ])
                            : row.item.status === 2
                            ? _c("span", { staticClass: "badge bg-danger" }, [
                                _vm._v(_vm._s(_vm.__("rejected"))),
                              ])
                            : _c("span", { staticClass: "badge bg-danger" }, [
                                _vm._v(_vm._s(_vm.__("undefine")) + "Undefine"),
                              ]),
                        ]
                      },
                    },
                    {
                      key: "cell(receipt_image)",
                      fn: function (row) {
                        return [
                          _c("img", {
                            attrs: {
                              src: row.item.receipt_image_url,
                              height: "50",
                            },
                          }),
                        ]
                      },
                    },
                    {
                      key: "cell(message)",
                      fn: function (row) {
                        return [
                          _c(
                            "small",
                            {
                              staticClass:
                                "d-inline-flex mb-3 px-2 py-1 text-muted bg-secondary bg-opacity-10 border border-secondary border-opacity-10 rounded-2",
                              attrs: { id: "bonus" + row.item.id },
                            },
                            [_c("i", { staticClass: "fa fa-info-circle" })]
                          ),
                          _vm._v(" "),
                          _c(
                            "b-popover",
                            {
                              attrs: {
                                target: "bonus" + row.item.id,
                                triggers: "hover",
                                placement: "left",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(row.item.message) +
                                  "\n                            "
                              ),
                            ]
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(created_at)",
                      fn: function (row) {
                        return [
                          _vm._v(
                            "\n                            " +
                              _vm._s(
                                new Date(row.item.created_at).toLocaleString()
                              ) +
                              "\n                        "
                          ),
                        ]
                      },
                    },
                    {
                      key: "cell(actions)",
                      fn: function (row) {
                        return [
                          _vm.$can("withdrawal_request_update")
                            ? _c(
                                "button",
                                {
                                  directives: [
                                    {
                                      name: "b-tooltip",
                                      rawName: "v-b-tooltip.hover",
                                      modifiers: { hover: true },
                                    },
                                  ],
                                  staticClass: "btn btn-sm btn-primary",
                                  attrs: { title: _vm.__("edit") },
                                  on: {
                                    click: function ($event) {
                                      _vm.edit_record = row.item
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fa fa-pencil-alt" })]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.$can("withdrawal_request_delete")
                            ? _c(
                                "button",
                                {
                                  directives: [
                                    {
                                      name: "b-tooltip",
                                      rawName: "v-b-tooltip.hover",
                                      modifiers: { hover: true },
                                    },
                                  ],
                                  staticClass: "btn btn-sm btn-danger",
                                  attrs: { title: _vm.__("delete") },
                                  on: {
                                    click: function ($event) {
                                      return _vm.deleteWithdrawalRequests(
                                        row.index,
                                        row.item.id
                                      )
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fa fa-trash" })]
                              )
                            : _vm._e(),
                        ]
                      },
                    },
                  ]),
                }),
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
                            "total-rows": _vm.totalRowsFilter,
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
      _vm._v(" "),
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: { record: _vm.edit_record },
            on: {
              modalClose: function ($event) {
                return _vm.hideModal()
              },
            },
          })
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);