<?php

namespace App\Http\Controllers\API;

namespace App\Http\Controllers\API;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;


class NotificationSettingsApiController extends Controller
{
    public function index()
    {
        $notification_settings = Setting::where('variable', 'fcm_server_key')->first();
        return CommonHelper::responseWithData($notification_settings);
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'fcm_server_key' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $setting = Setting::where('variable', 'fcm_server_key')->first();
        if ($setting) {
            $setting->value = $request->fcm_server_key;
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->variable = 'fcm_server_key';
            $setting->value = $request->fcm_server_key;
            $setting->save();
        }
        return CommonHelper::responseSuccess("Notifications Settings Saved Successfully!");
    }
}
