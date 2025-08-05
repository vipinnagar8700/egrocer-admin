<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Offer;
use App\Models\Section;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class OffersApiController extends Controller
{
    public function index(){
        $sections = Section::orderBy('id','DESC')->get()->toArray();
        $offers = Offer::with('category','product','section')->orderBy('id','DESC')->get();
        $data = array(
            "sections" => $sections,
            "offers" => $offers
        );
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'image' => 'required|mimes:jpeg,jpg,png,gif',
            'position' => 'required',
            'section_id' => ['required_if:position,below_section'],
            'type' => 'required',
            'type_id' => 'required_if:type,category,product',
            'offer_url' => 'required_if:type,==,offer_url',
        ],[
            'section_id.required_if' => 'The section position field is required when position is below section.',
            'type_id.required_if' => 'The '.$request->type.' field is required when type is '.$request->type.'.',
            'offer_url.required_if' => 'The link field is required when type is Offer Url.',
            'offer_url.url' => 'The link must be a valid URL.',
        ]);
        if ($validator->fails()) { 
            return CommonHelper::responseError($validator->errors()->first());
        }
        $offer = new Offer();
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('offers', $file, $fileName);
        }
        $offer->image = $image;
        $offer->type = $request->type;
        $offer->type_id = ($request->type === 'category' || $request->type === 'product') ? $request->type_id : '';
        $offer->offer_url = ($request->type === 'offer_url') ? $request->offer_url : '';
        $offer->position = $request->position;
        $offer->section_position = $request->section_id ?? 0;
        $offer->save();
        return CommonHelper::responseSuccess("Offer Saved Successfully!");
    }
    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'image' => $request->hasFile('image') ? 'mimes:jpeg,jpg,png,gif' : '',
            'position' => 'required',
            'section_id' => ['required_if:position,below_section'],
            'type' => 'required',
            'type_id' => 'required_if:type,category,product',
            'offer_url' => 'required_if:type,==,offer_url',
        ],[
            'section_id.required_if' => 'The section position field is required when position is below section.',
            'type_id.required_if' => 'The '.$request->type.' field is required when type is '.$request->type.'.',
            'offer_url.required_if' => 'The link field is required when type is Offer Url.',
            'offer_url.url' => 'The link must be a valid URL.',
        ]);
        if ($validator->fails()) { 
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $offer = Offer::find($request->id);
            $offer->type = $request->type;
            $offer->type_id = ($request->type === 'category' || $request->type === 'product') ? $request->type_id : '';
            $offer->offer_url = ($request->type === 'offer_url') ? $request->offer_url : '';
            $offer->position = $request->position;
            $offer->section_position = ($request->position === 'below_section') ? $request->section_id : 0;
            if($request->hasFile('image')){
                @Storage::disk('public')->delete($offer->image);
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('offers', $file, $fileName);
                $offer->image = $image;
            }
            $offer->save();
        }
        return CommonHelper::responseSuccess("Offer Updated Successfully!");
    }
    public function delete(Request $request){
        if(isset($request->id)){

            $offer = Offer::find($request->id);
            if($offer){
                @Storage::disk('public')->delete($offer->image);
                $offer->delete();
                return CommonHelper::responseSuccess("Offer Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Offer Already Deleted!");
            }
        }
    }


}
