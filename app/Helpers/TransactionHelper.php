<?php

namespace App\Helpers;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;

use Illuminate\Support\Facades\Log;
use App\Models\Refund;
use App\Helpers\PaypalClient;
use Razorpay\Api\Api;
use App\Models\UserAddress;
use Midtrans\Config;
use Midtrans\Snap; 
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Ixudra\Curl\Facades\Curl;
use GuzzleHttp\Exception\RequestException;
class TransactionHelper
{
    public static function fetchPaymentStatus($transaction_type,$transaction_id,$transaction_amount)
    {
        $place_order = 0;
        $transaction_status = "failed";
        $server_output = "";
        $gateway_amount = 0;
        \Log::info("transaction_amount => ".$transaction_amount);
        if($transaction_type == "CCAvenueGateway")
        {
            $post = [
                'order_no' => $transaction_id
            ];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://111printphoto.in/Photo_case/CCAvenue/getTransactionStatus.php');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
            $server_output = curl_exec($ch);

            $result = json_decode($server_output, 1);
            if ($result['status'] == 1 && $result['data']['error_code'] == "")
            {
                $status = $result['data']['order_status'];
                $gateway_amount = $result['data']['order_amt'];

                if($status == 'Shipped')
                {
                    $place_order = 1;
                    $transaction_status = 'success';
                }
                elseif($status == 'Awaited' || $status == 'Successful' )
                {
                    $place_order = 1;
                    $transaction_status = 'pending';
                }
                else
                {
                    $place_order = 0;
                    $transaction_status = 'failed';
                }
            }
            else
            {
                $place_order = 0;
                $transaction_status = 'api_error';
            }

            if($place_order == 1 && $transaction_amount != $gateway_amount)
            {
                $place_order = 0;
                $transaction_status = 'amount_mismatch';
            }
        }
        else if($transaction_type == "Paytm")
        {
            $post = [
                'ORDER_ID' => $transaction_id
            ];
            $url = url('paytm/TXNStatus.php');
            Log::info($url);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
            $server_output = curl_exec($ch);

            $result = json_decode($server_output, 1);
            \Log::info('-------------Paytm start---------------');
            \Log::info($result);

            if(isset($result['data']['STATUS'])) {
                $status = $result['data']['STATUS'] ? $result['data']['STATUS'] : '';
                \Log::info("PAYTM STATUS SET: ".$status);
            }else {
                \Log::info("PAYTM STATUS: NOT SET--->");
            }

            $gateway_amount = $result['data']['TXNAMOUNT'];

            if($status == 'TXN_SUCCESS')
            {
                $place_order = 1;
                $transaction_status = 'success';
            }
            elseif($status == 'PENDING')
            {
                $place_order = 1;
                $transaction_status = 'pending';
            }
            else
            {
                $place_order = 0;
                $transaction_status = 'failed';
            }

            if($place_order == 1 && $transaction_amount != $gateway_amount)
            {
                $place_order = 0;
                $transaction_status = 'amount_mismatch';
            }
            \Log::info('-------------Paytm end---------------');

        }
        else if($transaction_type == "Paypal")
        {
            $paypalClient = new PaypalClient();
            $server_output = $paypalClient->getPayment($transaction_id);
            $result = json_decode($server_output, 1);
            \Log::info('-------------Paypal start---------------');

            if(isset($result['state']) && $result['state'] == 'approved')
            {
                $place_order = 1;
                $transaction_status = 'success';

                $gateway_amount = $result['transactions'][0]['amount']['total'];
            }
            else
            {
                $place_order = 0;
                $transaction_status = 'failed';
            }

            \Log::info($transaction_amount != $gateway_amount);
            if(( $place_order == 1) && ($transaction_amount != $gateway_amount))
            {
                \Log::info("gateway_amount => ".$gateway_amount);
                \Log::info("transaction_amount =>".$transaction_amount);
                $place_order = 0;
                $transaction_status = 'amount_mismatch';
            }
            \Log::info('-------------Paypal end---------------');
        }
        else if($transaction_type == "COD")
        {
            $place_order = 1;
            $transaction_status = "";
        }

        $out = array();
        $out['place_order'] = $place_order;
        $out['transaction_status'] = $transaction_status;
        $out['raw_api_response'] = $server_output; // Added for Logging Purpose.

        return $out;
    }

    public static function refund($request)
    {
        $message = "";
        $transaction_status = "";

        $merchant_refund_id = 'REFUND'.round(microtime(true) * 1000);
        $gateway_refund_id = "";

        if($request->transaction_type == "CCAvenueGateway")
        {
            $data = array();
            $data['reference_no'] = $request->reference_no;
            $data['refund_amount'] = $request->refund_amount;
            $data['refund_ref_no'] = $merchant_refund_id;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://printphoto.in/Photo_case/CCAvenue/refund.php');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            $server_output = curl_exec($ch);
            curl_close($ch);

            $result = json_decode($server_output, 1);
            if($result['status'] == 1 && $result['data']['refund_status'] == 0)
            {
                $status = 1;
                $transaction_status = "success";
            }
            else
            {
                $message = "Error Code: ".$result['data']['error_code']." Reason:".$result['data']['reason'];
                $transaction_status = "failed";
            }
        }
        else if($request->transaction_type == "Paytm")
        {

            $paytm_error_codes['328'] = __('Currency_not_same');
            $paytm_error_codes['501'] = __('System_error');
            $paytm_error_codes['600'] = __('Invalid_refund_request');
            $paytm_error_codes['606'] = __('Checksum_generated_by_Paytm_payment_gateway_does_not_match_checksum_expected_by_bank');
            $paytm_error_codes['607'] = __('Order_not_exist_for_current_request');
            $paytm_error_codes['609'] = __('Refund_initiated_for_a_rejected_transaction');
            $paytm_error_codes['612'] = __('This_is_a_valid_authorized_transaction');
            $paytm_error_codes['617'] = __('Refund_already_raised');
            $paytm_error_codes['619'] = __('Invalid_refund_amount');
            $paytm_error_codes['620'] = __('Refund_failed');
            $paytm_error_codes['622'] = __('No_token_transaction_limited');
            $paytm_error_codes['640'] = __('Order_is_frozen');
            $paytm_error_codes['700'] = __('Invalid_consult_request');
            $paytm_error_codes['701'] = __('Refund_already_raised_with_same_refid');
            $paytm_error_codes['702'] = __('Not_allowed_to_reprocess_refund_request');
            $paytm_error_codes['703'] = __('Refund_is_already_success_or_in_pending_state._Please_check_status_query_for_final_result');
            $paytm_error_codes['704'] = __('Balance_not_enough');

            $data = array();
            $data['ORDERID'] = $request->ORDERID;
            $data['REFID'] = $merchant_refund_id;
            $data['TXNID'] = $request->TXNID;
            $data['REFUNDAMOUNT'] = $request->REFUNDAMOUNT;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://printphoto.in/Photo_case/PaytmKit/refund.php');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            $server_output = curl_exec($ch);
            curl_close($ch);

            $result = json_decode($server_output, 1);

            $gateway_refund_id = (string)@$result['REFUNDID'];

            if($result['STATUS'] == 'TXN_SUCCESS' )
            {
                $transaction_status = "success";
            }
            else if($result['STATUS'] == 'TXN_FAILURE' )
            {
                $transaction_status = "failed";
                $message = "Response Code: ".$result['RESPCODE'].' - '.@$paytm_error_codes[$result['RESPCODE']];
            }
            else if($result['STATUS'] == 'PENDING')
            {
                $transaction_status = "pending";
                $message = "Response Code: ".$result['RESPCODE'].' - '.@$paytm_error_codes[$result['RESPCODE']];
            }
        }
        if($request->transaction_type == "Razorpay")
        {
            try
            {
                $merchant_refund_id = "";
                $api = new Api(env('RAZORPAY_API_KEY'), env('RAZORPAY_API_SECRET'));
                $refund = $api->refund->create(array('payment_id' => $request->paymentId, 'amount'=>$request->refundAmount * 100));
                $gateway_refund_id = $refund->id;
                $transaction_status = 'success';
            }
            catch(\Exception $e)
            {
                $transaction_status = "failed";
                $message = $e->getMessage();
            }
        }

        if($transaction_status != "")
        {
            $order_status = array();
            $order_status['order_id'] = $request->order_id;
            $order_status['merchant_refund_id'] = $merchant_refund_id;
            $order_status['gateway_refund_id'] = $gateway_refund_id;
            $order_status['transaction_status'] = $transaction_status;
            $order_status['transaction_status_checked_at'] = \Carbon\Carbon::now('UTC')->toDateTimeString();
            Refund::create($order_status);

            if($transaction_status == 'success')
            {
                $order_status = array();
                $order_status['order_id'] = $request->order_id;
                $order_status['order_item_id'] = 0;
                $order_status['status'] = "Order Refunded";
                $order_status['created_by'] = 0;
                $order_status['user_type'] = 0;
                CommonHelper::setOrderStatus($order_status);
            }
            elseif($transaction_status == 'failed')
            {
                $order_status = array();
                $order_status['order_id'] = $request->order_id;
                $order_status['order_item_id'] = 0;
                $order_status['status'] = "Refund Failed";
                $order_status['created_by'] = 0;
                $order_status['user_type'] = 0;
                CommonHelper::setOrderStatus($order_status);
            }
        }

        $out['transaction_status'] = $transaction_status;
        $out['message'] = $message;
        return $out;
    }

    public static function syncRefundStatus()
    {
        $refund_status =  "";

        $pending_refunds = Refund::with('order')->where('transaction_status','pending')->get();
        foreach($pending_refunds as $refund_record)
        {
            if($refund_record->order->transaction_type != 'Paytm')
            {
                continue;
            }

            $data = array();
            $data['ORDERID'] = $refund_record->order->transaction_id;
            $data['REFID'] = $refund_record->merchant_refund_id;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://printphoto.in/Photo_case/PaytmKit/refund_status.php');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
            $server_output = curl_exec($ch);
            curl_close($ch);

            $result = json_decode($server_output, 1);
            $paytm_status = "";
            if(isset($result['REFUND_LIST']))
            {
                foreach($result['REFUND_LIST'] as $refund)
                {
                    if($refund['REFID'] == $refund_record->merchant_refund_id)
                    {
                        $paytm_status = $refund['STATUS'];
                    }
                }
            }

            if($paytm_status == 'TXN_SUCCESS')
            {
                $refund_status = "success";
            }
            else if($paytm_status == 'TXN_FAILURE' )
            {
                $refund_status = "failed";
            }
            else if($result['STATUS'] == 'PENDING')
            {
                $refund_status = "failed";
            }

            if($refund_status != "")
            {
                if($refund_status == 'success')
                {
                    $refund_record->transaction_status = $refund_status;
                    $refund_record->transaction_status_checked_at = \Carbon\Carbon::now('UTC')->toDateTimeString();
                    $refund_record->save();

                    $order_status = array();
                    $order_status['order_id'] = $refund_record->order_id;
                    $order_status['order_item_id'] = 0;
                    $order_status['status'] = "Order Refunded";
                    $order_status['created_by'] = 0;
                    $order_status['user_type'] = 0;
                    CommonHelper::setOrderStatus($order_status);
                }
                elseif($refund_status == 'failed')
                {
                    $refund_record->transaction_status = $refund_status;
                    $refund_record->transaction_status_checked_at = \Carbon\Carbon::now('UTC')->toDateTimeString();
                    $refund_record->save();

                    $order_status = array();
                    $order_status['order_id'] = $refund_record->order_id;
                    $order_status['order_item_id'] = 0;
                    $order_status['status'] = "Refund Failed";
                    $order_status['created_by'] = 0;
                    $order_status['user_type'] = 0;
                    CommonHelper::setOrderStatus($order_status);
                }
            }
        }
        return 1;
    }


    public static function createOrderonRazorpay($type, $order_id, $wallet_amount)
    {
        $transaction_id = "";

        try {
            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                $order_amount = $order->final_total;
                $order_details['receipt'] = strval($order->id);
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet_recharge';
            }

            $api = new Api(Setting::get_value("razorpay_key"), Setting::get_value("razorpay_secret_key"));

            $currency_code = Setting::get_value('currency_code') ?? 'INR';
            $order_details = [
                'amount' => $order_amount * 100,
                'currency' => $currency_code,
                'payment_capture' => 1,
                'receipt' => $order_details['receipt'],
            ];

            $rpay_order = $api->order->create($order_details);

            $transaction_id = $rpay_order->id;

        } catch (\Exception $e) {
            \Log::error("Exception: " . $e->getMessage());
            \Log::error($e->getTraceAsString());
        }

        return $transaction_id;
    }

   public static function createOrderOnStripe($amount)
{
    $response = "";
    try {
        $stripeSettings = CommonHelper::getSettings(['stripe_payment_method']);
        $user = auth()->user(); // Ensure user is authenticated

        if ($stripeSettings['stripe_payment_method'] == 1 && $user) {
            try {
                if (!$user->stripe_id) {
                    $user->createOrGetStripeCustomer(); // Create customer if not exists
                }
            } catch (\Exception $e) {
                \Log::error("Stripe Customer Creation Error: " . $e->getMessage());
            }
        }

        // Save user only if needed
        if (!$user->stripe_id) {
            $user->save();
        }

        $stripe_secret_key = Setting::get_value('stripe_secret_key');
        $stripe_currency_code = Setting::get_value('stripe_currency_code');
        $app_name = Setting::get_value('app_name');

        $stripe = new \Stripe\StripeClient($stripe_secret_key);
        Log::info("Stripe Initialized", [$stripe]);

        $stripeAmount = (float)$amount * 100;

        $customerId = $user->stripe_id ?? null; // Ensure it's null if not set

        $paymentIntentData = [
            'description' => $app_name,
            'amount' => $stripeAmount,
            'currency' => $stripe_currency_code,
            'automatic_payment_methods' => ['enabled' => true],
        ];

        // Only include customer ID if it's valid
        if ($customerId) {
            $paymentIntentData['customer'] = $customerId;
        }

        $stripeData = $stripe->paymentIntents->create($paymentIntentData);
        $response = $stripeData;
    } catch (\Exception $e) {
        \Log::error("Stripe Payment Error: " . $e->getMessage());
        \Log::error($e->getTraceAsString());
    } finally {
        return $response;
    }
}


    public static function verifyRazorpaySignature($razorpay_order_id, $razorpay_payment_id, $razorpay_signature)
    {
        $generated_signature = hash_hmac('sha256',$razorpay_order_id."|".$razorpay_payment_id, Setting::get_value("razorpay_secret_key"));
        if ($generated_signature == $razorpay_signature)
        {
            return true;
        }
        return false;
    }

    public static function fetchRazorpayOrders($from,$to)
    {
        $api = new Api(env('RAZORPAY_API_KEY'), env('RAZORPAY_API_SECRET'));
        $skip = 0;
        $count = 100;
        $orders = array();

        do{
            $options = array(
                'count' => $count,
                'skip'  => $skip,
                'from'  => $from,
                'to' => $to
            );
            $result = $api->order->all($options);
            foreach($result->items as $order)
            {
                $orders[] = $order;
            }
            $has_next = $result->count < $count ? 0 : 1;
            $skip = $skip + $count;
        }
        while($has_next);

        return $orders;
    }

    public static function fetchRazorpayPayments($from,$to)
    {
        $api = new Api(env('RAZORPAY_API_KEY'), env('RAZORPAY_API_SECRET'));
        $skip = 0;
        $count = 100;
        $payments = array();

        do{
            $options = array(
                'count' => $count,
                'skip'  => $skip,
                'from'  => $from,
                'to' => $to
            );
            $result = $api->payment->all($options);
            foreach($result->items as $payment)
            {
                $payments[] = $payment;
            }
            $has_next = $result->count < $count ? 0 : 1;
            $skip = $skip + $count;
        }
        while($has_next);

        return $payments;
    }

    public static function setRazorpayPaymentFees($transaction_id)
    {
        $url = env('RAZORPAY_BASE_URL').'orders/'.$transaction_id.'/payments';

        $clientId = env('RAZORPAY_API_KEY');
        $secret = env('RAZORPAY_API_SECRET');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, $clientId . ":" . $secret);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        $server_output = curl_exec($ch);

        $result = json_decode($server_output,1);

        $fees = 0;

        if(isset($result['items'])){
            foreach ($result['items'] as $order){
                if($order['status'] == 'captured'){
                    $fees = $order['fee']/100;
                }
            }
        }

        $response = CommonHelper::set_payment_gateway_fees($transaction_id, $fees);
        return $response;
    }

    public static function setPaypalPaymentFees($transaction_id)
    {
        $paypalClient = new PaypalClient();
        $server_output = $paypalClient->getPayment($transaction_id);

        $result = json_decode($server_output, 1);
        $fees = 0;

        if(isset($result['transactions'][0]['related_resources'])){
            foreach ($result['transactions'][0]['related_resources'] as $transactions){
                if(isset($transactions['sale'])){
                    $fees = $transactions['sale']['transaction_fee']['value'];
                }
            }
        }

        $response = CommonHelper::set_payment_gateway_fees($transaction_id, $fees);
        return $response;
    }
    public static function createOrderonMidtrans($type, $order_id, $wallet_amount)
    {
        $snapUrl = "";
        $snapToken = "";
        $currentDateTime = Carbon::now()->format('YmdHis');
        try {
            if ($type == 'order') {
                $order = Order::with('items')->findOrFail($order_id);
                
                $order_amount = $order->final_total;
                $order_details['receipt'] = 'order-'.$order_id.'-'.auth()->user()->id;
            } else {
                $order_amount = $wallet_amount;
                $order_details['receipt'] = 'wallet-'.$currentDateTime.'-'.auth()->user()->id;
            }

            // Set Midtrans configuration
            Config::$serverKey = Setting::get_value('midtrans_server_key');
            Config::$isProduction = (Setting::get_value('midtrans_mode') == 'sandbox') ? false : true;
            // Prepare payment parameters
            $params = [
                'transaction_details' => [
                    'order_id' => $order_details['receipt'],
                    'gross_amount' =>(int) round($order->total), // amount in Rupiah
                ],
            ];

            // Get Snap payment page URL
            $snapResponse = Snap::createTransaction($params);
          
            // Extract Snap URL and token
            $snapUrl = $snapResponse->redirect_url;
            $snapToken = $snapResponse->token;

        } catch (\Exception $e) {
            \Log::error("Exception: " . $e->getMessage());
            \Log::error($e->getTraceAsString());
        }

        return [
            'snapUrl' => $snapUrl,
            'snapToken' => $snapToken,
        ];
    }
    public static function createOrderonPhonepe($type, $order_id, $wallet_amount)
{
    try {
        $currentDateTime = Carbon::now()->format('YmdHis');
        $userId = auth()->id();

        if ($type === 'order') {
            $order = Order::with('items')->findOrFail($order_id);
            $order_amount = $order->final_total;
            $receipt = 'order-' . $order_id . '-' . $userId;
        } else {
            $order_amount = $wallet_amount;
            $receipt = 'wallet-' . $currentDateTime . '-' . $userId;
        }

        // === Configuration ===
        $apiKey        = Setting::get_value('phonepay_api_key');
        $merchantId    = Setting::get_value('phonepay_merchant_id');
        $mode          = Setting::get_value('phonepay_mode'); // 'uat' or 'production'
        $clientId      = Setting::get_value('phonepay_client_id');
        $clientVersion = Setting::get_value('phonepay_client_version');
        $clientSecret  = Setting::get_value('phonepay_client_secret');
        $websiteUrl  = Setting::get_value('website_url');

        // === Dynamic URLs ===
        if ($mode === 'production') {
            $tokenUrl = 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token';
            $orderUrl = 'https://api.phonepe.com/apis/pg/checkout/v2/sdk/order';
            $payUrl = 'https://api.phonepe.com/apis/pg/checkout/v2/pay';
        } else {
            $tokenUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';
            $orderUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/sdk/order';
            $payUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';
        }

        $merchantTransactionId = substr('TXN' . time() . '-' . $receipt, 0, 40);

        // === Step 1: Get Access Token ===
        // $tokenCurl = curl_init();
        // curl_setopt_array($tokenCurl, [
        //     CURLOPT_URL => $tokenUrl,
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_POST => true,
        //     CURLOPT_POSTFIELDS => http_build_query([
        //         'client_id' => $clientId,
        //         'client_version' => $clientVersion,
        //         'client_secret' => $clientSecret,
        //         'grant_type' => 'client_credentials',
        //     ]),
        //     CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        // ]);

        // $tokenResponse = curl_exec($tokenCurl);
        // curl_close($tokenCurl);

        // $tokenData = json_decode($tokenResponse, true);
        // $accessToken = $tokenData['access_token'] ?? null;

        // if (!$accessToken) {
        //     throw new \Exception('Failed to fetch token from PhonePe API.');
        // }

        // // === Step 2: Create Order ===
        // $orderPayload = [
        //     "merchantTransactionId" => $merchantTransactionId,
        //     "merchantOrderId"       => $merchantTransactionId,
        //     "amount"                => round($order_amount * 100), // ₹ to paise
        //     "expireAfter"           => 1200,
        //     "metaInfo" => [
        //         "type" => $type,
        //         "order_id" => $order_id,
        //         "user_id" => $userId,
        //     ],
        //     "paymentFlow" => [
        //         "type" => "PG_CHECKOUT"
        //     ],
        //     "paymentMode" => [
        //         "type" => "PAY_PAGE"
        //     ]
        // ];

        // $orderCurl = curl_init();
        // curl_setopt_array($orderCurl, [
        //     CURLOPT_URL => $orderUrl,
        //     CURLOPT_RETURNTRANSFER => true,
        //     CURLOPT_POST => true,
        //     CURLOPT_POSTFIELDS => json_encode($orderPayload),
        //     CURLOPT_HTTPHEADER => [
        //         'Content-Type: application/json',
        //         'Authorization: O-Bearer ' . $accessToken,
        //     ],
        // ]);

        // $orderResponse = curl_exec($orderCurl);
        // curl_close($orderCurl);

        // if (!$orderResponse) {
        //     throw new \Exception('Failed to create order on PhonePe.');
        // }

        // $responseDecoded = json_decode($orderResponse, true);
        // $responseDecoded['paymentMode'] = ['type' => 'PAY_PAGE'];
        // $responseDecoded['merchantId'] = $merchantId;
        // $responseDecoded['merchantOrderId'] = $merchantTransactionId;
        // $responseDecoded['mode'] =  $mode;

        // return CommonHelper::responseWithData($responseDecoded);
        $tokenCurl = curl_init();

curl_setopt_array($tokenCurl, array(
    CURLOPT_URL =>$tokenUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => http_build_query([
         'client_id' => $clientId,
                'client_version' => $clientVersion,
                'client_secret' => $clientSecret,
                'grant_type' => 'client_credentials',
    ]),
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/x-www-form-urlencoded'
    ),
));

$response = curl_exec($tokenCurl);
curl_close($tokenCurl);

// Decode token response
$tokenResponse = json_decode($response, true);
$accessToken = $tokenResponse['access_token'] ?? null;

if (!$accessToken) {
    dd("Failed to retrieve token", $response);
}



// Build JSON payload properly
$paymentData = [
    'merchantOrderId' => $merchantTransactionId,
   'amount' => (int) round($order_amount * 100),
   "metaInfo" => [
                "type" => $type,
                "order_id" => $order_id,
                "user_id" => $userId,
            ],
    'paymentFlow' => [
        'type' => 'PG_CHECKOUT',
        'message' => 'Payment message used for collect requests',
        'merchantUrls' => [
            'redirectUrl' => $websiteUrl.'/web-payment-status?payment_method=phonepe',
        ],
    ],
];

$payCUrl = curl_init();

curl_setopt_array($payCUrl, array(
    CURLOPT_URL =>$payUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($paymentData),
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: O-Bearer ' . $accessToken,
    ),
));

$response = curl_exec($payCUrl);
curl_close($payCUrl);
$final_response = json_decode($response, true);
$final_response['merchantOrderId'] = $merchantTransactionId;
$final_response['token'] = $accessToken;
return CommonHelper::responseWithData($final_response);


    } catch (\Exception $e) {
        \Log::error('PhonePe Order Error: ' . $e->getMessage());
        return [
            'error' => true,
            'message' => $e->getMessage(),
        ];
    }
}


    public static function createOrderonCashfree($type, $order_id, $wallet_amount)
    {
        try {
        $currentDateTime = Carbon::now()->format('YmdHis');

        if ($type == 'order') {
            $order = Order::with('items')->findOrFail($order_id);
            $order_amount = $order->final_total;
            $order_details['receipt'] = 'order-' . $order_id . '-' . auth()->user()->id;
        } else {
            $order_amount = $wallet_amount;
            $order_details['receipt'] = 'wallet-' . $currentDateTime . '-' . auth()->user()->id;
        }
        $user = User::where('id', auth()->user()->id)->first();

         $cashfree_app_id = Setting::get_value('cashfree_app_id');
        $cashfree_secret_key = Setting::get_value('cashfree_secret_key');
        $cashfree_mode = Setting::get_value('cashfree_mode');
        $url = $cashfree_mode === 'production' ? 'https://api.phonepe.com/apis/pg/v1/pay' : 'https://sandbox.cashfree.com/pg/links';
        $client = new Client();
        $body = [
            'customer_details' => [
                'customer_email' => $user->email,
                'customer_name' => $user->name,
                'customer_phone' => $user->mobile,
            ],
            'link_amount' => $order_amount,
            'link_auto_reminders' => true,
            'link_currency' => Setting::get_value('currency_code') ?? 'INR',
            'link_expiry_time' => date('c', strtotime('+1 day')), // Example: 1 day from now
            'link_id' => $order_details['receipt'],
            'link_meta' => [
                //'notify_url' => route('cashfree.callback'),
                'return_url' => route('cashfree.redirect', ['order' => $order_details['receipt']]),
                'upi_intent' => false
            ],
           // 'link_minimum_partial_amount' => 20,
            'link_notes' => [
                'type' => $type,
            ],
            'link_notify' => [
                'send_email' => true,
                'send_sms' => false
            ],
            //'link_partial_payments' => true,
            'link_purpose' => 'Payment',
           
        ];

      
            $response = $client->post('https://sandbox.cashfree.com/pg/links', [
                'headers' => [
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                    'x-api-version' => '2023-08-01',
                     'x-client-id' => $cashfree_app_id,
                    'x-client-secret' => $cashfree_secret_key,
                ],
                'json' => $body,
            ]);
           
            $responseBody = json_decode($response->getBody(), true);
           // dd($responseBody);
           if ($responseBody['link_status'] == 'ACTIVE') {
                return [
                    'redirectUrl' => $responseBody['link_url'],
                ];
            } else {
                throw new \Exception('Cashfree API error: ' . json_encode($rData));
            }
           
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            \Log::error('Error in createOrderonCashfree: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }
        public static function createOrderonPayTabs($type, $order_id, $wallet_amount)
{
    try {
        $currentDateTime = Carbon::now()->format('YmdHis');

        if ($type == 'order') {
            $order = Order::with('items')->findOrFail($order_id);
            $order_amount = $order->final_total;
            $order_details['receipt'] = 'order-' . $order_id . '-' . auth()->user()->id;
        } else {
            $order_amount = $wallet_amount;
            $order_details['receipt'] = 'wallet-' . $currentDateTime . '-' . auth()->user()->id;
        }
        
        $user = User::where('id', auth()->user()->id)->first();

        $paytabs_profile_id = Setting::get_value('paytabs_profile_id');
        $paytabs_secret_key = Setting::get_value('paytabs_secret_key');
        $paytabs_mode = Setting::get_value('paytabs_mode');
        $url = $paytabs_mode === 'production' ? 'https://www.paytabs.com/apiv2/create_pay_page' : 'https://secure-global.paytabs.com/payment/request';

$response = Http::withHeaders([
    'authorization' => $paytabs_secret_key,
    'content-type' => 'application/json'
])->post($url, [
    'profile_id' => $paytabs_profile_id,
    'tran_type' => 'sale',
    'tran_class' => 'ecom',
    'cart_id' => $order_details['receipt'],
    'cart_description' => 'Paytabs',
    'cart_currency' => 'INR',
    'cart_amount' =>$order_amount,
    'callback' => route('paytabs.callback'),
    'return' =>  route('paytabs.redirect', ['order' => $order_details['receipt']]),
    'hide_shipping' => true,
     'hide_billing' => true
]);

if ($response->successful()) {
   // dd( $response->json() );
    $data = $response->json();
    return [
        'redirectUrl' => $data['redirect_url'],
    ];
    // Handle successful response
} else {
    
    $error = $response->json();  // To see error details returned by PayTabs
    //dd($error);  // Dump the error to check the response
}
    } catch (\Exception $e) {
        // Log the error or handle it as needed
        \Log::error('Error in createOrderonPayTabs: ' . $e->getMessage());
        return [
            'error' => true,
            'message' => $e->getMessage(),
        ];
    }
}
    
}

