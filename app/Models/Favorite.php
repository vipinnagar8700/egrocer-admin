<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;
    protected $hidden = [];
    protected $appends = ['image_url'];
   
    public function images(){
        return $this->hasMany(ProductImages::class,'product_id','product_id')
            ->where('product_variant_id',0);
    }
    public function variants(){
        return $this->hasMany(ProductVariant::class,'product_id','product_id');
    }
    public function getImageUrlAttribute(){
        if($this->image){
          
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;
    }
}
