<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Setting::truncate();

        $settings = [
            [
                'variable' => 'app_name',
                'value' => 'eGrocer',
            ],
            [
                'variable' => 'support_number',
                'value' => '',
            ],
            [
                'variable' => 'support_email',
                'value' => 'support@gmail.com',
            ],
            [
                'variable' => 'logo',
                'value' => '',
            ],
            [
                'variable' => 'purchase_code',
                'value' => '',
            ],
            [
                'variable' => 'stripe_secret_key',
                'value' => '',
            ],
            [
                'variable' => 'stripe_publishable_key',
                'value' => '',
            ],
            [
                'variable' => 'stripe_webhook_secret_key',
                'value' => '',
            ],
        ];

        foreach ($settings as $setting){
            Setting::create($setting);
        }
    }
}
