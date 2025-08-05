<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Section;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SectionsApiController extends Controller
{
    public function index(){
        $sections = Section::orderBy('id','DESC')->get();
        if(empty($sections)){
            return  CommonHelper::responseError('Section not found.');
        }
        return CommonHelper::responseWithData($sections);

    }

    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'short_description' => 'required',
            'product_type' => 'required',
            'product_ids' => ($request->product_type == "custom_products")?'required':"",
            'position' => 'required',
            'style_app' => 'required',
            'banner_app' => ($request->style_app == "style_4")?'required':"",
            'style_web' => 'required',
            'banner_web' => ($request->style_web == "style_4")?'required':""

        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $section = new Section();
        $section->title = $request->title;
        $section->short_description = $request->short_description;
        $section->category_ids = $request->category_ids??"";
        $section->product_type = $request->product_type;
        $section->product_ids = $request->product_ids;
        $section->position = $request->position;
        $section->style_app = $request->style_app;
        $section->banner_app = ($request->style_app == 'style_4') ? $request->banner_app : null;
        $section->style_web = $request->style_web;
        $section->banner_web = ($request->style_web == 'style_4') ? $request->style_web : null;
        $section->background_color_for_light_theme = $request->background_color_for_light_theme ?? '';
        $section->background_color_for_dark_theme = $request->background_color_for_dark_theme ?? '';
        $banner_app = '';
        if($request->hasFile('banner_app')){
            $file_app = $request->file('banner_app');
            $fileName_app = time().'_'.rand(1111,99999).'.'.$file_app->getClientOriginalExtension();
            $banner_app = Storage::disk('public')->putFileAs('banner_section_style', $file_app, $fileName_app);
        }
        $section->banner_app = $banner_app;
        $banner_web = '';
        if($request->hasFile('banner_web')){
            $file_web = $request->file('banner_web');
            $fileName_web = time().'_'.rand(1111,99999).'.'.$file_web->getClientOriginalExtension();
            $banner_web = Storage::disk('public')->putFileAs('banner_section_style', $file_web, $fileName_web);
        }
        $section->banner_web = $banner_web;
        $section->save();
        return CommonHelper::responseSuccess("Section Saved Successfully!");
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'short_description' => 'required',
            'product_type' => 'required',
            'product_ids' => ($request->product_type == "custom_products")?'required':"",
            'position' => 'required',
            'style_app' => 'required',
            'banner_app' => ($request->style_app == "style_4")?'required':"",
            'style_web' => 'required',
            'banner_web' => ($request->style_web == "style_4")?'required':"" 
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $section = Section::find($request->id);
            $section->title = $request->title;
            $section->short_description = $request->short_description;
            $section->category_ids = $request->category_ids??"";
            $section->product_type = $request->product_type;
            $section->product_ids = ($request->product_type == 'custom_products') ? $request->product_ids : null;
            $section->position = $request->position;
            $section->style_app = $request->style_app;
           
            $section->style_web = $request->style_web;
           
            $section->background_color_for_light_theme = $request->background_color_for_light_theme ?? '';
            $section->background_color_for_dark_theme = $request->background_color_for_dark_theme ?? '';
            
            if($request->hasFile('banner_app')){
                $file_app = $request->file('banner_app');
                $fileName_app = time().'_'.rand(1111,99999).'.'.$file_app->getClientOriginalExtension();
                $banner_app = Storage::disk('public')->putFileAs('banner_section_style', $file_app, $fileName_app);
                $section->banner_app = ($request->style_app == 'style_4') ? $banner_app : null;
            }
            
            
            if($request->hasFile('banner_web')){
                $file_web = $request->file('banner_web');
                $fileName_web = time().'_'.rand(1111,99999).'.'.$file_web->getClientOriginalExtension();
                $banner_web = Storage::disk('public')->putFileAs('banner_section_style', $file_web, $fileName_web);
                $section->banner_web = ($request->style_web == 'style_4') ? $banner_web : null;
            }
            
           
            $section->save();
        }
        return CommonHelper::responseSuccess("Section Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $section = Section::find($request->id);
            if($section){
                $section->delete();
                return CommonHelper::responseSuccess("Section Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Section Already Deleted!");
            }
        }
    }

    public function getSectionsByRowOrder(){
        $sections = Section::orderBy('row_order','ASC')->get();
        if(empty($sections)){
            return  CommonHelper::responseError('Section not found.');
        }
        return CommonHelper::responseWithData($sections);
    }


    public function updateSectionsOrder(Request $request){
        $sections = $request->all();
        foreach ($sections as $key => $section){
            $data = Section::find($section["id"]);
            $data->row_order = $section["row_order"];
            $data->save();
        }
        return CommonHelper::responseSuccess("Section Order Updated Successfully!");
    }


}
