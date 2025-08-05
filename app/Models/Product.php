<?php

namespace App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //use HasFactory,SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'category_id',
        'indicator',
        'manufacturer',
        'made_in',
        'return_status',
        'cancelable_status',
        'till_status',
        'description',
        'image',
        'seller_id',
        'is_approved',
        'brand_id',
        'return_days',
        'tax_id',
        'fssai_lic_no',
        'barcode',
        'meta_title',
        'meta_description',
        'meta_keyword',
        'schema_markup',
    ];

    protected $appends = ['image_url'];

    protected $hidden=['created_at','updated_at','deleted_at'];

    public function seller(){

        return $this->belongsTo(Seller::class,'seller_id','id');
    }

    public function tax(){
        return $this->belongsTo(Tax::class,'tax_id','id');
    }

    public function madeInCountry(){
        return $this->belongsTo(Country::class,'made_in','id');
    }

    public function category(){
        return $this->belongsTo(Category::class,'category_id','id');
    }

    public function variants(){

        return $this->hasMany(ProductVariant::class,'product_id','id');
    }

    public function images(){

        return $this->hasMany(ProductImages::class,'product_id','id')
            ->where('product_variant_id',0);
    }

    public function brand(){
        return $this->belongsTo(Brand::class,'brand_id','id');
    }


    public function getImageUrlAttribute(){

        if($this->image){
            $image_url = asset('storage/'.$this->image);
        }else{
            $image_url = '';
        }
        return $image_url;
    }
    public function ratings()
    {
        return $this->hasMany(ProductRating::class, 'product_id');
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }
}
