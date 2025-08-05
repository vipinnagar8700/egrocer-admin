<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\WalletTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WalletTransactionsApiController extends Controller
{
    public function index(){
        $customers = User::orderBy('id','DESC')->get();
        $walletTransactions = WalletTransaction::select('users.name', 'wallet_transactions.*')
            ->leftJoin('users', 'wallet_transactions.user_id', '=', 'users.id')
            ->orderBy('wallet_transactions.id','DESC')->get();
        $data = array(
            'customers' => $customers,
            'walletTransactions' => $walletTransactions
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'customer' => 'required',
            'type' => 'required',
            'amount' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $customerData = json_decode($request->customer);
        $walletTransactions = new WalletTransaction();
        $walletTransactions->user_id = $customerData->id;
        $walletTransactions->type = $request->type;
        $walletTransactions->amount	 = $request->amount;
        $walletTransactions->txn_id	 = 'admin';
        $walletTransactions->payment_type = 'admin';
        $walletTransactions->message = $request->message;
        $walletTransactions->status = 1;
        $walletTransactions->save();

        $customer = User::find($customerData->id);
        $customer->balance = ($request->type == 'debit')?($customer->balance - $request->amount):($customer->balance + $request->amount);
        $customer->save();
        return CommonHelper::responseSuccess("Wallet Transaction Saved Successfully!");
    }
}
