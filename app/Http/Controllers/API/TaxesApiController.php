<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TaxesApiController extends Controller
{
    public function index(){
        $taxes = Tax::orderBy('id','DESC')->get();
        return CommonHelper::responseWithData($taxes);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'percentage' => 'required|numeric|between:1,100',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $tax = new Tax();
        $tax->title = $request->title;
        $tax->percentage = $request->percentage;
        $tax->status = 1;
        $tax->save();

        return CommonHelper::responseSuccess("Taxes Saved Successfully!");
    }

    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'percentage' => 'required|numeric|between:1,100',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $tax = Tax::find($request->id);
            $tax->title = $request->title;
            $tax->percentage = $request->percentage;
            $tax->status = $request->status;
            $tax->save();
        }
        return CommonHelper::responseSuccess("Taxes Updated Successfully!");
    }

    public function delete(Request $request){

        if(isset($request->id)){

            $tax = Tax::find($request->id);
            if($tax){
                $tax->delete();
                return CommonHelper::responseSuccess("Taxes Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Taxes Already Deleted!");
            }
        }
    }

    public function getTaxes(Request $request){
        $limit = $request->get('limit');
        $offset = $request->get('offset');
        $total = Tax::count();
        $query = Tax::orderBy('id', 'ASC');
        if ($limit > 0) {
            $query->skip($offset)->take($limit);
        }
        $taxes = $query->get();
        return CommonHelper::responseWithData($taxes, $total);
    }
}
