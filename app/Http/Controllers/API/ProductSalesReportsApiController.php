<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use App\Models\Seller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class ProductSalesReportsApiController extends Controller
{
    public function getProductSalesReport(Request $request){ 
        $ProductSalesReports = OrderItem::select('product_variants.product_id','products.name as product_name',
            'sellers.name as seller_name','product_variants.measurement','units.short_code AS unit_name','order_items.*','orders.active_status as order_active_status',
            DB::raw('(SELECT SUM(order_items.quantity) FROM order_items WHERE product_variants.id = order_items.product_variant_id AND order_items.active_status = 6) as total_sales'),
            DB::raw('(SELECT SUM(order_items.sub_total) FROM `order_items` WHERE product_variants.id = order_items.product_variant_id) as total_price')
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('units', 'product_variants.stock_unit_id', '=', 'units.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('orders.active_status', OrderStatusList::$delivered);
            
            if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
                $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
                $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
                $ProductSalesReports = $ProductSalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
            }

        $ProductSalesReports = $ProductSalesReports->orderBy('order_items.id','DESC')
            ->groupBy('product_variants.id')
           ->get();
        return CommonHelper::responseWithData($ProductSalesReports);

    }
}
