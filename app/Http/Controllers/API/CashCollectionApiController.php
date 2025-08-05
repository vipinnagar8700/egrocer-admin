<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\DeliveryBoy;
use App\Models\Transaction;
use App\Models\DeliveryBoyTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CashCollectionApiController extends Controller
{
    public function getCashCollection(Request $request){
        $deliveryBoys = DeliveryBoy::orderBy('id', 'ASC')->get(['id', 'name', 'mobile', 'cash_received']);

        $transactions = DeliveryBoyTransaction::select('orders.*', 'delivery_boy_transactions.*', 'delivery_boys.name', 'delivery_boys.mobile', 'delivery_boys.address')
            ->leftJoin('orders', 'delivery_boy_transactions.order_id', '=', 'orders.id')
            ->leftJoin('delivery_boys', 'delivery_boy_transactions.delivery_boy_id', '=', 'delivery_boys.id')
            ->where(function ($query) {
                $query->where('delivery_boy_transactions.type', DeliveryBoyTransaction::$paymentTypeCod)
                    ->orWhere('delivery_boy_transactions.type', 'delivery_boy_cash_collection');
            });
        
        if (isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != "") {
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        
            $transactions->whereBetween('delivery_boy_transactions.created_at', [$startDate, $endDate]);
        }
        
        if (isset($request->delivery_boy_id) && $request->delivery_boy_id != "") {
            $transactions->where('delivery_boy_transactions.delivery_boy_id', $request->delivery_boy_id);
        }
        
        $transactions = $transactions->orderBy('delivery_boy_transactions.id', 'ASC')->get()->toArray();
   
        foreach($transactions as $t => $row) {
            if($row['type'] == 'delivery_boy_cash_collection'){
                 $transactions[$t]['type'] = 'Delivery Boy Cash Collection';
                 $transactions[$t]['order_id'] = '-';
                 $transactions[$t]['final_total'] = '-';
                 $transactions[$t]['collected_amount'] = $transactions[$t]['amount'];
                 $transactions[$t]['amount'] = 0;
            }elseif($row['type'] == 'COD'){
                $transactions[$t]['collected_amount'] = 0;
            }
        }


        
        $data = array(
            'deliveryBoys' => $deliveryBoys,
            'transactions' => $transactions
        );
       
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'deliveryBoy' => 'required|not_in:null',
            'amount' => 'required',
            'transaction_date' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
      
        $deliveryBoyData = json_decode($request->deliveryBoy);
        $transaction = new DeliveryBoyTransaction();
        $transaction->user_id = 0;
        $transaction->order_id = 0;
        $transaction->delivery_boy_id = $deliveryBoyData->id;
        $transaction->type = 'delivery_boy_cash_collection';
        $transaction->amount = $request->amount;
        $transaction->status = "success";
        $transaction->message = $request->message;
        $transaction->transaction_date = $request->transaction_date;
        $transaction->save();

        $deliveryBoy = DeliveryBoy::find($deliveryBoyData->id);
        $deliveryBoy->cash_received =($deliveryBoyData->cash_received-$request->amount);
        $deliveryBoy->save();
        return CommonHelper::responseSuccess("Fund Transfer Saved Successfully!");
    }
}
