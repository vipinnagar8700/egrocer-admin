<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLoginInfoToAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->tinyInteger('status')->default(1)->after('remember_token')->comment('1 => Active, 0 => Inactive');
            $table->timestamp('login_at')->nullable()->after('status');
            $table->timestamp('last_active_at')->nullable()->after('login_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('admins', function (Blueprint $table) {
            $table->dropColumn('login_at');
            $table->dropColumn('last_active_at');
        });
    }
}
