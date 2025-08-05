<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\PromoCode;
use App\Models\Slider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PromoCodeApiController extends Controller
{
    public function index()
    {
        $promocode = PromoCode::orderBy('id', 'DESC')->get();

        return CommonHelper::responseWithData($promocode);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'promo_code' => 'required',
            'message' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'no_of_users' => 'required',
            'minimum_order_amount' => 'required',
            'discount_type' => 'required',
            'discount' => 'required',
           
            'repeat_usage' => 'required',
            
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $promocode = new PromoCode();
        $promocode->promo_code = $request->promo_code;
        $promocode->message = $request->message;
        $promocode->start_date = $request->start_date;
        $promocode->end_date = $request->end_date;
        $promocode->no_of_users = $request->no_of_users;
        $promocode->minimum_order_amount = $request->minimum_order_amount;
        $promocode->discount = $request->discount;
        $promocode->discount_type = $request->discount_type;
        $promocode->max_discount_amount = $request->max_discount_amount ?? 0;
        $promocode->repeat_usage = $request->repeat_usage;
        $promocode->no_of_repeat_usage = ($request->repeat_usage === 1 )?$request->no_of_repeat_usage:0;
        $promocode->status = 1;
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('promocode', $file, $fileName);
        }
        $promocode->image = $image;

        $promocode->save();
        return CommonHelper::responseSuccess("Promo Code Saved Successfully!");
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'promo_code' => 'required',
            'message' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'no_of_users' => 'required',
            'minimum_order_amount' => 'required',
            'discount' => 'required',
            'discount_type' => 'required',
           
            'repeat_usage' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if (isset($request->id)) {
            $promocode = PromoCode::find($request->id);
            $promocode->promo_code = $request->promo_code;
            $promocode->message = $request->message;
            $promocode->start_date = $request->start_date;
            $promocode->end_date = $request->end_date;
            $promocode->no_of_users = $request->no_of_users;
            $promocode->minimum_order_amount = $request->minimum_order_amount;
            $promocode->discount = $request->discount;
            $promocode->discount_type = $request->discount_type;
            $promocode->max_discount_amount = $request->max_discount_amount ?? 0;
            $promocode->repeat_usage = $request->repeat_usage;
            if($promocode->repeat_usage == 1){
                $promocode->no_of_repeat_usage = $request->no_of_repeat_usage;
            }
            else{
                $promocode->no_of_repeat_usage = 0;
            }
            $promocode->status = $request->status;
            if($request->hasFile('image')){
                @Storage::disk('public')->delete($promocode->image);
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('promocode', $file, $fileName);
                $promocode->image = $image;
            }
            $promocode->save();
        }
        return CommonHelper::responseSuccess("Promo Code Updated Successfully!");
    }

    public function delete(Request $request)
    {

        if (isset($request->id)) {

            $promocode = PromoCode::find($request->id);
            if ($promocode) {
                $promocode->delete();
                return CommonHelper::responseSuccess("Promo Code Deleted Successfully!");
            } else {
                return CommonHelper::responseSuccess("Promo Code Already Deleted!");
            }
        }
    }
}
