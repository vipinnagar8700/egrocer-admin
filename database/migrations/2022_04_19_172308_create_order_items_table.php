<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->index();
            $table->integer('order_id');
            $table->string('orders_id');
            $table->text('product_name')->nullable();
            $table->text('variant_name')->nullable();
            $table->integer('product_variant_id');
            $table->integer('delivery_boy_id')->nullable()->default(0);
            $table->integer('quantity');
            $table->float('price');
            $table->double('discounted_price');
            $table->float('tax_amount')->default(0);
            $table->float('tax_percentage')->default(0);
            $table->float('discount')->default(0);
            $table->float('sub_total');
            $table->string('status');
            $table->string('active_status');
            $table->integer('seller_id');
            $table->tinyInteger('is_credited')->nullable()->default(0);
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
        Schema::dropIfExists('order_items');
    }
}
