<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Helpers\PushHelpers;
use App\Helpers\FirebaseHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Device;
use App\Models\Product;
use App\Models\Email;
use App\Models\EmailTemplate;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class EmailsApiController extends Controller
{
    public function index(){
        $users = User::where('status',1)->select('id', 'name')->orderBy('id','DESC')->get()->toArray();
        $emails = Email::orderBy('id','DESC')->get();
        $email_templates = EmailTemplate::orderBy('id','DESC')->get();
        $data = array(
            "users" => $users,
            "emails" => $emails,
            "email_templates" => $email_templates
        );
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required_if:type,user',
            'title' => 'required',
            'message' => 'required',
            'image' => ['required_if:include_image,true','nullable','mimes:jpeg,jpg,png,gif,pdf'],
        ]);
        $validator->setCustomMessages([
            'type_id.required_if' => 'The :attribute field is required when the type is category, product.',
           
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

  
            $email = new Email();
            $email->type = $request->type;
            $email->type_id = $request->type_ids ?? '';
            $email->title = $request->title;
            $email->message = $request->message;
            $image = '';
            if ($request->include_image == 'true' && $request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('emails', $file,$fileName);
            }
            $email->image = $image;
            $email->save();

            if($request->type == 'user' && $request->type_ids != null){
                $typeIds = explode(',', $request->type_ids);
                $typeIds = array_map('intval', $typeIds);

    
            $users = User::whereIn('id', $typeIds)->get(['name', 'email']);
          
            }else{
            $users = User::whereIn('type', ['email', 'gmail', 'apple'])->get(['name', 'email']);
            }

            foreach ($users as $user) {
                $to = $user->email;
                $customer_name = $user->name;
                $subject = $request->title;
                $message = str_replace(['[Customer Name]'], [$customer_name], $request->message);
                $data = ['name' => $customer_name, 'content' => $message, 'type' => 'promotional_mail',  'attachment' => $image ? storage_path("app/public/{$image}") : null,];
               
                try {
               CommonHelper::sendMail($to, $subject, $data);
                    Log::info("{$to}:", ['Email sent successfully']);
                } catch (\Exception $e) {
                    Log::error("Error sending email to {$to}:", [$e->getMessage()]);
                }
            }
   

            



       
        return CommonHelper::responseSuccess("Email Saved Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $email = Email::find($request->id);
            if($email){
                @Storage::disk('public')->delete($email->image);
                $email->delete();
                return CommonHelper::responseSuccess("Email Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Email Already Deleted!");
            }
        }
    }
}
