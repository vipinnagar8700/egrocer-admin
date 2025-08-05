<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Setting;
use App\Models\SubCategory;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AddressApiController extends Controller
{
    public function getAddress(Request $request){

        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 10);
        $addresses = UserAddress::where('user_id',auth()->user()->id);

        if(isset($request->is_default) && $request->is_default == 1 ){
            $address = $addresses->where("is_default", 1)->get();

            if (count($address) > 0) {
                return CommonHelper::responseWithData($address);
            }else{
                $addresses = UserAddress::where('user_id',auth()->user()->id)->get();
                if (count($addresses) > 0) {
                    $address[0] = $addresses[0];
                    return CommonHelper::responseWithData($address);
                }
                return CommonHelper::responseError(__('address_not_found'));
            }
        }
        $total = $addresses->count();
        $addresses = $addresses->orderBy("is_default","DESC")->offset($offset)->limit($limit)->get();
        if(count($addresses)>0){
            return CommonHelper::responseWithData($addresses,$total);
        }else{
            return CommonHelper::responseError(__('address_not_found'));
        }
    }

    public function save(Request $request){
        $input = $request->all();
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'mobile' => 'required',
            'type' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'pincode' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $city = CommonHelper::getDeliverableCity($request->latitude, $request->longitude);
        
        $user_id = auth()->user()->id;
        $count = UserAddress::where('user_id',$user_id)->count();
        if($count == 0){
            $input['is_default'] = 1;
        }

        if(isset($request->is_default) && $request->is_default == 1 && $count > 0){
            UserAddress::where('user_id', '=', $user_id)->update(['is_default' => 0]);
        }

        $input['user_id'] = $user_id;
        $input['city_id'] = $city->id ?? 0;
        $address = UserAddress::create($input);

        $address->is_default = ($address->is_default == "0")?0:1; // this for type casting
        return CommonHelper::responseWithData($address);
    }

    public function update(Request $request){

        $input = $request->all();
        $validator = Validator::make($request->all(),[
            'id' => 'required',
            'name' => 'required',
            'mobile' => 'required',
            'type' => 'required',
            'address' => 'required',
            'pincode' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $city = CommonHelper::getDeliverableCity($request->latitude, $request->longitude);

        if(isset($request->is_default) && $request->is_default == 1 ){
            $user_id = auth()->user()->id;
            UserAddress::where('user_id', '=', $user_id)->update(['is_default' => 0]);
        }

        $address = UserAddress::where('id',$request->id)->first();
        if(!$address){
            return CommonHelper::responseError(__('address_not_found'));
        }




        $input['city_id'] = $city->id ?? 0;
        $address->update($input);

        $address->is_default = ($address->is_default == "0")?0:1; // this for type casting
        return CommonHelper::responseWithData($address);
    }

    public function delete(Request $reequest){
        $id = $reequest->id;
        $address = UserAddress::find($id);
        if(!$address){
            return CommonHelper::responseError(__('address_not_found'));
        }
        $address->delete();
        return CommonHelper::responseSuccess(__('address_deleted_successfully'));
    }
}
