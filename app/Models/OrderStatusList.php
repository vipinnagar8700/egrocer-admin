<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatusList extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $paymentPending = 1;
    public static $received = 2;
    public static $processed = 3;
    public static $shipped = 4;
    public static $outForDelivery = 5;
    public static $delivered = 6;
    public static $cancelled = 7;
    public static $returned = 8;

    public static $orderPaymentPending = "Payment Pending";
    public static $orderReceived = "Received";
    public static $orderProcessed = "Processed";
    public static $orderShipped = "Shipped"; 
    public static $orderOutForDelivery = "Out For Delivery";
    public static $orderDelivered = "Delivered";
    public static $orderCancelled = "Cancelled";
    public static $orderReturned = "Returned";
}
