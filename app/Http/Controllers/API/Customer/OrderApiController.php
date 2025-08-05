<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Helpers\ProductHelper;
use App\Helpers\Paypal;
use App\Helpers\PaypalClient;
use App\Helpers\Paystack;
use App\Helpers\Paytm;
use App\Helpers\TransactionHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\AppUsage;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use App\Models\OrderStatus;
use App\Models\OrderStatusList;
use App\Models\ProductVariant;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use App\Models\Unit;
use App\Models\User;
use App\Models\LiveTracking;
use App\Models\PromoCode;
use App\Models\ReturnRequest;
use App\Notifications\OrderNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Mpdf\Mpdf;
use Mpdf\Output\Destination;
use Response;
use Illuminate\Validation\Rule;
use App\Jobs\SendEmailJob;

class OrderApiController extends Controller
{
    public function placeOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total' => 'required',
            'delivery_charge' => 'required',
            'delivery_time' => 'required',
            'final_total' => 'required',
            'payment_method' => 'required',
            'address_id' => 'required',
            'quantity' => 'required'
        ], [
            'required' => 'The :attribute field is required.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $user = auth()->user();
        if (!isset($user->status) || $user->status == 0) {
            return CommonHelper::responseError(__('not_allowed_to_place_order_as_your_account_is_de_activated'));
        }
        $one_seller_cart = Setting::where('variable', 'one_seller_cart')->exists() ? (int) Setting::where('variable', 'one_seller_cart')->value('value') : 0;
        $cartItems = Cart::select('carts.*', 'products.seller_id', 'products.name as product_name', 'sellers.name as seller_name','sellers.status as seller_status')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('carts.save_for_later', '=', 0)
            ->where('user_id', '=', $user->id)
            ->get();
        if ($one_seller_cart == 1 && !$cartItems->isEmpty()) {
            $firstSeller = $cartItems->first()->seller_id;
            $allSameSeller = $cartItems->every(function ($item) use ($firstSeller) {
                return $item->seller_id === $firstSeller;
            });
    
            if (!$allSameSeller) {
                $data['one_seller_error_code'] = 1;
                return CommonHelper::responseErrorWithData(__('all_cart_products_have_not_same_seller'), $data);
            }
        }
        $deactivatedSellers = $cartItems->filter(function ($item) {
            return $item->seller_status != 1;
        });
        if ($deactivatedSellers->isNotEmpty()) {
            foreach ($deactivatedSellers as $item) {
                
                $message =  "is_from_disabled_seller";
                return CommonHelper::responseErrorWithData($message, $item->product_name);
            }
        }
        /* getting user address data */
        $address_id = $request->address_id;
        $user_address = CommonHelper::getUserAddress($request->address_id);
        if (!empty($user_address)) {
            $address = $user_address->address.' '.$user_address->landmark.' '.$user_address->area.' '.$user_address->city.' '.$user_address->state.' '.$user_address->country.'-'.$user_address->pincode.' '.$user_address->name.' '.$user_address->mobile.'/'.$user_address->alternate_mobile;
            $mobile = $user_address->mobile;
            $latitude = $user_address->latitude;
            $longitude = $user_address->longitude;
            $pincode_id = $user_address->pincode_id;
            $area_id = $user_address->area_id ?? 0;
        } else {
            return CommonHelper::responseError(__('something_is_missing_in_your_address'));
        }

        $user_id = auth()->user()->id;
        $order_note = (isset($request->order_note) && !empty($request->order_note)) ? $request->order_note : "";
        $wallet_used = (isset($request->wallet_used) && !empty($request->wallet_used) == 'true') ? 'true' : 'false';
        $items = $request->product_variant_id;

        $total = floatval($request->total);
        $delivery_charge = floatval($request->delivery_charge);
        $final_total = floatval($request->final_total);

        $promo_code = "";
        $promo_discount = 0;
        $promo_code_id = 0;

        if (isset($request->promocode_id) && $request->promocode_id && $request->promocode_id != "") {

            $code = PromoCode::find($request->promocode_id);

            if (empty($code)) {
                return CommonHelper::responseError("Promo code not found!");
            }
            $promo = CommonHelper::validatePromoCode($user_id, $code->promo_code, $total);
           
            if ($promo['is_applicable'] == 0) {
                return CommonHelper::responseError($promo['message']);
            }

            if (isset($promo['promo_code_id']) && $request->promocode_id == $promo['promo_code_id']) {
               // $final_total = $promo['discounted_amount'] + $delivery_charge;
                $promo_discount = $promo['discount'];
                $promo_code = $promo['promo_code'] . "(" . $promo['discount'] . ")";
                $promo_code_id = $promo['promo_code_id'];
            }
        }

        $wallet_balance = (isset($request->wallet_balance) && is_numeric($request->wallet_balance)) ? $request->wallet_balance : 0;
        $formatted_wallet_balance = number_format($wallet_balance, 2);
        $payment_method = $request->payment_method;
        $delivery_time = (isset($request->delivery_time)) ? $request->delivery_time : "";

        $active_status = $payment_method == Transaction::$paymentTypeCod ? OrderStatusList::$received : OrderStatusList::$paymentPending;
        if ($payment_method == 'Wallet') {
            $active_status = OrderStatusList::$received;
        }
        $order_from = (isset($request->order_from) && !empty($request->order_from)) ? $request->order_from : 0;

        $status[] = array($active_status, date("d-m-Y h:i:sa"));
        
        $quantity = $request->quantity;

        $quantity_arr = explode(",", $quantity);
        $item_arr = explode(",", $items);


        foreach ($item_arr as $key => $item) {
            $variant = ProductVariant::where("id", $item)->first();
        
            // Check if the variant exists
            if (empty($variant)) {
                return CommonHelper::responseError(__('found_one_or_more_items_in_order_is_not_available_for_order'));
            }
        
            // Ensure the requested quantity is correctly retrieved
            $requested_qty = $quantity_arr[$key] ?? 1; // Default to 1 if missing
        
            // Check stock availability 
            if (!ProductHelper::isItemAvailableWithStock(null, $item, $requested_qty)) {
                return CommonHelper::responseError(__("Low stock: Only {$variant->stock} available for {$variant->product->name}"));
            }
        }

        $item_details = CommonHelper::getProductByVariantId($item_arr);


        $totalTax = CommonHelper::calculateOrderTotalTax($item_details, $quantity_arr);
        $order_total_tax_amt = $totalTax['order_total_tax_amt'];
        $order_total_tax_per = $totalTax['order_total_tax_per'];

        $generate_otp = Setting::get_value("generate_otp");
        if ($generate_otp == 1) {
            $otp_number = mt_rand(100000, 999999);
        } else {
            $otp_number = 0;
        }

        /* check for wallet balance */
        if ($wallet_used == 'true') {
            $user_wallet_balance = auth()->user()->balance;
            if ($user_wallet_balance < $wallet_balance) {
                return CommonHelper::responseError(__('insufficient_wallet_balance'));
            }
        }

        /* check for minimum order amount */
        $min_order_amount = Setting::get_value("min_order_amount");
        if ($wallet_used == 'true') {
            $user_wallet_balance = auth()->user()->balance;
            if ($user_wallet_balance + $final_total < $min_order_amount) {
                return CommonHelper::responseError("Minimum order amount is " . $min_order_amount . ".");
            }
        }
        else{
            if ($final_total < $min_order_amount) {
                return CommonHelper::responseError("Minimum order amount is " . $min_order_amount . ".");
            }
        }

        $walletvalue = ($wallet_used) ? $wallet_balance : 0;
        $order_status = json_encode($status);


        /* check whether points are in delivarable area or not */
        $seller_ids = array_values(array_unique(array_column($item_details->toArray(), "seller_id")));
        if (!CommonHelper::isDeliverableOrder($address_id, $latitude, $longitude, $seller_ids[0]) && !isDemoMode()) {
            return CommonHelper::responseError(__('sorry_we_are_not_delivering_on_selected_address'));
        }


        /* insert data into order table */
        $orders_id = CommonHelper::generateOrderId();

        DB::beginTransaction();
        try {

            $order = new Order();
            $order->user_id = $user_id;
            $order->delivery_boy_id = 0;
            $order->transaction_id = 0;
            $order->orders_id = $orders_id;
            $order->otp = $otp_number;
            $order->mobile = $mobile;
            $order->order_note = $order_note;
            $order->total = $total;
            $order->delivery_charge = $delivery_charge;
            $order->tax_amount = $order_total_tax_amt;
            $order->tax_percentage = $order_total_tax_per;
            $order->wallet_balance = $walletvalue;
            $order->promo_code_id = $promo_code_id;
            $order->promo_code = $promo_code;
            $order->promo_discount = $promo_discount;

            $order->final_total = $final_total;
            $order->payment_method = $payment_method;
            $order->address = $address;
            $order->latitude = $latitude;
            $order->longitude = $longitude;
            $order->delivery_time = $delivery_time;
            $order->status = $order_status;
            $order->active_status = $active_status;
            $order->order_from = $order_from;
            $order->pincode_id = $pincode_id;
            $order->area_id = $area_id;
            $order->address_id = $address_id;
            $order->save();

            $order_id = $order->id;
            if ($order_id == "") {
                return CommonHelper::responseError(__('order_can_not_place_due_to_some_reason_try_again_after_some_time'));
            }

          

            /* process wallet balance */
            $user_wallet_balance = $user->balance;
            

            /* process each product in order from variants of products */
            foreach ($item_details as $key => $item) {
                $product_id = $item->product_id;
                $product_name = $item->product_name;
                $measurement = $item->measurement;
                $variant_name = $measurement . ' ' .$item->stock_unit_name;
                $product_variant_id = $item->id;
                $stock_unit_id = $item->stock_unit_id;
                $price = $item->price;
                $discounted_price = (empty($item->discounted_price) || $item->discounted_price == "") ? 0 : $item->discounted_price;
                $is_unlimited_stock = $item->is_unlimited_stock;
                $type = $item->product_type;

                $total_stock = $item->stock;
                $quantity = $quantity_arr[$key];
                $tax_title = $item->tax_title;
                $seller_id = (!empty($item->seller_id)) ? $item->seller_id : "";
                $tax_percentage = (empty($item->tax_percentage) || $item->tax_percentage == "") ? 0 : $item->tax_percentage;
                $tax_amt = $discounted_price != 0 ? (($tax_percentage / 100) * $discounted_price) : (($tax_percentage / 100) * $price);
                $sub_total = $discounted_price != 0 ? ($discounted_price + ($tax_percentage / 100) * $discounted_price) * $quantity : ($price + ($tax_percentage / 100) * $price) * $quantity;

                $neworder_id = $order_id;
                $tax_amount = $tax_amt;
                $order_sub_total = $sub_total;
                $order_item_status = json_encode($status);

                $order_item = new OrderItem();
                $order_item->user_id = $user_id;
                $order_item->order_id = $neworder_id;

                $order_item->orders_id = $orders_id;

                $order_item->product_name = $product_name;
                $order_item->variant_name = $variant_name;
                $order_item->product_variant_id = $product_variant_id;
                $order_item->quantity = $quantity;

                $order_item->price = $price;
                $order_item->discounted_price = $discounted_price;

                $order_item->tax_amount = $tax_amount;
                $order_item->tax_percentage = $tax_percentage;
                $order_item->sub_total = $order_sub_total;
                $order_item->status = $order_item_status;
                $order_item->active_status = $active_status;
                $order_item->seller_id = $seller_id;
                $order_item->save();
                
                /* here $is_unlimited_stock  0 = Limited and 1 = Unlimited */
                if ($is_unlimited_stock != 1) {
                    $product_variant = ProductVariant::where("id", $product_variant_id)->first();
                    if ($type == 'packet') {
                        $stock = $total_stock - $quantity;

                       
                        $product_variant->stock = $stock;
                        $product_variant->save();
                        if ($product_variant->stock <= 0) {
                            $product_variant->status = 0; // here status 0 => "Sold Out" & 1 => "Available"
                            $product_variant->save();
                        }

                    } elseif ($type == 'loose') {
                        
                        $stock = max(0, $total_stock - ($measurement * $quantity));
            
            // Update main product variant stock
            $product_variant->stock = $stock;
            if ($stock <= 0) {
                $product_variant->status = 0; // 0 => "Sold Out"
            }
            $product_variant->save();
            ProductVariant::where("product_id", $product_id)
            ->where("stock_unit_id", $stock_unit_id) // Only same unit type
            ->where("id", '!=', $product_variant_id) // Exclude current variant
            ->update([
                'stock' => $stock,
                'status' => $stock <= 0 ? 0 : 1 // 0 => "Sold Out", 1 => "Available"
            ]);

                    }
                }
            }
            

            if ($wallet_used == 'true') {
                /* deduct the balance & set the wallet transaction */
                $new_balance = $user_wallet_balance < $wallet_balance ? 0 : $user_wallet_balance - $wallet_balance;
                CommonHelper::updateUserWalletBalance($new_balance, $user_id);
                CommonHelper::addWalletTransaction($order_id, 0, $user_id, 'debit', $wallet_balance, 'Used against Order Placement');
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
            return CommonHelper::responseError(__('could_not_place_order_try_again'));
        }
        if(!empty($order)){
            try {
                dispatch(function () use ($order) {
                      CommonHelper::sendNotificationOrderStatus($order);
                      $admins = Admin::get();
                      foreach ($admins as $admin) {
                      $admin->notify(new OrderNotification($order->id, 'new_order'));
                      }
                  })->afterResponse();
            } catch (\Exception $e) {
                Log::error("Place orderNotification error :",[$e->getMessage()] );
            }
            try {
               
                 Log::info("Place order send mail :",[$order] );
                dispatch(new SendEmailJob($order))->afterResponse();
            }catch ( \Exception $e){
                Log::error("Place order Send mail error :",[$e->getMessage()] );
            }

            //Place Order Send SMS
            try {
                CommonHelper::sendSmsOrderStatus($order, $order->active_status);
            }catch ( \Exception $e){
                Log::error("Place order SMS error :",[$e->getMessage()] );
            }

        }
   

        if ($payment_method == Transaction::$paymentTypeCod) {
            $order_status = array();
            $order_status['order_id'] = $order->id;
            $order_status['order_item_id'] = 0;
            $order_status['status'] = OrderStatusList::$received;
            $order_status['created_by'] = $user_id;
            $order_status['user_type'] = OrderStatus::$userTypeUser;
            CommonHelper::setOrderStatus($order_status);
            return CommonHelper::responseSuccess(__('order_placed_successfully'));
          
        } else {
            return CommonHelper::responseWithData(['order_id' => $order->id]);
        }

    }

    public function deletePaymentPendingOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $order = Order::find($request->order_id);
        $user = auth()->user();
        $user_wallet_balance = $user->balance;

        if (empty($order)) {
            return CommonHelper::responseError("Order Not found!");
        }

        if ($order->active_status != OrderStatusList::$paymentPending) {
            $statusName = OrderStatusList::where('id', $order->active_status)->value('status');
            return CommonHelper::responseError("Now you order status is " . $statusName);
           
        }

        DB::beginTransaction();
        try {
                // Retrieve the order items before deletion
                $orderItems = OrderItem::where('order_id', $request->order_id)->get();
            
                // Delete the order items
                OrderItem::where('order_id', $request->order_id)->delete();
            
                // Loop through each order item and update the stock of the corresponding product variant
                foreach ($orderItems as $item) {
                    $productVariant = ProductVariant::find($item->product_variant_id);
            
                    if ($productVariant) {
                        // Assuming you are adding the quantity back to stock
                        $productVariant->stock += $item->quantity;
                        $productVariant->status = 1; 
                        $productVariant->save();
                    }
                }
                $order->delete();
            

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info("Error : " . $e->getMessage());
            throw $e;
            return CommonHelper::responseError("Something Went Wrong!");
        }
        return CommonHelper::responseSuccess("Order deleted successfully");
    }

    public function orderTest(Request $request)
    {
        $result = CommonHelper::findGoogleMapDistanceLocal(23.24114205388701, 69.66720847135304, 23.235700208395272, 69.7287490771754);
        return CommonHelper::responseWithData($result);
    }

    public function initiateTransaction(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'payment_method' => 'required',
            'type' => 'required',
            'order_id' => 'required_if:type,order',
            'wallet_amount' => 'required_if:type,wallet',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if($request->type == 'order'){
            $order = Order::with('user')->where('id', $request->order_id)
                ->first();
            if (!$order) {
                return CommonHelper::responseError("Order not found!");
            }
        }

        $out['payment_method'] = $request->payment_method;
      
        $transaction_id = "";

        if ($request->payment_method == "Razorpay") { 

            \Log::error("payment_method = " . $request->payment_method);

            $transaction_id = TransactionHelper::createOrderonRazorpay($request->type, $request->order_id ?? 0, $request->wallet_amount ?? 0);
            if ($transaction_id == "") {
                return CommonHelper::responseError("Error while communicating with razorpay server");
            }
        } else if ($request->payment_method == "Paypal") {

            $user_id = auth()->user()->id;
            if($request->type == 'order'){
                $order_id = $request->order_id;
            $order = Order::where('id', $order_id)->first();

            if (!empty($order)) {
                if($request->request_from == 'website'){
                    $out['paypal_redirect_url'] = url('customer/paypal_payment_url?user_id=' . $user_id . '&order_id=' . $order_id. '&type=order&request_from=website');
                }else{
                    $out['paypal_redirect_url'] = url('customer/paypal_payment_url?user_id=' . $user_id . '&order_id=' . $order_id. '&type=order');
                }
            }
            }elseif($request->type == 'wallet'){
                if($request->request_from == 'website'){
                    $out['paypal_redirect_url'] = url('customer/paypal_payment_url?user_id=' . $user_id . '&wallet_amount=' . $request->wallet_amount. '&type=wallet&request_from=website');
                }else{
                    $out['paypal_redirect_url'] = url('customer/paypal_payment_url?user_id=' . $user_id . '&wallet_amount=' . $request->wallet_amount. '&type=wallet');
                }
            }
            

        } else if ($request->payment_method == "Stripe") {

            \Log::error("payment_method = " . $request->payment_method);

            if($request->type == 'order'){
                $order_id = $request->order_id;
            $order = Order::where('id', $order_id)->first();

            if (!empty($order)) {
                $response = TransactionHelper::createOrderOnStripe($order->final_total); 
            }
            }elseif($request->type == 'wallet'){
                $response = TransactionHelper::createOrderOnStripe($request->wallet_amount); 
               
            }

            if ($response == "") {
                return CommonHelper::responseError("Error while communicating with Stripe server");
            }
            $out = $response->toArray();
           
        } else  if ($request->payment_method == "Midtrans") {
            $midtrans_redirect_url = TransactionHelper::createOrderonMidtrans($request->type, $request->order_id ?? 0, $request->wallet_amount ?? 0);
            if ($midtrans_redirect_url == "") {
                return CommonHelper::responseError("Error while communicating with Midtrans server");
            }
           

            // Return the URL for redirection
            return CommonHelper::responseWithData($midtrans_redirect_url);
        } else  if ($request->payment_method == "Phonepe") {
            $phonepay_data = TransactionHelper::createOrderonPhonepe($request->type, $request->order_id ?? 0, $request->wallet_amount ?? 0);
            if ($phonepay_data == "") {
                return CommonHelper::responseError("Error while communicating with Phonepe server");
            }
            // Return the URL for redirection
            return $phonepay_data;
        } else  if ($request->payment_method == "Cashfree") {
            $cashfree_redirect_url = TransactionHelper::createOrderonCashfree($request->type, $request->order_id ?? 0, $request->wallet_amount ?? 0);
            if ($cashfree_redirect_url == "") {
                return CommonHelper::responseError("Error while communicating with Cashfree server");
            }
            // Return the URL for redirection
            return CommonHelper::responseWithData($cashfree_redirect_url);
        }else  if ($request->payment_method == "Paytabs") {
            $paytabs_redirect_url = TransactionHelper::createOrderonPaytabs($request->type, $request->order_id ?? 0, $request->wallet_amount ?? 0);
           
            if ($paytabs_redirect_url == "") {
                return CommonHelper::responseError("Error while communicating with Paytabs server");
            }
            // Return the URL for redirection
            return CommonHelper::responseWithData($paytabs_redirect_url);
        }else {
            return CommonHelper::responseError("Invalid payment methods.");
            
        }
        if($request->type == 'order'){
        $order->payment_method = $request->payment_method;
        $order->save();
        }

        if ($transaction_id != "") {
            $out['transaction_id'] = $transaction_id;
        }
        return CommonHelper::responseWithData($out);
    }

    /*Paypal Start*/
    public function paypalPaymentUrl(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'type' => 'required',
            'order_id' => 'required_if:type,order',
            'wallet_amount' => 'required_if:type,wallet',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $app_name = Setting::get_value('app_name');
        $user = User::where('id', $request->user_id)->first();
        if ($request->type == 'order') {
            $order = Order::where('id', $request->order_id)->first();
            $order_amount = $order->final_total;
            $order_id = $order->id;
        } elseif($request->type == 'wallet') {
            $order_amount = $request->wallet_amount;
            $order_id = 'wallet_recharge-'.$user->id;
        }

        if ($order_amount) {

            header("Content-Type: html");

            $data['user'] = $user;
          
            $data['payment_type'] = "paypal";
           
            $websiteUrl = Setting::where('variable', 'website_url')->value('value');
            $websiteUrl = trim($websiteUrl, '/'); 
            $returnURL = $request->request_from == 'website' ? url($websiteUrl .'/web-payment-status?amount='.$order_amount.'&status=pending&type=wallet') : url('customer/paypal_redirect/pending');
            if ($request->type == 'order') {
                if($request->request_from == 'website'){
                    $returnURL = url($websiteUrl .'/web-payment-status?amount='.$order_amount.'&status=pending&type=order&order_id='.$order_id);
                }else{
                    $returnURL = url('customer/paypal_redirect/pending');
                }
            }
            elseif($request->type == 'wallet'){
                if($request->request_from == 'website'){
                    $returnURL = url($websiteUrl .'/web-payment-status?amount='.$order_amount.'&status=pending&type=wallet');
                }else{
                    $returnURL = url('customer/paypal_redirect/pending');
                }
            }
            //$returnURL = url('customer/paypal_redirect/pending') ;
            $cancelURL = url('customer/paypal_redirect/fail');
            $pendingURL = url('customer/paypal_redirect/pending');
            $notifyURL = url('customer/ipn');
            $txn_id = time() . "-" . rand();
            // Get current user ID from the session
            $userID = $data['user']['id'];
            //$order_id = $order_id;
            $payeremail = $data['user']['email']; 
            // $userID = $data['user']->id;

            $paypal = new Paypal();
            // Add fields to paypal form
            $paypal->add_field('return', $returnURL);
            $paypal->add_field('pending', $pendingURL);
            $paypal->add_field('cancel_return', $cancelURL);
            $paypal->add_field('notify_url', $notifyURL);
            $paypal->add_field('item_name', $app_name);
            $paypal->add_field('custom', $userID . '|' . $payeremail);
            $paypal->add_field('item_number', $order_id);
            $paypal->add_field('amount', $order_amount);

            // Render paypal form
            $paypal->paypal_auto_form();
        }

    }

    public function paypalRedirect(Request $request)
    {
        $paypalInfo = $request->all();
        $website_url = config('app.website_url'); 
       
        Log::info("paypalRedirect : ", [$paypalInfo]);
        $order_status = Transaction::$statusFailed;
        if (!empty($paypalInfo) && isset($paypalInfo['payment_status']) && strtolower($paypalInfo['payment_status']) == "completed") {
            $response['error'] = false;
            $response['message'] = "Payment Completed Successfully";
            $response['data'] = $paypalInfo;
            $order_status = Transaction::$statusSuccess;
          
        } elseif (!empty($paypalInfo) && isset($paypalInfo['payment_status']) && strtolower($paypalInfo['payment_status']) == "authorized") {
            $response['error'] = false;
            $response['message'] = "Your payment is has been Authorized successfully. We will capture your transaction within 30 minutes, once we process your order. After successful capture coins wil be credited automatically.";
            $response['data'] = $paypalInfo;
            $order_status = Transaction::$statusSuccess;
          
        } elseif (!empty($paypalInfo) && isset($paypalInfo['payment_status']) && strtolower($paypalInfo['payment_status']) == "pending") {
            $response['error'] = false;
            $response['message'] = "Your payment is pending and is under process. We will notify you once the status is updated.";
            $response['data'] = $paypalInfo;
           
        } else {
            $response['error'] = true;
            $response['message'] = "Payment Cancelled / Declined ";
            $response['data'] = (isset($paypalInfo)) ? $paypalInfo : "";
           
        }

        echo "<html>
        <body>
        Redirecting...!
        </body>
        <script>
            //const parentOrigin = window.opener.location.origin;
            const parentOrigin = '" . $website_url . "';
            console.log('Parent origin:', parentOrigin);
            console.log('started')
            window.addEventListener('load', function(){
            console.log('loaded')
            window.opener.postMessage('" . $order_status . "',parentOrigin);
            window.close();
            });
        </script>
        </html>";
    }

    public function ipn(Request $request)
    {
        $paypalInfo = $request->all();
        Log::info("Paypal IPN : ", [$paypalInfo]);

        if (!empty($paypalInfo)) {
            // Validate and get the ipn response
            $paypal = new Paypal();
            $ipnCheck = $paypal->validate_ipn($paypalInfo);
            // Check whether the transaction is valid
            if ($ipnCheck) {

                $userData = explode('|', $paypalInfo['custom']);

                //for react app
                if (is_null($paypalInfo["item_number"]) && isset($userData[2])) {
                    $paypalInfo["item_number"] = $userData[2];
                }

                $order_id = $paypalInfo["item_number"];
                /* if its not numeric then it is for the wallet recharge */
                if (
                    $paypalInfo["payment_status"] == 'Completed' &&
                    !is_numeric($order_id) && strpos($order_id, "wallet_recharge") !== false
                ) {
                    $temp = explode("-", $order_id); /* Order ID format for wallet recharge >> wallet_recharge-{user_id}  */
                    if (isset($temp[1]) && is_numeric($temp[1]) && !empty($temp[1] && $temp[1] != '')) {
                        $user_id = $temp[1];
                    } else {
                        $user_id = 0;
                    }
                    $amount = $paypalInfo["mc_gross"];
                    /* IPN for user wallet recharge */
                 
                    $data['payment_type'] = "Paypal";
                    $data['user_id'] = $user_id;
                    $data['order_id'] = $order_id;
                    $data['type'] = "credit";
                    $data['txn_id'] = $paypalInfo["txn_id"];
                    $data['payu_txn_id'] = "";
                    $data['amount'] = $amount;
                    $data['status'] = Transaction::$statusSuccess;
                    $data['message'] = "Wallet successfully recharged.";
                    $data['transaction_date'] = date('Y-m-d H:i:s');
                    $wallet_transaction = WalletTransaction::create($data);
                 
                if ($data['status'] == WalletTransaction::$statusSuccess) {
                    $newBalance = CommonHelper::addUserWalletBalance($amount,$user_id);
                    $data['user_balance'] = $newBalance;
                    return CommonHelper::responseSuccessWithData("Amount Added in Wallet Successfully",$data);
                } else {
                    return CommonHelper::responseError("Transaction Failed, Please try again!");
                }

                    
                } else {
                    /* IPN for normal Order  */
                    // Insert the transaction data in the database
                    $userData = explode('|', $paypalInfo['custom']);


                    $data['transaction_type'] = 'Transaction';
                    $data['user_id'] = $userData[0];
                    $data['order_id'] = $paypalInfo["item_number"];
                    $data['type'] = 'paypal';
                    $data['txn_id'] = $paypalInfo["txn_id"];
                    $data['payu_txn_id'] = "";
                    $data['amount'] = $paypalInfo["mc_gross"];
                    $data['status'] = Transaction::$statusSuccess;
                    $data['message'] = 'Payment Verified';
                    $data['transaction_date'] = date('Y-m-d H:i:s');

                    $order = Order::where('id', $data['order_id'])->first();
                    if ($paypalInfo["payment_status"] == 'Completed') {

                        $transaction = Transaction::create($data);
                        //Mark payment received
                        $order->active_status = OrderStatusList::$received;
                        $order->transaction_id = $transaction->id ?? 0;
                        $order->save();

                        //CommonHelper::addSellerWiseOrder($order->id);

                    } else if (
                        $paypalInfo["payment_status"] == 'Expired' || $paypalInfo["payment_status"] == 'Failed'
                        || $paypalInfo["payment_status"] == 'Refunded' || $paypalInfo["payment_status"] == 'Reversed'
                    ) {
                        /* if transaction wasn't completed successfully then cancel the order and transaction */
                        $data['transaction_type'] = 'Transaction';
                        $data['user_id'] = $userData[0];
                        $data['order_id'] = $paypalInfo["item_number"];
                        $data['type'] = 'paypal';
                        $data['txn_id'] = $paypalInfo["txn_id"];
                        $data['payu_txn_id'] = "";
                        $data['amount'] = $paypalInfo["mc_gross"];
                        $data['currency_code'] = $paypalInfo["mc_currency"];
                        $data['status'] = $paypalInfo["payment_status"];
                        $data['message'] = 'Payment could not be completed due to one or more reasons!';
                        $data['transaction_date'] = date('Y-m-d H:i:s');

                        $transaction = Transaction::create($data);
                        //Mark payment received
                        $order->active_status = OrderStatusList::$cancelled;
                        $order->transaction_id = $transaction->id ?? 0;
                        $order->save();

                        //CommonHelper::addSellerWiseOrder($order->id);
                    }
                }
            }
        }
    }
    /*Paypal End*/

    public function addTransaction(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'order_id' => 'required_if:type,order',
            'wallet_amount' => 'required_if:type,wallet',
            'device_type' => 'required',
            'app_version' => 'required',
            'payment_method' => 'required',
            'transaction_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $user = auth()->user();
        if($request->type == 'order'){
            $order = Order::withTrashed()->where('id', $request->order_id)->first();
            if (!$order) {
                return CommonHelper::responseError("Invalid Order Id");
            }
        }

        // Save Device details
        if ($request->device_type) {
            $app_usage = array();
            $app_usage['order_id'] = $order->id ?? 'wallet';
            $app_usage['device_type'] = $request->device_type;
            $app_usage['app_version'] = $request->app_version;
            AppUsage::create($app_usage);
        }

        $status = Transaction::$statusFailed;
       
        $txn_id = $request->transaction_id;
      
        if (
            isset($request->payment_method) && in_array(
                $request->payment_method,
                array(
                    Transaction::$paymentTypeRazorpay,
                    Transaction::$paymentTypePaystack,
                    Transaction::$paymentTypeStripe,
                    Transaction::$paymentTypePaytm,
                    Transaction::$paymentTypeMidtrans
                )
            )
        ) {


            if ($request->payment_method == Transaction::$paymentTypeRazorpay) {
                $signatureIsVaid = TransactionHelper::verifyRazorpaySignature(
                    $request->razorpay_order_id,
                    $request->razorpay_payment_id,
                    $request->razorpay_signature
                );
               
                if (!$signatureIsVaid) {
                    $status = Transaction::$statusSuccess;
                }

            } else if ($request->payment_method == Transaction::$paymentTypePaystack) {

                $paystack = new Paystack();
                $payment = $paystack->verify_transaction($txn_id);

                Log::info("payment Paystack :  ", [$payment]);

                if (!empty($payment)) {
                    $payment = json_decode($payment, true);
                    if (isset($payment['data']['status']) && $payment['data']['status'] == 'success') {
                        $status = Transaction::$statusSuccess;
                    }
                }
            } else if ($request->payment_method == Transaction::$paymentTypeStripe) {

                try {

                    $stripe_secret_key = Setting::get_value('stripe_secret_key');
                    $stripe = new \Stripe\StripeClient(
                        $stripe_secret_key
                    );

                    $paymentIntent = $stripe->paymentIntents->retrieve(
                        $txn_id,
                        []
                    );
                  
                        $status = Transaction::$statusSuccess;
                  

                } catch (\Exception $e) {
                    Log::error("Stripe Error : ", [$e]);
                    return CommonHelper::responseError($e->getMessage());
                }
            } else if ($request->payment_method == Transaction::$paymentTypePaytm) {
               
                $payment = Paytm::transaction_status($order->id);

                if (!empty($payment)) {
                    $payment = json_decode($payment, true);

                    if (isset($payment['body']['resultInfo']['resultCode']) && ($payment['body']['resultInfo']['resultCode'] == '01' && $payment['body']['resultInfo']['resultStatus'] == 'TXN_SUCCESS')) {
                        $status = Transaction::$statusSuccess;
                    } elseif (isset($payment['body']['resultInfo']['resultCode']) && ($payment['body']['resultInfo']['resultStatus'] == 'TXN_FAILURE')) {
                        $status = Transaction::$statusFailed;
                    } else if (isset($payment['body']['resultInfo']['resultCode']) && ($payment['body']['resultInfo']['resultStatus'] == 'PENDING')) {
                        //PENDING
                    } else {
                        $status = Transaction::$statusFailed;
                    }
                } else {
                    $status = Transaction::$statusFailed;
                }


            } else if ($request->payment_method == Transaction::$paymentTypePaypal) {
                
                $transaction_id = $request->transaction_id;

                $paypalClient = new PaypalClient();
                $server_output = $paypalClient->getPayment($transaction_id);
                $result = json_decode($server_output, 1);
               
                \Log::info('-------------Paypal start---------------');
                \Log::info('paypal result : ', [$result]);

                $status = Transaction::$statusFailed;

                if (isset($result['state']) && $result['state'] == 'approved') {
                    $status = Transaction::$statusSuccess;
                    $gateway_amount = $result['transactions'][0]['amount']['total'];
                }
            } 
            if($request->type == 'order'){
                $transactionData = array();
                $transactionData['user_id'] = $order->user_id;
                $transactionData['order_id'] = $order->id;
                $transactionData['type'] = $request->payment_method; // Razorpay / Paystack / Paypal
                $transactionData['txn_id'] = $txn_id;
                $transactionData['payu_txn_id'] = "";
                $transactionData['amount'] = $order->final_total;
                $transactionData['status'] = $status;
                $transactionData['message'] = "";
                $transactionData['transaction_date'] = date('Y-m-d H:i:s');

                $transaction = Transaction::create($transactionData);
                if ($status == Transaction::$statusSuccess) {

                    //Mark payment received
                    $order->active_status = OrderStatusList::$received;
                    $order->transaction_id = $transaction->id ?? 0;
                    $order->save();
        
                    //CommonHelper::addSellerWiseOrder($order->id);
        
                    return CommonHelper::responseSuccess("Order Placed Successfully");
                } else {
                    return CommonHelper::responseError("Transaction Failed, Please try again!");
                }
            }
            elseif($request->type == 'wallet'){
                
                $walletTransactionData = array();
                $walletTransactionData['user_id'] =  $user->id;
                $walletTransactionData['order_id'] = '';
                $walletTransactionData['type'] = 'credit'; 
                $walletTransactionData['payment_type'] = $request->payment_method; // Razorpay / Paystack / Paypal
                $walletTransactionData['txn_id'] = $txn_id;
                $walletTransactionData['amount'] = $request->wallet_amount;
                $walletTransactionData['status'] = $status;
                $walletTransactionData['message'] = "Wallet successfully recharged.";
                $walletTransactionData['transaction_date'] = date('Y-m-d H:i:s');
                $wallet_transaction = WalletTransaction::create($walletTransactionData);
                if ($status == WalletTransaction::$statusSuccess) {

                    //Mark credit amount in user balance
                    $balance = $user->balance;
                    $newBalance =$balance + $request->wallet_amount;
            
                    $user = User::where('id',$user->id)->update(['balance' => $newBalance]);
                    $data = array();
                    $data['user_balance'] = $newBalance;
                    return CommonHelper::responseSuccessWithData("Amount Added in Wallet Successfully",$data);
                } else {
                    return CommonHelper::responseError("Transaction Failed, Please try again!");
                }
            }
        }

       
    }

    public function updateOrderStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_item_id' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $order_item_id = $request->order_item_id;
        $order_item = OrderItem::select("*")->where("id", $order_item_id)->first();
        

        if (empty($order_item)) {
            return CommonHelper::responseError('Order Item Not found.');
        }

        if (isset($request->order_id)) {
            $id = $request->order_id;
        } else {
            $id = $order_item->order_id;
        }
        $order = Order::select("*")->where("id", $id)->first();
        if (empty($order)) {
            return CommonHelper::responseError('Order Not found.');
        }

        $user = User::select("*")->where('id', $order->user_id)->first();
        if (empty($user)) {
            return CommonHelper::responseError('User Not found.');
        }

        $postStatus = $request->status;
        $status = OrderStatusList::where('id', $postStatus)->first();
        if (empty($status)) {
            return CommonHelper::responseError('Status Not found.');
        }
        $selectedStatus = $status->status;
        if ($order_item->active_status == $postStatus) {
            return CommonHelper::responseError("This Order Item is already " . $selectedStatus . "!");
        }


        /* Cannot return order unless it is delivered */
        if (CommonHelper::isOrderItemReturned($order_item->active_status, $postStatus)) {
            return CommonHelper::responseError(__('cannot_return_order_unless_it_is_delivered')); 
        }

        /* Could not update order status once cancelled or returned! */
        if (CommonHelper::isOrderItemCancelled($order_item_id)) {
            return CommonHelper::responseError(__('could_not_update_order_status_cancelled_or_returned'));
        }

        if (!empty($postStatus)) {

            if ($postStatus == OrderStatusList::$delivered) {

                if ($order->payment_method == Transaction::$paymentTypeCod) {

                    // Save Device details
                    if ($request->device_type) {
                        $app_usage = array();
                        $app_usage['order_id'] = $order->id;
                        $app_usage['device_type'] = $request->device_type;
                        $app_usage['app_version'] = $request->app_version;
                        AppUsage::create($app_usage);
                    }

                    $transactionData = array();
                    $transactionData['user_id'] = $order->user_id;
                    $transactionData['order_id'] = $order->id;
                    $transactionData['type'] = "COD";
                    $transactionData['txn_id'] = round(microtime(true) * 1000);
                    $transactionData['payu_txn_id'] = "";
                    $transactionData['amount'] = $order->total;
                    $transactionData['status'] = Transaction::$statusSuccess;
                    $transactionData['message'] = "";
                    $transactionData['transaction_date'] = date('Y-m-d H:i:s');
                    $transaction = Transaction::create($transactionData);
                    $order->transaction_id = $transaction->id ?? 0;
                }

                $order->active_status = OrderStatusList::$delivered;
                $order->save();

                $order_item->active_status = OrderStatusList::$delivered;
                $order_item->save();
               
                 CommonHelper::sendOrderItemStatusMailNotification($order_item,'order_item_status_update');
                return CommonHelper::responseSuccess("Order Status Updated Successfully");
                /*Send Notification*/
            } else if ($postStatus == OrderStatusList::$cancelled) {
                DB::beginTransaction();
               // try {

                    $itemNum = OrderItem::where("order_id", $order->id)->count();
                    $lastItemNum = 0;
                    if ($itemNum > 1) {
                        $lastItemNum = OrderItem::where("order_id", $order->id)->where('status', '!=', OrderStatusList::$cancelled)->count();
                    }
                   
                    if ($itemNum == 1 || $lastItemNum == 1) {
                        $order_status = array();
                        $order_status['order_id'] = $order->id;
                        $order_status['order_item_id'] = $order_item->id;
                        $order_status['status'] = $postStatus;
                        $order_status['created_by'] = auth()->user()->id;
                        $order_status['user_type'] = OrderStatus::$userTypeUser;
                        CommonHelper::setOrderStatus($order_status);
                        $order->active_status = OrderStatusList::$cancelled;
                       
                      
                        $order->save();
                    }
                   $user = User::find($order->user_id);
                        $currentBalance = $user->balance;
                    if ($order->payment_method !== Transaction::$paymentTypeCod) {
                       
                        
                        $new_balance = $currentBalance + $order_item->sub_total;

                        if ($itemNum == 1 || $lastItemNum == 1) {
                            $new_balance = $currentBalance + $order->final_total;
                            CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                             if($order->wallet_balance == 0){
                                 CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                        CommonHelper::addWalletTransaction($order->id,  $order_item->id, $order->user_id, 'credit',$order->final_total, 'Order Item Cancelled');
                             }else{
                                 $new_balance = $currentBalance + $order->wallet_balance + $order->final_total;
                                 CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                                 CommonHelper::addWalletTransaction($order->id,  $order_item->id, $order->user_id, 'credit',$order->wallet_balance + $order->final_total, 'Order Item Cancelled');
                             }
                        }
                        else{
                            $new_balance = $currentBalance + $order_item->sub_total;
                            CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                        CommonHelper::addWalletTransaction($order->id,  $order_item->id, $order->user_id, 'credit', $order_item->sub_total, 'Order Item Cancelled');
                       
                        }
                       

                    }
                     if ($order->payment_method == Transaction::$paymentTypeCod) {
                          if ($itemNum == 1 || $lastItemNum == 1) {
                           
                             if($order->wallet_balance == 0){
                                $order->total = floatval($order->total) - floatval($order_item->sub_total);
                                 $order->final_total = floatval($order->final_total) - floatval($order_item->sub_total);
                                $order->save();
                             }else{
                               
                                $new_balance = $currentBalance + $order->wallet_balance;
                                CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                                CommonHelper::addWalletTransaction($order->id,  $order_item->id, $order->user_id, 'credit', $order->wallet_balance, 'Order Item Cancelled');
                                $order->wallet_balance = 0;
                                $order->save(); 
                             }
                        }
                        else{
                           
                            if($order->wallet_balance == 0){
                                $order->total = floatval($order->total) - floatval($order_item->sub_total);
                                 $order->final_total = floatval($order->final_total) - floatval($order_item->sub_total);
                                $order->save();
                            }else{
                                // Fetch used wallet balance and canceled item subtotal
                                $usedWalletBalance = $order->wallet_balance; // Total wallet balance used in the order
                                $orderItemSubtotal = $order_item->sub_total; // Amount for the canceled item
                                $currentBalance = CommonHelper::getUserWalletBalance($order->user_id); // Get current wallet balance
                                
                                // Calculate the remaining amount that was paid via COD
                                $totalRefundable = $usedWalletBalance; // Maximum amount that can be refunded
                                
                                // Ensure we only refund the amount needed to restore wallet usage
                                $remainingRefundable = $totalRefundable - $currentBalance; // Amount still refundable
                                $refundAmount = min($orderItemSubtotal, $remainingRefundable);
                                
                                // Get the final total after considering the cancellation
                                $final_total = $order->final_total;
                                
                                if ($final_total > $refundAmount) {
                                    // Deduct the refund amount from the final total instead of adding it to the wallet
                                    $final_total -= $refundAmount;
                                } else {
                                    // Process refund only if there is an amount to be refunded
                                    if ($refundAmount > 0) {
                                        // Update wallet balance
                                        $new_balance = $currentBalance + $refundAmount;
                                        CommonHelper::updateUserWalletBalance($new_balance, $order->user_id);
                                
                                        // Add wallet transaction for the refunded amount
                                        CommonHelper::addWalletTransaction($order->id, $order_item->id, $order->user_id, 'credit', $refundAmount, 'Order Item Cancelled');
                                    }
                                }
                                
                                // Update final total in the order
                                $order->final_total = $final_total;
                                $order->save();
                                               
                            }
                       
                        }
                   
                     }
                    $order_item->active_status = $postStatus;
                    $order_item->cancellation_reason = $request->cancellation_reason;
                    $order_item->canceled_at = now();
                    $order_item->save();
                    // Find the product variant by id
                    $product_variant_id = $order_item->product_variant_id;
                    $product_variant = ProductVariant::where('id', $product_variant_id)->first();
        
                    if ($product_variant) {
                        // Update the stock value
                        $new_stock_value = $product_variant->stock + $order_item->quantity;
                        $product_variant->stock = $new_stock_value; // Set the new stock value
                        $product_variant->save(); // Save the changes to the database
                    }
                    if (isset($order->promo_code) && $order->promo_code != null && isset($order->promo_discount) && $order->promo_discount != null) {
                        $promo_code = explode("(", $order->promo_code);
                        $minimum_order_amount = PromoCode::where('promo_code', $promo_code[0])->first()->minimum_order_amount;
                        if (isset($minimum_order_amount) && $minimum_order_amount != null && $order->total < $minimum_order_amount) {
                            $order_id = $order->id;
                            CommonHelper::updateOrderPromoCode($order_id, $order->promo_discount);
                        }
                    }

                    DB::commit();
                // } catch (\Exception $e) {
                //     DB::rollBack();
                //     return CommonHelper::responseError(__('something_went_wrong'));
                // }
                 CommonHelper::sendOrderItemStatusMailNotification($order_item,'order_item_status_update');
                 //Order Item cancelled Send SMS
                try {
                    CommonHelper::sendSmsOrderStatus($order_item, OrderStatusList::$cancelled); // case 7
                }catch ( \Exception $e){
                    Log::error("Place order SMS error :",[$e->getMessage()] );
                }
                return CommonHelper::responseSuccessWithData("Order " . OrderStatusList::$orderCancelled . " Successfully", $order);

            } elseif ($postStatus == OrderStatusList::$returned ){
                $validator = Validator::make($request->all(), [
                    'order_item_id' => [
                        'required',
                        Rule::unique('return_requests')->ignore($request->order_item_id),
                    ],
                ], [
                    'order_item_id.unique' => 'Return request has been sent already.',
                ]);
                if ($validator->fails()) {
                    return CommonHelper::responseError($validator->errors()->first());
                }
                $returnRequest = new ReturnRequest();
                $returnRequest->user_id = $order_item->user_id;
                $returnRequest->product_variant_id = $order_item->product_variant_id;
                $returnRequest->order_id = $request->order_id;
                $returnRequest->order_item_id = $request->order_item_id;
                $returnRequest->reason = $request->reason;
                $returnRequest->status = 1;    //request is pending
                $returnRequest->delivery_boy_id = 0;    //request is pending, so no delivery boy assigned
                $returnRequest->remarks = $request->remarks ?? '';
                $returnRequest->save();
                CommonHelper::sendOrderItemStatusMailNotification($order_item,'return_request_sent');
                CommonHelper::sendSmsOrderStatus($order_item, 8);  // case 8
                return CommonHelper::responseSuccess("Order Return Request Sent Successfully");
            }else {

                $order_item->active_status = $postStatus;
               
                $order_item->save();
                CommonHelper::sendOrderItemStatusMailNotification($order_item,'order_item_status_update');
                
                
                return CommonHelper::responseSuccess("Order Status Updated Successfully");
            }
        }
    }

    public function getOrders(Request $request)
    {

        $limit = ($request->limit) ?? 12;
        $offset = ($request->offset) ?? 0;
        $page = $request->get('page', 0);

        $order_id = $request->order_id;
        $user_id = auth()->user()->id;

        $sql = Order::select(DB::raw("count(id) as total"))
            ->where("user_id", $user_id);
        if (!empty($order_id)) {
            $sql = $sql->where("id", $order_id);
        }

        if (isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id != "") {
            $sql = $sql->where("active_status", "=", $request->order_status_id);
        }

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $sql = $sql->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $sql = $sql->whereIn('orders.active_status', $previousTypeStatus);
            }
        }

        $total = $sql->first();
            $sql = Order::select(
                "orders.*",
                'orders.address as order_address',
                'orders.mobile as order_mobile',
                'orders.id as order_id',
                "obt.message as bank_transfer_message",
                "obt.status as bank_transfer_status",
                "dboys.name as delivery_boy_name",
                "dboys.mobile as delivery_boy_mobile",
               
                DB::raw('(select name from users as u where u.id = orders.user_id) as user_name'),
                'address.address',
                'address.landmark',
                'address.area',
                'address.city',
                'address.state',
                'address.pincode',
                'address.country'
            )->from("orders")
                ->leftJoin("order_bank_transfers as obt", "obt.order_id", "=", "orders.id")
                ->leftJoin('user_addresses as address', 'orders.address_id', '=', 'address.id')
                ->leftJoin('delivery_boys as dboys', 'orders.delivery_boy_id', '=', 'dboys.id')
                ->where("orders.user_id", "=", $user_id);
        if (!empty($order_id)) {
            $sql = $sql->where("orders.id", "=", $order_id);
        }

        if (isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id != "") {
            $sql = $sql->where("orders.active_status", "=", $request->order_status_id);
        }

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $sql = $sql->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $sql = $sql->whereIn('orders.active_status', $previousTypeStatus);
            }
        }
        $res = $sql->orderBy("orders.id", "DESC")->skip($offset)->take($limit)->get();

        $res = $res->makeHidden(['image', 'updated_at', 'deleted_at', 'current_status']);

        $i = 0;
        foreach ($res as $key => $row) {
            $res[$key]->address = $row->address . " " . $row->landmark . " " . $row->area . " " . $row->city . " " . $row->state . "-" . $row->pincode . " " . $row->country;
            $generate_otp = Setting::get_value("generate_otp");
            if($generate_otp == 0){
                $res[$key]->otp = 0;
            }
            // echo "meri ek tang nakli hain me hoki ka bohot bada khiladi hun";
            $final_sub_total = 0;
            $sub_total = 0;

            $row->promo_code = explode('(', $row->promo_code)[0];

            if ($row->discount > 0) {

                $discounted_amount = $row->total * $row->discount / 100;
                $final_total = $row->total - $discounted_amount;
                $discount_in_rupees = $row->total - $final_total;
            } else {
                $discount_in_rupees = 0;
            }

            $res[$i]['discount_rupees'] = $discount_in_rupees;
            $final_total = $res[$i]['final_total'];
            $res[$i]['final_total'] = $final_total;
           
            $res[$i]['date'] = Carbon::parse($row->created_at)->format('Y-m-d H:i:s'); 
            $res[$i]['created_at'] = Carbon::parse($row->created_at)->format('Y-m-d H:i:s'); 
           

            $res[$i]['bank_transfer_message'] = !empty($res[$i]['bank_transfer_message']) ? $res[$i]['bank_transfer_message'] : "";
            $res[$i]['bank_transfer_status'] = !empty($res[$i]['bank_transfer_status']) ? $res[$i]['bank_transfer_status'] : 0;

            $orderStatus = orderStatus::where('order_id', $row['id'])->get();
            $data = array();
            foreach ($orderStatus as $status) {
                $subData = array();
                array_push($subData, $status->status, Carbon::parse($status->created_at));
                array_push($data, $subData);
            }
            $res[$i]['status'] = json_encode($data);



            $items = OrderItem::with('images')->select(
                'oi.*',
                'v.id as variant_id',
                'p.id as product_id',
                'p.name',
                'p.image',
                'p.manufacturer',
                'p.made_in',
                'p.return_status',
                'p.return_days',
                'p.cancelable_status',
                'p.till_status',
                'v.measurement', DB::raw('(select short_code from units as u where u.id = v.stock_unit_id) as unit'),
                'co.name as country_made_in',
                's.name as seller_name',
                's.formatted_address as seller_address',
                's.place_name as seller_place_name',
                's.latitude as seller_latitude',
                's.longitude as seller_longitude',
                  DB::raw('(SELECT status FROM return_requests WHERE order_item_id = oi.id) as return_requested'),
                  DB::raw('(SELECT reason FROM return_requests WHERE order_item_id = oi.id) as return_reason')
            )
                ->from('order_items as oi')
                ->leftJoin('product_variants as v', 'oi.product_variant_id', '=', 'v.id')
                ->leftJoin('products as p', 'v.product_id', '=', 'p.id')
                ->leftJoin('sellers as s', 'oi.seller_id', '=', 's.id')
                ->leftJoin("countries as co", "p.made_in", "=", "co.id")
                ->where('oi.order_id', '=', $row['id'])
                ->orderBy('oi.id', 'ASC')
                ->get();


            foreach ($items as $subkey => $item) {
                
                $taxed = ProductHelper::getTaxableAmount($item->product_variant_id);

                $items[$subkey]->made_in = $item->country_made_in ?? "";
                $items[$subkey]->created_at = Carbon::parse($item->created_at)->format('Y-m-d H:i:s');
                $items[$subkey]->price = (float) CommonHelper::doubleNumber($item->discounted_price ?? ($taxed->taxable_amount ?? $item->price));
                $cancelableStatusList = array(OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$shipped, OrderStatusList::$outForDelivery);

                if (($item->cancelable_status == 1) && intval($row->active_status) <= intval($item->till_status) && in_array($row->active_status, $cancelableStatusList)) { 
                    $items[$subkey]->cancelable_status = 1;
                } else {
                    $items[$subkey]->cancelable_status = 0;
                }

                $created_at = date_create(date('Y-m-d', strtotime($row->created_at)));
                $current_data = date_create(date('Y-m-d'));
                $order_days = abs(date_diff($created_at, $current_data)->format('%R%a'));

                if (($item->return_status == 1) && intval($order_days) <= intval($item->return_days) && intval($row->active_status) == OrderStatusList::$delivered) {
                    $items[$subkey]->return_status = 1;
                } else {
                    $items[$subkey]->return_status = 0;
                }
                $items[$subkey]->item_rating = CommonHelper::productRatingOfUser($item->product_id, $item->user_id);
            }
            $items = $items->makeHidden(['image', 'images', 'updated_at', 'deleted_at', 'status', 'current_status', 'country_made_in']);
            
            $res[$i]['items'] = $items;
            $res[$i]['status'] = json_decode($res[$i]['status']);
            $res[$i]['final_total'] = strval($row['final_total']);
            $res[$i]['total'] = strval($row['total']);
            $i++;
        }
     
        if (!empty($res) && $total->total !== 0) {
            return CommonHelper::responseWithData($res, $total->total);
        } else {
            return CommonHelper::responseError(__('no_orders_found'));
        }
    }

    public function generateOrderInvoice(Request $request)
    {
        $data = CommonHelper::getOrderDetails($request->order_id);
       
        if (!$data["order"]) {
            return CommonHelper::responseError("Order Not found!");
        }
        $invoice = CommonHelper::generateOrderInvoice($data);
        return CommonHelper::responseWithData($invoice);
    }

    public function downloadOrderInvoice(Request $request)
    {
        return CommonHelper::downloadOrderInvoice($request->order_id);
    }


    public function getOrders_new(Request $request)
    {

        $limit = ($request->limit) ?? 12;
        $offset = ($request->offset) ?? 0;
        $order_id = $request->order_id;
        $user_id = auth()->user()->id;

        $sql = Order::select(DB::raw("count(oi.id) as total"))->leftJoin('order_items as oi', 'oi.order_id', '=', 'orders.id')
            ->where("orders.user_id", $user_id);
        if (!empty($order_id)) {
            $sql = $sql->where("oi.id", $order_id);
        }
        if (isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id != "") {
            $sql = $sql->where("oi.active_status", "=", $request->order_status_id);
        }

        $total = $sql->first();


        $sql = Order::select(
            "orders.*",
            "orders.id as order_id",
            "obt.message as bank_transfer_message",
            "obt.status as bank_transfer_status",
            DB::raw('(select name from users as u where u.id = orders.user_id) as user_name'),
            'address.address',
            'address.landmark',
            'address.area',
            'address.city',
            'address.state',
            'address.pincode',
            'address.country',

            'oi.*',
            'v.id as variant_id',
            'p.name',
            'p.image',
            'p.manufacturer',
            'p.made_in',
            'p.return_status',
            'p.return_days',
            'p.cancelable_status',
            'p.till_status',
            'v.measurement', DB::raw('(select short_code from units as u where u.id = v.stock_unit_id) as unit'),
            'os.status as current_status',
            'os.id as order_status_id',
            'co.name as country_made_in',
            's.name as seller_name'
        )->from("orders as orders")

            ->leftJoin('order_items as oi', 'oi.order_id', '=', 'orders.id')

            ->leftJoin('product_variants as v', 'oi.product_variant_id', '=', 'v.id')
            ->leftJoin('products as p', 'v.product_id', '=', 'p.id')
            ->leftJoin('sellers as s', 'oi.seller_id', '=', 's.id')
            ->leftJoin("countries as co", "p.made_in", "=", "co.id")
            ->leftJoin('order_status_lists as os', 'oi.active_status', '=', 'os.id')

            ->leftJoin("order_bank_transfers as obt", "obt.order_id", "=", "orders.id")
            ->leftJoin('user_addresses as address', 'orders.address_id', '=', 'address.id')

            ->where("orders.user_id", "=", $user_id);
        if (!empty($order_id)) {
            $sql = $sql->where("orders.id", "=", $order_id);
        }

        if (isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id != "") {
            $sql = $sql->where("oi.active_status", "=", $request->order_status_id);
        }

        $res = $sql->orderBy("orders.id", "DESC")->skip($offset)->take($limit)->get();
        $res = $res->makeHidden(['image', 'images', 'updated_at', 'deleted_at', 'current_status', 'status', 'country_made_in', 'order_status_id']);

        $i = 0;
        foreach ($res as $key => $row) {
            $res[$key]->active_status = $row->current_status ?? "";
            $res[$key]->address = $row->address . " " . $row->landmark . " " . $row->area . " " . $row->city . " " . $row->state . "-" . $row->pincode . " " . $row->country;
            $res[$key]->active_status = $row->current_status ?? "";
            $res[$key]->made_in = $row->country_made_in ?? "";
            $res[$key]->created_at = Carbon::createFromFormat('Y-m-d', date('Y-m-d', strtotime($row->created_at)))->format('Y-m-d');

            if ($row->order_status_id == $row->till_status) {
                $res[$key]->cancelable_status = 1;
            } else {
                $res[$key]->cancelable_status = 0;
            }

            $created_at = date_create(date('Y-m-d', strtotime($row->created_at)));
            $current_data = date_create(date('Y-m-d'));
            $order_days = abs(date_diff($created_at, $current_data)->format('%R%a'));
            if ($order_days <= $row->return_days) {
                $res[$key]->return_status = 1;
            } else {
                $res[$key]->return_status = 0;
            }

            if ($row->discount > 0) {
                $discounted_amount = $row->total * $row->discount / 100;
                $final_total = $row->total - $discounted_amount;
                $discount_in_rupees = $row->total - $final_total;
            } else {
                $discount_in_rupees = 0;
            }
            $res[$i]['discount_rupees'] = $discount_in_rupees;
            $final_total = ceil($res[$i]['final_total']);
            $res[$i]['final_total'] = $final_total;
            $res[$i]['created_at'] = date('Y-m-d', strtotime($res[$i]['created_at']));
            $res[$i]['bank_transfer_message'] = !empty($res[$i]['bank_transfer_message']) ? $res[$i]['bank_transfer_message'] : "";
            $res[$i]['bank_transfer_status'] = !empty($res[$i]['bank_transfer_status']) ? $res[$i]['bank_transfer_status'] : "0";
            $res[$i]['image_url'] = CommonHelper::getImage($res[$i]['image']);
            $res[$i]['status'] = json_decode($res[$i]['status']);
            $res[$i]['final_total'] = strval($row['final_total']);
            $res[$i]['total'] = strval($row['total']);
            $i++;
        }

        if (!empty($res) && $total->total !== 0) {
            return CommonHelper::responseWithData($res, $total->total);
        } else {
            return CommonHelper::responseError(__('no_orders_found'));
        }
    }

    /*Paytm*/
    public function generatePaytmChecksum(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'order_id' => 'required_if:type,order',
            'amount' => 'required_if:type,order',
            'wallet_amount' => 'required_if:type,wallet',
            'website' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $credentials = Paytm::get_credentials();
        $paytm_merchant_id = Setting::get_value('paytm_merchant_id');
        $paytm_params["MID"] = $paytm_merchant_id;

        $paytm_params["ORDER_ID"] = ($request->type === 'order') ? $request->order_id :  'wallet_recharge-'.auth()->user()->id;
        $paytm_params["TXN_AMOUNT"] = ($request->type === 'order') ? $request->amount : $request->wallet_amount;
        $paytm_params["CUST_ID"] = auth()->user()->id;

        $paytm_params["WEBSITE"] = $request->get('website', 'DEFAULT');
        $paytm_params["CALLBACK_URL"] = $credentials['url'] . "theia/paytmCallback?ORDER_ID=" . $paytm_params["ORDER_ID"];

       
        $paytm_checksum = Paytm::generateSignature($paytm_params, $paytm_merchant_id);

        Log::info("paytm_checksum : ", [$paytm_checksum]);
        $response = array();
        if (!empty($paytm_checksum)) {
            $response['order id'] = $paytm_params["ORDER_ID"];
            $response['data'] = $paytm_params;
            $response['signature'] = $paytm_checksum;
            return CommonHelper::responseSuccessWithData('Checksum created successfully', $response);

        } else {
            return CommonHelper::responseError('Data not found!');
        }

    }

    public function generatePaytmTxnToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'order_id' => 'required_if:type,order',
            'amount' => 'required_if:type,order',
            'wallet_amount' => 'required_if:type,wallet',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $credentials = Paytm::get_credentials();
        $order_id = ($request->type === 'order') ? $request->order_id :  'wallet_recharge-'.auth()->user()->id;
        $amount = ($request->type === 'order') ? $request->amount : $request->wallet_amount;
        $user_id = auth()->user()->id;
        $paytmParams = array();

        $paytmParams["body"] = array(
            "requestType" => "Payment",
            "mid" => $credentials['paytm_merchant_id'],
            "websiteName" => "WEBSTAGING",
            "orderId" => $order_id,
            "callbackUrl" => $credentials['url'] . "theia/paytmCallback?ORDER_ID=" . $order_id,
            "txnAmount" => array(
                "value" => $amount,
                "currency" => "INR",
            ),
            "userInfo" => array(
                "custId" => $user_id,
            ),
        );



        /*
         * Generate checksum by parameters we have in body
         * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
         */
        $checksum = Paytm::generateSignature(json_encode($paytmParams["body"], JSON_UNESCAPED_SLASHES), $credentials['paytm_merchant_key']);



        $paytmParams["head"] = array(
            "signature" => $checksum
        );

        $post_data = json_encode($paytmParams, JSON_UNESCAPED_SLASHES);

        /* for Staging */
        $url = $credentials['url'] . "/theia/api/v1/initiateTransaction?mid=" . $credentials['paytm_merchant_id'] . "&orderId=" . $order_id;

        /* for Production */

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
        $paytm_response = curl_exec($ch);

        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
        }
        curl_close($ch);
        if (isset($error_msg)) {
            Log::info("curl error message : ", [$error_msg]);
        }

        Log::info("paytm_response : ", [$paytm_response]);

        $response = array();
        if (!empty($paytm_response)) {
            $paytm_response = json_decode($paytm_response, true);
            if (isset($paytm_response['body']['resultInfo']['resultMsg']) && ($paytm_response['body']['resultInfo']['resultMsg'] == "Success" || $paytm_response['body']['resultInfo']['resultMsg'] == "Success Idempotent")) {
                $response['txn_token'] = $paytm_response['body']['txnToken'];
                $response['paytm_response'] = $paytm_response;

                return CommonHelper::responseSuccessWithData('Transaction token generated successfully', $response);

            } else {
                $response['message'] = $paytm_response['body']['resultInfo']['resultMsg'];
                $response['txn_token'] = "";
                $response['paytm_response'] = $paytm_response;

                return CommonHelper::responseError($paytm_response['body']['resultInfo']['resultMsg']);
            }
        } else {
            $response['error'] = true;
            $response['message'] = "Could not generate transaction token. Try again!";
            $response['txn_token'] = "";
            $response['paytm_response'] = $paytm_response;
            return CommonHelper::responseError("Could not generate transaction token. Try again!");
        }
    }
    /*Midtrans*/
    public function midtransCallback(Request $request)
    { 
        $notification = $request->all();

        // Log the notification for debugging
        \Log::info("Midtrans Callback: " . print_r($notification, true));
        
        
       if($notification['status_code'] == 200){
       
        //transaction
        $order_id = $notification['order_id'];
        $explode = explode('-', $order_id);
        if($explode[0] == 'order'){
            $transactionData = array();
            $transactionData['user_id'] = $explode[2];
            $transactionData['order_id'] = $explode[1];
            $transactionData['type'] = 'Midtrans'; 
            $transactionData['txn_id'] = $notification['transaction_id'];
            $transactionData['payu_txn_id'] = "";
            $transactionData['amount'] = $notification['gross_amount']/1000;
            $transactionData['status'] = $notification['transaction_status'];
            $transactionData['message'] = $notification['status_message'];
            $transactionData['transaction_date'] = $notification['transaction_time'];
      
            $transaction = Transaction::create($transactionData);
            $order = Order::withTrashed()->where('id', $explode[1])->first();
            if (!$order) {
                return CommonHelper::responseError("Invalid Order Id");
            }

                //Mark payment received
                $order->active_status = OrderStatusList::$received;
                $order->transaction_id = $transaction->id ?? 0;
                $order->save();
    
                //CommonHelper::addSellerWiseOrder($order->id);
    
                return CommonHelper::responseSuccess("Order Placed Successfully");
            
        }
        elseif($explode[0] == 'wallet'){
                    \Log::info("Midtrans Callbackwall: " . print_r($notification, true));

            $walletTransactionData = array();
            $walletTransactionData['user_id'] =  $explode[2];
            $walletTransactionData['order_id'] = '';
            $walletTransactionData['type'] = 'credit'; 
            $walletTransactionData['payment_type'] = 'Midtrans';
            $walletTransactionData['txn_id'] = $notification['transaction_id'];
            $walletTransactionData['amount'] = $notification['gross_amount']/1000;
            $walletTransactionData['status'] = $notification['transaction_status'];
            $walletTransactionData['message'] = "Wallet successfully recharged.";
            $walletTransactionData['transaction_date'] =$notification['transaction_time'];
            $wallet_transaction = WalletTransaction::create($walletTransactionData);
            
            $user = User::where('id', $explode[2])->first();
                //Mark credit amount in user balance
                $balance = $user->balance;
                $newBalance =$balance + $walletTransactionData['amount'];
        
                $user = User::where('id',$user->id)->update(['balance' => $newBalance]);
                $data = array();
                $data['user_balance'] = $newBalance;
                return CommonHelper::responseSuccessWithData("Amount Added in Wallet Successfully",$data);
            
        }
    }
    }
    public function getLiveTrackingDetails(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|numeric|exists:orders,id',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        // Retrieve the order ID from the request
        $orderId = $request->input('order_id');

        // Fetch the live tracking details based on the order ID
        $trackingData = LiveTracking::where('order_id', $orderId)
            ->orderBy('id', 'desc')
            ->first();

        // Check if the tracking data exists
        if ($trackingData) {
            return CommonHelper::responseSuccessWithData("Live Tracking Detail fetched successfully.",$trackingData);
            
        } else {
            return CommonHelper::responseError("Live Tracking Not available.");
        }
    }
    public function getOrderStatusPhonepe(Request $request)
    {
        $request->validate([
            'transaction_id' => 'required|string'
        ]);

        try {
            $transactionId = $request->transaction_id;

            $mode = Setting::get_value('phonepay_mode'); // 'uat' or 'production'
            $merchantId = Setting::get_value('phonepay_merchant_id');

            // Get access token from your stored method or regenerate (better to cache it)
            $accessToken = $request->token; // Replace with dynamic token generation

            $statusUrl = $mode === 'production'
                ? "https://api.phonepe.com/apis/pg/v1/status/$transactionId"
                : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/$transactionId/status";

            $curl = curl_init();

            curl_setopt_array($curl, [
                CURLOPT_URL => $statusUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                    'Authorization: O-Bearer ' . $accessToken
                ],
            ]);

            $response = curl_exec($curl);
            curl_close($curl);

            $response = json_decode($response, true);
            //return response()->json($result);


            $website_url = Setting::get_value('website_url') ?? "";
 
        // Log the notification for debugging
        \Log::info("phonepe Callbackqqq: " .print_r($response, true));

        try {
            if ($response['paymentDetails'][0]['state'] == 'COMPLETED') {
                // transaction
              
                $order_id =$response['metaInfo']['order_id'];

                if ($response['metaInfo']['type'] == 'order') {
                  
                     \Log::info("paytabs Callbackorder: " .print_r($response, true));
                    $transactionData = array();
                    $transactionData['user_id'] = $response['metaInfo']['user_id'];
                    $transactionData['order_id'] =$response['metaInfo']['order_id'];
                    $transactionData['type'] = Transaction::$paymentTypePhonepe;
                    $transactionData['txn_id'] = $response['paymentDetails'][0]['transactionId'];
                    $transactionData['payu_txn_id'] = "";
                    $transactionData['amount'] =$response['paymentDetails'][0]['amount'];
                    $transactionData['status'] = Transaction::$statusSuccess;
                    $transactionData['message'] =  "Phonepe order payment";
                    $transactionData['transaction_date'] = now();

                    $transaction = Transaction::create($transactionData);
                    $order = Order::withTrashed()->where('id', $response['metaInfo']['order_id'])->first();
                    $user = User::where('id', $response['metaInfo']['user_id'])->first();
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
                   return CommonHelper::responseWithData(['status' => $response['paymentDetails'][0]['state'],'order_id' =>$response['metaInfo']['order_id'] ,'user_id' => $response['metaInfo']['user_id'], 'type' =>$response['metaInfo']['type'] ]);

                  


                } elseif ($response['metaInfo']['type']  == 'wallet') {
                    \Log::info("phonepe Callbackwallet: " . print_r($response, true));
                    
                    $walletTransactionData = array();
                    $walletTransactionData['user_id'] =  $response['metaInfo']['user_id'];
                    $walletTransactionData['order_id'] = '';
                    $walletTransactionData['type'] = 'credit';
                    $walletTransactionData['payment_type'] = Transaction::$paymentTypePhonepe;
                    $walletTransactionData['txn_id'] =  $response['paymentDetails'][0]['transactionId'];
                    $walletTransactionData['amount'] = $response['paymentDetails'][0]['amount'];
                    $walletTransactionData['status'] = Transaction::$statusSuccess;
                    $walletTransactionData['message'] = "Wallet successfully recharged." ;
                    $walletTransactionData['transaction_date'] = now();
                    $wallet_transaction = WalletTransaction::create($walletTransactionData);

                    $newBalance = CommonHelper::addUserWalletBalance($walletTransactionData['amount'],$response['metaInfo']['user_id']);

                       return CommonHelper::responseWithData(['status' => $response['paymentDetails'][0]['state'],'order_id' =>$response['metaInfo']['order_id'] ,'user_id' => $response['metaInfo']['user_id'], 'type' =>$response['metaInfo']['type'] ]);
                }
            } else {
               
                if ($response['metaInfo']['type'] == 'order') {
                    Order::where('id', $response['metaInfo']['order_id'])->update(['active_status' => OrderStatusList::$cancelled]);
                  return CommonHelper::responseWithData(['status' => $response['paymentDetails'][0]['state'],'order_id' =>$response['metaInfo']['order_id'] ,'user_id' => $response['metaInfo']['user_id'], 'type' =>$response['metaInfo']['type'] ]);
                }
            }
        } catch (\Exception $e) {
            \Log::error("Error processing Phonepe callback: " . $e->getMessage());
            return CommonHelper::responseError("An error occurred while processing the callback.");
        }

        } catch (\Exception $e) {
            \Log::error('PhonePe Status Check Error: ' . $e->getMessage());
            return response()->json([
                'error' => true,
                'message' => $e->getMessage()
            ], 500);
        }
    }


}