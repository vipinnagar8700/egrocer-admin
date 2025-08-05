<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\DeliveryBoy;
use App\Models\Seller;
use App\Models\WithdrawalRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class WithdrawalRequestsApiController extends Controller
{
    public function index(){
      
        $withdrawalRequests = WithdrawalRequest::select('withdrawal_requests.*','users.name as user_name','sellers.name as seller_name','delivery_boys.name as delivery_boy_name',
            'users.balance as user_balance','sellers.balance as seller_balance','delivery_boys.balance as delivery_boy_balance')
            ->leftJoin('users', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeUser)
                    ->on('withdrawal_requests.type_id', '=', 'users.id');
            })
            ->leftJoin('sellers', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeSeller)
                    ->on('withdrawal_requests.type_id', '=', 'sellers.id');
            })
            ->leftJoin('delivery_boys', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeDeliveryBoy)
                    ->on('withdrawal_requests.type_id', '=', 'delivery_boys.id');
            })
            
            ->orderBy('withdrawal_requests.id','DESC')
            ->get()->toArray();
          
        $data = array();
        foreach ($withdrawalRequests as $key =>$request){
            $subData = array();
            $subData["id"] = $request["id"];
            $subData["type"] = $request["type"];
            if($request["type"] == WithdrawalRequest::$typeUser){
                $subData["name"] = $request["user_name"];
                $subData["balance"] = $request["user_balance"];
            }elseif (strtolower($request["type"]) == WithdrawalRequest::$typeSeller){
                $subData["name"] = $request["seller_name"];
                $subData["balance"] = $request["seller_balance"];
            }else{
                $subData["name"] = $request["delivery_boy_name"];
                $subData["balance"] = $request["delivery_boy_balance"];
            }
            $subData["amount"] = $request["amount"];
            $subData["message"] = $request["message"];
            $subData["status"] = $request["status"];
            $subData["remark"] = $request["remark"];
            $subData["device_type"] = $request["device_type"];
            $subData["created_at"] = $request["created_at"];
            $data[] = $subData;
        }
        return CommonHelper::responseWithData($data);
    }

    public function update(Request $request){
        
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'receipt_image' => 'required_if:status,1',
            'remark' => 'required_if:status,2|string|max:500'
        ], [
            'status.required' => 'The status field is mandatory.',
            'receipt_image.required_if' => 'The receipt image is required when the status is Approved.',
            'remark.required_if' => 'A remark is required when the status is Reject.',
            'remark.string' => 'The remark must be a string.',
            'remark.max' => 'The remark may not be greater than 500 characters.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){

            \Illuminate\Support\Facades\DB::beginTransaction();
            try {

                $withdrawalRequest = WithdrawalRequest::find($request->id);
               if($withdrawalRequest->status != WithdrawalRequest::$statusApproved){
                if($request->status == $withdrawalRequest->status){
                    return CommonHelper::responseError('This record have same status.');
                }
       
                if(intval($request->status) == WithdrawalRequest::$statusApproved){
                   
                    if(strtolower($withdrawalRequest->type) == WithdrawalRequest::$typeSeller){
                       
                        $seller_id = $withdrawalRequest->type_id;
                      
                       
                        $seller = Seller::find($seller_id);
                        if(empty($seller)){
                            return CommonHelper::responseError("Seller not found.");
                        }
                        if($seller->balance <= $withdrawalRequest->amount){
                            return CommonHelper::responseError("The amount is greater than your balance.");
                        }
                        $new_balance = floatval($seller->balance) - floatval($withdrawalRequest->amount);
                        
                        CommonHelper::updateSellerWalletBalance($new_balance, $seller_id);
                        CommonHelper::addSellerWalletTransaction(null, null, $seller_id, 'debit', floatval($withdrawalRequest->amount), 'Approve Withdraw Request ID : '.$request->id);
                       

                    }elseif(strtolower($withdrawalRequest->origional_type) == WithdrawalRequest::$typeDeliveryBoy){
                       
                        $deliveryboy_id = $withdrawalRequest->type_id;
                      
                       
                        $deliveryboy = DeliveryBoy::find($deliveryboy_id);
                        if(empty($deliveryboy)){
                            return CommonHelper::responseError("Delivery Boy not found.");
                        }
                        
                        if($deliveryboy->balance <= $withdrawalRequest->amount){
                            return CommonHelper::responseError("The amount is greater than your balance.");
                        }
                        $new_balance = floatval($deliveryboy->balance) - floatval($withdrawalRequest->amount);
                        CommonHelper::addFundTransfers($deliveryboy_id, floatval($withdrawalRequest->amount), 'debit', 'Approve Withdraw Request ID : '.$request->id);
                        
                    }

                    $receipt_image = '';
                    if($request->hasFile('receipt_image')){
                        $validator = Validator::make($request->all(),[
                           
                            'receipt_image' => 'image|mimes:jpeg,png,jpg|max:2048',
                            
                
                        ]);
                        if ($validator->fails()) {
                            return CommonHelper::responseError($validator->errors()->first());
                        }
                        $file = $request->file('receipt_image');
                        $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                        $receipt_image = Storage::disk('public')->putFileAs('withdraw_requests', $file, $fileName);
                    }
                    $withdrawalRequest->receipt_image = $receipt_image;
                }
            

                $withdrawalRequest->status = $request->status;
                $withdrawalRequest->remark = $request->remark;
                $withdrawalRequest->save();

                \Illuminate\Support\Facades\DB::commit();
            }
            else{
                return CommonHelper::responseError("This request is already Approved.");
            }
            } catch (\Exception $e) {
                Log::info("Error : ".$e->getMessage());
                \Illuminate\Support\Facades\DB::rollBack();
                return CommonHelper::responseError("Something Went Wrong!");
            }


        }
        return CommonHelper::responseSuccess("Withdrawal Request Status Updated Successfully!");
    }


    public function delete(Request $request){
        if(isset($request->id)){
            $withdrawalRequest = WithdrawalRequest::find($request->id);
            if($withdrawalRequest){
                $withdrawalRequest->delete();
                return CommonHelper::responseSuccess("Withdrawal Request Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Withdrawal Request Already Deleted!");
            }
        }
    }


    public function addWithdrawalRequests(Request $request){

        $validator = Validator::make($request->all(),[
            'amount' => 'required|numeric|min:0.01|not_in:0'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $amount = round($request->amount, 2);;
        \Illuminate\Support\Facades\DB::beginTransaction();
        try {

            if($request->type == WithdrawalRequest::$typeDeliveryBoy){
                $type_id = auth()->user()->deliveryBoy->id;
                $type = WithdrawalRequest::$typeDeliveryBoy;
                $deliveryBoy = DeliveryBoy::find($type_id);
                if(empty($deliveryBoy)){
                    return CommonHelper::responseError("Delivery boy not found.");
                }
                if($deliveryBoy->balance < $amount){
                    return CommonHelper::responseError("The amount is greater than your balance.");
                }

            }else if ($request->type == WithdrawalRequest::$typeSeller){

                $type_id = auth()->user()->seller->id ?? $request->type_id;
                $type = WithdrawalRequest::$typeSeller;
                $seller = Seller::find($type_id);
                if(empty($seller)){
                    return CommonHelper::responseError("Seller not found.");
                }
                if($seller->balance < $amount){
                    return CommonHelper::responseError("The amount is greater than your balance.");
                }
            }else if ($request->type == WithdrawalRequest::$typeUser){
                $type_id = auth()->user()->id;
                $type = WithdrawalRequest::$typeUser;
            }

            $withdrawalRequest = new WithdrawalRequest();
            $withdrawalRequest->type = $type;
            $withdrawalRequest->type_id = $type_id;
            $withdrawalRequest->amount = $amount;
            $withdrawalRequest->message = $request->message;
            $withdrawalRequest->status = WithdrawalRequest::$statusPending;
            $withdrawalRequest->device_type = $request->device_type;
            $withdrawalRequest->save();

            \Illuminate\Support\Facades\DB::commit();
        } catch (\Exception $e) {
            Log::info("Error : ".$e->getMessage());
            \Illuminate\Support\Facades\DB::rollBack();
            return CommonHelper::responseError("Something Went Wrong!");
        }
        return CommonHelper::responseSuccess("Withdrawal Request Submitted Successfully!");
    }

    public function getWithdrawalRequests(Request $request){

        $limit = isset($request->limit) ? $request->limit : '';
        $offset = isset($request->offset) ? $request->offset : '';
        $search = isset($request->search) ? $request->search : '';

        $withdrawalRequestsQuery = WithdrawalRequest::select('withdrawal_requests.*','users.name as user_name','sellers.name as seller_name','delivery_boys.name as delivery_boy_name',
            'users.balance as user_balance','sellers.balance as seller_balance','delivery_boys.balance as delivery_boy_balance')
            ->leftJoin('users', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeUser)
                    ->on('withdrawal_requests.type_id', '=', 'users.id');
            })
            ->leftJoin('sellers', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeSeller)
                    ->on('withdrawal_requests.type_id', '=', 'sellers.id');
            })
            ->leftJoin('delivery_boys', function($join){
                $join->where('withdrawal_requests.type', '=', WithdrawalRequest::$typeDeliveryBoy)
                    ->on('withdrawal_requests.type_id', '=', 'delivery_boys.id');
            });

        // For partner panel
        if(auth()->user()->role_id == 3){
            $type = WithdrawalRequest::$typeSeller;
            $type_id = auth()->user()->seller->id;
            $withdrawalRequestsQuery->where(['withdrawal_requests.type' => $type, 'withdrawal_requests.type_id' => $type_id]);
        } elseif(auth()->user()->role_id == 4){
            $type = WithdrawalRequest::$typeDeliveryBoy;
            $type_id = auth()->user()->deliveryBoy->id;
            $withdrawalRequestsQuery->where(['withdrawal_requests.type' => $type, 'withdrawal_requests.type_id' => $type_id]);
        }

        // For admin panel
        if(isset($request->type) && $request->type != null){
            $withdrawalRequestsQuery->where('withdrawal_requests.type', $request->type);
        }
        if(isset($request->status) && $request->status != null){
            $withdrawalRequestsQuery->where('withdrawal_requests.status', $request->status);
        }

        // Add search functionality
        if ($search) {
            $withdrawalRequestsQuery->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                    ->orWhere('sellers.name', 'like', '%' . $search . '%')
                    ->orWhere('delivery_boys.name', 'like', '%' . $search . '%')
                    ->orWhere('withdrawal_requests.id', 'like', '%' . $search . '%')
                    ->orWhere('withdrawal_requests.amount', 'like', '%' . $search . '%')
                    ->orWhere('withdrawal_requests.message', 'like', '%' . $search . '%')
                    ->orWhere('withdrawal_requests.remark', 'like', '%' . $search . '%')
                    ->orWhere('withdrawal_requests.created_at', 'like', '%' . $search . '%');
            });
        }

        $total = $withdrawalRequestsQuery->count(); // Get total count
        $withdrawalRequestsQuery->orderBy('withdrawal_requests.id', 'DESC');
        if(isset($request->limit)){
            $withdrawalRequestsQuery->skip($offset)->take($limit);
        } 
        $withdrawalRequests =  $withdrawalRequestsQuery->get()->toArray();
       
        $data = array();
        $data['withdraw_requests'] = [];
        foreach ($withdrawalRequests as $key =>$request){
            $subData = array();
            $subData["id"] = $request["id"];
            $subData["type"] = $request["type"];
            
            if($request["origional_type"] == WithdrawalRequest::$typeUser){
                $subData["name"] = $request["user_name"];
                $subData["balance"] = $request["user_balance"];
            }elseif (strtolower($request["origional_type"]) == WithdrawalRequest::$typeSeller){
                $subData["name"] = $request["seller_name"];
                $subData["balance"] = $request["seller_balance"];
            }elseif (strtolower($request["origional_type"]) == WithdrawalRequest::$typeDeliveryBoy){
                $subData["name"] = $request["delivery_boy_name"];
                $subData["balance"] = $request["delivery_boy_balance"];
            }
            $subData["amount"] = $request["amount"];
            $subData["message"] = $request["message"];
            $subData["status"] = $request["status"];
            $subData["remark"] = $request["remark"];
            $subData["receipt_image"] = $request["receipt_image"];
            $subData["receipt_image_url"] = $request["receipt_image_url"];
            $subData["device_type"] = $request["device_type"];
            $subData["created_at"] = $request["created_at"];
            
            $data['withdraw_requests'][] = $subData; // Append $subData to $data
        }
    
       
          
        if(auth()->user()->role_id == 3){
            $pending_amount = WithdrawalRequest::where('status', WithdrawalRequest::$statusPending)
            ->where('type', WithdrawalRequest::$typeSeller)
            ->where('type_id', $type_id)
            ->sum('amount');
            $data['balance'] =  round(auth()->user()->seller->balance - $pending_amount, 2);
        }elseif(auth()->user()->role_id == 4){
            $pending_amount = WithdrawalRequest::where('status', WithdrawalRequest::$statusPending)
            ->where('type', WithdrawalRequest::$typeDeliveryBoy)
            ->where('type_id', $type_id)
            ->sum('amount');
            $data['balance'] = round(auth()->user()->deliveryBoy->balance - $pending_amount,2);
        }
    
        if(!empty($data)){
            return CommonHelper::responseWithData($data,$total);
        }else{
            return CommonHelper::responseError("Withdrawal request not found!");
        }
    }

}
