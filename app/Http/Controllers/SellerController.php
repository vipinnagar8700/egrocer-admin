<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\API\OrdersApiController;
use App\Http\Controllers\API\OrderStatusApiController;
use App\Models\Category;
use App\Models\City;
use App\Models\DeliveryBoy;
use App\Models\Favorite;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use App\Models\PanelNotification;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ReturnRequest;
use App\Models\Seller;
use App\Models\Setting;
use App\Models\User;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class SellerController extends BaseController
{
    public function index(){

        $seller_id = auth()->user()->seller->id;
        $orderIds = OrderItem::where('seller_id',$seller_id)->get()->pluck('order_id')->toArray() ?? [];
        $productsIds = Product::where('seller_id',$seller_id)->get()->pluck('id')->toArray() ?? [];
        $productsIds_stock = Product::where('seller_id',$seller_id)->where('is_unlimited_stock',0)->get()->pluck('id')->toArray() ?? [];

        $data = array();

        $data['order_count'] = Order::whereIn('id',$orderIds)->count() ?? 0;

        $ignoreStatus = array(
            OrderStatusList::$paymentPending,
            OrderStatusList::$delivered,
            OrderStatusList::$cancelled,
            OrderStatusList::$returned,
        );
        $data['pending_order_count'] = Order::whereIn('id',$orderIds)->whereNotIn('active_status', $ignoreStatus)->count() ?? 0;

        $data['product_count'] = Product::where('seller_id',$seller_id)->get()->count() ?? 0;

        $categoryIds = Seller::select('categories')->where('id',$seller_id)->value('categories')??"";
        $categoryIdsArray = explode(',', $categoryIds);

        $childCategoryIds = CommonHelper::getChildCategoryIds($categoryIdsArray);
        $finalCategoryIds = array_unique(array_merge($categoryIdsArray, $childCategoryIds));

        if($childCategoryIds != ""){
            $data['category_count'] = count($finalCategoryIds);
        }else{
            $data['category_count'] = 0;
        }
        $data['packet_products'] = ProductVariant::select("*")->leftJoin('products', 'product_variants.product_id', '=', 'products.id')->
        where('products.type','packet')->whereIn('product_id',$productsIds)->get()->count();
        $data['loose_products'] = ProductVariant::select("*")->leftJoin('products', 'product_variants.product_id', '=', 'products.id')->
        where('products.type','loose')->whereIn('product_id',$productsIds)->get()->count();
        $data['sold_out_count'] = ProductVariant::where('status',ProductVariant::$statusSoldOut)
            ->whereIn('product_id',$productsIds_stock)
            ->where('stock','<=',0)
            ->where('stock','<=',0)->get()->count();

        $low_stock = Setting::where('variable', 'low_stock_limit')->first();
        $low_stock_limit = 0;
        if($low_stock){
            $low_stock_limit = $low_stock->value;
        }
        $data['low_stock_count'] = ProductVariant::where('status',ProductVariant::$statusAvailable)->whereIn('product_id',$productsIds_stock);
        if($low_stock_limit !==0){
            $data['low_stock_count'] = $data['low_stock_count']->where('stock','<=',$low_stock_limit);
        }
        $data['low_stock_count'] = $data['low_stock_count']->get()->count();


        $balance = (float) Seller::where('id', $seller_id)->value('balance') ?? 0;

        $pendingWithdrawals = (float) DB::table('withdrawal_requests')
            ->where('type', 'seller')
            ->where('type_id', $seller_id)
            ->where('status', 0)
            ->sum('amount') ?? 0;

        $data['balance'] = number_format($balance - $pendingWithdrawals, 2);

        if ($categoryIds != "") {
         
            $categoryIdsArray = explode(',', $categoryIds);

            $childCategoryIds = CommonHelper::getChildCategoryIds($categoryIdsArray);

            // Merge product categories with their top-level parents
            $finalCategoryIds = array_unique(array_merge($categoryIdsArray, $childCategoryIds));
            
            // Convert to comma-separated string
            $categoryIds = implode(',', $finalCategoryIds);
        
        // Debug output
        
        $category_product_count = Category::select('id', 'name', DB::raw("
                (SELECT COUNT(id) 
                 FROM products 
                 WHERE products.category_id = categories.id 
                 AND categories.id IN ($categoryIds) 
                 AND products.seller_id = $seller_id) AS product_count
            "))
            ->having('product_count', '!=', 0)
            ->orderBy('id', 'ASC')
            ->get()
            ->makeHidden(['image_url', 'has_child', 'has_active_child']);
           
        }
      
        else{
            $category_product_count = Category::select('id','name')->get()->makeHidden(['image_url']);
        }

        $data['category_product_count'] = $category_product_count;

        $year = date("Y");
        $curdate = date('Y-m-d');

        $data['weekly_sales'] = Order::select(DB::raw('ROUND(SUM(final_total), 2) AS total_sale'), DB::raw('DATE(created_at) AS order_date'))
            ->where(DB::raw('YEAR(created_at)'),'=', $year)
            ->where(DB::raw('DATE(created_at)'),'<=', $curdate)
            ->whereIn('orders.id', $orderIds)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy(DB::raw('DATE(created_at)'),'DESC')
            ->limit(7)->get();

        $orderIdsString = 0;
        if(count($orderIds) != 0){
            $orderIdsString = implode(",", array_unique($orderIds));
        }
        $data['status_order_count'] = OrderStatusList::select('order_status_lists.id','order_status_lists.status',
            DB::raw('(select count(orders.id) from orders where orders.active_status = order_status_lists.id and orders.id IN ('. $orderIdsString .')) AS order_count'))
            ->orderBy('order_status_lists.id','asc')
            ->get();
       
        return CommonHelper::responseWithData($data);
    }



    public function getProducts(Request $request){ 
        $limit = $request->limit;
        $offset = $request->offset; 
        $seller_id = auth()->user()->seller->id;

        $join = "LEFT JOIN `categories` c ON c.id = p.category_id
        LEFT JOIN `product_variants` pv ON pv.product_id = p.id
            LEFT JOIN `units` u ON u.id = pv.stock_unit_id
            LEFT JOIN `sellers` s ON s.id = p.seller_id
            LEFT JOIN `order_status_lists` osl ON osl.id = p.till_status
            ";
        $where = " WHERE p.seller_id=".$seller_id;

        //here Sold Out as 0
        if(isset($request->type) && $request->type === 'sold_out'){ 
            $where .= empty($where) ? " WHERE pv.stock <=0 AND pv.status = '0' AND p.is_unlimited_stock = '0' " : " AND pv.stock <=0 AND pv.status = '0' AND p.is_unlimited_stock = '0'";
        }
        //here Available as 1, low_stock_limit
        if(isset($request->type) && $request->type === 'low_stock'){
            $low_stock_limit = Setting::where('variable', 'low_stock_limit')->first();
            $where .= empty($where) ? " WHERE pv.stock <= ".$low_stock_limit['value']." AND pv.status = '1' AND p.is_unlimited_stock = '0'" : " AND pv.stock <= ".$low_stock_limit['value']." AND pv.status = '1' AND p.is_unlimited_stock = '0'";
        }
        //here packet paroducts
        if(isset($request->type) && $request->type === 'packet_products'){
            $where .= empty($where) ? " WHERE p.type = 'packet'" : " AND p.type ='packet'";
        }
        //here loose paroducts
        if(isset($request->type) && $request->type === 'loose_products'){
            $where .= empty($where) ? " WHERE p.type = 'loose'" : " AND p.type ='loose'";
        }
      
        $products = \DB::select("SELECT p.id AS product_id, p.*, p.name, p.seller_id, p.status, p.tax_id, p.image, 
            CONCAT('" . asset('storage/') . "/', p.image) as image_url,
            s.name as seller_name, p.indicator, p.manufacturer, p.made_in, p.return_status, 
            p.cancelable_status, p.till_status, osl.status as till_status_name, p.description,
            pv.id as product_variant_id, pv.price, pv.discounted_price, pv.measurement, 
            pv.status as pv_status, pv.stock, pv.stock_unit_id, u.short_code,
            (select short_code from units where units.id = pv.stock_unit_id) as stock_unit
            FROM `products` p $join $where 
            ORDER BY p.id DESC, pv.id ASC");
        $total = count($products);
        if(isset($request->limit)){
            $products = array_slice($products, $offset, $limit);
        }
        $data = array(
            "products" => $products
        );

        return CommonHelper::responseWithData($data,$total);
    }

    public function getWeeklySales(){

        $seller_id = auth()->user()->seller->id;
        $year = date("Y");
        $curdate = date('Y-m-d');
        $orders = Order::select(DB::raw('ROUND(SUM(final_total), 2) AS total_sale'),
            DB::raw('DATE(orders.created_at) AS order_date'))
            ->where(DB::raw('YEAR(orders.created_at)'),'=', $year)
            ->where(DB::raw('DATE(orders.created_at)'),'<=', $curdate)
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->where('order_items.seller_id',$seller_id)
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->orderBy(DB::raw('DATE(orders.created_at)'),'DESC')
            ->limit(7)
            ->get();

        return CommonHelper::responseWithData($orders);
    }

    public function countProductCategoryWise(){
        $sellerCategoryIds = auth()->user()->seller->categories;
        $categories = Category::select('name',DB::raw('(SELECT count(id) from `products` WHERE products.category_id = categories.id) AS product_count'))
            ->whereIn('id',explode(',',$sellerCategoryIds))
            ->orderBy('id','ASC')->get();
        return CommonHelper::responseWithData($categories);
    }

    public function doLanguageChange(Request $request)
    {
        Session::put('lang',$request->language);
      
        return response()->json(['status' => true]);
    }
    public function createSlug($text){
        $slug = CommonHelper::slugify($text);
        return CommonHelper::responseWithData($slug);
    }

    public function getTopNotifications(){
        $notifications = PanelNotification::where('notifiable_id',auth()->user()->id);
        $unReadCount = (clone $notifications)->where('read_at',NULL)->get()->count();
        $notifications = $notifications->orderBy('created_at','DESC')->get();

        $data = array();
        $data['unread'] = $unReadCount;
        $data['notifications'] = $notifications;
        return CommonHelper::responseWithData($data);
    }

    public function markAsReadNotifications(Request $request){

        auth()->user()
            ->unreadNotifications
            ->when($request->input('id'), function ($query) use ($request) {
                return $query->where('id', $request->input('id'));
            })
            ->markAsRead();
        return CommonHelper::responseWithData("Notification Mark as Read Successfully!");

    }

    public function getOrders(Request $request){
        $seller_id = auth()->user()->seller->id; 

        $limit = ($request->limit);
        $offset = ($request->offset)??0;
        $filter = $request->search; // Filter query

        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();

        $startDeliveryDate = Carbon::parse($request->input('startDeliveryDate'))->startOfDay();
        $endDeliveryDate = Carbon::parse($request->input('endDeliveryDate'))->endOfDay();

        $orders = Order::select('orders.*','orders.id as order_id','delivery_boys.name as delivery_boy_name','sellers.name as seller_name',
            'users.name as user_name','order_items.active_status as order_status')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('user_addresses as address', 'orders.address_id', '=', 'address.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('delivery_boys', 'orders.delivery_boy_id', '=', 'delivery_boys.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')->where('order_items.seller_id', $seller_id);

        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
            $orders = $orders->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }

        if(isset($request->startDeliveryDate) && $request->startDeliveryDate != "" && isset($request->endDeliveryDate) && $request->endDeliveryDate != ""){
            // Convert start and end dates from request to Y-m-d format
            $startDeliveryDate = date('Y-m-d', strtotime($request->startDeliveryDate));
            $endDeliveryDate = date('Y-m-d', strtotime($request->endDeliveryDate));
        
            // Define a callback function to extract and format the delivery_time date
            $orders = $orders->where(function($query) use ($startDeliveryDate, $endDeliveryDate) {
                $query->whereRaw("STR_TO_DATE(SUBSTRING_INDEX(orders.delivery_time, ' ', 1), '%d-%m-%Y') BETWEEN ? AND ?", [$startDeliveryDate, $endDeliveryDate]);
            });
        }

        if(isset($request->status) && $request->status != "" && $request->status != 0){
            $orders = $orders->where('orders.active_status', $request->status);
        }

        // Apply filter to all columns in all joined tables
        if ($filter) {
            $columns = [
                'orders.payment_method', 'orders.id', 'delivery_boys.name','orders.delivery_charge','orders.wallet_balance', 'orders.final_total','orders.total','orders.delivery_time','sellers.name',
                'users.name', 'order_items.active_status', 'products.name'
                // Add more columns as needed
            ];
            
            $orders = $orders->where(function($query) use ($filter, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', "%{$filter}%");
                }
            });
        }

        $totalOrder = $orders->groupBy('orders.id')->get()->count();
       
        if(isset($limit) &&  $limit>0 ){
            $orders = $orders->groupBy('orders.id')->orderBy('orders.id','DESC')->skip($offset)->take($limit)->get();
        }else{
            $orders = $orders->groupBy('orders.id')->orderBy('orders.id','DESC')->get();
        }
        // Add OTP value dynamically based on setting
        $generate_otp = Setting::get_value("generate_otp");
        foreach ($orders as $order) {
            $order->otp = ($generate_otp == 1) ? $order->otp : 0;
        }
        $item_limit = ($request->item_limit);
        $item_offset = ($request->item_offset)??0;
        $order_items = Order::select('order_items.*','orders.mobile','orders.total' ,'orders.delivery_charge','orders.discount','orders.promo_code',
            'orders.promo_discount','orders.wallet_balance','orders.final_total','orders.payment_method','orders.address','orders.delivery_time',
            'users.name as user_name'
            ,'order_items.status as order_status','sellers.name as seller_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('delivery_boys', 'orders.delivery_boy_id', '=', 'delivery_boys.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->where('order_items.seller_id', $seller_id);

        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
            $order_items = $order_items->whereBetween('order_items.created_at', [$startDate, $endDate]);
        }

        if(isset($request->startDeliveryDate) && $request->startDeliveryDate != "" && isset($request->endDeliveryDate) && $request->endDeliveryDate != ""){
            // Convert start and end dates from request to Y-m-d format
            $startDeliveryDate = date('Y-m-d', strtotime($request->startDeliveryDate));
            $endDeliveryDate = date('Y-m-d', strtotime($request->endDeliveryDate));
        
            // Define a callback function to extract and format the delivery_time date
            $order_items = $order_items->where(function($query) use ($startDeliveryDate, $endDeliveryDate) {
                $query->whereRaw("STR_TO_DATE(SUBSTRING_INDEX(orders.delivery_time, ' ', 1), '%d-%m-%Y') BETWEEN ? AND ?", [$startDeliveryDate, $endDeliveryDate]);
            });
        }

        if(isset($request->status) && $request->status != "" && $request->status != 0){
            $order_items = $order_items->where('orders.active_status', $request->status);
        }
        // Apply filter to all columns in all joined tables
        if ($filter) {
            $columns = [
                'orders.payment_method', 'orders.id', 'delivery_boys.name','orders.delivery_charge','orders.wallet_balance', 'orders.final_total','orders.total','orders.delivery_time','sellers.name',
                'users.name', 'order_items.active_status', 'products.name', 'order_items.id', 'order_items.is_credited'
                // Add more columns as needed 
            ];
            
            $order_items = $order_items->where(function($query) use ($filter, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', "%{$filter}%");
                }
            });
        }
     
        $totalOrderItem = $order_items->count();
        if(isset($item_limit) &&  $item_limit>0 ){
            $order_items = $order_items->orderBy('order_items.id','DESC')->skip($item_offset)->take($item_limit)->get();
        }else{
            $order_items = $order_items->orderBy('order_items.id','DESC')->get();
        }

        $statusOrderCount = CommonHelper::getStatusOrderCount($seller_id)->toArray() ?? [];
        array_unshift($statusOrderCount, array("id" => 0, "status" => "All Orders", "order_count" => $totalOrder));

        if($orders){
            $data = array(
                "status_order_count" => $statusOrderCount,
                "orders" => $orders,
                "total_order_item" => $totalOrderItem,
                "order_items" => $order_items
            );
            return CommonHelper::responseWithData($data, $totalOrder);
        }else{
            return CommonHelper::responseSuccess('Order not found');
        }

    }

    public function getOrder(Request $request){
        $data = CommonHelper::getOrderDetails($request->order_id);
        return CommonHelper::responseWithData($data);
    }

    public function getOrderStatus(){
        return app(OrderStatusApiController::class)->getOrderStatus();
    }

    public function getCategories(Request $request){
        $seller_categories = auth()->user()->seller->categories;
        $category_id = $request->get('category_id',0);
        if(isset($request->category_id)  ){
            $categories =  Category::where('parent_id',$category_id)->orderBy('name','ASC')->get();
        }else{
            $categories =  Category::whereIn('id', explode(",", $seller_categories))->where('parent_id',$category_id)->orderBy('name','ASC')->get();
        }
        return CommonHelper::responseWithData($categories);
    }

    public function getReturnRequests(){
        $seller_id = auth()->user()->seller->id;
        $ReturnRequests = ReturnRequest::select('return_requests.*','users.name',
            'order_items.product_variant_id','order_items.quantity','order_items.price',
            'order_items.discounted_price','order_items.product_name','order_items.variant_name')
            ->leftJoin('users', 'return_requests.user_id', '=', 'users.id')
            ->leftJoin('order_items', 'return_requests.order_item_id', '=', 'order_items.id')
            ->leftJoin('products', 'return_requests.product_id', '=', 'products.id')
            ->leftJoin('product_variants', 'return_requests.product_variant_id', '=', 'product_variants.id')
            ->where('products.seller_id',$seller_id)
            ->orderBy('return_requests.id','DESC')
            ->get();
        return CommonHelper::responseWithData($ReturnRequests);
    }

    public function getProductSalesReport(Request $request){
        $seller_id = auth()->user()->seller->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        $ProductSalesReports = OrderItem::select('product_variants.product_id','products.name as product_name',
            'sellers.name as seller_name','product_variants.measurement','units.short_code AS unit_name','order_items.*','orders.*',
            DB::raw('(SELECT COUNT(order_items.product_variant_id) FROM order_items WHERE product_variants.id = order_items.product_variant_id) as total_sales'),
            DB::raw('(SELECT SUM(order_items.sub_total) FROM `order_items` WHERE product_variants.id = order_items.product_variant_id) as total_price')
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('units', 'product_variants.stock_unit_id', '=', 'units.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('products.seller_id', $seller_id)
            ->where('orders.active_status', OrderStatusList::$delivered)
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->orderBy('order_items.id','DESC')
            ->groupBy('product_variants.id')
            ->get();
        return CommonHelper::responseWithData($ProductSalesReports);
    }

    public function getSalesReport(Request $request){
        $seller_id = auth()->user()->seller->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        $categories = CommonHelper::getSellerCategories($seller_id);
        $SalesReports = OrderItem::select('order_items.id','orders.total',
            'order_items.seller_id','order_items.sub_total','orders.user_id','orders.mobile',
            'products.name as product_name','orders.final_total','orders.address',
            'users.name as user_name','order_items.status',
            DB::raw('DATE_FORMAT(order_items.created_at,"%d-%m-%Y") as added_date'))
            ->leftJoin('users', 'order_items.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('products.seller_id', $seller_id)
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->where('orders.active_status', OrderStatusList::$delivered);
        if(isset($request->category) && $request->category != ""){
            $SalesReports = $SalesReports->where('products.category_id', $request->category);
        }
        $SalesReports = $SalesReports->orderBy('order_items.id','DESC')->get();
        $data = array(
            "categories" => $categories,
            "salesReports" => $SalesReports
        );
        return CommonHelper::responseWithData($data);
    }

    public function getSettings(){
        $variables = array(
            "app_name",
            "support_number",
            "support_email",
            "current_version",
            "minimum_version_required",
            "is_version_system_on",
            "ios_is_version_system_on",
            "currency",
            "currency_code",
            "decimal_point",
            "low_stock_limit",
            "app_mode_seller",
            "privacy_policy_seller",
            "terms_conditions_seller",
            "google_place_api_key",
            "app_mode_seller",
            "app_mode_seller_remark",
            "seller_commission"
        );
        $settings = CommonHelper::getSettings($variables);
        $settings["allPermissions"] = auth()->user()->allPermissions;
        $settings["view_customer_detail"] = Seller::select('customer_privacy')->where('admin_id',auth()->user()->id)->first()->customer_privacy;
        $settings["assign_delivery_boy"] = Seller::select('assign_delivery_boy')->where('admin_id',auth()->user()->id)->first()->assign_delivery_boy;
        $settings["view_order_otp"] = Seller::select('view_order_otp')->where('admin_id',auth()->user()->id)->first()->view_order_otp;
        $settings["change_order_status_delivered"] = Seller::select('change_order_status_delivered')->where('admin_id',auth()->user()->id)->first()->change_order_status_delivered;

        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }
    public function getPrivacyPolicy(){
        $variables = array(
            "privacy_policy_seller",
            "terms_conditions_seller",
        );
        $settings = CommonHelper::getSettings($variables);
        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getDeliveryBoys(Request $request){
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;

        $city_id = auth()->user()->seller->city_id;

        $deliveryBoys = DeliveryBoy::select('id','name')->where('city_id',$city_id);

        $totalDeliveryBoys = clone $deliveryBoys;
        $totalDeliveryBoys = $totalDeliveryBoys->count();

        $deliveryBoys = $deliveryBoys->orderBy('id','DESC')->skip($offset)->take($limit)->get();
        return CommonHelper::responseWithData($deliveryBoys, $totalDeliveryBoys);
    }

    public function getCities(){
        $cities = City::select('id','name','state','formatted_address','latitude','longitude')->orderBy('id','DESC')->get();
        if(empty($cities)){
            return  CommonHelper::responseError('Cities not found.');
        }
        return CommonHelper::responseWithData($cities);
    }
    public function getMainCategories(Request $request){
        $seller_id = auth()->user()->seller->id;
        $seller = Seller::where('id', $seller_id)->first();
        
        $query = Category::orderBy('name', 'ASC');
        
        if (isset($request->category_id) && $request->category_id !== 0) {
            $query->where("parent_id", $request->category_id);
        } else {
            $query->whereIn('id', explode(",", $seller->categories));
        }
    
        if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where('name', 'LIKE', '%' . $searchTerm . '%');
        }
    
        $userCategories = $query->get();
        $total = $userCategories->count();
        
        return CommonHelper::responseWithData($userCategories, $total);
    }
    public function deploy(){
       
        exec("git pull");
        exec("composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev");
        exec("php artisan migrate");
        echo "Done";
    }
}
