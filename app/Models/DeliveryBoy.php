<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryBoy extends Model
{
    use HasFactory;
    protected $appends = ['pending_order_count', 'driving_license_url', 'national_identity_card_url'];

    public static $bonusFixed = 0;
    public static $bonusCommission = 1;
    public static $commission = "Commission";
    public static $fixed = "Fixed/Salaried";


    public static $statusRegistered = 0;
    public static $statusActive = 1;
    public static $statusRejected = 2;
    public static $statusDeactivated = 3;
    public static $statusRemoved = 7;

    public static $Registered = "Registered";
    public static $Active = "Active";
    public static $Rejected = "Rejected";
    public static $Deactivated = "Deactivated";
    public static $Removed = "Removed";

    public function admin(){
        return $this->belongsTo(Admin::class,'admin_id','id');
    }

    public function getPendingOrderCountAttribute(){
        $ignoreStatus = array(
            OrderStatusList::$paymentPending,
            OrderStatusList::$delivered,
            OrderStatusList::$cancelled,
            OrderStatusList::$returned,
        );
        return Order::where('delivery_boy_id', $this->id)->whereNotIn('active_status', $ignoreStatus)->count();
    }

    public function city(){
        return $this->belongsTo(City::class,'city_id','id');
    }
    public function getDrivingLicenseUrlAttribute(){
        if($this->driving_license){
            $driving_licence_url = asset('storage/'.$this->driving_license);
            return $driving_licence_url;
        }
        return $this->driving_license;
    }

    public function getNationalIdentityCardUrlAttribute(){
        if($this->national_identity_card){
            $national_identity_card_url = asset('storage/'.$this->national_identity_card);
            return $national_identity_card_url;
        }
        return $this->national_identity_card;
    }
}
