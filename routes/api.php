<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'install'], function () {

    Route::get('check-composer-updates', [\App\Http\Controllers\InstallController::class, 'checkUpdates'])->name('checkComposerUpdates');
    Route::get('requirements', [\App\Http\Controllers\InstallController::class, 'getRequirements']);
    Route::post('database', [\App\Http\Controllers\InstallController::class, 'setDatabase']);
    Route::post('purchase_code', [\App\Http\Controllers\InstallController::class, 'checkPurchaseCode']);
});

Route::post('login', [\App\Http\Controllers\API\AdminAuthController::class, 'login']);
Route::post('forget-password', [\App\Http\Controllers\API\AdminAuthController::class, 'forgetPassword'])->name('forget-password');
Route::post('reset-password', [\App\Http\Controllers\API\AdminAuthController::class, 'resetPassword'])->name('reset-password');
Route::get('system_languages', [\App\Http\Controllers\API\LanguageApiController::class, 'getSystemLanguages']);

Route::post('seller/register', [\App\Http\Controllers\API\AdminAuthController::class, 'sellerRegister']);
Route::get('seller/privacy_policy', [\App\Http\Controllers\SellerController::class, 'getPrivacyPolicy']);
Route::get('seller/cities', [\App\Http\Controllers\API\CityApiController::class, 'getCities']);

Route::post('delivery_boy/register', [\App\Http\Controllers\API\AdminAuthController::class, 'deliveryBoyRegister']);

Route::post('delivery_boy/privacy_policy', [\App\Http\Controllers\DeliveryBoyController::class, 'getPrivacyPolicy']);
Route::get('delivery_boy/cities', [\App\Http\Controllers\API\CityApiController::class, 'getCities']);


Route::get('validate', [\App\Http\Controllers\API\AdminAuthController::class, 'validateLogin']);

Route::get('delivery-boy-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printPrivacyPolicy']);
Route::get('delivery-boy-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printTermsConditions']);

Route::get('seller-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printPrivacyPolicy']);
Route::get('seller-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printTermsConditions']);

Route::get('seller/categories', [\App\Http\Controllers\API\CategoryApiController::class, 'getMainCategories']);
Route::get('seller/seller_commission', [\App\Http\Controllers\API\SellerApiController::class, 'getSellerCommission']);

Route::get('role', [\App\Http\Controllers\API\RoleApiController::class, 'index']);

Route::middleware('auth:api')->group(function () {
    Route::get('admin_settings', [\App\Http\Controllers\Controller::class, 'getAdminSettings']);
    Route::get('dashboard', [\App\Http\Controllers\Controller::class, 'index']);
    Route::get('get_top_notifications', [\App\Http\Controllers\Controller::class, 'getTopNotifications']);
    Route::get('notification_read', [\App\Http\Controllers\Controller::class, 'markAsReadNotifications']);
    Route::get('create_slug/{text}', [\App\Http\Controllers\Controller::class, 'createSlug']);
    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', [\App\Http\Controllers\API\CategoryApiController::class, 'getCategories']); 
        Route::get('main', [\App\Http\Controllers\API\CategoryApiController::class, 'getMainCategories']);
        Route::get('active', [\App\Http\Controllers\API\CategoryApiController::class, 'getActiveCategories']);
        Route::post('save', [\App\Http\Controllers\API\CategoryApiController::class, 'save'])->name('categories.save');
        Route::post('update', [\App\Http\Controllers\API\CategoryApiController::class, 'update'])->name('categories.update');
        Route::post('delete', [\App\Http\Controllers\API\CategoryApiController::class, 'delete'])->name('categories.delete');
        Route::get('options', [\App\Http\Controllers\API\CategoryApiController::class, 'getOptions']);
        Route::get('row_order', [\App\Http\Controllers\API\CategoryApiController::class, 'getCategoriesByRowOrder']);
        Route::post('updateOrder', [\App\Http\Controllers\API\CategoryApiController::class, 'updateCategoriesOrder'])->name('categories.updateOrder');
        Route::get('product_count', [\App\Http\Controllers\API\CategoryApiController::class, 'countProductCategoryWise']);
        Route::get('seller_categories', [\App\Http\Controllers\API\CategoryApiController::class, 'getSellerCategories']);
        Route::get('/check-slug/{slug}', [\App\Http\Controllers\API\CategoryApiController::class,  'checkSlug']);
    });

    Route::group(['prefix' => 'subcategories'], function () {
        Route::get('/{id?}', [\App\Http\Controllers\API\SubCategoryApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SubCategoryApiController::class, 'save'])->name('subcategories.save');
        Route::post('update', [\App\Http\Controllers\API\SubCategoryApiController::class, 'update'])->name('subcategories.update');
        Route::post('delete', [\App\Http\Controllers\API\SubCategoryApiController::class, 'delete'])->name('subcategories.delete');
    });

    Route::group(['prefix' => 'seo_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\SeoSettingsApiController::class, 'getSeoSettings']);
        Route::post('save', [\App\Http\Controllers\API\SeoSettingsApiController::class, 'save'])->name('seo_settings.save');
        Route::post('update', [\App\Http\Controllers\API\SeoSettingsApiController::class, 'update'])->name('seo_settings.update');
        Route::post('delete', [\App\Http\Controllers\API\SeoSettingsApiController::class, 'delete'])->name('seo_settings.delete');
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/', [\App\Http\Controllers\API\ProductApisController::class, 'getProducts']);
        Route::get('active', [\App\Http\Controllers\API\ProductApisController::class, 'getActiveProducts']);

        Route::post('save', [\App\Http\Controllers\API\ProductApisController::class, 'save'])->name('products.save');
        Route::post('update', [\App\Http\Controllers\API\ProductApisController::class, 'update'])->name('products.update');
        Route::post('delete', [\App\Http\Controllers\API\ProductApisController::class, 'delete'])->name('products.delete');
        Route::post('multiple_delete', [\App\Http\Controllers\API\ProductApisController::class, 'multipleDelete'])->name('products.multiple_delete');

        Route::get('edit/{id}', [\App\Http\Controllers\API\ProductApisController::class, 'edit']);

        Route::post('change', [\App\Http\Controllers\API\ProductApisController::class, 'changeStatus'])->name('products.change');

        Route::get('product_info', [\App\Http\Controllers\API\ProductApisController::class, 'getProducts']);
        Route::get('order_list', [\App\Http\Controllers\API\ProductApisController::class, 'getProductsOrderList']);
        Route::post('updateOrder', [\App\Http\Controllers\API\ProductApisController::class, 'updateProductsOrder'])->name('products.updateOrder');

        Route::post('bulk_upload', [\App\Http\Controllers\API\ProductApisController::class, 'bulkUpload'])->name('products.bulk_upload');
        Route::get('download_product_data_excel', [\App\Http\Controllers\API\ProductApisController::class, 'downloadProductDataExcel']);
        Route::post('bulk_update', [\App\Http\Controllers\API\ProductApisController::class, 'bulkUpdate'])->name('products.bulk_update');
        Route::get('ratings_list', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingsList']);
        Route::group(['prefix' => 'taxes'], function () {
            Route::get('/', [\App\Http\Controllers\API\TaxesApiController::class, 'index']);
            Route::post('save', [\App\Http\Controllers\API\TaxesApiController::class, 'save'])->name('taxes.save');
            Route::post('update', [\App\Http\Controllers\API\TaxesApiController::class, 'update'])->name('taxes.update');
            Route::post('delete', [\App\Http\Controllers\API\TaxesApiController::class, 'delete'])->name('taxes.delete');
        });
        Route::group(['prefix' => 'brands'], function () {
            Route::get('/', [\App\Http\Controllers\API\BrandsApiController::class, 'list']);
            Route::post('save', [\App\Http\Controllers\API\BrandsApiController::class, 'save'])->name('brands.save');
            Route::post('update', [\App\Http\Controllers\API\BrandsApiController::class, 'update'])->name('brands.update');
            Route::post('delete', [\App\Http\Controllers\API\BrandsApiController::class, 'delete'])->name('brands.delete');
            Route::get('/get', [\App\Http\Controllers\API\BrandsApiController::class, 'getBrands']);
        });
        Route::group(['prefix' => 'tags'], function () {
            Route::get('/', [\App\Http\Controllers\API\TagsApiController::class, 'search']);
        });
        Route::get('get_product_variants', [\App\Http\Controllers\API\ProductApisController::class, 'getProductVariants']);
        Route::post('update_variant_stock', [\App\Http\Controllers\API\ProductApisController::class, 'updateVariantStock']);
    });

    Route::group(['prefix' => 'sellers'], function () {
        Route::get('/', [\App\Http\Controllers\API\SellerApiController::class, 'getSellers']);
        Route::post('save', [\App\Http\Controllers\API\SellerApiController::class, 'save'])->name('sellers.save');
        Route::post('update', [\App\Http\Controllers\API\SellerApiController::class, 'update'])->name('sellers.update');
        Route::post('delete', [\App\Http\Controllers\API\SellerApiController::class, 'delete'])->name('sellers.delete');
        Route::get('edit/{id}', [\App\Http\Controllers\API\SellerApiController::class, 'edit']);
        Route::post('update_status', [\App\Http\Controllers\API\SellerApiController::class, 'updateStatus'])->name('sellers.update-status');
        Route::get('updateCommission', [\App\Http\Controllers\API\SellerApiController::class, 'updateCommission'])->name('sellers.updateCommission');
    });

    Route::group(['prefix' => 'home_slider_images'], function () {
        Route::get('/', [\App\Http\Controllers\API\HomeSliderImagesApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\HomeSliderImagesApiController::class, 'save'])->name('home_slider_images.save');
        Route::post('update', [\App\Http\Controllers\API\HomeSliderImagesApiController::class, 'update'])->name('home_slider_images.update');
        Route::post('delete', [\App\Http\Controllers\API\HomeSliderImagesApiController::class, 'delete'])->name('home_slider_images.delete');
    });

    Route::group(['prefix' => 'promo_code'], function () {
        Route::get('/', [\App\Http\Controllers\API\PromoCodeApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PromoCodeApiController::class, 'save'])->name('promo_code.save');
        Route::post('update', [\App\Http\Controllers\API\PromoCodeApiController::class, 'update'])->name('promo_code.update');
        Route::post('delete', [\App\Http\Controllers\API\PromoCodeApiController::class, 'delete'])->name('promo_code.delete');
    });

    Route::group(['prefix' => 'delivery_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'save'])->name('time_slots.save');
        Route::post('update', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'update'])->name('time_slots.update');
        Route::post('delete', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'delete'])->name('time_slots.delete');
        Route::post('saveTimeSlotsSettings', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'saveTimeSlotsSettings'])->name('time_slots.saveTimeSlotsSettings');
        Route::get('getTimeSlotsSettings', [\App\Http\Controllers\API\TimeSlotsApiController::class, 'getTimeSlotsSettings']);
    });

    Route::group(['prefix' => 'units'], function () {
        Route::get('/', [\App\Http\Controllers\API\UnitApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\UnitApiController::class, 'save'])->name('units.save');
        Route::post('update', [\App\Http\Controllers\API\UnitApiController::class, 'update'])->name('units.update');
        Route::post('delete', [\App\Http\Controllers\API\UnitApiController::class, 'delete'])->name('units.delete');
        Route::get('/get', [\App\Http\Controllers\API\UnitApiController::class, 'getUnits']);
    });


    Route::group(['prefix' => 'payment_methods'], function () {
        Route::get('/', [\App\Http\Controllers\API\PaymentMethodsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PaymentMethodsApiController::class, 'save'])->name('payment_methods.save');
    });

    Route::group(['prefix' => 'sms_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\SmsSettingsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SmsSettingsApiController::class, 'save'])->name('sms_settings.save');
    });

    Route::group(['prefix' => 'sms_templates'], function () {
        Route::get('/', [\App\Http\Controllers\API\SmsTemplatesApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SmsTemplatesApiController::class, 'save'])->name('sms_templates.save');
        Route::post('update', [\App\Http\Controllers\API\SmsTemplatesApiController::class, 'update'])->name('sms_templates.update');
    });

    Route::group(['prefix' => 'store_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'save'])->name('store_settings.save');
        Route::post('save_login_setting', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'save_login_setting'])->name('store_settings.save_login_setting');
        Route::get('/purchase_code', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'getPurchaseCode']);
        Route::get('/purchase_code/{code}', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'purchaseCode']);
        Route::get('/purchase_code_updater', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'getPurchaseCodeUpdater']);
        Route::post('/test_mail', [\App\Http\Controllers\API\StoreSettingsApiController::class, 'testMail']);
    });

    Route::group(['prefix' => 'mail_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\MailSettingsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\MailSettingsApiController::class, 'save'])->name('mail_settings.save');
    });

    Route::group(['prefix' => 'firebase'], function () {
        Route::get('/', [\App\Http\Controllers\API\FirebaseApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\FirebaseApiController::class, 'save'])->name('firebase.save');
    });

    Route::group(['prefix' => 'popup'], function () {
        Route::get('/', [\App\Http\Controllers\API\PopupApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PopupApiController::class, 'save'])->name('popup.save');
    });


    Route::group(['prefix' => 'notification_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\NotificationSettingsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\NotificationSettingsApiController::class, 'save'])->name('notification_settings.save');
    });
    Route::group(['prefix' => 'contact_us'], function () {
        Route::get('/', [\App\Http\Controllers\API\ContactUsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\ContactUsApiController::class, 'save'])->name('contact_us.save');
    });
    Route::group(['prefix' => 'about_us'], function () {
        Route::get('/', [\App\Http\Controllers\API\AboutUsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\AboutUsApiController::class, 'save'])->name('about_us.save');
    });


    Route::group(['prefix' => 'privacy_policy'], function () {
        Route::get('/', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'save'])->name('privacy_policy.save');
    });

    Route::group(['prefix' => 'privacy_policy_delivery_boy'], function () {
        Route::get('/', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'save'])->name('privacy_policy_delivery_boy.save');
    });

    Route::group(['prefix' => 'privacy_policy_manager_app'], function () {
        Route::get('/', [\App\Http\Controllers\API\PrivacyPolicyManagerAppApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PrivacyPolicyManagerAppApiController::class, 'save'])->name('privacy_policy_manager_app.save');
    });

    Route::group(['prefix' => 'privacy_policy_seller'], function () {
        Route::get('/', [\App\Http\Controllers\API\PrivacyPolicySellerApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\PrivacyPolicySellerApiController::class, 'save'])->name('privacy_policy_seller.save');
    });
    Route::group(['prefix' => 'notifications'], function () {
        Route::get('/', [\App\Http\Controllers\API\NotificationsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\NotificationsApiController::class, 'save'])->name('notifications.save');
        Route::post('delete', [\App\Http\Controllers\API\NotificationsApiController::class, 'delete'])->name('notifications.delete');
    });
    Route::group(['prefix' => 'emails'], function () {
        Route::get('/', [\App\Http\Controllers\API\EmailsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\EmailsApiController::class, 'save'])->name('emails.save');
        Route::post('delete', [\App\Http\Controllers\API\EmailsApiController::class, 'delete'])->name('emails.delete');
    });
    Route::group(['prefix' => 'email_templates'], function () {
        Route::get('/', [\App\Http\Controllers\API\EmailTemplatesApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\EmailTemplatesApiController::class, 'save'])->name('email_templates.save');
        Route::post('update', [\App\Http\Controllers\API\EmailTemplatesApiController::class, 'update'])->name('email_templates.update');
        Route::post('delete', [\App\Http\Controllers\API\EmailTemplatesApiController::class, 'delete'])->name('email_templates.delete');
    });
    Route::group(['prefix' => 'sections'], function () {
        Route::get('/', [\App\Http\Controllers\API\SectionsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SectionsApiController::class, 'save'])->name('sections.save');
        Route::post('update', [\App\Http\Controllers\API\SectionsApiController::class, 'update'])->name('sections.update');
        Route::post('delete', [\App\Http\Controllers\API\SectionsApiController::class, 'delete'])->name('sections.delete');
        Route::get('row_order', [\App\Http\Controllers\API\SectionsApiController::class, 'getSectionsByRowOrder']);
        Route::post('updateOrder', [\App\Http\Controllers\API\SectionsApiController::class, 'updateSectionsOrder'])->name('sections.updateOrder');
    });

    Route::group(['prefix' => 'offers'], function () {
        Route::get('/', [\App\Http\Controllers\API\OffersApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\OffersApiController::class, 'save'])->name('offers.save');
        Route::post('update', [\App\Http\Controllers\API\OffersApiController::class, 'update'])->name('offers.update');
        Route::post('delete', [\App\Http\Controllers\API\OffersApiController::class, 'delete'])->name('offers.delete');
    });

    Route::group(['prefix' => 'delivery_boys'], function () {
        Route::get('/', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'getDeliveryBoy']);
        Route::get('bonus_settings', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'getDeliveryBoyBonusSettings']);

        Route::post('save', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'save'])->name('delivery_boys.save');
        Route::get('edit/{id}', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'edit']);
        Route::post('update', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'update'])->name('delivery_boys.update');
        Route::post('delete', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'delete'])->name('delivery_boys.delete');
        Route::post('update-status', [\App\Http\Controllers\API\DeliveryBoysApiController::class, 'updateStatus'])->name('delivery_boys.update-status');
    });

    Route::group(['prefix' => 'fund_transfers'], function () {
        Route::get('/', [\App\Http\Controllers\API\FundTransfersApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\FundTransfersApiController::class, 'save'])->name('fund_transfers.save');
    });

    Route::group(['prefix' => 'cash_collection'], function () {
        Route::get('/', [\App\Http\Controllers\API\CashCollectionApiController::class, 'getCashCollection']);
        Route::post('save', [\App\Http\Controllers\API\CashCollectionApiController::class, 'save'])->name('cash_collection.save');
    });

    Route::group(['prefix' => 'front_end_policies'], function () {
        Route::get('/', [\App\Http\Controllers\API\FrontEndPoliciesApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\FrontEndPoliciesApiController::class, 'save'])->name('front_end_policies.save');
    });

    Route::group(['prefix' => 'web_settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\WebSettingsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\WebSettingsApiController::class, 'save'])->name('web_settings.save');
    });

    Route::group(['prefix' => 'front_end_about'], function () {
        Route::get('/', [\App\Http\Controllers\API\FrontEndAboutApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\FrontEndAboutApiController::class, 'save'])->name('front_end_about.save');
    });

    Route::group(['prefix' => 'social_media'], function () {
        Route::get('/', [\App\Http\Controllers\API\SocialMediaApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SocialMediaApiController::class, 'save'])->name('social_media.save');;
        Route::post('update', [\App\Http\Controllers\API\SocialMediaApiController::class, 'update'])->name('social_media.update');
        Route::post('delete', [\App\Http\Controllers\API\SocialMediaApiController::class, 'delete'])->name('social_media.delete');
    });

    Route::group(['prefix' => 'customers'], function () {
        Route::get('/', [\App\Http\Controllers\API\CustomersApiController::class, 'getCustomers']);
        Route::post('change', [\App\Http\Controllers\API\CustomersApiController::class, 'changeStatus'])->name('customers.change');
    });

    Route::group(['prefix' => 'wallet_transactions'], function () {
        Route::get('/', [\App\Http\Controllers\API\WalletTransactionsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\WalletTransactionsApiController::class, 'save'])->name('wallet_transactions.save');
    });

    Route::group(['prefix' => 'transactions'], function () {
        Route::get('/', [\App\Http\Controllers\API\TransactionsApiController::class, 'index']);
    });
    Route::group(['prefix' => 'wishlists'], function () {
        Route::get('/', [\App\Http\Controllers\API\WishlistsApiController::class, 'index']);
    });

    Route::group(['prefix' => 'system_users'], function () {
        Route::get('/', [\App\Http\Controllers\API\SystemUsersApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SystemUsersApiController::class, 'save'])->name('system_users.save');
        Route::post('update', [\App\Http\Controllers\API\SystemUsersApiController::class, 'update'])->name('system_users.update');
        Route::post('delete', [\App\Http\Controllers\API\SystemUsersApiController::class, 'delete'])->name('system_users.delete');
        Route::post('change_password', [\App\Http\Controllers\API\SystemUsersApiController::class, 'changePassword'])->name('system_users.change_password');
    });

    Route::group(['prefix' => 'withdrawal_requests'], function () {
        Route::get('/', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'index']);
        Route::post('update', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'update'])->name('withdrawal_requests.update');
        Route::post('delete', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'delete'])->name('withdrawal_requests.delete');

        Route::post('/add', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'addWithdrawalRequests']);
        Route::get('get', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'getWithdrawalRequests']);
        Route::get('get_balance', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'getBalance']);
    });
 
    Route::group(['prefix' => 'return_requests'], function () {
        Route::get('/', [\App\Http\Controllers\API\ReturnRequestsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\ReturnRequestsApiController::class, 'save'])->name('return_requests.save');
        Route::post('update', [\App\Http\Controllers\API\ReturnRequestsApiController::class, 'update'])->name('return_requests.update');
        Route::post('delete', [\App\Http\Controllers\API\ReturnRequestsApiController::class, 'delete'])->name('return_requests.delete');
    });

    Route::group(['prefix' => 'sales_reports'], function () {
        Route::get('/', [\App\Http\Controllers\API\SalesReportsApiController::class, 'getSalesReport']);
        Route::get('/export_excel', [\App\Http\Controllers\API\SalesReportsApiController::class, 'excelSalesReport']);

    });

    Route::group(['prefix' => 'product_sales_reports'], function () {
        Route::get('/', [\App\Http\Controllers\API\ProductSalesReportsApiController::class, 'getProductSalesReport']);
    });

    Route::group(['prefix' => 'order_statuses'], function () {
        Route::get('/', [\App\Http\Controllers\API\OrderStatusApiController::class, 'getOrderStatus']);
    });

    Route::group(['prefix' => 'orders'], function () {
        //Route::get('/', [\App\Http\Controllers\API\OrdersApiController::class, 'index']);
        Route::get('/', [\App\Http\Controllers\API\OrdersApiController::class, 'getOrders']);
        Route::get('/view/{id}', [\App\Http\Controllers\API\OrdersApiController::class, 'view']);

        Route::get('invoice', [\App\Http\Controllers\API\OrdersApiController::class, 'generateOrderInvoice']);
        Route::post('invoice_download', [\App\Http\Controllers\API\OrdersApiController::class, 'downloadOrderInvoice']);

        Route::post('/delete', [\App\Http\Controllers\API\OrdersApiController::class, 'delete'])->name('orders.delete');
        Route::post('/delete_item', [\App\Http\Controllers\API\OrdersApiController::class, 'deleteItem'])->name('orders.deleteItem');
        Route::get('/weekly_sales', [\App\Http\Controllers\API\OrdersApiController::class, 'getWeeklySales']);

        Route::post('/update_status', [\App\Http\Controllers\API\OrdersApiController::class, 'updateStatus'])->name('orders.update_status');
        Route::post('/assign_delivery_boy', [\App\Http\Controllers\API\OrdersApiController::class, 'assignDeliveryBoy'])->name('orders.assign_delivery_boy');

        Route::post('/update_items_status', [\App\Http\Controllers\API\OrdersApiController::class, 'updateItemsStatus'])->name('orders.update_items_status');
    });

    Route::group(['prefix' => 'role'], function () {
      //  Route::get('/', [\App\Http\Controllers\API\RoleApiController::class, 'index']);
        Route::get('permissions', [\App\Http\Controllers\API\RoleApiController::class, 'getPermissions']);
        Route::post('save', [\App\Http\Controllers\API\RoleApiController::class, 'save'])->name('role.save');
        Route::get('edit/{id}', [\App\Http\Controllers\API\RoleApiController::class, 'edit']);
        Route::post('update', [\App\Http\Controllers\API\RoleApiController::class, 'update'])->name('role.update');
        Route::post('delete', [\App\Http\Controllers\API\RoleApiController::class, 'delete'])->name('role.delete');
    });


    Route::group(['prefix' => 'media'], function () {
        Route::get('/', [\App\Http\Controllers\API\MediaApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\MediaApiController::class, 'save'])->name('media.save');
        Route::post('delete', [\App\Http\Controllers\API\MediaApiController::class, 'delete'])->name('media.delete');
        Route::post('multiple_delete', [\App\Http\Controllers\API\MediaApiController::class, 'multipleDelete'])->name('media.multiple_delete');
    });

    Route::group(['prefix' => 'seller_wallet_transactions'], function () {
        Route::get('/', [\App\Http\Controllers\API\SellerWalletTransactionsApiController::class, 'getSellerWalletTransactions']);
        Route::post('save', [\App\Http\Controllers\API\SellerWalletTransactionsApiController::class, 'save'])->name('seller_wallet_transactions.save');

    });

    Route::group(['prefix' => 'shipping_methods'], function () {
        Route::get('/', [\App\Http\Controllers\API\ShippingMethodsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\ShippingMethodsApiController::class, 'save'])->name('shipping_methods.save');
    });
    Route::post('shiprocket_webhook', [\App\Http\Controllers\API\ShippingMethodsApiController::class, 'shiprocket_webhook']);

    Route::group(['prefix' => 'newsletter'], function () {
        Route::get('/', [\App\Http\Controllers\API\NewsletterApiController::class, 'index']);
    });

    Route::group(['prefix' => 'seller_commissions'], function () {
        Route::get('/', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'save'])->name('seller_commissions.save');
        Route::get('edit/{id}', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'edit']);
        Route::post('update', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'update'])->name('seller_commissions.update');
        Route::post('delete', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'delete'])->name('seller_commissions.delete');
        Route::get('formData/{id}', [\App\Http\Controllers\API\SellerCommissionsApiController::class, 'formData']);
    });
    // Route::get('countries', [\App\Http\Controllers\API\CountryApiController::class, 'index']);
    Route::group(['prefix' => 'cities'], function () {
        Route::get('/', [\App\Http\Controllers\API\CityApiController::class, 'getCities']);
        Route::post('save', [\App\Http\Controllers\API\CityApiController::class, 'save'])->name('cities.save');
        Route::post('save_boundary', [\App\Http\Controllers\API\CityApiController::class, 'save_boundary'])->name('cities.save_boundary');
        Route::get('edit/{id}', [\App\Http\Controllers\API\CityApiController::class, 'edit']);
        Route::post('update', [\App\Http\Controllers\API\CityApiController::class, 'update'])->name('cities.update');
        Route::post('delete', [\App\Http\Controllers\API\CityApiController::class, 'delete'])->name('cities.delete');
    });

    Route::group(['prefix' => 'faqs'], function () {
        Route::get('/', [\App\Http\Controllers\API\FaqsApiController::class, 'index']);
        Route::post('save', [\App\Http\Controllers\API\FaqsApiController::class, 'save'])->name('faqs.save');
        Route::post('update', [\App\Http\Controllers\API\FaqsApiController::class, 'update'])->name('faqs.update');
        Route::post('delete', [\App\Http\Controllers\API\FaqsApiController::class, 'delete'])->name('faqs.delete');
    });


    Route::group(['prefix' => 'languages'], function () {
        Route::get('/', [\App\Http\Controllers\API\LanguageApiController::class, 'index']);
        Route::get('supported_languages', [\App\Http\Controllers\API\LanguageApiController::class, 'getSupportedLanguages']);
        Route::post('save', [\App\Http\Controllers\API\LanguageApiController::class, 'save'])->name('languages.save');
        Route::post('update', [\App\Http\Controllers\API\LanguageApiController::class, 'update'])->name('languages.update');
        Route::post('delete', [\App\Http\Controllers\API\LanguageApiController::class, 'delete'])->name('languages.delete');
    });

    Route::group(['prefix' => 'countries'], function () {
        Route::get('/', [\App\Http\Controllers\API\CountryApiController::class, 'index']);
        Route::get('/active', [\App\Http\Controllers\API\CountryApiController::class, 'active']);
        Route::post('save', [\App\Http\Controllers\API\CountryApiController::class, 'save'])->name('countries.save');
        Route::post('update', [\App\Http\Controllers\API\CountryApiController::class, 'update'])->name('countries.update');
        Route::post('delete', [\App\Http\Controllers\API\CountryApiController::class, 'delete'])->name('countries.delete');
    });


    Route::group(['prefix' => 'panel_notification'], function () {
        Route::get('/', [\App\Http\Controllers\API\NotificationPanelApiController::class, 'getNotifications']);
    });

    /*Seller*/
    /***********************************************************************************************/

    Route::group(['prefix' => 'seller'], function () { 
        /*Dashboard*/
        Route::get('dashboard', [\App\Http\Controllers\SellerController::class, 'index']);
        Route::get('get_products', [\App\Http\Controllers\API\ProductApisController::class, 'getProducts_sellerapp']);
        Route::post('update_seller_status', [\App\Http\Controllers\API\SellerApiController::class, 'updateStatus'])->name('sellers.update_seller_status');
        Route::post('get_seller_status', [\App\Http\Controllers\API\SellerApiController::class, 'getStatus'])->name('sellers.get_seller_status');

        Route::get('products/product_info', [\App\Http\Controllers\SellerController::class, 'getProducts']);
        Route::get('orders/weekly_sales', [\App\Http\Controllers\SellerController::class, 'getWeeklySales']);
        Route::get('/seller_categories_list', [\App\Http\Controllers\API\CategoryApiController::class, 'getCategories']); 
        Route::get('categories/product_count', [\App\Http\Controllers\SellerController::class, 'countProductCategoryWise']);
        Route::get('orders', [\App\Http\Controllers\SellerController::class, 'getOrders']);

        Route::get('order_by_id', [\App\Http\Controllers\SellerController::class, 'getOrder']);

        Route::post('update_status', [\App\Http\Controllers\API\OrdersApiController::class, 'updateStatus'])->name('seller.update_status');
        Route::post('assign_delivery_boy', [\App\Http\Controllers\API\OrdersApiController::class, 'assignDeliveryBoy'])->name('seller.assign_delivery_boy');

        Route::get('order_statuses', [\App\Http\Controllers\SellerController::class, 'getOrderStatus']);
      
        Route::get('return_requests', [\App\Http\Controllers\SellerController::class, 'getReturnRequests']);
        Route::get('product_sales_reports', [\App\Http\Controllers\SellerController::class, 'getProductSalesReport']);
        Route::get('sales_reports', [\App\Http\Controllers\SellerController::class, 'getSalesReport']);
        Route::get('settings', [\App\Http\Controllers\SellerController::class, 'getSettings']);
        Route::get('delivery_boys', [\App\Http\Controllers\SellerController::class, 'getDeliveryBoys']);

        Route::get('main_categories', [\App\Http\Controllers\SellerController::class, 'getMainCategories']);
        Route::get('seller_categories', [\App\Http\Controllers\API\CategoryApiController::class, 'getSellerCategories']);
       
        Route::get('city', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCity']);
        
        Route::get('countries', [\App\Http\Controllers\API\CountryApiController::class, 'getCountries']);


        Route::group(['prefix' => 'brands'], function () {
            Route::get('/', [\App\Http\Controllers\API\BrandsApiController::class, 'getBrands']);
            Route::post('save', [\App\Http\Controllers\API\BrandsApiController::class, 'save'])->name('seller.brands.save');
            Route::post('update', [\App\Http\Controllers\API\BrandsApiController::class, 'update'])->name('brands.update');
            Route::post('delete', [\App\Http\Controllers\API\BrandsApiController::class, 'delete'])->name('brands.delete');
        });

        Route::group(['prefix' => 'units'], function () {
            Route::get('/', [\App\Http\Controllers\API\UnitApiController::class, 'getUnits']);
            Route::post('save', [\App\Http\Controllers\API\UnitApiController::class, 'save'])->name('units.save');
            Route::post('update', [\App\Http\Controllers\API\UnitApiController::class, 'update'])->name('units.update');
            Route::post('delete', [\App\Http\Controllers\API\UnitApiController::class, 'delete'])->name('units.delete');
        });
        
         Route::group(['prefix' => 'taxes'], function () {
            Route::get('/', [\App\Http\Controllers\API\TaxesApiController::class, 'getTaxes']);
            Route::post('save', [\App\Http\Controllers\API\TaxesApiController::class, 'save'])->name('taxes.save');
            Route::post('update', [\App\Http\Controllers\API\TaxesApiController::class, 'update'])->name('taxes.update');
            Route::post('delete', [\App\Http\Controllers\API\TaxesApiController::class, 'delete'])->name('taxes.delete');
        });

        Route::group(['prefix' => 'mail_settings'], function () {
            Route::get('/', [\App\Http\Controllers\API\MailSettingsApiController::class, 'index']);
            Route::post('save', [\App\Http\Controllers\API\MailSettingsApiController::class, 'save'])->name('seller.mail_settings.save');
        });

        Route::group(['prefix' => 'products'], function () {
            Route::get('/', [\App\Http\Controllers\API\ProductApisController::class, 'getProducts']);
            Route::get('active', [\App\Http\Controllers\API\ProductApisController::class, 'getActiveProducts']);
            Route::get('/product_by_id', [\App\Http\Controllers\API\ProductApisController::class, 'getProduct']);
            Route::post('save', [\App\Http\Controllers\API\ProductApisController::class, 'save'])->name('products.save');
            Route::get('edit/{id}', [\App\Http\Controllers\API\ProductApisController::class, 'edit']);
            Route::post('update', [\App\Http\Controllers\API\ProductApisController::class, 'update'])->name('products.update');
            Route::post('delete', [\App\Http\Controllers\API\ProductApisController::class, 'delete'])->name('products.delete');
            Route::post('multiple_delete', [\App\Http\Controllers\API\ProductApisController::class, 'multipleDelete'])->name('products.multiple_delete');
            Route::get('/brands', [\App\Http\Controllers\API\BrandsApiController::class, 'index']);
            Route::get('/taxes', [\App\Http\Controllers\API\TaxesApiController::class, 'index']); 
            Route::get('ratings_list', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingsList']);
            Route::get('/tags', [\App\Http\Controllers\API\TagsApiController::class, 'search']);
            Route::post('bulk_upload', [\App\Http\Controllers\API\ProductApisController::class, 'bulkUpload'])->name('products.bulk_upload');
            Route::get('download_product_data_excel', [\App\Http\Controllers\API\ProductApisController::class, 'downloadProductDataExcel']);
            Route::post('bulk_update', [\App\Http\Controllers\API\ProductApisController::class, 'bulkUpdate'])->name('products.bulk_update');
            Route::get('get_product_variants', [\App\Http\Controllers\API\ProductApisController::class, 'getProductVariants']);
            Route::post('update_variant_stock', [\App\Http\Controllers\API\ProductApisController::class, 'updateVariantStock']);
        });
        Route::get('/seller_wallet_transactions', [\App\Http\Controllers\API\SellerWalletTransactionsApiController::class, 'getSellerWalletTransactions']);
        Route::get('/delete_seller_account', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'deleteSellerAccount'])->name('seller.delete_seller_account');
        Route::group(['prefix' => 'withdrawal_requests'], function () {
            Route::get('/', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'index']);
            Route::post('update', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'update'])->name('withdrawal_requests.update');
            Route::post('delete', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'delete'])->name('withdrawal_requests.delete');
    
            Route::post('/add', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'addWithdrawalRequests']);
            Route::get('get', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'getWithdrawalRequests']);
            Route::get('get_balance', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'getBalance']);
        });

    });


    /*delivery_boy*/
    /***********************************************************************************************/

    Route::group(['prefix' => 'delivery_boy'], function () {
        Route::get('dashboard', [\App\Http\Controllers\DeliveryBoyController::class, 'index']);
        Route::get('orders', [\App\Http\Controllers\DeliveryBoyController::class, 'getOrders']);
        Route::get('order_by_id', [\App\Http\Controllers\DeliveryBoyController::class, 'getOrder']);
        Route::post('update_status', [\App\Http\Controllers\API\OrdersApiController::class, 'updateStatus'])->name('delivery_boy.update_status');
        Route::get('order_statuses', [\App\Http\Controllers\DeliveryBoyController::class, 'getOrderStatus']);

        Route::get('cash_collection', [\App\Http\Controllers\DeliveryBoyController::class, 'getCashCollection']);
        Route::get('fund_transfers', [\App\Http\Controllers\DeliveryBoyController::class, 'getFundTransfers']);

        Route::get('product_sales_reports', [\App\Http\Controllers\DeliveryBoyController::class, 'getProductSalesReport']);
        Route::get('sales_reports', [\App\Http\Controllers\DeliveryBoyController::class, 'getSalesReport']);
        Route::get('settings', [\App\Http\Controllers\DeliveryBoyController::class, 'getSettings']);
        Route::get('city', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCity']);

        Route::group(['prefix' => 'mail_settings'], function () {
            Route::get('/', [\App\Http\Controllers\API\MailSettingsApiController::class, 'index']);
            Route::post('save', [\App\Http\Controllers\API\MailSettingsApiController::class, 'save'])->name('delivery_boy.mail_settings.save');
        });
        Route::get('/delete_delivery_boy_account', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'deleteDeliveryBoyAccount'])->name('delivery_boy.delete_delivery_boy_account');;

        Route::group(['prefix' => 'withdrawal_requests'], function () {
            Route::get('/', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'index']);
            Route::post('/add', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'addWithdrawalRequests']);
            Route::get('get', [\App\Http\Controllers\API\WithdrawalRequestsApiController::class, 'getWithdrawalRequests']);
        });
        Route::post('manage_live_tracking', [\App\Http\Controllers\DeliveryBoyController::class, 'manageLiveTracking'])->name('delivery_boy.manage_live_tracking');
    });

    Route::get('set_seller_wallet_transaction', [\App\Http\Controllers\Controller::class, 'setSellerWalletTransaction']);
    //Route::get('database_backup', [App\Http\Controllers\DatabaseBackupController::class, 'download'])->name('database_backup.download');
    Route::get('database_backup_download', [App\Http\Controllers\DatabaseBackupController::class, 'download_db_backup'])->name('database_backup_download.download_db_backup');


});
Route::prefix('oauth')->group(function () {
    Route::post('token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
    Route::get('tokens', '\Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@forUser');
    Route::delete('tokens/{token_id}', '\Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@destroy');
    Route::post('token/refresh', '\Laravel\Passport\Http\Controllers\TransientTokenController@refresh');
});

