<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

 //2022_04_20_155528_create_users_table.php to 2014_10_12_000000_create_users_table.php

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('password')->nullable();
            $table->string('profile')->nullable();
            $table->string('country_code')->default(91);
            $table->string('mobile');
            $table->string('auth_uid');
            $table->double('balance')->default(0.00);
            $table->string('referral_code')->nullable();
            $table->string('friends_code')->nullable();
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('users');
    }
}
