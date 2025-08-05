<?php

namespace App\Helpers;

use App\Jobs\SendEmailJob;
use App\Models\Admin;
use App\Models\AdminToken;
use App\Models\Brand;
use App\Models\Cart;
use App\Models\Category;
use App\Models\City;
use App\Models\DeliveryBoy;
use App\Models\Favorite;
use App\Models\FundTransfer;
use App\Models\MailSetting;
use App\Models\Notification;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatus;
use App\Models\OrderStatusList;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\ProductVariant;
use App\Models\PromoCode;
use App\Models\Section;
use App\Models\Seller;
use App\Models\Setting;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserAddress;
use App\Models\UserToken;
use App\Models\WalletTransaction;
use App\Models\SellerWalletTransaction;
use App\Models\SmsTemplate;
use App\Helpers\TwilioHelper;
use DateTime;
use DateTimeZone;
use DB;
use Faker\Provider\Address;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;
use Mpdf\Output\Destination;
use Response;
use Illuminate\Validation\Rule;
use App\Models\RatingImages;
use App\Models\ProductRating;
use Carbon\Carbon;
use App\Notifications\OrderNotification;
use App\Jobs\SendCartNotification;
use App\Models\CartNotification;
class CommonHelper
{

    public static function responseError($message)
    {
        return Response::json(array('status' => 0, 'message' => $message));
    }
    public static function responseErrorWithData($message, $data)
    {
        return Response::json(array('status' => 0, 'message' => $message, 'data' => $data));
    }

    public static function responseSuccess($message)
    {
        return Response::json(array('status' => 1, 'message' => $message));
    }

    public static function responseWithData($data,$total = null)
    {
        $total = $total ?? 1;
        return Response::json(array('status' => 1, 'message' => 'success','total'=> $total, 'data' => $data));
    }

    public static function responseSuccessWithData($message, $data)
    {
        return Response::json(array('status' => 1, 'message' => $message, 'data' => $data));
    }

    public static function getColumnComment($tableName, $columnName){
        $databaseName = \DB::connection()->getDatabaseName();
        $comments = \DB::select("SELECT COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '$databaseName' AND TABLE_NAME = '$tableName' AND COLUMN_NAME = '$columnName'");
        return $comments[0]->COLUMN_COMMENT;
    }


    public static function slugify($text, $table = 'products', $field = 'slug', $key = NULL, $value = NULL)
    {
        // replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        // transliterate
        //   $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        // $text = iconv('utf-8', 'UTF-8//TRANSLIT', $text);

        // remove unwanted characters
        // $text = preg_replace('~[^-\w]+~', '', $text);
        // echo $text;
        // trim
        $text = trim($text, '-');

        // remove duplicate -
        $text = preg_replace('~-+~', '-', $text);

        // lowercase
        $slug = strtolower($text);

        if (empty($slug)) {
            return 'n-a';
        }
        $total = \DB::select(\DB::raw("SELECT COUNT(id) AS total_slugs FROM $table WHERE $field  LIKE '$slug%'"));

        return ($total[0]->total_slugs > 0) ? ($slug . '-' . $total[0]->total_slugs) : $slug;
    }

    public static function getTimezoneOptions()
    {
        $list = DateTimeZone::listAbbreviations();
        $idents = DateTimeZone::listIdentifiers();

        $data = $offset = $added = array();
        foreach ($list as $abbr => $info) {
            foreach ($info as $zone) {
                if (
                    !empty($zone['timezone_id'])
                    and
                    !in_array($zone['timezone_id'], $added)
                    and
                    in_array($zone['timezone_id'], $idents)
                ) {
                    $z = new DateTimeZone($zone['timezone_id']);
                    $c = new DateTime(null, $z);
                    $zone['time'] = $c->format('H:i a');
                    $offset[] = $zone['offset'] = $z->getOffset($c);
                    $data[] = $zone;
                    $added[] = $zone['timezone_id'];
                }
            }
        }
        array_multisort($offset, SORT_ASC, $data);
        $i = 0;
        $temp = array();
        foreach ($data as $key => $row) {
            $temp[0] = $row['time'];
            $temp[1] = self::formatOffset($row['offset']);
            $temp[2] = $row['timezone_id'];
            $options[$i++] = $temp;
        }
        return $options;
    }

    public static function formatOffset($offset)
    {
        $hours = $offset / 3600;
        $remainder = $offset % 3600;
        $sign = $hours > 0 ? '+' : '-';
        $hour = (int)abs($hours);
        $minutes = (int)abs($remainder / 60);

        if ($hour == 0 and $minutes == 0) {
            $sign = ' ';
        }
        return $sign . str_pad($hour, 2, '0', STR_PAD_LEFT) . ':' . str_pad($minutes, 2, '0');
    }

    public static function convertSettingsInArray($settings): array
    {
        $imageArray = array("play_store_logo","ios_store_logo","favicon","web_logo","loading","logo","popup_image","placeholder_image");
        $data = array();
        foreach ($settings as $setting){
            if(in_array($setting->variable,$imageArray)){
                $data[$setting->variable] = self::getImage($setting->value);
            }else{
                $data[$setting->variable] = $setting->value;
            }
        }
        return $data;
    }

    public static function getSettings($variables)
    {
        $settings = Setting::whereIn('variable', $variables)->get();
        $settingsArray = self::convertSettingsInArray($settings);

        // Set default values if not present
        $defaults = [
            'currency' => '₹',
            'currency_code' => 'INR',
            'decimal_point' => 2,
        ];

        return array_merge($defaults, $settingsArray);
    }

    public static function getDefaultCity(){
        $default_city_id = Setting::get_value('default_city_id');
        return City::select('id','name','state','formatted_address','latitude','longitude')->where('id', $default_city_id)->first();
    }

    public static function getDeliveryBoyBonusSettings(): array
    {
        $variablesArray = array("delivery_boy_bonus_settings", "delivery_boy_bonus_type", "delivery_boy_bonus_percentage", "delivery_boy_bonus_min_amount", "delivery_boy_bonus_max_amount");
        $bonus =  self::getSettings($variablesArray);
        //return array_map('floatval', $bonus);
        //return array_map('intval', $bonus);
        $bonus['delivery_boy_bonus_settings'] = intval($bonus['delivery_boy_bonus_settings']);
        $bonus['delivery_boy_bonus_type'] = intval($bonus['delivery_boy_bonus_type']);
        $bonus['delivery_boy_bonus_percentage'] = floatval($bonus['delivery_boy_bonus_percentage']);
        $bonus['delivery_boy_bonus_min_amount'] = floatval($bonus['delivery_boy_bonus_min_amount']);
        $bonus['delivery_boy_bonus_max_amount'] = floatval($bonus['delivery_boy_bonus_max_amount']);
        return $bonus;
    }



    public static function getMainCategories($request) {
        // Initialize the query to get main categories
        $query = Category::orderBy('id', 'DESC')
                        ->where(['parent_id' => 0, 'status' => 1]);
    
        // If a search term is provided in the request, add a search condition
        if (isset($request->search) && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where('name', 'LIKE', '%' . $searchTerm . '%');
        }
    
        // Execute the query and return the results
        return $query->get();
    }

    public static function categoryTree($parent_id = 0, $sub_mark = '', $default = NULL, $dont_include = array(), $only_last_selecatble = false, $multiple_default = array(), $exclude_id=0,$seller_id = 0)
    {
        if($seller_id != 0) {
            $seller = Seller::where('id',$seller_id)->first();
            $categories = Category::with('parent')->where('parent_id', $parent_id)->whereIn('id', explode(",", $seller->categories));
        }else{
            $categories = Category::with('parent')->where('parent_id', $parent_id);
        }

        if($exclude_id != 0){
            $categories = $categories->where('id', '!=', $exclude_id);
        }

        if (count($dont_include) > 0) {
            foreach ($dont_include as $dontInclude) {
                $categories->where('id', '!=', $dontInclude);
                $categories->where('parent_id', '!=', $dontInclude); 
            }
        }

        $categories = $categories->get();

        if (count($categories) > 0) {
            foreach ($categories as $category) {
                //$category->CategoryLocalName();
                //for single selection
                $selected = '';
                if (isset($default) and $default == $category->id) {
                    $selected = 'selected';
                }

                //for multiple selection
                $multiSelected = '';
                if (isset($multiple_default) and in_array($category->id, $multiple_default)) {
                    $multiSelected = 'selected';
                }

                if ($only_last_selecatble) {
                    if ($category->childs->count() == 0) {
                        echo '<option value="' . $category->id . '"  ' . $selected . ' ' . $multiSelected . ' >' . $sub_mark . $category->name . '</option>';
                    } else {
                        echo '<optgroup label="' . $sub_mark . $category->name . '">';
                        self::categoryTree($category->id, $sub_mark . '&nbsp;&nbsp;', $default, $dont_include, $only_last_selecatble, $multiple_default);
                        echo '</optgroup>';
                    }
                } else {
                    echo '<option value="' . $category->id . '"  ' . $selected . ' ' . $multiSelected . '>' . $sub_mark . $category->name . '</option>';
                    self::categoryTree($category->id, $sub_mark . '&nbsp;&nbsp;', $default, $dont_include, $only_last_selecatble, $multiple_default);
                }
            }
        }

    }

    public static function uploadProductImages($images, $product_id, $variant_id = 0) 
    {
        foreach ($images as $file) {
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $extension = $file->getClientOriginalExtension();
            if (in_array(strtolower($extension), $allowedExtensions)) {
                $image = Storage::disk('public')->putFileAs('products', $file, $fileName);
                $productImages = new ProductImages();
                $productImages->product_id = $product_id;
                $productImages->product_variant_id = $variant_id;
                $productImages->image = $image;
                $productImages->save();
            }
        }
    }

    public static function validatePromoCode($user_id, $promo_code, $total)
    {
        $code = PromoCode::where('promo_code', $promo_code)->first();
        $promo_code_id = $code->id;
        if (empty($code)) {
            $response['is_applicable'] = 0;
            $response['message'] = "Invalid promo code.";
            return $response;
        }
        if ($code->status == 0) {
            $response['is_applicable'] = 0;
            $response['message'] = "This promo code is either expired / invalid.";
            return $response;
        }
        $user = auth()->user();
        if (empty($user)) {
            $response['is_applicable'] = 0;
            $response['message'] = "Invalid user data.";
            return $response;
        }
        $start_date = $code->start_date;
        $end_date = $code->end_date;
        $date = date('Y-m-d h:i:s a');
        if ($date < $start_date) {
            $response['is_applicable'] = 0;
            $response['message'] = "This promo code can't be used before " . date('d-m-Y', strtotime($start_date));
            return $response;
        }
        if ($date > $end_date) {
            $response['is_applicable'] = 0;
            $response['message'] = "This promo code can't be used after " . date('d-m-Y', strtotime($end_date));
            return $response;
        }
        if ($total < $code->minimum_order_amount) {
            $response['is_applicable'] = 0;
            $response['message'] = "This promo code is applicable only for order amount greater than or equal to " . $code->minimum_order_amount;
            return $response;
        }
        //check how many users have used this promo code and no of users used this promo code crossed max users or not
        $order = Order::select('id')->where('promo_code_id', $promo_code_id)->groupBy('user_id')->get()->toArray();
        if (count($order) >= $code->no_of_users) {
            $response['is_applicable'] = 0;
            $response['message'] = "This promo code is applicable only for first " . $code->no_of_users . " users.";
            return $response;
        }
        //check how many times user have used this promo code and count crossed max limit or not
        if ($code->repeat_usage == 1) {
            $order = Order::select('id')->where('user_id', $user_id)->where('promo_code_id', $promo_code_id)->groupBy('user_id')->get()->toArray();
            $total_usage = count($order);
            if ($total_usage >= $code->no_of_repeat_usage && $code->no_of_repeat_usage != 0) {
                $response['is_applicable'] = 0;
                $response['message'] = "This promo code is applicable only for " . $code->no_of_repeat_usage . " times.";
                return $response;
            }
        }
        //check if repeat usage is not allowed and user have already used this promo code
        if ($code->repeat_usage == 0) {
            $order = Order::select('id')->where('user_id', $user_id)->where('promo_code_id', $promo_code_id)->groupBy('user_id')->get()->toArray();
            $total_usage = count($order);
            if ($total_usage >= 1) {
                $response['is_applicable'] = 0;
                $response['message'] = "This promo code is applicable only for 1 time.";
                return $response;
            }
        }
        if ($code->discount_type == 'percentage') {
            $percentage = $code->discount;
            $discount = $total / 100 * $percentage;
            if ($discount > $code->max_discount_amount) {
                $discount = $code->max_discount_amount;
            }
        } else {
            $discount = $code->discount;
        }
        $discounted_amount = $total - $discount;

        $response['promo_code_id'] = $code->id;
        $response['is_applicable'] = 1;
        $response['message'] = "Promo code applied successfully.";
        $response['promo_code'] = $promo_code;
        $response['image_url'] = $code->image_url;
        $response['promo_code_message'] = $code->message;
        $response['total'] = $total;
        $response['discount'] = $discount;
        $response['discounted_amount'] = $discounted_amount;
        //$response['status'] = $code->status;
        return $response;
    }

    public static function getValidatedPromoCode($promocode_id, $total, $user_id){
        $code = PromoCode::find($promocode_id);
        /*if (empty($code)) {
            return CommonHelper::responseError("Promo code not found!");
        }*/

        if (!empty($code)) {
            return self::validatePromoCode($user_id, $code->promo_code, $total);
        }
    }

    public static function getDeliverableCity($latitude, $longitude){
        // $city = city::select('cities.*', DB::raw("6371 * acos(cos(radians(" . $latitude . "))
        //                         * cos(radians(sellers.latitude)) * cos(radians(sellers.longitude) - radians(" . $longitude . "))
        //                         + sin(radians(" .$latitude. ")) * sin(radians(sellers.latitude))) AS distance"), 'cities.max_deliverable_distance')
        //     ->leftJoin("sellers", "sellers.city_id", "cities.id")
        //     ->havingRaw("distance < cities.max_deliverable_distance")
        //     ->first();
            
            $point = ['lat' => $latitude, 'lng' => $longitude];

        // Retrieve cities with boundary points
        $cities = City::all();
      
        $cityIds = '';
    
        foreach ($cities as $city) {
            if($city->geolocation_type == 'polygon'){
                $polygon = json_decode($city->boundary_points, true);
        
                if (is_array($polygon) && !empty($polygon) && self::isPointInPolygon($point, $polygon)) {
                    $cityIds = $city->id;
                }
            }elseif($city->geolocation_type == 'circle'){
                $boundaryPoints  = json_decode($city->boundary_points, true);
                $radius = $city->radius; // Assuming radius is stored in meters
        
                if (is_array($boundaryPoints) && !empty($boundaryPoints)) {
                    $center = $boundaryPoints[0]; // Assuming the first element is the center point
                    if (self::isPointInCircle($point, $center, $radius)) {
                        $cityIds = $city->id;
                    }
                }
            }   
        }
        
        $city = city::select('cities.*')
            ->leftJoin("sellers", "sellers.city_id", "cities.id")
            ->where("cities.id",$cityIds)
            ->first();
        return $city;
    }
    function boundaryPointsToPolygon($boundaryPoints) {
        $pointsArray = json_decode($boundaryPoints, true);
        $wkt = 'POLYGON((' . implode(',', array_map(function ($point) {
            return "{$point['lng']} {$point['lat']}";
        }, $pointsArray)) . '))';
        return $wkt;
    }

    public static function getSellerIds($latitude, $longitude){

        // Helper function to convert boundary points to polygon WKT
        $point = ['lat' => $latitude, 'lng' => $longitude];

        // Retrieve cities with boundary points
        $cities = City::all();
      
        $cityIds = [];
    
        foreach ($cities as $city) {
            if($city->geolocation_type == 'polygon'){
                $polygon = json_decode($city->boundary_points, true);
        
                if (is_array($polygon) && !empty($polygon) && self::isPointInPolygon($point, $polygon)) {
                    $cityIds[] = $city->id;
                }
            }elseif($city->geolocation_type == 'circle'){
                $boundaryPoints  = json_decode($city->boundary_points, true);
                $radius = $city->radius; // Assuming radius is stored in meters
        
                if (is_array($boundaryPoints) && !empty($boundaryPoints)) {
                    $center = $boundaryPoints[0]; // Assuming the first element is the center point
                    if (self::isPointInCircle($point, $center, $radius)) {
                        $cityIds[] = $city->id;
                    }
                }
            }   
        }
   
        $sellerIds = self::getSellerIdsfromCityIds($cityIds);
        return $sellerIds;

    }
    public static function isPointInPolygon($point, $polygon)
    {
        if (empty($polygon) || !is_array($polygon)) {
            return false; // Return false if polygon data is not valid
        }
    
        $x = $point['lng'];
        $y = $point['lat'];
    
        $vertices = $polygon;
        $count = count($vertices);
    
        if ($count < 3) {
            return false; // A polygon must have at least 3 vertices
        }
    
        $inside = false;
        $p1x = $vertices[0]['lng'];
        $p1y = $vertices[0]['lat'];
    
        for ($i = 1; $i <= $count; $i++) {
            $p2x = $vertices[$i % $count]['lng'];
            $p2y = $vertices[$i % $count]['lat'];
    
            if ($y > min($p1y, $p2y)) {
                if ($y <= max($p1y, $p2y)) {
                    if ($x <= max($p1x, $p2x)) {
                        if ($p1y != $p2y) {
                            $xinters = ($y - $p1y) * ($p2x - $p1x) / ($p2y - $p1y) + $p1x;
                        }
                        if ($p1x == $p2x || $x <= $xinters) {
                            $inside = !$inside;
                        }
                    }
                }
            }
    
            $p1x = $p2x;
            $p1y = $p2y;
        }
    
        return $inside;
    }
    public static function isPointInCircle($point, $center, $radius) {
        $earthRadius = 6371000; // Earth's radius in meters
    
        $latFrom = deg2rad($center['lat']);
        $lngFrom = deg2rad($center['lng']);
        $latTo = deg2rad($point['lat']);
        $lngTo = deg2rad($point['lng']);
    
        $latDelta = $latTo - $latFrom;
        $lngDelta = $lngTo - $lngFrom;
    
        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lngDelta / 2), 2)));
    
        $distance = $angle * $earthRadius;
    
        return $distance <= $radius;
    }
    public static function getSellerIdsfromCityIds(array $cityIds)
{
    if (empty($cityIds)) {
        return [];
    }

    $query =Seller::where('status', 1); // Adding the status condition

    $query->where(function($q) use ($cityIds) {
        foreach ($cityIds as $cityId) {
            // Check if city_id is a comma-separated string (e.g., '1,2')
            $q->orWhereRaw('FIND_IN_SET(?, city_id)', [$cityId])
              // Check if city_id is an individual integer or an array
              ->orWhereIn('city_id', $cityIds);
        }
    });

    $sellerIds = $query->pluck('id');
//dd($sellerIds);
    return $sellerIds;
}
    public static function getProductByVariantId($arr){
        if (!empty($arr)) {
           $variants = ProductVariant::select(
                "pv.*",
                "pv.id",
                "pv.type as product_type",
                "p.seller_id",
                "p.name as product_name",
                "p.is_unlimited_stock",
                DB::raw("(SELECT t.title FROM taxes t WHERE t.id = p.tax_id) as tax_title"),
                DB::raw("(SELECT t.percentage FROM taxes t WHERE t.id = p.tax_id) as tax_percentage"),
                DB::raw("(SELECT short_code FROM units as u WHERE u.id = pv.stock_unit_id) as stock_unit_name")
            )
            ->from("product_variants as pv")
            ->leftJoin("products as p", "pv.product_id", "=", "p.id")
            ->whereIn("pv.id", $arr)
            ->orderByRaw("FIELD(pv.id, " . implode(',', $arr) . ")")
            ->get();
               
            if (!empty($variants)) {
                return $variants;
            }
        }
    }

    public static function getUserAddress($id) {
        $address = UserAddress::where("id",$id)->first();
        return $address;
    }

    public static function addUserWalletBalance($amount, $id){
        $user = User::where("id",$id)->first();
        
        $user->balance = $user->balance + $amount;
        $user->save();
        return $user->balance;
    }

    public static function updateUserWalletBalance($new_balance, $id){
        $user = User::where("id",$id)->first();
        $user->balance = $new_balance;
        $user->save();
    }

    public static function getUserWalletBalance($id){
        $user = User::find($id);
        $balance = 0;
        if ($user) {
            $balance = $user->balance;
        } 
        return $balance;
    }
    public static function addWalletTransaction($order_id, $order_item_id, $user_id, $type, $wallet_balance, $mesage, $status = 1){
        $transaction = new WalletTransaction();
        $transaction->order_id = $order_id;
        $transaction->order_item_id	 = $order_item_id;
        $transaction->user_id = $user_id;
        $transaction->type = $type;
        $transaction->amount = $wallet_balance;
        $transaction->message = $mesage;
        $transaction->status = $status;
        $transaction->save();

        if ($transaction->id) {
            /*if ($table_name == 'users') {
                $result = $this->send_order_update_notification($id, "Wallet Transaction", $message, 'wallet_transaction', 0);
            }
            $data1 = $this->db->getResult();*/
            return $transaction;
        } else {
            return false;
        }
    }

    public static function isInPolygon($points_polygon, $vertices_x, $vertices_y, $longitude_x, $latitude_y){

        /* $i = $j = $c = 0;
        $i = $j = $c = 0;
        for ($i = 0, $j = $points_polygon; $i < $points_polygon; $j = $i++) {
            echo "<br>i".$i ."-  j". $j;
            if ((($vertices_y[$i]  >  $latitude_y != ($vertices_y[$j] > $latitude_y)) &&
                ($longitude_x < ($vertices_x[$j] - $vertices_x[$i]) * ($latitude_y - $vertices_y[$i]) / ($vertices_y[$j] - $vertices_y[$i]) + $vertices_x[$i])))
                $c = !$c;
        }
        return $c; */

        $i = $j = $c = 0;
        for ($i = 0, $j = $points_polygon-1 ; $i < $points_polygon; $j = $i++) {
            //echo "<br>i".$i ."-  j". $j;
            if ( (($vertices_y[$i] > $latitude_y != ($vertices_y[$j] > $latitude_y)) &&
                ($longitude_x < ($vertices_x[$j] - $vertices_x[$i]) * ($latitude_y - $vertices_y[$i]) / ($vertices_y[$j] - $vertices_y[$i]) + $vertices_x[$i]) ) )
                $c = !$c;
        }
        return $c;
    }

    public static function isDeliverable($city_id,$latitudeTo, $longitudeTo, $unit = 'K'){
        // $theta = $longitudeFrom - $longitudeTo;
        // $dist = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
        // $dist = acos($dist);
        // $dist = rad2deg($dist);
        // $miles = $dist * 60 * 1.1515;
        // $unit = strtoupper($unit);

        // if ($unit == "K") {
        //     $distance = ($miles * 1.609344);
        // } else if ($unit == "N") {
        //     $distance = ($miles * 0.8684);
        // } else {
        //     $distance = $miles;
        // }
        // $result = 0;
        // if($distance <= $max_deliverable_distance){
        //     $result = !$result;
        // }
        // return $result;

        $point = ['lat' => $latitudeTo, 'lng' => $longitudeTo];

        // Retrieve cities with boundary points
        $checkcityIds = explode(',', $city_id);
        $cities = City::whereIn('id', $checkcityIds)->get();
        $cityIds = [];
    
        foreach ($cities as $city) {
            $polygon = json_decode($city->boundary_points, true);
    
            if (is_array($polygon) && !empty($polygon) && self::isPointInPolygon($point, $polygon)) {
                $cityIds[] = $city->id;
            }
        }
        // Return whether the point is deliverable in any of the specified cities
        return $isDeliverable = !empty($cityIds);
        
    }

    public static function isDeliverableOrder($address_id, $latitude, $longitude, $seller_id){
        if (!empty($seller_id) || $seller_id != "") {

            // get seller points
            $seller = Seller::select("latitude","longitude")->where("id","=",$seller_id)->first();

            /*$address =  UserAddress::select("latitude","longitude",
                DB::raw("ST_Distance_Sphere(POINT(latitude,longitude), ST_GeomFromText('POINT(". $seller->latitude." ".$seller->longitude.")'))/1000 as distance")
            )->where("id","=",$address_id)->first();*/

            $address =  UserAddress::select("latitude","longitude", DB::raw("6371 * acos(cos(radians(" . $seller->latitude . "))
                                * cos(radians(latitude)) * cos(radians(longitude) - radians(" . $seller->longitude . "))
                                + sin(radians(" .$seller->latitude. ")) * sin(radians(latitude))) AS distance"))
                ->where("id","=",$address_id)->first();

            $city = self::getDeliverableCity($latitude, $longitude);

            if(!empty($city)){
                return true;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }

    // public static function isOrderDeliverable($address_id, $latitude, $longitude, $seller_id, $type = "address"){
    //     if (!empty($seller_id) || $seller_id != "") {

    //         // get seller points
    //         $seller_data = Seller::select("latitude","longitude")->where("id","=",$seller_id)->first();

    //         //$where = "ST_Distance_Sphere(POINT(latitude,longitude), ST_GeomFromText('POINT(". $seller_data->latitude." ".$seller_data->longitude.")') ) as distance";
    //         //$data = fetch_details(['id' => $partner_id], "users", "latitude,longitude,$where");

    //         $data =  UserAddress::select("latitude","longitude", DB::raw("ST_Distance_Sphere(POINT(latitude,longitude), ST_GeomFromText('POINT(". $seller_data->latitude." ".$seller_data->longitude.")'))/1000 as distance")
    //         )->where("id","=",$address_id)->first();

    //         //echo($data->distance);

    //         /*if ($type == "city") {
    //             $partner = fetch_details(['id' => $address_id], 'cities', 'geolocation_type,radius,boundary_points,max_deliverable_distance');
    //         } else {
    //             $partner = fetch_details(['a.id' => $address_id], 'addresses a', 'a.city_id,c.geolocation_type,c.radius,c.boundary_points,c.max_deliverable_distance', null, null, null, "DESC", "", '', "cities c", "a.city_id=c.id");
    //         }*/

    //         $seller = Seller::select("s.city_id","c.geolocation_type","c.radius","c.boundary_points","c.max_deliverable_distance")
    //             ->from("sellers as s")
    //             ->leftJoin("cities as c", "s.city_id", "=", "c.id")
    //             ->where("s.id","=",$seller_id)
    //             ->first();
    //         $city_distance = $seller->max_deliverable_distance;
    //         /*if (isset($seller) && !empty($seller) && isset($seller->geolocation_type) && $seller->geolocation_type == "polygon") {*/
    //         if (isset($seller) && !empty($seller) ) {
    //             $vertices_x = $seller->boundary_points ? array_column(json_decode($seller->boundary_points, true), "lng") : [];    // lng x-coordinates of the vertices of the polygon
    //             $vertices_y = $seller->boundary_points ? array_column(json_decode($seller->boundary_points, true), "lat") : [];    // lat y-coordinates of the vertices of the polygonn
    //             $points_polygon = count($vertices_x);  // number vertices - zero-based array

    //             if (self::isInPolygon($points_polygon, $vertices_x, $vertices_y, $longitude,$latitude)) {

    //                 // check for distance
    //                 $distance = $data->distance;
    //                 if ($distance <=  $city_distance) {
    //                     return true;   // in distance
    //                 } else {
    //                     return false;    // not in distance
    //                 }

    //             } else {
    //                 return false;    // not in polygon
    //             }
    //         } else if (isset($seller) && !empty($seller) && $seller->geolocation_type == "circle") {
    //             // check for distance
    //             $distance = $data->distance;
    //             if ($distance <=  $city_distance) {
    //                 return true;   // in distance
    //             } else {
    //                 return false;    // not in distance
    //             }
    //         } else {
    //             return false;
    //         }


    //     } else {
    //         return false;
    //     }
    // }

    public static function convertToParent($measurement, $measurement_unit_id){
        $unit = Unit::where("id","=",$measurement_unit_id)->first();
        if (!empty($unit->parent_id)) {
            $stock = $measurement / $unit->conversion;
        } else {
            $stock = ($measurement) * $unit->conversion;
        }
        return $stock;
    }

    public static function isOrderItemCancelled($order_item_id){
        /*$sql = "SELECT COUNT(id) as cancelled FROM `order_items` WHERE id=" . $order_item_id . " &&
        (active_status LIKE '%cancelled%' OR active_status LIKE '%returned%')";
        $this->db->sql($sql);
        $res_cancelled = $this->db->getResult();*/

        /*$order_item = OrderItem::select(DB::raw("count(id) as cancelled"))
            ->where("id", $order_item_id)
            ->where('active_status', 'like', '%' . OrderStatusList::$cancelled . '%')
            ->orWhere('active_status', 'like', '%' . OrderStatusList::$returned . '%')
            ->first();
        if ($order_item->cancelled > 0) {
            return true;
        } else {
            return false;
        }*/

        $order_item = OrderItem::select('products.cancelable_status',)
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->where("order_items.id", $order_item_id)
            ->first();

        if ($order_item->cancelable_status == OrderStatusList::$cancelled) {
            return true;
        } else {
            return false;
        }
    }
    public static function isOrderItemReturned($active_status, $postStatus)
    {
        if ($active_status != OrderStatusList::$delivered && $postStatus == OrderStatusList::$returned) {
            return true;
        } else {
            return false;
        }
    }
    public static function getImage($image)
    {
        if ($image) {
            return asset('storage/' . $image);
        } else {
            return '';
        }
    }
    public static function getImages($product_id,$variant_id=0){
        $productImages = ProductImages::where('product_id',$product_id)
            ->where('product_variant_id',$variant_id)
            ->get()->pluck('image_url')->toArray();
        return $productImages;
    }

    public static function getProductIdsSection($section){
        
        $cate_ids = $section->category_ids ? explode(",",$section->category_ids) : [];
        $product_ids = $section->product_ids;
      
        if ($section->product_type == 'all_products') {
              
            if (empty($section->category_ids)) {
                $sql = Product::select("id as product_id")->where("status", "=", 1)->orderBy("product_id","DESC");
            } else {
               
                $sql = Product::select("id as product_id")->whereIn("category_id", $cate_ids)->orderBy("product_id","DESC");
            }
        } elseif ($section->product_type == 'new_added_products') {
           
            if (empty($section->category_ids)) {
                $sql = Product::select("id as product_id")->where("status", "=", 1)->orderBy("id","DESC");
            } else {
                $sql = Product::select("id as product_id")->where("status", "=", 1)->whereIn("category_id", $cate_ids)->orderBy("id","DESC");
            }
        } elseif ($section->product_type == 'products_on_sale') {
            if (empty($section->category_ids)) {
                $sql = Product::select("p.id as product_id")->from("products as p")
                    ->leftJoin('product_variants as pv', 'pv.product_id', '=', 'p.id')
                    ->where("p.status", "=", 1)
                    ->where("pv.discounted_price", ">", 0)
                    ->where("pv.price", "=", "pv.discounted_price")
                    ->orderBy("p.id","DESC");
            } else {
                $sql = Product::select("p.id as product_id")->from("products as p")
                    ->leftJoin('product_variants as pv', 'pv.product_id', '=', 'p.id')
                    ->where("p.status", "=", 1)
                    ->whereIn("category_id", $cate_ids)
                    ->where("pv.discounted_price", ">", 0)
                    ->where("pv.price", "=", "pv.discounted_price")
                    ->orderBy("p.id","DESC");
            }
        } elseif ($section->product_type == 'most_selling_products') {
            if (empty($section->category_ids)) {
                $sql = OrderItem::select("p.id as product_id", \Illuminate\Support\Facades\DB::raw("COUNT(oi.product_variant_id) AS total"))
                    ->from("order_items as oi")
                    ->leftJoin("product_variants as pv", "oi.product_variant_id", "=", "pv.id")
                    ->leftJoin("products as p", "pv.product_id", "=", "p.id")
                    ->where("oi.product_variant_id", "!=", 0)
                    ->where("p.id", "!=", "")
                    ->groupBy(['pv.id', 'p.id'])
                    ->orderBy("total","DESC");
            } else {
                $sql = OrderItem::select("p.id as product_id",
                    "oi.product_variant_id",
                    DB::raw("COUNT(oi.product_variant_id) AS total"))
                    ->from("order_items as oi")
                    ->leftJoin("product_variants as pv", "oi.product_variant_id", "=", "pv.id")
                    ->leftJoin("products as p", "pv.product_id", "=", "p.id")
                    ->where("oi.product_variant_id", "!=", 0)
                    ->where("p.id", "!=", "")
                    ->whereIn("category_id", $cate_ids)
                    ->groupBy(['pv.id', 'p.id'])
                    ->orderBy("total","DESC");
            }
        } else {
            $product_ids = $section->product_ids;
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
      
        return $product_ids;
    }

    public static function getSectionWithProduct($seller_ids,$user_id = 0){
        $limit = 8;
        $offset =  0;
        $sections = Section::orderBy('row_order','ASC')->get();

        $sections = $sections->makeHidden(['created_at','updated_at']);
  
        foreach ($sections as $key => $section){
          $product_ids = self::getProductIdsSection($section) ?? "";
$product_ids_array = array_filter(explode(",", $product_ids)); // Filter empty values

if (!empty($product_ids_array)) {
    $products = Product::select(
            'p.*',
            'p.type as d_type',
            's.store_name as seller_name',
            's.slug as seller_slug',
            's.status as seller_status'
        )
        ->from('products as p')
        ->leftJoin('sellers as s', 'p.seller_id', '=', 's.id')
        ->leftJoin('categories as c', 'p.category_id', '=', 'c.id')
        ->where('p.is_approved', 1)
        ->where('p.status', 1)
        ->where('c.status', 1)
        ->where('s.status', 1)
        ->whereIn('p.seller_id', $seller_ids)
        ->whereIn('p.id', $product_ids_array)
        ->with('ratings')
        ->groupBy('p.id')
        ->orderByRaw("FIELD(p.id, " . implode(',', $product_ids_array) . ")") // Removed DB::raw
        ->skip($offset)
        ->take($limit)
        ->get();
         $products = $products->makeHidden(['seller_id','row_order','return_status',
        'cancelable_status','till_status','description','status','is_approved','return_days','pincodes',
        'cod_allowed','pickup_location','tags','d_type','seller_name','seller_slug','seller_status',
        'created_at', 'updated_at','deleted_at','image','other_images']);
} else {
    $products = collect(); // Return an empty collection if no product IDs
}

            $i = 0;
            foreach ($products as $row){

                 
$sql = ProductVariant::select('*',
                    DB::raw("(SELECT short_code FROM units u WHERE u.id=pv.stock_unit_id) as stock_unit_name"))
                    ->from('product_variants as pv')
                    ->where('pv.product_id','=',$row['id'])
                    ->orderBy('pv.status','ASC');
                $variants = $sql->get();
                $variants = $variants->makeHidden(['product_id','status','measurement_unit_id','stock_unit_id','deleted_at']);
                if (empty($variants)) {
                    continue;
                }
  
                $products[$i] = self::getProductDetails($row['id'],$user_id,false);
              
                $variantArray = array();
                for ($k = 0; $k < count($variants); $k++) {
                    array_push($variantArray,self::getProductVariant($variants[$k]['id'],$user_id));
                }
                  
                $products[$i]['variants'] = $variantArray;
                $products[$i]->rating_count =CommonHelper::productAverageRating($row['id'])['rating_count'];
                $products[$i]->average_rating =CommonHelper::productAverageRating($row['id'])['average_rating'];
                $i++;
            }
            $sections[$key]["products"] = $products;
        }
        
        $sections =  array_map("array_filter",$sections->toArray());
        $sections = array_filter($sections);
        return $sections;
    }

    public static function getBrandsHavingProducts(){
        $brands = Brand::orderBy('id','ASC')->where('status',1)->whereExists(function($query) {
            $query->select(DB::raw(1))
                ->from('products')
                ->whereColumn('products.brand_id', 'brands.id');
        })->get();
        $brands = $brands->makeHidden(['created_at','updated_at','image','image_url','status']);
        return $brands;
    }

    public static function getProductVariantsSize(){
        $variants = ProductVariant::select('measurement as size','short_code','stock_unit_id as unit_id')
            ->from('product_variants as pv')->distinct()->leftJoin('units as u', 'pv.stock_unit_id', '=', 'u.id')->get();
        return $variants;
    }

    public static function doubleNumber($number){
        $formattedNumber = number_format($number, 2);
        $floatNumber = (float) str_replace(',', '', $formattedNumber);
        //$floatNumber = (float) preg_replace('/[^0-9.-]/', '', $formattedNumber);
        return $floatNumber;
    }

    public static function getProductDetails($product_id,$user_id=null,$is_variants=true,$request=null){
        $product = Product::select('products.*', 'sellers.longitude', 'sellers.latitude', 'cities.max_deliverable_distance',
            'cities.boundary_points','co.name as country_made_in')
                ->leftJoin("countries as co", "products.made_in", "=", "co.id")
                ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
                ->leftJoin('cities', 'sellers.city_id', '=', 'cities.id')
                ->where('products.id',$product_id)->first();
        // \Log::info('products1 : ',[$product]);
        if($product) {
            $product = $product->makeHidden(['row_order','return_status',
                'cancelable_status','till_status','description','is_approved','return_days','pincodes',
                           'cod_allowed','pickup_location','tags','d_type','seller_name','seller_slug','seller_status',
                'created_at', 'updated_at','deleted_at','image','other_images', 'cal_discount_percentage','min_price','max_price','type','boundary_points','country_made_in']);

            $product['is_deliverable'] = true;
            $product['made_in'] = $product['country_made_in'] ?? "";
            $product['is_unlimited_stock'] = intval($product['is_unlimited_stock']) ?? 0;
            $product['tax_included_in_price'] = intval($product['tax_included_in_price']) ?? 0;
            $product['status'] = intval($product['status']) ?? 0;

            /*if(isset($product->boundary_points) && $product->boundary_points != "") {
                $vertices_x = $product->boundary_points ? array_column(json_decode($product->boundary_points, true), "lng") : [];    // lng x-coordinates of the vertices of the polygon
                $vertices_y = $product->boundary_points ? array_column(json_decode($product->boundary_points, true), "lat") : [];    // lat y-coordinates of the vertices of the polygon
                $points_polygon = count($vertices_x);  // number vertices - zero-based array
                if (isset($request->longitude) && CommonHelper::isInPolygon($points_polygon, $vertices_x, $vertices_y, $request->longitude, $request->latitude)) {
                    $row['is_deliverable'] = true;
                } else {
                    $row['is_deliverable'] = false;
                }
            }else{
                $row['is_deliverable'] = false;
            }*/

            if(isset($product->max_deliverable_distance) && $product->max_deliverable_distance != 0 && $product->max_deliverable_distance != ""){
                if(isset($request->longitude) && CommonHelper::isDeliverable($product->max_deliverable_distance, $product->longitude, $product->latitude, $request->longitude, $request->latitude)){
                    $product['is_deliverable'] = true;
                }else{
                    $product['is_deliverable'] = false;
                }

                $product['is_deliverable'] = true;

            }else{
                $product['is_deliverable'] = false;
            }

        if ($user_id) {
            $fav = Favorite::where('product_id', $product['id'])->where('user_id', $user_id)->first();
            $product['is_favorite'] = !is_null($fav) ? true : false;
        } else {
            $product['is_favorite'] = false;
        }

        if($is_variants){
            $variants = ProductVariant::where('product_id',$product->id)->get();
            $variantsArray = array();
            foreach ($variants as $variant){
                $product_variant = CommonHelper::getProductVariant($variant->id,$user_id);
                array_push($variantsArray,$product_variant);
            }
            $product->variants = $variantsArray;
        }
        return $product;
        }
    }

    public static function getProductVariant($variant_id, $user_id = null)
{
    $variant = ProductVariant::select(
        '*',
        DB::raw("(SELECT short_code FROM units as u WHERE u.id = pv.stock_unit_id) as stock_unit_name"),
        DB::raw("(SELECT is_unlimited_stock FROM products as p WHERE p.id = pv.product_id) as is_unlimited_stock")
    )
    ->from('product_variants as pv')
    ->where('id', $variant_id)
    ->first();

    if ($variant) {
        $variant = $variant->makeHidden([
            'product_id',
            'measurement_unit_id',
            'stock_unit_id',
            'deleted_at',
            'order_counter'
        ]);

        $variant['status'] = ($variant['stock'] <= 0 && $variant['is_unlimited_stock'] == 0) ? 0 : intval($variant['status']) ?? 0;

        $variant['cart_count'] = 0;
        if ($user_id) {
            $cart = Cart::where('product_variant_id', $variant['id'])->where('user_id', $user_id)->first();
            if ($cart) {
                $variant['cart_count'] = $cart['qty'];
            }
        }

        $taxed = ProductHelper::getTaxableAmount($variant['id']);

        $variant['discounted_price'] = CommonHelper::doubleNumber($taxed->taxable_discounted_price ?? $variant['discounted_price']);
        $variant['price'] = CommonHelper::doubleNumber($taxed->taxable_price ?? $variant['price']);
        $variant['taxable_amount'] = CommonHelper::doubleNumber($taxed->taxable_amount);

        $variant['stock_unit_name'] = $variant['stock_unit_name'] ?? '';

        // ✅ Safely calculate calc_discount_percentage
       if (!empty($taxed->taxable_price) && $taxed->taxable_price > 0) {
    $discount = ($taxed->taxable_price - $taxed->taxable_discounted_price);
    $variant['calc_discount_percentage'] = round(($discount / $taxed->taxable_price) * 100, 2);
} else {
    $discount = ($variant['price'] -  $variant['discounted_price']);
    $variant['calc_discount_percentage'] = round(($discount / $variant['price']) * 100, 2);
}

        return $variant;
    }

    return null;
}


    public static function setOrderStatus($order_status)
    {
        $order_status['created_at'] = Carbon::now()->format('Y-m-d H:i:s');
        OrderStatus::create($order_status);
    }

    public static function getCartCount($user_id){
        $total = Cart::select(DB::raw('COUNT(carts.id) AS cart_items_count'), DB::raw('sum(carts.qty) AS cart_total_qty'))
            ->Join('products', 'carts.product_id', '=', 'products.id')
            ->Join('product_variants', 'carts.product_variant_id', '=', 'product_variants.id')
            ->where('carts.save_for_later','=',0)
            ->where('user_id',$user_id)->first();
        $total->cart_items_count = intval($total->cart_items_count);
        $total->cart_total_qty = intval($total->cart_total_qty);

        $carts = Cart::select('carts.qty','carts.product_variant_id')
            ->Join('products', 'carts.product_id', '=', 'products.id')
            ->Join('product_variants', 'carts.product_variant_id', '=', 'product_variants.id')
            ->where('carts.save_for_later','=',0)
            ->where('user_id','=',$user_id)
            ->get();

        $variant_ids = array_column($carts->toArray(),'product_variant_id');
        $quantityArray = array_column($carts->toArray(),'qty');

        $totalAmt = CommonHelper::calculateTotalAmount($variant_ids,$quantityArray);

        $total->save_price = $totalAmt['save_price'];
        $total->total_amount = $totalAmt['total_amount'];

        $total->product_variant_id = implode(',', $variant_ids);
        $total->quantity = implode(',',$quantityArray);

        return $total;
    }

    public static function generateOrderId(){
        return intval(round(microtime(true) * rand(1000,9999)));
    }

    public static function calculateTotalAmount($variant_ids,$quantityArray){
        $save_price = 0;
        $total_amount = 0;
        if(count($variant_ids) === count($quantityArray)){
            foreach ($variant_ids as $key => $variant_id){

                $taxed_amount = ProductHelper::getTaxableAmount($variant_id);

                $variant = ProductVariant::select('price', 'discounted_price')->where('id',$variant_id)->first();
                
                if($variant->discounted_price != 0 && $variant->discounted_price != ""){
                    $mainPrice = $variant->discounted_price;
                }else{
                    $mainPrice = $variant->price;
                }

                //$price = floatval($taxed_amount->taxable_amount) * intval($quantityArray[$key]);

                $price = floatval($taxed_amount->taxable_amount ?? $mainPrice) * intval($quantityArray[$key]);

                $total_amount += floatval($price);

                $save_price += floatval($taxed_amount->price) * intval($quantityArray[$key]);
            }
        }
        return array('save_price' => $save_price,'total_amount' => $total_amount);
    }

    public static function calculateOrderTotalTax($item_details, $quantityArray){
        $order_total_tax_amt = 0;
        $order_total_tax_per = 0;
        foreach ($item_details as $key => $item) {
            $price = $item->price;
            $discounted_price = (empty($item->discounted_price) || $item->discounted_price == "") ? 0 : $item->discounted_price;
            $quantity = $quantityArray[$key];
            $tax_percentage = (empty($item->tax_percentage) || ($item->tax_percentage == "")) ? 0 : $item->tax_percentage;
            $final_price = ($discounted_price != 0) ? ($discounted_price * $quantity) : ($price * $quantity);
            $tax_count = ($tax_percentage / 100) * $final_price;
            $order_total_tax_amt += $tax_count;
            $order_total_tax_per += $tax_percentage;
        }
        return array('order_total_tax_amt' => $order_total_tax_amt,'order_total_tax_per' => $order_total_tax_per);
    }


    public static function addSellerWiseOrder($order_id){
        $orders_id = CommonHelper::generateOrderId();
        $order = Order::with('items')->where("id",$order_id)->first();
        $items = $order->items;
        $seller_ids = array_values(array_unique( array_column($items->toArray(),'seller_id')));

        if(count($seller_ids)>1) {
            $i = 1;



            foreach ($seller_ids as $key => $seller_id) {
                $items = OrderItem::where('order_id', $order_id)->where('seller_id', $seller_id)->get();
                $item_arr = array_column($items->toArray(), 'product_variant_id');

                $item_details = CommonHelper::getProductByVariantId($item_arr);
                $quantity_arr = array_column($items->toArray(), 'quantity');


                $totalAmt = CommonHelper::calculateTotalAmount($item_arr, $quantity_arr);
                $total = $totalAmt["total_amount"]; // sub_total of cart

                $sellerPromoPer = (floatval($total)/floatval($order->total))*100;
                $promo_discount = (floatval($order->promo_discount)*$sellerPromoPer)/100;

                $delivery_charge = floatval( $order->delivery_charge)/count($seller_ids);
                $final_total = ($totalAmt["total_amount"] - $promo_discount) + $delivery_charge;


                $totalTax = CommonHelper:: calculateOrderTotalTax($item_details, $quantity_arr);
                $order_total_tax_amt = $totalTax['order_total_tax_amt'];
                $order_total_tax_per = $totalTax['order_total_tax_per'];

                $generate_otp = Setting::get_value("generate_otp");

                if ($generate_otp == 1) {
                    $otp_number = mt_rand(100000, 999999);
                } else {
                    $otp_number = 0;
                }


                if($i === 1){
                    $newOrder = Order::where('id',$order_id)->first();
                }else{
                    $newOrder = new Order();
                }
                $newOrder->user_id = $order->user_id;
                $order->delivery_boy_id = 0;
                $newOrder->orders_id = $orders_id;

                $newOrder->otp = $otp_number;

                $newOrder->mobile = $order->mobile;
                $newOrder->order_note = $order->order_note;

                $newOrder->total = $total;

                $newOrder->delivery_charge = $delivery_charge;

                $newOrder->tax_amount = $order_total_tax_amt;
                $newOrder->tax_percentage = $order_total_tax_per;

                $newOrder->wallet_balance = $order->walletvalue??0;

                $newOrder->promo_code = $order->promo_code;
                $newOrder->promo_discount = $promo_discount;

                $newOrder->final_total = $final_total;

                $newOrder->payment_method = $order->payment_method;
                $newOrder->address = $order->address;
                $newOrder->latitude = $order->latitude;
                $newOrder->longitude = $order->longitude;
                $newOrder->delivery_time = $order->delivery_time;
                $newOrder->status = $order->order_status??0;
                $newOrder->active_status = $order->active_status;
                $newOrder->order_from = $order->order_from;
                $newOrder->pincode_id = $order->pincode_id;
                $newOrder->area_id = $order->area_id??0;
                $newOrder->address_id = $order->address_id;
                $newOrder->save();

                OrderItem::where('order_id', $order_id)->where('seller_id', $seller_id)
                    ->update(['order_id' =>  $newOrder->id, 'orders_id' =>  $orders_id]);

                $order_status = array();
                $order_status['order_id'] = $newOrder->id;
                $order_status['order_item_id'] = 0;
                $order_status['status'] = OrderStatusList::$received;
                $order_status['created_by'] =  $order->user_id;
                $order_status['user_type'] = OrderStatus::$userTypeUser;
                CommonHelper::setOrderStatus($order_status);

                $newOrder = Order::with('items')->where("id",$newOrder->id)->first();

                if(!empty($newOrder)){

                    try {
                        //self::sendMailOrderStatus($order);
                        dispatch(new SendEmailJob($newOrder));
                    }catch ( \Exception $e){
                        Log::error("Place order Send mail error :",[$e->getMessage()] );
                    }

                }

                $i++;
            }
            //sleep(1);
            return "Updated";
        }else{

            $order_status = array();
            $order_status['order_id'] = $order->id;
            $order_status['order_item_id'] = 0;
            $order_status['status'] = OrderStatusList::$received;
            $order_status['created_by'] =  $order->user_id;
            $order_status['user_type'] = OrderStatus::$userTypeUser;
            CommonHelper::setOrderStatus($order_status);
            if(!empty($order)){
                try {
                    //self::sendMailOrderStatus($order);
                    dispatch(new SendEmailJob($order));
                }catch ( \Exception $e){
                    Log::error("Place order Send mail error : ",[$e->getMessage()] );
                }
            }
            return "notUpdated";
        }
    }

    /*public static function findGoogleMapDistanceOther($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $unit = 'K'){

        $theta = $longitudeFrom - $longitudeTo;
        $dist = sin(deg2rad($latitudeFrom)) * sin(deg2rad($latitudeTo)) +  cos(deg2rad($latitudeFrom)) * cos(deg2rad($latitudeTo)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        $unit = strtoupper($unit);

        if ($unit == "K") {
            $distance = ($miles * 1.609344);
        } else if ($unit == "N") {
            $distance = ($miles * 0.8684);
        } else {
            $distance = $miles;
        }

        if(isset($distance) && $distance != 0){
            $result = array(
                'body' => $distance,
                'http_code' => 200,
            );

            $result = array(
                'body' => [
                    "destination_addresses" => [],
                    "origin_addresses" => [],
                    "rows" => [],
                    "status" => "REQUEST_DENIED"
                ],
                'http_code' => 200,
            );
        }else{
            $result = array(
                'body' => [
                    "destination_addresses" => [],
                    "error_message" => "API keys with referer restrictions cannot be used with this API.",
                    "origin_addresses" => [],
                    "rows" => [],
                    "status" => "REQUEST_DENIED"
                ],
                'http_code' => 200,
            );
        }
    }*/

    public static function findGoogleMapDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo){
        $origins = implode(",", [$latitudeFrom, $longitudeFrom]);
        $destinations = implode(",", [$latitudeTo, $longitudeTo]);
        $result = (new GoogleMaps)->findGoogleMapDistance($origins, $destinations);
        return $result;
    }

    public static function findGoogleMapDistanceLocal($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo){
        $url = "http://egrocer.netsofters.net/customer/distance_test?latitudeFrom=".$latitudeFrom."&longitudeFrom=".$longitudeFrom."&latitudeTo=".$latitudeTo."&longitudeTo=".$longitudeTo;
        //$url = "http://egrocer.local/customer/distance_test?latitudeFrom=".$latitudeFrom."&longitudeFrom=".$longitudeFrom."&latitudeTo=".$latitudeTo."&longitudeTo=".$longitudeTo;

        $context = stream_context_create([
            'http' => [
                'timeout' => 10, // Increase the timeout value (in seconds) as needed
            ],
        ]);

        $result = file_get_contents($url, false, $context);
        $data = json_decode($result, true);

        //dd($data);

        $data["body"] = json_decode($data["body"], true);
        return $data;
    }

    public static function getDeliveryCharge($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $cityIdsString, $sub_total)
    {
           // Convert the string to an array
            $cityIds = explode(',', $cityIdsString);

            // Retrieve cities with specified IDs
            $cities = City::whereIn('id', $cityIds)->get();
            $point = ['lat' => $latitudeFrom, 'lng' => $longitudeFrom];
      
        $cityId = '';
    
        foreach ($cities as $city) {
            if($city->geolocation_type == 'polygon'){
            $polygon = json_decode($city->boundary_points, true);
    
                if (is_array($polygon) && !empty($polygon) && self::isPointInPolygon($point, $polygon)) {
                    $cityId = $city->id;
                }
            }elseif($city->geolocation_type == 'circle'){
                $boundaryPoints  = json_decode($city->boundary_points, true);
                $radius = $city->radius; // Assuming radius is stored in meters
        
                if (is_array($boundaryPoints) && !empty($boundaryPoints)) {
                    $center = $boundaryPoints[0]; // Assuming the first element is the center point
                    if (self::isPointInCircle($point, $center, $radius)) {
                        $cityId = $city->id;
                    }
                }
            }  
        }
        $city = City::where('id', $cityId)->first();
       if ($city) {
            $charge = 0;
            $charge_method = $city['delivery_charge_method'];
            $min_amount_for_free_delivery = $city['min_amount_for_free_delivery'];

            /* find distnce with google API */
            // if(isDevMode()){
            //     $result = CommonHelper::findGoogleMapDistanceLocal($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo);
            // }else{
                $result = CommonHelper::findGoogleMapDistance($latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo);
           // }

            if (isset($result['http_code']) && $result['http_code'] != "200") {
                $response['error'] = true;
                //$response['message'] = 'The provided API key is invalid.';
                $response['message'] = $result['body']['error_message']??"";
                $response['charge'] = "0";
                $response['distance'] = "0";
                $response['duration'] = "0";
                return $response;
            }

            if (isset($result['body']) && !empty($result['body'])) {

                if(is_string($result["body"])){
                    $result["body"] =  json_decode($result["body"], true);
                }
                //dd($result["body"]);

                if (isset($result['body']['status']) && $result['body']['status'] == "REQUEST_DENIED") {
                    /* The request is missing an API key */
                    $response['error'] = true;

                    //$response['message'] = 'The provided API key is invalid.';
                    $response['message'] = $result['body']['error_message'];

                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                } else if (isset($result['body']['status']) && $result['body']['status'] == "OK") {
                    // indicating the API request was successful
                    // echo "ttttt ".$result['body']['rows'][0]['elements'][0]['status'];
                    // print_r($result);
                    if (isset($result['body']['rows'][0]['elements'][0]['status']) && $result['body']['rows'][0]['elements'][0]['status'] == "OK") {

                        $distance_text = $result['body']['rows'][0]['elements'][0]['distance']['text'];
                        $distance_in_meter = $result['body']['rows'][0]['elements'][0]['distance']['value'];
                        $distance = round(($distance_in_meter / 1000), 1);
                        $time = $result['body']['rows'][0]['elements'][0]['duration']['text'];

                        if ($charge_method == "fixed_charge") {
                            $charge = $city['fixed_charge'];
                        }
                        if ($charge_method == "per_km_charge") {
                            $charge = ($city['per_km_charge'] * intval($distance));
                        }
                        if ($charge_method == "range_wise_charges") {
                            $ranges = json_decode($city['range_wise_charges'], true);
                            $distance = round($distance);
                            foreach ($ranges as $range) {
                                if ($distance >= $range['from_range'] && $distance <= $range['to_range']) {
                                    $charge = ($range['price']);
                                }
                            }
                        }
                        if($min_amount_for_free_delivery <= $sub_total && $min_amount_for_free_delivery != 0){
                            $charge = 0;
                        }

                        $response['error'] = false;
                        $response['message'] = 'Data fetched successfully.';
                        $response['charge'] = $charge;
                        $response['distance'] = $distance_text;
                        $response['duration'] = $time;
                        return $response;
                    } else if (isset($result['body']['rows'][0]['elements'][0]['status']) && $result['body']['rows'][0]['elements'][0]['status'] == "ZERO_RESULTS") {
                        $response['error'] = false;
                        $response['message'] = 'Data not found or invalid.Please check!';
                        $response['charge'] = "0";
                        $response['distance'] = "0";
                        $response['duration'] = "0";
                        return $response;
                    } else {
                        $response['error'] = true;
                        $response['message'] = 'Something went wrong...';
                        $response['charge'] = "0";
                        $response['distance'] = "0";
                        $response['duration'] = "0";
                        return $response;
                    }


                } else if (isset($result['body']['status']) && $result['body']['status'] == "OVER_QUERY_LIMIT") {
                    // You have exceeded the QPS limits. Billing has not been enabled on your account
                    $response['error'] = true;
                    $response['message'] = 'You have exceeded the QPS limits or billing not enabled may be.';
                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                } else if (isset($result['body']['status']) && $result['body']['status'] == "INVALID_REQUEST") {
                    // indicating the API request was malformed, generally due to the missing input parameter
                    $response['error'] = true;
                    $response['message'] = 'Indicating the API request was malformed.';
                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                } else if (isset($result['body']['status']) && $result['body']['status'] == "UNKNOWN_ERROR") {
                    // indicating an unknown error
                    $response['error'] = true;
                    $response['message'] = 'An unknown error occure.';
                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                } else if (isset($result['body']['status']) && $result['body']['status'] == "ZERO_RESULTS") {
                    // indicating that the search was successful but returned no results. This may occur if the search was passed a bounds in a remote location.
                    $response['error'] = true;
                    $response['message'] = 'Data not found or invalid.Please check!';
                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Something went wrong.';
                    $response['charge'] = "0";
                    $response['distance'] = "0";
                    $response['duration'] = "0";
                    return $response;
                }
            }
   
       }
       else{
            $response['error'] = true;
            $response['message'] = 'Sorry, We are not delivering on selected address';
            return $response;
       }
    }

    public static function getAllDeliveryCharge($latitudeFrom, $longitudeFrom, $seller_ids, $sub_total) { 
 
        $sellers = Seller::select('sellers.id', 'sellers.name', 'sellers.latitude', 'sellers.longitude', 'sellers.city_id', DB::raw("6371 * acos(cos(radians(" . $latitudeFrom . "))
                                * cos(radians(sellers.latitude)) * cos(radians(sellers.longitude) - radians(" . $longitudeFrom . "))
                                + sin(radians(" .$latitudeFrom. ")) * sin(radians(sellers.latitude))) AS distance"))
            ->leftJoin("cities", "sellers.city_id", "cities.id")->whereIn('sellers.id',$seller_ids)
            ->get();



        $error = false;
        $message = "";

        if ($sellers->isNotEmpty()){

            $total_delivery_charge = 0;
            $data = array();
            foreach ($sellers as $seller){
                $subData = array();
               

                $delivery = self::getDeliveryCharge($latitudeFrom, $longitudeFrom, $seller->latitude, $seller->longitude, $seller->city_id, $sub_total);

               if ($delivery["error"] == true){
                    $response['status'] = 0;
                    $response['message'] =  $delivery["message"]; 
                    return $response; 
                  
                }
               
                $subData['seller_name'] = $seller->name;
                $subData['delivery_charge'] = $delivery["charge"];
                $subData['distance'] = $delivery["distance"];
                $subData['duration'] = $delivery["duration"];
                $total_delivery_charge += $delivery["charge"];
                array_push($data, $subData);
               $result['total_delivery_charge'] = $total_delivery_charge;
            $result['sellers_info'] = $data;

            $response['status'] = 1;
            $response['message'] = 'Data fetched successfully.';
            $response['data'] = $result;
             return $response;
            }

        }else{
            $response['status'] = 0;
            $response['message'] =  __('sorry_we_are_not_delivering_on_selected_address'); 
            return $response; 
        }
    }

    public static function getSellerCategories($seller_id){
        $seller = Seller::where('id',$seller_id)->first();
        $categories =  Category::whereIn('id', explode(",", $seller->categories))->orderBy('name','ASC')->get();
        //$categories = $categories->makeHidden(['created_at','updated_at','deleted_at']);
        return $categories;
    }

    public static function getStatusOrderCount($seller_id = null){

        $query = '(select count(orders.id) from orders where orders.active_status = order_status_lists.id) AS order_count';

        if(isset($seller_id) && $seller_id != "" && $seller_id !=0 ){
            $orderIds = OrderItem::where('seller_id',$seller_id)->get()->pluck('order_id')->toArray();
            if(count($orderIds)>0) {
                $query = '(select count(orders.id) from orders where orders.active_status = order_status_lists.id and orders.id IN (' . implode(",", array_unique($orderIds)) . ')) AS order_count';
            }
        }
        return OrderStatusList::select('order_status_lists.id','order_status_lists.status', \DB::raw($query))
            ->orderBy('order_status_lists.id','asc')
            ->get();
    }

    public static function getOrderDetails($order_id){
        $order = Order::select('orders.*','orders.address as order_address','orders.mobile as order_mobile','orders.id as order_id','orders.created_at as orders_created_at','users.*','users.name as user_name','users.email as user_email'
            ,'users.email as user_email','users.mobile as user_mobile','users.country_code as user_country_code','address.*','address.address as customer_address','address.landmark as customer_landmark','address.area as customer_area','address.pincode as customer_pincode','address.city as customer_city','address.state as customer_state','address.country as customer_country','address.latitude as customer_latitude', 'address.longitude as customer_longitude', 'sellers.name as seller_name', 'sellers.mobile as seller_mobile',
            'sellers.email as seller_email', 'sellers.store_name', 'sellers.formatted_address as seller_formatted_address', 'sellers.place_name as seller_place_name', 'sellers.latitude as seller_latitude', 'sellers.longitude as seller_longitude', 'delivery_boys.name as delivery_boy_name',
            'order_items.id as order_item_id','os.id as active_status', 'os.status as status_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('user_addresses as address', 'orders.address_id', '=', 'address.id')
            ->leftJoin('cities', 'address.city_id', '=', 'cities.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('delivery_boys', 'orders.delivery_boy_id', '=', 'delivery_boys.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->leftJoin('order_status_lists as os', 'orders.active_status', '=', 'os.id')
            ->where('orders.id', $order_id) 
            ->groupBy('orders.id')
            ->first();

        $order_items = Order::select('order_items.*','orders.mobile','orders.total' ,'orders.delivery_charge','orders.discount','orders.promo_code',
            'orders.promo_discount','orders.wallet_balance','orders.final_total','orders.payment_method','orders.address','orders.delivery_time',
            'users.name as user_name','order_items.status as order_status','sellers.name as seller_name','products.id as product_id',DB::raw('CONCAT("' . asset('storage/') . '", "/", products.image) as image'), 'os.id as active_status', 'os.status as status_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->leftJoin('order_status_lists as os', 'order_items.active_status', '=', 'os.id')
            ->where('orders.id', $order_id)
            ->whereNotIn('order_items.active_status', [7, 8])
            ->orderBy('order_items.id','DESC')
            ->get();
             if(auth()->user()->role_id == 3){
               $seller_id =  auth()->user()->seller->id;
               
                 $order_items = Order::select('order_items.*','orders.mobile','orders.total' ,'orders.delivery_charge','orders.discount','orders.promo_code',
            'orders.promo_discount','orders.wallet_balance','orders.final_total','orders.payment_method','orders.address','orders.delivery_time',
            'users.name as user_name','order_items.status as order_status','sellers.name as seller_name','products.id as product_id',DB::raw('CONCAT("' . asset('storage/') . '", "/", products.image) as image'), 'os.id as active_status', 'os.status as status_name')
            ->leftJoin('order_items', 'order_items.order_id', '=', 'orders.id')
            ->leftJoin('users', 'orders.user_id', '=', 'users.id')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('sellers', 'order_items.seller_id', '=', 'sellers.id')
            ->leftJoin('order_status_lists as os', 'order_items.active_status', '=', 'os.id')
            ->where('orders.id', $order_id)
           ->whereNotIn('order_items.active_status', [7, 8])
            ->where('sellers.id', '=',  $seller_id)
            ->orderBy('order_items.id','DESC')
            ->get();
             }
             
        return array("order" => $order, "order_items" => $order_items);
    }

    public static function generateOrderInvoice($data){
        $invoice = view('invoice', $data)->render();
        return $invoice;
    }

    public static function downloadOrderInvoice($order_id){
        $data = CommonHelper::getOrderDetails($order_id);
        if(!$data["order"]){
            return CommonHelper::responseError("Order Not found!");
        }
        $invoice = view('invoiceMpdf', $data)->render();

        //air1874
        //create PDF
        // https://blog.shahednasser.com/create-pdf-in-laravel-tutorial/
        $mpdf = new Mpdf();
        //write content
        $stylesheet = file_get_contents(asset('assets/css/custom/bootstrap/bootstrap.min.css')); // external css
        $mpdf->WriteHTML($stylesheet,1);
        $mpdf->WriteHTML($invoice);
        //return the PDF for download
        return $mpdf->Output("Invoice-No:#".$order_id.'.pdf', Destination::INLINE);
    }

    public static function getFirebaseKeys(){
        $firebase_array = array(
            "apiKey" => "",
            "authDomain" => "",
            "databaseURL" => "",
            "projectId" => "",
            "storageBucket" => "",
            "messagingSenderId" => "",
            "appId" => "",
            "measurementId" => "",
            "jsonFile" => ""
        );
        $variables = array_keys($firebase_array);
        return Setting::whereIn('variable',$variables)->get();
    }


    public static function getMailSetting($user_type,$user_id){
        return MailSetting::where(['user_type' => $user_type, 'user_id' => $user_id ])->get();
    }

    public static function saveMailSetting($user_id,$user_type,$status_ids,$mail_statuses,$mobile_statuses,$sms_statuses){

        foreach ($status_ids as $key => $status_id){
            $setting = MailSetting::where(['user_type' => $user_type, 'user_id' => $user_id, 'order_status_id' => $status_id ])->first() ?? new MailSetting();
            $setting->user_type = $user_type;
            $setting->user_id = $user_id;
            $setting->order_status_id = $status_id;
            $setting->mail_status = $mail_statuses[$key];
            $setting->mobile_status = $mobile_statuses[$key];
            $setting->sms_status = $sms_statuses[$key];
            $setting->save();
        }
    }
    public static function setDefaultMailSetting($user_id, $user_type){
        $status_ids = OrderStatusList::get()->pluck('id')->toArray();
        $mail_statuses = array_fill(0,count($status_ids),1);
        $mobile_statuses = $mail_statuses;
        self::saveMailSetting($user_id,$user_type,$status_ids,$mail_statuses,$mobile_statuses);
    }

    public static function sendMail($to, $subject, $data){

        $config = [
            'driver' => 'sendmail',
            'host' => Setting::get_value('smtp_host'),
            'username' => Setting::get_value('smtp_from_mail'),
            'password' => Setting::get_value('smtp_email_password'),
            'port' => Setting::get_value('smtp_port'),
            'encryption' => Setting::get_value('smtp_encryption_type'),
        ];

        \Config::set('mail', $config);
        //\Config::set('mail.from.name', $config);

        $app_name = Setting::get_value('app_name');
        $mailData = array(
            'to' => $to,
            'subject' => $subject,
            'name' => $data['name'] ?? "",
            'app_name' => $app_name,
            'support_email' => Setting::get_value('support_email')
        );
        //dd($app_name);
        if (!is_array($data)) {
            $data = [];
        }
        
        $data['app_name'] = $app_name;
        
        Mail::send('mail', $data, function($message) use ($mailData) {
            $message->to($mailData['to'], $mailData['name'])->subject($mailData['subject'])->from( Setting::get_value('smtp_from_mail'),$mailData["app_name"]);
            //$message->setBody($mailData['message']);
        });
    }
    public static function sendMailAdminStatus($adminType, $admin, $status, $email){
        $app_name = Setting::get_value('app_name');
        $subject = "";
        $data = array();
        if($adminType == "seller"){
            if(isset($status) && $status == Seller::$statusRegistered){
                $status_name = Seller::$Registered;
                $subject = "Your Account is ".$status_name." Successfully!";
            }else if(isset($status) && $status == Seller::$statusActive){
                $status_name = Seller::$Active;
                $subject = "Your Account is activated";
            } else if(isset($status) && $status == Seller::$statusDeactivated){
                $status_name = Seller::$Deactivated;
                $subject = "Your Account is ".$status_name." by ".$app_name." Administrator!";
            } else if(isset($status) && $status == Seller::$statusRejected) {
                $status_name = Seller::$Rejected;
                $subject = "Your Account is ".$status_name." by ".$app_name." Administrator!";
            }
            $data['seller'] = $admin;
            $data['type'] = "seller_status";
        }else{
            if(isset($status) && $status == DeliveryBoy::$statusRegistered){
                $status_name = DeliveryBoy::$Registered;
                $subject = "Your Account is ".$status_name." Successfully!";
            }else if(isset($status) && $status == DeliveryBoy::$statusActive){
                $status_name = DeliveryBoy::$Active;
                $subject = "Your Account is activated";
            } else if(isset($status) && $status == DeliveryBoy::$statusDeactivated){
                $status_name = DeliveryBoy::$Deactivated;
                $subject = "Your Account is ".$status_name." by ".$app_name." Administrator!";
            } else if(isset($status) && $status == DeliveryBoy::$statusRejected) {
                $status_name = DeliveryBoy::$Rejected;
                $subject = "Your Account is ".$status_name." by ".$app_name." Administrator!";
            }
            $admin['email'] = $email;
            $data['delivery_boy'] = $admin;
            $data['type'] = "delivery_boy_status";
        }

        $data['status_name'] = $status_name ?? "";
        $data['subject'] = $subject ?? "";
        $data['status'] = $status;

        self::sendMail($email, $subject ,$data);
    }

    public static function sendMailOrderStatus($order, $assign = false, $type=""){
        \Log::info('sendMailOrderStatus called.', ['order' => $order, 'assign' => $assign, 'type' => $type]);
        if($assign == true){
            if (isset($order->delivery_boy_id) && $order->delivery_boy_id != 0 && $order->delivery_boy_id != "") {


                $deliveryBoy = DeliveryBoy::select("delivery_boys.*", "admins.email", "admins.role_id")->Join('admins', 'delivery_boys.admin_id', 'admins.id')->where('delivery_boys.id', $order->delivery_boy_id)->first();

                $subject = "You have just assigned new order, #".$order->id;
                $redirect_url = (isset($order->id)) ? url('/seller/orders/view/'.$order->id): url('/seller/orders');
                $data['redirect_url'] = $redirect_url;
                $data['subject'] = $subject;
                $data['deliveryBoy'] = $deliveryBoy;
                $data['assign'] = $assign;
                $data['order'] = $order;
                $data['type'] = "order_status";
                self::sendMail($deliveryBoy->email, $subject, $data);

                if($type == 'order_item_status_update'){
                    $seller_id = $order->seller_id;
                }else{
                    $seller_id = $order->items[0]->seller_id;
                }
                if (isset($seller_id) && $seller_id != 0 && $seller_id != "") {
                    $seller = Seller::select("sellers.*", "admins.email", "admins.role_id")->Join('admins', 'sellers.admin_id', 'admins.id')->where('sellers.id', $seller_id)->first();

                    $subject = "Your order  #" . $order->id . " is assigned to a delivery boy";
                    $redirect_url = (isset($order->id)) ? url('/delivery_boy/orders/view/'.$order->id): url('/delivery_boy/orders');
                    $data['redirect_url'] = $redirect_url;
                    $data['subject'] = $subject;
                    $data['seller'] = $seller;
                    self::sendMail($seller->email, $subject, $data);
                }
            }
        } else {

            $orderStatusList = OrderStatusList::where('id', $order->active_status)->first();
            $status_name = $orderStatusList->status;

            if (isset($order->user_id) && $order->user_id != "") {
                if (self::checkOrderMailSendable($order->user_id, $order->active_status, 0)) {
                    $subject = "Your order  #" . $order->id . " has been " . $status_name;
                    $customer = User::where('id', $order->user_id)->first();
                    $data['status_name'] = $status_name;
                    $data['subject'] = $subject;
                    $data['user_type'] = 0;
                    $data['user'] = $customer;
                    $data['order'] = $order;
                    $data['type'] = "order_status";
                    self::sendMail($customer->email, $subject, $data);
                }
            }

            if($type == 'order_item_status_update'){
                    $seller_id = $order->seller_id;
                }else{
                    $seller_id = $order->items[0]->seller_id;
                }
            $sellerInfo = "";
            if (isset($seller_id) && $seller_id != 0 && $seller_id != "") {
                $seller = Seller::select("sellers.*", "admins.email", "admins.role_id")->Join('admins', 'sellers.admin_id', 'admins.id')
                    ->where('sellers.id', $seller_id)->first();
                $sellerInfo = $seller->store_name . " (" . $seller->name . ")";
                if (self::checkOrderMailSendable($seller->admin_id, $order->active_status, 1)) {

                    if ($order->active_status == OrderStatusList::$received) {
                        $subject = "You have " . $status_name . " new order  #" . $order->id;
                    } else {
                        $subject = "Order  #" . $order->id . " has been " . $status_name;
                    }

                    $data['status_name'] = $status_name;
                    $data['subject'] = $subject;
                    $data['user_type'] = 1;
                    $data['role'] = $seller->role_id;
                    $data['seller'] = $seller;
                    $data['order'] = $order;
                    $data['type'] = "order_status";
                    self::sendMail($seller->email, $subject, $data);

                }
            }

            if (isset($order->delivery_boy_id) && $order->delivery_boy_id != 0 && $order->delivery_boy_id != "") {

                $deliveryBoy = DeliveryBoy::select("delivery_boys.*", "admins.email", "admins.role_id")->Join('admins', 'delivery_boys.admin_id', 'admins.id')
                    ->where('delivery_boys.id', $order->delivery_boy_id)->first();
                if (self::checkOrderMailSendable($deliveryBoy->admin_id, $order->active_status, 1)) {
                    $subject = "Order  #" . $order->id . " has been " . $status_name;

                    $data['status_name'] = $status_name;
                    $data['subject'] = $subject;
                    $data['user_type'] = 1;
                    $data['role'] = $deliveryBoy->role_id;
                    $data['deliveryBoy'] = $deliveryBoy;
                    $data['order'] = $order;
                    $data['type'] = "order_status";
                    self::sendMail($deliveryBoy->email, $subject, $data);
                }
            }

            $admins = Admin::whereIn('role_id', array(1, 2))->get();
            if (!empty($admins)) {
                foreach ($admins as $key => $admin) {
                    if (self::checkOrderMailSendable($admin->id, $order->active_status, 1)) {
                        if ($order->active_status == OrderStatusList::$received) {
                            $subject = "You have " . $status_name . " new order  #" . $order->id;
                        } else {
                            $subject = "Order  " . $order->product_name . " - ". $order->variant_name . " has been " . $status_name;
                            if ($sellerInfo != "") {
                                $subject .= " from " . $sellerInfo;
                            }
                        }
                        $data['status_name'] = $status_name;
                        $data['subject'] = $subject;
                        $data['user_type'] = 1;
                        $data['role'] = $admin->role_id;
                        $data['admin'] = $admin;
                        $data['order'] = $order;
                        $data['type'] = "order_status";
                        self::sendMail($admin->email, $subject, $data);
                    }
                }
            }

        }
    }


    public static function checkOrderMailSendable($user_id, $status_id, $use_type, $type = "mail"){
        // user_type 0:user, 1:Admin
        $mail_settings = MailSetting::where(['user_type' => $use_type, 'user_id' => $user_id, 'order_status_id' => $status_id])->first();
        if($mail_settings){
            if($type == 'mail'){
                if($mail_settings->mail_status == 1){
                    return true;
                }
                return false;
            }else{
                if($mail_settings->mobile_status == 1){
                    return true;
                }
                return false;
            }
        }
        return false;
    }


    public static function sendNotificationOrderStatus($order,$type=''){

        $app_name = Setting::get_value('app_name');
        $currency = Setting::get_value('currency') ?? '$';

        $orderStatusList = OrderStatusList::where('id', $order->active_status)->first();
        $status_name = $orderStatusList->status;

        if (isset($order->user_id) && $order->user_id != "") {
            if (self::checkOrderMailSendable($order->user_id, $order->active_status, 0, "Notification")) {

                Log::info("checkOrderMailSendable -> user");

                $userTokens = UserToken::where('user_id',$order->user_id)->where('type','customer')->get()->pluck('fcm_token','platform')->toArray();
                Log::info("checkOrderMailSendable -> user:-",[$userTokens]);
               
                $title = "Your order  #" . $order->id . " has been " . $status_name;
                $message = "This notification is just a friendly reminder (not a bill or a second charge) that on ". $order->created_at ." you placed an order from ".$app_name." Order summar #". $order->id." Final Total - ". $currency .$order->final_total." We would like to take this opportunity to thank you for your business and look forward to serving you in the future.";
                /*if($order->active_status == OrderStatusList::$received)
                {
                    $message = "This notification is just a friendly reminder (not a bill or a second charge) that on ". $order->created_at ." you placed an order from ".$app_name." Order summar #". $order->id." Final Total - ". $currency .$order->final_total." We would like to take this opportunity to thank you for your business and look forward to serving you in the future.";
                }elseif(in_array($order->active_status, array( OrderStatusList::$processed, OrderStatusList::$shipped, OrderStatusList::$outForDelivery ))){
                    $message = "This notification is just a friendly reminder (not a bill or a second charge) that on ". $order->created_at ." you placed an order from ".$app_name;
                }else{
                    $message = "This notification is just a friendly reminder (not a bill or a second charge) that on ". $order->created_at ." you placed an order from ".$app_name;
                }*/


               self::sendNotification($userTokens,$title,$message);
            }
        }
        if($type == 'order_item_status_update'){
            $seller_id = $order->seller_id;
        }else{
            $seller_id = $order->items[0]->seller_id;
        }
        //$sellerInfo = "";
        if (isset($seller_id) && $seller_id != 0 && $seller_id != "") {
            $seller = Seller::select("sellers.*", "admins.email", "admins.role_id")->Join('admins', 'sellers.admin_id', 'admins.id')->where('sellers.id', $seller_id)->first();
            //$sellerInfo = $seller->store_name . " (" . $seller->name . ")";
            self::checkOrderMailSendable($seller_id, $order->active_status, 1);
                $userTokens =AdminToken::where('user_id',$seller_id)->where('type','Seller')->get()->pluck('fcm_token','platform')->toArray();
               
                $type ='';
                if ($order->active_status == OrderStatusList::$received) {
                    $type = "new_order";
                    $title = " You have " . $status_name . " new order  #" . $order->id;
                } else {
                    $title = " Order  #" . $order->id . " has been " . $status_name;
                }

                $message = "";

                self::sendNotification($userTokens,$title,$message,$type);
        
            }
        

        if (isset($order->delivery_boy_id) && $order->delivery_boy_id != 0 && $order->delivery_boy_id != "") {

            $deliveryBoy = DeliveryBoy::select("delivery_boys.*", "admins.email", "admins.role_id")->Join('admins', 'delivery_boys.admin_id', 'admins.id')
                ->where('delivery_boys.id', $order->delivery_boy_id)->first();
           // if (self::checkOrderMailSendable($deliveryBoy->id, $order->active_status, 1)) {

                $title = "Order  #" . $order->id . " has been " . $status_name;
                $userTokens = AdminToken::where('user_id',$deliveryBoy->id)->where('type','Delivery Boy')->get()->pluck('fcm_token','platform')->toArray();
                $message = "";

                self::sendNotification($userTokens,$title,$message);
            //}
        }

        /*$admins = Admin::whereIn('role_id', array(1, 2))->get();
        if (!empty($admins)) {
            foreach ($admins as $key => $admin) {
                if (self::checkOrderMailSendable($admin->id, $order->active_status, 1)) {
                    if ($order->active_status == OrderStatusList::$received) {
                        $subject = "You have " . $status_name . " new order  #" . $order->id;
                    } else {
                        $subject = "Order  #" . $order->id . " has been " . $status_name;
                        if ($sellerInfo != "") {
                            $subject .= " from " . $sellerInfo;
                        }
                    }
                    $data['status_name'] = $status_name;
                    $data['subject'] = $subject;
                    $data['user_type'] = 1;
                    $data['role'] = $admin->role_id;
                    $data['admin'] = $admin;
                    $data['order'] = $order;
                    $data['type'] = "order_status";
                    self::sendMail($admin->email, $subject, $data);
                }
            }
        }*/

    }

    public static function sendNotificationOrderAssignDeliveryBoy($order){

        $app_name = Setting::get_value('app_name');
        $currency = Setting::get_value('currency') ?? '$';

        $orderStatusList = OrderStatusList::where('id', $order->active_status)->first();
        $status_name = $orderStatusList->status;
        
        if (isset($order->delivery_boy_id) && $order->delivery_boy_id != 0 && $order->delivery_boy_id != "") {

            $deliveryBoy_id = $order->delivery_boy_id;
               
           // if (self::checkOrderMailSendable($deliveryBoy->id, $order->active_status, 1)) {
           // dd();
                $title = "Order  #" . $order->id . " has been assigned to you for delivery." ;
                $userTokens = UserToken::where('user_id',$deliveryBoy_id)->where('type','Delivery Boy')->get()->pluck('fcm_token','platform')->toArray();
                $message = "";
                $type="assign_order";
                self::sendNotification($userTokens,$title,$message,$type);
            //}
        }

    }

    public static function getPushObject($request, $image = ""){

        /*if($request->hasFile('image') && $image != "" ){*/
        /*$test = false;
        if($test){*/
        /*__construct($title, $message, $image,$type,$id)*/

        if($request->hasFile('image') && $image != "" ){
            $image_url = Storage::url($image);
            $image_url = asset($image_url);
            $push = new PushHelpers(
                $request->title,
                $request->message,
                $image_url,
                $request->type,
                $request->type_id,
                $request->type_link ?? ""
            );
        } else {
            $push = new PushHelpers(
                $request->title,
                $request->message,
                null,
                $request->type,
                $request->type_id,
                $request->type_link ?? ""
            );
        }

        //getting the push from push object
        $pushNotification = $push->getPush();

        return $pushNotification;
    }

    public static function sendNotification($userTokens,$title,$message,$type='',$type_id=0,$image=''){

            $data = array();

            $logo = \App\Models\Setting::get_value('logo');
            if($logo){
                $logo = url('/storage')."/".$logo;
            }else{
                $logo = asset('images/favicon.png');
            }

            $data = array();
            $data['data']['title'] = $title;
            $data['data']['message'] = $message;
            $data['data']['body'] = $message;
            $data['data']['image'] = $image;
            $data['data']['type'] = $type;
            $data['data']['id'] = $id??'';
            $data['data']['icon'] = $logo;
            if ($data['data']['type'] == 'category') {
                $category = Category::with('catActiveChilds')->find($slider->type_id);
                if ($category) {
                    $data['data']['type_slug'] = $category->slug;
                    $data['data']['type_name'] = $category->name;
                    $data['data']['has_child'] = $category->has_child;
                    $data['data']['has_active_child'] = $category->has_active_child;
                } else {
                    $data['data']['type_slug'] = "";
                    $data['data']['type_name'] = "";
                    $data['data']['has_child'] = $category->has_child;
                    $data['data']['has_active_child'] = $category->has_active_child;
                }
                
            }
            if ($data['data']['type'] == 'product') {
                $data['data']['type_slug'] = Product::where('id', $slider->type_id)->value('slug') ?? "";
            }
            $fcmMsg = [
                'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
                'title' =>  $title,
                'message' =>  $message,
                'body' => $message,
                'type' =>  $type,
                'id' => $id ?? '',
                'icon' => $logo,
                'sound' => $type == "new_order" || $type == "assign_order" ?  "order_sound.aiff" : "default"
            ];
        
            $notification = [
                'title' => $title,
                'body' =>  $message,
               // 'mutable_content' => true,
               //'sound' =>  $type == "new_order" || $type == "assign_order" ?  "order_sound.aiff" : "default"
            ];

            Log::info("fcm data  : ",[$fcmMsg]);
            //$pushNotification = CommonHelper::getPushObject($data, $image);

            if(isset($userTokens) && count($userTokens)>0){
                $userTokens = array_unique($userTokens);
               
                foreach ($userTokens as $platform => $deviceToken) {
                    try {
                        FirebaseHelper::send($platform,$deviceToken, $fcmMsg, $notification);
                    } catch (Exception $e) {
                        // Handle exception - token might be invalid
                        echo "Error sending notification to device token: $deviceToken - " . $e->getMessage() . "<br>";
                        // Optionally, you can remove the invalid token from your database
                        // removeInvalidToken($deviceToken);
                    }
                }
            }
    }

    public static function addFundTransfers($delivery_boy_id, $amount, $type, $message = ""){

        $deliveryBoy = DeliveryBoy::find($delivery_boy_id);

        $closing_balance = 0;

        if ($type == FundTransfer::$typeDebit){
            $closing_balance = ($deliveryBoy->balance - $amount);
        }else if ($type == FundTransfer::$typeCredit){
            $closing_balance = ($deliveryBoy->balance + $amount);
        }

        if($closing_balance != 0){

            \Illuminate\Support\Facades\DB::beginTransaction();
            try {
                $fundTransfer = new FundTransfer();
                $fundTransfer->delivery_boy_id	 = $delivery_boy_id;
                $fundTransfer->type	 = $type;
                $fundTransfer->opening_balance	 = $deliveryBoy->balance;
                $fundTransfer->closing_balance	 = $closing_balance;
                $fundTransfer->amount   = $amount;
                $fundTransfer->status   = 1;
                $fundTransfer->message  = $message;
                $fundTransfer->save();

                $deliveryBoy->balance = $closing_balance;
                $deliveryBoy->save();

                \Illuminate\Support\Facades\DB::commit();
            } catch (\Exception $e) {
                Log::info("Error : ".$e->getMessage());
                DB::rollBack();
                // throw $e;
                return CommonHelper::responseError("Something Went Wrong!");
            }
        }

    }



    public static function restrictedUrls(){
        return array(
            'categories.update','categories.delete','subcategories.update','subcategories.delete','products.update',
            'products.delete', 'products.multiple_delete', 'products.change', 'products.bulk_upload', 'taxes.update',
            'taxes.delete', 'brands.update', 'brands.delete', 'sellers.update', 'sellers.delete', 'sellers.update_status',
            'sellers.updateCommission', 'home_slider_images.update', 'home_slider_images.delete', 'promo_code.update', 'promo_code.delete',
            'time_slots.update', 'time_slots.delete', 'units.update', 'units.delete',

            'notifications.delete', 'sections.update', 'sections.delete', 'offers.update', 'offers.delete', 'delivery_boys.update',
            'delivery_boys.delete', 'delivery_boys.update-status', 'social_media.update', 'social_media.delete', 'customers.change',
            'system_users.update', 'system_users.delete', 'system_users.change_password', 'withdrawal_requests.update', 'withdrawal_requests.delete',
            'return_requests.update', 'return_requests.delete', 'orders.delete', 'orders.deleteItem', 'orders.update_status', 'orders.assign_delivery_boy',
            'orders.update_items_status', 'role.update', 'role.delete', 'media.delete', 'media.multiple_delete', 'seller_commissions.update', 'seller_commissions.delete',
            'cities.save_boundary', 'cities.update', 'cities.delete', 'faqs.update', 'faqs.delete', 'seller.update_status', 'seller.assign_delivery_boy', 'seller.mail_settings.save',
            'delivery_boy.update_status', 'delivery_boy.mail_settings.save'
        );
    }
    public static function updateOrderPromoCode($order_id, $order_promo_discount){
        // dd($order_promo_discount);
        $order = Order::where("id",$order_id)->first();
        $order->promo_code = "";
        $order->promo_discount = 0;
        $order->final_total += $order_promo_discount;
        
        $order->save();
    }
    public static function getFssaiLicImg(){
        $fssai_lic_img_empty = '';
        try{
            $fssai_lic_img =  Setting::where('variable','fssai_lic_img')->first()->value;
        
            if($fssai_lic_img != ''){
                return self::getImage($fssai_lic_img);
            }else{
                return $fssai_lic_img_empty;         
            }
        } catch (\Exception $e) {
            return $fssai_lic_img_empty;    
        }
    }   
        
    public static function validateFSSAINumber($fssaiNumber){
        $pattern = '/^[0-9]{14}$/';
        // Check if the FSSAI number matches the pattern
        if (preg_match($pattern, $fssaiNumber)) {
           
        } else {
            return Response::json(array('status' => 0, 'message' => 'please enter Valid FSSAI NO.'));
        }
    }

    public static function getIsCategorySectionInHomepage(){
        $is_category_section_in_homepage_empty = 0;
        try{
            $is_category_section_in_homepage =  (int)Setting::where('variable','is_category_section_in_homepage')->first()->value;
        
            if($is_category_section_in_homepage != ''){
                return $is_category_section_in_homepage;
            }else{
                return $is_category_section_in_homepage_empty;         
            }
        } catch (\Exception $e) {
            return $is_category_section_in_homepage_empty;    
        }
    }
    
    public static function getCountCategorySectionInHomepage(){
        $count_category_section_in_homepage_empty = 9;
        try{
            $count_category_section_in_homepage =  (int)Setting::where('variable','count_category_section_in_homepage')->first()->value;
        
            if($count_category_section_in_homepage != ''){
                return $count_category_section_in_homepage;
            }else{
                return $count_category_section_in_homepage_empty;         
            }
        } catch (\Exception $e) {
            return $count_category_section_in_homepage_empty;    
        }
    } 

    public static function getIsBrandSectionInHomepage(){
        $is_brand_section_in_homepage_empty = 0;
        try{
            $is_brand_section_in_homepage =  (int)Setting::where('variable','is_brand_section_in_homepage')->first()->value;
        
            if($is_brand_section_in_homepage != ''){
                return $is_brand_section_in_homepage;
            }else{
                return $is_brand_section_in_homepage_empty;         
            }
        } catch (\Exception $e) {
            return $is_brand_section_in_homepage_empty;    
        }
    }
    
    public static function getCountBrandSectionInHomepage(){
        $count_brand_section_in_homepage_empty = 9;
        try{
            $count_brand_section_in_homepage =  (int)Setting::where('variable','count_brand_section_in_homepage')->first()->value;
        
            if($count_brand_section_in_homepage != ''){
                return $count_brand_section_in_homepage;
            }else{
                return $count_brand_section_in_homepage_empty;         
            }
        } catch (\Exception $e) {
            return $count_brand_section_in_homepage_empty;    
        }
    } 

    public static function getIsSellerSectionInHomepage(){
        $is_seller_section_in_homepage_empty = 0;
        $count_seller_section_in_homepage = 9;
        try{
            $is_seller_section_in_homepage =  (int)Setting::where('variable','is_seller_section_in_homepage')->first()->value;
            $count_seller_section_in_homepage =  (int)Setting::where('variable','count_seller_section_in_homepage')->first()->value;
            if($is_seller_section_in_homepage != ''){
               $data['is_seller_section_in_homepage'] = $is_seller_section_in_homepage;
               $data['count_seller_section_in_homepage'] = $count_seller_section_in_homepage;
               return $data;
            }else{
                $data['is_seller_section_in_homepage'] = $is_seller_section_in_homepage_empty;
               $data['count_seller_section_in_homepage'] = $is_seller_section_in_homepage_empty;
               return $data;         
            }
        } catch (\Exception $e) {
            $data['is_seller_section_in_homepage'] = $is_seller_section_in_homepage_empty;
            $data['count_seller_section_in_homepage'] = $is_seller_section_in_homepage_empty;
            return $data;  
        }
    }

    public static function getIsCountrySectionInHomepage(){
        $is_country_section_in_homepage_empty = 0;
        $count_country_section_in_homepage = 9;
        try{
            $is_country_section_in_homepage =  (int)Setting::where('variable','is_country_section_in_homepage')->first()->value;
            $count_country_section_in_homepage =  (int)Setting::where('variable','count_country_section_in_homepage')->first()->value;
            if($is_country_section_in_homepage != ''){
               $data['is_country_section_in_homepage'] = $is_country_section_in_homepage;
               $data['count_country_section_in_homepage'] = $count_country_section_in_homepage;
               return $data;
            }else{
                $data['is_country_section_in_homepage'] = $is_country_section_in_homepage_empty;
               $data['count_country_section_in_homepage'] = $is_country_section_in_homepage_empty;
               return $data;         
            }
        } catch (\Exception $e) {
            $data['is_country_section_in_homepage'] = $is_country_section_in_homepage_empty;
            $data['count_country_section_in_homepage'] = $is_country_section_in_homepage_empty;
            return $data;  
        }
    }

    public static function updateSellerWalletBalance($new_balance, $id){
        $seller = Seller::where("id",$id)->first();
        if ($seller) {
        $seller->balance = $new_balance;
        $seller->save();
        }
    }

    public static function getSellerWalletBalance($id){
        $seller = Seller::find($id);
        $balance = 0;
        if ($seller) {
            $balance = $seller->balance;
        } 
        return $balance;
    }

    public static function getSellerCommission($id){
        $seller = Seller::find($id);
        $balance = 0;
        if ($seller) {
            $balance = $seller->balance;
        } 
        return $balance;
    }
    public static function addSellerWalletTransaction($order_id, $order_item_id, $seller_id, $type, $wallet_balance, $message, $status = 1){
        
        $validator = \Validator::make(['order_item_id' => $order_item_id], [
            'order_item_id' => [
                'required',
                Rule::unique('seller_wallet_transactions', 'order_item_id'),
            ],
        ]);
        
        if ($validator->fails()) {
            
        } else {
            // Validation passed, create and save the new SellerWalletTransaction
            $transaction = new SellerWalletTransaction();
            $transaction->order_id = $order_id;
            $transaction->order_item_id = $order_item_id;
            $transaction->seller_id = $seller_id;
            $transaction->type = $type;
            $transaction->amount = $wallet_balance;
            $transaction->message = $message;
            $transaction->status = $status;
            $transaction->save();
        }
    }

    public static function uploadRatingImages($images, $product_rating_id)
    {
        foreach ($images as $file) {
            $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
            $image = Storage::disk('public')->putFileAs('product_ratings', $file, $fileName);
            $RatingImages = new RatingImages();
            $RatingImages->product_rating_id = $product_rating_id;
            $RatingImages->image = $image;
            $RatingImages->save();
        }
    }

    public static function productAverageRating($product_id)
    { 
        $product_ratings= Product::with('ratings')->find($product_id);

        // Calculate the average rating
        $averageRating = (isset($product_ratings) && $product_ratings->ratings->count() > 0) ? $product_ratings->ratings->avg('rate') : 0;
                       
        // Count the number of ratings
        $data['rating_count'] = isset($product_ratings) ? $product_ratings->ratings->count(): 0;
        $data['average_rating'] = $averageRating;
        $data['one_star_rating'] = ProductRating::where('product_id',$product_id)->where('rate',1)->count() ?? 0;
        $data['two_star_rating'] = ProductRating::where('product_id',$product_id)->where('rate',2)->count() ?? 0;
        $data['three_star_rating'] = ProductRating::where('product_id',$product_id)->where('rate',3)->count() ?? 0;
        $data['four_star_rating'] = ProductRating::where('product_id',$product_id)->where('rate',4)->count() ?? 0;
        $data['five_star_rating'] = ProductRating::where('product_id',$product_id)->where('rate',5)->count() ?? 0;
        return $data;  
    }

    public static function productRatingOfUser($product_id, $user_id)
    { 
        $product_ratings =ProductRating::with('user','images')->where('product_id',$product_id)->where('user_id',$user_id)->get();    
        return $product_ratings;  
    }

    public static function getCategoryChildIds($categories){
        $ids = [];

    foreach ($categories as $category) {
        $ids[] = $category['id'];
        if (!empty($category['cat_active_childs'])) {
            $ids = array_merge($ids, self::getCategoryChildIds($category['cat_active_childs']));
        }
    }

    return $ids;
    }

    public static function getGuestCartCount($variant_id, $quantity){
 
        $total['cart_items_count'] = count($variant_id);
        $total['cart_total_qty ']= count($quantity);

        $totalAmt = CommonHelper::calculateTotalAmount($variant_id,$quantity);
     
        $total['save_price'] = $totalAmt['save_price'];
        $total['total_amount'] = $totalAmt['total_amount'];

        $total['product_variant_id'] = implode(',', $variant_id);
        $total['quantity'] = implode(',',$quantity);

        return $total;
    }
    public static function sendOrderItemStatusMailNotification($order_item, $type){
 
        try {
                     //self::sendMailOrderStatus($order);
                     Log::info("Order Status order send mail :",[$order_item] );
                     
                   dispatch(new SendEmailJob($order_item,$type))->afterResponse();
                    //SendEmailJob::dispatch($order);

                }catch ( \Exception $e){
                    Log::error("Order Status order Send mail error :",[$e->getMessage()] );
                }
                try {
                    dispatch(function () use ($order_item) {
                          CommonHelper::sendNotificationOrderStatus($order_item,'order_item_status_update');
                          $admins = Admin::get();
                          foreach ($admins as $admin) {
                          $admin->notify(new OrderNotification($order_item->id, 'order_item_status_update'));
                          }
                      })->afterResponse();
                } catch (\Exception $e) {
                    Log::error("Order Status orderNotification error :",[$e->getMessage()] );
                }
    }
    public static function SendCartNotification()
    {
        $cart_notification = Setting::where('variable', 'cart_notification')->first();
        
        if ($cart_notification->value == 1) {
            $notification_delay_after_cart_addition = Setting::where('variable', 'notification_delay_after_cart_addition')->first();
            $notification_interval = Setting::where('variable', 'notification_interval')->first();
            $notification_stop_time = Setting::where('variable', 'notification_stop_time')->first();
            
            // Fetch cart items with their related variants where 'save_for_later' is 0
            $cartItems = Cart::with('variants')->where('save_for_later', 0)->get();
    
            foreach ($cartItems as $item) {
                $cartNotifications = CartNotification::where('cart_id', $item->id)->orderBy('id', 'desc')->first();
                
                if ($cartNotifications) {
                    if (Carbon::now()->format('Y-m-d H:i') == Carbon::parse($item->created_at)->addMinutes($notification_stop_time->value)->format('Y-m-d H:i')) {
                        $cartNotifications->delete();
                    } elseif (Carbon::now()->format('Y-m-d H:i') == Carbon::parse($cartNotifications->sent_at)->addMinutes($notification_interval->value)->format('Y-m-d H:i')) {
                        // Prepare the notification title and message
                        $title = "Title for product " . $item->products->name;
                        $message = "Message based on some condition for " . $item->variants->measurement;
    
                        // Log the notification in the cart_notifications table
                        CartNotification::create([
                            'user_id' => $item->user_id,
                            'cart_id' => $item->id,
                            'title' => $title,
                            'message' => $message,
                            'sent_at' => Carbon::now(),
                        ]);
    
                        $userTokens = UserToken::where('user_id', $item->user_id)
                            ->where('type', 'customer')
                            ->get()
                            ->pluck('fcm_token', 'platform')
                            ->toArray();
    
                        // Send the notification
                        self::sendNotification($userTokens, $title, $message);
                    }
                } else {
                    $twoMinutesLater = Carbon::parse($item->created_at)->addMinutes($notification_delay_after_cart_addition->value);
                    
                    if (Carbon::now()->format('Y-m-d H:i') == $twoMinutesLater->format('Y-m-d H:i')) {
                        \Log::info('Next schedule:');
    
                        // Fetch user tokens for the notification
                        $userTokens = UserToken::where('user_id', $item->user_id)
                            ->where('type', 'customer')
                            ->get()
                            ->pluck('fcm_token', 'platform')
                            ->toArray();
    
                        // Prepare the notification title and message
                        $title = "Hi, your cart with " . $item->products->name . " is waiting for you!";
                        $message = "Don't forget to complete your purchase and place your order today!";
    
                        // Log the notification in the cart_notifications table
                        CartNotification::create([
                            'user_id' => $item->user_id,
                            'cart_id' => $item->id,
                            'title' => $title,
                            'message' => $message,
                            'sent_at' => Carbon::now(),
                        ]);
    
                        // Send the notification
                        self::sendNotification($userTokens, $title, $message);
                    }
                }
            }
        }
    }
    public static function sendSmsOrderStatus($order, $order_item_status){
        try {
            
            // Debugging: Output the order details
            // Remove the line below in production
            
            $isenable_orderitemstatus = $order_item_status;
            if ($isenable_orderitemstatus != null) {
                if ($order_item_status == 9 || $order_item_status == 10) {  // If return request is approved or rejected
                    $isenable_orderitemstatus = OrderStatusList::$returned;  // Assign the returned status
                }
                
                $smsStatus = self::isSmsStatus($isenable_orderitemstatus);  // Set SMS status based on order item status
            } else {
                $smsStatus = self::isSmsStatus($isenable_orderitemstatus);  // Handle null case
            }
   
            // Step 2: If SMS is enabled, proceed to send the SMS
            if ($smsStatus) {
               
                // Prepare the SMS content
                $message = self::getSmsTemplateMessage($order,$order_item_status);
                $phone =  User::where('id', $order->user_id)->selectRaw("CONCAT(country_code, mobile) as phone")->value('phone');
                $phone = '+'.$phone;
                
                $success = TwilioHelper::sendSms($phone, $message);
    
                // Optional: Log the SMS sending
            } else {
                Log::info("SMS not sent for order #{$order->id}: SMS status is disabled.");
            }
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            \Log::error("Error sending SMS for order #{$order->id}: " . $e->getMessage());
        }
    }
    public static function isSmsStatus($active_status){
        $smsStatus = MailSetting::where('order_status_id', $active_status)->where('user_type', 1)->where('user_id', 1)->value('sms_status');
        return  $smsStatus;
    }
    public static function getSmsTemplateMessage($order, $status)
    {
        
        $customer_name = User::where('id', $order->user_id)->value('name');
        $product_name= $order->product_name ?? '';
        $supportNumber = Setting::where('variable', 'support_number')->value('value');
        $appName = Setting::where('variable', 'app_name')->value('value');
        $reason ='';
        // Determine the message type based on the order's active status
        $messageType = '';
        switch ($status) {
            case 1:
                $messageType = 'customer_order_payment_pending';
                break;
            case 2:
                $messageType = 'customer_order_received';
                break;
            case 3:
                $messageType = 'customer_order_processed';
                break;
            case 4:
                $messageType = 'customer_order_shipped';
                break;
            case 5:
                $messageType = 'customer_order_out_for_delivery';
                break;
            case 6:
                $messageType = 'customer_order_delivered';
                break;
            case 7:
                $messageType = 'customer_order_cancelled';
                break;
            case 8:
                $messageType = 'customer_order_return_request';
                break; 
            case 9:
                $messageType = 'customer_order_confirm_return_request';
                break; 
            case 10:
                $messageType = 'customer_order_reject_return_request';
                $product_name= OrderItem::where('id', $order->order_item_id)->first()->product_name;
                $reason = $order->reason;
                break; 
                
            default:
                // Handle other statuses or use a default message type
                $messageType = 'default_message';
                break;
        }

        // Retrieve the message template from the sms_template table
        $messageTemplate = SmsTemplate::where('type', $messageType)->value('message');
        // If a template is found, replace placeholders with actual data
       
        if ($messageTemplate) {
           
            $message = str_replace(['[Customer Name]','[Product Name]','[Order ID]', '[Support Contact]', '[Store Name]','[Reason]'], [$customer_name,$product_name,'#'.$order->id, $supportNumber, $appName, $reason], $messageTemplate);
            
        } else {
            // Fallback message if no template is found
            $message = "Your order #{$order->id} has been updated to status: {$order->status->name}";
        }

        return $message;
    }
    public static function getChildCategoryIds($categoryIds) {
        $childIds = Category::whereIn('parent_id', $categoryIds)
        ->pluck('id')
        ->toArray();

    if (!empty($childIds)) {
        return array_merge($childIds, self::getChildCategoryIds($childIds));
    }

    return [];
    }

}

