<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddReasonToReturnRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('return_requests', function (Blueprint $table) {
            $table->text('reason')->after('order_item_id');
            $table->integer('delivery_boy_id')->after('remarks');
            $table->dropColumn('product_id');
            $table->unique('order_item_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('return_requests', function (Blueprint $table) {
            $table->dropColumn('reason');
            $table->dropColumn('delivery_boy_id');
            $table->dropUnique(['order_item_id']);
        });
    }
}
