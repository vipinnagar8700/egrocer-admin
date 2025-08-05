//import Vue from 'vue'

//window.Vue = require("vue/dist/vue.js");
import Auth from '../Auth.js';
import Router from "vue-router";
import axios from "axios";
const Install = () => import("../views/Install");

// Auth
const Login = () => import("../views/Login");
const ForgotPassword = () => import("../views/ForgotPassword");
const ResetPassword = () => import("../views/ResetPassword");

// Containers
const TheContainer = () => import("../containers/TheContainer.vue");
const TheContainerSeller = () => import("../containers/TheContainerSeller");
const TheContainerDeliveryBoy = () => import("../containers/TheContainerDeliveryBoy");
const Settings = () => import('../views/Settings');

// Views
const Dashboard = () => import("../views/Dashboard.vue");
const Orders = () => import("../views/Orders/Orders.vue");
const ViewOrder = () => import("../views/Orders/ViewOrder");
const InvoiceOrder = () => import("../views/Orders/InvoiceOrder");

// Notification Panel
const NotificationPanel = () => import("../views/NotificationPanel.vue");

// Categories
const ManageCategories = () => import("../views/Category/ManageCategories");
const CategoriesOrder = () => import("../views/Category/CategoriesOrder");

// Subcategories
const SubCategories = () => import("../views/SubCategory/SubCategories");

// Products
const Products = () => import("../views/Product/Products");
const EditProduct = () => import("../views/Product/EditProduct");
const CloneProduct = () => import("../views/Product/EditProduct");
const ApproveRequests = () => import("../views/Product/ApproveRequests");
const ViewProduct = () => import("../views/Product/ViewProduct");
//const ViewRatings = () => import("../views/Product/ProductRatings");
const Taxes = () => import("../views/Product/Taxes/Taxes");
const Media = () => import("../views/Product/Media");
const ProductOrder = () => import("../views/Product/ProductOrder");
const ProductRatings = () => import("../views/Product/ProductRatings");
const BulkUpload = () => import("../views/Product/BulkUpload");
const BulkUpdate = () => import("../views/Product/BulkUpdate");
const Brands = () => import("../views/Product/Brands/Brands");
const ManageStock = () => import("../views/Product/ManageStock");

const Sellers = () => import("../views/Seller/Sellers");
const RegisteredSellers = () => import("../views/Seller/RegisteredSellers");
const EditSeller = () => import("../views/Seller/EditSeller");
const SellerCommissions = () => import("../views/Seller/Commissions/SellerCommissions")
const SellerWalletTransactions = () => import("../views/Seller/WalletTransactions/SellerWalletTransactions");

//Home Slider Images
const HomeSliders = () => import("../views/HomeSliders/HomeSliders");

//Promo Code
const PromoCode = () => import("../views/PromoCode/PromoCode");

//Setting - TIme Slots
const TimeSlots = () => import("../views/Setting/TimeSlots/TimeSlots");
//Setting - Store Settings
const StoreSettings = () => import("../views/Setting/StoreSettings");
//Setting - Units
const Units = () => import("../views/Product/Units/Units");

//Setting - Payment Methods
const PaymentMethods = () => import("../views/Setting/PaymentMethods");

//Setting - Notifications Settings
const NotificationSettings = () => import("../views/Setting/NotificationSettings");
//Setting - Contact Us
const ContactUs = () => import("../views/Setting/ContactUs");

//Setting - Contact Us
const AboutUs = () => import("../views/Setting/AboutUs");

//Setting - Privacy Policy
const PrivacyPolicy = () => import("../views/Setting/PrivacyPolicy");
//Setting - Delivery Boy
const PrivacyPolicyDeliveryBoy = () => import("../views/Setting/PrivacyPolicyDeliveryBoy");
//Setting - Manager App
const PrivacyPolicyManagerApp = () => import("../views/Setting/PrivacyPolicyManagerApp");
//Setting - Seller
const PrivacyPolicySeller = () => import("../views/Setting/PrivacyPolicySeller");

//Setting - ApiKey
const ApiKey = () => import("../views/Setting/ApiKey");
const FirebaseSettings = () => import("../views/Setting/FirebaseSettings");
const SmsSettings = () => import("../views/Setting/SmsSettings");
const SmsTemplates = () => import("../views/Setting/SmsTemplates/SmsTemplates");
const SeoSettings = () => import("../views/Setting/SeoSettings/SeoSettings");

//Notifications - Send Notifications
const Notifications = () => import("../views/Notifications/Notifications");
const Emails = () => import("../views/Emails/Emails");
const EmailTemplates = () => import("../views/Emails/EmailTemplates");
// Featured Section to show products
const Sections = () => import("../views/Sections/Sections");
const SectionsOrder = () => import("../views/Sections/SectionsOrder");
// New Offers for Customers
const Offers = () => import("../views/Offers/Offers");
const PopupOffer = () => import("../views/Offers/PopupOffer");

// DeliveryBoys
const DeliveryBoys = () => import("../views/DeliveryBoys/DeliveryBoys");
const EditDeliveryBoy = () => import("../views/DeliveryBoys/EditDeliveryBoy");
const RegisteredDeliveryBoys = () => import("../views/DeliveryBoys/RegisteredDeliveryBoys");

// Fund Transfers
const FundTransfers = () => import("../views/DeliveryBoys/FundTransfers/FundTransfers");

// Cash Collection
const CashCollection = () => import("../views/DeliveryBoys/CashCollection/CashCollection");


// Front End Header
const GeneralWebSettings = () => import("../views/WebSetings/GeneralWebSettings");

// Front End About
const FrontEndAbout = () => import("../views/WebSetings/FrontEndAbout");

// Front End Policies
const FrontEndPolicies = () => import("../views/WebSetings/FrontEndPolicies");

// Social Media
const SocialMedia = () => import("../views/WebSetings/SocialMedia/SocialMedia");




//Customers
const Customers = () => import("../views/Customers/Customers");

//Customers Wallet Transactions
const WalletTransactions = () => import("../views/Customers/WalletTransactions/WalletTransactions");
// Transactions
const Transactions = () => import("../views/Customers/Transactions");
// Wishlists
const Wishlists = () => import("../views/Customers/Wishlists");

// Withdrawal Requests
const WithdrawalRequests = () => import("../views/WithdrawalRequests/WithdrawalRequests");

// Return Requests
const ReturnRequests = () => import("../views/ReturnRequests/ReturnRequests");

// Sales Reports
const SalesReports = () => import("../views/Reports/SalesReports");

// Product Sales Reports
const ProductSalesReports = () => import("../views/Reports/ProductSalesReports");

// System Users
const SystemUsers = () => import("../views/SystemUsers/SystemUsers");
const Role = () => import("../views/Role/Role");


// Errors
const PageNotFound = () => import("../views/errors/404");
const Unauthorized = () => import("../views/errors/403");
const ServerError = () => import("../views/errors/500");

//PurchaseCode for System Registration
const PurchaseCode = () => import("../views/Setting/PurchaseCode");
const SystemUpdater = () => import("../views/Setting/SystemUpdater");
// ShippingMethods
const ShippingMethods = () => import("../views/Setting/ShippingMethods");

// Newsletter
const Newsletter = () => import("../views/Newsletter");

// Location
const City = () => import("../views/City/City");
const EditCity = () => import("../views/City/EditCity");
const DeliverableArea = () => import("../views/City/DeliverableArea");
//Faqs
const Faqs = () => import("../views/Faqs/Faqs");
// ProductInfo for  Sold Out Products
const ProductInfo = () => import("../views/Dashboard/ProductInfo");

// Languages
const Languages = () => import("../views/Languages/Languages")

// Countries
const Countries = () => import("../views/Countries/Countries")

/***********************************************************/
/*Seller*/
const SellerRegister = () => import("../views/Sellers/SellerRegister");
const SellerDetails = () => import("../views/Sellers/SellerDetails");
const SellerLogin = () => import("../views/Sellers/SellerLogin");

const SellerDashboard = () => import("../views/Sellers/Dashboard");
const SellerProductInfo = () => import("../views/Sellers/ProductInfo");
const SellerOrders = () => import("../views/Sellers/Orders");
const SellerViewOrder = () => import("../views/Orders/ViewOrder");
const SellerInvoiceOrder = () => import("../views/Orders/InvoiceOrder");


const SellerCategories = () => import("../views/Sellers/Categories");
const SellerReturnRequests = () => import("../views/Sellers/ReturnRequests");
const SellerWithdrawalRequests = () => import("../views/Sellers/WithdrawalRequests/WithdrawalRequests");
const SellerProductSalesReports = () => import("../views/Sellers/ProductSalesReports");
const SellerSalesReports = () => import("../views/Sellers/SalesReports");
const SellerTaxes = () => import("../views/Sellers/Taxes");
const SellerBrands = () => import("../views/Sellers/Brands");
const SellerUnits = () => import("../views/Sellers/Units");

const SellerProducts = () => import("../views/Product/Products");
const SellerEditProduct = () => import("../views/Product/EditProduct");
const SellerViewProduct = () => import("../views/Product/ViewProduct");
const SellerProductRatings = () => import("../views/Product/ProductRatings");
const SellerCloneProduct = () => import("../views/Product/EditProduct");
const SellerManageStock = () => import("../views/Product/ManageStock");
const SellerMedia = () => import("../views/Product/Media");
const SellerSettings = () => import('../views/Settings');
const SellerProfile = () => import("../views/Seller/EditSeller");
//const SellerWalletTransactions = () => import("../views/Seller/WalletTransactions/SellerWalletTransactions");
//const SellerWalletTransactions = () => import("../views/Seller/SellerWalletTransactions");
/***********************************************************/
/*Delivery Boy*/
const DeliveryBoyRegister = () => import("../views/DeliveryBoy/DeliveryBoyRegister");
const DeliveryBoyDetails = () => import("../views/DeliveryBoy/DeliveryBoyDetails");
const DeliveryBoyLogin = () => import("../views/DeliveryBoy/DeliveryBoyLogin");

const DeliveryBoyDashboard = () => import("../views/DeliveryBoy/Dashboard");

const DeliveryBoyOrders = () => import("../views/DeliveryBoy/Orders");
const DeliveryBoyOrder = () => import("../views/Orders/ViewOrder");
const DeliveryBoyWithdrawalRequests = () => import("../views/DeliveryBoy/WithdrawalRequests/WithdrawalRequests");
const DeliveryBoyFundTransfers = () => import("../views/DeliveryBoy/FundTransfers");
const DeliveryBoyCashCollection = () => import("../views/DeliveryBoy/CashCollection");

const DeliveryBoyProductSalesReports = () => import("../views/DeliveryBoy/ProductSalesReports");
const DeliveryBoySalesReports = () => import("../views/DeliveryBoy/SalesReports");
const DeliverySettings = () => import('../views/Settings');
const DeliveryProfile = () => import("../views/DeliveryBoys/EditDeliveryBoy");
const DeliveryBoyInvoiceOrder = () => import("../views/Orders/InvoiceOrder");

const DeliveryBoyViewProduct = () => import("../views/Product/ViewProduct");


let router = new Router({
    //mode: "hash", // https://router.vuejs.org/api/#mode
    mode: "history",
    scrollBehavior: () => ({y: 0}),
    routes: configRoutes(),
    //linkActiveClass: 'active',
});

var roleSuperAdmin = "Super Admin";
var roleSeller = "Seller";
var roleDeliveryBoy = "Delivery Boy";
var roleName = "Super Admin";
var appName = window.appName;

router.beforeEach((to, from, next) => {
    //if (to.matched.some(record => record.meta.requiresAuth) ) {
    if(isInstalled) {
        if(to.name == 'install'){
            router.push('/404').catch(()=>{});
        }
        var title = to.meta && to.meta.title ? to.meta.title : 'Dashboard';
        window.document.title = title + ' - ' + appName;

        Auth.validate(to.path);
        var nonloginRoute = ['install', 'login', 'seller_register', 'delivery_boy_register', 'forgot_password', 'reset_password', 'seller_login', 'delivery_boy_login'];
        if (!nonloginRoute.includes(to.name)) {
            if (Auth.check()) {
                roleName = Auth.user.role.name;
                //Seller
                if (Auth.user.role_id === 3 && Auth.user.seller_status === 0) {
                    if (to.name == "seller_details") {
                        next();
                        return;
                    }
                    router.push('/seller/details');
                    return;
                } else if (Auth.user.role_id === 3 && Auth.user.seller_status === 1 && to.name == "Dashboard") {

                    if (to.name == "seller_dashboard") {
                        next();
                        return;
                    }
                    router.push('/seller/dashboard');
                    return;
                } else if (Auth.user.role_id === 4 && Auth.user.delivery_boy_status === 0) {
                    //Delivery boy
                    if (to.name == "delivery_boy_details") {
                        next();
                        return;
                    }
                    router.push('/delivery_boy/details');
                    return;
                } else if (Auth.user.role_id === 4 && Auth.user.delivery_boy_status === 1 && to.name == "Dashboard") {
                    //Delivery boy
                    if (to.name == "deliveryBoy_dashboard") {
                        next();
                        return;
                    }
                    router.push('/delivery_boy/dashboard');
                    return;
                } else {

                    //Check Role Wise Access
                    if (to.meta.role && !to.meta.role.includes(roleName)) {
                        if (roleName == roleSeller) {
                            router.push('seller', () => {
                            });
                            return;
                        } else if (roleName == roleDeliveryBoy) {
                            router.push('delivery_boy', () => {
                            });
                            return;
                        } else {
                            router.push('dashboard', () => {
                            });
                            return;
                        }
                    }

                    next();
                    return;
                }

            } else {
                router.push('/login').catch(()=>{});
            }
        } else {
            next();
        }
        
    }else{
        next();
    }

});
export default router;

function configRoutes() {
    var roleSuperAdmin = "Super Admin";
    var roleAdmin = "Admin";
    var roleSeller = "Seller";
    var roleDeliveryBoy = "Delivery Boy";
    var roleName = "Super Admin";

    var adminSuperadminRoles = [roleSuperAdmin,roleAdmin];
  var sellerRoles = [roleSeller];
     var deliveryBoyRoles = [roleDeliveryBoy];

async function fetchData() {
    try {
        const response = await axios.get(window.baseUrl + '/api/role');
        const data = response.data.data.map(role => role.name);
        const roles = data;
        return roles; // Return adminRoles if needed
    } catch (error) {
        // Handle error
        console.error('Error fetching roles:', error);
    }
}
let adminRoles;
fetchData();
    fetchData().then(result => {
        const otherroles =  result.filter(role => role !== 'Seller' && role !== 'Delivery Boy');
        const adminRoles = otherroles;
        
    });
         return [
        {
            path: "/install",
            name: "install",
            component: Install,
            meta: {
                title:'Install'
            },
        },
        {
            path: "/",
            redirect: "/dashboard",
            name: "Home",
            component: TheContainer,
            meta: {
                requiresAuth: true,
                role: adminRoles,
                title:'Admin Dashboard'
            },
            children: [
                { path: "/unauthorized", component: Unauthorized, meta: { title:'Unauthorized' } },
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: Dashboard,
                    meta: {
                        requiresAuth: true,
                        role: adminRoles,
                        title:'Admin Dashboard'
                    },
                },
                {
                    path: "orders",
                    name: "Orders",
                    component: Orders,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Orders'
                    },
                },
                {
                    path: "orders/view/:id",
                    name: "ViewOrder",
                    component: ViewOrder,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Order View'

                    },
                },
                {
                    path: "orders/invoice/:id",
                    name: "InvoiceOrder",
                    component: InvoiceOrder,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Invoice Order'
                    },
                },
                
                {
                    path: "notification_panel",
                    name: "NotificationPanel",
                    component: NotificationPanel,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Notification'
                    },
                },
                {
                    path: "manage_categories/:create",
                    name: "manage_categories_create",
                    component: ManageCategories,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Categories'

                    },
                },
                {
                    path: "manage_categories",
                    name: "manage_categories",
                    component: ManageCategories,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Categories'

                    },
                },
                {
                    path: "categories_order",
                    name: "categories_order",
                    component: CategoriesOrder,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Categories Order'

                    },
                },
                {
                    path: "subcategories",
                    name: "Subcategories",
                    component: SubCategories,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'SubCategories'

                    },
                },
                {
                    path: "subcategories/:id",
                    name: "Subcategories_edit",
                    component: SubCategories,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles

                    },
                },
                {
                    path: "manage_products",
                    name: "ManageProducts",
                    component: Products,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Manage Products'

                    },
                },
                {
                    path: "approve_requests",
                    name: "ApproveRequests",
                    component: ApproveRequests,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Approve Requests'

                    },
                },
                {
                    path: "manage_products/create",
                    name: "Create Product",
                    component: EditProduct,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Create Product'

                    },
                },
                {
                    path: "manage_products/edit/:id",
                    name: "EditProduct",
                    component: EditProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Edit Product'

                    },
                },
                {
                    path: "manage_products/view/:id",
                    name: "ViewProduct",
                    component: ViewProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product View'

                    },
                },
                {
                    path: "product_ratings/view/:id",
                    name: "ProductRatings",
                    component: ProductRatings,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product View'

                    },
                },
                {
                    path: "manage_products/clone/:id/:clone",
                    name: "CloneProduct",
                    component: CloneProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Clone Product'

                    },
                },
                {
                    path: "bulk_upload",
                    name: "BulkUpload",
                    component: BulkUpload,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Bulk Upload'
                    },
                },
                {
                    path: "bulk_update",
                    name: "BulkUpdate",
                    component: BulkUpdate,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Bulk Update'
                    },
                },
                {
                    path: "taxes",
                    name: "Taxes",
                    component: Taxes,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Taxes'

                    },
                },
                {
                    path: "brands",
                    name: "Brands",
                    component: Brands,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Brands'

                    },
                },
                {
                    path: "manage_stock",
                    name: "Stock Management",
                    component: ManageStock,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Stock Management'

                    },
                },
                {
                    path: "registered_sellers",
                    name: "RegisteredSellers",
                    component: RegisteredSellers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Seller Requests'
                    },
                },
                {
                    path: "sellers",
                    name: "Sellers",
                    component: Sellers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Sellers'

                    },
                },
                {
                    path: "sellers/create",
                    name: "CreateSellers",
                    component: EditSeller,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Create Sellers'

                    },
                },
                {
                    path: "sellers/edit/:id",
                    name: "EditSeller",
                    component: EditSeller,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Edit Seller'

                    },
                },
                {
                    path: "seller_commissions",
                    name: "Seller Commissions",
                    component: SellerCommissions,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Seller Commissions'

                    },
                },
                {
                    path: "seller_wallet_transactions",
                    name: "Seller Wallet Transactions",
                    component: SellerWalletTransactions,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Seller Wallet Transactions'

                    },
                },
                {
                    path: "home_sliders/:create",
                    name: "HomeSlidersCreate",
                    component: HomeSliders,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Home Sliders Create'

                    },
                },
                {
                    path: "home_sliders",
                    name: "HomeSliders",
                    component: HomeSliders,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Home Sliders'

                    },
                },
                {
                    path: "promo_code/:create",
                    name: "promo_code_create",
                    component: PromoCode,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Promo Code Create'
                    },
                },
                {
                    path: "promo_code",
                    name: "promo_code",
                    component: PromoCode,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Promo Code'
                    },
                },
                {
                    path: "delivery_settings",
                    name: "Delivery Settings",
                    component: TimeSlots,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Delivery Settings'

                    },
                },
                {
                    path: "store_settings",
                    name: "Store Settings",
                    component: StoreSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Store Settings'

                    },
                },
                {
                    path: "units",
                    name: "Units",
                    component: Units,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Units'

                    },
                },
                {
                    path: "payment_methods",
                    name: "Payment Methods",
                    component: PaymentMethods,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Payment Methods'

                    },
                },
                {
                    path: "contact_us",
                    name: "Contact Us",
                    component: ContactUs,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Contact Us'

                    },
                },
                {
                    path: "about_us",
                    name: "About Us",
                    component: AboutUs,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'About Us'

                    },
                },
                {
                    path: "privacy_policy",
                    name: "Privacy Policy",
                    component: PrivacyPolicy,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Privacy Policy'

                    },
                },
                {
                    path: "privacy_policy_delivery_boy",
                    name: "Privacy Policy Delivery Boy",
                    component: PrivacyPolicyDeliveryBoy,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Privacy Policy Delivery Boy'

                    },
                },
                {
                    path: "privacy_policy_manager_app",
                    name: "Privacy Policy Manager App",
                    component: PrivacyPolicyManagerApp,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Privacy Policy Manager App'

                    },
                },
                {
                    path: "privacy_policy_seller",
                    name: "Privacy Policy Seller",
                    component: PrivacyPolicySeller,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Privacy Policy Seller'
                    },
                },
                {
                    path: "api_key",
                    name: "Secret Key",
                    component: ApiKey,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Secret Key'

                    },
                },
                {
                    path: "firebase-settings",
                    name: "FirebaseSettings",
                    component: FirebaseSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Firebase Settings'
                    },
                },
                {
                    path: "sms-settings",
                    name: "SmsSettings",
                    component: SmsSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'SMS Settings'
                    },
                },
                {
                    path: "sms-templates",
                    name: "SmsTemplates",
                    component: SmsTemplates,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Sms Templates'
                    },
                },

                {
                    path: "seo-settings",
                    name: "SeoSettings",
                    component: SeoSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'SEO Settings'
                    },
                },

                {
                    path: "notifications/:create",
                    name: "SendNotifications_create",
                    component: Notifications,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Send Notification'

                    },
                },
                {
                    path: "notifications",
                    name: "SendNotifications",
                    component: Notifications,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Manage Notifications'

                    },
                },
                {
                    path: "emails/:create",
                    name: "SendEmails_create",
                    component: EmailTemplates,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Send Email'

                    },
                },
                {
                    path: "email_templates",
                    name: "EmailTemplates",
                    component: EmailTemplates,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Manage Email Templates'

                    },
                },
                {
                    path: "emails/:create",
                    name: "SendEmails_create",
                    component: Emails,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Send Email'

                    },
                },
                {
                    path: "emails",
                    name: "SendEmails",
                    component: Emails,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Manage Emails'

                    },
                },
                {
                    path: "notification_settings",
                    name: "NotificationsSettings",
                    component: NotificationSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Notifications Settings'

                    },
                },

                {
                    path: "sections/:create",
                    name: "addSection",
                    component: Sections,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Section'
                    },
                },
                {
                    path: "sections",
                    name: "FeaturedSections",
                    component: Sections,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Featured Sections'
                    },
                },
                {
                    path: "section_order",
                    name: "section_order",
                    component: SectionsOrder,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Secctions Order'

                    },
                },

                {
                    path: "offers/:create",
                    name: "Offers_create",
                    component: Offers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Offer Create'
                    },
                },
                {
                    path: "offers",
                    name: "Offers",
                    component: Offers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Offers'

                    },
                },
                {
                    path: "popup",
                    name: "PopupOffer",
                    component: PopupOffer,
                    meta: {
                        permission: 'popup_offer',
                        role: adminRoles,
                        title:'Popup Offer'
                    },
                },
                {
                    path: "offers",
                    name: "New Offers Image",
                    component: Offers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'New Offers Image'

                    },
                },
                /*{
                    path: "delivery_boys/:create",
                    name: "DeliveryBoys_create",
                    component: DeliveryBoys,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Delivery Boy Create'

                    },
                },*/
                {
                    path: "delivery_boys/create",
                    name: "CreateDeliveryBoy",
                    component: EditDeliveryBoy,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Create Delivery Boy'

                    },
                },
                {
                    path: "delivery_boys/edit/:id",
                    name: "EditDeliveryBoy",
                    component: EditDeliveryBoy,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Edit Delivery Boy'

                    },
                },
                {
                    path: "registered_delivery_boys",
                    name: "RegisteredDeliveryBoys",
                    component: RegisteredDeliveryBoys,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Delivery Boys'

                    },
                },
                {
                    path: "delivery_boys",
                    name: "DeliveryBoys",
                    component: DeliveryBoys,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Delivery Boys'

                    },
                },
                {
                    path: "fund_transfers",
                    name: "Fund Transfers",
                    component: FundTransfers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Fund Transfers'

                    },
                },
                {
                    path: "cash_collection",
                    name: "Delivery boy cash",
                    component: CashCollection,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Delivery boy cash'

                    },
                },
                {
                    path: "general_settings",
                    name: "GeneralWebSettings",
                    component: GeneralWebSettings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'General Web Settings'

                    },
                },
                {
                    path: "front_end_policies",
                    name: "Policies",
                    component: FrontEndPolicies,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Policies'

                    },
                },
                {
                    path: "front_end_about",
                    name: "About",
                    component: FrontEndAbout,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'About'

                    },
                },
                {
                    path: "social_media",
                    name: "SocialMedia",
                    component: SocialMedia,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Social Media'

                    },
                },
                {
                    path: "users",
                    name: "Customers",
                    component: Customers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Customers'

                    },
                },
                {
                    path: "wishlists",
                    name: "Wishlists",
                    component: Wishlists,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Wishlists'

                    },
                },
                {
                    path: "transactions",
                    name: "Transactions",
                    component: Transactions,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Transactions'

                    },
                },
                {
                    path: "wallet_transactions",
                    name: "Manage Customer Wallet",
                    component: WalletTransactions,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Manage Customer Wallet'

                    },
                },
                {
                    path: "withdrawal_requests",
                    name: "Withdrawal Requests",
                    component: WithdrawalRequests,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Withdrawal Requests'

                    },
                },
                {
                    path: "return_requests",
                    name: "Return Requests",
                    component: ReturnRequests,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Return Requests'

                    },
                },
                {
                    path: "product_sales_reports",
                    name: "Product Sales Reports",
                    component: ProductSalesReports,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product Sales Reports'

                    },
                },
                {
                    path: "sales_reports",
                    name: "SalesReports",
                    component: SalesReports,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Sales Reports'

                    },
                },
                {
                    path: "system_users",
                    name: "System Users",
                    component: SystemUsers,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'System Users'

                    },
                },
                {
                    path: "role",
                    name: "Role",
                    component: Role,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Role'

                    },
                },
                {
                    path: "media",
                    name: "Media",
                    component: Media,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Media'

                    },
                },
                {

                    path: "/settings",
                    name: "Settings",
                    component: Settings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Settings'

                    },
                },
                {
                    path: "product_order",
                    name: "Product Order",
                    component: ProductOrder,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product Order'

                    },
                },
                {
                    path: "product_ratings",
                    name: "Product Ratings",
                    component: ProductRatings,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product Ratings'

                    },
                },
                {
                    path: "purchase_code",
                    name: "System Registration",
                    component: PurchaseCode,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'System Registration'

                    },
                },
                {
                    path: "system_updater",
                    name: "SystemUpdater",
                    component: SystemUpdater,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'System Updater'

                    },
                },
                {
                    path: "shipping_methods",
                    name: "Shipping Methods",
                    component: ShippingMethods,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Shipping Methods'

                    },
                },
                {
                    path: "newsletter",
                    name: "Newsletter",
                    component: Newsletter,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Newsletter'

                    },
                },
                {
                    path: "cities",
                    name: "City",
                    component: City,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'City'

                    },
                },
                {
                    path: "cities/create",
                    name: "addCity",
                    component: EditCity,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'City Create'

                    },
                },
                {
                    path: "cities/edit/:id",
                    name: "EditCity",
                    component: EditCity,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'City Edit'
                    },
                },
                {
                    path: "deliverable_area",
                    name: "DeliverableArea",
                    component: DeliverableArea,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Deliverable Area'

                    },
                },
                {
                    path: "faqs",
                    name: "FAQs",
                    component: Faqs,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'FAQs'

                    },
                },
                {
                    path: "product_info/:type",
                    name: "ProductInfo",
                    component: ProductInfo,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Product Info'

                    },
                },
                {
                    path: "languages/:create",
                    name: "languages_create",
                    component: Languages,
                    meta: {
                        permission: 'manage_dashboard',
                        role: adminRoles,
                        title:'Languages'

                    },
                },
                {
                    path: "languages",
                    name: "languages",
                    component: Languages,
                    meta: {
                        permission: 'manage_dashboard',
                        role: adminRoles,
                        title:'Languages'
                    },
                },
                {
                    path: "countries/:create",
                    name: "countries_create",
                    component: Countries,
                    meta: {
                        permission: 'manage_dashboard',
                        role: adminRoles,
                        title:'Countries'

                    },
                },
                {
                    path: "countries",
                    name: "countries",
                    component: Countries,
                    meta: {
                        permission: 'manage_dashboard',
                        role: adminRoles,
                        title:'Countries'
                    },
                },
            ],
        },
        {
            path: "/seller/login",
            name: "seller_login",
            component: SellerLogin,
            meta: {
                title:'Seller Login'
            },
        },
        {
            path: "/seller/register",
            name: "seller_register",
            component: SellerRegister,
            meta: {
                title:'Seller Register'
            },
        },
        {
            path: "/seller/details",
            name: "seller_details",
            component: SellerDetails,
            meta: {
                role: sellerRoles,
                title:'Seller Details'
            }
        },
        {
            /* Here the name of the route is not usable. if you enable the name of this route then display the warning in the console.
            *[vue-router] Named Route 'Seller' has a default child route. When navigating to this named route (:to="{name: 'Seller'"),
            * the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
            * */

            path: "/seller",
            // name: "Seller",
            component: TheContainerSeller,
            redirect: "/seller",
            name: "Home",
            children: [
                {
                    path: "/",
                    name: "SellerDashboard",
                    component: SellerDashboard,
                    meta: {
                        requiresAuth: true,
                        role: sellerRoles,
                        title:'Dashboard1'
                    },
                },
                {
                    path: "dashboard",
                    name: "seller_dashboard",
                    component: SellerDashboard,
                    meta: {
                        requiresAuth: true,
                        role: sellerRoles,
                        title:'Dashboard2'
                    },
                },
                {
                    path: "orders",
                    name: "SellerOrders",
                    component: SellerOrders,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Orders'
                    },
                },
                {
                    path: "orders/view/:id",
                    name: "SellerViewOrder",
                    component: SellerViewOrder,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Order View'
                    },
                },
                {
                    path: "seller/orders/invoice/:id",
                    name: "SellerInvoiceOrder",
                    component: SellerInvoiceOrder,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Order Invoice'
                    },
                },
                {
                    path: "seller/product_info/:type",
                    name: "SellerProductInfo",
                    component: SellerProductInfo,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product Info'

                    },
                },
                {
                    path: "categories",
                    name: "SellerCategories",
                    component: SellerCategories,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Categories'
                    },
                },

                {
                    path: "manage_products",
                    name: "SellerManageProducts",
                    component: SellerProducts,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Products'
                    },
                },

                {
                    path: "manage_products/create",
                    name: "SellerCreateProduct",
                    component: SellerEditProduct,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product Create'
                    },

                },
                {
                    path: "manage_products/edit/:id",
                    name: "SellerEditProduct",
                    component: SellerEditProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product Edit'
                    },
                },
                {
                    path: "manage_products/view/:id",
                    name: "SellerViewProduct",
                    component: SellerViewProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product View'
                    },
                },
                {
                    path: "product_ratings/view/:id",
                    name: "SellerProductRatings",
                    component: SellerProductRatings,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product View'
                    },
                },
                {
                    path: "manage_products/clone/:id/:clone",
                    name: "SellerCloneProduct",
                    component: SellerCloneProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Clone Product'

                    },
                },
                {
                    path: "manage_stock",
                    name: "SellerManageStock",
                    component: SellerManageStock,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Stock Management'

                    },
                },  
                {
                    path: "/seller/units",
                    name: "SellerUnits",
                    component: SellerUnits,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Units'
                    },
                },
                {
                    path: "/seller/media",
                    name: "seller_media",
                    component: SellerMedia,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Media'
                    },
                },
                {
                    path: "/seller/taxes",
                    name: "seller_taxes",
                    component: SellerTaxes,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Taxes'
                    },
                },
                {
                    path: "/seller/brands",
                    name: "seller_brands",
                    component: SellerBrands,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Brands'
                    },
                },
                {
                    path: "bulk_upload",
                    name: "SellerBulkUpload",
                    component: BulkUpload,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Bulk Upload'
                    },
                },
                {
                    path: "bulk_update",
                    name: "SellerBulkUpdate",
                    component: BulkUpdate,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Bulk Update'
                    },
                },
                {
                    path: "product_sales_reports",
                    name: "SellerProductSalesReports",
                    component: SellerProductSalesReports,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Product Sales Reports'
                    }
                },
                {
                    path: "sales_reports",
                    name: "SellerSalesReports",
                    component: SellerSalesReports,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Sales Reports'
                    }
                },
                {
                    path: "settings",
                    name: "Settings_setting",
                    component: SellerSettings,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Settings'

                    },
                },

                {
                    path: "profile",
                    name: "SellerProfile",
                    component: SellerProfile,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'My Profile'
                    },
                },
                {
                    path: "/seller/seller_wallet_transactions",
                    name: "SellerWalletTransactions",
                    component: SellerWalletTransactions,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Wallet Transactions'
                    },
                },
                {
                    path: "/seller/notification_panel",
                    name: "NotificationPanel",
                    component: NotificationPanel,
                    meta: {
                        permission: 'order_list',
                        role: adminRoles,
                        title:'Notification'
                    },
                },
                {
                    path: "/seller/withdrawal_requests",
                    name: "SellerWithdrawalRequests",
                    component: SellerWithdrawalRequests,
                    meta: {
                        permission: 'order_list',
                        role: sellerRoles,
                        title:'Withdrawal Requests'
                    },
                },

            ],
        },
        {
            path: "/delivery_boy/login",
            name: "delivery_boy_login",
            component: DeliveryBoyLogin,
            meta: {
                title:'Delivery Boy Login'
            },
        },
        {
            path: "/delivery_boy/register",
            name: "delivery_boy_register",
            component: DeliveryBoyRegister,
            meta: {
                title:'Delivery Boy Register'
            }
        },
        {
            path: "/delivery_boy/details",
            name: "delivery_boy_details",
            component: DeliveryBoyDetails,
            meta: {
                role: deliveryBoyRoles,
                title:'Delivery Boy Details'
            }
        },
        
        
        {
            /* Here the name of the route is not usable. if you enable the name of this route then display the warning in the console.
            * [vue-router] Named Route 'delivery_boy' has a default child route. When navigating to this named route (:to="{name: 'delivery_boy'"),
            * the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.
            * */

            path: "/delivery_boy",
            // name: "delivery_boy",
            component: TheContainerDeliveryBoy,
            children: [
                {
                    path: "/",
                    name: "DeliveryBoyDashboard",
                    component:  DeliveryBoyDashboard,
                    meta: {
                        requiresAuth: true,
                        role: deliveryBoyRoles,
                        title:'Dashboard'
                    },
                },
                {
                    path: "dashboard",
                    name: "deliveryBoy_dashboard",
                    component: DeliveryBoyDashboard,
                    meta: {
                        requiresAuth: true,
                        role: deliveryBoyRoles,
                        title:'Dashboard'
                    },
                },
               
                {
                    path: "orders",
                    name: "DeliveryBoyOrders",
                    component: DeliveryBoyOrders,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Orders'
                    },
                },
                {
                    path: "orders/view/:id",
                    name: "DeliveryBoyOrder",
                    component: DeliveryBoyOrder,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'View Orders'
                    },
                },
                {
                    path: "/delivery_boy/withdrawal_requests",
                    name: "DeliveryBoyWithdrawalRequests",
                    component: DeliveryBoyWithdrawalRequests,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Withdrawal Requests'
                    },
                },
                {
                    path: "/delivery_boy/orders/invoice/:id",
                    name: "DeliveryBoyInvoiceOrder",
                    component: DeliveryBoyInvoiceOrder,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Delivery Boy Invoice Order'
                    },
                },
                {
                    path: "fund_transfers",
                    name: "DeliveryBoyFundTransfers",
                    component: DeliveryBoyFundTransfers,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Fund Transfers'
                    },
                },
                {
                    path: "cash_collection",
                    name: "DeliveryBoyCashCollection",
                    component: DeliveryBoyCashCollection,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Delivery boy cash'
                    },
                },

                {
                    path: "product_sales_reports",
                    name: "DeliveryBoyProductSalesReports",
                    component: DeliveryBoyProductSalesReports,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Product Sales Report'
                    }
                },
                {
                    path: "sales_reports",
                    name: "DeliveryBoySalesReports",
                    component: DeliveryBoySalesReports,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Sales Report'
                    }
                },

                /*{
                    path: "fund_transfers",
                    name: "Seller Fund Transfers",
                    component: FundTransfers,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Fund Transfers'
                    },
                },
                {
                    path: "cash_collection",
                    name: "Seller Delivery boy cash",
                    component: CashCollection,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Cash Collection'
                    },
                },
                {
                    path: "settings",
                    name: "seller_settings",
                    component: Settings,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Settings'
                    },
                },*/

                {
                    path: "settings",
                    name: "DeliverySettings",
                    component: DeliverySettings,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Settings'

                    },
                },
                {
                    path: "profile",
                    name: "DeliveryProfile",
                    component: DeliveryProfile,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'My Profile'
                    },
                },
                {
                    path: "manage_products/view/:id",
                    name: "DeliveryBoyViewProduct",
                    component: DeliveryBoyViewProduct,
                    props: true,
                    meta: {
                        permission: 'order_list',
                        role: deliveryBoyRoles,
                        title:'Product View'
                    },
                },
            ],
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                title:'Login'
            },
        },
        {
            path: "/forgot-password",
            name: "forgot_password",
            component: ForgotPassword,
            meta: {
                title:'Forgot Password'
            },
        },
        {
            path: "/reset-password",
            name: "reset_password",
            component: ResetPassword,
            meta: {
                title:'Reset Password'
            },
        },

        /*Other Pages*/
       
        { path: "/error_500", component: ServerError, meta: { title:'Server Error' } },
        { path: "*", component: PageNotFound, meta: { title:'404 Page Not Found' } }

    ];

   
      // Return the routes for further processing
   
    
   
}

