<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    protected $appends = ['image_url','type_name','type_slug','section_title'];
    protected $hidden = ['created_at','updated_at'];
    public function getImageUrlAttribute(){
        if($this->image){
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;
    }
    public function category(){
        return $this->belongsTo(Category::class,'type_id','id')->select('id', 'name','slug');
    }

    public function product(){
        return $this->belongsTo(Product::class,'type_id','id')->select('id', 'name', 'slug');
    }
    public function section(){
        return $this->belongsTo(Section::class,'section_position','id')->select('id', 'title');
    }

    public function getTypeNameAttribute(){
        $type_name = '';
        if($this->type == 'category'){
            $type_name = $this->category->name??"";
        }elseif($this->type == 'product'){
            $type_name = $this->product->name??"";
        }
        return $type_name;
    }
    public function getTypeSlugAttribute(){
        $type_slug = '';
        if($this->type == 'category'){
            $type_slug = $this->category->slug??"";
        }elseif($this->type == 'product'){
            $type_slug = $this->product->slug??"";
        }
        return $type_slug;
    }

    public function getSectionTitleAttribute(){
        $section_title = '';
        if($this->position == 'below_section'){
            $section_title = $this->section->title??"";
        }
        return 'Below '.$section_title;
    }

}
