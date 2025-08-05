<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id')->nullable();
            $table->text('name')->nullable();
            $table->text('store_name')->nullable();
            $table->text('slug')->nullable();
            $table->text('email')->nullable();
            $table->text('mobile')->nullable();
            //$table->text('password');
            $table->integer('balance')->default(0);
            $table->text('store_url')->nullable();
            $table->text('logo')->nullable();
            $table->text('store_description')->nullable();
            $table->text('street')->nullable();
            $table->integer('pincode_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->text('state')->nullable();
            $table->text('categories')->nullable();
            $table->text('account_number')->nullable();
            $table->text('bank_ifsc_code')->nullable();
            $table->text('account_name')->nullable();
            $table->text('bank_name')->nullable();
            $table->integer('commission')->nullable()->default(0);
            $table->tinyInteger('status');
            $table->tinyInteger('require_products_approval')->default(0);
            $table->text('fcm_id')->nullable();
            $table->text('national_identity_card')->nullable();
            $table->text('address_proof')->nullable();
            $table->text('pan_number')->nullable();
            $table->text('tax_name')->nullable();
            $table->text('tax_number')->nullable();
            $table->tinyInteger('customer_privacy')->nullable()->default(0);
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('place_name')->nullable();
            $table->string('formatted_address')->nullable();
            $table->string('forgot_password_code')->nullable();
            $table->tinyInteger('view_order_otp')->default(0);
            $table->tinyInteger('assign_delivery_boy')->default(0);
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
        Schema::dropIfExists('sellers');
    }
}
