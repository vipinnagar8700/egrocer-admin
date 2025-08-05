<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OrderStatusList extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\OrderStatusList::truncate();

        $allStatus = array("Payment Pending","Received","Processed","Shipped","Out For Delivery","Delivered","Cancelled","Returned");
        foreach ($allStatus as $status){
            \App\Models\OrderStatusList::create(['status'=>$status]);
        }
    }
}
