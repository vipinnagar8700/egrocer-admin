<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(){

        if($this->image){
            $image_url = \Storage::url($this->image);
            return $image_url;
        }
        return $this->image;
    }

    public function category(){

        return $this->belongsTo(Category::class,'category_id');
    }
}
