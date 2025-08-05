<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::truncate();
        //$countries = json_decode(file_get_contents(base_path('config/Country.json')),true);
        $countries = json_decode(file_get_contents(base_path('config/Country.json')),true);
        Log::info($countries);
        Country::insert($countries);
    }
}
