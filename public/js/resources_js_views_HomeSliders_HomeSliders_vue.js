"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_HomeSliders_HomeSliders_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['record', 'categories', 'products'],
  data: function data() {
    return {
      isLoading: false,
      image: null,
      id: this.record ? this.record.id : null,
      type: this.record ? this.record.type : 'default',
      type_id: this.record ? this.record.type_id : "",
      image_url: this.record ? this.record.image_url : null,
      slider_url: this.record ? this.record.slider_url : "",
      status: this.record ? this.record.status : 1
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? "Edit" : "Add";
      title += " Home Slider Image";
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
      formData.append('type', this.type);
      formData.append('type_id', this.type_id);
      formData.append('image', this.image);
      formData.append('slider_url', this.slider_url);
      formData.append('status', this.status);
      var url = this.$apiUrl + '/home_slider_images/save';
      if (this.id) {
        url = this.$apiUrl + '/home_slider_images/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          _this.$eventBus.$emit('SliderSaved', data.message);
          vm.$router.push({
            path: '/home_sliders'
          });
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuejs_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuejs-datatable */ "./node_modules/vuejs-datatable/dist/vuejs-datatable.esm.js");
/* harmony import */ var _Edit_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue */ "./resources/js/views/HomeSliders/Edit.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    'app-edit-record': _Edit_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      create_new: false,
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
        key: 'type_name',
        label: __('name'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'image',
        label: __('image'),
        "class": 'text-center'
      }, {
        key: 'status',
        label: __('status'),
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
      sliders: [],
      isLoading: false,
      sectionStyle: 'style_1',
      max_visible_sliders: 12,
      max_col_in_single_row: 3,
      edit_record: null,
      categories: [],
      products: []
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
    this.totalRows = this.sliders.length;
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    }
  },
  created: function created() {
    var _this = this;
    this.showCreateModal();
    this.$eventBus.$on('SliderSaved', function (message) {
      _this.showMessage('success', message);
      _this.getSliders();
    });
    this.getSliders();
    this.getCategories();
    this.getProducts();
  },
  methods: {
    getSliders: function getSliders() {
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(this.$apiUrl + '/home_slider_images').then(function (response) {
        _this2.isLoading = false;
        var data = response.data;
        _this2.sliders = data.data;
        _this2.totalRows = _this2.sliders.length;
      });
    },
    getCategories: function getCategories() {
      var _this3 = this;
      this.isLoading = true;
      var url = this.$apiUrl + '/categories';
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(url).then(function (response) {
        _this3.isLoading = false;
        var data = response.data;
        _this3.categories = data.data;
      });
    },
    getProducts: function getProducts() {
      var _this4 = this;
      this.isLoading = true;
      var url = this.$apiUrl + '/products';
      axios__WEBPACK_IMPORTED_MODULE_2___default().get(url).then(function (response) {
        _this4.isLoading = false;
        var data = response.data;
        _this4.products = data.data.products;
      });
    },
    deleteSlider: function deleteSlider(index, id) {
      var _this5 = this;
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
          _this5.isLoading = true;
          var postData = {
            id: id
          };
          axios__WEBPACK_IMPORTED_MODULE_2___default().post(_this5.$apiUrl + '/home_slider_images/delete', postData).then(function (response) {
            _this5.isLoading = false;
            var data = response.data;
            _this5.sliders.splice(index, 1);
            _this5.showMessage("success", data.message);
          });
        }
      });
    },
    showCreateModal: function showCreateModal() {
      var create = this.$route.params.create;
      if (create) {
        this.create_new = true;
      }
    },
    hideModal: function hideModal() {
      this.create_new = false;
      this.edit_record = false;
      this.$router.push({
        path: '/home_sliders'
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/HomeSliders/Edit.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/HomeSliders/Edit.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=3ee4ab05&scoped=true */ "./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3ee4ab05",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/HomeSliders/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/HomeSliders/HomeSliders.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/HomeSliders/HomeSliders.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomeSliders.vue?vue&type=template&id=8ecb6bb0 */ "./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0");
/* harmony import */ var _HomeSliders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomeSliders.vue?vue&type=script&lang=js */ "./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HomeSliders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__.render,
  _HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/HomeSliders/HomeSliders.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeSliders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HomeSliders.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeSliders_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_3ee4ab05_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=3ee4ab05&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true");


/***/ }),

/***/ "./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0 ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeSliders_vue_vue_type_template_id_8ecb6bb0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HomeSliders.vue?vue&type=template&id=8ecb6bb0 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/Edit.vue?vue&type=template&id=3ee4ab05&scoped=true ***!
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
  return _c(
    "b-modal",
    {
      ref: "my-modal",
      attrs: {
        title: _vm.modal_title,
        scrollable: "",
        "no-close-on-backdrop": "",
        "no-fade": "",
        static: "",
      },
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
              _vm._v(_vm._s(_vm.__("save")) + "\n            "),
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
              _c("label", [_vm._v(_vm._s(_vm.__("type")))]),
              _vm._v(" "),
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
                    change: function ($event) {
                      var $$selectedVal = Array.prototype.filter
                        .call($event.target.options, function (o) {
                          return o.selected
                        })
                        .map(function (o) {
                          var val = "_value" in o ? o._value : o.value
                          return val
                        })
                      _vm.type = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    },
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
                  _c("option", { attrs: { value: "slider_url" } }, [
                    _vm._v(" " + _vm._s(_vm.__("slider_url"))),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _vm.type == "category"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v(_vm._s(_vm.__("category")))]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.type_id,
                          expression: "type_id",
                        },
                      ],
                      staticClass: "form-control form-select",
                      attrs: { required: "" },
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.type_id = $event.target.multiple
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
            _vm.type == "product"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v(" " + _vm._s(_vm.__("products")))]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.type_id,
                          expression: "type_id",
                        },
                      ],
                      staticClass: "form-control form-select",
                      attrs: { required: "" },
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.type_id = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v(_vm._s(_vm.__("select_product"))),
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
            _vm.type == "slider_url"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v(" " + _vm._s(_vm.__("link")))]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.slider_url,
                        expression: "slider_url",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "url",
                      placeholder: "Enter Link",
                      required: "",
                    },
                    domProps: { value: _vm.slider_url },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.slider_url = $event.target.value
                      },
                    },
                  }),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", [_vm._v(" " + _vm._s(_vm.__("image")))]),
              _vm._v(" "),
              _c("p", { staticClass: "text-muted" }, [
                _vm._v(
                  " " +
                    _vm._s(
                      _vm.__(
                        "please_choose_square_image_of_larger_than_smaller_than"
                      )
                    )
                ),
              ]),
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
                            _vm._s(_vm.__("selected_file_name")) +
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
                            _vm._s(_vm.__("drop_files_here_or_click_to_upload"))
                          ),
                        ]),
                      ],
                ],
                2
              ),
              _vm._v(" "),
              _vm.image_url
                ? _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-6" }, [
                      _c("img", {
                        staticClass: "custom-slider-image",
                        attrs: {
                          src: _vm.image_url,
                          title: "Store Logo",
                          alt: "Store Logo",
                        },
                      }),
                    ]),
                  ])
                : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/HomeSliders/HomeSliders.vue?vue&type=template&id=8ecb6bb0 ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
            _c("h3", [
              _vm._v(" " + _vm._s(_vm.__("manage_home_slider_images"))),
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
                    [_vm._v(_vm._s(_vm.__("manage_home_slider_images")))]
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
                _c("h4", [_vm._v(" " + _vm._s(_vm.__("home_slider_images")))]),
                _vm._v(" "),
                _c("span", { staticClass: "pull-right" }, [
                  _vm.$can("home_slider_image_create")
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          on: {
                            click: function ($event) {
                              _vm.create_new = true
                            },
                          },
                        },
                        [_vm._v(_vm._s(_vm.__("add_new")))]
                      )
                    : _vm._e(),
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
                                  return _vm.getSliders()
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
                          items: _vm.sliders,
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
                                  {
                                    staticClass: "text-center text-black my-2",
                                  },
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
                            key: "cell(image)",
                            fn: function (row) {
                              return [
                                _c("img", {
                                  attrs: {
                                    src: row.item.image_url,
                                    height: "50",
                                  },
                                }),
                              ]
                            },
                          },
                          {
                            key: "cell(status)",
                            fn: function (row) {
                              return [
                                row.item.status === 1
                                  ? _c(
                                      "span",
                                      { staticClass: "badge bg-success" },
                                      [_vm._v(_vm._s(_vm.__("active")))]
                                    )
                                  : _c(
                                      "span",
                                      { staticClass: "badge bg-danger" },
                                      [_vm._v(_vm._s(_vm.__("deactive")))]
                                    ),
                              ]
                            },
                          },
                          {
                            key: "cell(actions)",
                            fn: function (row) {
                              return [
                                _vm.$can("home_slider_image_update")
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
                                      [
                                        _c("i", {
                                          staticClass: "fa fa-pencil-alt",
                                        }),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.$can("home_slider_image_delete")
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
                                            return _vm.deleteSlider(
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
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.__("total_records")) +
                                " :- " +
                                _vm._s(_vm.totalRows) +
                                " "
                            ),
                          ]),
                          _vm._v(" "),
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
      ]),
      _vm._v(" "),
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              categories: _vm.categories,
              products: _vm.products,
            },
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