<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderStatusList;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PhonepeController extends Controller
{

    public function phonepeWebhook(Request $request)
    {
        $notification = $request->all();
        $website_url = \App\Models\Setting::get_value('website_url') ?? "";

        // Log the notification for debugging
        \Log::info("Phonepe Callback: " . print_r($notification, true));

        try {
            if ($notification['code'] == 'PAYMENT_SUCCESS') {
                // transaction
                $order_id = $notification['transactionId'];
                $explode = explode('-', $order_id); 
                if ($explode[1] == 'order') {
                    $transactionData = array();
                    $transactionData['user_id'] = $explode[3];
                    $transactionData['order_id'] = $explode[2];
                    $transactionData['type'] = Transaction::$paymentTypePhonepe;
                    $transactionData['txn_id'] = $notification['transactionId'];
                    $transactionData['payu_txn_id'] = "";
                    $transactionData['amount'] = $notification['amount'] / 100;
                    $transactionData['status'] = Transaction::$statusSuccess;
                    $transactionData['message'] = $notification['providerReferenceId'];
                    $transactionData['transaction_date'] = now();

                    $transaction = Transaction::create($transactionData);
                    $order = Order::withTrashed()->where('id', $explode[2])->first();
                    $user = User::where('id', $explode[3])->first();
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

                    //CommonHelper::addSellerWiseOrder($order->id);
                    if (isset($website_url) && !empty($website_url)) { 
                        $redirect_url = $website_url . '/web-payment-status?status=' . $notification['code'] . '&order_id='.$explode[2].'&type=order&payment_method=Phonepe';
                        return redirect($redirect_url);
                    } else {
                        return redirect()->route('phonepe.redirect', ['status' => $notification['code']]);
                    }

                } elseif ($explode[1] == 'wallet') {
                    \Log::info("Phonepe Callbackwallet: " . print_r($notification, true));

                    $walletTransactionData = array();
                    $walletTransactionData['user_id'] = $explode[3];
                    $walletTransactionData['order_id'] = 0;
                    $walletTransactionData['type'] = 'credit';
                    $walletTransactionData['payment_type'] = Transaction::$paymentTypePhonepe;
                    $walletTransactionData['txn_id'] = $notification['transactionId'];
                    $walletTransactionData['amount'] = $notification['amount'] / 100;
                    $walletTransactionData['status'] = Transaction::$statusSuccess;
                    $walletTransactionData['message'] = "Wallet successfully recharged. - " . $notification['providerReferenceId'];
                    $walletTransactionData['transaction_date'] = now();
                    $wallet_transaction = WalletTransaction::create($walletTransactionData);

                    $newBalance = CommonHelper::addUserWalletBalance($walletTransactionData['amount'],$explode[3]);
  
                    if (isset($website_url) && !empty($website_url)) {
                        $redirect_url = $website_url . '/web-payment-status?status=' . $notification['code'] . '&order_id='.$explode[2].'&type=wallet&payment_method=Phonepe';
                        return redirect($redirect_url);
                    } else {
                        return redirect()->route('phonepe.redirect', ['status' => $notification['code']]);
                    }

                }
            } else {
                $order_id = $notification['transactionId'];
                $explode = explode('-', $order_id);
                if ($explode[1] == 'order') {
                    Order::where('id', $explode[2])->update(['active_status' => OrderStatusList::$cancelled]);
                }
            }
        } catch (\Exception $e) {
            \Log::error("Error processing Phonepe callback: " . $e->getMessage());
            return CommonHelper::responseError("An error occurred while processing the callback.");
        }
    }

}