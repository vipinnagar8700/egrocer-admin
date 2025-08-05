<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WithdrawalRequest extends Model
{
    use HasFactory;

    public static $typeUser = "user";
    public static $typeSeller = "seller";
    public static $typeDeliveryBoy = "delivery_boy";

    public static $statusPending = 0;
    public static $statusApproved = 1;
    public static $statusRejected = 2;

    public static $pending = "Pending";
    public static $approved = "Approved";
    public static $rejected = "Rejected";

    public static $deviceWeb = 0;
    public static $deviceAndroid = 1;
    public static $deviceIos = 2;

    public static $web = "Web";
    public static $android = "Android";
    public static $ios = "IOS";

    protected $fillable = ['type','type_id','amount','message','status','remark','device_type','receipt_image'];
    protected $appends = ['origional_type', 'receipt_image_url'];

    public function getReceiptImageUrlAttribute(){

        if($this->receipt_image){
            $receipt_image_url = asset('storage/'.$this->receipt_image);
            return $receipt_image_url;
        }
        return $this->receipt_image;
    }

    public function getDeviceTypeAttribute($value)
    {
        if($value == self::$deviceWeb){
            return self::$web;
        }else if($value == self::$deviceAndroid){
            return self::$android;
        }else{
            return self::$ios;
        }
    }

    public function getTypeAttribute($value)
    {
        return ucwords(str_replace('_', ' ',$value));
    }

    public function getOrigionalTypeAttribute()
    {
        return strtolower(str_replace(' ', '_',$this->type));
    }

}
