<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\DeliveryBoyNotification;
use App\Models\Favorite;
use App\Models\OrderItem;
use App\Models\Pincode;
use App\Models\Product;
use App\Models\Section;
use App\Models\Tax;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SectionsApiController extends Controller
{
    public function getSections(Request $request){

        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
        ],[
            'latitude.required' => 'The latitude field is required.',
            'longitude.required' => 'The longitude field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : '';

        $limit = ($request->limit)??12;
        $offset = ($request->offset)??0;
        $sort1 = $request->get('sort','row_order');
        $sort = '';
        $order = '';

        $section_id = ($request->section_id)??'';
        $pincode_id = ($request->pincode_id)??'';

        $where = "";
        $price = 'MIN(price)';
        if (empty($section_id) && $section_id == "") {
            if ($sort1 == 'new') {
                $sort = 'created_at DESC';
                $price = 'MIN(price)';
                $price_sort = ' price ASC';
            } elseif ($sort1 == 'old') {
                $sort = 'created_at ASC';
                $price = 'MIN(price)';
                $price_sort = ' price ASC';
            } elseif ($sort1 == 'high') {
                $sort = ' price DESC';
                $price = 'MAX(price)';
                $price_sort = ' price DESC';
            } elseif ($sort1 == 'low') {
                $sort = ' price ASC';
                $price = 'MIN(price)';
                $price_sort = ' price ASC';
            } else {
                $sort = ' p.row_order ASC';
                $price = 'MIN(price)';
                $price_sort = ' price ASC';
            }
        }

        if ($sort == 'row_order') {
            $order = 'ASC';
        } else {
            $order = ($request->order)??'DESC';
        }

        if (isset($request->search) && $request->search != '') {
            $search = $request->search;
            $where .= "AND (p.`id` like '%" . $search . "%' OR p.`name` like '%" . $search . "%' OR s.`name` like '%" . $search . "%' OR p.`category_id` like '%" . $search . "%' OR p.`slug` like '%" . $search . "%' OR p.`description` like '%" . $search . "%') ";
        }

        if (isset($request->product_id) && !empty($request->product_id) && is_numeric($request->product_id)) {
            $product_id = ($request->product_id)??'';
            $where .= "AND p.`id` = " . $product_id;
        }

        if (isset($request->seller_slug) && !empty($request->seller_slug)) {
            $seller_slug = $request->seller_slug;
            $where .= "AND s.`slug` =  '$seller_slug' ";
        }

        if (isset($request->slug) && !empty($request->slug)) {
            $slug = $request->slug;
            $where .= "AND p.`slug` =  '$slug' ";
        }

        if (isset($request->seller_id) && !empty($request->seller_id) && is_numeric($request->seller_id)) {
            $seller_id = $request->seller_id;
            $where .= "AND p.`seller_id` = " . $seller_id;
        }

        if (isset($request->category_id) && !empty($request->category_id) && is_numeric($request->category_id)) {
            $category_id = $request->category_id;
            $where .= "AND p.`category_id`=" . $category_id;
        }

        if (isset($request->pincode_id) && $request->pincode_id != "") {
            $pincode_id = $request->pincode_id;
            $where .=  "AND (p.type='included' and FIND_IN_SET('$pincode_id', p.pincodes) OR (p.type='excluded' and NOT FIND_IN_SET('$pincode_id', p.pincodes)) or p.type='all')";
        }
        if (isset($request->pincode) && $request->pincode != "") {
            $pincode = $request->pincode;
            $where .=  "AND (((p.type='included' and FIND_IN_SET($pincode_id, p.pincodes)) OR (p.type='excluded' and NOT FIND_IN_SET($pincode_id, p.pincodes))) or p.type='all')";
        }

        if (isset($request->section_id) && $request->section_id != "") {
            $section_id = $request->section_id;
            $section = Section::select("*")->where("id","=",$section_id)->first();

            $cate_ids = $section->category_ids;
            $product_ids = $section->product_ids;

            if ($section->product_type == 'all_products') {
                if (empty($section->category_ids)) {
                    $sql = Product::select("id as product_id")->where("status", "=", 1)->orderBy("product_id","DESC");
                    $sort .= " p.created_at ";
                    $order = " DESC ";
                } else {
                    $sql = Product::select("id as product_id")->whereIn("category_id", "=", [$cate_ids])->orderBy("product_id","DESC");
                    $sort .= " p.created_at ";
                    $order = " DESC ";
                }
            } elseif ($section->product_type == 'new_added_products') {
                if (empty($section->category_ids)) {
                  
                    $sql = Product::select("id as product_id")->where("status", "=", 1)->orderBy("created_at","DESC");
                    $sort .= " p.id ";
                    $order = " DESC ";
                } else {
                    $sql = Product::select("id as product_id")->where("status", "=", 1)->whereIn("category_id", "=", [$cate_ids])->orderBy("id","DESC");
                    $sort .= "p.date_added";
                    $order = " DESC ";
                }
            } elseif ($section->product_type == 'products_on_sale') {
                if (empty($section->category_ids)) {
                    $sql = Product::select("p.id as product_id")->from("products as p")
                        ->leftJoin('product_variants as pv', 'pv.product_id', '=', 'p.id')
                        ->where("p.status", "=", 1)
                        ->where("pv.discounted_price", ">", 0)
                        ->where("pv.price", "=", "pv.discounted_price")
                        ->orderBy("p.id","DESC");
                    $sort .= " p.id ";
                    $order = " DESC ";
                } else {
                    $sql = Product::select("p.id as product_id")->from("products as p")
                        ->leftJoin('product_variants as pv', 'pv.product_id', '=', 'p.id')
                        ->where("p.status", "=", 1)
                        ->whereIn("category_id", "=", [$cate_ids])
                        ->where("pv.discounted_price", ">", 0)
                        ->where("pv.price", "=", "pv.discounted_price")
                        ->orderBy("p.id","DESC");
                    $sort .= " p.id ";
                    $order = " DESC ";
                }
            } elseif ($section->product_type == 'most_selling_products') {
                if (empty($section->category_ids)) {

                    $sql = OrderItem::select("p.id as product_id", DB::raw("COUNT(oi.product_variant_id) AS total"))
                        ->from("order_items as oi")
                        ->leftJoin("product_variants as pv", "oi.product_variant_id", "=", "pv.id")
                        ->leftJoin("products as p", "pv.product_id", "=", "p.id")
                        ->where("oi.product_variant_id", "!=", 0)
                        ->where("p.id", "!=", "")
                        ->groupBy(['pv.id', 'p.id'])
                        ->orderBy("total","DESC");
                    $sort .= " p.id ";
                    $order = " DESC";
                } else {
                   
                    $sql = OrderItem::select("p.id as product_id",
                                "oi.product_variant_id",
                                DB::raw("COUNT(oi.product_variant_id) AS total"))
                        ->from("order_items as oi")
                        ->leftJoin("product_variants as pv", "oi.product_variant_id", "=", "pv.id")
                        ->leftJoin("products as p", "pv.product_id", "=", "p.id")
                        ->where("oi.product_variant_id", "!=", 0)
                        ->where("p.id", "!=", "")
                        ->whereIn("category_id", "=", [$cate_ids])
                        ->groupBy(['pv.id', 'p.id'])
                        ->orderBy("total","DESC");
                    $sort .= " p.id ";
                    $order = " DESC";
                }
            } else {
                $product_ids = $section->product_ids;
                $sort .= " p.id ";
                $order = " DESC";
            }

            if ($section->product_type != 'custom_products' && !empty($section->product_type)) {
                $product = $sql->get();
                $rows = $tempRow = array();
                foreach ($product as $row1) {
                    $tempRow['product_id'] = $row1->product_id;
                    $rows[] = $tempRow;
                }
                $pro_id = array_column($rows, 'product_id');
                $product_ids = implode(",", $pro_id);
            }
        }

        $sql = Product::select( DB::raw("count(p.id) as total"))->from("products as p")
            ->leftJoin('sellers as s', 'p.seller_id', '=', 's.id')
            ->where("p.is_approved", "=", 1)
            ->where("p.status", "=", 1)
            ->where("s.status", "=", 1);
            if($where != ""){
                $sql = $sql->whereRaw(substr($where,4));
            }
        $total = $sql->first();

        $sql = Product::with(['variants'])->with(['variants' => function($query){
                $query->select('*',
                    DB::raw("(SELECT short_code FROM units as u WHERE u.id = stock_unit_id) as stock_unit_name")
                )->orderBy('status','DESC');
            } ])
            ->select( "p.*","p.type as d_type", "s.store_name as seller_name","s.slug as seller_slug","s.status as seller_status",
                DB::raw("(SELECT " . $price . " FROM product_variants as pv WHERE pv.product_id = p.id) as price"))
            ->from("products as p")
            ->leftJoin('sellers as s', 'p.seller_id', '=', 's.id')
            ->where("p.is_approved", "=", 1)
            ->where("p.status", "=", 1)
            ->where("s.status", "=", 1);
            if($where != ""){
                $sql = $sql->whereRaw(substr($where,4));
            }

            if(isset($request->section_id) && $request->section_id != ""){
                $sql = $sql->orderByRaw($sort.$order);
            }else{
                $sql = $sql->orderByRaw($price_sort);
            }
            $res = $sql->skip($offset)->limit($limit)->get();
            $res->makeHidden(['image','other_images']);

        $product = array();
        if (!empty($res)) {
            foreach ($res as $key => $row) {

                $variants = $row->variants;
                if (empty($variants)) {
                    continue;
                }



                if (!empty($pincode_id) || $pincode_id != "") {
                    $pincodes = ($row->d_type == "all") ? "" : $row->pincodes;
                    if ($pincodes != "") {
                        
                        $res_pincodes = Pincode::select("pincode")->whereIn("id", "=", [$pincodes])->get();
                        $pincodes = implode(",", array_column($res_pincodes, "pincode"));
                        $pincodes = explode(",", $pincodes);
                    }
                    // print_r($pincodes);
                    if ($row->d_type == "all") {
                        $row->is_item_deliverable = true;
                    } else if ($row->d_type == "included") {
                        if (in_array($pincode_id, $pincodes)) {
                            $row->is_item_deliverable  = true;
                        } else {
                            $row->is_item_deliverable  = false;
                        }
                    } else if ($row->d_type == "excluded") {
                        if (in_array($pincode_id, $pincodes)) {
                            $row->is_item_deliverable  = true;
                        } else {
                            $row->is_item_deliverable  = false;
                        }
                    }
                } else {
                    $row->is_item_deliverable = false;
                }

                unset($row->type);

                $row->seller_name = !empty($row->seller_name) ? $row->seller_name : "";
                $row->price = (isset($row->price) == null)  ? 0 : $row->price;
                $row->pincodes = (isset($row->pincodes) == null)  ? "" : $row->pincodes;
                $row->is_approved = (isset($row->is_approved) == null)  ? "" : $row->is_approved;
                $row->seller_id = (isset($row->seller_id) == null)  ? "" : $row->seller_id;
                $row->pickup_location = (isset($row->pickup_location) == null)  ? "" : $row->pickup_location;
                $row->pickup_postcode = (isset($row->pickup_postcode) == null)  ? "" : $row->pickup_postcode;
                $row->till_status = $row->till_status??'';
                $row->tags = $row->tags??'';
                $row->images = CommonHelper::getImages($row['id'],0);



                if ($row->tax_id == 0) {
                    $row->tax_title = "";
                    $row->tax_percentage = "0";
                } else {
                    $t_id = $row->tax_id;


                    $tax1 = Tax::select("*")->where("id","=",$t_id)->first();
                    $row->tax_title = (!empty($tax1['title'])) ? $tax1['title'] : "";
                    $row->tax_percentage = (!empty($tax1['percentage'])) ? $tax1['percentage'] : "0";
                }
                if (!empty($user_id)) {

                    
                    $favorite = Favorite::select("id")->where('product_id','=',$row->id)->where('user_id','=',$user_id)->first();
                    if (!empty($favorite)) {
                        $row->is_favorite = true;
                    } else {
                        $row->is_favorite = false;
                    }
                } else {
                    $row->is_favorite = false;
                }

               
                foreach ($variants as $subkey => $variant) {
                    if (!empty($user_id)) {
                        /*$sql = "SELECT qty as cart_count FROM cart where product_variant_id= " . $variants[$k]['id'] . " AND user_id=" . $user_id;
                        $db->sql($sql);
                        $categories = $db->getResult();*/
                        $cart = Cart::select("qty as cart_count")->where('product_variant_id','=',$variant->id)->where('user_id','=',$user_id)->first();
                        if (!empty($cart)) {
                            $variants[$subkey]->cart_count = $cart->cart_count;
                        } else {
                            $variants[$subkey]->cart_count = "0";
                        }
                    } else {
                        $variants[$subkey]->cart_count = "0";
                    }

                    $variants[$subkey]->stock_unit_name = $variants[$subkey]->stock_unit_name??'';
                    $variants[$subkey]->images = CommonHelper::getImages($row['id'],$variants[$subkey]->product_variant_id);;
                }
               
                $row->variants = $variants;
                $product[$key] = $row;
            }
        }
        if (!empty($product)) {
            return CommonHelper::responseWithData($product, $total->total);
        } else {
            return CommonHelper::responseError("No products available.");
        }
    }

    public function removeSection($id){
        $section = Section::find($id);
        if($section){
            $section->delete();
            return CommonHelper::responseSuccess("Section Deleted Successfully!");
        }else{
            return CommonHelper::responseSuccess("Section Not Found!");
        }
    }

    public function getDeliveryBoyNotifications(Request $request){
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
        $sort = ($request->sort)??'id';
        $order = ($request->sort)??'DESC';
        $where = '';
        if (isset($request->search) && $request->search != '') {
            $search = $request->search;
            $where = " Where `id` like '%" . $search . "%' OR `title` like '%" . $search . "%' OR `message` like '%" . $search . "%' OR `date_created` like '%" . $search . "%' ";
        }

        $totalSql = DeliveryBoyNotification::select(DB::raw(" COUNT(`id`) as total"));
        if ($where != ""){
            $totalSql = $totalSql->whereRaw($where);
        }
        $totalSql = $totalSql->first();
        $total = $totalSql->total;
       

        $sql = DeliveryBoyNotification::select("*");
        if ($where != ""){
            $sql = $sql->whereRaw($where);
        }
        $notifications = $sql->orderBy($sort,$order)->skip($offset)->take($limit)->get();
        
        if(!empty($notifications)){
            $response = array();
            $response['status'] = 1;
            $response['total'] = $total;
            $rows = array();
            $tempRow = array();
            foreach ($notifications as $row) {
                $tempRow['id'] = $row->id;
                $tempRow['name'] = $row->title;
                $tempRow['subtitle'] = $row->message;
                $tempRow['type'] = $row->type;
                $tempRow['type_id'] = $row->type_id;
                $tempRow['image_url'] = $row->image_url;
                $rows[] = $tempRow;
            }
            $response['data'] = $rows;
        } else {
            $response['status'] = 0;
            $response['message'] = "Data not found!";
        }
        return CommonHelper::responseWithData($response);
    }

}
