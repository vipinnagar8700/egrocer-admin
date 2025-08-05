<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Permission;
use App\Models\PermissionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class RoleApiController extends Controller
{
    public function index(){
        $roles = Role::get();
        return CommonHelper::responseWithData($roles);
    }

    public function getPermissions(){
        $categories = PermissionCategory::with('permissions')->get();
        $data['categories'] = $categories;
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $role = Role::where('name',$request->name)->first();
        if(!$role){
            $role = new Role();
            $role->name = $request->name;
            $role->guard_name = 'web';
            $role->save();

            if($request->permissions)
            {
                foreach($request->permissions as $permission) {
                    $res = $role->givePermissionTo(Permission::find($permission));
                    Log::info("givePermissionTo : ".$permission);
                    Log::info("givePermissionTo : ",[$res]);
                }
            }

            return CommonHelper::responseSuccess("Role Saved Successfully!");

        }else{
            return CommonHelper::responseError("Role Already Exist!");
        }

    }


    public function edit($id){
        $role = Role::find($id);
        $data = array();
        if($role){
            $categories = PermissionCategory::with('permissions')->get();
            $userPermissions = $role->permissions()->pluck('id')->toArray();

            $data['categories'] = $categories;
            $data['user_permissions'] = $userPermissions;
        }
        return CommonHelper::responseWithData($data);
    }

    public function update(Request $request){

        Log::info("Permission Update",[$request->all()]);

        $role = Role::find($request->id);
        Log::info("Role : ",[$role]);

        if($role){
            $role->name = $request->name;
            $role->save();

            $oldPermission = \DB::table('role_has_permissions')
                ->where('role_id',$role->id)
                ->get()->pluck('permission_id')->toArray();
            if(count($oldPermission)>0){
                $oldPermission = Permission::whereIn('id',$oldPermission)->get();
                $role->revokePermissionTo($oldPermission);
            }

            if($request->permissions)
            {
                foreach($request->permissions as $permission) {
                    $res = $role->givePermissionTo(Permission::find($permission));
                    Log::info("givePermissionTo : ".$permission);
                    Log::info("givePermissionTo : ",[$res]);
                }
            }
        }

        return CommonHelper::responseSuccess("Role Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $role = Role::find($request->id);
            if($role){
                $admins = Admin::where('role_id',$role->id)->get()->count();
                if($admins>0){
                    return CommonHelper::responseError("You cannot delete this role, This role assigned to ".$admins." users.");
                }
                $role->delete();
                return CommonHelper::responseSuccess("Role Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Role Already Deleted!");
            }
        }
    }
}
