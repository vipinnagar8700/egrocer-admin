<?php

// namespace App\Http\Controllers\Api\Customer;
namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Helpers\ProductHelper;
use App\Http\Controllers\Controller;
use App\Http\Repository\CategoryRepository;
use App\Http\Repository\ProductRepository;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Country;
use App\Models\City;
use App\Models\DeliveryBoy;
use App\Models\Faq;
use App\Models\Favorite;
use App\Models\Newsletter;
use App\Models\Notification;
use App\Models\Offer;
use App\Models\OrderStatusList;
use App\Models\ProductImages;
use App\Models\ProductVariant;
use App\Models\PromoCode;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\SocialMedia;
use App\Models\Tax;
use App\Models\Transaction;
use App\Models\WalletTransaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use mysql_xdevapi\Exception;
use function App\Models\Setting;
use Response;


class BasicApiController extends Controller
{
    public $productRepository;
    public $categoryRepository;

    public function __construct(ProductRepository $productRepository, CategoryRepository  $categoryRepository)
    {
        $this->productRepository = $productRepository;
        $this->categoryRepository = $categoryRepository;
    }

    //Calculate Distance Testing for development
    public function findGoogleMapDistanceTest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitudeFrom' => 'required',
            'longitudeFrom' => 'required',
            'latitudeTo' => 'required',
            'longitudeTo' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $latitudeFrom = $request->latitudeFrom;
        $longitudeFrom = $request->longitudeFrom;
        $latitudeTo = $request->latitudeTo;
        $longitudeTo = $request->longitudeTo;
        $data = CommonHelper::findGoogleMapDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo);
        echo json_encode($data);
    }

    public function getCategories(Request $request)
    {
        $limit = ($request->limit);
        $offset = ($request->offset);

        $category_id = $request->get('category_id',0);

        $category_slug = $request->get('slug');

        if(isset($category_slug) && !empty($category_slug)){
            $category = Category::where('status',1)->where('slug',$category_slug)->first();
                   
            $categories = Category::where('status',1)->where('parent_id',$category->id);

        }else{
            $categories = Category::where('status',1)->where('parent_id',$category_id);
        }

        $total = $categories->count();
        if(isset($limit) &&  $limit>0 ){
        $categories= $categories->orderBy('row_order', 'ASC')->offset($offset)->limit($limit)->get(['id','name','subtitle','slug','image']);
        }else{
            $categories= $categories->orderBy('row_order', 'ASC')->get(['id','name','subtitle','slug','image']);
        }
        $categories = $categories->makeHidden(['image']);
        

        if(count($categories)>0){
            return CommonHelper::responseWithData($categories,$total);
        }else{
            return CommonHelper::responseError(__('no_category_found'));
        }
    }

    public function getUserTransactions(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user_id = auth()->user()->id;
        $type = $request->type;

        $limit = $request->get('limit', 10);
        $offset = $request->get('offset', 0);
        $total = Transaction::where('user_id', $user_id)->get();

        if ($type == "transactions") {
            $transactions = Transaction::where('user_id', $user_id)
                ->where('type', '!=', 'delivery_boy_cash_collection')
                ->orderBy('created_at', 'DESC');
            $total = $transactions->count();
            $transactions = $transactions->offset($offset)->limit($limit)->get();
            $transactions = $transactions->makeHidden(['user_id','order_id','payu_txn_id','updated_at','transaction_date']);
        
            return CommonHelper::responseWithData($transactions, $total);
        } elseif ($type == "wallet"){ 
        $wallet_transactions = WalletTransaction::where('user_id', $user_id)
                //->where('type', '!=', 'delivery_boy_cash_collection')
                ->orderBy('created_at', 'DESC');
                $total = $wallet_transactions->count();
                $wallet_transactions = $wallet_transactions->offset($offset)->limit($limit)->get();  
            for ($i = 0; $i < count($wallet_transactions); $i++) {
                $wallet_transactions[$i]['last_updated'] = (isset($wallet_transactions[$i]['last_updated']) == null) ? "" : $wallet_transactions[$i]['last_updated'];
                $wallet_transactions[$i]['status'] = $wallet_transactions[$i]['type'];
                $wallet_transactions[$i]['message'] = $wallet_transactions[$i]['message'] == 'Used against Order Placement' ? 'Order Successfully Placed' : $wallet_transactions[$i]['message'];
            }
            return CommonHelper::responseWithData($wallet_transactions, $total);
        }
    }



    public function getUserTransactions111(Request $request)
    {
        $user_id = auth()->user()->id;
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
        $total = Transaction::where('user_id', $user_id)->count();
        $transactions = Transaction::where('user_id', $user_id)
            ->orderBy('created_at', 'DESC')
            ->offset($offset)
            ->limit($limit)
            ->get();
        $transactions = $transactions->makeHidden(['user_id','order_id','payu_txn_id','updated_at','transaction_date']);
        return CommonHelper::responseWithData($transactions, $total);
    }


   
    public function addWalletBalance(Request $request){
        $validator = Validator::make($request->all(), [
            'type' => 'required',
            'amount' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $message = $request->get('message','Transaction by user');
        $amount = $request->amount;
        $type = $request->type;
        $order_id = $request->get('order_id',0);
        $order_item_id = $request->order_item_id;

        $user = auth()->user();

        $balance = $user->balance;
        $newBalance = ($type == 'credit') ? $balance + $amount : $balance - $amount;

        User::where('id',$user->id)->update(['balance' => $newBalance]);

        WalletTransaction::insert([
            'order_id' => $order_id,
            'order_item_id' => $order_item_id,
            'user_id' => $user->id,
            'type' => $type,
            'amount' => $amount,
            'message' => $message,
            'status' => 1,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        $walletTransaction = WalletTransaction::where('user_id',$user->id)->orderBy('updated_at','DESC')->first();

        $data = array();
        $data['new_balance'] = $newBalance;
        $data['message'] = __('wallet_recharged_successfully');
        return CommonHelper::responseWithData($data);
    }

    // Favorites
    public function getFavorites(Request $request){

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


        $user_id = auth()->user()->id;
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
       
        $total = Favorite::select(DB::raw('COUNT(favorites.id) AS total'))->from('favorites')->Join('products', 'favorites.product_id', '=', 'products.id')->where('favorites.user_id','=',$user_id)->first();
       

        try {
        $products = Favorite::select('favorites.id','favorites.user_id','favorites.product_id','products.tax_id','products.row_order','products.name',
            'products.slug','products.category_id','products.indicator','products.manufacturer',
            'products.made_in','products.return_status','products.cancelable_status','products.till_status','products.image','products.seller_id',
            'taxes.percentage as tax_percentage','taxes.title as tax_title', 'products.description','products.status', 'products.created_at', 'cities.boundary_points',
            'co.name as country_made_in'
        )
            ->Join('products', 'favorites.product_id', '=', 'products.id')
            ->leftJoin("countries as co", "products.made_in", "=", "co.id")
            ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
            ->leftJoin('cities', 'sellers.city_id', '=', 'cities.id')
            ->leftJoin('taxes', 'products.tax_id', '=', 'taxes.id')
            ->where('favorites.user_id','=',$user_id )
            ->orderBy('favorites.created_at','DESC')
            ->skip($offset)->take($limit)->get();

        } catch (\Exception $e) {
            Log::info("Favorites Error : ".$e->getMessage());
            throw $e;
            return CommonHelper::responseError("Something Went Wrong!");
        }
        $productArray = array();
        foreach ($products as $key => $row){
            array_push($productArray,CommonHelper::getProductDetails($row->product_id,$user_id,true,$request));
        }

        if (!empty($productArray)) {
            return CommonHelper::responseWithData($productArray, $total->total);
        }else{
            return  CommonHelper::responseError(__('no_items_found'));
        }

    }

    public function addToFavorite(Request $request){
        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $favorite = Favorite::where('user_id',auth()->user()->id)->where('product_id',$request->product_id)->first();
        if($favorite){
            return CommonHelper::responseError(__('product_already_added_as_favorite'));
        }else{
            $product = Product::where('id',$request->product_id)->first();
            if(!empty($product)){
                $favorite = new Favorite();
                $favorite->user_id = auth()->user()->id;
                $favorite->product_id = $request->product_id;
                $favorite->save();
                return CommonHelper::responseSuccess(__('item_added_in_users_favorite_list_successfully'));
            }else{
                return CommonHelper::responseError(__('no_products_found'));
            }

        }
    }
    public function removeFromFavorite(Request $request){
        $favorite = Favorite::where('user_id',auth()->user()->id);
        if(isset($request->product_id)){
            $favorite->where('product_id',$request->product_id)->first();
            if($favorite) {
                $favorite->delete();
                return CommonHelper::responseSuccess(__('item_removed_from_users_favorite_list_successfully'));
            }else{
                return CommonHelper::responseError(__('no_product_found'));
            }
        }else{
            $favorite->get();
            if(count($favorite)>0){
                $favorite->delete();
                return CommonHelper::responseSuccess(__('all_items_removed_from_users_favorite_list_successfully'));
            }else{
                return CommonHelper::responseError(__('no_product_found'));
            }
        }
    }

    // Faqs
    public function getFaqs(Request $request){
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
        $total = Faq::count();
        $faqs = Faq::orderBy('id','DESC')->offset($offset)->limit($limit)->get();
        if($faqs->count()>0){
            return CommonHelper::responseWithData($faqs,$total);
        }else{
            return CommonHelper::responseError(__('no_faq_found'));
        }
    }
    // Newsletter
    public function getNewsletter(){
        $newsletter = Newsletter::orderBy('id','DESC')->get();
        if(count($newsletter)>0) {
            return CommonHelper::responseWithData($newsletter);
        }else{
            return  CommonHelper::responseError(__('no_newsletter_found'));
        }
    }

    // Offer images
    public  function addOffers(Request $request){
        $validator = Validator::make($request->all(),[
            'image' => 'required|mimes:jpeg,jpg,png,gif',
            'position' => 'required',
            'section_id' => ($request->position === 'below_section')?'required':""
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $offer = new Offer();
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('offers', $file, $fileName);
        }
        $offer->image = $image;
        $offer->position = $request->position;
        $offer->section_position = $request->section_id;
        $offer->save();
        return CommonHelper::responseSuccess(__('offer_saved_successfully'));
    }

    public function getOffers(Request $request){
        $limit = $request->limit??10;
        $offset = $request->offset??0;
        $total = Offer::count();
        $offers = Offer::orderBy('id','DESC')->skip($offset)->take($limit)->get(['id','position','section_position','image']);
        $offers->makeHidden(['image']);
        if(count($offers)){
            return CommonHelper::responseWithData($offers,$total);
        }else{
            return CommonHelper::responseError(__('no_offer_found'));
        }

    }
    public function removeOffers($id){
        $offer = Offer::find($id);
        if($offer){
            @Storage::disk('public')->delete($offer->image);
            $offer->delete();
            return CommonHelper::responseSuccess(__('offer_deleted_successfully'));
        }else{
            return CommonHelper::responseSuccess(__('no_offer_found'));
        }
    }

    // slider
    public function addSliders(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'image' => 'required|mimes:jpeg,jpg,png,gif'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $slider = new Slider();
        $slider->type = $request->type;
        $slider->type_id = $request->type_id ?? 0;
        $image = '';
        if($request->hasFile('image')){
            $file = $request->file('image');
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('sliders', $file, $fileName);
        }
        $slider->image = $image;
        $slider->slider_url = $request->slider_url;
        $slider->save();
        return CommonHelper::responseSuccess(__('slider_images_saved_successfully'));
    }

    public function getSliders(Request $request){
        $limit = $request->limit??10;
        $offset = $request->offset??0;

        $query = Slider::where('status',1);
        $total = $query->count();
        $slider = $query->orderBy('id','DESC')->skip($offset)->take($limit)->get(['type','type_id','image']);

        $slider = $slider->makeHidden(['product','category','image']);
        if(count($slider)>0){
            return CommonHelper::responseWithData($slider,$total);
        }else{
            return CommonHelper::responseError(__('no_slider_found'));
        }
    }

    public function removeSliders($id){
        $slider = Slider::find($id);
        if($slider){
            @Storage::disk('public')->delete($slider->image);
            $slider->delete();
            return CommonHelper::responseSuccess(__('slider_deleted_successfully'));
        }else{
            return CommonHelper::responseSuccess(__('no_slider_found'));
        }
    }

    // Promo Code
    public function validatePromoCode(Request $request){

        $validator = Validator::make($request->all(), [
            'promo_code' => 'required',
            'total' => 'required'
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user_id = auth()->user()->id;
        $promo_code = $request->promo_code;
        $total = $request->total;
        $response = CommonHelper::validatePromoCode($user_id, $promo_code, $total);
        if($response['is_applicable'] == 0){
            return CommonHelper::responseError($response['message']);
        } else  {
            return CommonHelper::responseWithData($response);
        }
    }
    public function getPromoCode(Request $request){
        $user_id = auth()->user()->id;
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
        $sort = ($request->sort)??'id';
        $order = ($request->order)??'DESC';
        if(!isset($request->amount) || empty($request->amount)){
            return CommonHelper::responseError("Please Pass User id and amount");
        }
        $amount = $request->amount;

        $codes = PromoCode::select('id','message','promo_code','image')
                        ->where('status','=',1)
                        ->whereRaw('CURDATE() between start_date and end_date');
        $total = $codes->count();
        $codes = $codes->orderBy($sort,$order)->skip($offset)->take($limit)->get()->toArray();
        if (!empty($codes)) {
            foreach ($codes as $key => $code){
                for ($k = 0; $k < 1; $k++) {
                    $promo_code = $code["promo_code"];
                    $codes[$key] = CommonHelper::validatePromoCode($user_id, $promo_code, $amount);
                    $codes[$key]['id'] = !empty($codes[$key]['id']) ? $codes[$key]['id'] : $code["id"];
                    $codes[$key]['promo_code'] = !empty($codes[$key]['promo_code']) ? $codes[$key]['promo_code'] : $code["promo_code"];
                    $codes[$key]['image_url'] = !empty($codes[$key]['image_url']) ? $codes[$key]['image_url'] : $code["image_url"];
                    $codes[$key]['promo_code_message'] = !empty($codes[$key]['promo_code_message']) ? $codes[$key]['promo_code_message'] : $code["message"];
                    $codes[$key]['total'] = (isset($codes[$key]['total']) && $codes[$key]['total'] > 0) ? $codes[$key]['total'] : 0;
                    $codes[$key]['discount'] = (isset($codes[$key]['discount']) && $codes[$key]['discount'] > 0) ? $codes[$key]['discount'] : 0;
                    $codes[$key]['discounted_amount'] = (isset($codes[$key]['discounted_amount']) &&  $codes[$key]['discounted_amount'] > 0) ? $codes[$key]['discounted_amount'] : 0;
                }
            }
            return CommonHelper::responseWithData($codes, $total);
        }else{
            return CommonHelper::responseError("Data not Found!");
        }
    }

    public function  getSocialMedia(){
        $socialMedia = SocialMedia::orderBy('id','DESC')->get();
        if(count($socialMedia)){
            return CommonHelper::responseWithData($socialMedia);
        }else{
            return CommonHelper::responseError("No Offer Found!");
        }
    }
    public function getCities(Request $request){
        $limit = $request->limit??10;
        $offset = $request->offset??0;

        if (isset($request->search) && $request->search != '') {
            $search = $request->search;
            $where = " `id` like '%" . $search . "%' OR `name` like '%";
        }
        $total = City::count();
        $sql = City::select("*");
        if (isset($where) && $where != ""){
            $sql = $sql->whereRaw($where);
        }
        $city = $sql->orderBy("id","DESC")->skip($offset)->take($limit)->get();
        $city = $city->makeHidden(['range_wise_charges','geolocation_type','radius','boundary_points']);
        if(count($city)){
            return CommonHelper::responseWithData($city,$total);
        }else{
            return CommonHelper::responseError(__('no_city_found'));
        }
    }

    public function getCity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
        ], [
            'required' => 'The city :attribute field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $city = CommonHelper::getDeliverableCity($request->latitude, $request->longitude);


        if (empty($city) && isDemoMode()) {
            $city = CommonHelper::getDefaultCity();
        }


        if (empty($city)) {
            return CommonHelper::responseError(__('we_doesnt_delivery_at_selected_city'));
        }
        return CommonHelper::responseWithData($city);
    }

    public function getSeller(Request $request){

        if(!isset($request->product_id) && !isset($request->seller_id)){
            return CommonHelper::responseError(__('something_is_missing'));
        }

        if(isset($request->product_id) && !empty(isset($request->product_id)) &&
            $request->product_id !== 0 ){
            $product = Product::where("id",$request->product_id)->first();
            if($product){
                $seller_id = $product->seller_id;
            }else{
                return CommonHelper::responseError(__('seller_not_found'));
            }
        }else{
            $seller_id = $request->seller_id;
        }
        $seller = Seller::select('id','name','store_name','email','mobile','store_url','logo')->where("id", $seller_id)->first();
        $seller = $seller->makeHidden(['logo']);
        if($seller){
            return CommonHelper::responseWithData($seller);
        }else{
            return CommonHelper::responseError(__('seller_not_found'));
        }
    }

    public function getSellers(Request $request){
        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
        ], [
            'latitude.required' => 'The latitude field is required.',
            'longitude.required' => 'The longitude field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $sellers = Seller::select('sellers.id', 'sellers.name', 'sellers.store_name', 'sellers.logo', DB::raw("ROUND(6371 * acos(cos(radians(" . $request->latitude . "))
                                * cos(radians(sellers.latitude)) * cos(radians(sellers.longitude) - radians(" . $request->longitude . "))
                                + sin(radians(" .$request->latitude. ")) * sin(radians(sellers.latitude))), 2) AS distance"), 'cities.max_deliverable_distance')
            ->leftJoin("cities", "sellers.city_id", "cities.id")
            ->where('status', Seller::$statusActive)
            ->whereExists(function($query) {
                $query->select(DB::raw(1))
                    ->from('products')
                    ->whereColumn('products.seller_id', 'sellers.id');
            })
            ->orderBy('distance','asc')
            ->get();

        $sellers = $sellers->makeHidden(['national_identity_card_url','address_proof_url','logo']);
        $total = $sellers->count();
        if(count($sellers) > 0 ){
            return CommonHelper::responseWithData($sellers, $total);
        }else{
            return CommonHelper::responseError(__('seller_not_found'));
        }
    }


    public function getNotifications(Request $request){
        $limit = ($request->limit)??10;
        $offset = ($request->offset)??0;
        $sort = ($request->sort)??'id';
        $order = ($request->sort)??'DESC';
        $where = '';
        if (isset($request->search) && $request->search != '') {
            $search = $request->search;
            $where = " `id` like '%" . $search . "%' OR `title` like '%" . $search . "%' OR `message` like '%" . $search . "%' OR `image` like '%" . $search . "%' OR `date_sent` like '%" . $search . "%' ";
        }

        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : '';
        if(isset($user_id)){
            $sql = Notification::where('type_id',$user_id)->orWhere(function($query) {
                    $query->where('type','!=','user');
                });
        } else {
            $sql = Notification::where('type','!=','user');
        }
        if ($where != ""){
            $sql = $sql->whereRaw($where);
        }
        $total = $sql->count();
        $notifications = $sql->orderBy($sort,$order)->skip($offset)->take($limit)->get();

        if(!empty($notifications)){
            $rows = array();
            foreach ($notifications as $row) {
                $tempRow = array();
                $tempRow['id'] = $row->id;
                $tempRow['title'] = $row->title;
                $tempRow['message'] = $row->message;
                $tempRow['type'] = $row->type;
                $tempRow['type_id'] = $row->type_id;
                $tempRow['image_url'] = CommonHelper::getImage($row->image);
                $tempRow['link_url'] = $row->type_link;
                $tempRow['date_sent'] = $row->date_sent;
                $rows[] = $tempRow;
            }
            return CommonHelper::responseWithData($rows,$total);
        } else {
            return CommonHelper::responseError(__('no_notification_found'));
        }

    }

    public function getBrands(Request $request)
    {
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 10);
        $latitude = $request->get('latitude');
        $longitude = $request->get('longitude');
    
        // Validate if latitude & longitude are provided
        if (!$latitude || !$longitude) {
            return CommonHelper::responseError(__('Latitude and longitude are required.'));
        }
    
        // Get seller IDs based on location
        $seller_ids = CommonHelper::getSellerIds($latitude, $longitude);
    
        // If no sellers found in the area, return error
        if (empty($seller_ids)) {
            return CommonHelper::responseError(__('No sellers found in this area.'));
        }
    
        // Fetch brands with products sold by sellers in the area
        $brands = Brand::where('status', 1)
        ->whereHas('products', function ($query) use ($seller_ids) {
            $query->whereIn('products.seller_id', $seller_ids)
                ->where('products.status', 1)
                ->where('products.is_approved', 1)
                ->whereExists(function ($categoryQuery) {
                    $categoryQuery->select(DB::raw(1))
                        ->from('categories')
                        ->whereColumn('categories.id', 'products.category_id')
                        ->where('categories.status', 1);
                });
        })
        ->orderBy('id', 'ASC');
    
        // Get total count before applying pagination
        $total = $brands->count();
    
        // Apply pagination
        $brands = $brands->offset($offset)->limit($limit)->get();
        $brands = $brands->makeHidden(['created_at', 'updated_at', 'image', 'status']);
    
        if ($brands->isNotEmpty()) {
            return CommonHelper::responseWithData($brands, $total);
        } else {
            return CommonHelper::responseError(__('No brands found in this area.'));
        }
    }
    public function getCountries(Request $request){
        $offset = $request->get('offset', 0);
        $limit = $request->get('limit', 10);
        $latitude = $request->get('latitude');
        $longitude = $request->get('longitude');

        $seller_ids = CommonHelper::getSellerIds($latitude, $longitude);
    
        // If no sellers found in the area, return error
        if (empty($seller_ids)) {
            return CommonHelper::responseError(__('No sellers found in this area.'));
        }

        $countries = Country::orderBy('id', 'ASC')
        ->where('status', 1)
        ->whereExists(function ($query) use ($seller_ids) {
            $query->select(DB::raw(1))
                ->from('products')
                ->whereColumn('products.made_in', 'countries.id')
                ->whereIn('products.seller_id', $seller_ids)  // Check seller_id
                ->where('products.status', 1)                // Product status = 1
                ->where('products.is_approved', 1)           // Product is approved
                ->whereExists(function ($subQuery) { 
                    $subQuery->select(DB::raw(1))
                        ->from('categories')
                        ->whereColumn('categories.id', 'products.category_id')
                        ->where('categories.status', 1);   // Category status = 1
                });
        });
       
        $total = $countries->count();
        $countries = $countries->offset($offset)->limit($limit)->get();
        $countries = $countries->makeHidden(['created_at','updated_at','status']);
        if(!empty($countries)){
            return CommonHelper::responseWithData($countries,$total);
        }else{
            return CommonHelper::responseError(__('no_countries_found'));
        }
    }

    public function getOrderStatusLists(){
        $statuses = OrderStatusList::orderBy('id','ASC')->get();
        $total = $statuses->count();
        if(!empty($statuses)){
            return CommonHelper::responseWithData($statuses,$total);
        }else{
            return CommonHelper::responseError('Status not found.');
        }
    }

    public function getMailSetting()
    {
        $user_id = auth()->user()->id;
        $user_type = 0;
        $setting = CommonHelper::getMailSetting($user_type,$user_id);
        $setting = $setting->makeHidden(['user_id','user_type','created_at','updated_at']);
        return CommonHelper::responseWithData($setting);
    }
    public function saveMailSetting(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'status_ids' => 'required',
            'mail_statuses' => 'required',
            'mobile_statuses' => 'required'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $user_id = auth()->user()->id;
        $user_type = 0;
        $status_ids = is_array($request->status_ids) ? $request->status_ids: explode(",", $request->status_ids);
        $mail_statuses = is_array($request->mail_statuses) ? $request->mail_statuses : explode(",", $request->mail_statuses);
        $mobile_statuses = is_array($request->mobile_statuses) ? $request->mobile_statuses : explode(",", $request->mobile_statuses);

        $order_status_ids = OrderStatusList::get()->pluck('id')->toArray();
        if (array_intersect($status_ids, $order_status_ids) != $status_ids) {
            return CommonHelper:: responseError("Status ids is not belongs to order status list id.");
        }

        CommonHelper::saveMailSetting($user_id,$user_type,$status_ids,$mail_statuses,$mobile_statuses,[0,0,0,0,0,0,0,0]);
        return CommonHelper::responseSuccess("Mail Settings Saved Successfully!");
    }

    public function stripeTest(){

        $stripe_secret_key = "sk_test_51MKxDESEKxefYE6MpiYMvsrqu6QmFok5V3AFaYcGzv8ti5knjt0CaGAZa4CBFZe5kRowikzily3InXOqyrjrLeNh00XQbBhiNA";
        try {
            $stripe = new \Stripe\StripeClient(
                $stripe_secret_key
            );

            $tran = $stripe->paymentIntents->retrieve(
                "pi_3MMPKcSEKxefYE6M00PuXMt4",
                []
            );
        } catch (\Exception $e) {
            Log::error("Installer -> Database Error : ",[$e]);
            return CommonHelper::responseError($e->getMessage());
        }


    }
    public function deleteSellerAccount(Request $request){
        try{
            $seller_admin_id = auth()->user()->id;
            $seller = Seller::where('admin_id', $seller_admin_id)->first();
            
            if($seller->email == 'seller@gmail.com' && isDemoMode()){
               return CommonHelper::responseError("This function is not available in demo mode!");
            }
            $admin = Admin::where('id', $seller_admin_id)->first();
            $admin->delete();
            $seller->delete();
            return CommonHelper::responseSuccess("Your seller account deleted successfully!");
        }catch ( \Exception $e){
            Log::error('Login : '.$e->getMessage());
            return CommonHelper::responseError($e->getMessage());
        }
    }

    public function deleteDeliveryBoyAccount(Request $request){
        try{
            $delivery_boy_admin_id = auth()->user()->id;
            $delivery_boy = DeliveryBoy::where('admin_id', $delivery_boy_admin_id)->first();
            
            if($delivery_boy->email == 'delivery@gmail.com' && isDemoMode()){
               return CommonHelper::responseError("This function is not available in demo mode!");
            }
            $admin = Admin::where('id', $delivery_boy_admin_id)->first();
            $admin->delete();
            $delivery_boy->delete();
            return CommonHelper::responseSuccess("Your delivery boy account deleted successfully!");
        }catch ( \Exception $e){
            Log::error('Login : '.$e->getMessage());
            return CommonHelper::responseError($e->getMessage());
        }
    }

    public function getSeoThings(Request $request)
    {
        $slug = $request->input('slug');

        $category = Category::select('meta_title', 'meta_keywords', 'meta_description', 'schema_markup','image')
            ->where('slug', $slug)
            ->first();

        if (!$category) {
            return CommonHelper::responseError("Category not available");
        }
        $seoThings = [];
        $seoThings['meta_title'] = $category->meta_title;
        $seoThings['meta_keywords'] = $category->meta_keywords;
        $seoThings['meta_description'] = $category->meta_description;
        $seoThings['schema_markup'] = $category->schema_markup;
        $seoThings['og_image'] = $category->image_url;
        $seoThings['favicon'] = Setting::get_value('favicon') ? asset('storage/'.Setting::get_value('favicon')) : '';
        
        return CommonHelper::responseWithData($seoThings);
    }

}
