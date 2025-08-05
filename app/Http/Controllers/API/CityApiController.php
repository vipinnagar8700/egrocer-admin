<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Permission;
use App\Models\PermissionCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class CityApiController extends Controller
{
    /*public function index(Request $request){}*/

    public function getCities(Request $request){

        if(!$request->limit){
            return CommonHelper::responseWithData(City::orderBy('id','desc')->get());
        }

        $limit = $request->get('limit',5);
        $offset = $request->get('offset',0);

        $query = City::select('*');

        // Apply search filters
        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', '%'.$searchTerm.'%')
                    ->orWhere('zone', 'like', '%'.$searchTerm.'%')
                    ->orWhere('state', 'like', '%'.$searchTerm.'%')
                    ->orWhere('formatted_address', 'like', '%'.$searchTerm.'%')
                    ->orWhere('latitude', 'like', '%'.$searchTerm.'%')
                    ->orWhere('longitude', 'like', '%'.$searchTerm.'%')
                    ->orWhere('max_deliverable_distance', 'like', '%'.$searchTerm.'%');
            });
        }

        // Apply sorting
        if ($request->has('sort_by')) {
            $sortColumn = $request->input('sort_by', 'id');
            $sortDirection = $request->input('sort_dir', 'desc dvfd');
            $query->orderBy($sortColumn, $sortDirection);
        }

        // Get the total count for pagination
        $total = $query->count();
        $cities = $query->skip($offset)->take($limit)->get();

        $data = array(
            "total" => $total,
            "cities" => $cities
        );
        return CommonHelper::responseWithData($data);

    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'latitude' => 'required',
            'longitude' => 'required',
            'name' => 'required',
            'zone' => 'required|unique:cities',
            'formatted_address' => 'required',
            'time_to_travel' => 'required',
            'delivery_charge_method' => 'required',
            'fixed_charge' => ($request->delivery_charge_method === 'fixed_charge')? 'required':'',
            'per_km_charge' => ($request->delivery_charge_method === 'per_km_charge')? 'required':'',
            'range_wise_charges' => ($request->delivery_charge_method === 'range_wise_charges')? 'required':''
        ],[
            'name.unique' => 'The :attribute has already been taken.',
        ],['name' => 'city name']);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $city = new City();
        $city->latitude = $request->latitude;
        $city->longitude = $request->longitude;
        $city->name = $request->name;
        $city->zone = $request->zone;
        $city->state = $request->state;
        $city->formatted_address = $request->formatted_address;
        $city->time_to_travel = $request->time_to_travel;
        $city->min_amount_for_free_delivery = $request->min_amount_for_free_delivery;
        $city->delivery_charge_method = $request->delivery_charge_method;
        $city->fixed_charge = ($request->fixed_charge)??0;
        $city->per_km_charge = ($request->per_km_charge)??0;
        $city->range_wise_charges = $request->range_wise_charges;
        $city->geolocation_type = $request->geolocation_type;
        $city->radius = $request->radius;
        $city->boundary_points = $request->boundary_points;
        $city->save();
        return CommonHelper::responseSuccess("City Saved Successfully!");
    }
    public function edit($id){
        $city = City::where('id',$id)->first();
        return CommonHelper::responseWithData($city);
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'latitude' => 'required',
            'longitude' => 'required',
            'name' =>'required',
            'zone' =>[ 'required',
                Rule::unique('cities')->where(function($query) use ($request) {
                    $query->where('id', '!=', $request->id);
                })
            ],
            'time_to_travel' => 'required',
            'delivery_charge_method' => 'required',
            'fixed_charge' => ($request->delivery_charge_method === 'fixed_charge')? 'required':'',
            'per_km_charge' => ($request->delivery_charge_method === 'per_km_charge')? 'required':'',
            'range_wise_charges' => ($request->delivery_charge_method === 'range_wise_charges')? 'required':'',
            'geolocation_type' => 'required',
            'boundary_points' => 'required',
        ],[
            'name.unique' => 'The :attribute has already been taken.',
        ],['name' => 'city name']);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $city = City::find($request->id);
        $city->latitude = $request->latitude;
        $city->longitude = $request->longitude;
        $city->name = $request->name;
        $city->zone = $request->zone;
        $city->state = $request->state;
        $city->formatted_address = $request->formatted_address;
        $city->time_to_travel = $request->time_to_travel;
        $city->min_amount_for_free_delivery = $request->min_amount_for_free_delivery;
        $city->max_deliverable_distance = $request->max_deliverable_distance;
        $city->delivery_charge_method = $request->delivery_charge_method;
        $city->fixed_charge = ($request->fixed_charge)?$request->fixed_charge:0;
        $city->per_km_charge = ($request->per_km_charge)?$request->per_km_charge:0;
        $city->range_wise_charges = $request->range_wise_charges;
        $city->geolocation_type = $request->geolocation_type;
        $city->radius = $request->radius;
        $city->boundary_points = $request->boundary_points;
        $city->save();
        return CommonHelper::responseSuccess("City Updated Successfully!");
    }

    public function save_boundary(Request $request){
        $validator = Validator::make($request->all(),[
            'geolocation_type' => 'required',
            'boundary_points' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $city = City::find($request->id);
        $city->geolocation_type = $request->geolocation_type;
        $city->radius = $request->radius;
        $city->boundary_points = $request->boundary_points;
        $city->save();
        return CommonHelper::responseSuccess("City Updated Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $role = City::find($request->id);
            if($role){
                $role->delete();
                return CommonHelper::responseSuccess("City Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("City Already Deleted!");
            }
        }
    }
}
