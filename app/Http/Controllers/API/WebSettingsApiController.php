<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class WebSettingsApiController extends Controller
{
    public function index()
    {
        $settingsArray = array(
            "site_title" => "",
            "website_url" => "",
            "color" => "#33A36B",
            "light_color" => "#C8E5D5",
            "dark_color" => "#55AE7B",

            "app_title" => "",
            "app_tagline" => "",
            "app_short_description" => "",

            "is_android_app" => 0,
            "android_app_url" => "",
            "play_store_logo" => "",

            "is_ios_app" => 0,
            "ios_app_url" => "",
            "ios_store_logo" => "",

            "copyright_details" => "",

            "common_meta_title" => "",
            "common_meta_description" => "",

            "show_color_picker_in_website" => false,
            "favicon" => "",
            "web_logo" => "",
            "placeholder_image" => "",
            "loading" => "",

            "website_mode" => "",
            "website_mode_remark" => ""
            
        );
        $variables = array_keys($settingsArray);

        $settings = Setting::whereIn('variable',$variables )->get();

        $data = array(
            "settingsObject" => $settingsArray,
            "settings" => $settings
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'site_title' => 'required',
            'website_url' => 'required|url',
            'color' => 'required',
            'light_color' => 'required',
            'dark_color' => 'required',
            
            'common_meta_title' => 'required',
            'common_meta_description' => 'required',

            'android_app_url' => ['required_if:is_android_app,1'],
            'play_store_logo' => $request->hasFile('play_store_logo')?'mimes:jpeg,jpg,png,gif':'',
            'ios_app_url' => ['required_if:is_ios_app,1'],
            'ios_store_logo' => $request->hasFile('ios_store_logo')?'mimes:jpeg,jpg,png,gif':'',

            'favicon' => $request->hasFile('favicon')?'mimes:jpeg,jpg,png,gif':'',
            'web_logo' => $request->hasFile('web_logo')?'mimes:jpeg,jpg,png,gif':'',
            'placeholder_image' => $request->hasFile('placeholder_image')?'mimes:jpeg,jpg,png,gif':'',
            'loading' => $request->hasFile('loading')?'mimes:jpeg,jpg,png,gif':'',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $filePaths = array();

        if($request->hasFile('play_store_logo'))
        {
            $file = $request->file('play_store_logo');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $play_store_logo = Storage::disk('public')->putFileAs('front_end/play_store_logo', $file, $fileName);
            $filePaths['play_store_logo'] = $play_store_logo;
        }

        if($request->hasFile('ios_store_logo'))
        {
            $file = $request->file('ios_store_logo');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $favicon = Storage::disk('public')->putFileAs('front_end/ios_store_logo', $file, $fileName);
            $filePaths['ios_store_logo'] = $favicon;
        }
        if($request->hasFile('favicon'))
        {
            $file = $request->file('favicon');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $favicon = Storage::disk('public')->putFileAs('front_end/favicon', $file, $fileName);
            $filePaths['favicon'] = $favicon;
        }
        if($request->hasFile('web_logo'))
        {
            $file = $request->file('web_logo');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $web_logo = Storage::disk('public')->putFileAs('front_end/web_logo', $file,$fileName);
            $filePaths['web_logo'] = $web_logo;
        }
        if($request->hasFile('placeholder_image'))
        {
            $file = $request->file('placeholder_image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $placeholder_image = Storage::disk('public')->putFileAs('front_end/placeholder_image', $file,$fileName);
            $filePaths['placeholder_image'] = $placeholder_image;
        }

        foreach ($request->all() as $key => $value){
            $is_file_seleted = false; // ['play_store_logo','ios_store_logo','favicon','web_logo','loading']

            if(in_array($key ,['play_store_logo','ios_store_logo','favicon','web_logo','placeholder_image']) && isset($filePaths[$key])){
                $is_file_seleted = true;
                $value = $filePaths[$key];
            }

            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                // if($is_file_seleted){
                //     @Storage::disk('public')->delete($setting->$key);
                // }
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
        return CommonHelper::responseSuccess("Web Header Setting Saved Successfully!");
    }
}
