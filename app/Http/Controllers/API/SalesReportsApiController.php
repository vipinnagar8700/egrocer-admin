<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\OrderStatusList;
use App\Models\Seller;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\DeliveryBoy;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class SalesReportsApiController extends Controller
{
    public function getSalesReport(Request $request){

        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();

        $sellers = Seller::orderBy('id','DESC')->get()->toArray();
        $categories = Category::orderBy('id','DESC')->get()->toArray();
        $deliveryBoys = DeliveryBoy::orderBy('id','DESC')->get()->toArray();

        $SalesReports = OrderItem::select('order_items.id','orders.total',
            'order_items.seller_id','order_items.sub_total','orders.user_id','orders.mobile',
            'products.name as product_name','orders.final_total','orders.address',
            'users.name as user_name','order_items.status',

            DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date'))
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.active_status', OrderStatusList::$delivered);

        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != "") {
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
            $SalesReports = $SalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }

        if(isset($request->seller) && $request->seller != ""){
            $SalesReports = $SalesReports->where('order_items.seller_id', $request->seller);
        }

        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
        if(isset($request->deliveryBoy) && $request->deliveryBoy != ""){
            $SalesReports = $SalesReports->where('orders.delivery_boy_id', $request->deliveryBoy);
        }
        if(isset($request->payment_type) && $request->payment_type != ""  ){
            if($request->payment_type == "1")
            $SalesReports = $SalesReports->where('orders.payment_method', "COD");
        else{
            $SalesReports = $SalesReports->where('orders.payment_method','!=', "COD");
        }
        }

        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();

        $data = array(
            "sellers" => $sellers,
            "categories" => $categories,
            "deliveryBoys" => $deliveryBoys,
            "salesReports" => $SalesReports
        );
        return CommonHelper::responseWithData($data);

    }
    public function excelSalesReport(Request $request){
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
    
        $sellers = Seller::orderBy('id','DESC')->get()->toArray();
        $categories = Category::orderBy('id','DESC')->get()->toArray();
    
        $SalesReports = OrderItem::select('order_items.id','orders.total',
            'order_items.seller_id','order_items.sub_total','orders.user_id','orders.mobile',
            'products.name as product_name','orders.final_total','orders.address',
            'users.name as user_name','order_items.status',
    
            DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date'))
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.active_status', OrderStatusList::$delivered);
    
        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != "") {
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
            $SalesReports = $SalesReports->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }
    
        if(isset($request->seller) && $request->seller != ""){
            $SalesReports = $SalesReports->where('order_items.seller_id', $request->seller);
        }
    
        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
    
        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();
    
        // Generate CSV content
        $csvData = [];
        $csvData[] = ['Product Name', 'Total']; // Add headers
        foreach ($SalesReports as $row) {
            $csvData[] = [$row->product_name, $row->total]; // Add data
        }
    
        // Generate CSV file
        $csvFileName = 'export_' . Str::random(10) . '.csv';
        $csvFile = fopen('php://temp', 'w');
        foreach ($csvData as $csvRow) {
            fputcsv($csvFile, $csvRow);
        }
        rewind($csvFile);
        $csvContent = stream_get_contents($csvFile);
        fclose($csvFile);
    
        // Return the file as a downloadable response
        return response()->streamDownload(function () use ($csvContent) {
            echo $csvContent;
        }, $csvFileName);
    }
}
