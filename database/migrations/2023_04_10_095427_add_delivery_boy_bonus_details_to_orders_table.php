<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeliveryBoyBonusDetailsToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->json('delivery_boy_bonus_details')->after('delivery_boy_id')->nullable()->comment('Delivery boy bonus Details for bonus commission amount');
            $table->double('delivery_boy_bonus_amount')->after('delivery_boy_bonus_details')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('delivery_boy_bonus_details');
            $table->dropColumn('delivery_boy_bonus_amount');
        });
    }
}
