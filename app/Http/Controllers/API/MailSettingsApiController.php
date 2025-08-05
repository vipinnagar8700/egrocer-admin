<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MailSetting;
use App\Models\OrderStatusList;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Helpers\CommonHelper;
use Illuminate\Support\Facades\Validator;

class MailSettingsApiController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        $user_type = 1;
        $setting = CommonHelper::getMailSetting($user_type,$user_id);
        $setting = $setting->makeHidden(['user_id','user_type','created_at','updated_at']);
        return CommonHelper::responseWithData($setting);
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'status_ids' => 'required',
            'mail_statuses' => 'required',
            'mobile_statuses' => 'required',
            'sms_statuses' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $user_id = auth()->user()->id;
        $user_type = 1;
        $status_ids = is_array($request->status_ids) ? $request->status_ids: explode(",", $request->status_ids);
        $mail_statuses = is_array($request->mail_statuses) ? $request->mail_statuses : explode(",", $request->mail_statuses);
        $mobile_statuses = is_array($request->mobile_statuses) ? $request->mobile_statuses : explode(",", $request->mobile_statuses);
        $sms_statuses = is_array($request->sms_statuses) ? $request->sms_statuses : explode(",", $request->sms_statuses);


        $order_status_ids = OrderStatusList::get()->pluck('id')->toArray();
        if (array_intersect($status_ids, $order_status_ids) != $status_ids) {
          return CommonHelper:: responseError("Status ids is not belongs to order status list id.");
        }



        CommonHelper::saveMailSetting($user_id,$user_type,$status_ids,$mail_statuses,$mobile_statuses,$sms_statuses);
        return CommonHelper::responseSuccess("Mail Settings Saved Successfully!");
    }
}
