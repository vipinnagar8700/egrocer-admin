"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Notifications_Notifications_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var v_select2_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! v-select2-component */ "./node_modules/v-select2-component/dist/Select2.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['record', 'users', 'categories', 'products'],
  components: {
    Select2: v_select2_component__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      id: this.record ? this.record.id : null,
      type: this.record ? this.record.type : "",
      type_ids: this.record ? this.record.type_id : [],
      type_id: this.record ? this.record.type_id : 0,
      type_link: this.record ? this.record.type_link : "",
      title: this.record ? this.record.title : "",
      message: this.record ? this.record.message : "",
      include_image: false,
      image: this.record ? this.record.image : "",
      image_url: this.record ? this.record.image : "",
      notificationError: false,
      notificationErrorMessage: ""
    };
  },
  computed: {
    modal_title: function modal_title() {
      var title = this.id ? __('edit') : __('add');
      title += " ";
      title += __('notification');
      return title;
    },
    users_options: function users_options() {
      var temp = [];
      this.users.forEach(function (user) {
        temp.push({
          id: user.id,
          text: user.name
        });
      });
      return temp;
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
      formData.append('type_ids', this.type_ids);
      formData.append('type_id', this.type_id);
      formData.append('type_link', this.type_link);
      formData.append('title', this.title);
      formData.append('message', this.message);
      formData.append('include_image', this.include_image);
      formData.append('image', this.image);
      var url = this.$apiUrl + '/notifications/save';
      if (this.id) {
        url = this.$apiUrl + '/notifications/update';
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (res) {
        var data = res.data;
        if (data.status === 1) {
          var notification = data.data;
          if (notification && (notification === null || notification === void 0 ? void 0 : notification.status) === 0) {
            _this.notificationError = true;
            _this.notificationErrorMessage = notification.message;
          }
          setTimeout(function () {
            vm.$eventBus.$emit('notificationSaved', data.message);
            vm.hideModal();
            vm.$swal.close();
            vm.$router.push({
              path: '/notifications'
            });
          }, 2000);
        } else {
          vm.showError(data.message);
          vm.isLoading = false;
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.message) {
          _this.showError(error.message);
        } else if (error.request.statusText && error.request.statusText !== "" && typeof error.request.statusText !== 'undefined') {
          _this.showError(error.request.statusText);
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit */ "./resources/js/views/Notifications/Edit.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        key: 'title',
        label: __('title'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'message',
        label: __('messgae'),
        sortable: true,
        "class": 'text-center'
      }, {
        key: 'type',
        label: __('type'),
        "class": 'text-center'
      }, {
        key: 'type_id',
        label: __('id'),
        "class": 'text-center'
      }, {
        key: 'type_link',
        label: __('link'),
        "class": 'text-center'
      }, {
        key: 'image',
        label: __('image'),
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
      users: [],
      categories: [],
      products: [],
      notifications: []
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
    this.totalRows = this.notifications.length;
  },
  watch: {
    $route: function $route(to, from) {
      this.showCreateModal();
    }
  },
  created: function created() {
    var _this = this;
    this.showCreateModal();
    this.$eventBus.$on('notificationSaved', function (message) {
      _this.showMessage("success", message);
      _this.getNotifications();
      _this.create_new = null;
    });
    this.getNotifications();
  },
  methods: {
    getNotifications: function getNotifications() {
      var _this2 = this;
      this.isLoading = true;
      axios.get(this.$apiUrl + '/notifications').then(function (response) {
        _this2.isLoading = false;
        _this2.users = response.data.data.users;
        _this2.categories = response.data.data.categories;
        _this2.products = response.data.data.products;
        _this2.notifications = response.data.data.notifications;
        _this2.totalRows = _this2.notifications.length;
      });
    },
    deleteNotification: function deleteNotification(index, id) {
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
          axios.post(_this3.$apiUrl + '/notifications/delete', postData).then(function (response) {
            _this3.isLoading = false;
            _this3.notifications.splice(index, 1);
            _this3.showMessage("success", response.data.message);
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
        path: '/notifications'
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Notifications/Edit.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/Notifications/Edit.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=25c795d0&scoped=true */ "./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js */ "./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "25c795d0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Notifications/Edit.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Notifications/Notifications.vue":
/*!************************************************************!*\
  !*** ./resources/js/views/Notifications/Notifications.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notifications.vue?vue&type=template&id=4f7a9d12 */ "./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12");
/* harmony import */ var _Notifications_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notifications.vue?vue&type=script&lang=js */ "./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Notifications_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__.render,
  _Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Notifications/Notifications.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js":
/*!************************************************************************************!*\
  !*** ./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Notifications.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_25c795d0_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Edit.vue?vue&type=template&id=25c795d0&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true");


/***/ }),

/***/ "./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12 ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Notifications_vue_vue_type_template_id_4f7a9d12__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Notifications.vue?vue&type=template&id=4f7a9d12 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Edit.vue?vue&type=template&id=25c795d0&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************/
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
        size: "lg",
        scrollable: "",
        "no-close-on-backdrop": "",
        "no-fade": "",
        static: "",
        id: "mymodal",
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
          _vm.notificationError
            ? _c(
                "div",
                {
                  staticClass:
                    "alert alert-light-warning color-warning alert-dismissible fade show",
                  attrs: { role: "alert" },
                },
                [
                  _c("strong", [
                    _c("i", { staticClass: "bi bi-exclamation-triangle" }),
                    _vm._v(" " + _vm._s(_vm.__("warning"))),
                  ]),
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.notificationErrorMessage) +
                      "\n            "
                  ),
                  _c("button", {
                    staticClass: "btn-close",
                    attrs: {
                      type: "button",
                      "data-bs-dismiss": "alert",
                      "aria-label": "Close",
                    },
                  }),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "type" } }, [
                _vm._v("Type " + _vm._s(_vm.__("type"))),
              ]),
              _vm._v(" "),
              _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
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
                  attrs: { name: "type", id: "type", required: "" },
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
                  _c("option", { attrs: { value: "" } }, [
                    _vm._v(" " + _vm._s(_vm.__("select_type"))),
                  ]),
                  _vm._v(" "),
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
                  _c("option", { attrs: { value: "user" } }, [
                    _vm._v(" " + _vm._s(_vm.__("customer"))),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "url" } }, [
                    _vm._v(" " + _vm._s(_vm.__("url"))),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _vm.type === "url"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v(" " + _vm._s(_vm.__("type_link")))]),
                  _vm._v(" "),
                  _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.type_link,
                        expression: "type_link",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: { type: "url", placeholder: "Enter Link" },
                    domProps: { value: _vm.type_link },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.type_link = $event.target.value
                      },
                    },
                  }),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "user"
              ? _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("label", [
                      _vm._v(" " + _vm._s(_vm.__("customer"))),
                      _c(
                        "small",
                        [
                          _vm._v("( Ex : 100,205, 360 "),
                          _c("comma", { attrs: { separated: "" } }, [
                            _vm._v(")"),
                          ]),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
                    _vm._v(" "),
                    _c("Select2", {
                      attrs: {
                        placeholder: "Select customers",
                        options: _vm.users_options,
                        settings: {
                          multiple: "multiple",
                          width: "100%",
                          dropdownParent: "#mymodal",
                        },
                        required: "",
                      },
                      model: {
                        value: _vm.type_ids,
                        callback: function ($$v) {
                          _vm.type_ids = $$v
                        },
                        expression: "type_ids",
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.type === "category"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "category" } }, [
                    _vm._v(" " + _vm._s(_vm.__("categories"))),
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
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
                      attrs: { name: "category", id: "category", required: "" },
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
                      _c("option", [_vm._v("Select Category")]),
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
            _vm.type === "product"
              ? _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "product" } }, [
                    _vm._v(" " + _vm._s(_vm.__("products"))),
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
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
                      attrs: { name: "product", id: "product", required: "" },
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
                      _c("option", [_vm._v("Select Product")]),
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
            _c("div", { staticClass: "form-group" }, [
              _c("label", { attrs: { for: "title" } }, [
                _vm._v(" " + _vm._s(_vm.__("title"))),
              ]),
              _vm._v(" "),
              _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
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
                  name: "title",
                  id: "title",
                  required: "",
                  placeholder: "Enter title",
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
              _c("label", { attrs: { for: "message" } }, [
                _vm._v(" " + _vm._s(_vm.__("message"))),
              ]),
              _vm._v(" "),
              _c("i", { staticClass: "text-danger" }, [_vm._v("*")]),
              _vm._v(" "),
              _c("div", { staticClass: "form-floating mb-3" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.message,
                      expression: "message",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: {
                    name: "message",
                    id: "message",
                    rows: "40",
                    cols: "70",
                    placeholder: "Enter Notification Message Here!",
                  },
                  domProps: { value: _vm.message },
                  on: {
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.message = $event.target.value
                    },
                  },
                }),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.include_image,
                    expression: "include_image",
                  },
                ],
                staticClass: "form-check-input",
                attrs: {
                  name: "include_image",
                  id: "include_image",
                  type: "checkbox",
                },
                domProps: {
                  checked: Array.isArray(_vm.include_image)
                    ? _vm._i(_vm.include_image, null) > -1
                    : _vm.include_image,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.include_image,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.include_image = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.include_image = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.include_image = $$c
                    }
                  },
                },
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "include_image" } }, [
                _vm._v(_vm._s(_vm.__("include_image"))),
              ]),
            ]),
            _vm._v(" "),
            (_vm.include_image === true && _vm.id) || _vm.include_image === true
              ? _c("div", { staticClass: "form-group" }, [
                  _c("input", {
                    ref: "file_image",
                    staticClass: "file-input",
                    attrs: {
                      type: "file",
                      name: "notification_image",
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
                            _c("label", [
                              _c("i", {
                                staticClass: "fa fa-cloud-upload-alt fa-2x",
                              }),
                            ]),
                            _vm._v(" "),
                            _c("label", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("drop_files_here_or_click_to_upload")
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
                        _c("div", { staticClass: "col-md-2" }, [
                          _c("img", {
                            staticClass: "custom-image",
                            attrs: {
                              src: _vm.image_url,
                              title: "Store Logo",
                              alt: "Store Logo",
                            },
                          }),
                        ]),
                      ])
                    : _vm._e(),
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Notifications/Notifications.vue?vue&type=template&id=4f7a9d12 ***!
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
        _c("div", { staticClass: "page-title" }, [
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              { staticClass: "col-12 col-md-6 order-md-1 order-last" },
              [_c("h3", [_vm._v(_vm._s(_vm.__("send_notification")))])]
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
                        [_vm._v(" " + _vm._s(_vm.__("send_notification")))]
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
                _vm._v(" " + _vm._s(_vm.__("notifications"))),
              ]),
              _vm._v(" "),
              _c("span", { staticClass: "pull-right" }, [
                _vm.$can("notification_create")
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
                      [_vm._v(_vm._s(_vm.__("send_notification")))]
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
                                return _vm.getNotifications()
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
                        items: _vm.notifications,
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
                          key: "cell(image)",
                          fn: function (row) {
                            return [
                              row.item.image === ""
                                ? _c("p", [_vm._v(_vm._s(_vm.__("no_image")))])
                                : _c("img", {
                                    attrs: {
                                      src: _vm.$storageUrl + row.item.image,
                                      height: "50",
                                    },
                                  }),
                            ]
                          },
                        },
                        {
                          key: "cell(actions)",
                          fn: function (row) {
                            return [
                              _vm.$can("notification_delete")
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
                                          return _vm.deleteNotification(
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
      _vm._v(" "),
      _vm.create_new || _vm.edit_record
        ? _c("app-edit-record", {
            attrs: {
              record: _vm.edit_record,
              users: _vm.users,
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