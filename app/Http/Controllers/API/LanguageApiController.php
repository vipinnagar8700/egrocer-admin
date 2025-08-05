<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Language;
use App\Models\SupportedLanguage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageApiController extends Controller
{
    public function index(){

        $system_type = request('system_type');

        $sql = Language::leftJoin("supported_languages", "supported_languages.id", "languages.supported_language_id", "languages.display_name");
        if ($system_type && $system_type != 0 && $system_type != ""){
            $sql->where('system_type', $system_type);
        }
        $languages = $sql->orderBy('languages.id','DESC')->get(['languages.id','supported_language_id','name','code','type','system_type','is_default','status','json_data','display_name']);
        return CommonHelper::responseWithData($languages);
    }

    public function getSupportedLanguages(){
        $data["system_types"] = Language::get_system_types();
        $data["supported_languages"] = SupportedLanguage::orderBy('name','ASC')->get();
        return CommonHelper::responseWithData($data);
    }

    public function getSystemLanguages(Request $request){ 

        $validator = Validator::make($request->all(),[
            'system_type' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $query = Language::where('system_type', $request->system_type)->where('status', 1)->leftJoin("supported_languages", "supported_languages.id", "languages.supported_language_id");


        if((isset($request->id) && $request->id != 0) || (isset($request->is_default) && $request->is_default != 0)){
            if(isset($request->id) && $request->id != 0){
                $query = $query->where('languages.id',$request->id);
            }else if(isset($request->is_default) && $request->is_default != 0){
                $query = $query->where('is_default', $request->is_default);
            }

            $language = $query->first(['languages.id','name','code','type','system_type','is_default','json_data','display_name']);
            if($language){
                $language->json_data = json_decode($language->json_data);
                return CommonHelper::responseWithData($language);
            }else{
                return CommonHelper::responseSuccess("Language not found!");
            }
        }

        $languages = $query->orderBy('id','ASC')->get(['languages.id','name','code','type','system_type','is_default','display_name']);
        if(count($languages) == 0){
            return CommonHelper::responseSuccess("Language not found!");
        }
        return CommonHelper::responseWithData($languages);
    }


    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'system_type' => 'required',
            'supported_language' => 'required',
            'json_data' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $count = Language::where(['system_type' => $request->system_type])->count();
        $is_default = $request->is_default ?? 0;
        if($count == 0){
            $is_default = 1;
        }

        if(isset($request->is_default) && $request->is_default == 1 && $count > 0){
            Language::where(['system_type' => $request->system_type])->update(['is_default' => 0]);
        }
       
        try{
            $language = new Language();
            $language->system_type = $request->system_type;
            $language->supported_language_id = $request->supported_language;
            $language->json_data = $request->json_data;
            $language->display_name = $request->display_name;
            $language->is_default = $is_default;
            $language->status = $request->status ?? 1;
            
            $language->save();
            if ($request->system_type == 4) {
                $query = Language::where('supported_language_id', $request->supported_language)->leftJoin("supported_languages", "supported_languages.id", "languages.supported_language_id")->first();  
                $code = $query->code;
                $jsonData = $request->json_data;
                $filePath = resource_path("lang/$code.json");
                file_put_contents($filePath, $jsonData);
            }
            return CommonHelper::responseSuccess("Language Saved Successfully!");
        }catch ( \Exception $e){
            return CommonHelper::responseError([$e->getMessage()]);
        }
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'system_type' => 'required',
            'supported_language' => 'required',
            'json_data' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){

            if(isset($request->is_default) && $request->is_default == 1){
                Language::where(['system_type' => $request->system_type])->update(['is_default' => 0]);
            }

            $language = Language::find($request->id);

            $language->system_type = $request->system_type;
            $language->supported_language_id = $request->supported_language;
            $language->json_data = $request->json_data;
            $language->display_name = $request->display_name;
            $language->is_default = $request->is_default;
            $language->status = $request->status ?? 1;
            $language->save();
        }
        return CommonHelper::responseSuccess("Language Updated Successfully!");
    }
    public function delete(Request $request){
        if(isset($request->id)){
            $language = Language::find($request->id);
    
            if ($language) {
                // Check if the language to be deleted is the default one
                $wasDefault = $language->is_default;
    
                // Delete the language
                $language->delete();
    
                // If the deleted language was the default one, set another language as default
                if ($wasDefault) {
                    $newDefaultLanguage = Language::where('system_type', $language->system_type)
                                                  ->orderBy('created_at', 'desc')
                                                  ->first();
                    if ($newDefaultLanguage) {
                        $newDefaultLanguage->is_default = 1;
                        $newDefaultLanguage->save();
                    }
                }
    
                return CommonHelper::responseSuccess("Language Deleted Successfully!");
            } else {
                return CommonHelper::responseError("Language Already Deleted!");
            }
        }
    }

}
