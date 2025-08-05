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

class PaytabsController extends Controller
{

    public function paytabsWebhook(Request $request)
    {
      
        $notification = $request->all();
        $website_url = Setting::get_value('website_url') ?? "";
 
        // Log the notification for debugging
        \Log::info("paytabs Callbackqqq: " .print_r($notification, true));

        try {
            if ($notification['payment_result']['response_status'] == 'A') {
                // transaction
                $order_id = $notification['cart_id']  ;
                
                $explode = explode('-', $order_id);
                if ($explode[0] == 'order') {
                     \Log::info("paytabs Callbackorder: " .print_r($notification, true));
                    $transactionData = array();
                    $transactionData['user_id'] = $explode[2];
                    $transactionData['order_id'] = $explode[1];
                    $transactionData['type'] = Transaction::$paymentTypePaytabs;
                    $transactionData['txn_id'] = $notification['tran_ref'];
                    $transactionData['payu_txn_id'] = "";
                    $transactionData['amount'] = $notification['tran_total'];
                    $transactionData['status'] = Transaction::$statusSuccess;
                    $transactionData['message'] =  "Paytabs order payment";
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
                        CommonHelper::addWalletTransaction($order_id, 0, $user->id, 'debit', $order->wallet_balance, 'Used against Order Placement');
                    }

                    $order->save();
                     $excludedStatuses = [OrderStatusList::$cancelled, OrderStatusList::$returned];

                    // Update the order items
                    $query = OrderItem::where("order_id", $request->order_id)
                    ->whereNotIn("active_status", $excludedStatuses)
                    ->update(['active_status' => $request->status_id]);

                    if (isset($website_url) && !empty($website_url)) { 
                        $redirect_url = $website_url . '/web-payment-status?status=' . $notification['payment_result']['response_status'] . '&type=order&payment_method=Phonepe';
                        return redirect($redirect_url);
                    } else {
                        return redirect()->route('phonepe.redirect', ['status' => $notification['payment_result']['response_status']]);
                    }
                  


                } elseif ($explode[0] == 'wallet') {
                    \Log::info("Paytabs Callbackwallet: " . print_r($notification, true));
                    $dateTime = Carbon::createFromFormat('YmdHis', $explode[1]);
                    $formattedDateTime = $dateTime->format('Y-m-d H:i:s');
                    $walletTransactionData = array();
                    $walletTransactionData['user_id'] = $explode[2];
                    $walletTransactionData['order_id'] = '';
                    $walletTransactionData['type'] = 'credit';
                    $walletTransactionData['payment_type'] = Transaction::$paymentTypePaytabs;
                    $walletTransactionData['txn_id'] = $notification['tran_ref'];
                    $walletTransactionData['amount'] = $notification['tran_total'];
                    $walletTransactionData['status'] = Transaction::$statusSuccess;
                    $walletTransactionData['message'] = "Wallet successfully recharged." ;
                    $walletTransactionData['transaction_date'] = $formattedDateTime;
                    $wallet_transaction = WalletTransaction::create($walletTransactionData);

                    $newBalance = CommonHelper::addUserWalletBalance($walletTransactionData['amount'],$explode[2]);

                        $redirect_url = 'https://google.com/web-payment-status?status=s&type=wallet&payment_method=Phonepe';
                        return $redirect_url;
                }
            } else {
                $order_id = $notification['data']['order']['order_tags']['link_id'];
                $explode = explode('-', $order_id);
                if ($explode[0] == 'order') {
                    Order::where('id', $explode[1])->update(['active_status' => OrderStatusList::$cancelled]);
                }
            }
        } catch (\Exception $e) {
            \Log::error("Error processing Paytabs callback: " . $e->getMessage());
            return CommonHelper::responseError("An error occurred while processing the callback.");
        }
    }

    public function paytabsRedirect(Request $request)
    {
       
        \Log::info('PayTabs callback receivedredirect', $request->all());
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
            $redirect_url = $website_url . '/web-payment-status?status=' . $status . '&type='.$explode[0].'&payment_method=Paytabs&order_id='.$explode[1];
            return redirect($redirect_url);
        } else {
            return redirect()->route('/', ['status' => $status]);
        }
    }

}