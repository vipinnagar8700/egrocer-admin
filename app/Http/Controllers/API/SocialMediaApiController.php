<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\DeliveryBoy;
use App\Models\SocialMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SocialMediaApiController extends Controller
{
    public function index(){
        $socialMedia = SocialMedia::orderBy('id','DESC')->get();
        return CommonHelper::responseWithData($socialMedia);
    }

    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'icon' => 'required|unique:social_media,icon',
            'link' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $socialMedia = new SocialMedia();
        $socialMedia->icon = $request->icon;
        $socialMedia->link = $request->link;
        $socialMedia->save();
        return CommonHelper::responseSuccess("Social Media Saved Successfully!");
    }

    public function update(Request $request){

        if (isset($request->id)) {
            $socialMedia = SocialMedia::find($request->id);
            if (!$socialMedia) {
                return CommonHelper::responseError("Social Media record not found!");
            }
    
            $validator = Validator::make($request->all(), [
                'icon' => 'required|unique:social_media,icon,' . $socialMedia->id,
                'link' => 'required'
            ]);
    
            if ($validator->fails()) {
                return CommonHelper::responseError($validator->errors()->first());
            }
    
            $socialMedia->icon = $request->icon;
            $socialMedia->link = $request->link;
            $socialMedia->save();
    
            return CommonHelper::responseSuccess("Social Media Updated Successfully!");
        }
    
        return CommonHelper::responseError("ID is required for updating Social Media!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $socialMedia = SocialMedia::find($request->id);
            if($socialMedia){
                $socialMedia->delete();
                return CommonHelper::responseSuccess("Social Media Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Social Media Already Deleted!");
            }
        }
    }
}
