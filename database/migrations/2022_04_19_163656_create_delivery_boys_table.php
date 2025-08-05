<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveryBoysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delivery_boys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id')->nullable();
            $table->unsignedBigInteger('city_id')->nullable();
            $table->string('name');
            $table->string('mobile');
            $table->text('order_note')->nullable();
            $table->text('address');
            $table->integer('bonus')->nullable()->default(0);
            $table->double('balance')->nullable()->default(0);
            $table->text('driving_license')->nullable();
            $table->text('national_identity_card')->nullable();
            $table->date('dob')->nullable();
            $table->text('bank_account_number')->nullable();
            $table->text('bank_name')->nullable();
            $table->text('account_name')->nullable();
            $table->text('ifsc_code')->nullable();
            $table->text('other_payment_information')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('is_available')->default(1);
            $table->string('fcm_id')->nullable();
            $table->integer('pincode_id')->nullable();
            $table->double('cash_received')->default(0);
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
        Schema::dropIfExists('delivery_boys');
    }
}
