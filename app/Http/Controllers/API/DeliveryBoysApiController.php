<?php
namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Notification;
use App\Models\DeliveryBoy;
use App\Models\Role;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DeliveryBoysApiController extends Controller
{
    public function getDeliveryBoy(Request $request){ 

        $deliveryBoy = DeliveryBoy::with('admin','city');
        if(isset($request->filterStatus) && $request->filterStatus != ""){
            $deliveryBoy = $deliveryBoy->where("status",$request->filterStatus);
        }

        if(isset($request->city_id) && $request->city_id != ""){
             $deliveryBoy = $deliveryBoy->where("city_id",$request->city_id)->where('status',1);

        }
       
        $data["deliveryBoys"] = $deliveryBoy;
        $deliveryBoy = $deliveryBoy->orderBy('id','DESC')->get();
        return CommonHelper::responseWithData($deliveryBoy);
    }
    public function getDeliveryBoyBonusSettings(){
        $bonus = CommonHelper::getDeliveryBoyBonusSettings();
        if(empty($bonus)){
            return CommonHelper::responseError("Default bonus not found.");
        }
        return CommonHelper::responseWithData($bonus);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'dob' => 'required',
            'mobile' => 'required',
            'email' => 'email|required|unique:admins',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
            'bonus_percentage' => 'required',
            'ifsc_code' => 'required',
            'bank_name' => 'required',
            'bank_account_number' => 'required',
            'account_name' => 'required',
            'city_id' => 'required',
            'address' => 'required',
            'driving_license' => 'required|mimes:jpeg,jpg,png,gif,pdf',
            'national_identity_card' => 'required|mimes:jpeg,jpg,png,gif,pdf',
        ],[
            'city_id.required' => 'The city field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        DB::beginTransaction();
        try {

            $data = array();
            $data['username'] = $request->name;
            $data['email'] = $request->email;
            $data['password'] = bcrypt($request->password);
            $data['role_id'] = Role::$roleDeliveryBoy;
            $data['created_by'] = 0;
            $admin = Admin::create($data);


            $deliveryBoy = new DeliveryBoy();
            $deliveryBoy->admin_id = $admin->id;
            $deliveryBoy->name = $request->name;
            $deliveryBoy->mobile = $request->mobile;
            $deliveryBoy->dob = $request->dob;

            $deliveryBoy->bonus_type = $request->bonus_type ?? 0;
            $deliveryBoy->bonus_percentage = $request->bonus_percentage ?? 0;
            $deliveryBoy->bonus_min_amount = $request->bonus_min_amount ?? 0;
            $deliveryBoy->bonus_max_amount = $request->bonus_max_amount ?? 0;

            $driving_license = '';
            if($request->hasFile('driving_license')){
                $file = $request->file('driving_license');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $driving_license = Storage::disk('public')
                    ->putFileAs('delivery_boy/driving_license', $file,$fileName);
            }
            $deliveryBoy->driving_license = $driving_license;
            $national_identity_card = '';
            if($request->hasFile('national_identity_card')){
                $file = $request->file('national_identity_card');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $national_identity_card = Storage::disk('public')
                    ->putFileAs('delivery_boy/national_identity_card', $file, $fileName);
            }
            $deliveryBoy->national_identity_card = $national_identity_card;
            $deliveryBoy->ifsc_code = $request->ifsc_code;
            $deliveryBoy->bank_name = $request->bank_name;
            $deliveryBoy->bank_account_number = $request->bank_account_number;
            $deliveryBoy->account_name = $request->account_name;
            $deliveryBoy->address = $request->address;
            $deliveryBoy->city_id = $request->city_id;
            $deliveryBoy->other_payment_information = $request->other_payment_information;
            $deliveryBoy->status = DeliveryBoy::$statusActive;
            $deliveryBoy->save();



            try {
                CommonHelper::sendMailAdminStatus( "delivery_boy", $deliveryBoy, $deliveryBoy->status, $request->email);
            }catch ( \Exception $e){
                Log::error("Add delivery_boy status send mail error",[$e->getMessage()] );
            }

            DB::commit();
            return CommonHelper::responseSuccess("Delivery Boy Saved Successfully!");
        }catch (\Exception $e){
            Log::info("Add Delivery Boy Error : ",[$e->getMessage()]);
            DB::rollBack();
            return CommonHelper::responseError("Something went wrong!");
        }
    }

    public function edit($id){
        $deliveryBoy = DeliveryBoy::with('admin')->where('id',$id)->first();
        if(!$deliveryBoy){
            return CommonHelper::responseError("Delivery Boy Not found!");
        }
        return CommonHelper::responseWithData($deliveryBoy);
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'email|required|unique:admins,email,'.$request->admin_id,
            'mobile' => 'required',
            'confirm_password' => 'same:password',
            'dob' => 'required',
            'bonus_percentage' => 'required',
            'ifsc_code' => 'required',
            'bank_name' => 'required',
            'bank_account_number' => 'required',
            'account_name' => 'required',
            'address' => 'required',
            'city_id' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if(isset($request->id)){

            $loginRoleId = auth()->user()->role->id;

            $deliveryBoy = DeliveryBoy::find($request->id);

            if($deliveryBoy) {

                $oldStatus = $deliveryBoy->status;

                $data = array();
                $data['username'] = $request->name;

                if ($loginRoleId != Role::$roleDeliveryBoy) {
                    $data['email'] = $request->email;
                }

                if (isset($request->password) && $request->password != "") {
                    $data['password'] = bcrypt($request->password);
                }
                Admin::where('id', $request->admin_id)->update($data);


                $deliveryBoy->name = $request->name;
                $deliveryBoy->mobile = $request->mobile;

                $deliveryBoy->dob = $request->dob;


                $deliveryBoy->bonus_type = $request->bonus_type ?? 0;
                $deliveryBoy->bonus_percentage = $request->bonus_percentage ?? 0;
                $deliveryBoy->bonus_min_amount = $request->bonus_min_amount ?? 0;
                $deliveryBoy->bonus_max_amount = $request->bonus_max_amount ?? 0;

                if ($request->hasFile('driving_license')) {
                    $file = $request->file('driving_license');
                    $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                    $driving_license = Storage::disk('public')
                        ->putFileAs('delivery_boy/driving_license', $file, $fileName);
                    $deliveryBoy->driving_license = $driving_license;
                }
                if ($request->hasFile('national_identity_card')) {
                    $file = $request->file('national_identity_card');
                    $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                    $national_identity_card = Storage::disk('public')
                        ->putFileAs('delivery_boy/national_identity_card', $file, $fileName);
                    $deliveryBoy->national_identity_card = $national_identity_card;
                }

                if ($loginRoleId != Role::$roleDeliveryBoy) {
                    $deliveryBoy->ifsc_code = $request->ifsc_code;
                    $deliveryBoy->bank_name = $request->bank_name;
                    $deliveryBoy->bank_account_number = $request->bank_account_number;
                    $deliveryBoy->account_name = $request->account_name;
                }

                $deliveryBoy->address = $request->address;
                $deliveryBoy->city_id = $request->city_id;
                $deliveryBoy->other_payment_information = $request->other_payment_information;
                $deliveryBoy->status = $request->status;
                $deliveryBoy->remark = $request->remark;

                $deliveryBoy->is_available = $request->status;
                $deliveryBoy->save();

                if($oldStatus != $deliveryBoy->status){
                    try {
                        CommonHelper::sendMailAdminStatus( "delivery_boy", $deliveryBoy, $deliveryBoy->status, $request->email);
                    }catch ( \Exception $e){
                        Log::error("Add delivery_boy status send mail error",[$e->getMessage()] );
                    }
                }



            }else{
                return CommonHelper::responseSuccess("Delivery Boy Not Found!");
            }
        }
        return CommonHelper::responseSuccess("Delivery Boy Updated Successfully!");
    }

    public function updateStatus(Request $request){
        if(isset($request->id)){
            $deliveryBoy = DeliveryBoy::find($request->id);

            if($deliveryBoy){
                $deliveryBoy->status = $request->status;
                $deliveryBoy->remark = $request->remark ?? "";
                $deliveryBoy->save();

                if(isset($request->status) && $request->status === DeliveryBoy::$statusActive){
                    $status_name = DeliveryBoy::$Active;
                }else{
                    $status_name = DeliveryBoy::$Rejected;
                }

                $user = Admin::where('id',$deliveryBoy->admin_id)->first();

                try {
                    CommonHelper::sendMailAdminStatus( "delivery_boy", $deliveryBoy, $deliveryBoy->status, $user->email);
                }catch ( \Exception $e){
                    Log::error("Approve delivery_boy status send mail error",[$e->getMessage()] );
                }

                return CommonHelper::responseSuccess("Delivery Boy ".$status_name." Successfully!");
            }else{
                return CommonHelper::responseSuccess("Delivery Boy Not Found!");
            }
        }
    }


    public function delete(Request $request){

        if(isset($request->id)){

            $deliveryBoy = DeliveryBoy::find($request->id);
            if($deliveryBoy){
                $deliveryBoy->delete();
                return CommonHelper::responseSuccess("Delivery Boy Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Delivery Boy Already Deleted!");
            }
        }
    }


}
