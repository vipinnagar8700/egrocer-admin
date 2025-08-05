<?php

namespace App\Http\Controllers\API;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use Cassandra\Type\Set;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;



class StoreSettingsApiController extends Controller
{
    public function index()
    {
        $timezone_options = CommonHelper::getTimezoneOptions();
        $countries = json_decode(file_get_contents(base_path('config/countries_currency.json')),true);
        $store_settingsArray = array(
                "system_configurations" => 1,
                "system_timezone_gmt" => "+05:30",
                "system_configurations_id" => "13",
                "app_name" => "",
                "support_number" => "",
                "support_email" => "",

                "is_version_system_on" => 0,
                "required_force_update" => 0,
                "current_version" => "1.0.0",

                "ios_is_version_system_on" => 0,
                "ios_required_force_update" => 0,
                "ios_current_version" => "1.0.0",

                "logo" => "",
                "copyright_details" => "",
                "store_address" => "",
                'map_latitude' => "",
                "map_longitude" => "",
                "currency" => "",
                "currency_code" => "",
                "decimal_point" => "",
                "system_timezone" => "",
                "default_city_id" => 0,

                "max_cart_items_count" => "",
                "min_order_amount" => "",
                "low_stock_limit" => "",


                "delivery_boy_bonus_settings" => 0,
                "delivery_boy_bonus_type" => 0,
                "delivery_boy_bonus_percentage" => 0,
                "delivery_boy_bonus_min_amount" => 0,
                "delivery_boy_bonus_max_amount" => 0,

                "area_wise_delivery_charge" => 0,
                "min_amount" => "",
                "delivery_charge" => "",
                "is_refer_earn_on" => 0,
                "min_refer_earn_order_amount" => "",
                "refer_earn_bonus" => "",
                "refer_earn_method" => "",
                "max_refer_earn_amount" => "",
                "minimum_withdrawal_amount" => "",
                "max_product_return_days" => "",

                "user_wallet_refill_limit" => "",
                "tax_name" => "",
                "tax_number" => "",

                "from_mail" => "",
                "reply_to" => "",
                "generate_otp" => 0,

                "app_mode_customer" => 0,
                "app_mode_customer_remark" => "",

                "app_mode_seller" => 0,
                "app_mode_seller_remark" => "",

                "app_mode_delivery_boy" => 0,
                "app_mode_delivery_boy_remark" => "",

                "smtp_from_mail" => "",
                "smtp_reply_to" => "",
                "smtp_email_password" => "",
                "smtp_host" => "",
                "smtp_port" => "",
                "smtp_content_type" => "",
                "smtp_encryption_type" => "",
                "google_place_api_key" => "",
                "apiKey" => "",
                "fssai_lic_img" => "",
                "is_category_section_in_homepage" => "",
                "is_brand_section_in_homepage" => "",
                "is_seller_section_in_homepage" => "",
                "is_country_section_in_homepage" => "",
                "count_category_section_in_homepage" => "",
                "count_brand_section_in_homepage" => "",
                "count_seller_section_in_homepage" => "",
                "count_country_section_in_homepage" => "",
                "one_seller_cart" => "",
                "playstore_url" => "",
                "appstore_url" => "",
                "guest_cart" => "",
                "phone_login" => "",
                "google_login" => "",
                "apple_login" => "",
                "email_login" => "",
                "panel_login_background_img",
                "notification_delay_after_cart_addition",
                "notification_interval",
                "notification_stop_time"
            );
        $variables = array_keys($store_settingsArray);
        $store_settings = Setting::whereIn('variable',$variables )->get();

        $login_settingsArray = array(
            "phone_login" => "",
                "google_login" => "",
                "apple_login" => "",
                "email_login" => "",
                 "phone_auth_otp" => "",
                "phone_auth_password" => "",
                "firebase_authentication" => "",
                "custom_sms_gateway_otp_based" => ""
            );
            $login_variables = array_keys($login_settingsArray);
            $login_settings = Setting::whereIn('variable',$login_variables )->get();
    
        $data = array(
            "store_settingsObject" => $store_settingsArray,
            "timezone_options" => $timezone_options,
            "currency_code" => $countries,
            "store_settings" => $store_settings,
            "login_settings" => $login_settings
        );
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo' => $request->hasFile('logo') ? 'mimes:jpeg,jpg,png,gif' : '',
            'fssai_lic_img' => $request->hasFile('fssai_lic_img') ? 'mimes:jpeg,jpg,png,gif' : '',
            'panel_login_background_img' => $request->hasFile('panel_login_background_img') ? 'mimes:jpeg,jpg,png,gif' : '',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        

        if($request->hasFile('logo'))
        {
            $file = $request->file('logo');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $logo = Storage::disk('public')->putFileAs('logo', $file,$fileName);
        }
        if($request->hasFile('fssai_lic_img'))
        {
            $file1 = $request->file('fssai_lic_img');
            $fileName1 = time().'_'.rand(1111,99999).'.'.$file1->getClientOriginalExtension();
            $fssai_lic_img = Storage::disk('public')->putFileAs('fssai_lic_img', $file1,$fileName1);
        }
        if($request->hasFile('panel_login_background_img'))
        {
            $file2= $request->file('panel_login_background_img');
            $fileName2 = time().'_'.rand(1111,99999).'.'.$file2->getClientOriginalExtension();
            $panel_login_background_img = Storage::disk('public')->putFileAs('panel_login_background_img', $file2,$fileName2);
        }
       
        foreach ($request->all() as $key => $value){
            $value = $value ?? " ";
            $setting = Setting::where('variable', $key)->first(); 
            if ($setting) {
                $setting->variable = $key;
                $setting->value = ($key == 'logo' && isset($logo)) ? $logo : (($key == 'fssai_lic_img' && isset($fssai_lic_img)) ? $fssai_lic_img :(($key == 'panel_login_background_img' && isset($panel_login_background_img)) ? $panel_login_background_img : (($key == 'copyright_details' ) ? str_replace(["\r\n", "\r", "\n"], '<br/>', $request->copyright_details) : $value)));
               
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = ($key == 'logo' && isset($logo)) ? $logo : (($key == 'fssai_lic_img' && isset($fssai_lic_img)) ? $fssai_lic_img :(($key == 'panel_login_background_img' && isset($panel_login_background_img)) ? $panel_login_background_img : $value));

                $setting->save();
            }
        }
        return CommonHelper::responseSuccess("Store Settings Saved Successfully!");
    }

    public function save_login_setting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'at_least_one' => 'At least one of phone login or google login must be enabled.',
        ]);
        
        $validator->after(function ($validator) use ($request) {
            // Validate that at least one of phone_login or google_login is enabled
            if (!$request->phone_login && !$request->google_login) {
                $validator->errors()->add('phone_login', 'At least one of phone login or google login must be enabled.');
                $validator->errors()->add('google_login', 'At least one of phone login or google login must be enabled.');
            }
        
            // Additional validation if phone_login is enabled
            if ($request->phone_login) {
                if (!$request->firebase_authentication && !$request->custom_sms_gateway_otp_based) {
                    $validator->errors()->add('firebase_authentication', 'When phone login is enabled, either Firebase Authentication or Custom SMS Gateway OTP Based must be enabled.');
                    $validator->errors()->add('custom_sms_gateway_otp_based', 'When phone login is enabled, either Firebase Authentication or Custom SMS Gateway OTP Based must be enabled.');
                }
            }
        });
        
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        foreach ($request->all() as $key => $value){
            $value = $value ?? " ";
            $setting = Setting::where('variable', $key)->first(); 
            if ($setting) {
                $setting->variable = $key;
                $setting->value = $value;
               
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = $value;

                $setting->save();
            }
        }
        return CommonHelper::responseSuccess("Store Settings Saved Successfully!");
    }



    public function getPurchaseCode(){
        $code = Setting::get_value('purchase_code')??'';

        return CommonHelper::responseWithData($code);
    }

    public function purchaseCode($code,$type=0){

        $domain = env('APP_URL');
        $path = 'https://validator.wrteam.in/egrocer_validator?purchase_code='.$code.'&domain_url='.$domain;
        $response = file_get_contents($path);
        $data = json_decode($response,true);

        $valid = false;
        if(isset($data['error']) && $data['error']==false){
            $valid = true;
        }

        $setting = Setting::where('variable', 'purchase_code')->first()??new Setting();
        $setting->variable = 'purchase_code';
        $setting->value = $valid?$code:'';
        $setting->save();

        if($type){
            return $valid;
        }else{
            return CommonHelper::responseWithData($response);
        }

    }
    public function getPurchaseCodeUpdater(){
        $code = Setting::get_value('purchase_code')??'';

        $domain = env('APP_URL');
        $path = 'https://validator.wrteam.in/egrocer_validator?purchase_code='.$code.'&domain_url='.$domain;
        $response = file_get_contents($path);
        $data = json_decode($response,true);

        $valid = false;
        if(isset($data['error']) && $data['error']==false){
            $valid = true;
        }
        if($code == 'direct_sale_from_wrteam'){
            $valid = true;
        }

        $setting = Setting::where('variable', 'purchase_code')->first()??new Setting();
        $setting->variable = 'purchase_code';
        $setting->value = $valid?$code:'';
        $setting->save();

        return $valid;
    }

    public function testMail(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'host' => 'required',
            'username' => 'required',
            'password' => 'required',
            'port' => 'required',
            'encryption' => 'required',
            'support_email' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $config = [
            'driver' => 'sendmail',
            'host' => $request->host,
            'username' => $request->username,
            'password' => $request->password,
            'port' => $request->port,
            'encryption' => $request->encryption,
        ];

        \Config::set('mail', $config);
       

       try {


            \Mail::send([],[], function ($message) use ($request) {
                $message->to($request->email)
                    ->subject('Testing Mail')
                    ->html('Email Test Successfully!');
                $message->from($request->username);
            });
// \Mail::raw('Test email', function ($message) use ($request)  {
//     $message->to($request->email)
//             ->subject('Testing Mail')->html('Email Test Successfully!')->from($request->username);
// });
            return CommonHelper::responseSuccess("Test Mail Sent Successfully!");

         }catch (\Exception $e){
             return CommonHelper::responseError($e->getMessage());
         }

    }
}
