<?php

namespace App\Http\Repository;


use App\Models\Product;

class ProductRepository
{
    public function get()
    {
         return Product::orderBy('id','DESC')->get();

    }
}
