<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Tax;
use App\Models\Slider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HomeSliderImagesApiController extends Controller
{
    public function index(){

        $sliders = Slider::with('category','product')->orderBy('id','DESC')->get();

        return CommonHelper::responseWithData($sliders);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required_if:type,category,product',
            'slider_url' => 'required_if:type,==,slider_url',
            'image' => 'required|mimes:jpeg,jpg,png,gif'
        ],[
            'type_id.required_if' => 'The '.$request->type.' field is required when type is '.$request->type.'.',
            'slider_url.required_if' => 'The link field is required when type is Slider Url.',
            'slider_url.url' => 'The link must be a valid URL.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $slider = new Slider();
        $slider->type = $request->type;
        $slider->type_id = ($request->type_id)?$request->type_id:0;
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('sliders', $file, $fileName);
        }
       $slider->image = $image;
       $slider->slider_url = $request->slider_url;
       $slider->save();
       return CommonHelper::responseSuccess("Home Slider Images Saved Successfully!");
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required_if:type,category,product',
            'slider_url' => 'required_if:type,==,slider_url',
            'image' => $request->hasFile('image') ? 'mimes:jpeg,jpg,png,gif' : ''
        ],[
            'type_id.required_if' => 'The '.$request->type.' field is required when type is '.$request->type.'.',
            'slider_url.required_if' => 'The link field is required when type is Slider Url.',
            'slider_url.url' => 'The link must be a valid URL.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if(isset($request->id)){

            $slider = Slider::find($request->id);
            $slider->type = $request->type;
            $slider->type_id = $request->type_id;
            $slider->status = $request->status;
            if($request->hasFile('image')){
                @Storage::disk('public')->delete($slider->image);
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sliders', $file, $fileName);
                $slider->image = $image;
            }
            $slider->slider_url = $request->slider_url;
            $slider->save();
        }


        return CommonHelper::responseSuccess("Slider Updated Successfully!");
    }

    public function delete(Request $request){

        if(isset($request->id)){

            $slider = Slider::find($request->id);
            if($slider){
                @Storage::disk('public')->delete($slider->image);
                $slider->delete();
                return CommonHelper::responseSuccess("Slider Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Slider Already Deleted!");
            }
        }
    }


}
