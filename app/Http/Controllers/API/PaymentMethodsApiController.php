<?php

namespace App\Http\Controllers\API;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use Brotzka\DotenvEditor\DotenvEditor;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PaymentMethodsApiController extends Controller
{
    public function index()
    {
        $payment_methods = Setting::get();

        $data=array();
        foreach ($payment_methods as $item){
            $data[$item->variable] = $item->value;
        }
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        foreach ($request->all() as $key => $item){

            if($key == 'paypal_notification_url'){
                $item = url('/customer/ipn');
            }

            if($key == 'stripe_webhook_url'){
                $item = url('/webhook/stripe');
            }

            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->variable = $key;
                $setting->value = $item;
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = $item;
                $setting->save();
            }
        }

        if($request->stripe_payment_method == 1 && $request->stripe_payment_method != "" && $request->stripe_payment_method != ""){
            $env = new DotenvEditor();
            $env->changeEnv([
                'STRIPE_KEY' => Setting::get_value('stripe_publishable_key'),
                'STRIPE_SECRET'=> Setting::get_value('stripe_secret_key'),
            ]);
        }
        return CommonHelper::responseSuccess("Payment Methods Saved Successfully!");
    }
}
