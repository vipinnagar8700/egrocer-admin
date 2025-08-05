<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;
    public $timestamps = false;

    public static $codModeGlobal = "global";
    public static $codModeProduct = "product";


    public static function get_value($name) {
        $settings = self::where('variable', $name);
       
        if($settings->count() == 0){ return '';};

        $setting = $settings->first();
        return $setting->value;
    }

    public static function update_value($name, $value) {
        $settings = self::where('variable', $name);
        if($settings->count() == 0) throw new \Exception("Empty Setting for ".$name);

        $setting = $settings->first();
        $setting->value = $value;
        $setting->save();
    }
}
