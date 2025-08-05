<?php

namespace App\Models;

use App\Helpers\CommonHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;
    protected $hidden = ['created_at','updated_at'];
    protected $fillable = ['supported_language_id','system_type','json_data','is_default'];
    protected $appends = ['system_type_name'];

    public static $systemTypeCustomerApp = 1;
    public static $systemTypeSellerAndDeliveryBoyApp = 2;
    public static $systemTypeWebsite = 3;
    public static $systemTypeAdminPanel = 4;


    public static function get_system_types(): array {
        $string = CommonHelper::getColumnComment("languages", "system_type");
        $arrays = explode(',',$string);
        $system_types = array();
        foreach ($arrays as $key => $code){
            $data = array();
            $array = explode('=>',$code);
            $data['id'] = intval($array[0]);
            $data['name'] = trim($array[1]);
            $system_types[$key] = $data;
        }
        return $system_types;
    }

    public function getSystemTypeNameAttribute(){
        $system_types = $this->get_system_types();
        $system_type = $this->system_type;

        $filtered_array = array_filter($system_types, function($element) use ($system_type) {
            return $element['id'] == $system_type;
        });
        $type_array = reset($filtered_array);
        return $type_array['name'];
    }

    public function getTypeAttribute($value)
    {
        return strtoupper($value);
    }

}
