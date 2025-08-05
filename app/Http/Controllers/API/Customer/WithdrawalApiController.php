<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Setting;
use App\Models\SubCategory;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\WithdrawalRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class WithdrawalApiController extends Controller
{
    public function getRequest(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 10);
        $type = $request->type;
        $type_id = $request->type_id;

        $total = WithdrawalRequest::select(DB::raw('COUNT(withdrawal_requests.id) AS total'))->where('type',$type)->where('type_id',$type_id)->first();
        $withdrawalRequests = WithdrawalRequest::select('withdrawal_requests.*','users.name as user_name','sellers.name as seller_name','delivery_boys.name as delivery_boy_name',
            'users.balance as user_balance','sellers.balance as seller_balance','delivery_boys.balance as delivery_boy_balance')
            ->leftJoin('users', function($join){
                $join->where('withdrawal_requests.type', '=', 'user')
                    ->on('withdrawal_requests.type_id', '=', 'users.id');
            })
            ->leftJoin('sellers', function($join){
                $join->where('withdrawal_requests.type', '=', 'seller')
                    ->on('withdrawal_requests.type_id', '=', 'sellers.id');
            })
            ->leftJoin('delivery_boys', function($join){
                $join->where('withdrawal_requests.type', '=', 'delivery_boy')
                    ->on('withdrawal_requests.type_id', '=', 'delivery_boys.id');
            })
            ->where('type',$type)
            ->where('type_id',$type_id)
            ->offset($offset)
            ->limit($limit)
            ->orderBy('withdrawal_requests.id','DESC')
            ->get()->toArray();
        $data = array();
        foreach ($withdrawalRequests as $key =>$request){
            $subData = array();
            $subData["id"] = $request["id"];
            $subData["type"] = $request["type"];
            if($request["type"] == "user"){
                $subData["name"] = $request["user_name"];
                $subData["balance"] = $request["user_balance"];
            }elseif ($request["type"] == "seller"){
                $subData["name"] = $request["seller_name"];
                $subData["balance"] = $request["seller_balance"];
            }else{
                $subData["name"] = $request["delivery_boy_name"];
                $subData["balance"] = $request["delivery_boy_balance"];
            }
            $subData["amount"] = $request["amount"];
            $subData["message"] = $request["message"];
            $subData["status"] = $request["status"];
            $data[] = $subData;
        }
        if($data){
            return CommonHelper::responseWithData($data,$total->total);
        }else{
            return CommonHelper::responseError("No Data Found!");
        }
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required',
            'amount' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $user = User::where('id',$request->type_id)->first();
      
        if($user->balance == 0){
            return CommonHelper::responseError("Your wallet balance is 0.");
        }else if($user->balance < $request->amount){
            return CommonHelper::responseError("Your wallet balance is ".$user->balance);
        }
        $withdrawalRequest = new WithdrawalRequest();
        $withdrawalRequest->type = $request->type;
        $withdrawalRequest->amount = $request->amount;
        $withdrawalRequest->type_id = $request->type_id;
        $withdrawalRequest->message = $request->message;
        $withdrawalRequest->save();
        return CommonHelper::responseSuccess("Withdrawal Request Saved Successfully!");
    }


}
