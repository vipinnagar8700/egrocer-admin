<?php

namespace Database\Seeders;

use App\Helpers\CommonHelper;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\ProductVariant;
use App\Models\Seller;
use App\Models\Tax;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class Demo extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // It will remove all the data and insert fresh demo data
        /*
        Category::truncate();
        Product::truncate();
        ProductVariant::truncate();
        ProductImages::truncate();
        Seller::truncate();
        Tax::truncate();
        */
        // Categories
        $categories = ['Vegetables','Fresh Fruits','Coconut Milk','Juice'];
        foreach ($categories as $category){
            $data = array();
            $data['name'] = $category;
            $data['subtitle'] = $category;
            $data['image'] = 'demo/'.time().'_'.rand(10,990).'.jpg';
            $data['status'] = 1;
            Category::create($data);
        }

        //Tax
        Tax::create([
            'title'=>'GST',
            'percentage'=>18,
            'status'=>1
        ]);

        // Products
        $products = range(1,4);
        foreach ($products as $product){

            $data = array();
            $data['seller_id'] = 1;
            $data['tax_id'] = 1;
            $data['row_order'] = 1;
            $data['name'] = 'Demo Product '.$product;
            $data['slug'] = CommonHelper::slugify($data['name']);
            $data['category_id'] = Category::get()[$product-1]->id;
            $data['indicator'] = 1;
            $data['manufacturer'] = 'WR Team';
            $data['made_in'] = 'India';
            $data['image'] = 'demo/Vegetables.jpg';
            $data['other_images'] = '';
            $data['description'] = Str::random(40);
            $data['status'] = 1;
            $data['is_approved'] = 1;
            $data['type'] = 'packet';
            $data['cod_allowed'] = 1;
            $data['total_allowed_quantity'] = 10;
            $data['return_status'] = 1;
            $data['cancelable_status'] = 1;
            $data['tags'] = '';

            $newProduct = Product::create($data);

            // Variant
            $variantData = array();
            $variantData['product_id'] = $newProduct->id;
            $variantData['type'] = 'packet';
            $variantData['status'] = 1;
            $variantData['measurement'] = 232.00;
            //$variantData['measurement_unit_id'] = 1;
            $variantData['price'] = 230;
            $variantData['discounted_price'] = 220;
            $variantData['stock'] = 100;
            $variantData['stock_unit_id'] = 1;

            $newVariant = ProductVariant::create($variantData);

            // Variant Images
            ProductImages::create([
               'product_id' => $newProduct->id,
               'product_variant_id' => $newVariant->id,
               'image' => 'demo/Vegetables.jpg'
            ]);

        }
    }
}
