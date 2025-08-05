<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateEmailTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_templates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('message');
            $table->string('type');
            $table->timestamps();
        });

        // Insert initial data
        DB::table('email_templates')->insert([
            [
                'id' => 1,
                'title' => 'Unlock 20% Off – Just for You!',
                'message' => "Hi [First Name],\nWe’re excited to offer you an exclusive 20% discount on our most popular items! Don’t miss out – this special offer is only valid until [Date].\n\nClick below to shop and save:\n[Link Here]\n\nHurry, your discount awaits!",
                'type' => 'Exclusive Discount Offer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('email_templates');
    }
}
