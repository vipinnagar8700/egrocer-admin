<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDatabaseBackupDownloadToPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Artisan::call('cache:forget spatie.permission.cache');
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        /*Role Wise Permissions*/

        /*Super Admin and Admin*/
        $permissionsToSeed = [ 
           
            [
                'name' => ['database_backup_download'],
                'category_name' => 'database_backup',
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
            
                if ($adminRole) {
                    $adminRole->givePermissionTo($record['name']);
                } else {
                    // Handle the case where the role is not found (e.g., log an error)
                    \Log::error("Role not found: $roleName");
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function (Blueprint $table) {
            //
        });
    }
}
