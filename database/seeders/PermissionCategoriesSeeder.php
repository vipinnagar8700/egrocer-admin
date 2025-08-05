<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionCategoriesSeeder extends Seeder
{
    public function run()
    {
        \App\Models\PermissionCategory::truncate();

        $data = [
            ['name'=>'dashboard','guard_name'=>'web'],
            ['name'=>'order','guard_name'=>'web'],
            ['name'=>'category','guard_name'=>'web'],
            ['name'=>'product','guard_name'=>'web'],
            ['name'=>'seller','guard_name'=>'web'],
            ['name'=>'home_slider_image','guard_name'=>'web'],
            ['name'=>'new_offer_image','guard_name'=>'web'],
            ['name'=>'promo_code','guard_name'=>'web'],
            ['name'=>'return_request','guard_name'=>'web'],
            ['name'=>'withdrawal_request','guard_name'=>'web'],
            ['name'=>'delivery_boy','guard_name'=>'web'],
            ['name'=>'send_notification','guard_name'=>'web'],
            ['name'=>'email_template','guard_name'=>'web'],
            ['name'=>'system','guard_name'=>'web'],
            ['name'=>'web_settings','guard_name'=>'web'],
            ['name'=>'location','guard_name'=>'web'],
            ['name'=>'featured_section','guard_name'=>'web'],
            ['name'=>'customer','guard_name'=>'web'],
            ['name'=>'report','guard_name'=>'web'],
            ['name'=>'faq','guard_name'=>'web'],
        ];

        \App\Models\PermissionCategory::insert($data);
    }
}
