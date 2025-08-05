<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('delivery_boy_id')->nullable();
            $table->unsignedBigInteger('transaction_id')->nullable();
            $table->string('orders_id')->nullable();
            $table->integer('otp')->nullable();
            $table->string('mobile');
            $table->text('order_note')->nullable();
            $table->float('total');
            $table->float('delivery_charge');
            $table->float('tax_amount')->default(0);
            $table->float('tax_percentage')->default(0);
            $table->float('wallet_balance');
            $table->float('discount')->default(0);
            $table->string('promo_code')->nullable();
            $table->float('promo_discount')->default(0);
            $table->float('final_total')->nullable();
            $table->string('payment_method');
            $table->text('address');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('delivery_time');
            $table->string('status');
            $table->string('active_status');
            $table->integer('order_from')->nullable()->default(0);
            $table->integer('pincode_id')->nullable()->default(0);
            $table->integer('address_id')->default(0);
            $table->integer('area_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
