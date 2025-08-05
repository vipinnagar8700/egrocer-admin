<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderStatusList;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CashfreeController extends Controller
{

    public function cashfreeWebhook(Request $request)
    {

        $notification = $request->all();

        // Log the notification for debugging
        \Log::info("Cashfree Callback: " .print_r($notification, true));

        try {
            if ($notification['data']['order']['transaction_status'] ?? $notification['data']['payment']['payment_status']== 'SUCCESS') {
                // transaction
                $order_id = $notification['data']['link_id'] ?? $notification['data']['order']['order_tags']['link_id'] ;
                
                $explode = explode('-', $order_id);
                if ($explode[0] == 'order') {
                     \Log::info("Cashfree Callbackorder: " .print_r($notification, true));
                    $transactionData = array();
                    $transactionData['user_id'] = $explode[2];
                    $transactionData['order_id'] = $explode[1];
                    $transactionData['type'] = Transaction::$paymentTypeCashfree;
                    $transactionData['txn_id'] = $notification['data']['order']['transaction_id'] ?? $notification['data']['payment']['cf_payment_id'];
                    $transactionData['payu_txn_id'] = "";
                    $transactionData['amount'] = $notification['data']['order']['order_amount'] ?? $notification['data']['payment']['payment_amount'];
                    $transactionData['status'] = Transaction::$statusSuccess;
                    $transactionData['message'] =  "cashfree order payment";
                    $transactionData['transaction_date'] = now();

                    $transaction = Transaction::create($transactionData);
                    $order = Order::withTrashed()->where('id', $explode[1])->first();
                    $user = User::where('id', $explode[2])->first();
                    $user_wallet_balance = $user->balance;
                    if (!$order) {
                        return CommonHelper::responseError("Invalid Order Id");
                    }

                    // Mark payment received
                    $order->active_status = OrderStatusList::$received;
                    $order->transaction_id = $transaction->id ?? 0;

                    if (isset($order->wallet_balance) && $order->wallet_balance > 0) {
                        // Deduct the balance & set the wallet transaction
                        $new_balance = $user_wallet_balance < $order->wallet_balance ? 0 : $user_wallet_balance - $order->wallet_balance;
                        CommonHelper::updateUserWalletBalance($new_balance, $user->id);
                        CommonHelper::addWalletTransaction($explode[1], 0, $user->id, 'debit', $order->wallet_balance, 'Used against Order Placement');
                    }

                    $order->save();
                    $excludedStatuses = [OrderStatusList::$cancelled, OrderStatusList::$returned];

                    // Update the order items
                    $query = OrderItem::where("order_id", $request->order_id)
                    ->whereNotIn("active_status", $excludedStatuses)
                    ->update(['active_status' => $request->status_id]);
                } elseif ($explode[0] == 'wallet') {
                    \Log::info("Cashfree Callbackwallet: " . print_r($notification, true));
                    $dateTime = Carbon::createFromFormat('YmdHis', $explode[1]);
                    $formattedDateTime = $dateTime->format('Y-m-d H:i:s');
                    $walletTransactionData = array();
                    $walletTransactionData['user_id'] = $explode[2];
                    $walletTransactionData['order_id'] = '';
                    $walletTransactionData['type'] = 'credit';
                    $walletTransactionData['payment_type'] = Transaction::$paymentTypeCashfree;
                    $walletTransactionData['txn_id'] = $notification['data']['order']['transaction_id'] ?? $notification['data']['payment']['cf_payment_id'];
                    $walletTransactionData['amount'] = $notification['data']['order']['order_amount'] ?? $notification['data']['payment']['payment_amount'];
                    $walletTransactionData['status'] = Transaction::$statusSuccess;
                    $walletTransactionData['message'] = "Wallet successfully recharged." ;
                    $walletTransactionData['transaction_date'] = $formattedDateTime;
                    $wallet_transaction = WalletTransaction::create($walletTransactionData);

                    $newBalance = CommonHelper::addUserWalletBalance($walletTransactionData['amount'],$explode[2]);

                }
            } else {
                $order_id = $notification['data']['order']['order_tags']['link_id'];
                $explode = explode('-', $order_id);
                if ($explode[0] == 'order') {
                    Order::where('id', $explode[1])->update(['active_status' => OrderStatusList::$cancelled]);
                }
            }
        } catch (\Exception $e) {
            \Log::error("Error processing Cashfree callback: " . $e->getMessage());
            return CommonHelper::responseError("An error occurred while processing the callback.");
        }
    }

    public function cashfreeRedirect(Request $request)
    {
       
      
        $order_id = $request->order;
        $explode = explode('-', $order_id);
    if ($explode[0] == 'order') {
        
        $order_status = Order::where('id', $explode[1])->where('user_id', $explode[2])->value('active_status');
        
        if($order_status != OrderStatusList::$cancelled){
             $status = Transaction::where('order_id', $explode[1])->where('user_id', $explode[2])->value('status');
        }else{
           $status =  Transaction::$statusFailed;
        }
               

    }elseif($explode[0] == 'wallet'){
        $dateTime = Carbon::createFromFormat('YmdHis', $explode[1]);
$formattedDateTime = $dateTime->format('Y-m-d H:i:s');

         $status = WalletTransaction::where('transaction_date', $formattedDateTime)->where('user_id', $explode[2])->value('status') ?? 'failed';
      
    }
    
  
  
        $website_url = Setting::get_value('website_url') ?? "";
        if (isset($website_url) && !empty($website_url)) {
            $redirect_url = $website_url . '/web-payment-status?status=' . $status . '&type='.$explode[0].'&order_id='.$explode[1].'&payment_method=Cashfree';
            return redirect($redirect_url);
        } else {
            return redirect()->route('/', ['status' => $status]);
        }
    }

}