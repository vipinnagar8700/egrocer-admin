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

class SmsSettingsApiController extends Controller
{
    public function index()
    {
        $sms_settings = Setting::get();

        $data=array();
        foreach ($sms_settings as $item){
            $data[$item->variable] = $item->value;
        }
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        foreach ($request->all() as $key => $item){

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

        return CommonHelper::responseSuccess("SMS Settings Saved Successfully!");
    }
}
