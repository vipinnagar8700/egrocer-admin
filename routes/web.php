<?php

use App\Helpers\CommonHelper;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Crypt;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
  

Route::get('/clear', function () {

    // \Artisan::call('cache:clear', ['--force' => true, '--no-interaction' => true]); // ok
    \Artisan::call('cache:clear'); // ok
    $data['cache'] = Artisan::output();

    // \Artisan::call('config:clear', ['--force' => true, '--no-interaction' => true]); // ok
    \Artisan::call('config:clear'); // ok
    $data['config'] = Artisan::output();

    // \Artisan::call('route:clear', ['--force' => true, '--no-interaction' => true]); // ok
    \Artisan::call('route:clear'); // ok
    $data['route'] = Artisan::output();

    // \Artisan::call('view:clear', ['--force' => true, '--no-interaction' => true]); // ok
    \Artisan::call('view:clear'); // ok
    $data['view'] = Artisan::output();


     return \App\Helpers\CommonHelper::responseSuccessWithData('Cache cleared successfully!',$data);
});
//Auto update , than migration check
Route::get('/migration', function () {

    // Run the database migration with force and no-interaction options
    \Artisan::call('migrate', ['--force' => true, '--no-interaction' => true]);
    \Artisan::call('db:seed', [
        '--class' => 'PermissionCategoriesSeeder',
        '--force' => true,
        '--no-interaction' => true,
    ]);
    
    \Artisan::call('db:seed', [
        '--class' => 'PermissionSeeder',
        '--force' => true,
        '--no-interaction' => true,
    ]);

     return redirect('/system_updater');
});
Route::get('/supported_language', function () {

    $command = 'php artisan db:seed --class=SupportedLanguageSeeder';
    $output = [];
    $returnValue = 0;

    exec($command, $output, $returnValue);

    if ($returnValue !== 0) {
        $output['exec_error'] = "Error executing command: " . implode("\n", $output);

        try {
            \Artisan::call('db:seed', [
                '--class' => 'SupportedLanguageSeeder',
            ]);

            $message = \Artisan::output();
            $output['artisan_success'] = $message. " by Artisan methods.";

        } catch (Exception $e) {
            $output['exception'] = $e->getMessage();
        }

    } else {
        $output['exec_success'] = "Command executed successfully. by exec methods.";
    }

    return \App\Helpers\CommonHelper::responseSuccessWithData('Supported languages added successfully!',$output);

});

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
  
    return Artisan::output();
});

Route::get('/generate_key', function () {
    Artisan::call('key:generate');
    // echo 'Encryption key generated!';
    return Artisan::output();
});

Route::get('/migrate', function () {
    Artisan::call('migrate');
    return Artisan::output();
});


Route::get('/get_path', function () {
    echo __DIR__;
});

Route::get('/order_invoice/{order_id}', function ($order_id) {
    $data = CommonHelper::getOrderDetails($order_id);
    if(!$data["order"]){
        return CommonHelper::responseError("Order Not found!");
    }
    $invoice = view('invoiceMpdf', $data)->render();
    echo $invoice;
});

Route::get('get-google-key', function () {
    return response()->json(['key' => \App\Models\Setting::get_value('google_place_api_key')]);
});



Route::post('save_token', [App\Http\Controllers\Controller::class, 'updateToken'])->name('fcmToken');

Route::get('test', [App\Http\Controllers\Controller::class, 'test']);
Route::get('database_backup_download', [App\Http\Controllers\DatabaseBackupController::class, 'download_db_backup'])->name('database_backup_download.download_db_backup');

Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);
Route::get('deploy', [\App\Http\Controllers\Controller::class, 'deploy']);

Route::view('mail_theame','mail');

Route::get('customer-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'printPrivacyPolicy']);
Route::get('customer-returns-and-exchanges-policy', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'printReturnsAndExchangesPolicy']);
Route::get('customer-shipping-policy', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'printShippingPolicy']);
Route::get('customer-cancellation-policy', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'printCancellationPolicy']);
Route::get('customer-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyApiController::class, 'printTermsConditions']);

Route::get('delivery-boy-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printPrivacyPolicy']);
Route::get('delivery-boy-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyDeliveryBoyApiController::class, 'printTermsConditions']);

Route::get('seller-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicySellerApiController::class, 'printPrivacyPolicy']);
Route::get('seller-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicySellerApiController::class, 'printTermsConditions']);

Route::get('manager-privacy-policy', [\App\Http\Controllers\API\PrivacyPolicyManagerAppApiController::class, 'printPrivacyPolicy']);
Route::get('manager-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyManagerAppApiController::class, 'printTermsConditions']);

Route::get('manager-terms-conditions', [\App\Http\Controllers\API\PrivacyPolicyManagerAppApiController::class, 'printTermsConditions']);

//Webhook
Route::post('midtrans/callback', [\App\Http\Controllers\MidtransController::class, 'midtransWebhook']);
Route::post('webhook/stripe', [\App\Http\Controllers\StripeController::class, 'stripeWebhook']);
Route::get('phonepe/callback', [\App\Http\Controllers\PhonepeController::class, 'phonepeWebhook'])->name('phonepe.callback');
Route::post('phonepe/redirect', [\App\Http\Controllers\PhonepeController::class, 'phonepeRedirect'])->name('phonepe.redirect');

Route::post('cashfree/callback', [\App\Http\Controllers\CashfreeController::class, 'cashfreeWebhook'])->name('cashfree.callback');
Route::get('cashfree/redirect', [\App\Http\Controllers\CashfreeController::class, 'cashfreeRedirect'])->name('cashfree.redirect');

Route::post('paytabs/callback', [\App\Http\Controllers\PaytabsController::class, 'paytabsWebhook'])->name('paytabs.callback');
Route::match(['get', 'post'], 'paytabs/redirect', [\App\Http\Controllers\PaytabsController::class, 'paytabsRedirect'])->name('paytabs.redirect');

//for localization in vuejs
Route::post('api/change_language', [\App\Http\Controllers\Controller::class, 'doLanguageChange'])->name('change_language');

Route::get('/js/lang', function() {

    $lang = config('app.locale');
    $lang = $lang ?? 'en';
    $file = Cache::rememberForever('lang.js', function () {
        $lang = config('app.locale');
        $lang = $lang ?? 'en';

        return file_get_contents(resource_path('lang/' . $lang . '.json'));
    });
    header('Content-Type: text/javascript');
    echo('window.i18n = ' . $file);
    exit();
})->name('assets.lang')->withoutMiddleware('auth:sanctum');


Route::get('firebase-messaging-sw.js', [\App\Http\Controllers\API\FirebaseApiController::class, 'firebaseMessagingJsCode'])->name('assets.firebase-messaging-sw');

Route::get('{all}', function () {
    return view('welcome');
})->where('all', '^(?!customer).*$');


