<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FrontEndPoliciesApiController extends Controller
{
    public function index()
    {
        $policiesArray = array(
          "refund_policy" => "",
          "shipping_policy" => "",
          "delivery_returns_policy" => ""
        );
        $variables = array_keys($policiesArray);
        $policies = Setting::whereIn('variable',$variables )->get();
        $data = array(
            "policiesObject" => $policiesArray,
            "policies" => $policies
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'refund_policy' => 'required',
            'shipping_policy' => 'required',
            'delivery_returns_policy' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        foreach ($request->all() as $key => $value){
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
        return CommonHelper::responseSuccess("Front End Policies Saved Successfully!");
    }
}
