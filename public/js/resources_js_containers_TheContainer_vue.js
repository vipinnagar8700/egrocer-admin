"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_containers_TheContainer_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheSidebar */ "./resources/js/containers/TheSidebar.vue");
/* harmony import */ var _TheFooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheFooter */ "./resources/js/containers/TheFooter.vue");
/* harmony import */ var _VerticalHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalHeader */ "./resources/js/containers/VerticalHeader.vue");
/* harmony import */ var _Auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Auth */ "./resources/js/Auth.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'TheContainer',
  components: {
    TheSidebar: _TheSidebar__WEBPACK_IMPORTED_MODULE_0__["default"],
    TheFooter: _TheFooter__WEBPACK_IMPORTED_MODULE_1__["default"],
    VerticalHeader: _VerticalHeader__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  created: function created() {
    // this.updateCurrency(window.localStorage.getItem('currency'));
    this.closeSideBarMenu();
    this.checkPermissions();
  },
  watch: {
    '$route': 'checkPermissions'
  },
  mounted: function mounted() {
    //lang
    if (window.localStorage.getItem('lang')) {
      this.lang = window.localStorage.getItem('lang');
      console.log(this.lang);
    }
    function slideToggle(t, e, o) {
      0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o);
    }
    function slideUp(t, e, o) {
      j(t, e, o);
    }
    function slideDown(t, e, o) {
      j(t, e, o, !0);
    }
    function j(t, e, o, i) {
      void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block");
      var p,
        l = window.getComputedStyle(t),
        n = parseFloat(l.getPropertyValue("height")),
        a = parseFloat(l.getPropertyValue("padding-top")),
        s = parseFloat(l.getPropertyValue("padding-bottom")),
        r = parseFloat(l.getPropertyValue("margin-top")),
        d = parseFloat(l.getPropertyValue("margin-bottom")),
        g = n / e,
        y = a / e,
        m = s / e,
        u = r / e,
        h = d / e;
      window.requestAnimationFrame(function l(x) {
        void 0 === p && (p = x);
        var f = x - p;
        i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l);
      });
    }
    var sidebarItems = document.querySelectorAll('.sidebar-item.has-sub');
    var _loop = function _loop() {
      var sidebarItem = sidebarItems[i];
      sidebarItems[i].querySelector('.sidebar-link').addEventListener('click', function (e) {
        var _submenu$classList, _submenu$classList2, _submenu$classList3;
        e.preventDefault();
        var submenu = sidebarItem.querySelector('.submenu');
        if (submenu !== null && submenu !== void 0 && (_submenu$classList = submenu.classList) !== null && _submenu$classList !== void 0 && _submenu$classList.contains('active')) submenu.style.display = "block";
        if (submenu.style.display == "none") submenu === null || submenu === void 0 ? void 0 : (_submenu$classList2 = submenu.classList) === null || _submenu$classList2 === void 0 ? void 0 : _submenu$classList2.add('active');else submenu === null || submenu === void 0 ? void 0 : (_submenu$classList3 = submenu.classList) === null || _submenu$classList3 === void 0 ? void 0 : _submenu$classList3.remove('active');
        slideToggle(submenu, 300);
      });
    };
    for (var i = 0; i < sidebarItems.length; i++) {
      _loop();
    }
    window.addEventListener('DOMContentLoaded', function (event) {
      var w = window.innerWidth;
      if (w < 1200) {
        var _document$getElementB, _document$getElementB2;
        (_document$getElementB = document.getElementById('sidebar')) === null || _document$getElementB === void 0 ? void 0 : (_document$getElementB2 = _document$getElementB.classList) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.remove('active');
      }
    });
    window.addEventListener('resize', function (event) {
      var w = window.innerWidth;
      if (w < 1200) {
        var _document$getElementB3, _document$getElementB4;
        (_document$getElementB3 = document.getElementById('sidebar')) === null || _document$getElementB3 === void 0 ? void 0 : (_document$getElementB4 = _document$getElementB3.classList) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.remove('active');
      } else {
        var _document$getElementB5, _document$getElementB6;
        (_document$getElementB5 = document.getElementById('sidebar')) === null || _document$getElementB5 === void 0 ? void 0 : (_document$getElementB6 = _document$getElementB5.classList) === null || _document$getElementB6 === void 0 ? void 0 : _document$getElementB6.add('active');
      }
    });
    document.querySelector('.burger-btn').addEventListener('click', function () {
      var _document$getElementB7, _document$getElementB8;
      (_document$getElementB7 = document.getElementById('sidebar')) === null || _document$getElementB7 === void 0 ? void 0 : (_document$getElementB8 = _document$getElementB7.classList) === null || _document$getElementB8 === void 0 ? void 0 : _document$getElementB8.toggle('active');
    });
    document.querySelector('.sidebar-hide').addEventListener('click', function () {
      var _document$getElementB9, _document$getElementB10;
      (_document$getElementB9 = document.getElementById('sidebar')) === null || _document$getElementB9 === void 0 ? void 0 : (_document$getElementB10 = _document$getElementB9.classList) === null || _document$getElementB10 === void 0 ? void 0 : _document$getElementB10.toggle('active');
    });
    // Perfect Scrollbar Init
    if (typeof PerfectScrollbar["default"] == 'function') {
      var container = document.querySelector(".sidebar-wrapper");
      var ps = new PerfectScrollbar["default"](container, {
        wheelPropagation: false
      });
    }

    // Scroll into active sidebar
    if (document.querySelector('.sidebar-item.active')) {
      document.querySelector('.sidebar-item.active').scrollIntoView(false);
    }
  },
  data: function data() {
    return {
      lang: 'en',
      search: '',
      isLoading: false,
      suspecious: null,
      sidebarItems: [{
        name: __('dashboard'),
        icon: 'tachometer-alt',
        url: '/dashboard',
        permission: 'manage_dashboard'
      }, {
        name: __('orders'),
        icon: 'shopping-cart',
        url: '/orders',
        permission: 'order_list'
      }, {
        name: __('categories'),
        icon: 'bullseye',
        permission: 'category_list',
        submenu: [{
          name: __('add_category'),
          icon: 'grid-fill',
          url: '/manage_categories/create',
          permission: 'category_create'
        }, {
          name: __('manage_categories'),
          icon: 'grid-fill',
          url: '/manage_categories',
          permission: 'category_list'
        }, {
          name: __('order_categories'),
          icon: 'grid-fill',
          url: '/categories_order',
          permission: 'manage_categories_order'
        }]
      }, {
        name: __('products'),
        icon: 'cubes',
        permission: 'product_list',
        submenu: [{
          name: __('add_product'),
          icon: 'grid-fill',
          url: '/manage_products/create',
          permission: 'product_create'
        }, {
          name: __('manage_products'),
          icon: 'grid-fill',
          url: '/manage_products',
          permission: 'product_list'
        }, {
          name: __('approve_requests'),
          icon: 'grid-fill',
          url: '/approve_requests',
          permission: 'approve_requests'
        }, {
          name: __('units'),
          icon: 'grid-fill',
          url: '/units',
          permission: 'manage_units'
        }, {
          name: __('product_ratings'),
          icon: 'grid-fill',
          url: '/product_ratings',
          permission: 'product_ratings'
        }, {
          name: __('media'),
          icon: 'grid-fill',
          url: '/media',
          permission: 'manage_media'
        }, {
          name: __('bulk_upload'),
          icon: 'grid-fill',
          url: '/bulk_upload',
          permission: 'manage_product_bulk_upload'
        }, {
          name: __('bulk_update'),
          icon: 'grid-fill',
          url: '/bulk_update',
          permission: 'manage_product_bulk_upload'
        }, {
          name: __('taxes'),
          icon: 'grid-fill',
          url: '/taxes',
          permission: 'taxes'
        }, {
          name: __('brands'),
          icon: 'grid-fill',
          url: '/brands',
          permission: 'brands'
        }, {
          name: __('product_order'),
          icon: 'grid-fill',
          url: '/product_order',
          permission: 'manage_product_order'
        }]
      }, {
        name: __('stock_management'),
        icon: 'cubes',
        url: '/manage_stock',
        permission: 'stock_management'
      }, {
        name: __('sellers'),
        icon: 'male',
        permission: 'seller_list',
        submenu: [{
          name: __('add_seller'),
          icon: 'grid-fill',
          url: '/sellers/create',
          permission: 'seller_create'
        }, {
          name: __('seller_requests'),
          icon: 'grid-fill',
          url: '/registered_sellers',
          permission: 'seller_requests'
        }, {
          name: __('manage_sellers'),
          icon: 'grid-fill',
          url: '/sellers',
          permission: 'seller_list'
        },
        // {
        //     name: __('seller_commissions'),
        //     icon : 'grid-fill',
        //     url:'/seller_commissions',
        //     permission:'seller_list',
        // },
        {
          name: __('seller_wallet_transactions'),
          icon: 'grid-fill',
          url: '/seller_wallet_transactions',
          permission: 'seller_wallet_transactions'
        }, {
          name: __('policies_seller'),
          icon: 'grid-fill',
          url: '/privacy_policy_seller',
          permission: 'manage_privacy_policy_seller_app'
        }]
      }, {
        name: __('home_sliders'),
        icon: 'picture-o',
        permission: 'home_slider_image_list',
        submenu: [{
          name: __('add_home_slider'),
          icon: 'grid-fill',
          url: '/home_sliders/create',
          permission: 'home_slider_image_create'
        }, {
          name: __('manager_home_sliders'),
          icon: 'grid-fill',
          url: '/home_sliders',
          permission: 'home_slider_image_list'
        }]
      }, {
        name: __('offer_image'),
        icon: 'gift',
        permission: 'new_offer_image_list',
        submenu: [{
          name: __('add_offer_image'),
          icon: 'grid-fill',
          url: '/offers/create',
          permission: 'new_offer_image_create'
        }, {
          name: __('manage_offer_images'),
          icon: 'grid-fill',
          url: '/offers',
          permission: 'new_offer_image_list'
        }, {
          name: __('manage_popup_offer'),
          icon: 'grid-fill',
          url: '/popup',
          permission: 'new_offer_image_list'
        }]
      }, {
        name: __('promo_code'),
        icon: 'gift',
        permission: 'promo_code_list',
        submenu: [{
          name: __('add_promo_code'),
          icon: 'grid-fill',
          url: '/promo_code/create',
          permission: 'promo_code_create'
        }, {
          name: __('manage_promo_code'),
          icon: 'grid-fill',
          url: '/promo_code',
          permission: 'promo_code_list'
        }]
      }, {
        name: __('featured_sections'),
        icon: 'puzzle-piece',
        permission: 'featured_section_list',
        submenu: [{
          name: __('add_section'),
          icon: 'grid-fill',
          url: '/sections/create',
          permission: 'featured_section_create'
        }, {
          name: __('manage_section'),
          icon: 'grid-fill',
          url: '/sections',
          permission: 'featured_section_list'
        }
        // {
        //     name: __('order_section'),
        //     icon : 'grid-fill',
        //     url:'/section_order',
        //     permission:'featured_section_create',
        // },
        ]
      }, {
        name: __('return_requests'),
        icon: 'retweet',
        url: '/return_requests',
        permission: 'return_request_list'
      }, {
        name: __('withdrawal_requests'),
        icon: 'credit-card',
        url: '/withdrawal_requests',
        permission: 'withdrawal_request_list'
      }, {
        name: __('delivery_boys'),
        icon: 'male',
        permission: 'delivery_boy_list',
        submenu: [{
          name: __('add_delivery_boy'),
          icon: 'grid-fill',
          url: '/delivery_boys/create',
          permission: 'delivery_boy_create'
        }, {
          name: __('dlivery_boy_requests'),
          icon: 'grid-fill',
          url: '/registered_delivery_boys',
          permission: 'delivery_boy_list'
        }, {
          name: __('manage_delivery_boys'),
          icon: 'grid-fill',
          url: '/delivery_boys',
          permission: 'delivery_boy_list'
        }, {
          name: __('fund_transfers'),
          icon: 'grid-fill',
          url: '/fund_transfers',
          permission: 'fund_transfers_list'
        }, {
          name: __('delivery_boy_cash'),
          icon: 'grid-fill',
          url: '/cash_collection',
          permission: 'cash_collection_list'
        }, {
          name: __('delivery_boy_policies'),
          icon: 'grid-fill',
          url: '/privacy_policy_delivery_boy',
          permission: 'manage_privacy_policy_delivery_boy'
        }]
      }, {
        name: __('notifications'),
        icon: 'share-square',
        url: '/notifications',
        permission: 'notification_list',
        submenu: [{
          name: __('send_notifications'),
          icon: 'grid-fill',
          url: '/notifications/create',
          permission: 'notification_create'
        }, {
          name: __('manage_notifications'),
          icon: 'grid-fill',
          url: '/notifications',
          permission: 'notification_list'
        }]
      }, {
        name: __('email'),
        icon: 'share-square',
        url: '/emails',
        permission: 'email_templates',
        submenu: [{
          name: __('email_templates'),
          icon: 'grid-fill',
          url: '/email_templates',
          permission: 'email_templates'
        }, {
          name: __('manage_emails'),
          icon: 'grid-fill',
          url: '/emails',
          permission: 'manage_emails'
        }]
      }, {
        name: __('system'),
        icon: 'wrench',
        permission: 'manage_time_slots',
        submenu: [{
          name: __('store_settings'),
          icon: 'grid-fill',
          url: '/store_settings',
          permission: 'manage_store_settings'
        }, {
          name: __('delivery_settings'),
          icon: 'grid-fill',
          url: '/delivery_settings',
          permission: 'manage_time_slots'
        }, {
          name: __('payment_methods'),
          icon: 'grid-fill',
          url: '/payment_methods',
          permission: 'manage_payment_methods'
        }, {
          name: __('contact_us'),
          icon: 'grid-fill',
          url: '/contact_us',
          permission: 'manage_contact_us'
        }, {
          name: __('about_us'),
          icon: 'grid-fill',
          url: '/about_us',
          permission: 'manage_about_us'
        }, {
          name: __('firebase_settings'),
          icon: 'grid-fill',
          url: '/firebase-settings',
          permission: 'manage_store_settings'
        }, {
          name: __('sms_settings'),
          icon: 'grid-fill',
          url: '/sms-settings',
          permission: 'manage_store_settings'
        }, {
          name: __('sms_templates'),
          icon: 'grid-fill',
          url: '/sms-templates',
          permission: 'manage_store_settings'
        }, {
          name: __('seo_settings'),
          icon: 'grid-fill',
          url: '/seo-settings',
          permission: 'manage_store_settings'
        }, {
          name: __('system_registration'),
          icon: 'grid-fill',
          url: '/purchase_code',
          permission: 'manage_system_registration'
        }, {
          name: __('system_updater'),
          icon: 'grid-fill',
          url: '/system_updater',
          permission: 'manage_store_settings'
        }]
      }, {
        name: __('web_settings'),
        // icon : 'gear fa-spin',
        icon: 'gear',
        permission: 'general_settings',
        submenu: [{
          name: __('general_web_settings'),
          icon: 'grid-fill',
          url: '/general_settings',
          permission: 'general_settings'
        }, {
          name: __('social_media'),
          icon: 'grid-fill',
          url: '/social_media',
          permission: 'manage_social_media_list'
        }]
      }, {
        name: __('languages'),
        icon: 'language',
        permission: 'city_list',
        submenu: [{
          name: __('add_language'),
          icon: 'grid-fill',
          url: '/languages/create',
          permission: 'manage_dashboard'
        }, {
          name: __('manage_languages'),
          icon: 'grid-fill',
          url: '/languages',
          permission: 'manage_dashboard'
        }]
      }, {
        name: __('countries'),
        icon: 'globe-asia',
        permission: 'city_list',
        submenu: [{
          name: __('add_country'),
          icon: 'grid-fill',
          url: '/countries/create',
          permission: 'manage_dashboard'
        }, {
          name: __('manage_countries'),
          icon: 'grid-fill',
          url: '/countries',
          permission: 'manage_dashboard'
        }]
      }, {
        name: __('location'),
        icon: 'map',
        permission: 'city_list',
        submenu: [{
          name: __('add_city'),
          icon: 'grid-fill',
          url: '/cities/create',
          permission: 'manage_dashboard'
        }, {
          name: __('manage_cities'),
          icon: 'grid-fill',
          url: '/cities',
          permission: 'manage_dashboard'
        }
        // ,{
        //     name: __('deliverable_area'),
        //     icon: 'grid-fill',
        //     url: '/deliverable_area',
        //     permission:'manage_dashboard',
        // }
        ]
      }, {
        name: __('customers'),
        icon: 'male',
        permission: 'customer_list',
        submenu: [{
          name: __('customers'),
          icon: 'grid-fill',
          url: '/users',
          permission: 'customer_list'
        }, {
          name: __('wishlists'),
          icon: 'grid-fill',
          url: '/wishlists',
          permission: 'manage_wishlists'
        }, {
          name: __('wallet_transactions'),
          icon: 'grid-fill',
          url: '/wallet_transactions',
          permission: 'transaction_list'
        }, {
          name: __('transactions'),
          icon: 'grid-fill',
          url: '/transactions',
          permission: 'transaction_list'
        }, {
          name: __('customer_policies'),
          icon: 'grid-fill',
          url: '/privacy_policy',
          permission: 'manage_privacy_policy'
        }]
      }, {
        name: __('reports'),
        icon: 'folder-open',
        permission: 'product_sales_reports',
        submenu: [{
          name: __('product_sales_report'),
          icon: 'grid-fill',
          url: '/product_sales_reports',
          permission: 'product_sales_reports'
        }, {
          name: __('sales_reports'),
          icon: 'grid-fill',
          url: '/sales_reports',
          permission: 'sales_reports'
        }]
      }, {
        name: __('system_users'),
        icon: 'users',
        url: '/system_users',
        role: true
      }, {
        name: __('role'),
        icon: 'user-secret',
        url: '/role',
        role: true
      }, {
        name: __('faqs'),
        icon: 'info',
        url: '/faqs',
        permission: 'faq_list'
      }],
      databasedownloadBtn: [{
        name: __('database_backup'),
        icon: 'info',
        permission: 'database_backup_download'
      }]
    };
  },
  computed: {
    filteredSidebarItems: function filteredSidebarItems() {
      return this.sidebarItems;
    },
    filteredDatabaseDownloadBtn: function filteredDatabaseDownloadBtn() {
      return this.databasedownloadBtn;
    }
  },
  methods: {
    filterItem: function filterItem() {
      var filter = this.search;
      $(".sidebar-menu li:not(.sidebar-search)").each(function (index, element) {
        var item = $(element);
        var parentListIsNested = item.closest('ul').hasClass('submenu');
        if (item.text().match(new RegExp(filter, 'gi'))) {
          item.fadeIn();
          if (parentListIsNested) {
            item.closest('ul').removeClass('active');
          }
        } else {
          item.fadeOut();
          if (parentListIsNested) {
            item.closest('ul').addClass('active');
          }
        }
      });
    },
    subIsActive: function subIsActive(item) {
      var _this = this;
      var paths = Array.isArray(item.submenu) ? item.submenu : [];
      return paths.some(function (path) {
        return _this.$route.path.indexOf(path.url) === 0;
      });
    },
    isActive: function isActive(url) {
      if (this.$route.path == url) {
        return true;
      }
      return false;
    },
    isHasSub: function isHasSub(item) {
      if (item.hasOwnProperty("submenu")) {
        if (item.submenu.length > 0) {
          return true;
        }
      }
      return false;
    },
    checkPermissions: function checkPermissions() {
      var current_path = this.$route.path;
      var permission = '';
      this.sidebarItems.forEach(function (menu) {
        //Only Main Categories
        if (menu.submenu && menu.submenu.length > 0) {
          menu.submenu.forEach(function (submenu) {
            if (submenu.url === current_path) {
              permission = submenu.permission;
            }
          });
        } else {
          if (menu.url === current_path) {
            permission = menu.permission;
          }
        }
      });
      if (_Auth__WEBPACK_IMPORTED_MODULE_3__["default"].check() && UserPermissions.length === 0) {
        //this.$router.push({path:'/login'});
        if (window.localStorage.getItem('loginCheck') == 1) {
          _Auth__WEBPACK_IMPORTED_MODULE_3__["default"].logout();
        }
        window.localStorage.setItem('loginCheck', 1);
        window.location.reload();
      } else if (_Auth__WEBPACK_IMPORTED_MODULE_3__["default"].check() && permission && !this.$can(permission)) {
        this.$router.push({
          path: '/unauthorized'
        });
      }
    },
    closeSideBarMenu: function closeSideBarMenu() {
      var w = window.innerWidth;
      if (w < 1200) {
        var _document$getElementB11, _document$getElementB12;
        (_document$getElementB11 = document.getElementById('sidebar')) === null || _document$getElementB11 === void 0 ? void 0 : (_document$getElementB12 = _document$getElementB11.classList) === null || _document$getElementB12 === void 0 ? void 0 : _document$getElementB12.remove('active');
      }
    },
    downloadDatabase: function downloadDatabase() {
      var _this2 = this;
      this.isLoading = true;
      axios__WEBPACK_IMPORTED_MODULE_4___default()({
        method: 'get',
        url: this.$apiUrl + '/database_backup_download',
        responseType: 'blob' // important: responseType must be 'blob' for file download
      }).then(function (response) {
        var blob = new Blob([response.data]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // Extracting the filename from the response headers
        var contentDisposition = response.headers['content-disposition'];
        var filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+?)"/);
        var filename = filenameMatch ? filenameMatch[1] : 'downloaded-database-backup.sql';
        link.download = filename;
        link.click();
        _this2.showMessage("success", __('database_downloaded_successfully'));
        _this2.isLoading = false;
      })["catch"](function (error) {
        console.error('Error downloading file:', error);
        // Handle error accordingly
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
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
  name: 'TheFooter',
  data: function data() {
    return {
      copyrightDetails: window.copyrightDetails,
      currentVersion: window.currentVersion
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'TheSidebar',
  data: function data() {
    return {
      //minimize: false,
      nav: [],
      //show: true,
      buffor: []
    };
  },
  computed: {
    show: function show() {
      //return this.$store.state.sidebarShow
    },
    minimize: function minimize() {
      //return this.$store.state.sidebarMinimize
    }
  },
  methods: {
    dropdown: function dropdown(data) {
      var result = {
        _name: 'CSidebarNavDropdown',
        name: data['name'],
        route: data['href'],
        icon: data['icon'],
        _children: []
      };
      for (var i = 0; i < data['elements'].length; i++) {
        if (data['elements'][i]['slug'] == 'dropdown') {
          result._children.push(this.dropdown(data['elements'][i]));
        } else {
          result._children.push({
            _name: 'CSidebarNavItem',
            name: data['elements'][i]['name'],
            to: data['elements'][i]['href'],
            icon: data['elements'][i]['icon']
          });
        }
      }
      return result;
    },
    rebuildData: function rebuildData(data) {
      this.buffor = [{
        _name: 'CSidebarNav',
        _children: []
      }];
      for (var k = 0; k < data.length; k++) {
        switch (data[k]['slug']) {
          case 'link':
            if (data[k]['href'].indexOf('http') !== -1) {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                href: data[k]['href'],
                icon: data[k]['icon'],
                target: '_blank'
              });
            } else {
              this.buffor[0]._children.push({
                _name: 'CSidebarNavItem',
                name: data[k]['name'],
                to: data[k]['href'],
                icon: data[k]['icon']
              });
            }
            break;
          case 'title':
            this.buffor[0]._children.push({
              _name: 'CSidebarNavTitle',
              _children: [data[k]['name']]
            });
            break;
          case 'dropdown':
            this.buffor[0]._children.push(this.dropdown(data[k]));
            break;
        }
      }
      return this.buffor;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$root.$on('toggle-sidebar', function () {
      var sidebarOpened = _this.show === true || _this.show === 'responsive';
      _this.show = sidebarOpened ? false : 'responsive';
    });
    this.$root.$on('toggle-sidebar-mobile', function () {
      var sidebarClosed = _this.show === 'responsive' || _this.show === false;
      _this.show = sidebarClosed ? true : 'responsive';
    });
    var self = this;
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(this.$apiAdress + '/api/menu?token=' + localStorage.getItem("api_token")).then(function (response) {
      self.nav = self.rebuildData(response.data);
    })["catch"](function (error) {
      self.$router.push({
        path: '/login'
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Auth.js */ "./resources/js/Auth.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      lang: 'en',
      user: _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user,
      role: Role,
      profile_url: Role === 'Seller' ? _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.seller.logo_url : Role === 'Delivery Boy' ? this.$baseUrl + '/images/admin_logo.png' : this.$baseUrl + '/images/admin_logo.png',
      notifications: [],
      userTheme: "theme-light",
      isToggle: false,
      popoverShow: false,
      isSystemRefreshing: false,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      languages: [],
      notifications_unread_count: 0,
      defaultLanguage: []
    };
  },
  computed: {
    isSellerRoute: function isSellerRoute() {
      // Use this.$route to access the current route
      return this.$route.path.startsWith('/seller/');
    }
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('DOMContentLoaded', this.onResize);
  },
  mounted: function mounted() {
    var _this = this;
    this.$nextTick(function () {
      window.addEventListener('resize', _this.onResize);
      window.addEventListener('DOMContentLoaded', _this.onResize);
    });

    //const initUserTheme = this.getMediaPreference() || this.getTheme();
    var initUserTheme = this.getTheme();
    this.setTheme(initUserTheme);
    if (window.localStorage.getItem('lang')) {
      this.lang = window.localStorage.getItem('lang');
    }
    this.timer = setInterval(function () {
      _this.getNotifications();
    }, 40000); // 40 seconds

    this.getLanguage();
  },
  created: function created() {
    this.getNotifications();
  },
  methods: {
    logout: function logout() {
      var _this2 = this;
      var role_id = _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].user.role_id;
      _Auth_js__WEBPACK_IMPORTED_MODULE_0__["default"].logout();
      setTimeout(function () {
        if (role_id === 3) {
          _this2.$router.push('/seller/login');
        } else if (role_id === 4) {
          _this2.$router.push('/delivery_boy/login');
        } else {
          _this2.$router.push('/login');
        }
        // window.location.reload();
      }, 500);
    },
    changeLanguage: function changeLanguage(event) {
      var _this3 = this;
      // Update the selected language based on the change event
      this.lang = event.target.value;
      window.localStorage.setItem('lang', this.lang);
      this.isLoading = true;
      var data = {
        language: this.lang
      };
      axios__WEBPACK_IMPORTED_MODULE_1___default().post(this.$apiUrl + '/change_language', data).then(function (response) {
        _this3.isLoading = false;
        // Check if the selected language is Arabic, and add the 'rtl' class to the body
        if (_this3.lang === 'ar') {
          document.body.classList.add('rtl');
        } else {
          // Remove 'rtl' class for other languages
          document.body.classList.remove('rtl');
        }
        // No need to reload the page, just update the default language
        _this3.updateDefaultLanguage(_this3.lang);
        window.location.reload();
      });
    },
    updateDefaultLanguage: function updateDefaultLanguage(newDefaultLanguage) {
      // Update the default language in the languages array
      this.languages.forEach(function (language) {
        if (language.code === newDefaultLanguage) {
          language.is_default = 1;
        } else {
          language.is_default = 0;
        }
      });
    },
    getLanguage: function getLanguage() {
      var _this4 = this;
      this.isLoading = true;
      var data = {
        params: {
          system_type: 4
        }
      };
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/system_languages', data).then(function (response) {
        _this4.isLoading = false;
        var data = response.data;
        if (data && Array.isArray(data.data)) {
          _this4.languages = data.data;
          _this4.totalRows = _this4.languages.length;
        } else {
          _this4.languages = [];
          _this4.totalRows = 0;
        }

        // Find the default language and set it as the initial value of selectedLanguage
        var defaultLanguage = _this4.languages.find(function (language) {
          return language.is_default === 1;
        });
        if (defaultLanguage) {
          _this4.selectedLanguage = defaultLanguage.code;
          window.localStorage.setItem('lang', _this4.selectedLanguage);
        }
        console.log(defaultLanguage.code);
      })["catch"](function (error) {
        _this4.isLoading = false;
        console.error('Error fetching languages:', error);
      });
    },
    getNotifications: function getNotifications(event) {
      var _this5 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/get_top_notifications').then(function (response) {
        _this5.notifications = response.data.data.notifications;
        _this5.notifications_unread_count = response.data.data.unread;
      });
    },
    markAsReadNotification: function markAsReadNotification(notification) {
      var _this6 = this;
      if (notification.read_at == null) {
        axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$apiUrl + '/notification_read?id=' + notification.id).then(function (response) {
          _this6.getNotifications();
        });
      }
    },
    changeDateTime: function changeDateTime(dateTime) {
      return moment(dateTime).fromNow();
    },
    setTheme: function setTheme(theme) {
      sessionStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.body.className = theme;
    },
    getMediaPreference: function getMediaPreference() {
      var hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (hasDarkPreference) {
        return "theme-dark";
      } else {
        return "theme-light";
      }
    },
    getTheme: function getTheme() {
      var user_theme = sessionStorage.getItem("user-theme");
      this.userTheme = user_theme;
      return user_theme;
    },
    toggleTheme: function toggleTheme() {
      var activeTheme = sessionStorage.getItem("user-theme");
      if (activeTheme === "theme-light" || activeTheme == "" || activeTheme == "undefined" || activeTheme == "null") {
        this.setTheme("theme-dark");
      } else {
        this.setTheme("theme-light");
      }
    },
    onResize: function onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
    clearCache: function clearCache() {
      var vm = this;
      vm.isSystemRefreshing = true;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get(this.$baseUrl + '/clear').then(function (response) {
        var data = response.data;
        if (data.status === 1) {
          setTimeout(function () {
            vm.showMessage("success", data.message);
            vm.isSystemRefreshing = false;
            vm.popoverShow = false;
            window.location.reload();
          }, 2000);
        } else {
          vm.showError(data.message);
          vm.isSystemRefreshing = false;
        }
      })["catch"](function (error) {
        var _error$request;
        vm.isSystemRefreshing = false;
        if (error !== null && error !== void 0 && (_error$request = error.request) !== null && _error$request !== void 0 && _error$request.statusText) {
          vm.showError(error.request.statusText);
        } else if (error.message) {
          vm.showError(error.message);
        } else {
          vm.showError(__('something_went_wrong'));
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.fade-enter-active[data-v-59a2dd7f],\n.fade-leave-active[data-v-59a2dd7f] {\n    transition: opacity 0.3s;\n}\n.fade-enter[data-v-59a2dd7f],\n.fade-leave-to[data-v-59a2dd7f] {\n    opacity: 0;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.switch-checkbox {\n    display: none;\n}\n:root {\n    --background-color-primary: #ebebeb;\n    --background-color-secondary: #fafafa;\n    --accent-color: #cacaca;\n    --text-primary-color: #222;\n    --element-size: 4rem; /* <- this is the base size of our element */\n}\n.switch-label {\n    /* for width, use the standard element-size */\n    width: var(--element-size);\n\n    /* for other dimensions, calculate values based on it */\n    border-radius: var(--element-size);\n    border: calc(var(--element-size) * 0.025) solid var(--accent-color);\n    padding: calc(var(--element-size) * 0.1);\n    font-size: calc(var(--element-size) * 0.3);\n    height: calc(var(--element-size) * 0.35);\n\n    align-items: center;\n    background: var(--text-primary-color);\n    cursor: pointer;\n    display: flex;\n    position: relative;\n    transition: background 0.5s ease;\n    justify-content: space-between;\n    z-index: 1;\n}\n.switch-toggle {\n    position: absolute;\n    background-color: var(--background-color-primary);\n    border-radius: 50%;\n    top: calc(var(--element-size) * 0.07);\n    left: calc(var(--element-size) * 0.07);\n    height: calc(var(--element-size) * 0.4);\n    width: calc(var(--element-size) * 0.4);\n    transform: translateX(0);\n    transition: transform 0.3s ease, background-color 0.5s ease;\n}\n.switch-toggle-checked {\n    transform: translateX(calc(var(--element-size) * 0.6)) !important;\n}\n\n\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_style_index_0_id_59a2dd7f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_style_index_0_id_59a2dd7f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_style_index_0_id_59a2dd7f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/containers/TheContainer.vue":
/*!**************************************************!*\
  !*** ./resources/js/containers/TheContainer.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true */ "./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true");
/* harmony import */ var _TheContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheContainer.vue?vue&type=script&lang=js */ "./resources/js/containers/TheContainer.vue?vue&type=script&lang=js");
/* harmony import */ var _TheContainer_vue_vue_type_style_index_0_id_59a2dd7f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css */ "./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TheContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "59a2dd7f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheContainer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheFooter.vue":
/*!***********************************************!*\
  !*** ./resources/js/containers/TheFooter.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=template&id=44bdf58d */ "./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d");
/* harmony import */ var _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheFooter.vue?vue&type=script&lang=js */ "./resources/js/containers/TheFooter.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheFooter.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue":
/*!************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TheSidebar.vue?vue&type=template&id=08a98f4c */ "./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c");
/* harmony import */ var _TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TheSidebar.vue?vue&type=script&lang=js */ "./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.render,
  _TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/TheSidebar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue":
/*!****************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=template&id=29466cd2 */ "./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2");
/* harmony import */ var _VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=script&lang=js */ "./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js");
/* harmony import */ var _VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css */ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__.render,
  _VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/containers/VerticalHeader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/containers/TheContainer.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/containers/TheContainer.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheFooter.vue?vue&type=script&lang=js":
/*!***********************************************************************!*\
  !*** ./resources/js/containers/TheFooter.vue?vue&type=script&lang=js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheFooter.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheSidebar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_style_index_0_id_59a2dd7f_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=style&index=0&id=59a2dd7f&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css":
/*!************************************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_style_index_0_id_29466cd2_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=style&index=0&id=29466cd2&lang=css");


/***/ }),

/***/ "./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true":
/*!********************************************************************************************!*\
  !*** ./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheContainer_vue_vue_type_template_id_59a2dd7f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true");


/***/ }),

/***/ "./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d":
/*!*****************************************************************************!*\
  !*** ./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheFooter_vue_vue_type_template_id_44bdf58d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheFooter.vue?vue&type=template&id=44bdf58d */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d");


/***/ }),

/***/ "./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c":
/*!******************************************************************************!*\
  !*** ./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TheSidebar_vue_vue_type_template_id_08a98f4c__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TheSidebar.vue?vue&type=template&id=08a98f4c */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c");


/***/ }),

/***/ "./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2":
/*!**********************************************************************************!*\
  !*** ./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2 ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VerticalHeader_vue_vue_type_template_id_29466cd2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VerticalHeader.vue?vue&type=template&id=29466cd2 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheContainer.vue?vue&type=template&id=59a2dd7f&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    { attrs: { id: "app" } },
    [
      _c("div", { staticClass: "active", attrs: { id: "sidebar" } }, [
        _c("div", { staticClass: "sidebar-wrapper active" }, [
          _c("div", { staticClass: "sidebar-header" }, [
            _c(
              "div",
              { staticClass: "d-flex flex-row justify-content-center" },
              [
                _c(
                  "div",
                  { staticClass: "logo" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "d-flex flex-column align-items-center justify-content-center align-content-center flex-wrap ",
                        attrs: { to: "/" },
                      },
                      [
                        _vm.$appLogo != ""
                          ? _c("img", {
                              staticClass: "container-logo",
                              attrs: {
                                src: _vm.$storageUrl + _vm.$appLogo,
                                alt: "Logo",
                                srcset: "",
                              },
                            })
                          : _c("img", {
                              staticClass: "container-logo",
                              attrs: {
                                src: _vm.$baseUrl + "/images/logo.png",
                                alt: "Logo",
                                srcset: "",
                              },
                            }),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._m(0),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "sidebar-menu" }, [
            _c(
              "ul",
              { staticClass: "menu" },
              [
                _c(
                  "li",
                  { staticClass: "sidebar-item sidebar-search" },
                  [
                    _c("b-form-input", {
                      attrs: { type: "search", placeholder: _vm.__("search") },
                      on: { keyup: _vm.filterItem, search: _vm.filterItem },
                      model: {
                        value: _vm.search,
                        callback: function ($$v) {
                          _vm.search = $$v
                        },
                        expression: "search",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._l(_vm.filteredSidebarItems, function (item) {
                  return [
                    (
                      item.role == true
                        ? _vm.$role("Super Admin") &&
                          (item.name == "Role" || item.name == "System Users")
                        : item.permission && _vm.$can(item.permission)
                    )
                      ? _c(
                          "li",
                          {
                            staticClass: "sidebar-item",
                            class: {
                              active:
                                _vm.isActive(item.url) || _vm.subIsActive(item),
                              "has-sub": _vm.isHasSub(item),
                            },
                          },
                          [
                            _vm.isHasSub(item)
                              ? [
                                  _c("a", { staticClass: "sidebar-link" }, [
                                    _c("i", { class: "fa fa-" + item.icon }),
                                    _vm._v(" "),
                                    _c("span", [_vm._v(_vm._s(item.name))]),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "ul",
                                    {
                                      staticClass: "submenu",
                                      class: { active: _vm.subIsActive(item) },
                                    },
                                    [
                                      _vm._l(item.submenu, function (sub) {
                                        return [
                                          (
                                            sub.role
                                              ? _vm.$role("Super Admin") &&
                                                (item.name === "Role" ||
                                                  item.name === "System Users")
                                              : sub.permission &&
                                                _vm.$can(sub.permission)
                                          )
                                            ? _c(
                                                "li",
                                                {
                                                  key: sub.key,
                                                  staticClass: "submenu-item",
                                                  class: {
                                                    active: _vm.isActive(
                                                      sub.url
                                                    ),
                                                  },
                                                },
                                                [
                                                  _c(
                                                    "router-link",
                                                    {
                                                      attrs: { to: sub.url },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.closeSideBarMenu()
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                " +
                                                          _vm._s(sub.name) +
                                                          "\n                                            "
                                                      ),
                                                    ]
                                                  ),
                                                ],
                                                1
                                              )
                                            : _vm._e(),
                                        ]
                                      }),
                                    ],
                                    2
                                  ),
                                ]
                              : [
                                  _c(
                                    "router-link",
                                    {
                                      staticClass: "sidebar-link",
                                      attrs: { to: item.url },
                                      on: {
                                        click: function ($event) {
                                          return _vm.closeSideBarMenu()
                                        },
                                      },
                                    },
                                    [
                                      _c("i", { class: "fa fa-" + item.icon }),
                                      _vm._v(" "),
                                      _c("span", [_vm._v(_vm._s(item.name))]),
                                    ]
                                  ),
                                ],
                          ],
                          2
                        )
                      : _vm._e(),
                  ]
                }),
                _vm._v(" "),
                _vm._l(_vm.filteredDatabaseDownloadBtn, function (item) {
                  return [
                    (
                      item.role == true
                        ? _vm.$role("Super Admin") &&
                          (item.name == "Role" || item.name == "System Users")
                        : item.permission && _vm.$can(item.permission)
                    )
                      ? _c("div", [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              on: { click: _vm.downloadDatabase },
                            },
                            [
                              _c("i", { class: "fa fa-download" }),
                              _vm.isLoading
                                ? _c("b-spinner", {
                                    attrs: { small: "", label: "Spinning" },
                                  })
                                : _vm._e(),
                              _vm._v(" Download Database"),
                            ],
                            1
                          ),
                        ])
                      : _vm._e(),
                  ]
                }),
              ],
              2
            ),
          ]),
          _vm._v(" "),
          _vm._m(1),
        ]),
      ]),
      _vm._v(" "),
      _c("vertical-header"),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "main" } },
        [_c("div", [_c("router-view")], 1), _vm._v(" "), _c("the-footer")],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "toggler" }, [
      _c(
        "a",
        {
          staticClass: "sidebar-hide d-xl-none d-block",
          attrs: { href: "javascript:void(0)" },
        },
        [_c("i", { staticClass: "bi bi-x bi-middle" })]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("button", { staticClass: "sidebar-toggler btn x" }, [
      _c("i", { attrs: { "data-feather": "x" } }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheFooter.vue?vue&type=template&id=44bdf58d ***!
  \********************************************************************************************************************************************************************************************************************/
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
  return _c("footer", [
    _c("div", { staticClass: "footer clearfix mb-0 text-muted " }, [
      _c("div", { staticClass: "float-start" }, [
        _c("a", {
          staticClass: "text-primary font-weight-normal",
          attrs: { href: "javascript:void(0)" },
          domProps: { innerHTML: _vm._s(_vm.copyrightDetails) },
        }),
      ]),
      _vm._v(" "),
      _vm.currentVersion !== ""
        ? _c("div", { staticClass: "float-end" }, [
            _c("p", [
              _vm._v("\n              Version :- \n              "),
              _c("a", { attrs: { href: "javascript:void(0)" } }, [
                _vm._v(_vm._s(_vm.$currentVersion)),
              ]),
            ]),
          ])
        : _vm._e(),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/TheSidebar.vue?vue&type=template&id=08a98f4c ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "CSidebar",
    {
      attrs: { fixed: "", minimize: _vm.minimize, show: _vm.show },
      on: {
        "update:show": function (value) {
          return _vm.$store.commit("set", ["sidebarShow", value])
        },
      },
    },
    [
      _c(
        "CSidebarBrand",
        { staticClass: "d-md-down-none", attrs: { to: "/" } },
        [
          _c("CIcon", {
            staticClass: "d-block",
            attrs: {
              name: "logo",
              size: "custom-size",
              height: 35,
              viewBox: "0 0 " + (_vm.minimize ? 110 : 556) + " 134",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c("CRenderFunction", {
        attrs: { flat: "", "content-to-render": _vm.nav },
      }),
      _vm._v(" "),
      _c("CSidebarMinimizer", {
        staticClass: "d-md-down-none",
        nativeOn: {
          click: function ($event) {
            return _vm.$store.commit("set", ["sidebarMinimize", !_vm.minimize])
          },
        },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/containers/VerticalHeader.vue?vue&type=template&id=29466cd2 ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c("header", { staticClass: "mb-3" }, [
    _c("nav", { staticClass: "navbar navbar-expand-lg" }, [
      _c("div", { staticClass: "container-fluid" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "d-flex justify-content-start align-items-center" },
          [
            _vm.$isDemo == 1 && _vm.windowWidth < this.$mobileWidth
              ? _c("div", { staticClass: "me-2" }, [
                  _c("span", { staticClass: "badge bg-danger" }, [
                    _vm._v(_vm._s(_vm.__("demo_mode"))),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "navbar-toggler navbar-toggler",
                attrs: {
                  href: "javascript:void(0)",
                  "data-bs-toggle": "collapse",
                  "data-bs-target": "#navbarSupportedContent",
                  "aria-controls": "navbarSupportedContent",
                  "aria-expanded": "false",
                  "aria-label": "Toggle navigation",
                },
                on: {
                  click: function ($event) {
                    _vm.isToggle = !_vm.isToggle
                  },
                },
              },
              [
                _vm.isToggle === true
                  ? _c("i", {
                      staticClass: "fa fa-times",
                      attrs: { "aria-hidden": "true" },
                    })
                  : _c("i", {
                      staticClass: "fa fa-ellipsis-h",
                      attrs: { "aria-hidden": "true" },
                    }),
              ]
            ),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "collapse navbar-collapse",
            attrs: { id: "navbarSupportedContent" },
          },
          [
            _c("ul", { staticClass: "navbar-nav ms-auto mb-2 mb-lg-0" }, [
              _vm.$isDemo == 1 && _vm.windowWidth > this.$mobileWidth
                ? _c("li", { staticClass: "nav-item dropdown me-2" }, [
                    _c(
                      "div",
                      { staticClass: "d-flex gap-2 align-items-center mt-2" },
                      [
                        _c("span", { staticClass: "badge bg-danger" }, [
                          _vm._v(_vm._s(_vm.__("demo_mode"))),
                        ]),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item dropdown me-1" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "theme-toggle d-flex gap-2 align-items-center mt-2",
                  },
                  [
                    _c(
                      "label",
                      {
                        staticStyle: { cursor: "pointer" },
                        attrs: { for: "userTheme" },
                      },
                      [
                        _vm.userTheme === "theme-dark"
                          ? [
                              _c(
                                "svg",
                                {
                                  staticClass: "iconify iconify--mdi",
                                  attrs: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "xmlns:xlink":
                                      "http://www.w3.org/1999/xlink",
                                    "aria-hidden": "true",
                                    role: "img",
                                    width: "20",
                                    height: "20",
                                    preserveAspectRatio: "xMidYMid meet",
                                    viewBox: "0 0 24 24",
                                  },
                                },
                                [
                                  _c("path", {
                                    attrs: {
                                      fill: "currentColor",
                                      d: "m17.75 4.09l-2.53 1.94l.91 3.06l-2.63-1.81l-2.63 1.81l.91-3.06l-2.53-1.94L12.44 4l1.06-3l1.06 3l3.19.09m3.5 6.91l-1.64 1.25l.59 1.98l-1.7-1.17l-1.7 1.17l.59-1.98L15.75 11l2.06-.05L18.5 9l.69 1.95l2.06.05m-2.28 4.95c.83-.08 1.72 1.1 1.19 1.85c-.32.45-.66.87-1.08 1.27C15.17 23 8.84 23 4.94 19.07c-3.91-3.9-3.91-10.24 0-14.14c.4-.4.82-.76 1.27-1.08c.75-.53 1.93.36 1.85 1.19c-.27 2.86.69 5.83 2.89 8.02a9.96 9.96 0 0 0 8.02 2.89m-1.64 2.02a12.08 12.08 0 0 1-7.8-3.47c-2.17-2.19-3.33-5-3.49-7.82c-2.81 3.14-2.7 7.96.31 10.98c3.02 3.01 7.84 3.12 10.98.31Z",
                                    },
                                  }),
                                ]
                              ),
                            ]
                          : [
                              _c(
                                "svg",
                                {
                                  staticClass: "iconify iconify--system-uicons",
                                  attrs: {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "xmlns:xlink":
                                      "http://www.w3.org/1999/xlink",
                                    "aria-hidden": "true",
                                    role: "img",
                                    width: "20",
                                    height: "20",
                                    preserveAspectRatio: "xMidYMid meet",
                                    viewBox: "0 0 21 21",
                                  },
                                },
                                [
                                  _c(
                                    "g",
                                    {
                                      attrs: {
                                        fill: "none",
                                        "fill-rule": "evenodd",
                                        stroke: "currentColor",
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                      },
                                    },
                                    [
                                      _c("path", {
                                        attrs: {
                                          d: "M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 0 0-4-4.018c-2.219 0-4 1.781-4 4c0 2.219 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.135 16.863L5.55 15.45m9.899-9.9l1.414-1.415M10.5 19.5v-2m0-14v-2",
                                          opacity: ".3",
                                        },
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "g",
                                        {
                                          attrs: {
                                            transform: "translate(-210 -1)",
                                          },
                                        },
                                        [
                                          _c("path", {
                                            attrs: {
                                              d: "M220.5 2.5v2m6.5.5l-1.5 1.5",
                                            },
                                          }),
                                          _vm._v(" "),
                                          _c("circle", {
                                            attrs: {
                                              cx: "220.5",
                                              cy: "11.5",
                                              r: "4",
                                            },
                                          }),
                                          _vm._v(" "),
                                          _c("path", {
                                            attrs: {
                                              d: "m214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2",
                                            },
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ],
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-check form-switch fs-6" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.userTheme,
                            expression: "userTheme",
                          },
                        ],
                        staticClass: "form-check-input me-0",
                        staticStyle: { cursor: "pointer" },
                        attrs: {
                          type: "checkbox",
                          id: "userTheme",
                          "true-value": "theme-dark",
                          "false-value": "theme-light",
                        },
                        domProps: {
                          checked: Array.isArray(_vm.userTheme)
                            ? _vm._i(_vm.userTheme, null) > -1
                            : _vm._q(_vm.userTheme, "theme-dark"),
                        },
                        on: {
                          change: [
                            function ($event) {
                              var $$a = _vm.userTheme,
                                $$el = $event.target,
                                $$c = $$el.checked
                                  ? "theme-dark"
                                  : "theme-light"
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 && (_vm.userTheme = $$a.concat([$$v]))
                                } else {
                                  $$i > -1 &&
                                    (_vm.userTheme = $$a
                                      .slice(0, $$i)
                                      .concat($$a.slice($$i + 1)))
                                }
                              } else {
                                _vm.userTheme = $$c
                              }
                            },
                            _vm.toggleTheme,
                          ],
                        },
                      }),
                      _vm._v(" "),
                      _c("label", { staticClass: "form-check-label" }),
                    ]),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item dropdown me-2" }, [
                _c(
                  "div",
                  { staticClass: "d-flex gap-2 align-items-center mt-2" },
                  [
                    _c(
                      "button",
                      {
                        ref: "confirmButton",
                        staticClass: "badge bg-success",
                        attrs: {
                          type: "button",
                          id: "confirmButton",
                          title: "Clear",
                        },
                        on: {
                          click: function ($event) {
                            _vm.popoverShow = true
                          },
                        },
                      },
                      [
                        _vm.isSystemRefreshing
                          ? _c("b-spinner", {
                              attrs: { small: "", label: "Spinning" },
                            })
                          : _c("i", {
                              staticClass: "fa fa-refresh",
                              class: { "fa-spin": _vm.isSystemRefreshing },
                            }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("b-popover", {
                      ref: "popover",
                      attrs: {
                        target: "confirmButton",
                        triggers: "click",
                        show: _vm.popoverShow,
                        placement: "auto",
                        container: "my-container",
                      },
                      on: {
                        "update:show": function ($event) {
                          _vm.popoverShow = $event
                        },
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "title",
                          fn: function () {
                            return [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-content-center justify-content-sm-between",
                                },
                                [
                                  _c("span", [_vm._v(" Confirmation")]),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "close",
                                      attrs: {
                                        type: "button",
                                        "aria-label": "Close",
                                      },
                                      on: {
                                        click: function ($event) {
                                          _vm.popoverShow = false
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass: "d-inline-block",
                                          attrs: { "aria-hidden": "true" },
                                        },
                                        [_vm._v("×")]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          },
                          proxy: true,
                        },
                        {
                          key: "default",
                          fn: function () {
                            return [
                              _c("h6", [
                                _vm._v("Are you sure you want to proceed?"),
                              ]),
                              _vm._v(" "),
                              _c("span", [_vm._v("cache:clear")]),
                              _vm._v(",\n                                    "),
                              _c("span", [_vm._v("config:clear")]),
                              _vm._v(",\n                                    "),
                              _c("span", [_vm._v("route:clear")]),
                              _vm._v(",\n                                    "),
                              _c("span", [_vm._v("view:clear")]),
                              _vm._v(
                                ",\n\n                                    "
                              ),
                              _vm.isSystemRefreshing
                                ? _c("b-spinner", {
                                    attrs: { small: "", label: "Spinning" },
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _c("hr"),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "d-flex align-content-center justify-content-sm-between",
                                },
                                [
                                  _c(
                                    "b-button",
                                    {
                                      attrs: {
                                        size: "sm",
                                        variant: "outline-danger",
                                      },
                                      on: {
                                        click: function ($event) {
                                          _vm.popoverShow = false
                                        },
                                      },
                                    },
                                    [_vm._v("Cancel")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      attrs: {
                                        size: "sm",
                                        variant: "primary",
                                        disabled: _vm.isSystemRefreshing,
                                      },
                                      on: { click: _vm.clearCache },
                                    },
                                    [
                                      _vm.isSystemRefreshing
                                        ? _c("b-spinner", {
                                            attrs: {
                                              small: "",
                                              label: "Spinning",
                                            },
                                          })
                                        : _vm._e(),
                                      _vm._v(
                                        "\n                                            Submit\n                                        "
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    }),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              this.$websiteUrl
                ? _c("li", { staticClass: "nav-item dropdown me-2" }, [
                    _c(
                      "a",
                      {
                        staticClass: "nav-link",
                        attrs: { href: this.$websiteUrl, target: "__blank" },
                      },
                      [
                        _c("i", {
                          staticClass:
                            "fa fa-solid fa-globe fs-4 text-gray-600",
                        }),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._m(1),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item dropdown me-1" }, [
                _c(
                  "a",
                  {
                    staticClass: "nav-link active dropdown-toggle",
                    attrs: {
                      href: "#",
                      "data-bs-toggle": "dropdown",
                      "aria-expanded": "false",
                    },
                  },
                  [
                    _c("i", { staticClass: "bi bi-bell fs-4 text-gray-600" }),
                    _c(
                      "span",
                      {
                        staticClass:
                          "badge bg-success rounded-circle position-absolute translate-middle p-2",
                        staticStyle: { bottom: "20px", left: "30px" },
                      },
                      [_vm._v(_vm._s(_vm.notifications_unread_count))]
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "ul",
                  {
                    staticClass:
                      "dropdown-menu dropdown-menu-end notification-dropdown",
                    attrs: { "aria-labelledby": "dropdownMenuButton" },
                  },
                  [
                    _vm._m(2),
                    _vm._v(" "),
                    _vm._l(
                      _vm.notifications.slice(0, 4),
                      function (notification) {
                        return _c(
                          "li",
                          { staticClass: "dropdown-item notification-item" },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "d-flex align-items-center",
                                on: {
                                  click: function ($event) {
                                    return _vm.markAsReadNotification(
                                      notification
                                    )
                                  },
                                },
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "notification-text ms-4" },
                                  [
                                    _c(
                                      "p",
                                      {
                                        staticClass:
                                          "notification-title font-bold",
                                      },
                                      [
                                        _c(
                                          "router-link",
                                          {
                                            attrs: {
                                              to:
                                                "/orders/view/" +
                                                notification.data.order_id,
                                            },
                                          },
                                          [
                                            _vm._v(
                                              " " +
                                                _vm._s(notification.data.text)
                                            ),
                                          ]
                                        ),
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "p",
                                      {
                                        staticClass:
                                          "notification-subtitle font-thin text-sm",
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.changeDateTime(
                                              notification.created_at
                                            )
                                          )
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            ),
                          ]
                        )
                      }
                    ),
                    _vm._v(" "),
                    _vm.notifications.length > 0
                      ? _c("li", [
                          _vm.isSellerRoute
                            ? _c(
                                "p",
                                { staticClass: "text-center py-2 mb-0" },
                                [
                                  _c(
                                    "router-link",
                                    {
                                      attrs: {
                                        to: "/seller/notification_panel",
                                      },
                                    },
                                    [_vm._v("See all notification")]
                                  ),
                                ],
                                1
                              )
                            : _c(
                                "p",
                                { staticClass: "text-center py-2 mb-0" },
                                [
                                  _c(
                                    "router-link",
                                    { attrs: { to: "/notification_panel" } },
                                    [_vm._v("See all notification")]
                                  ),
                                ],
                                1
                              ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("li", [
                      _vm.notifications.length == 0
                        ? _c("a", { staticClass: "dropdown-item" }, [
                            _vm._v("No notification available"),
                          ])
                        : _vm._e(),
                    ]),
                  ],
                  2
                ),
              ]),
              _vm._v(" "),
              _c("li", { staticClass: "nav-item dropdown me-3" }, [
                _c("div", { staticClass: "lang_div" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.lang,
                          expression: "lang",
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
                                var val = "_value" in o ? o._value : o.value
                                return val
                              })
                            _vm.lang = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          function ($event) {
                            return _vm.changeLanguage($event)
                          },
                        ],
                      },
                    },
                    [
                      _vm.languages.length === 0
                        ? [
                            _c("option", { attrs: { value: "en" } }, [
                              _vm._v("English"),
                            ]),
                          ]
                        : _vm._l(_vm.languages, function (language) {
                            return _c(
                              "option",
                              {
                                key: language.code,
                                domProps: {
                                  value: language.code,
                                  selected:
                                    language.code === _vm.defaultLanguage.code,
                                },
                              },
                              [_vm._v(_vm._s(language.name))]
                            )
                          }),
                    ],
                    2
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "dropdown" }, [
              _c(
                "a",
                {
                  attrs: {
                    href: "#",
                    "data-bs-toggle": "dropdown",
                    "aria-expanded": "false",
                  },
                },
                [
                  _c("div", { staticClass: "user-menu d-flex" }, [
                    _c("div", { staticClass: "user-name text-end me-3" }, [
                      _c("h6", { staticClass: "mb-0 text-gray-600" }, [
                        _vm._v(_vm._s(_vm.user.username)),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mb-0 text-sm text-gray-600" }, [
                        _vm._v(_vm._s(_vm.role)),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "user-img d-flex align-items-center" },
                      [
                        _c("div", { staticClass: "avatar avatar-md22" }, [
                          _c("img", { attrs: { src: _vm.profile_url } }),
                        ]),
                      ]
                    ),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c(
                "ul",
                {
                  staticClass: "dropdown-menu dropdown-menu-lg-end",
                  attrs: { "aria-labelledby": "dropdownMenuButton" },
                },
                [
                  _c("li", [
                    _c("h6", { staticClass: "dropdown-header" }, [
                      _vm._v("Hello, " + _vm._s(_vm.user.username) + "!"),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "li",
                    [
                      _vm.role == this.$roleSeller
                        ? _c(
                            "router-link",
                            {
                              staticClass: "dropdown-item",
                              attrs: { to: "/seller/profile" },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi bi-person me-2",
                              }),
                              _vm._v(
                                " My Profile\n                            "
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == this.$roleDeliveryBoy
                        ? _c(
                            "router-link",
                            {
                              staticClass: "dropdown-item",
                              attrs: { to: "/delivery_boy/profile" },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi bi-person me-2",
                              }),
                              _vm._v(
                                " My Profile\n                            "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    [
                      _vm.role == this.$roleSuperAdmin
                        ? _c(
                            "router-link",
                            {
                              staticClass: "dropdown-item",
                              attrs: { to: "/settings" },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi bi-gear me-2",
                              }),
                              _vm._v("Settings\n                            "),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == this.$roleSeller
                        ? _c(
                            "router-link",
                            {
                              staticClass: "dropdown-item",
                              attrs: { to: "/seller/settings" },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi bi-gear me-2",
                              }),
                              _vm._v("Settings\n                            "),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.role == this.$roleDeliveryBoy
                        ? _c(
                            "router-link",
                            {
                              staticClass: "dropdown-item",
                              attrs: { to: "/delivery_boy/settings" },
                            },
                            [
                              _c("i", {
                                staticClass: "icon-mid bi bi-gear me-2",
                              }),
                              _vm._v("Settings\n                            "),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._m(3),
                  _vm._v(" "),
                  _c("li", [
                    _c(
                      "a",
                      {
                        staticClass: "dropdown-item",
                        on: {
                          click: function ($event) {
                            return _vm.logout()
                          },
                        },
                      },
                      [
                        _c("i", {
                          staticClass: "icon-mid bi bi-box-arrow-left me-2",
                        }),
                        _vm._v(" Logout"),
                      ]
                    ),
                  ]),
                ]
              ),
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
    return _c(
      "a",
      {
        staticClass: "burger-btn d-block",
        attrs: { href: "javascript:void(0)" },
      },
      [_c("i", { staticClass: "fa fa-bars", attrs: { "aria-hidden": "true" } })]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item dropdown me-1" }, [
      _c(
        "a",
        {
          staticClass: "nav-link active dropdown-toggle",
          attrs: {
            href: "#",
            "data-bs-toggle": "dropdown",
            "aria-expanded": "false",
          },
        },
        [_c("i", { staticClass: "bi bi-envelope fs-4 text-gray-600" })]
      ),
      _vm._v(" "),
      _c(
        "ul",
        {
          staticClass: "dropdown-menu dropdown-menu-lg-end",
          attrs: { "aria-labelledby": "dropdownMenuButton" },
        },
        [
          _c("li", [
            _c("h6", { staticClass: "dropdown-header" }, [_vm._v("Messages")]),
          ]),
          _vm._v(" "),
          _c("li", [
            _c("a", { staticClass: "dropdown-item", attrs: { href: "#" } }, [
              _vm._v("No new message"),
            ]),
          ]),
        ]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [
      _c("h6", { staticClass: "dropdown-header" }, [_vm._v("Notifications")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", [_c("hr", { staticClass: "dropdown-divider" })])
  },
]
render._withStripped = true



/***/ })

}]);