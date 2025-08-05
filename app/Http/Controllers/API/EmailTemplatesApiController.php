<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Helpers\PushHelpers;
use App\Helpers\FirebaseHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Device;
use App\Models\Product;
use App\Models\EmailTemplate;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmailTemplatesApiController extends Controller
{
    public function index(){
        $email_templates = EmailTemplate::orderBy('id','DESC')->get();
        $data = array(
            "email_templates" => $email_templates
        );
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'title' => 'required',
            'message' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
            $email_template = new EmailTemplate();
            $email_template->type = $request->type;
            $email_template->title = $request->title;
            $email_template->message = $request->message;
            $email_template->save();
        return CommonHelper::responseSuccess("Email Saved Successfully!");
    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'title' => 'required',
            'message' => 'required',
        ]);
    
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
    
        // Find existing email template
        $email_template = EmailTemplate::find($request->id);
    
        if (!$email_template) {
            return CommonHelper::responseError("Email Template not found.");
        }
    
        // Update fields
        $email_template->type = $request->type;
        $email_template->title = $request->title;
        $email_template->message = $request->message;
        $email_template->save();
    
        return CommonHelper::responseSuccess("Email Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $email_template = EmailTemplate::find($request->id);
            if($email_template){
                $email_template->delete();
                return CommonHelper::responseSuccess("Email Template Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Email Template Already Deleted!");
            }
        }
    }
}
