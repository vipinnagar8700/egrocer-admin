<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->integer('supported_language_id')->nullable()->default(0);
            $table->integer('system_type')->comment('1 => Customer App, 2 => Seller and delivery boy App, 3 => Website, 4 => Admin panel');
            $table->json('json_data')->nullable();
            $table->integer('is_default')->nullable()->default(0)->comment('0 => No, 1 => Yes');
            $table->integer('status')->nullable()->default(1)->comment('0 => Deactive, 1 => Active');
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
        Schema::dropIfExists('languages');
    }
}
