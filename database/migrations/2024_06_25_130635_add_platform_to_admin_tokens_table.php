<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPlatformToAdminTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admin_tokens', function (Blueprint $table) {
            $table->string('platform')->default('web')->after('fcm_token'); // Assuming 'token' is an existing column
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('admin_tokens', function (Blueprint $table) {
            $table->dropColumn('platform');
        });
    }
}
