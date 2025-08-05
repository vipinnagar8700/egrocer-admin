<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use DB;

class WishlistsApiController extends Controller
{
    public function index(){
       
        $wishlists = Favorite::select('users.name as user_name', 'products.name as product_name', 'sellers.name as seller_name',
                'favorites.*',DB::raw("COUNT(*) as 'total_qty'"))
            ->leftJoin('users', 'favorites.user_id', '=', 'users.id')
            ->leftJoin('products', 'favorites.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
           
            ->groupBy('favorites.product_id')
            ->orderBy('favorites.id','DESC')
            ->get();
        return CommonHelper::responseWithData($wishlists);
    }
}
