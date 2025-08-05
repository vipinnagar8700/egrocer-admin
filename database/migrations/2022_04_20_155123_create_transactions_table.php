<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            //$table->string('transaction_type')->nullable();
            $table->integer('user_id')->index();
            $table->string('order_id')->index();
            $table->string('type');
            $table->string('txn_id');
            $table->string('payu_txn_id')->nullable();
            $table->double('amount');
            $table->string('status');
            $table->string('message');
            $table->dateTime('transaction_date');
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
        Schema::dropIfExists('transactions');
    }
}
