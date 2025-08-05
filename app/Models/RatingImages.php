<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RatingImages extends Model
{
    use HasFactory;
    public $timestamps = false;

   
    protected $hidden = [];
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(){
        if($this->image){
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;
    }

    public function productRating()
    {
        return $this->belongsTo('App\Models\ProductRating', 'product_rating_id');
    }
}
