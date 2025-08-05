<?php

namespace App\Http\Controllers\API;


use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;

class ContactUsApiController extends Controller
{
    public function index()
    {
        $contact_us = Setting::where('variable', 'contact_us')->first();
        return CommonHelper::responseWithData($contact_us);
    }
    public function save(Request $request)
    {

        $setting = Setting::where('variable', 'contact_us')->first();
        if ($setting) {
            $setting->value = $request->contact_us??"";
            $setting->save();
        } else {
            $setting = new Setting();
            $setting->variable = 'contact_us';
            $setting->value = $request->contact_us??"";
            $setting->save();
        }
        return CommonHelper::responseSuccess("Contact Us Saved Successfully!");
    }
}
