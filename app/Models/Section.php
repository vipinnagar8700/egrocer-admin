<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $appends = ['banner_app_url','banner_web_url'];
    public function getBannerAppUrlAttribute()
    {
        return $this->banner_app ? asset('storage/' . $this->banner_app) : null;
    }

    public function getBannerWebUrlAttribute()
    {
        return $this->banner_web ? asset('storage/' . $this->banner_web) : null;
    }
}
