<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FrontEndAboutApiController extends Controller
{
    public function index()
    {
        $aboutArray = array(
            "front_end_about_us" => ""
        );
        $variables = array_keys($aboutArray);
        $about = Setting::whereIn('variable',$variables )->get();
        $data = array(
            "aboutObject" => $aboutArray,
            "about" => $about
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'front_end_about_us' => 'required',
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
        return CommonHelper::responseSuccess("Front End About Us Saved Successfully!");
    }
}
