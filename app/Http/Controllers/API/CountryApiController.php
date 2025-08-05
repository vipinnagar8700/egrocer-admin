<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CountryApiController extends Controller
{
    public function index(){
        $countries = Country::orderBy('id','asc')->get();
        return CommonHelper::responseWithData($countries);
    }

    public function getCountries(Request $request){
        $limit = $request->get('limit',5);
        $offset = $request->get('offset',0);
        $total = Country::count();
        $countries = Country::orderBy('id','asc')->skip($offset)->take($limit)->get();
        return CommonHelper::responseWithData($countries,$total);
    }

    public function active(Request $request){
        $countries = Country::where('status',1)->orderBy('id','asc')->get();
        return CommonHelper::responseWithData($countries);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'dial_code' => 'required',
            'code' => 'required',
            'logo' => 'required|mimes:jpeg,jpg,png,gif'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $country = new Country();
        $country->name = $request->name;
        $country->dial_code = $request->dial_code;
        $country->code = $request->code;
        $logo = '';
        if($request->hasFile('logo')){
            $file = $request->file('logo');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $logo = Storage::disk('public')->putFileAs('countries', $file, $fileName);
        }
        $country->logo = $logo;
        $country->status = $request->status ?? 1;
        $country->save();
        return CommonHelper::responseSuccess("Country Saved Successfully!");
    }
    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'dial_code' => 'required',
            'code' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $country = Country::find($request->id);
            $country->name = $request->name;
            $country->dial_code = $request->dial_code;
            $country->status = $request->status;
            $country->code = $request->code;
            if($request->hasFile('logo')){
                //@Storage::disk('public')->delete($country->logo);
                $file = $request->file('logo');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $logo = Storage::disk('public')->putFileAs('countries', $file, $fileName);
                $country->logo = $logo;
            }
            $country->save();
        }
        return CommonHelper::responseSuccess("Country Updated Successfully!");
    }
    public function delete(Request $request){
        if(isset($request->id)){
            $country = Country::find($request->id);
            if($country){
               // @Storage::disk('public')->delete($country->logo);
                $country->delete();
                return CommonHelper::responseSuccess("Country Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Country Already Deleted!");
            }
        }
    }

}
