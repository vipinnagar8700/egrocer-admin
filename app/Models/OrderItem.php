<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    //use HasFactory,SoftDeletes;
    use HasFactory;
    protected $hidden = [];
protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'order_id' => 'integer',
        'orders_id' => 'string', // if it can be large, keep it as string
        'price' => 'float',
        'discount' => 'float',
        'discounted_price' => 'float',
        'sub_total' => 'float',
        'tax_amount' => 'float',
        'tax_percentage' => 'float',
        'quantity' => 'float',
        'product_id' => 'integer',
        'product_variant_id' => 'integer',
        'variant_id' => 'integer',
        'return_days' => 'integer',
        'return_status' => 'integer',
        'cancelable_status' => 'integer',
        'is_credited' => 'integer',
        'delivery_boy_id' => 'integer',
        'seller_id' => 'integer',
    ];
    protected $appends = ['image_url'];

    public function images(){
        return $this->hasMany(ProductImages::class,'product_variant_id','product_variant_id');
          
    }

    public function getImageUrlAttribute(){

        if($this->image){
            //$image_url = \Storage::url($this->image);
            $image_url = asset('storage/'.$this->image);
            return $image_url;
        }
        return $this->image;

    }

    public function seller()
    {
        return $this->belongsTo(Seller::class, 'seller_id');
    }

    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
