<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice', function (Blueprint $table) {
            $table->id();
            $table->date('invoice_date');
            $table->integer('order_id');
            $table->text('name');
            $table->text('address');
            $table->dateTime('order_date');
            $table->string('phone_number');
            $table->text('order_list');
            $table->string('email');
            $table->string('discount');
            $table->string('total_sale');
            $table->string('shipping_charge');
            $table->text('payment');
            $table->integer('order_item_id');
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
        Schema::dropIfExists('invoice');
    }
}
