"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_City_EditCity_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue2_google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue2-google-maps */ "./node_modules/vue2-google-maps/dist/main.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      center: {
        lat: 0,
        lng: 0
      },
      currentPlace: null,
      markers: [],
      city: {
        id: "",
        latitude: "",
        longitude: "",
        name: "",
        state: "",
        zone: "",
        formatted_address: "",
        time_to_travel: "",
        min_amount_for_free_delivery: "",
        max_deliverable_distance: "",
        delivery_charge_method: "",
        fixed_charge: "",
        per_km_charge: "",
        range_wise_charges: [{
          from_range: "",
          to_range: "",
          price: ""
        }],
        boundary_points: "",
        geolocation_type: "",
        radius: ""
      },
      boundary_points: "",
      formatted_address: "",
      infoWindow: {
        position: {
          lat: 0,
          lng: 0
        },
        open: false,
        template: ''
      },
      map: "",
      drawingManager: "",
      vertices: "",
      geolocation_type: "",
      googleMapsLoaded: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    var vm = this;
    this.$refs.mapRef.$mapPromise.then(function (map) {
      vm.map = map;
      vm.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.CIRCLE]
        },
        polygonOptions: {
          editable: true
        },
        circleOptions: {
          fillColor: '#666666',
          fillOpacity: 0.5,
          strokeWeight: 1,
          clickable: true,
          editable: true,
          draggable: true,
          zIndex: 1
        }
      });
      vm.drawingManager.setMap(vm.map);
      google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
        var newShape = event.overlay;
        newShape.type = event.type;
      });
      google.maps.event.addListener(vm.drawingManager, "overlaycomplete", function (event) {
        if (event.type == "circle") {
          var circle_points = [];
          vm.radius = event.overlay.getRadius();
          var lat = event.overlay.getCenter().lat();
          var lng = event.overlay.getCenter().lng();
          circle_points.push({
            "lat": lat,
            "lng": lng
          });
          vm.geolocation_type = event.type;
          vm.vertices = JSON.stringify(circle_points);
        } else {
          vm.geolocation_type = event.type;
          vm.vertices = event.overlay.getPath().getArray();
          vm.overlayClickListener(event.overlay);
        }
      });
      google.maps.event.addListener(_this.drawingManager, "overlaycomplete", function (event) {
        vm.overlayRemoveListener(event.overlay, false);
      });
    });
    this.waitForGoogleMaps();
  },
  computed: {
    google: function google() {
      return (0,vue2_google_maps__WEBPACK_IMPORTED_MODULE_1__.gmapApi)(); // This will return the google object once the API is loaded
    }
  },
  created: function created() {
    this.city.id = this.$route.params.id;
    this.cityRecord = this.$route.params.record;
    if (this.city.id) {
      this.getCity();
    }
  },
  methods: {
    addRow: function addRow() {
      this.city.range_wise_charges.push({
        from_range: "",
        to_range: "",
        price: ""
      });
    },
    remove: function remove(index) {
      this.city.range_wise_charges.splice(index, 1);
    },
    setPlace: function setPlace(place) {
      this.currentPlace = place;
      this.addMarker();
    },
    addMarker: function addMarker() {
      if (this.currentPlace) {
        var marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({
          position: marker
        });
        this.center = marker;
        this.city.latitude = this.currentPlace.geometry.location.lat();
        this.city.longitude = this.currentPlace.geometry.location.lng();
        this.city.name = this.currentPlace.name;
        var addressArr = this.currentPlace.formatted_address.split(",");
        this.city.state = addressArr[addressArr.length - 2];
        this.city.formatted_address = this.currentPlace.formatted_address;
        this.infoWindow.position = {
          lat: this.city.latitude,
          lng: this.city.longitude
        };
        this.infoWindow.template = "<b>".concat(this.city.name, "</b><br>").concat(this.city.formatted_address);
        this.infoWindow.open = true;
        this.currentPlace = null;
      }
    },
    getCity: function getCity() {
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiUrl + '/cities/edit/' + this.city.id).then(function (response) {
        _this2.isLoading = false;
        var data = response.data.data;
        for (var key in _this2.city) {
          if (key === 'range_wise_charges') {
            _this2.city[key] = JSON.parse(data[key]);
          } else {
            _this2.city[key] = data[key];
          }
        }
        var marker = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        };
        _this2.markers.push({
          position: marker
        });
        _this2.center = marker;
        _this2.infoWindow.position = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        };
        _this2.infoWindow.template = "<b>".concat(data.name, "</b><br>").concat(_this2.city.formatted_address);
        _this2.infoWindow.open = true;
        _this2.boundary_points = _this2.city.boundary_points;
        _this2.setMap();
      });
    },
    overlayClickListener: function overlayClickListener(overlay) {
      google.maps.event.addListener(overlay, "mouseup", function (event) {
        this.vertices = overlay.getPath().getArray();
      });
    },
    overlayRemoveListener: function overlayRemoveListener(overlay) {
      var is_restore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var drawed_map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var not_remove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var boundary_points = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
      var vm = this;
      if (is_restore == true) {
        document.getElementById("add-line").addEventListener("click", addLine);
      }
      document.getElementById("clear-line").addEventListener("click", clearLine);
      if (not_remove == false) {
        document.getElementById("remove-line").addEventListener("click", removeLine);
      }
      function clearLine() {
        overlay.setMap(null);
        vm.vertices = "";
      }
      function removeLine() {
        overlay.setMap(null);
        vm.vertices = "";
      }
      function addLine() {
        if (drawed_map != "") {
          overlay.setMap(drawed_map);
        } else {
          overlay.setMap(map);
        }
        vm.vertices = boundary_points;
      }
    },
    waitForGoogleMaps: function waitForGoogleMaps() {
      var _this3 = this;
      var checkGoogleMaps = setInterval(function () {
        if ((0,vue2_google_maps__WEBPACK_IMPORTED_MODULE_1__.gmapApi)() && (0,vue2_google_maps__WEBPACK_IMPORTED_MODULE_1__.gmapApi)().maps) {
          _this3.googleMapsLoaded = true;
          clearInterval(checkGoogleMaps);
          _this3.setMap();
        }
      }, 100); // Check every 100ms
    },
    setMap: function setMap() {
      this.id = this.city.id;
      var marker = {
        lat: parseFloat(this.city.latitude),
        lng: parseFloat(this.city.longitude)
      };
      this.markers.push({
        position: marker
      });
      this.center = marker;
      this.infoWindow.position = {
        lat: parseFloat(this.city.latitude),
        lng: parseFloat(this.city.longitude)
      };
      this.infoWindow.template = "<b>".concat(this.city.name, "</b><br>").concat(this.city.formatted_address);
      this.infoWindow.open = true;
      //mapRef

      var boundary_points = this.boundary_points ? JSON.parse(this.boundary_points) : [];
      if (this.city.geolocation_type) {
        var _google = (0,vue2_google_maps__WEBPACK_IMPORTED_MODULE_1__.gmapApi)();
        this.geolocation_type = this.city.geolocation_type;
        this.radius = this.city.radius;
        if (this.city.geolocation_type === "polygon") {
          console.log(boundary_points);
          this.vertices = boundary_points;
          var bermudaTriangle = new _google.maps.Polygon({
            paths: boundary_points,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            editable: true,
            geodesic: true
          });
          bermudaTriangle.setMap(this.map);
          this.overlayRemoveListener(bermudaTriangle, true, this.map, true, boundary_points);
        } else if (this.city.geolocation_type === "circle") {
          this.vertices = this.city.boundary_points;
          var cityCircle = new _google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: this.map,
            center: boundary_points[0],
            radius: Number(this.city.radius)
          });
          this.overlayRemoveListener(cityCircle, true, this.map, true, this.city.boundary_points);
        }
      }
    },
    saveRecord: function saveRecord() {
      var _this4 = this;
      var vm = this;
      this.isLoading = true;
      if (this.vertices) {
        var formObject = this.city;
        var formData = new FormData();
        for (var key in formObject) {
          if (key === 'range_wise_charges') {
            formData.append(key, JSON.stringify(formObject[key]));
          } else {
            formData.append(key, formObject[key]);
          }
        }
        formData.append("geolocation_type", this.geolocation_type);
        formData.append("radius", this.radius);
        if (this.geolocation_type === 'circle') {
          formData.append("boundary_points", this.vertices);
        } else {
          //let boundary_points = JSON.parse(JSON.stringify(this.vertices));
          formData.append("boundary_points", JSON.stringify(this.vertices));
        }
        var url = this.$apiUrl + '/cities/save';
        if (this.city.id) {
          url = this.$apiUrl + '/cities/update';
        }
        axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData).then(function (res) {
          var data = res.data;
          if (data.status === 1) {
            //this.showSuccess(data.message);
            _this4.showMessage("success", data.message);
            setTimeout(function () {
              vm.$swal.close();
              vm.$router.push({
                path: '/cities'
              });
            }, 2000);
          } else {
            vm.showError(data.message);
            vm.isLoading = false;
          }
        })["catch"](function (error) {
          vm.isLoading = false;
          if (error.request.statusText) {
            _this4.showError(error.request.statusText);
          } else if (error.message) {
            _this4.showError(error.message);
          } else {
            _this4.showError("Something went wrong!");
          }
        });
      } else {
        vm.isLoading = false;
        this.showError("Draw Deliverable area on Map");
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/views/City/EditCity.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/City/EditCity.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditCity.vue?vue&type=template&id=a8c9b86c */ "./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c");
/* harmony import */ var _EditCity_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditCity.vue?vue&type=script&lang=js */ "./resources/js/views/City/EditCity.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditCity_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__.render,
  _EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/City/EditCity.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/City/EditCity.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/views/City/EditCity.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCity_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditCity.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCity_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c":
/*!****************************************************************************!*\
  !*** ./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditCity_vue_vue_type_template_id_a8c9b86c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditCity.vue?vue&type=template&id=a8c9b86c */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/City/EditCity.vue?vue&type=template&id=a8c9b86c ***!
  \*******************************************************************************************************************************************************************************************************************/
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
          _c("h3", [_vm._v(_vm._s(_vm.__("manage_city")))]),
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
                  [
                    _vm.city.id
                      ? [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.__("edit")) +
                              "\n                            "
                          ),
                        ]
                      : [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.__("create")) +
                              "\n                            "
                          ),
                        ],
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.__("city")) +
                        "\n                        "
                    ),
                  ],
                  2
                ),
              ]),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 col-sm-12 order-md-1 order-last" }, [
          _c("div", { staticClass: "card h-100" }, [
            _c("div", { staticClass: "card-header" }, [
              _c(
                "h4",
                [
                  _vm.city.id
                    ? [_vm._v(_vm._s(_vm.__("edit")))]
                    : [_vm._v(_vm._s(_vm.__("create")))],
                  _vm._v(
                    "\n                            " +
                      _vm._s(_vm.__("city")) +
                      "\n                        "
                  ),
                ],
                2
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
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
                  _c(
                    "div",
                    { staticClass: "form-group" },
                    [
                      _c("label", { attrs: { for: "city_name" } }, [
                        _vm._v(" " + _vm._s(_vm.__("search_city"))),
                      ]),
                      _vm._v(" "),
                      _c("GmapAutocomplete", {
                        staticClass: "form-control",
                        attrs: {
                          type: "search",
                          placeholder: "Search City on map.",
                          options: {
                            fields: [
                              "address_components",
                              "formatted_address",
                              "geometry",
                              "name",
                              "place_id",
                              "plus_code",
                              "types",
                            ],
                            strictBounds: false,
                          },
                          id: "city_name",
                        },
                        on: { place_changed: _vm.setPlace },
                      }),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.city.formatted_address,
                            expression: "city.formatted_address",
                          },
                        ],
                        attrs: { type: "hidden" },
                        domProps: { value: _vm.city.formatted_address },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.city,
                              "formatted_address",
                              $event.target.value
                            )
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "text text-primary" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__(
                              "search_your_city_where_you_will_deliver_the_food_and_to_find_co_ordinates"
                            )
                          )
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "latitude" } }, [
                      _vm._v(_vm._s(_vm.__("latitude")) + " "),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.latitude,
                          expression: "city.latitude",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "latitude",
                        id: "latitude",
                        placeholder: "Enter Latitude.",
                        required: "",
                        readonly: "",
                      },
                      domProps: { value: _vm.city.latitude },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.city, "latitude", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "longitude" } }, [
                      _vm._v(" " + _vm._s(_vm.__("longitude"))),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.longitude,
                          expression: "city.longitude",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "longitude",
                        id: "longitude",
                        placeholder: "Enter Longitude.",
                        required: "",
                        readonly: "",
                      },
                      domProps: { value: _vm.city.longitude },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.city, "longitude", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "name" } }, [
                      _vm._v(" " + _vm._s(_vm.__("city_name"))),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.name,
                          expression: "city.name",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "name",
                        id: "name",
                        placeholder: "Enter City Name.",
                        required: "",
                        readonly: "",
                      },
                      domProps: { value: _vm.city.name },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.city, "name", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "state" } }, [
                      _vm._v(" " + _vm._s(_vm.__("state_name"))),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.state,
                          expression: "city.state",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "state",
                        id: "state",
                        placeholder: "Enter State Name.",
                        required: "",
                        readonly: "",
                      },
                      domProps: { value: _vm.city.state },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.city, "state", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "state" } }, [
                      _vm._v(" " + _vm._s(_vm.__("zone_name"))),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.zone,
                          expression: "city.zone",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "text",
                        name: "zone",
                        id: "zone",
                        placeholder: "Enter Zone Name.",
                        required: "",
                      },
                      domProps: { value: _vm.city.zone },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.city, "zone", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "time_to_travel" } }, [
                      _vm._v(_vm._s(_vm.__("time_to_travel_1km")) + " "),
                      _c("span", { staticClass: "text-danger text-sm" }, [
                        _vm._v("*"),
                      ]),
                      _vm._v(" "),
                      _c("small", [_vm._v("(Enter in minutes)")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.time_to_travel,
                          expression: "city.time_to_travel",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        name: "time_to_travel",
                        id: "time_to_travel",
                        min: "0",
                        max: "999999999",
                        placeholder: "Enter Time to travel 1 (km).",
                        required: "",
                      },
                      domProps: { value: _vm.city.time_to_travel },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.city,
                            "time_to_travel",
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
                      { attrs: { for: "min_amount_for_free_delivery" } },
                      [
                        _vm._v(
                          _vm._s(_vm.__("minimum_amount_for_free_delivery"))
                        ),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                        _vm._v(" "),
                        _c("small", [
                          _vm._v("[ " + _vm._s(_vm.$currency) + " ]"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.min_amount_for_free_delivery,
                          expression: "city.min_amount_for_free_delivery",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        name: "min_amount_for_free_delivery",
                        id: "min_amount_for_free_delivery",
                        placeholder: "Enter Delivarable Maximum Distance in km",
                        min: "0",
                        max: "999999999",
                        required: "",
                      },
                      domProps: {
                        value: _vm.city.min_amount_for_free_delivery,
                      },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.city,
                            "min_amount_for_free_delivery",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group d-none" }, [
                    _c(
                      "label",
                      { attrs: { for: "max_deliverable_distance" } },
                      [
                        _vm._v(
                          " " + _vm._s(_vm.__("maximum_delivarable_distance"))
                        ),
                        _c("span", { staticClass: "text-danger text-xs" }, [
                          _vm._v("*"),
                        ]),
                        _vm._v(" "),
                        _c("small", [_vm._v("[Kilometre]")]),
                      ]
                    ),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.city.max_deliverable_distance,
                          expression: "city.max_deliverable_distance",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        name: "max_deliverable_distance",
                        placeholder: "Enter Delivarable Maximum Distance in km",
                        min: "0",
                        max: "999999999",
                      },
                      domProps: { value: _vm.city.max_deliverable_distance },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.city,
                            "max_deliverable_distance",
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
                      {
                        staticClass: " col-12 col-form-label",
                        attrs: { for: "delivery_charge_method" },
                      },
                      [
                        _vm._v(_vm._s(_vm.__("delivery_charge_methods")) + " "),
                        _c("span", { staticClass: "text-danger text-sm" }, [
                          _vm._v("*"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.city.delivery_charge_method,
                            expression: "city.delivery_charge_method",
                          },
                        ],
                        staticClass: "form-control form-select",
                        attrs: {
                          name: "delivery_charge_method",
                          id: "delivery_charge_method",
                          required: "",
                        },
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
                            _vm.$set(
                              _vm.city,
                              "delivery_charge_method",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v(_vm._s(_vm.__("select_method"))),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "fixed_charge" } }, [
                          _vm._v(_vm._s(_vm.__("fixed_delivery_charges"))),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "per_km_charge" } }, [
                          _vm._v(_vm._s(_vm.__("per_km_delivery_charges"))),
                        ]),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "range_wise_charges" } },
                          [
                            _vm._v(
                              _vm._s(_vm.__("range_wise_delivery_charges"))
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.city.delivery_charge_method === "fixed_charge"
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "fixed_charge" } }, [
                          _vm._v(" " + _vm._s(_vm.__("fix_delivery_charges"))),
                          _c("span", { staticClass: "text-danger text-sm" }, [
                            _vm._v("*"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.city.fixed_charge,
                              expression: "city.fixed_charge",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "number",
                            name: "fixed_charge",
                            id: "fixed_charge",
                            placeholder: "Global Flat Charges",
                            min: "0",
                            max: "999999999",
                            step: "any",
                          },
                          domProps: { value: _vm.city.fixed_charge },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.city,
                                "fixed_charge",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.city.delivery_charge_method === "per_km_charge"
                    ? _c("div", { staticClass: "form-group" }, [
                        _c("label", { attrs: { for: "per_km_charge" } }, [
                          _vm._v(_vm._s(_vm.__("per_km_delivery_charges"))),
                          _c("span", { staticClass: "text-danger text-sm" }, [
                            _vm._v("*"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.city.per_km_charge,
                              expression: "city.per_km_charge",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "number",
                            name: "per_km_charge",
                            id: "per_km_charge",
                            placeholder: "Per Kilometer Delivery Charge",
                            min: "0",
                            max: "999999999",
                            step: "any",
                          },
                          domProps: { value: _vm.city.per_km_charge },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.city,
                                "per_km_charge",
                                $event.target.value
                              )
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.city.boundary_points,
                              expression: "city.boundary_points",
                            },
                          ],
                          staticClass: "form-control d-none",
                          attrs: {
                            type: "text",
                            name: "boundary_points",
                            id: "boundary_points",
                            placeholder: "Boundary Points",
                          },
                          domProps: { value: _vm.city.boundary_points },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.city,
                                "boundary_points",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.city.delivery_charge_method === "range_wise_charges"
                    ? _c(
                        "div",
                        { staticClass: "form-group col-sm-12" },
                        [
                          _c("label", [
                            _vm._v(
                              _vm._s(_vm.__("range_wise_delivery_charges"))
                            ),
                            _c("span", { staticClass: "text-danger text-sm" }, [
                              _vm._v("* "),
                            ]),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "text-secondary text-sm" },
                              [
                                _vm._v(
                                  "(Set Proper ranges for delivery charge. Do not repeat the range value to next range. For e.g. 1-3,4-6)"
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _vm._l(
                            _vm.city.range_wise_charges,
                            function (range, index) {
                              return _c(
                                "div",
                                {
                                  key: (_vm.key = index + 1),
                                  staticClass: "form-group row",
                                },
                                [
                                  _c("div", { staticClass: "col-sm-1" }, [
                                    _vm._v(_vm._s(_vm.key) + "."),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "col-sm-3" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: range.from_range,
                                          expression: "range.from_range",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        name: "from_range[]",
                                        id: "from_range",
                                        placeholder: "From Range",
                                        min: "0",
                                        max: "999999999",
                                      },
                                      domProps: { value: range.from_range },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            range,
                                            "from_range",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "col-sm-1 btn btn-secondary",
                                    },
                                    [_vm._v("To")]
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "col-sm-3" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: range.to_range,
                                          expression: "range.to_range",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        name: "to_range[]",
                                        id: "to_range",
                                        placeholder: "To Range",
                                        min: "0",
                                        max: "999999999",
                                      },
                                      domProps: { value: range.to_range },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            range,
                                            "to_range",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "col-sm-3" }, [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: range.price,
                                          expression: "range.price",
                                        },
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "number",
                                        name: "price[]",
                                        id: "price",
                                        placeholder: "Price",
                                        min: "0",
                                        max: "999999999",
                                        step: "any",
                                      },
                                      domProps: { value: range.price },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            range,
                                            "price",
                                            $event.target.value
                                          )
                                        },
                                      },
                                    }),
                                  ]),
                                  _vm._v(" "),
                                  index === 0
                                    ? _c("div", { staticClass: "col-sm-1" }, [
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
                                            staticStyle: { cursor: "pointer" },
                                            attrs: { title: "Add Row" },
                                            on: { click: _vm.addRow },
                                          },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "fa fa-plus-square fa-2x",
                                            }),
                                          ]
                                        ),
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  index !== 0
                                    ? _c("div", { staticClass: "col-sm-1" }, [
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
                                            staticStyle: { cursor: "pointer" },
                                            attrs: { title: "Remove Row" },
                                            on: {
                                              click: function ($event) {
                                                return _vm.remove(index)
                                              },
                                            },
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fa fa-times fa-2x",
                                            }),
                                          ]
                                        ),
                                      ])
                                    : _vm._e(),
                                ]
                              )
                            }
                          ),
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "submit" },
                      },
                      [_vm._v(" " + _vm._s(_vm.__("save")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary",
                        attrs: { type: "reset" },
                      },
                      [_vm._v(_vm._s(_vm.__("clear")))]
                    ),
                  ]),
                ]
              ),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "col-6 col-md-6 order-md-1 order-last map_view_desktop",
          },
          [
            _c("div", { staticClass: "card h-100" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticStyle: { position: "relative", overflow: "hidden" },
                    attrs: { id: "map" },
                  },
                  [
                    _c(
                      "GmapMap",
                      {
                        ref: "mapRef",
                        staticStyle: {
                          width: "100%",
                          height: "700px",
                          "margin-top": "5px",
                        },
                        attrs: {
                          zoom: 13,
                          center: _vm.center,
                          mapTypeControl: true,
                          drawingControl: true,
                        },
                      },
                      [
                        _vm._l(_vm.markers, function (m, index) {
                          return _c("GmapMarker", {
                            key: index,
                            attrs: {
                              position: _vm.google && m.position,
                              clickable: true,
                              draggable: true,
                            },
                            on: {
                              click: function ($event) {
                                _vm.center = m.position
                              },
                            },
                          })
                        }),
                        _vm._v(" "),
                        _c(
                          "gmap-info-window",
                          {
                            attrs: {
                              options: {
                                maxWidth: 300,
                                pixelOffset: { width: 0, height: -35 },
                              },
                              position: _vm.infoWindow.position,
                              opened: _vm.infoWindow.open,
                            },
                            on: {
                              closeclick: function ($event) {
                                _vm.infoWindow.open = false
                              },
                            },
                          },
                          [
                            _c("div", {
                              domProps: {
                                innerHTML: _vm._s(_vm.infoWindow.template),
                              },
                            }),
                          ]
                        ),
                      ],
                      2
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.city.formatted_address
                  ? _c("div", [
                      _c("span", { staticClass: "title font-weight-bolder" }, [
                        _vm._v(_vm._s(_vm.city.formatted_address)),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group d-none" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.vertices,
                        expression: "vertices",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      name: "vertices",
                      id: "vertices",
                      placeholder:
                        "here will be your selected outlines latitude and longitude",
                      cols: "10",
                      rows: "2",
                    },
                    domProps: { value: _vm.vertices },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.vertices = $event.target.value
                      },
                    },
                  }),
                ]),
              ]),
            ]),
          ]
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h4", [_vm._v("Map View")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "offset-3 mt-1" }, [
      _c(
        "button",
        {
          staticClass: "badge bg-primary",
          attrs: { type: "button", id: "remove-line" },
        },
        [_vm._v("Remove Newly Added Line")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "badge bg-danger",
          attrs: { type: "button", id: "clear-line" },
        },
        [_vm._v("Clear Map")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "badge bg-success",
          attrs: { type: "button", id: "add-line" },
        },
        [_vm._v("Restore Old Map")]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "label",
      { staticClass: "control-label", attrs: { for: "vertices" } },
      [
        _vm._v("Boundry Points"),
        _c("span", { staticClass: "text-danger text-xs" }, [_vm._v("*")]),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);