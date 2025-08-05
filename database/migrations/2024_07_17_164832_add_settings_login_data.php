<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSettingsLoginData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('settings')->insert([
            ['variable' => 'phone_login', 'value' => '1'],
            ['variable' => 'google_login', 'value' => '1'],
            ['variable' => 'apple_login', 'value' => '1'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')->where('variable', 'phone_login')->delete();
        DB::table('settings')->where('variable', 'google_login')->delete();
        DB::table('settings')->where('variable', 'apple_login')->delete();
    }
}
