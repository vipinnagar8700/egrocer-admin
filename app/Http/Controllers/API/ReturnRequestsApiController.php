<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\ReturnRequest;
use App\Models\ReturnStatusList;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReturnRequestsApiController extends Controller
{
    public function index(){
        $ReturnRequests = ReturnRequest::select('return_requests.*','users.name',
            'order_items.product_variant_id','order_items.quantity','order_items.price','order_items.sub_total',
            'order_items.discounted_price','order_items.product_name','order_items.variant_name')
            ->leftJoin('users', 'return_requests.user_id', '=', 'users.id')
            ->leftJoin('order_items', 'return_requests.order_item_id', '=', 'order_items.id')
            ->leftJoin('product_variants', 'return_requests.product_variant_id', '=', 'product_variants.id')
            ->orderBy('return_requests.id','DESC')
            ->get();
        return CommonHelper::responseWithData($ReturnRequests);
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'delivery_boy_id' => [
                'required_if:status,2',
                'integer', // Ensure it's an integer
                function ($attribute, $value, $fail) use ($request) {
                    // Check if the request is already approved
                    $existingRequest = ReturnRequest::where('id', $request->id)
                        ->where('status', 2) // Status 2 means already approved
                        ->first();
        
                    if ($existingRequest) {
                        $fail('This return request has already been approved.');
                    }
        
                    // Additional validation for delivery boy ID
                    if ($request->status == 2 && $value <= 0) {
                        $fail('Please assign a delivery boy when the return request is approved.');
                    }
                },
            ],
        ]);
       
        $customMessages = [
            'delivery_boy_id.required_if' => 'Please assign a delivery boy when the return request is approved.',
        ];
        
        $validator->setCustomMessages($customMessages);
       
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $returnRequest = ReturnRequest::find($request->id);
            $returnRequest->remarks = $request->remark;
            $returnRequest->status = $request->status;
            $returnRequest->delivery_boy_id = $request->delivery_boy_id ?? 0;
            
            if($request->status == ReturnStatusList :: $rApproved){
                $orderItem = OrderItem::find($returnRequest->order_item_id);
            
            $order = Order::select("*")->where("id", $orderItem->order_id)->first();
            $user = User::find($returnRequest->user_id);
            $currentBalance = $user->balance;
            $new_balance = $currentBalance + $orderItem->sub_total;
                $itemNum = OrderItem::where("order_id", $order->id)->count();
                    $lastItemNum = 0;
                    if ($itemNum > 1) {
                        $lastItemNum = OrderItem::where("order_id", $order->id)->where('status', '!=', OrderStatusList::$cancelled)->count();
                    }
                 if ($itemNum == 1 || $lastItemNum == 1) {
                if($order->wallet_balance == 0){
                     $new_balance = $currentBalance + $orderItem->sub_total;
                    CommonHelper::updateUserWalletBalance($new_balance, $returnRequest->user_id);
                    CommonHelper::addWalletTransaction($orderItem->order_id, $orderItem->id, $returnRequest->user_id, 'credit', $orderItem->sub_total, 'Order Item Returned');
                    //User::where('id', $returnRequest->user_id)->update(['balance' => $orderItem->sub_total]);
                }
                else{
                    $new_balance = $currentBalance + $order->wallet_balance + $order->final_total;
                    CommonHelper::updateUserWalletBalance($new_balance, $returnRequest->user_id);
                    CommonHelper::addWalletTransaction($orderItem->order_id, $orderItem->id, $returnRequest->user_id, 'credit', $order->wallet_balance + $order->final_total, 'Order Item Returned');
                    //User::where('id', $returnRequest->user_id)->update(['balance' => $orderItem->sub_total]);
                }
                $order->active_status = OrderStatusList::$returned;
                        $order->save();
                 }
                 else{
                     
                      if($order->wallet_balance == 0){
                           $new_balance = $currentBalance + $orderItem->sub_total;
                    CommonHelper::updateUserWalletBalance($new_balance, $returnRequest->user_id);
                    CommonHelper::addWalletTransaction($orderItem->order_id, $orderItem->id, $returnRequest->user_id, 'credit', $orderItem->sub_total, 'Order Item Returned');
                   
                }
                else{
                    $new_balance = $currentBalance + $orderItem->sub_total;
                    CommonHelper::updateUserWalletBalance($new_balance, $returnRequest->user_id);
                    CommonHelper::addWalletTransaction($orderItem->order_id, $orderItem->id, $returnRequest->user_id, 'credit', $orderItem->sub_total, 'Order Item Returned');
                   
                }
                 }
                    // set return status in order item 
                 if ($orderItem) {
                    $orderItem->active_status = OrderStatusList :: $returned;
                    $returnRequest->delivery_boy_id = $request->delivery_boy_id ?? 0;
                    $orderItem->save();
                }
                 // Find the product variant by id
                 $product_variant_id = $orderItem->product_variant_id;
                 $product_variant = ProductVariant::where('id', $product_variant_id)->first();
     
                 if ($product_variant) {
                     // Update the stock value
                     $new_stock_value = $product_variant->stock +  $orderItem->quantity;
                     $product_variant->stock = $new_stock_value; // Set the new stock value
                     $product_variant->save(); // Save the changes to the database
                 }
                 CommonHelper::sendSmsOrderStatus($orderItem, 9);
                 CommonHelper::sendOrderItemStatusMailNotification($orderItem,'order_item_status_update');
                 if($order->wallet_balance == 0){
                        
                 }else{
                     $order->wallet_balance = floatval($order->wallet_balance) - floatval($order->wallet_balance);
                     $order->save(); 
                 }
            }elseif($request->status == ReturnStatusList :: $rRejected){
                $returnRequest->delivery_boy_id = 0;
                CommonHelper::sendSmsOrderStatus($returnRequest, 10);
            }
            $returnRequest->save();
            
           

          
                    
        }
        return CommonHelper::responseSuccess("Return Request Status Updated Successfully!");
    }
    public function delete(Request $request){
        if(isset($request->id)){
            $returnRequest = ReturnRequest::find($request->id);
            if($returnRequest){
                $returnRequest->delete();
                return CommonHelper::responseSuccess("Return Request Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Return Request Already Deleted!");
            }
        }
    }
}