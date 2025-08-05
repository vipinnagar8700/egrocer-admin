<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $appends = ['image_url'];
    protected $hidden = [];
    public function getImageUrlAttribute(){
        $image_url = '';
        if($this->image){
            $image_url = asset('storage/'.$this->image);
        }
        return $image_url;
    }
    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id', 'id');
    }
}
