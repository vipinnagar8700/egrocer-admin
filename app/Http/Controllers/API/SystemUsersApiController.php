<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Section;
use App\Models\Setting;
use App\Models\WithdrawalRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class SystemUsersApiController extends Controller
{
    public function index(){

        if(env('DEMO_MODE')){
            $records = Admin::with('role')->where('id','!=', 1)->orderBy('id','DESC')->get();
        }else{
            $records = Admin::with('role')->orderBy('id','DESC')->get();
        }



        $roles = Role::all();

        $data = [
            'records' => $records,
            'roles' => $roles,
        ];

        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'email' => 'required|unique:admins,email',
            'role_id' => 'required',
            'password' => 'min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password' => 'min:6',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $admin = new Admin();
        $admin->username = $request->username;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        $admin->created_by = auth()->user()->id;
        $admin->role_id = $request->role_id;
        $admin->save();

        //Assign Role
        $role = Role::where('id',$request->role_id)->first();
       

        return CommonHelper::responseSuccess("System User Saved Successfully!");
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'role_id' => 'required',
            'username' => 'required',
            'email' => 'required|unique:admins,email,'.$request->id,
        ]);

        if(isset($request->password) && $request->password!=''){
            $validator = Validator::make($request->all(),[
                'id' => 'required',
                'username' => 'required',
                'email' => 'required|unique:admins,email,'.$request->id,
                'password' => 'min:6|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:6',
            ]);
        }

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $admin = Admin::find($request->id);
            $admin->username = $request->username;
            $admin->email = $request->email;
            $admin->role_id = $request->role_id;
            if(isset($request->password) and $request->password!=''){
                $admin->password = bcrypt($request->password);
            }
            
            $role = Role::where('id',$request->role_id)->first();
          
            $admin->save();
        }
        return CommonHelper::responseSuccess("System User Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $admin = Admin::find($request->id);
            if($admin){
                $admin->delete();
                return CommonHelper::responseSuccess("System User Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("System User Already Deleted!");
            }
        }
    }

    public function changePassword(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'current_password' => 'required|unique:admins,email',
            'password' => 'required|min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = auth()->user();

        if (!Hash::check(request()->current_password, $user->password)) {
            return CommonHelper::responseError("Incorrect current password");
        }

        $user->username = $request->username;
        $user->password = bcrypt($request->password);
        $user->save();

        return CommonHelper::responseSuccess("Username & Password Changed Successfully!");
    }
}
