<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use SoftDeletes;
    use HasApiTokens, HasFactory, Notifiable,HasRoles,Billable;

    protected $fillable = ['email','name','password','mobile'];

    protected $hidden = ['password','friends_code'];


    public static $deactive = 0;
    public static $active = 1;
    public static $register = 2;

    public static $activeStatus = "Active";
    public static $deactiveStatus = "Deactive";
    public static $registerStatus = "Register";

    public function getProfileAttribute($value){
        if(trim($value) == ""){
            return asset('images/user_default_profile.png');
        }
        return asset('storage/'.$value);
    }
}
