<?php

namespace Database\Seeders;

use App\Models\DeliveryBoy;
use App\Models\Role;
use App\Models\Seller;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Admin::truncate();
        \App\Models\User::truncate();
        \App\Models\Seller::truncate();
        \App\Models\DeliveryBoy::truncate();
        
        /*Admins*/
        $superAdmin = \App\Models\Admin::create([
            'username' => 'superadmin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => 1,
            'created_by' => 1,
        ]);
        $superAdmin->assignRole('Super Admin');

        $admin = \App\Models\Admin::create([
            'username' => 'Admin',
            'email' => 'admin2@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => 2,
            'created_by' => 1,
        ]);
        $admin->assignRole('Admin');

        /*Seller*/
        $seller = \App\Models\Admin::create([
            'username' => 'Seller',
            'email' => 'seller@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => Role::$roleSeller,
            'created_by' => 1,
        ]);
        $seller->assignRole(Role::$roleNameSeller);

        $sellerData = array();
        $sellerData['admin_id'] = 3;
        $sellerData['name'] = 'WRTeam';
        $sellerData['store_name'] = 'WRTeam';
        $sellerData['email'] = 'seller@mail.com';
        $sellerData['mobile'] = '9558192001';
        $sellerData['balance'] = 0;
        $sellerData['logo'] = '';
        $sellerData['store_description'] = 'WRTeam Store';
        $sellerData['street'] = 'Bhuj';
        $sellerData['status'] = 1;
        $sellerData['tax_name'] = 1;
        $sellerData['slug'] = '';
        $sellerData['city_id'] = 0;
        Seller::create($sellerData);

        /*Delivery Boy*/
        $deliveryBoy = \App\Models\Admin::create([
            'username' => 'Delivery Boy',
            'email' => 'delivery@gmail.com',
            'password' => bcrypt('123456'),
            'role_id' => Role::$roleDeliveryBoy,
            'created_by' => 1,
        ]);
        $deliveryBoy->assignRole(Role::$roleNameDeliveryBoy);
        $deliveryBoyData = array();
        $deliveryBoyData['admin_id'] = 4;
        $deliveryBoyData['name'] = 'Delivery Boy';
        $deliveryBoyData['mobile'] = '9558192002';
        $deliveryBoyData['balance'] = 0;
        $deliveryBoyData['address'] = "Bhuj";
        $deliveryBoyData['bonus'] = 0;
        $deliveryBoyData['status'] = 1;
        $deliveryBoyData['city_id'] = 0;
        DeliveryBoy::create($deliveryBoyData);

        /*Users*/
        $user = \App\Models\User::create([
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => bcrypt('123456'),
            'mobile' => 123456789,
            'status' => 1,
        ]);
    }
}
