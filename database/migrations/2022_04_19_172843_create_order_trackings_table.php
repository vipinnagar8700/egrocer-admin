<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderTrackingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_trackings', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('order_item_id');
            $table->integer('shiprocket_order_id');
            $table->integer('shipment_id');
            $table->integer('courier_company_id')->nullable();
            $table->string('awb_code')->nullable();
            $table->string('tracking_url')->nullable();
            $table->integer('pickup_status');
            $table->string('pickup_scheduled_date');
            $table->string('pickup_token_number');
            $table->integer('status');
            $table->string('others');
            $table->string('pickup_generated_date');
            $table->string('data');
            $table->string('date');
            $table->integer('is_canceled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_trackings');
    }
}
