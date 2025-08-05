Pending Work List:
1.Add Permission for Module wise action buttons (Menu & Submenu Done)
2.Add Localization (lang/en)

Next Tasks :

- Changes Currency value from global Variable ($currency)
- Change Status Value From Table Product Add/Update Till Status



----------------------------------------------------------------------------------------------------
- Order ma seller wise order items male and delivery charges too
- Manage order items separately, In eCart when I delete a product, in orders also it's taken null values, need to improve it.
- Unit filtration (right now product ma we can add mismatch units like ltr and kg with the same product need to reduce that exception) (Working)
- COD order - Display as Transaction

$ git diff --name-status 1.3..1.4
git pull origin 1.9

//"description": "[Added] FTP deployment feature has been added to the website. <br>[Added] Resend OTP functionality has been incorporated into the website. <br>[Added] Multi-language functionality has been implemented on the website. <br>[Added] A language management option has been added to both the app and website, allowing for easy language customisation from the panel side. <br>[Added] Clear cache, config, route, view in admin panel. <br>[Improve] Various bug fixes have been applied, resulting in improved performance and stability."


Use Full Commands :

php artisan cache:clear
php artisan config:clear
php artisan passport:install
php artisan cache:forget spatie.permission.cache





php artisan make:migration add_newcolumnname_to_tablename --table="tablename"
example

php artisan make:migration add_remark_to_sellers_table --table=sellers
php artisan make:migration add_row_order_to_sections_table --table=sections


php artisan make:migration add_type_link_to_notifications_table --table=notifications


Can change order status to Delivered?

change_order_status_delivered

assign_delivery_boy


git commands

git diff --name-status 1.2..1.3

php artisan make:migration add_delivery_boy_bonus_details_to_orders_table --table=orders

php artisan make:migration add_login_info_to_admins_table --table=admins


php artisan make:model Settings --migration

php artisan make:model SupportedLanguage --migration

php artisan make:model Languages --migration

php artisan make:controller API/LanguageApiController

php artisan make:seeder SeederName
php artisan make:seeder LanguageSeeder


php artisan db:seed --class=SeederName
php artisan db:seed --class=SupportedLanguageSeeder



[Added] FTP deployment feature has been added to the website. <br>[Added] Resend OTP functionality has been incorporated into the website. <br>[Added] Multi-language functionality has been implemented on the website. <br>[Added] A language management option has been added to both the app and website, allowing for easy language customisation from the panel side. <br>[Added] Clear cache, config, route, view in admin panel. <br>[Improve] Various bug fixes have been applied, resulting in improved performance and stability.



public function getOrders_new(Request $request){

$limit = ($request->limit)??12;
$offset = ($request->offset)??0;
$order_id = $request->order_id;
$user_id = auth()->user()->id;

//$where = !empty($order_id) ? " o.id = " . $order_id : "";
//$sql = "select count(o.id) as total from orders o where user_id=" . $user_id . $where;

$sql = Order::select( DB::raw("count(oi.id) as total"))->leftJoin('order_items as oi', 'oi.order_id', '=', 'orders.id')
->where("orders.user_id", $user_id);
if (!empty($order_id)){
$sql = $sql->where("oi.id",$order_id);
}
if(isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id !=""){
$sql = $sql->where("oi.active_status","=",$request->order_status_id);
}

$total = $sql->first();


$sql = Order::select( "orders.*","orders.id as order_id","obt.message as bank_transfer_message","obt.status as bank_transfer_status",
DB::raw('(select name from users as u where u.id = orders.user_id) as user_name') ,
'address.address', 'address.landmark', 'address.area', 'address.city', 'address.state','address.pincode', 'address.country',

'oi.*','v.id as variant_id', 'p.name','p.image','p.manufacturer','p.made_in','p.return_status','p.return_days','p.cancelable_status','p.till_status',
'v.measurement',DB::raw('(select short_code from units as u where u.id = v.stock_unit_id) as unit'),
'os.status as current_status', 'os.id as order_status_id', 'co.name as country_made_in', 's.name as seller_name'
)->from("orders as orders")

->leftJoin('order_items as oi', 'oi.order_id', '=', 'orders.id')

->leftJoin('product_variants as v', 'oi.product_variant_id', '=', 'v.id')
->leftJoin('products as p', 'v.product_id', '=', 'p.id')
->leftJoin('sellers as s', 'oi.seller_id', '=', 's.id')
->leftJoin("countries as co", "p.made_in", "=", "co.id")
->leftJoin('order_status_lists as os', 'oi.active_status', '=', 'os.id')

->leftJoin("order_bank_transfers as obt", "obt.order_id", "=", "orders.id")
->leftJoin('user_addresses as address', 'orders.address_id', '=', 'address.id')

->where("orders.user_id", "=", $user_id);
if (!empty($order_id)){
$sql = $sql->where("orders.id","=",$order_id);
}

if(isset($request->order_status_id) && $request->order_status_id != 0 && $request->order_status_id !=""){
$sql = $sql->where("oi.active_status","=",$request->order_status_id);
}

$res = $sql->orderBy("orders.id","DESC")->skip($offset)->take($limit)->get();
$res = $res->makeHidden(['image','images','updated_at','deleted_at','current_status','status','country_made_in','order_status_id']);

$i = 0;
foreach ($res as $key => $row) {
$res[$key]->active_status = $row->current_status??"";
$res[$key]->address = $row->address." ".$row->landmark." ".$row->area." ".$row->city." ".$row->state."-".$row->pincode." ".$row->country;
$res[$key]->active_status = $row->current_status??"";
$res[$key]->made_in = $row->country_made_in??"";
$res[$key]->created_at = Carbon::createFromFormat('Y-m-d',date('Y-m-d',strtotime($row->created_at)))->format('Y-m-d');

if($row->order_status_id == $row->till_status){
$res[$key]->cancelable_status = 1;
}else{
$res[$key]->cancelable_status = 0;
}

$created_at = date_create(date('Y-m-d',strtotime($row->created_at)));
$current_data = date_create(date('Y-m-d'));
$order_days = abs(date_diff($created_at, $current_data)->format('%R%a'));
if($order_days <= $row->return_days ){
$res[$key]->return_status = 1;
}else{
$res[$key]->return_status = 0;
}

if ($row->discount > 0) {
$discounted_amount = $row->total * $row->discount / 100;
$final_total = $row->total - $discounted_amount;
$discount_in_rupees = $row->total - $final_total;
} else {
$discount_in_rupees = 0;
}
$res[$i]['discount_rupees'] = $discount_in_rupees;
$final_total = ceil($res[$i]['final_total']);
$res[$i]['final_total'] = $final_total;
$res[$i]['created_at'] = date('Y-m-d',strtotime($res[$i]['created_at']));
$res[$i]['bank_transfer_message'] = !empty($res[$i]['bank_transfer_message']) ? $res[$i]['bank_transfer_message'] : "";
$res[$i]['bank_transfer_status'] = !empty($res[$i]['bank_transfer_status']) ? $res[$i]['bank_transfer_status'] : "0";
$res[$i]['image_url'] = CommonHelper::getImage($res[$i]['image']);
$res[$i]['status'] = json_decode($res[$i]['status']);
$res[$i]['final_total'] = strval($row['final_total']);
$res[$i]['total'] = strval($row['total']);
$i++;
}

if (!empty($res) && $total->total !== 0) {
return CommonHelper::responseWithData($res,$total->total);
} else {
return CommonHelper::responseError(__('no_orders_found'));
}
}

