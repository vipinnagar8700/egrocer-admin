<?php

namespace App\Helpers;
use App\Models\Product;
use App\Models\Category;

class PushHelpers
{
    //notification title
    private $title;

    //notification message
    private $message;

    //notification image url
    private $image;

    //type of notification ex: default / category / product
    private $type;

    //ID of the type ex: category_id / product_id
    private $id;

    //initializing values in this constructor
    function __construct($title, $message, $image,$type,$type_id,$type_link) {
        $this->title = $title;
        $this->message = $message;
        $this->image = $image;
        $this->type = $type;
        $this->type_slug = '';
        $this->type_name = '';
        $this->has_child = '';
        $this->has_active_child = '';
        if(isset($type_link) && $type_link != "" && filter_var($type_link, FILTER_VALIDATE_URL) ){
            $this->id = $type_link;
        }else{
            $this->id = $type_id;
            if ($this->type == 'category') {
                $category = Category::select('id', 'slug', 'name')->find($this->id);
                if ($category) {
                    $this->type_slug = $category->slug;
                    $this->type_name = $category->name;
                     $this->has_child = $category->has_child ? 'true' : 'false';
$this->has_active_child = $category->has_active_child ? 'true' : 'false';
                } else {
                    $this->type_slug = "";
                    $this->type_name = "";
                    $this->has_child = $category->has_child;
                    $this->has_active_child = $category->has_active_child;
                }
                
            }
            if ($this->type == 'product') {
                 $product = Product::select('id', 'slug', 'name')->find($this->id);
                if ($product) {
                    $this->type_slug = $product->slug;
                    $this->type_name = $product->name;
                } else {
                    $this->type_slug = "";
                    $this->type_name = "";
                }
                
            }
        }
    }

    //getting the push notification
    public function getPush() {
    //     $res = array();
    //     $res['title'] = $this->title;
    //     $res['body'] = $this->message;
    //     $res['message'] = $this->message;
    //     $res['image'] = $this->image;
    //    // $res['type'] = $this->type;
    //     $res['id'] = $this->id;
    //     // print_r(json_encode($res));

    $fcmMsg = [
        'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
        'title' =>  $this->title,
        'message' =>  $this->message,
        'body' =>  $this->message,
        'type' =>  $this->type,
        'id' => $this->id,
        'type_slug' =>$this->type_slug,
        'type_name' => $this->type_name,
        'has_child' => $this->has_child,
        'has_active_child' => $this->has_active_child,
        'image' => $this->image,
        'sound' => 'default'
    ];

    $notification = [
        "title" => $this->title,
         "body" =>  $this->message,
         'image' => $this->image,
    ];
    return ['fcmMsg' => $fcmMsg, 'notification' => $notification];
    }

}
?>
