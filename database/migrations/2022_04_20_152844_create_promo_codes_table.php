<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromoCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('promo_code');
            $table->string('message');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('no_of_users');
            $table->integer('minimum_order_amount');
            $table->integer('discount');
            $table->string('discount_type');
            $table->integer('max_discount_amount');
            $table->tinyInteger('repeat_usage')->comment('1-allowed, 0-Not Allowed');
            $table->integer('no_of_repeat_usage')->default(0)->comment('if repeat_usage = allowed(1) else NULL');
            $table->tinyInteger('status')->default(1)->comment('1-active, 0-deactive');
            $table->string('image');
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
        Schema::dropIfExists('promo_codes');
    }
}
