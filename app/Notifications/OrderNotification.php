<?php

namespace App\Notifications;

use App\Helpers\CommonHelper;
use App\Models\Admin;
use App\Models\AdminToken;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ReturnRequest;
use App\Models\OrderStatusList;
use App\Models\ReturnStatusList;
use App\Models\UserToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class OrderNotification extends Notification
{
    use Queueable;
    public $order_id;
    public $type;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order_id,$type)
    {
        $this->order_id = $order_id;
        $this->type = $type;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database']; 
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
       
        if($this->type == 'order_item_status_update' || $this->type == 'return_request_sent' || $this->type == 'return_request_status'){
            $order_item = OrderItem::with('user')->where('id',$this->order_id)->first();
             if($order_item) {

            $orderStatusList = OrderStatusList::where('id', $order_item->active_status)->first();
            $status_name = $orderStatusList->status;
      
            if ($this->type == 'return_request_sent') {
                $text = "You have a return request for ".$order_item->product_name . " - ". $order_item->variant_name ;
                $title = "You have a return request";
            } elseif($this->type == 'return_request_status'){
                $returnRequest = ReturnRequest::where('order_item_id', $order_item->id)->first();
                $status = $returnRequest->status;
                $remarks = $returnRequest->remarks;
                if($status == ReturnStatusList::$rPending){
                    $status_name = ReturnStatusList::$requestPending;
                }elseif($status == ReturnStatusList::$rApproved){
                    $status_name = ReturnStatusList::$requestApproved;
                }elseif($status == ReturnStatusList::$rRejected){
                    $status_name = ReturnStatusList::$requestRejected;
                }
                $text = "Return request for ".$order_item->product_name . " - ". $order_item->variant_name." has been ".$status_name;
                $title = "Return request for ".$order_item->product_name . " - ". $order_item->variant_name." has been ".$status_name;
                if($remarks != null){
                    $text .=  " Remark - ".$remarks;
                }
            } else {
                $text = "Order Item  #" . $order_item->product_name . " has been " . $status_name;
                $title = "Order Item Status Updated!";
            } 

            //Admin
           
            $adminTokens = AdminToken::where('user_id',$notifiable->id)->get()->pluck('fcm_token')->toArray();
            Log::info("adminTokens : ",[$adminTokens]);
            Log::info("notifiable : ",[$notifiable]);

            //Log::info("allUserTokens : ",[$allUserTokens]);
            if(count($adminTokens)>0){
                CommonHelper::sendNotification($adminTokens,$title ,$text,$this->type);
            }

            return [
                'type' => $this->type,
                'order_id' => $order_item->id,
                'text' => $text,
            ];
        }
        }
        else{
        $order = Order::with('user')->where('id',$this->order_id)->first();

        if($order) {

            $orderStatusList = OrderStatusList::where('id', $order->active_status)->first();
            $status_name = $orderStatusList->status;

            if ($order->active_status == OrderStatusList::$received) {
                $text = "You have " . $status_name . " new order  #" . $order->id;
                $title = "New Order!";
            } else {
                $text = "Order  #" . $order->id . " has been " . $status_name;
                $title = "Order Status Updated!";
            }

            //Admin
            Log::info("adminID : ",[$notifiable->id]);
            $adminTokens = AdminToken::where('user_id',$notifiable->id)->get()->pluck('fcm_token','platform')->toArray();
            Log::info("adminTokens : ",[$adminTokens]);
            Log::info("notifiable : ",[$notifiable]);

            //Log::info("allUserTokens : ",[$allUserTokens]);
            if(count($adminTokens)>0){
               
                CommonHelper::sendNotification($adminTokens,$title ,$text,$this->type);
            }

            return [
                'type' => $this->type,
                'order_id' => $order->id,
                'text' => $text,
            ];
        }
        }
    }
}
