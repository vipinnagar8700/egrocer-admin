<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\API\OrdersApiController;
use App\Http\Controllers\API\OrderStatusApiController;
use App\Models\Category;
use App\Models\City;
use App\Models\DeliveryBoy;
use App\Models\Favorite;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use App\Models\PanelNotification;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ReturnRequest;
use App\Models\Seller;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class StripeController extends BaseController
{

    public function stripeWebhook(Request $request)
    {

        $stripe_secret_key = Setting::get_value('stripe_secret_key');

        Log::info("StripeWeb".$stripe_secret_key);
        if(!$stripe_secret_key){
            Log::info("Stripe Webhook : stripe_secret_key no found! Skip.");
            return;
        }

        \Stripe\Stripe::setApiKey($stripe_secret_key);
        $endpoint_secret = Setting::get_value('stripe_webhook_secret_key');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;



        Log::error("payload : ".$payload);
        Log::error("sig_header : ".$sig_header);
        Log::error("endpoint_secret : ".$endpoint_secret);

        try {

           

            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );

            Log::info("stripeWebhook");
            Log::info("Event Type: ".$event->type);
            Log::info($event);


        } catch(\UnexpectedValueException $e) {
            

            Log::error("Stripe Error Invalid payload : ",[$e]);
            Log::error("Stripe Error Invalid payload message : ".$e->getMessage());

            http_response_code(400);
            exit();
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            

            Log::error("Stripe Error Invalid signature : ",[$e]);
            Log::error("Stripe Error Invalid signature message : ".$e->getMessage());

            http_response_code(400);
            exit();
        }

        if (!empty($event->data->object)) {
            $txn_id = (isset($event->data->object->payment_intent)) ? $event->data->object->payment_intent : "";
            if (!empty($txn_id)) {

                $transaction = Transaction::where('txn_id',$txn_id)->first();
                Log::info("transaction --> ",[$transaction]);

                if (isset($transaction) && !empty($transaction)) {
                    $order_id = $transaction['order_id'];
                    $user_id = $transaction['user_id'];
                } else {
                    $order_id = $event->data->metadata->order_id;
                    $order_data = Order::where('order_id',$order_id)->first();
                    $user_id = $order_data['user_id'];
                }
            }
            $amount = $event->data->object->amount;
            $currency = $event->data->object->currency;
            $balance_transaction = $event->data->object->balance_transaction;
        } else {
            $order_id = 0;
            $amount = 0;
            $currency = (isset($event->data->object->currency)) ? $event->data->object->currency : "";
            $balance_transaction = 0;
        }


        /* Wallet refill has unique format for order ID - wallet-refill-user-{user_id}-{system_time}-{3 random_number}  */
        if (empty($order_id)) {
            $order_id = (!empty($event->data->object->metadata) && isset($event->data->object->metadata->order_id)) ? $event->data->object->metadata->order_id : 0;
        }

        if (!is_numeric($order_id) && strpos($order_id, "wallet-refill-user") !== false) {
            $temp = explode("-", $order_id);
            if (isset($temp[3]) && is_numeric($temp[3]) && !empty($temp[3] && $temp[3] != '')) {
                $user_id = $temp[3];
            } else {
                $user_id = 0;
            }
        }


        if ($event->type == 'charge.succeeded'){
            if (!empty($order_id)) {
                /* To do the wallet recharge if the order id is set in the above mentioned pattern */
                if (strpos($order_id, "wallet-refill-user") !== false){
                    
                } else {
                    /* process the order and mark it as received */
                    $order = Order::where('id',$order_id)->first();
                    if (isset($order['user_id'])) {

                        if(isset($transaction) && !$transaction) {
                            $transactionData = array();
                            $transactionData['user_id'] = $order->user_id;
                            $transactionData['order_id'] = $order->id;
                            $transactionData['type'] = Transaction::$paymentTypeStripe;
                            $transactionData['txn_id'] = $txn_id;
                            $transactionData['payu_txn_id'] = "";
                            $transactionData['amount'] = $order->total;
                            $transactionData['status'] = Transaction::$statusSuccess;
                            $transactionData['message'] = "";
                            $transactionData['transaction_date'] = date('Y-m-d H:i:s');
                            $transaction = Transaction::create($transactionData);
                        }else{
                            $transaction->status = Transaction::$statusSuccess;
                            $transaction->save();
                        }

                        if($transaction){
                            //Mark payment received
                            $order->active_status = OrderStatusList::$received;
                            $order->transaction_id = $transaction->id??0;
                            $order->save();

                           // CommonHelper::addSellerWiseOrder($order->id);
                        }


                    }
                }
            } else {
                Log::info("Stripe Webhook Order id not found : ",[$event]);
            }
            $response['error'] = false;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Transaction successfully done";
            echo json_encode($response);
            return false;
            exit();

        }elseif ($event->type == 'charge.failed'){
            $order = Order::where('id',$order_id)->update(['active_status'=>OrderStatusList::$cancelled]);

            $response['error'] = true;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Transaction is failed. ";
            Log::info('Stripe Webhook | Transaction is failed --> ',[$event]);
            echo json_encode($response);
            return false;
            exit();

        }elseif($event->type == 'charge.pending'){
            $response['error'] = false;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Waiting customer to finish transaction ";
            Log::info('Stripe Webhook | Waiting customer to finish transaction --> ',[$event]);
            echo json_encode($response);
            return false;
            exit();
        }elseif($event->type == 'charge.expired'){
            if (!empty($order_id)) {
               Order::where('id',$order_id)->update(['active_status'=>OrderStatusList::$cancelled]);
            }

            $response['error'] = true;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Transaction is expired.";
            Log::info( 'Stripe Webhook | Transaction is expired --> ',[$event]);
            echo json_encode($response);
            return false;
            exit();

        }elseif ($event->type == 'charge.refunded'){
            if (!empty($order_id)) {
                Order::where('id',$order_id)->update(['active_status'=>OrderStatusList::$cancelled]);
            }

            $response['error'] = true;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Transaction is refunded.";
            Log::info('Stripe Webhook | Transaction is refunded --> ',[$event]);
            echo json_encode($response);
            return false;
            exit();
        } else {
            $response['error'] = true;
            $response['transaction_status'] = $event->type;
            $response['message'] = "Transaction could not be detected.";
            Log::info('Stripe Webhook | Transaction could not be detected --> ',[$event]);
            echo json_encode($response);
            return false;
            exit();
        }

        http_response_code(200);
    }


}
