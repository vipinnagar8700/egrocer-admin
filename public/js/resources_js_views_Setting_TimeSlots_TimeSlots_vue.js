"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Setting_TimeSlots_TimeSlots_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js ***!
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['record'],
  data: function data() {
    return {
      isLoading: false,
      id: this.record ? this.record.id : null,
      title: this.record ? this.record.title : null,
      from_time: this.record ? this.record.from_time : null,
      to_time: this.record ? this.record.to_time : null,
      last_order_time: this.record ? this.record.last_order_time : null,
      status: this.record ? this.record.status : 1
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit') : __('add');
      title += " ";
      title += __('time_slot');
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
    saveRecord: function saveRecord() {
      var _this = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      if (this.id) {
        formData.append('id', this.id);
      }
      formData.append('title', this.title);
      formData.append('from_time', this.from_time);
      formData.append('to_time', this.to_time);
      formData.append('to_time', this.to_time);
      formData.append('last_order_time', this.last_order_time);
      formData.append('status', this.status);
      var url = this.$apiUrl + '/delivery_settings/save';
      if (this.id) {
        url = this.$apiUrl + '/delivery_settings/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this.$eventBus.$emit('TimeSlotsSaved', data.message);
          _this.hideModal();
        } else {
          _this.showError(data.message);
          _this.isLoading = false;
        }
      })["catch"](function (error) {
        _this.isLoading = false;
        if (error.request.statusText) {
          _this.showError(error.request.statusText);
        } else if (error.message) {
          _this.showError(error.message);
        } else {
          _this.showError(__('something_went_wrong'));
        }
      });
    }
  },
  mounted: function mounted() {
    this.showModal();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-datatable */ "./node_modules/vuejs-datatable/dist/vuejs-datatable.esm.js");
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/Setting/TimeSlots/Edit.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    VuejsDatatableFactory: vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__.VuejsDatatableFactory,
    "app-edit-record": _Edit_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      fields: [{
        key: "id",
        label: __('id'),
        sortable: true,
        sortDirection: "desc"
      }, {
        key: "title",
        label: __('title'),
        sortable: true,
        sortDirection: "desc",
        "class": "text-center"
      }, {
        key: "from_time",
        label: __('from_time'),
        sortable: true,
        sortDirection: "desc",
        "class": "text-center"
      }, {
        key: "to_time",
        label: __('to_time'),
        sortable: true,
        sortDirection: "desc",
        "class": "text-center"
      }, {
        key: "last_order_time",
        label: __('last_order_time'),
        sortable: true,
        sortDirection: "desc",
        "class": "text-center"
      }, {
        key: "status",
        label: __('status'),
        sortable: true,
        sortDirection: "desc",
        "class": "text-center"
      }, {
        key: "actions",
        label: __('actions')
      }],
      totalRows: 1,
      currentPage: 1,
      perPage: this.$perPage,
      pageOptions: this.$pageOptions,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      page: 1,
      time_slots: [],
      isLoading: false,
      sectionStyle: "style_1",
      max_visible_categories: 12,
      max_col_in_single_row: 3,
      edit_record: null,
      is_time_slots_enabled: false,
      delivery_starts_from: "",
      allowed_days: 1,
      timeSlot_settingsObject: {},
      timeSlot_settings: {},
      validationNoOfDaysError: null,
      validationNoOfEstimateDaysError: null
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
    this.totalRows = this.time_slots.length;
  },
  created: function created() {
    var _this = this;
    this.$eventBus.$on("TimeSlotsSaved", function (message) {
      _this.showMessage("success", message);
      _this.getTimeSlots();
    });
    this.getTimeSlots();
    this.getTimeSlotsSettings();
  },
  methods: {
    validateNoOfDays: function validateNoOfDays() {
      if (this.timeSlot_settingsObject.time_slots_allowed_days < 1) {
        this.validationNoOfDaysError = "No of Users must be integer value.";
        this.timeSlot_settingsObject.time_slots_allowed_days = "";
      } else {
        this.validationNoOfDaysError = null;
      }
    },
    validateNoOfEstimateDays: function validateNoOfEstimateDays() {
      if (this.timeSlot_settingsObject.delivery_estimate_days < 1) {
        this.validationNoOfEstimateDaysError = "No of Users must be integer value.";
        this.timeSlot_settingsObject.delivery_estimate_days = "";
      } else {
        this.validationNoOfEstimateDaysError = null;
      }
    },
    getTimeSlots: function getTimeSlots() {
      var _this2 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + "/delivery_settings").then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        _this2.time_slots = data.data;
        _this2.totalRows = _this2.time_slots.length;
      });
    },
    deleteTimeSlots: function deleteTimeSlots(index, id) {
      var _this3 = this;
      this.$swal.fire({
        title: "Are you Sure?",
        text: "You want be able to revert this",
        confirmButtonText: "Yes, Sure",
        cancelButtonText: "Cancel",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#37a279",
        cancelButtonColor: "#d33"
      }).then(function (result) {
        if (result.value) {
          _this3.isLoading = true;
          var postData = {
            id: id
          };
          axios.post(_this3.$apiUrl + "/delivery_settings/delete", postData).then(function (response) {
            _this3.isLoading = false;
            var data = response.data;
            _this3.time_slots.splice(index, 1);
            _this3.showMessage("success", data.message);
          });
        }
      });
    },
    getTimeSlotsSettings: function getTimeSlotsSettings() {
      var _this4 = this;
      axios.get(this.$apiUrl + "/delivery_settings/getTimeSlotsSettings").then(function (response) {
        var data = response.data.data;
        _this4.timeSlot_settingsObject = data.timeSlot_settingsObject;
        _this4.timeSlot_settings = response.data.data.timeSlot_settings;
        _this4.timeSlot_settings.map(function (item, index) {
          if (item.value === 'false' || item.value === 'true') {
            _this4.timeSlot_settingsObject[item.variable] = item.value === 'false' ? false : true;
          } else {
            _this4.timeSlot_settingsObject[item.variable] = item.value;
          }
        });
      });
    },
    addTimeSlotsSettings: function addTimeSlotsSettings() {
      var _this5 = this;
      this.isLoading = true;
      var timeSlot_settingsObject = this.timeSlot_settingsObject;
      var formData = new FormData();
      for (var key in timeSlot_settingsObject) {
        formData.append(key, timeSlot_settingsObject[key]);
      }
      axios.post(this.$apiUrl + "/delivery_settings/saveTimeSlotsSettings", formData).then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          _this5.getTimeSlotsSettings();
          _this5.isLoading = false;
          _this5.showMessage("success", data.message);
        } else {
          _this5.isLoading = false;
          _this5.showMessage("error", data.message);
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.image_preview[data-v-4973d20f]{\nmargin-top: 5px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_4973d20f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_4973d20f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_4973d20f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/Edit.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/Edit.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=4973d20f&scoped=true */ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _Edit_vue_vue_type_style_index_0_id_4973d20f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css */ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4973d20f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/TimeSlots/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/TimeSlots.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/TimeSlots.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeSlots.vue?vue&type=template&id=7ed9bfb3 */ "./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3");
/* harmony import */ var _TimeSlots_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimeSlots.vue?vue&type=script&lang=js */ "./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TimeSlots_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__.render,
  _TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Setting/TimeSlots/TimeSlots.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeSlots_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TimeSlots.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeSlots_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_id_4973d20f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=style&index=0&id=4973d20f&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_4973d20f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=4973d20f&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true");


/***/ }),

/***/ "./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3 ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeSlots_vue_vue_type_template_id_7ed9bfb3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TimeSlots.vue?vue&type=template&id=7ed9bfb3 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/Edit.vue?vue&type=template&id=4973d20f&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
              _vm._v("\n         " + _vm._s(_vm.__("save")) + "\n         "),
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
            [_vm._v(_vm._s(_vm.__("cancel")))]
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "form",
        {
          ref: "my-form",
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.saveRecord.apply(null, arguments)
            },
          },
        },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", [_vm._v(_vm._s(_vm.__("title")))]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.title,
                    expression: "title",
                  },
                ],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  required: "",
                  placeholder: "Morning 9AM to 12PM",
                },
                domProps: { value: _vm.title },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.title = $event.target.value
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", [
                _vm._v(_vm._s(_vm.__("from_time"))),
                _c("small", [
                  _vm._v("(" + _vm._s(_vm.__("24_hours_formate")) + ")"),
                ]),
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.from_time,
                    expression: "from_time",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "time", required: "" },
                domProps: { value: _vm.from_time },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.from_time = $event.target.value
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", [
                _vm._v("  " + _vm._s(_vm.__("to_time"))),
                _c("small", [
                  _vm._v("(" + _vm._s(_vm.__("24_hours_formate")) + ")"),
                ]),
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.to_time,
                    expression: "to_time",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "time", required: "" },
                domProps: { value: _vm.to_time },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.to_time = $event.target.value
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", [
                _vm._v(" " + _vm._s(_vm.__("last_order_time"))),
                _c("small", [
                  _vm._v("(" + _vm._s(_vm.__("24_hours_formate")) + ")"),
                ]),
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.last_order_time,
                    expression: "last_order_time",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "time", required: "" },
                domProps: { value: _vm.last_order_time },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.last_order_time = $event.target.value
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _vm.id
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v(_vm._s(_vm.__("status")))]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "col-md-9 text-left mt-1" },
                    [
                      _c("b-form-radio-group", {
                        attrs: {
                          options: [
                            { text: " Deactivated", value: 0 },
                            { text: " Activated", value: 1 },
                          ],
                          buttons: "",
                          "button-variant": "outline-primary",
                          required: "",
                        },
                        model: {
                          value: _vm.status,
                          callback: function ($$v) {
                            _vm.status = $$v
                          },
                          expression: "status",
                        },
                      }),
                    ],
                    1
                  ),
                ])
              : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Setting/TimeSlots/TimeSlots.vue?vue&type=template&id=7ed9bfb3 ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-12 col-md-6 order-md-1 order-last" }, [
            _c("h3", [_vm._v(_vm._s(_vm.__("manage_time_slots")))]),
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
                    [_vm._v(_vm._s(_vm.__("manage_time_slots")))]
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
              _vm.timeSlot_settingsObject.time_slots_is_enabled == 1
                ? _c("div", { staticClass: "card-header" }, [
                    _c("h4", [_vm._v(_vm._s(_vm.__("time_slot_config")))]),
                    _vm._v(" "),
                    _c("span", { staticClass: "pull-right" }, [
                      _vm.$can("time_slot_create")
                        ? _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              on: {
                                click: function ($event) {
                                  _vm.edit_record = true
                                },
                              },
                            },
                            [_vm._v(_vm._s(_vm.__("add_new_time_slot")))]
                          )
                        : _vm._e(),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-4" }, [
                    _c("div", { staticClass: "box-body" }, [
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v(_vm._s(_vm.__("delivery_estimate_days"))),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value:
                                _vm.timeSlot_settingsObject
                                  .delivery_estimate_days,
                              expression:
                                "timeSlot_settingsObject.delivery_estimate_days",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { type: "number", min: "1", required: "" },
                          domProps: {
                            value:
                              _vm.timeSlot_settingsObject
                                .delivery_estimate_days,
                          },
                          on: {
                            input: [
                              function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.timeSlot_settingsObject,
                                  "delivery_estimate_days",
                                  $event.target.value
                                )
                              },
                              _vm.validateNoOfEstimateDays,
                            ],
                          },
                        }),
                        _vm._v(" "),
                        _vm.validationNoOfEstimateDaysError
                          ? _c("span", { staticClass: "error" }, [
                              _vm._v(
                                _vm._s(_vm.validationNoOfEstimateDaysError)
                              ),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c(
                          "label",
                          { attrs: { for: "time_slots_is_enabled" } },
                          [
                            _vm._v(
                              _vm._s(_vm.__("enable")) +
                                " / " +
                                _vm._s(_vm.__("disable")) +
                                " " +
                                _vm._s(_vm.__("time_slots"))
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
                                _vm.timeSlot_settingsObject
                                  .time_slots_is_enabled,
                              expression:
                                "timeSlot_settingsObject.time_slots_is_enabled",
                            },
                          ],
                          staticClass: "form-check-input",
                          attrs: {
                            type: "checkbox",
                            required: "",
                            id: "time_slots_is_enabled",
                          },
                          domProps: {
                            value: 0,
                            checked: Array.isArray(
                              _vm.timeSlot_settingsObject.time_slots_is_enabled
                            )
                              ? _vm._i(
                                  _vm.timeSlot_settingsObject
                                    .time_slots_is_enabled,
                                  0
                                ) > -1
                              : _vm.timeSlot_settingsObject
                                  .time_slots_is_enabled,
                          },
                          on: {
                            change: function ($event) {
                              var $$a =
                                  _vm.timeSlot_settingsObject
                                    .time_slots_is_enabled,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = 0,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.timeSlot_settingsObject,
                                      "time_slots_is_enabled",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.timeSlot_settingsObject,
                                      "time_slots_is_enabled",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.timeSlot_settingsObject,
                                  "time_slots_is_enabled",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _vm.timeSlot_settingsObject.time_slots_is_enabled == 1
                        ? _c("div", { staticClass: "form-group" }, [
                            _c("label", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("how_many_days_you_want_to_allow")
                                ) + "?"
                              ),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value:
                                    _vm.timeSlot_settingsObject
                                      .time_slots_allowed_days,
                                  expression:
                                    "timeSlot_settingsObject.time_slots_allowed_days",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { type: "number", min: "1", required: "" },
                              domProps: {
                                value:
                                  _vm.timeSlot_settingsObject
                                    .time_slots_allowed_days,
                              },
                              on: {
                                input: [
                                  function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.timeSlot_settingsObject,
                                      "time_slots_allowed_days",
                                      $event.target.value
                                    )
                                  },
                                  _vm.validateNoOfDays,
                                ],
                              },
                            }),
                            _vm._v(" "),
                            _vm.validationNoOfDaysError
                              ? _c("span", { staticClass: "error" }, [
                                  _vm._v(_vm._s(_vm.validationNoOfDaysError)),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("br"),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "box-footer" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit", disabled: _vm.isLoading },
                            on: { click: _vm.addTimeSlotsSettings },
                          },
                          [
                            _vm._v("Add "),
                            _vm.isLoading
                              ? _c("b-spinner", {
                                  attrs: { small: "", label: "Spinning" },
                                })
                              : _vm._e(),
                          ],
                          1
                        ),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _vm.timeSlot_settingsObject.time_slots_is_enabled == 1
                    ? _c(
                        "div",
                        { staticClass: "col-md-8" },
                        [
                          _c(
                            "b-row",
                            { staticClass: "mb-2" },
                            [
                              _c(
                                "b-col",
                                { attrs: { md: "3", "offset-md": "8" } },
                                [
                                  _c("h6", { staticClass: "box-title" }, [
                                    _vm._v(_vm._s(_vm.__("search"))),
                                  ]),
                                  _vm._v(" "),
                                  _c("b-form-input", {
                                    attrs: {
                                      id: "filter-input",
                                      type: "search",
                                      placeholder: "Search",
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
                                {
                                  staticClass: "text-center",
                                  attrs: { md: "1" },
                                },
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
                                      staticClass:
                                        "btn btn-primary btn_refresh",
                                      attrs: { title: _vm.__("refresh") },
                                      on: {
                                        click: function ($event) {
                                          return _vm.getTimeSlots()
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
                              items: _vm.time_slots,
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
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "table-busy",
                                  fn: function () {
                                    return [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "text-center text-black my-2",
                                        },
                                        [
                                          _c("b-spinner", {
                                            staticClass: "align-middle",
                                          }),
                                          _vm._v(" "),
                                          _c("strong", [
                                            _vm._v(
                                              _vm._s(_vm.__("loading")) + "..."
                                            ),
                                          ]),
                                        ],
                                        1
                                      ),
                                    ]
                                  },
                                  proxy: true,
                                },
                                {
                                  key: "cell(status)",
                                  fn: function (row) {
                                    return [
                                      row.item.status == 1
                                        ? _c(
                                            "span",
                                            { staticClass: "badge bg-success" },
                                            [_vm._v(_vm._s(_vm.__("active")))]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      row.item.status == 0
                                        ? _c(
                                            "span",
                                            { staticClass: "badge bg-danger" },
                                            [_vm._v(_vm._s(_vm.__("deactive")))]
                                          )
                                        : _vm._e(),
                                    ]
                                  },
                                },
                                {
                                  key: "cell(actions)",
                                  fn: function (row) {
                                    return [
                                      _vm.$can("time_slot_update")
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
                                              staticClass:
                                                "btn btn-sm btn-primary",
                                              attrs: { title: _vm.__("edit") },
                                              on: {
                                                click: function ($event) {
                                                  _vm.edit_record = row.item
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "fa fa-pencil-alt",
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.$can("time_slot_delete")
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
                                              staticClass:
                                                "btn btn-sm btn-danger",
                                              attrs: {
                                                title: _vm.__("delete"),
                                              },
                                              on: {
                                                click: function ($event) {
                                                  return _vm.deleteTimeSlots(
                                                    row.index,
                                                    row.item.id
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "fa fa-trash",
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  },
                                },
                              ],
                              null,
                              false,
                              2625968476
                            ),
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
                      )
                    : _vm._e(),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _vm.edit_record
        ? _c("app-edit-record", {
            attrs: { record: _vm.edit_record },
            on: {
              modalClose: function ($event) {
                _vm.edit_record = null
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