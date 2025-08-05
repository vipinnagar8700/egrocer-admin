<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BrandsApiController extends Controller
{
    public function list(Request $request){
        $limit = $request->input('per_page', 10); // Default items per page
        $offset = (($request->input('page', 0))-1)*$limit; // Default page
        $filter = $request->input('filter', ''); // Filter query
    
        // Fetch paginated data
        $brands = Brand::orderBy('id', 'DESC');
        if ($filter) {
            $brands = $brands->where(function($query) use ($filter) {
                $query->where('name', 'like', "%{$filter}%");
            });
        }

        $total = $brands->count();
        $brands = $brands->skip($offset)->take($limit)->get();
        return CommonHelper::responseWithData($brands, $total);
    }

    public function save(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = 1;
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('brand', $file, $fileName);
        }
        $brand->image = $image;
        $brand->save();
        return CommonHelper::responseSuccess("Brands Saved Successfully!");
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if(isset($request->id)){

            $brand = Brand::find($request->id);
            $brand->name = $request->name;
            $brand->status = $request->status;

            if($request->hasFile('image')){
                @Storage::disk('public')->delete($brand->image);
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('brand', $file, $fileName);
                $brand->image = $image;
            }
            $brand->save();
        }
        return CommonHelper::responseSuccess("Brands Updated Successfully!");
    }

    public function delete(Request $request){

        if(isset($request->id)){

            $brand = Brand::find($request->id);
            if($brand){
                $brand->delete();
                return CommonHelper::responseSuccess("Brands Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Brands Already Deleted!");
            }
        }
    }

    public function getBrands(Request $request){
        $limit = $request->get('limit');
        $offset = $request->get('offset');
        $total = Brand::count();
        $query = Brand::orderBy('id', 'ASC')->where('status', 1);
        if ($limit > 0) {
            $query->skip($offset)->take($limit);
        }
        $brands = $query->get();
        return CommonHelper::responseWithData($brands, $total);
    }
}
