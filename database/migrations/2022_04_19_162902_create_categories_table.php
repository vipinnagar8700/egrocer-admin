<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->integer('row_order')->default(0);
            $table->string('name')->default(0);
            $table->string('slug')->nullable();
            $table->text('subtitle');
            $table->text('image');
            $table->tinyInteger('status')->default(1);
            $table->tinyInteger('product_rating')->default(0);
            $table->text('web_image')->nullable();
            $table->integer('parent_id')->default(0)->comment("0: Main Category, Other Sub category of id");
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
        Schema::dropIfExists('categories');
    }
}
