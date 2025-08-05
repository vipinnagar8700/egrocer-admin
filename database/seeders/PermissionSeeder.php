<?php
namespace Database\Seeders;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        \Artisan::call('cache:forget spatie.permission.cache');
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \App\Models\Permission::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        /*Role Wise Permissions*/

        /*Super Admin and Admin*/
        $permissionsToSeed = [ 
            [
                'name' => ['manage_dashboard'],
                'category_name' => 'dashboard',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*Orders*/
            [
                'name' => ['order_list','order_update','order_delete'],
                'category_name' => 'order',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*Categories*/
            [
                'name' => ['category_list','category_create','category_update','category_delete',
                    'manage_categories_order'],
                'category_name' => 'category',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*Products*/
            [
                'name' => ['product_list','product_create','product_update','product_delete',
                    'manage_media','manage_product_bulk_upload','manage_product_order','approve_requests','product_ratings','taxes','brands','stock_management'],
                'category_name' => 'product',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*Sellers*/
            [
                'name' => ['seller_list','seller_create','seller_update','seller_delete','seller_requests','seller_wallet_transactions'],
                'category_name' => 'seller',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*home_slider_image*/
            [
                'name' => ['home_slider_image_list','home_slider_image_create','home_slider_image_update','home_slider_image_delete'],
                'category_name' => 'home_slider_image',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*new_offer_image_list*/
            [
                'name' => ['new_offer_image_list','new_offer_image_create','new_offer_image_update','new_offer_image_delete'],
                'category_name' => 'new_offer_image',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*promo_code*/
            [
                'name' => ['promo_code_list','promo_code_create','promo_code_update','promo_code_delete'],
                'category_name' => 'promo_code',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*return_request*/
            [
                'name' => ['return_request_list','return_request_update','return_request_delete'],
                'category_name' => 'return_request',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*withdrawal_request*/
            [
                'name' => ['withdrawal_request_list','withdrawal_request_update','withdrawal_request_delete'],
                'category_name' => 'withdrawal_request',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*delivery_boy*/
            [
                'name' => ['delivery_boy_list','delivery_boy_create','delivery_boy_update','delivery_boy_delete',
                    'fund_transfers_list','fund_transfers_create','cash_collection_list','cash_collection_create'],
                'category_name' => 'delivery_boy',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*send_notification*/
            [
                'name' => ['notification_list','notification_create','notification_delete'],
                'category_name' => 'send_notification',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*email_template*/
            [
                'name' => ['email_templates','create_email_template','delete_email_template','manage_emails','create_email','delete_email'],
                'category_name' => 'email_template',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*system*/
            [
                'name' => [
                    'manage_time_slots','time_slot_create','time_slot_update','time_slot_delete',
                    'manage_store_settings',
                    'manage_units','unit_create','unit_update',
                    'manage_payment_methods',
                    'manage_Notification_settings','manage_contact_us',
                    'manage_about_us', 'manage_privacy_policy',
                    'manage_privacy_policy_delivery_boy','manage_privacy_policy_manager_app',
                    'manage_privacy_policy_seller_app','manage_secret_key','manage_shipping_methods','manage_system_registration'],
                'category_name' => 'system',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*web_settings*/
            [
                'name' => ['general_settings','manage_social_media_list','manage_social_media_create',
                    'manage_social_media_delete','manage_social_media_update',
                    'manage_about','manage_policies'],
                'category_name' => 'web_settings',
                'default_roles' => ['Super Admin','Admin']
            ],


            /*location*/
            [
                'name' => ['city_list','city_create','city_update','city_delete',
                    'manage_deliverable_area'],
                'category_name' => 'location',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*featured_section*/
            [
                'name' => ['featured_section_list',
                    'featured_section_create','featured_section_update','featured_section_delete'
                ],
                'category_name' => 'featured_section',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*customer*/
            [
                'name' => ['customer_list','customer_update','customer_delete','manage_wishlists',
                    'transaction_list','manage_customer_wallet'],
                'category_name' => 'customer',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*report*/
            [
                'name' => ['product_sales_reports','sales_reports'],
                'category_name' => 'report',
                'default_roles' => ['Super Admin','Admin']
            ],

            /*faq*/
            [
                'name' => ['faq_list','faq_create','faq_update'],
                'category_name' => 'faq',
                'default_roles' => ['Super Admin','Admin']
            ],
        ];
        foreach ($permissionsToSeed as $record) {

            foreach ($record['name'] as $permissionName) {

                \App\Models\Permission::create([
                    'name' => $permissionName,
                    'category_id' => \App\Models\PermissionCategory::where('name', $record['category_name'])->first()->id,
                ]);
            }

            foreach ($record['default_roles'] as $roleName) {
                $adminRole = \Spatie\Permission\Models\Role::where('name', $roleName)->first();
                $adminRole->givePermissionTo($record['name']);
            }
        }

/**********************************************************************************************/

        /*Seller*/
        $permissionsToSeed = [
            [
                'name' => ['manage_dashboard'],
                'category_name' => 'dashboard',
                'default_roles' => ['Seller']
            ],

            /*Orders*/
            [
                'name' => ['order_list','order_update','order_delete'],
                'category_name' => 'order',
                'default_roles' => ['Seller']
            ],

            /*Categories*/
            [
                'name' => ['category_list'],
                'category_name' => 'category',
                'default_roles' => ['Seller']
            ],

            /*Products*/
            [
                'name' => ['product_list','product_create','product_update','product_delete',
                    'manage_media','manage_product_bulk_upload','manage_product_order','approve_requests','product_ratings','taxes','brands','stock_management'],
                'category_name' => 'product',
                'default_roles' => ['Super Admin','Admin','Seller']
            ],

            /*return_request*/
            [
                'name' => ['return_request_list','return_request_update','return_request_delete'],
                'category_name' => 'return_request',
                'default_roles' => ['Seller']
            ],

            /*report*/
            [
                'name' => ['product_sales_reports','sales_reports'],
                'category_name' => 'report',
                'default_roles' => ['Seller']
            ],
        ];
        foreach ($permissionsToSeed as $record) {

            /*foreach ($record['name'] as $permissionName) {

                \App\Models\Permission::create([
                    'name' => $permissionName,
                    'category_id' => \App\Models\PermissionCategory::where('name', $record['category_name'])->first()->id,
                ]);
            }*/

            foreach ($record['default_roles'] as $roleName) {
                $adminRole = \Spatie\Permission\Models\Role::where('name', $roleName)->first();
                $adminRole->givePermissionTo($record['name']);
            }
        }

/**********************************************************************************************/

        /*Delivery Boy*/
        $permissionsToSeed = [
            [
                'name' => ['manage_dashboard'],
                'category_name' => 'dashboard',
                'default_roles' => [Role::$roleNameDeliveryBoy]
            ],

            /*Orders*/
            [
                'name' => ['order_list','order_update','order_delete'],
                'category_name' => 'order',
                'default_roles' => [Role::$roleNameDeliveryBoy]
            ],

            /*report*/
            [
                'name' => ['product_sales_reports','sales_reports'],
                'category_name' => 'report',
                'default_roles' => [Role::$roleNameDeliveryBoy]
            ],
        ];
        foreach ($permissionsToSeed as $record) {
            foreach ($record['default_roles'] as $roleName) {
                $adminRole = \Spatie\Permission\Models\Role::where('name', $roleName)->first();
                $adminRole->givePermissionTo($record['name']);
            }
        }

    }
}
