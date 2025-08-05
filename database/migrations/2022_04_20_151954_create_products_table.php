<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->integer('seller_id')->nullable();
            $table->integer('row_order');
            $table->string('name');
            $table->string('tags')->nullable();
            $table->tinyInteger('tax_id')->nullable()->default(0);
            $table->integer('brand_id')->nullable()->default(0);
            $table->string('slug');
            $table->integer('category_id');
            $table->tinyInteger('indicator')->nullable()->comment("0 - none | 1 - veg | 2 - non-veg");
            $table->string('manufacturer')->nullable();
            $table->string('made_in')->nullable();
            $table->tinyInteger('return_status')->nullable();
            $table->tinyInteger('cancelable_status')->nullable();
            $table->string('till_status')->nullable();
            $table->text('image');
            $table->string('other_images')->nullable();
            $table->text('description');
            $table->integer('status')->default(0);
            $table->integer('is_approved')->nullable();
            $table->integer('return_days')->default(0);
            $table->text('type')->nullable();
            $table->integer('is_unlimited_stock')->default(0)->comment("0 = Limited & 1 = Unlimited");
            //$table->text('pincodes')->nullable();
            $table->tinyInteger('cod_allowed');
            $table->integer('total_allowed_quantity');
            $table->tinyInteger('tax_included_in_price')->default(0);
            //$table->tinyInteger('standard_shipping');
            //$table->string('pickup_location')->nullable();
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
        Schema::dropIfExists('products');
    }
}
