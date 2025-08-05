<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Role extends Model
{

    public static $roleSuperAdmin = 1;
    public static $roleAdmin = 2;
    public static $roleSeller = 3;
    public static $roleDeliveryBoy = 4;

    public static $roleNameSuperAdmin = "Super Admin";
    public static $roleNameAdmin = "Admin";
    public static $roleNameSeller = "Seller";
    public static $roleNameDeliveryBoy = "Delivery Boy";
}
