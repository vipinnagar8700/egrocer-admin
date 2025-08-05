<?php

namespace App\Http\Controllers;

use App\Helpers\CommonHelper;
use App\Http\Controllers\API\OrdersApiController;
use App\Http\Controllers\API\OrderStatusApiController;
use App\Models\Category;
use App\Models\DeliveryBoy;
use App\Models\FundTransfer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusList;
use App\Models\PanelNotification;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ReturnRequest;
use App\Models\Seller;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\User;
use App\Models\DeliveryBoyTransaction;
use App\Models\LiveTracking;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;   

class DeliveryBoyController extends BaseController
{
    public function index(){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $data = array();
        $data['order_count'] = Order::where('delivery_boy_id',$delivery_boy_id)->count();
        $data['balance'] = number_format(auth()->user()->deliveryBoy->balance, 2);
        return CommonHelper::responseWithData($data);
    }
    public function doLanguageChange(Request $request)
    {
        Session::put('lang',$request->language);
        // Log::info('session : '.Session::get('lang'));
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

        $delivery_boy_id = auth()->user()->deliveryBoy->id;

        $limit = ($request->limit)??12;
        $offset = ($request->offset)??0;

        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();

        $startDeliveryDate = Carbon::parse($request->input('startDeliveryDate'))->startOfDay();
        $endDeliveryDate = Carbon::parse($request->input('endDeliveryDate'))->endOfDay();

        $orders = Order::select('orders.*','orders.id as order_id','delivery_boys.name as delivery_boy_name','sellers.name as seller_name',
            'users.name as user_name','users.mobile as user_mobile','users.country_code as user_country_code','order_items.active_status as order_status')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('delivery_boys', 'order_items.delivery_boy_id', '=', 'delivery_boys.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')->where('orders.delivery_boy_id', $delivery_boy_id);

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
        if (isset($request->search) && !empty($request->search)) {
            $search = $request->search;
            $orders = $orders->where(function ($query) use ($search) {
                $query->where('orders.id', 'LIKE', "%$search%")
                    ->orWhere('users.name', 'LIKE', "%$search%")
                    ->orWhere('users.mobile', 'LIKE', "%$search%")
                    ->orWhere('sellers.name', 'LIKE', "%$search%")
                    ->orWhere('delivery_boys.name', 'LIKE', "%$search%");
            });
        }

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $orders = $orders->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $orders = $orders->whereIn('orders.active_status', $previousTypeStatus);
            }
        }

        $totalOrder = clone $orders;
        $totalOrder = $totalOrder->groupBy('orders.id')->get()->count();
        $orders = $orders->groupBy('orders.id')->orderBy('orders.updated_at','DESC')->skip($offset)->take($limit)->get();
        $i = 0;
        foreach ($orders as $key => $row) {
            $generate_otp = Setting::get_value("generate_otp");
            if($generate_otp == 0){
                $orders[$key]->otp = 0;
            }
        }
      

        $order_items = Order::select('order_items.*','orders.mobile','orders.total' ,'orders.delivery_charge','orders.discount','orders.promo_code',
            'orders.promo_discount','orders.wallet_balance','orders.final_total','orders.payment_method','orders.address','orders.delivery_time',
            'users.name as user_name'
            ,'order_items.status as order_status','sellers.name as seller_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('delivery_boys', 'order_items.delivery_boy_id', '=', 'delivery_boys.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')->where('orders.delivery_boy_id', $delivery_boy_id);

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

        if (isset($request->type)) {
            $activeTypeStatus = [OrderStatusList::$paymentPending, OrderStatusList::$received, OrderStatusList::$processed, OrderStatusList::$outForDelivery, OrderStatusList::$shipped];
            $previousTypeStatus = [OrderStatusList::$delivered, OrderStatusList::$cancelled, OrderStatusList::$returned];
            if ($request->type == Order::$activeType) {
                $order_items = $order_items->whereIn('orders.active_status', $activeTypeStatus);
            } else {
                $order_items = $order_items->whereIn('orders.active_status', $previousTypeStatus);
            }
        }

        $totalOrderItem = clone $order_items;
        $totalOrderItem = $totalOrderItem->count();
        $order_items = $order_items->orderBy('order_items.updated_at','DESC')->skip($offset)->take($limit)->get();
        
        $data = array(
            "orders" => $orders,
            "total_order_item" => $totalOrderItem,
            "order_items" => $order_items
        );
        return CommonHelper::responseWithData($data,$totalOrder);
    }
    public function getOrder(Request $request){
        //app(TwitterController::class)->functionName($request);
        return app(OrdersApiController::class)->view($request->order_id);
    }
    public function getOrderStatus(){
        return app(OrderStatusApiController::class)->getOrderStatus();
    }
    public function getCashCollection(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $transactions = DeliveryBoyTransaction::select( 'orders.*','delivery_boy_transactions.*','delivery_boys.name','delivery_boys.mobile','delivery_boys.address' )
        
        ->leftJoin('orders', 'delivery_boy_transactions.order_id', '=', 'orders.id')
        ->leftJoin('delivery_boys', 'delivery_boy_transactions.delivery_boy_id', '=', 'delivery_boys.id')
        ->where('delivery_boy_transactions.delivery_boy_id', $delivery_boy_id)
        ->where(function ($query) {
            $query->where('delivery_boy_transactions.type', DeliveryBoyTransaction::$paymentTypeCod)
                ->orWhere('delivery_boy_transactions.type', 'delivery_boy_cash_collection');
        });
        if(isset($request->startDate) && $request->startDate != "" && isset($request->endDate) && $request->endDate != ""){
            $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
            $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
            $transactions = $transactions->whereBetween('delivery_boy_transactions.created_at', [$startDate, $endDate]);
        }
        if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;
            $transactions = $transactions->where('delivery_boy_transactions.id', 'LIKE', '%' . $searchTerm . '%')->orWhere('orders.id', 'LIKE', '%' . $searchTerm . '%')
                ->orwhere('delivery_boy_transactions.type', 'LIKE', '%' . $searchTerm . '%')->orWhere('delivery_boy_transactions.amount', 'LIKE', '%' . $searchTerm . '%')
               ->orWhere('delivery_boy_transactions.message', 'LIKE', '%' . $searchTerm . '%');
        }
        $transactions = $transactions->orderBy('delivery_boy_transactions.id','ASC')->get();
        foreach($transactions as $t => $row) {
            if($row['type'] == 'delivery_boy_cash_collection'){
                 $transactions[$t]['type'] = 'Delivery Boy Cash Collection';
                  $transactions[$t]['order_id'] = '-';
                  $transactions[$t]['final_total'] = '-';
                  $transactions[$t]['collected_amount'] = $transactions[$t]['amount'];
                  $transactions[$t]['amount'] = 0;
            }elseif($row['type'] == 'COD'){
                $transactions[$t]['collected_amount'] = 0;
            }
        }
        $data['transactions'] = $transactions;
        $data['cash_in_hand'] = DeliveryBoy::where('id',$delivery_boy_id)->value('cash_received');
        $data['cash_collected'] = DeliveryBoyTransaction::select(DB::raw('SUM(amount) AS total_amt'))->where(['type' => 'delivery_boy_cash_collection', 'delivery_boy_id' => $delivery_boy_id])->value('total_amt');
        $total = $transactions->count();
        return CommonHelper::responseWithData( $data,$total);
    }
    public function getFundTransfers(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $fundTransfers = FundTransfer::select('delivery_boys.name','delivery_boys.mobile','delivery_boys.address', 'fund_transfers.*')
            ->leftJoin('delivery_boys', 'fund_transfers.delivery_boy_id', '=', 'delivery_boys.id')->where('fund_transfers.delivery_boy_id', $delivery_boy_id);
          
            if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;
            
                 $fundTransfers = $fundTransfers->where('fund_transfers.id', 'LIKE', '%' . $searchTerm . '%')
                    ->orwhere('fund_transfers.type', 'LIKE', '%' . $searchTerm . '%')->orWhere('fund_transfers.amount', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('fund_transfers.message', 'LIKE', '%' . $searchTerm . '%');
            }
        $fundTransfers = $fundTransfers->orderBy('fund_transfers.id','DESC')->get();
            $total = $fundTransfers->count();
          
        return CommonHelper::responseWithData($fundTransfers,$total);
    }


    public function getProductSalesReport(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
        $ProductSalesReports = OrderItem::select('product_variants.product_id','products.name as product_name',
            'sellers.name as seller_name','product_variants.measurement','units.short_code AS unit_name','order_items.*',
            DB::raw('(SELECT COUNT(order_items.product_variant_id) FROM order_items WHERE product_variants.id = order_items.product_variant_id) as total_sales'),
            DB::raw('(SELECT SUM(order_items.sub_total) FROM `order_items` WHERE product_variants.id = order_items.product_variant_id) as total_price')
        )
            ->leftJoin('orders', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('units', 'product_variants.stock_unit_id', '=', 'units.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->where('orders.delivery_boy_id', $delivery_boy_id)
            ->where('orders.active_status', OrderStatusList::$delivered)
            ->whereBetween('order_items.created_at', [$startDate, $endDate])
            ->orderBy('order_items.id','DESC')
            ->groupBy('product_variants.id')
            ->get();
        return CommonHelper::responseWithData($ProductSalesReports);
    }

    public function getSalesReport(Request $request){
        $delivery_boy_id = auth()->user()->deliveryBoy->id;
        $startDate = Carbon::parse($request->input('startDate'))->startOfDay();
        $endDate = Carbon::parse($request->input('endDate'))->endOfDay();
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
            ->where('orders.delivery_boy_id', $delivery_boy_id)
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
            "privacy_policy_delivery_boy",
            "terms_conditions_delivery_boy",
            "google_place_api_key",
            "app_mode_delivery_boy",
            "app_mode_delivery_boy_remark"
        );
        $settings = CommonHelper::getSettings($variables);
        $settings["allPermissions"] = auth()->user()->allPermissions;
        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function getPrivacyPolicy(){
        $variables = array(
            "privacy_policy_delivery_boy",
            "terms_conditions_delivery_boy",
        );
        $settings = CommonHelper::getSettings($variables);

        if(!empty($settings)){
            return CommonHelper::responseWithData($settings);
        }else{
            return  CommonHelper::responseError('No settings found!');
        }
    }

    public function deploy(){

        //exec("git reset --hard");
        exec("git pull");
        exec("composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev");
        exec("php artisan migrate");
        echo "Done";
    }

    public function manageLiveTracking(Request $request)
{
    
    // Define the validation rules
    $validator = Validator::make($request->all(),[
            'order_id' => 'required|numeric|exists:orders,id',
        'order_status' => 'required|string|in:5,6,7',
        'latitude' => 'required|string',
        'longitude' => 'required|string',
    ]);
    if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
    }
   
    // Retrieve the inputs
    $orderId = $request->order_id;
    $orderStatus = $request->input('order_status');
    $latitude = $request->input('latitude');
    $longitude = $request->input('longitude');

    // Check if the order exists and if it's valid for tracking
    $order = Order::find($orderId);
//dd($order);
    if (!$order) {
        return response()->json([
            'error' => true,
            'message' => 'Order does not exist.'
        ]);
    }

    if (in_array($order->active_status, [
        1,2,3,4,7,8
    ])) {
        return response()->json([
            'error' => true,
            'message' => "Order is {$order->active_status}. You cannot track this order."
        ]);
    }

    // Prepare the data for live tracking
    $trackingData = [
        'order_id' => $orderId,
        'order_status' => $orderStatus,
        'latitude' => $latitude,
        'longitude' => $longitude,
    ];

    // Update or insert live tracking data
    $liveTracking = LiveTracking::updateOrCreate(
        ['order_id' => $orderId],
        $trackingData
    );

    $message = $liveTracking->wasRecentlyCreated ? 'Live Tracking Details Inserted Successfully.' : 'Live Tracking Details Updated Successfully.' ;
    return  CommonHelper::responseSuccess($message);
}

}
