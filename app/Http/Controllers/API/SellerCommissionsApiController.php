<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Seller;
use App\Models\SellerCommission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SellerCommissionsApiController extends Controller
{
    public function index(){
        $sellerCommissions = SellerCommission::select('seller_commissions.*', 'categories.name as category_name', 'sellers.name as seller_name')
            ->leftJoin('sellers', 'seller_commissions.seller_id', '=', 'sellers.id')
            ->leftJoin('categories', 'seller_commissions.category_id', '=', 'categories.id')
            ->orderBy('id','DESC')->get()->toArray();
           
        return CommonHelper::responseWithData($sellerCommissions);
    }
    public function formData($seller_id){
        $seller = Seller::where('id',$seller_id)->first()->toArray();
        $category_ids = explode(",",$seller["categories"]);
        $categories = Category::orderBy('id','ASC')->whereIn('id',$category_ids)->get()->toArray();
        $sellerCommissions = SellerCommission::select('seller_commissions.*', 'categories.name as category_name', 'sellers.name as seller_name')
                    ->leftJoin('sellers', 'seller_commissions.seller_id', '=', 'sellers.id')
                    ->leftJoin('categories', 'seller_commissions.category_id', '=', 'categories.id')
                    ->orderBy('seller_commissions.category_id','ASC')->where('seller_commissions.seller_id',$seller_id)->get()->toArray();
        $commissions = array();
        if (count($sellerCommissions) !== 0){
            foreach ($sellerCommissions as $key => $sellerCommission)
            {
                $commission = array();
                $commission["id"] = $sellerCommission["id"];
                $commission["seller_id"] = $sellerCommission["seller_id"];
                $commission["category_id"] = $sellerCommission["category_id"];
                $commission["category_name"] = $sellerCommission["category_name"];
                $commission["commission"] = $sellerCommission["commission"];
                $commissions[] = $commission;
            }
        }else{
            foreach ($categories as $key => $category)
            {
                $commission = array();
                $commission["id"] = "";
                $commission["seller_id"] = $seller_id;
                $commission["category_id"] = $category["id"];
                $commission["category_name"] = $category["name"];
                $commission["commission"] = "";
                $commissions[] = $commission;
            }
        }
        return CommonHelper::responseWithData($commissions);
    }
    public function save(Request $request){
        foreach ($request->all() as $key => $formData){
            if (isset($formData["id"])) {
                $commission = SellerCommission::where('id', $formData["id"])->first();
            }else{
                $commission = new SellerCommission();
            }
            $commission->seller_id = $formData['seller_id'];
            $commission->category_id = $formData['category_id'];
            $commission->commission = $formData['commission'];
            $commission->save();
        }
        return CommonHelper::responseSuccess("Seller category wise commission saved successfully!");
    }
}
