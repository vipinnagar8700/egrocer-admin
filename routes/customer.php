<?php

use Illuminate\Support\Facades\Route;

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, x-access-key, X-Auth-Token');

Route::group(['middleware' => ['auth.customer']], function () {

    Route::post('send_sms',[\App\Http\Controllers\API\Customer\SmsApiController::class, 'store']);
    Route::post('verify_user',[\App\Http\Controllers\API\Customer\SmsApiController::class, 'verifyContact']);
   

    Route::post('register', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'register']);
    Route::post('verify_email',[\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'verifyEmail']);
    Route::post('verify_user_exist',[\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'verifyUserExist']);
    Route::post('login', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'login']);
    Route::get('login', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'notLogin'])->name('login');
    Route::post('add_fcm_token', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'addFcmToken']);
    Route::post('forgot_password_otp', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'forgetPasswordOtp']);
    Route::post('forgot_password', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'forgotPassword']);
   

    // Guest
   
    Route::get('categories', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCategories']);
    Route::get('categories/get_seo_things', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getSeoThings']);
    Route::get('shop', [\App\Http\Controllers\API\Customer\ShopApiController::class, 'getShopData']);
    Route::get('brands', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getBrands']);
    Route::get('countries', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCountries']);
    Route::get('/sellers', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getSellers']);
    


    Route::group(['prefix' => 'products'], function () {
        Route::post('/', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getProducts']);
        Route::post('/filter', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getProducts_filter']);
        Route::post('similar', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getSimilarProducts']);
        Route::post('search', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getSearchProducts']);
        Route::get('all_names', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getAllProductNames']);
        Route::get('ratings_list', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingsList']);
        Route::post('rating/image_list', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingImageList']);

        Route::get('get_seo_things', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getSeoThings']);

    });
    Route::post('/product_by_id', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'getProduct']);

    Route::get('/faqs', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getFaqs']);
    Route::get('social_media', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getSocialMedia']);
    Route::get('newsletter', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getNewsletter']);

    // Settings
    Route::group(['prefix' => 'settings'], function () {
        Route::get('/', [\App\Http\Controllers\API\Customer\SettingApiController::class, 'getSettings']);
        Route::get('time_slots', [\App\Http\Controllers\API\Customer\SettingApiController::class, 'getTimeSlots']);
        Route::get('payment_methods', [\App\Http\Controllers\API\Customer\SettingApiController::class, 'getPaymentMethods']);
        Route::get('get_seo_settings', [\App\Http\Controllers\API\Customer\SettingApiController::class, 'getSeoSettings']);
    });

    //Languages
    Route::get('system_languages', [\App\Http\Controllers\API\LanguageApiController::class, 'getSystemLanguages']);

    // city deliverable
    Route::get('/cities', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCities']);
    Route::get('/city', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getCity']);

    Route::get('offers', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getOffers']);
    Route::get('/sliders', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getSliders']);
    Route::get('notifications', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getNotifications']);
    Route::get('/sections', [\App\Http\Controllers\API\Customer\SectionsApiController::class, 'getSections']);


    /***********************************************************************************************/
    // API After Login here

    Route::group(['middleware' => ['auth:api-customers']], function () {

        // User
        Route::post('logout', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'logout']);
        Route::post('delete_account', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'deleteAccount']);
        Route::post('edit_profile', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'editProfile']);
        Route::post('reset_password', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'ResetPassword']);
        Route::post('upload_profile', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'uploadProfile']);
        Route::post('update_fcm_token', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'updateFcmToken']);
        Route::get('user_details', [\App\Http\Controllers\API\Customer\CustomerAuthController::class, 'getLoginUserDetails']);
         

        // Transactions
        Route::get('get_user_transactions', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getUserTransactions']);
        Route::post('add_wallet_balance', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'addWalletBalance']);

        // Address
        Route::group(['prefix' => 'address'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\AddressApiController::class, 'getAddress']);
            Route::post('/add', [\App\Http\Controllers\API\Customer\AddressApiController::class, 'save']);
            Route::post('/update', [\App\Http\Controllers\API\Customer\AddressApiController::class, 'update']);
            Route::post('/delete', [\App\Http\Controllers\API\Customer\AddressApiController::class, 'delete']);
        });


        // Withdrawal Requests
        Route::group(['prefix' => 'withdrawal_requests'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\WithdrawalApiController::class, 'getRequest']);
            Route::post('/add', [\App\Http\Controllers\API\Customer\WithdrawalApiController::class, 'save']);
        });


        // Favorites
        Route::group(['prefix' => 'favorites'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getFavorites']);
            Route::post('/add', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'addToFavorite']);
            Route::post('/remove', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'removeFromFavorite']);
        });

        // Carts
        Route::group(['prefix' => 'cart'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\CartApiController::class, 'getUserCart']);
            Route::post('/add', [\App\Http\Controllers\API\Customer\CartApiController::class, 'addToCart']);
            Route::post('/remove', [\App\Http\Controllers\API\Customer\CartApiController::class, 'removeFromCart']);
            Route::post('/save_for_later', [\App\Http\Controllers\API\Customer\CartApiController::class, 'addToSaveForLater']);
            Route::post('/bulk_add_to_cart_items', [\App\Http\Controllers\API\Customer\CartApiController::class, 'BulkAddToCartItems']);
            Route::get('/get_cart_count', [\App\Http\Controllers\API\Customer\CartApiController::class, 'getCartCount']);
        });

        // Offers
        Route::group(['prefix' => 'offers'], function () {
            Route::post('/add', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'addOffers']);
            Route::post('/remove/{id}', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'removeOffers']);
        });

        // stripeTest
        Route::get('/stripeTest', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'stripeTest']);

        Route::group(['prefix' => 'sliders'], function () {
            Route::post('/add', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'addSliders']);
            Route::post('/remove/{id}', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'removeSliders']);
        });

        // Promo Code
        Route::group(['prefix' => 'promo_code'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getPromoCode']);
            Route::post('/validate', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'validatePromoCode']);
        });

        // Sections
        Route::group(['prefix' => 'sections'], function () {
            Route::get('/delivery_boy_notifications', [\App\Http\Controllers\API\Customer\SectionsApiController::class, 'getDeliveryBoyNotifications']);
            Route::post('/remove/{id}', [\App\Http\Controllers\API\Customer\SectionsApiController::class, 'removeSection']);
            //Route::post('/add', [\App\Http\Controllers\API\Customer\SectionsApiController::class, 'addSection']);
        });
        Route::group(['prefix' => 'products'], function () {
            Route::post('rating/add', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingSave']);
            Route::post('rating/edit', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingEdit']);
            Route::post('rating/update', [\App\Http\Controllers\API\Customer\ProductsApiController::class, 'productRatingUpdate']);
        });

        // order
        Route::get('orders', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'getOrders']);
        Route::post('invoice', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'generateOrderInvoice'])->name('customerInvoice');
        Route::post('invoice_download', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'downloadOrderInvoice']);

        Route::get('order_status_lists', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getOrderStatusLists']);

        Route::post('order_test', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'orderTest']);

        //Checkout
        Route::post('place_order', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'placeOrder']);
        Route::post('initiate_transaction', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'initiateTransaction']);
        Route::post('add_transaction', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'addTransaction']);
        Route::post('update_order_status', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'updateOrderStatus']);
        Route::post('delete_order', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'deletePaymentPendingOrder']);

        //Phonepe
        Route::get('order_status_phonepe', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'getOrderStatusPhonepe']);
        
        //Paypal
        
        //PayTm
        Route::get('paytm_checksum', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'generatePaytmChecksum']);
        Route::get('paytm_txn_token', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'generatePaytmTxnToken']);

        // Seller
        Route::get('/seller', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getSeller']);

        // mail_settings
        Route::group(['prefix' => 'mail_settings'], function () {
            Route::get('/', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'getMailSetting']);
            Route::post('save', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'saveMailSetting']);
        });

        Route::get('/live_tracking', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'getLiveTrackingDetails']);
    });

    //Paypal
    Route::get('paypal_payment_url', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'paypalPaymentUrl']);
    Route::match(array('GET', 'POST'), 'paypal_redirect/success', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'paypalRedirect']);
    Route::match(array('GET', 'POST'), 'paypal_redirect/fail', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'paypalRedirect']);
    Route::match(array('GET', 'POST'), 'paypal_redirect/pending', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'paypalRedirect']);
    Route::post('ipn', [\App\Http\Controllers\API\Customer\OrderApiController::class, 'ipn']);

    Route::get('distance_test', [\App\Http\Controllers\API\Customer\BasicApiController::class, 'findGoogleMapDistanceTest']);
    
});

// Guest Carts
Route::group(['prefix' => 'cart'], function () {
    Route::get('/guest_cart', [\App\Http\Controllers\API\Customer\CartApiController::class, 'getGuestCart']);
});
