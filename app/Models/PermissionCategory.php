<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionCategory extends Model
{

    protected $table = 'permission_categories';

    protected $fillable = ['name', 'guard_name', 'created_at', 'updated_at'];

    public function permissions()
    {
        return $this->hasMany('App\Models\Permission', 'category_id', 'id');
    }

}
