"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_errors_403_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../router/index */ "./resources/js/router/index.js");
/* harmony import */ var _Auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Auth */ "./resources/js/Auth.js");
//
//
//
//
//
//
//
//
//
//
//
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
      img_url: this.$baseUrl + '/images/error-403.png'
    };
  },
  created: function created() {
    setTimeout(function () {
      if (!UserPermissions || !_Auth__WEBPACK_IMPORTED_MODULE_1__["default"].check()) {
        _router_index__WEBPACK_IMPORTED_MODULE_0__["default"].push("/login");
      } else {
        _router_index__WEBPACK_IMPORTED_MODULE_0__["default"].push("/dashboard");
      }
    }, 2000);
  }
});

/***/ }),

/***/ "./resources/js/views/errors/403.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/errors/403.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./403.vue?vue&type=template&id=3a4e5952 */ "./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952");
/* harmony import */ var _403_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./403.vue?vue&type=script&lang=js */ "./resources/js/views/errors/403.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _403_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__.render,
  _403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/errors/403.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/errors/403.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./resources/js/views/errors/403.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_403_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./403.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_403_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952":
/*!*************************************************************************!*\
  !*** ./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952 ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_403_vue_vue_type_template_id_3a4e5952__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./403.vue?vue&type=template&id=3a4e5952 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/errors/403.vue?vue&type=template&id=3a4e5952 ***!
  \****************************************************************************************************************************************************************************************************************/
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
    _c("div", { attrs: { id: "error" } }, [
      _c("div", { staticClass: "error-page container" }, [
        _c("div", { staticClass: "col-md-8 col-12 offset-md-2" }, [
          _c("div", { staticClass: "text-center" }, [
            _c("img", {
              staticClass: "img-error",
              attrs: { src: _vm.img_url, alt: "Not Found" },
            }),
            _vm._v(" "),
            _c("h1", { staticClass: "error-title" }, [_vm._v("Forbidden")]),
            _vm._v(" "),
            _c("p", { staticClass: "fs-5 text-gray-600" }, [
              _vm._v("You are unauthorized to see this page."),
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-outline-primary mt-3",
                attrs: { type: "button" },
                on: {
                  click: function ($event) {
                    return _vm.$router.go(-1)
                  },
                },
              },
              [_vm._v("Go Back")]
            ),
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