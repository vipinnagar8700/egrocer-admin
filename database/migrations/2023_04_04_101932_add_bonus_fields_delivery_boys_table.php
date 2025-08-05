<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Doctrine\DBAL\Types\FloatType;
use Doctrine\DBAL\Types\Type;


// class AddBonusTypeAndBonusMinAmountAndBonusMaxAmountDeliveryBoysTable extends Migration

class AddBonusFieldsDeliveryBoysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Type::hasType('double')) {
            Type::addType('double', FloatType::class);
        }

        Schema::table('delivery_boys', function (Blueprint $table) {
            $table->integer('bonus_type')->default(0)->after('address')->nullable()->comment('0 -> fixed/Salaried, 1 -> Commission');
            $table->double('bonus_min_amount')->default(0)->after('bonus')->nullable();
            $table->double('bonus_max_amount')->default(0)->after('bonus_min_amount')->nullable();
            $table->dropColumn('bonus');
            $table->double('bonus_percentage')->default(0)->after('bonus_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('delivery_boys', function (Blueprint $table) {
            $table->dropColumn('bonus_type');
            $table->dropColumn('bonus_min_amount');
            $table->dropColumn('bonus_max_amount');
            $table->dropColumn('bonus_percentage');
            $table->integer('bonus')->default(0)->after('address')->nullable();
        });
    }
}
