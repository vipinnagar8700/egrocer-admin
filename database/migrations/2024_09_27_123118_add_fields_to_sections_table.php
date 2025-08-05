<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->string('position'); 
            $table->string('style_app'); 
            $table->string('banner_app')->nullable(); 
            $table->string('style_web'); 
            $table->string('banner_web')->nullable(); 
            $table->string('background_color_for_light_theme'); 
            $table->string('background_color_for_dark_theme'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sections', function (Blueprint $table) {
            $table->dropColumn('position');
            $table->dropColumn('style_app');
            $table->dropColumn('banner_app');
            $table->dropColumn('style_web');
            $table->dropColumn('banner_web');
            $table->string('background_color_for_light_theme'); 
            $table->string('background_color_for_dark_theme'); 
        });
    }
}
