<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Role::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        Role::insert([
            ['name' => 'Super Admin','guard_name' => 'web'],
            ['name' => 'Admin','guard_name' => 'web'],
            ['name' => 'Seller','guard_name' => 'web'],
            ['name' => 'Delivery Boy','guard_name' => 'web'],
        ]);
    }
}
