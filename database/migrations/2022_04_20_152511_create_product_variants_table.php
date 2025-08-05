<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id');
            $table->string('type');
            $table->integer('status')->default(1)->comment("(1: Available, 0: Sold Out)");
            $table->float('measurement');
            //$table->integer('measurement_unit_id');
            $table->float('price', 11, 2);
            $table->float('discounted_price', 11, 2)->default(0);
            $table->float('stock', 11, 2)->default(0);
            $table->integer('stock_unit_id')->default(0);
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
        Schema::dropIfExists('product_variants');
    }
}
