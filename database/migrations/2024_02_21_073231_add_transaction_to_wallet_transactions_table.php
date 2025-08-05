<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTransactionToWalletTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('wallet_transactions', function (Blueprint $table) {
            $table->string('txn_id')->after('amount')->default(NULL);
            $table->string('payment_type')->after('txn_id')->default(NULL);
            $table->dateTime('transaction_date')->default(now())->after('payment_type');
            $table->string('status')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('wallet_transactions', function (Blueprint $table) {
            $table->dropColumn('txn_id');
            $table->dropColumn('payment_type');
            $table->dropColumn('transaction_date'); 
        });
    }
}
