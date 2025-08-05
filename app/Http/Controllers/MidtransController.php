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

class MidtransController extends Controller
{
    public function midtransWebhook(Request $request)
    {
        $notification = $request->all();

        // Log the notification for debugging
        \Log::info("Midtrans Callback: " . print_r($notification, true));
        
        try {
            if ($notification['status_code'] == 200) {
                // Process the notification data here
                // Example: Update your database based on the notification
                
                // Transaction
                $order_id = $notification['order_id'];
                $explode = explode('-', $order_id);
                
                if ($explode[0] == 'order') {
                    $transactionData = [
                        'user_id' => $explode[2],
                        'order_id' => $explode[1],
                        'type' => 'Midtrans',
                        'txn_id' => $notification['transaction_id'],
                        'payu_txn_id' => "",
                        'amount' => $notification['gross_amount'] / 1000,
                        'status' => $notification['transaction_status'],
                        'message' => $notification['status_message'],
                        'transaction_date' => $notification['transaction_time'],
                    ];

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

                    //CommonHelper::addSellerWiseOrder($order->id);

                    return CommonHelper::responseSuccess("Order Placed Successfully");
                } elseif ($explode[0] == 'wallet') {
                    \Log::info("Midtrans Callback wallet: " . print_r($notification, true));

                    $walletTransactionData = [
                        'user_id' => $explode[2],
                        'order_id' => '',
                        'type' => 'credit',
                        'payment_type' => 'Midtrans',
                        'txn_id' => $notification['transaction_id'],
                        'amount' => $notification['gross_amount'] / 1000,
                        'status' => $notification['transaction_status'],
                        'message' => "Wallet successfully recharged.",
                        'transaction_date' => $notification['transaction_time'],
                    ];

                    $wallet_transaction = WalletTransaction::create($walletTransactionData);
                    $user = User::where('id', $explode[2])->first();

                    // Mark credit amount in user balance
                    $balance = $user->balance;
                    $newBalance = $balance + $walletTransactionData['amount'];

                    $user->update(['balance' => $newBalance]);
                    $data = ['user_balance' => $newBalance];

                    return CommonHelper::responseSuccessWithData("Amount Added in Wallet Successfully", $data);
                }
            } else {
                $order_id = $notification['order_id'];
                $explode = explode('-', $order_id);
                if ($explode[0] == 'order') {
                    Order::where('id', $explode[1])->update(['active_status' => OrderStatusList::$cancelled]);
                }
            }
        } catch (\Exception $e) {
            \Log::error("Error processing Midtrans callback: " . $e->getMessage());
            return CommonHelper::responseError("An error occurred while processing the callback.");
        }
    }
}