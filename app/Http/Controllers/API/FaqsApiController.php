<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use App\Models\Faq;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FaqsApiController extends Controller
{
    public function index(){
        $faqs = Faq::orderBy('id','DESC')->get();
        return CommonHelper::responseWithData($faqs);
    }
    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'question' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $faq = new Faq();
        $faq->question = $request->question;
        $faq->answer = $request->answer ?? "";
        $faq->save();
        return CommonHelper::responseSuccess("FAQs Saved Successfully!");
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(),[
            'question' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $faq = Faq::find($request->id);
            $faq->question = $request->question;
            $faq->answer = $request->answer ?? "";
            $faq->save();
        }
        return CommonHelper::responseSuccess("FAQs Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $faq = Faq::find($request->id);
            if($faq){
                $faq->delete();
                return CommonHelper::responseSuccess("FAQs Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("FAQs Already Deleted!");
            }
        }
    }
}
