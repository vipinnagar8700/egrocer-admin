<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ShippingMethodsApiController extends Controller
{
    public function index()
    {
        $setting = Setting::where('variable', 'shiprocket')->first();
        $shipping = $setting->value;
        return CommonHelper::responseWithData($shipping);
    }
    public function save(Request $request)
    {
        $json_data = array(
            'shiprocket' => ($request->standard_shipping)?1:0,
            'shiprocket_email' => $request->shiprocket_email,
            'shiprocket_password' => $request->shiprocket_password,
            'webhook_token' => $request->webhook_token
        );
     
        $setting = Setting::where('variable', 'shiprocket')->first();
        if ($setting) {
            $setting->value = json_encode($json_data);
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->variable = 'shiprocket';
            $setting->value = json_encode($json_data);
            $setting->save();
        }
        return CommonHelper::responseSuccess("Shipping Methods Saved Successfully!");
    }
    public function shiprocket_webhook(Request $request)
    {
        $data = $request->all();

    }

}
