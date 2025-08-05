<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateSmsTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_templates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->string('type');
            $table->timestamps();
        });

        // Insert initial data
        DB::table('sms_templates')->insert([
            [
                'id' => 1,
                'title' => 'Your Order Has Been Placed - Order #{order.id}',
                'message' => 'Dear [Customer Name], your order #[Order ID] has been successfully placed. You will receive updates as your order is processed. Thank you for shopping with us!',
                'type' => 'customer_place_order',
                'created_at' => now()
            ],
            [
                'id' => 2,
                'title' => 'Payment Pending for Order #{order.id}',
                'message' => "Dear [Customer Name], your order [Order ID] is awaiting payment. Please complete the payment to process your order. If you need assistance, contact [Support Contact].",
                'type' => 'customer_order_payment_pending',
                'created_at' => now()
            ],
            [
                'id' => 3,
                'title' => 'Your Order Has Been Received - Order #{order.id}',
                'message' => "Dear [Customer Name], we have received your order [Order ID] and it's now being processed. You will receive updates on shipping soon. Thank you for choosing [Store Name]!",
                'type' => 'customer_order_received',
                'created_at' => now()
            ],
            [
                'id' => 4,
                'title' => 'Your Order Has Been Processed - Order #{order.id}',
                'message' => "Dear [Customer Name], your order [Order ID] has been processed and is ready for shipment. You will be notified once it's on the way. Thank you for shopping with us!",
                'type' => 'customer_order_processed',
                'created_at' => now()
            ],
            [
                'id' => 5,
                'title' => 'Your Order Has Been Shipped - Order #{order.id}',
                'message' => "Dear [Customer Name], your order [Order ID] has been shipped. Thank you for choosing [Store Name]!",
                'type' => 'customer_order_shipped',
                'created_at' => now()
            ],
            [
                'id' => 6,
                'title' => 'Your Order is Out for Delivery - Order #{order.id}',
                'message' => "Dear [Customer Name], your order [Order ID] is out for delivery and will reach you soon. Please be available to receive your package. Thank you!",
                'type' => 'customer_order_out_for_delivery',
                'created_at' => now()
            ],
            [
                'id' => 7,
                'title' => 'Your Order Has Been Delivered - Order #{order.id}',
                'message' => "Dear [Customer Name], your order [Order ID] has been successfully delivered. We hope you enjoy your purchase. Thank you for shopping at [Store Name]!",
                'type' => 'customer_order_delivered',
                'created_at' => now()
            ],
            [
                'id' => 8,
                'title' => 'Your Order Has Been Cancelled - Order #{order.id}',
                'message' => "Dear [Customer Name], your order Item [Product Name] from Order [Order ID] has been cancelled. If you have any questions or wish to place a new order, please contact [Support Contact].",
                'type' => 'customer_order_cancelled',
                'created_at' => now()
            ],
            [
                'id' => 9,
                'title' => 'Return Request Received for Order #{order.id}',
                'message' => "Dear [Customer Name], we have received your return request for order Item [Product Name] from Order [Order ID]. Our team will review it and get back to you shortly with the next steps.",
                'type' => 'customer_order_return_request',
                'created_at' => now()
            ],
            [
                'id' => 10,
                'title' => 'Return Request Approved - Order #{order.id}',
                'message' => "Dear [Customer Name], your return request for order Item [Product Name] from Order [Order ID] has been approved. The refund amount will be credited to your wallet. Thank you!",
                'type' => 'customer_order_confirm_return_request',
                'created_at' => now()
            ],
            [
                'id' => 11,
                'title' => 'Return Request Rejected - Order #{order.id}',
                'message' => "Dear [Customer Name], your return request for order Item [Product Name] from Order [Order ID] has been rejected. Reason: [Reason]. If you have any questions, please contact our support team. Thank you for understanding.",
                'type' => 'customer_order_reject_return_request',
                'created_at' => now()
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sms_templates');
    }
}
