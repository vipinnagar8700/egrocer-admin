<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('state');
            $table->string('formatted_address');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('min_amount_for_free_delivery')->nullable();
            $table->string('delivery_charge_method')->nullable();
            $table->integer('fixed_charge')->default(0);
            $table->integer('per_km_charge')->default(0);
            $table->text('range_wise_charges')->nullable();
            $table->integer('time_to_travel')->default(0);
            $table->string('geolocation_type')->nullable();
            $table->string('radius')->nullable()->default(0);
            $table->text('boundary_points')->nullable();
            $table->integer('max_deliverable_distance')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cities');
    }
}
