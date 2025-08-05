<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;

    protected $fillable = ['id','user_id','type','name','mobile','alternate_mobile','address','landmark','area','pincode','city_id','city','state',
        'country','latitude','longitude','is_default'];

    protected $hidden = ['user_id','created_at','updated_at'];
}
