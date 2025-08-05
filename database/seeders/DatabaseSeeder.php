<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);

        // $this->call(AdminSeeder::class);

        $this->call(PermissionCategoriesSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(OrderStatusList::class);
        $this->call(CountrySeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(SupportedLanguageSeeder::class);

        //$this->call(Demo::class);
    }
}
