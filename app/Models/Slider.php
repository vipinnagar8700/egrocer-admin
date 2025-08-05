<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasFactory;
    protected $appends = ['type_name','image_url'];
    public function category(){

        return $this->belongsTo(Category::class,'type_id','id');
    }

    public function product(){

        return $this->belongsTo(Product::class,'type_id','id');
    }

    public function getTypeNameAttribute(){
        $type_name = '';
        if($this->type == 'category'){
            $type_name = $this->category->name??"";
        }elseif($this->type == 'product'){
            $type_name = $this->product->name??"";
        }elseif($this->type == 'offer_url'){
            $type_name = $this->offer_url??"";
        }
        return $type_name;
    }

    public function getImageUrlAttribute(){
        if($this->image){
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;
    }

    protected $hidden = [];
}