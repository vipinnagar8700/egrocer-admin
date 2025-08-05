<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivacyPolicyDeliveryBoyApiController extends Controller
{
    public function index()
    {
        $variables = array("privacy_policy_delivery_boy","terms_conditions_delivery_boy");
        $policies = Setting::whereIn('variable',$variables )->get();
        return CommonHelper::responseWithData($policies);
    }
    public function save(Request $request)
    {
        foreach ($request->all() as $key => $value){
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->variable = $key;
                $setting->value = $value ?? "";
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = $value ?? "";
                $setting->save();
            }
        }
        return CommonHelper::responseSuccess("Delivery Boy Privacy Policy And Terms & Conditions Saved Successfully!");
    }

    public function printPrivacyPolicy(){
        echo Setting::get_value('privacy_policy_delivery_boy');
    }
    public function printTermsConditions(){
        echo Setting::get_value('terms_conditions_delivery_boy');
    }

}
