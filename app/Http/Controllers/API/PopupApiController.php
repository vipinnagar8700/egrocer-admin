<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PopupApiController extends Controller
{
    public function index()
    {
        $popup_array = array(
            "popup_enabled" => 0,
            "popup_always_show_home" => 0,
            "popup_type" => "",
            "popup_type_id" => "",
            "popup_url" => "",
            "popup_image" => ""
        );
        $variables = array_keys($popup_array);
        $settings = Setting::whereIn('variable',$variables )->get();
        $imageArray = array("popup_image");
        $data = array();
        foreach ($settings as $setting){
            if(in_array($setting->variable,$imageArray)){
                $data[$setting->variable] = CommonHelper::getImage($setting->value);
            }else{
                $data[$setting->variable] = $setting->value;
            }
        }
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request)
    {
        $popup_image = Setting::get_value("popup_image");

        //dd($popup_image);

        $validator = Validator::make($request->all(),[
            'popup_enabled' => 'required',
            'popup_always_show_home' => 'required',
            'popup_type' => 'required',
            'popup_type_id' => 'required_if:popup_type,category,product',
            'popup_url' => 'required_if:popup_type,==,popup_url',
            'popup_image' => ($popup_image == "null" || $popup_image == " " || $popup_image == "undefined")?'required|mimes:jpeg,jpg,png,gif':'',
        ],[
            'popup_type_id.required_if' => 'The '.$request->popup_type.' field is required when type is '.$request->popup_type.'.',
            'popup_url.required_if' => 'The link field is required when type is Popup Url.',
            'popup_url.url' => 'The link must be a valid URL.',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if($request->hasFile('popup_image'))
        {
            $file = $request->file('popup_image');
            $fileName = time().'_popup_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $popupImage = Storage::disk('public')->putFileAs('offers', $file,$fileName);
        }
        foreach ($request->all() as $key => $value){
            $value = $value ?? "";
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                if($key=='popup_image' && $request->hasFile('popup_image') && isset($popupImage)
                    && $setting->value != "" && $setting->value != "null" && $setting->value != "undefined"){
                    @Storage::disk('public')->delete($setting->value);
                } else if($key=='popup_image') {
                    $value = $popup_image;
                }
                $setting->variable = $key;
                $setting->value = ($key=='popup_image' && isset($popupImage)) ? $popupImage : $value;
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = ($key=='popup_image' && isset($popupImage)) ? $popupImage : $value;
                $setting->save();
            }
        }
        return CommonHelper::responseSuccess("Popup Image Saved Successfully!");
    }
}
