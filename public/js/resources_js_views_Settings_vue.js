"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Settings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Auth.js */ "./resources/js/Auth.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      statuses: [],
      mail_statuses: [],
      mobile_statuses: [],
      sms_statuses: [],
      settings: {
        username: _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.username,
        current_password: "",
        password: "",
        confirm_password: ""
      }
    };
  },
  created: function created() {
    this.getOrderStatus();
    this.getMailSetting();
  },
  methods: {
    getOrderStatus: function getOrderStatus() {
      var _this = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/order_statuses').then(function (response) {
        _this.isLoading = false;
        _this.statuses = response.data.data;
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
    },
    getMailSetting: function getMailSetting() {
      var _this2 = this;
      var vm = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/mail_settings').then(function (response) {
        _this2.isLoading = false;
        var data = response.data.data;
        data.forEach(function (status) {
          if (status.mail_status === 1) {
            _this2.mail_statuses.push(status.order_status_id);
          }
          if (status.mobile_status === 1) {
            _this2.mobile_statuses.push(status.order_status_id);
          }
          if (status.sms_status === 1) {
            _this2.sms_statuses.push(status.order_status_id);
          }
        });
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this2.showError(error.request.statusText);
        } else if (error.message) {
          _this2.showError(error.message);
        } else {
          _this2.showError(__('something_went_wrong'));
        }
      });
    },
    saveMailSetting: function saveMailSetting() {
      var _this3 = this;
      var vm = this;
      this.isLoading = true;
      var formData = new FormData();
      this.statuses.forEach(function (status) {
        formData.append('status_ids[]', status.id);
        if (_this3.mail_statuses.includes(status.id)) {
          formData.append('mail_statuses[]', "1");
        } else {
          formData.append('mail_statuses[]', "0");
        }
        if (_this3.mobile_statuses.includes(status.id)) {
          formData.append('mobile_statuses[]', "1");
        } else {
          formData.append('mobile_statuses[]', "0");
        }
        if (_this3.sms_statuses.includes(status.id)) {
          formData.append('sms_statuses[]', "1");
        } else {
          formData.append('sms_statuses[]', "0");
        }
      });
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/mail_settings/save', formData).then(function (res) {
        var data = res.data;
        vm.isLoading = false;
        if (data.status === 1) {
          vm.showSuccess(data.message);
          _this3.getMailSetting();
        } else {
          vm.showError(data.message);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this3.showError(error.request.statusText);
        } else if (error.message) {
          _this3.showError(error.message);
        } else {
          _this3.showError(__('something_went_wrong'));
        }
      });
    },
    saveRecord: function saveRecord() {
      var _this4 = this;
      var vm = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().post(this.$apiUrl + '/system_users/change_password', this.settings).then(function (res) {
        var data = res.data;
        vm.isLoading = false;
        if (data.status === 1) {
          vm.showMessage("success", data.message);
          var role_id = _Auth_js__WEBPACK_IMPORTED_MODULE_1__["default"].user.role_id;
          if (role_id === 3) {
            _this4.$router.push('/seller');
          } else if (role_id === 4) {
            _this4.$router.push('/delivery_boy');
          } else {
            _this4.$router.push({
              path: '/'
            });
          }
        } else {
          vm.showError(data.message);
        }
      })["catch"](function (error) {
        vm.isLoading = false;
        if (error.request.statusText) {
          _this4.showError(error.request.statusText);
        } else if (error.message) {
          _this4.showError(error.message);
        } else {
          _this4.showError(__('something_went_wrong'));
        }
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/Settings.vue":
/*!*****************************************!*\
  !*** ./resources/js/views/Settings.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=6af1f6c2 */ "./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js */ "./resources/js/views/Settings.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__.render,
  _Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Settings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Settings.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./resources/js/views/Settings.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2":
/*!***********************************************************************!*\
  !*** ./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2 ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_6af1f6c2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Settings.vue?vue&type=template&id=6af1f6c2 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Settings.vue?vue&type=template&id=6af1f6c2 ***!
  \**************************************************************************************************************************************************************************************************************/
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
      _c("h3", [_vm._v(_vm._s(_vm.__("settings")))]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "page-content" }, [
      _c("section", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12 col-lg-12" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-6 col-md-6" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function ($event) {
                      $event.preventDefault()
                      return _vm.saveMailSetting.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "card-body px-3 py-4-5" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-12" }, [
                          _c("h3", [
                            _vm._v(_vm._s(_vm.__("order_mail_settings"))),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "mt-5" }, [
                            _c(
                              "div",
                              {
                                staticClass: "col-8 col-md-8 mb-2 offset-md-1",
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "row d-flex justify-content-between ",
                                  },
                                  [
                                    _c("div", { staticClass: "col-6" }, [
                                      _c("h6", [
                                        _vm._v(_vm._s(_vm.__("order_status"))),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-2" }, [
                                      _c("h6", [
                                        _vm._v(_vm._s(_vm.__("mail"))),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-2" }, [
                                      _c("h6", [_vm._v(_vm._s(_vm.__("sms")))]),
                                    ]),
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.statuses, function (status, index) {
                                  return _c(
                                    "div",
                                    {
                                      staticClass:
                                        "row d-flex justify-content-between ",
                                    },
                                    [
                                      _c("div", { staticClass: "col-6" }, [
                                        _c(
                                          "label",
                                          {
                                            attrs: {
                                              for: "checkbox_" + status.id,
                                            },
                                          },
                                          [
                                            _vm._v(
                                              " " +
                                                _vm._s(
                                                  _vm.formattedName(
                                                    status.status
                                                  )
                                                ) +
                                                " "
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "form-check form-switch col-2",
                                        },
                                        [
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.mail_statuses,
                                                expression: "mail_statuses",
                                              },
                                            ],
                                            staticClass: "form-check-input",
                                            attrs: {
                                              type: "checkbox",
                                              id: "checkbox_" + status.id,
                                            },
                                            domProps: {
                                              value: status.id,
                                              checked:
                                                _vm.mail_statuses.includes(
                                                  status.id
                                                ),
                                              checked: Array.isArray(
                                                _vm.mail_statuses
                                              )
                                                ? _vm._i(
                                                    _vm.mail_statuses,
                                                    status.id
                                                  ) > -1
                                                : _vm.mail_statuses,
                                            },
                                            on: {
                                              change: function ($event) {
                                                var $$a = _vm.mail_statuses,
                                                  $$el = $event.target,
                                                  $$c = $$el.checked
                                                    ? true
                                                    : false
                                                if (Array.isArray($$a)) {
                                                  var $$v = status.id,
                                                    $$i = _vm._i($$a, $$v)
                                                  if ($$el.checked) {
                                                    $$i < 0 &&
                                                      (_vm.mail_statuses =
                                                        $$a.concat([$$v]))
                                                  } else {
                                                    $$i > -1 &&
                                                      (_vm.mail_statuses = $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        ))
                                                  }
                                                } else {
                                                  _vm.mail_statuses = $$c
                                                }
                                              },
                                            },
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "form-check form-switch col-2",
                                        },
                                        [
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.sms_statuses,
                                                expression: "sms_statuses",
                                              },
                                            ],
                                            staticClass: "form-check-input",
                                            attrs: {
                                              type: "checkbox",
                                              id: "checkbox_" + status.id,
                                            },
                                            domProps: {
                                              value: status.id,
                                              checked:
                                                _vm.sms_statuses.includes(
                                                  status.id
                                                ),
                                              checked: Array.isArray(
                                                _vm.sms_statuses
                                              )
                                                ? _vm._i(
                                                    _vm.sms_statuses,
                                                    status.id
                                                  ) > -1
                                                : _vm.sms_statuses,
                                            },
                                            on: {
                                              change: function ($event) {
                                                var $$a = _vm.sms_statuses,
                                                  $$el = $event.target,
                                                  $$c = $$el.checked
                                                    ? true
                                                    : false
                                                if (Array.isArray($$a)) {
                                                  var $$v = status.id,
                                                    $$i = _vm._i($$a, $$v)
                                                  if ($$el.checked) {
                                                    $$i < 0 &&
                                                      (_vm.sms_statuses =
                                                        $$a.concat([$$v]))
                                                  } else {
                                                    $$i > -1 &&
                                                      (_vm.sms_statuses = $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        ))
                                                  }
                                                } else {
                                                  _vm.sms_statuses = $$c
                                                }
                                              },
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  )
                                }),
                              ],
                              2
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-footer" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit", disabled: _vm.isLoading },
                        },
                        [
                          _vm._v(
                            "\n                                        " +
                              _vm._s(_vm.__("save")) +
                              " "
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
                          staticClass: "btn btn-danger",
                          attrs: { type: "button" },
                          on: {
                            click: function ($event) {
                              return _vm.$router.go(-1)
                            },
                          },
                        },
                        [_vm._v(_vm._s(_vm.__("back")))]
                      ),
                    ]),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-6 col-md-6" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function ($event) {
                      $event.preventDefault()
                      return _vm.saveRecord.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "card" }, [
                    _c("div", { staticClass: "card-body px-3 py-4-5" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-12" }, [
                          _c("h3", [
                            _vm._v(
                              _vm._s(_vm.__("change_username_and_password"))
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "mt-5" }, [
                            _c("div", { staticClass: "form-group" }, [
                              _c("label", { attrs: { for: "username" } }, [
                                _vm._v(_vm._s(_vm.__("username"))),
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.settings.username,
                                    expression: "settings.username",
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "text",
                                  id: "username",
                                  placeholder: _vm.__("username"),
                                  required: "",
                                },
                                domProps: { value: _vm.settings.username },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.settings,
                                      "username",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "form-group" }, [
                              _c(
                                "label",
                                { attrs: { for: "current_password" } },
                                [_vm._v(_vm._s(_vm.__("current_password")))]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.settings.current_password,
                                    expression: "settings.current_password",
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "password",
                                  id: "current_password",
                                  placeholder: _vm.__("current_password"),
                                  required: "",
                                },
                                domProps: {
                                  value: _vm.settings.current_password,
                                },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.settings,
                                      "current_password",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "form-group" }, [
                              _c("label", { attrs: { for: "password" } }, [
                                _vm._v(_vm._s(_vm.__("password"))),
                              ]),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.settings.password,
                                    expression: "settings.password",
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "password",
                                  id: "password",
                                  placeholder: _vm.__("password"),
                                  required: "",
                                },
                                domProps: { value: _vm.settings.password },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.settings,
                                      "password",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "form-group" }, [
                              _c(
                                "label",
                                { attrs: { for: "confirm_password" } },
                                [_vm._v(_vm._s(_vm.__("confirm_password")))]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.settings.confirm_password,
                                    expression: "settings.confirm_password",
                                  },
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  type: "password",
                                  id: "confirm_password",
                                  placeholder: _vm.__("confirm_password"),
                                  required: "",
                                },
                                domProps: {
                                  value: _vm.settings.confirm_password,
                                },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.settings,
                                      "confirm_password",
                                      $event.target.value
                                    )
                                  },
                                },
                              }),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-footer" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary",
                          attrs: { type: "submit", disabled: _vm.isLoading },
                        },
                        [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(_vm.__("save")) +
                              " "
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
                          staticClass: "btn btn-danger",
                          attrs: { type: "button" },
                          on: {
                            click: function ($event) {
                              return _vm.$router.go(-1)
                            },
                          },
                        },
                        [_vm._v(_vm._s(_vm.__("back")))]
                      ),
                    ]),
                  ]),
                ]
              ),
            ]),
          ]),
        ]),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);