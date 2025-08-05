<?php

namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Helpers\ProductHelper;
use App\Http\Controllers\Controller;
use App\Http\Repository\CategoryRepository;
use App\Http\Repository\ProductRepository;
use App\Models\Cart;
use App\Models\Category;
use App\Models\City;
use App\Models\Favorite;
use App\Models\Offer;
use App\Models\Pincode;
use App\Models\Product;
use App\Models\Section;
use App\Models\Seller;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\Brand;
use App\Models\Country;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ShopApiController extends Controller
{

    public $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getShopData(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'latitude' => 'required',
            'longitude' => 'required',
        ], [
            'latitude.required' => 'The latitude field is required.',
            'longitude.required' => 'The longitude field is required.'
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $seller_ids = CommonHelper::getSellerIds($request->latitude, $request->longitude);
        
        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : 0;
         
        $sections = CommonHelper::getSectionWithProduct($seller_ids, $user_id);
       

        $sliders = Slider::where('status', 1)->orderBy('id', 'DESC')->get();
        $sliders = $sliders->makeHidden(['image', 'product', 'category', 'created_at', 'updated_at', 'status']);

        foreach ($sliders as $key => $slider) {
            $slider->slider_url = $slider->slider_url ?? "";
            $slider->type_id = $slider->type_id ? intval($slider->type_id) : 0;

                if ($slider->type == 'category') {
                    $slider->type_slug = Category::where('id', $slider->type_id)->value('slug') ?? "";
                   
  
      

       $category = Category::with('catActiveChilds')->find($slider->type_id);

if ($category) {
    // Hide meta_title from main category
    $category->makeHidden(['meta_title','meta_keywords','schema_markup','meta_description']);

    // Load and attach active children
    $category->cat_active_childs = $category->catActiveChilds->map(function ($child) {
        return $child->makeHidden(['meta_title','meta_keywords','schema_markup','meta_description']);
    });
}

        $slider->category_data = $category ?? (object)[];
                } elseif ($slider->type == 'product') {
                    $slider->type_slug = Product::where('id', $slider->type_id)->value('slug') ?? "";
                } else {
                    $slider->type_slug = "";
                }
            }

        $offers = Offer::orderBy('id', 'DESC')->get();
        $offers = $offers->makeHidden(['image']);
        $is_category_section_in_homepage = CommonHelper::getIsCategorySectionInHomepage();
         
        $is_brand_section_in_homepage = CommonHelper::getIsBrandSectionInHomepage();
        $is_seller_section_in_homepage = CommonHelper::getIsSellerSectionInHomepage()['is_seller_section_in_homepage'];
        $is_country_section_in_homepage = CommonHelper::getIsCountrySectionInHomepage()['is_country_section_in_homepage'];
        $output = array(
            'sliders' => $sliders,
            'offers' => $offers,
            'sections' => $sections,
            'is_category_section_in_homepage' => $is_category_section_in_homepage,
            'is_brand_section_in_homepage' => $is_brand_section_in_homepage,
            'is_seller_section_in_homepage' => $is_seller_section_in_homepage,
            'is_country_section_in_homepage' => $is_country_section_in_homepage,
        );
    
        if($is_category_section_in_homepage && $is_category_section_in_homepage==1){
            $count_category_section_in_homepage = CommonHelper::getCountCategorySectionInHomepage();
            $categories = Category::where('status', 1)
            ->where('parent_id', 0)
            ->where('status', 1)
            ->orderBy('row_order', 'ASC')
            ->limit($count_category_section_in_homepage)
            ->get(['id', 'name', 'subtitle', 'image', 'slug']);
        $categories = $categories->makeHidden(['image']);
        $output['categories'] = $categories->toArray();
        }

        
        if($is_brand_section_in_homepage && $is_brand_section_in_homepage==1){
            $count_brand_section_in_homepage = CommonHelper::getCountBrandSectionInHomepage();
            $brands = Brand::where('status', 1)
            ->whereHas('products', function ($query) use ($seller_ids) {
                $query->whereIn('products.seller_id', $seller_ids)
                    ->where('products.status', 1)
                    ->where('products.is_approved', 1)
                    ->whereExists(function ($categoryQuery) {
                        $categoryQuery->select(DB::raw(1))
                            ->from('categories')
                            ->whereColumn('categories.id', 'products.category_id')
                            ->where('categories.status', 1);
                    });
            })
            ->orderBy('id', 'ASC');
            $brands = $brands->limit($count_brand_section_in_homepage)->get();
            $brands = $brands->makeHidden(['created_at','updated_at','image','status']);
            $output['brands'] = $brands->toArray();
        }

        if($is_seller_section_in_homepage && $is_seller_section_in_homepage==1){
            $count_seller_section_in_homepage = CommonHelper::getIsSellerSectionInHomepage()['count_seller_section_in_homepage'];
            $sellers = Seller::select('sellers.id', 'sellers.name', 'sellers.store_name', 'sellers.logo', DB::raw("ROUND(6371 * acos(cos(radians(" . $request->latitude . "))
                                * cos(radians(sellers.latitude)) * cos(radians(sellers.longitude) - radians(" . $request->longitude . "))
                                + sin(radians(" .$request->latitude. ")) * sin(radians(sellers.latitude))), 2) AS distance"), 'cities.max_deliverable_distance')
            ->leftJoin("cities", "sellers.city_id", "cities.id")
            ->where('status', Seller::$statusActive)
            ->whereExists(function($query) {
                $query->select(DB::raw(1))
                    ->from('products')
                    ->whereColumn('products.seller_id', 'sellers.id');
            })
            ->whereIn('sellers.id', $seller_ids)
            ->orderBy('distance','asc')
            ->limit($count_seller_section_in_homepage) 
            ->get();

            $sellers = $sellers->makeHidden(['national_identity_card_url','address_proof_url','logo']);
            $output['sellers'] = $sellers->toArray();
        }
        if($is_country_section_in_homepage && $is_country_section_in_homepage==1){
            $count_country_section_in_homepage = CommonHelper::getIsCountrySectionInHomepage()['count_country_section_in_homepage'];
            $countries = Country::orderBy('id', 'ASC')
            ->where('status', 1)
            ->whereExists(function ($query) use ($seller_ids) {
                $query->select(DB::raw(1))
                    ->from('products')
                    ->whereColumn('products.made_in', 'countries.id')
                    ->whereIn('products.seller_id', $seller_ids)  // Check seller_id
                    ->where('products.status', 1)                // Product status = 1
                    ->where('products.is_approved', 1)           // Product is approved
                    ->whereExists(function ($subQuery) { 
                        $subQuery->select(DB::raw(1))
                            ->from('categories')
                            ->whereColumn('categories.id', 'products.category_id')
                            ->where('categories.status', 1);   // Category status = 1
                    });
            });
           
            $countries = $countries->limit($count_country_section_in_homepage)->get();
            $countries = $countries->makeHidden(['created_at','updated_at','status']);
            $output['countries'] = $countries->toArray();
        }
        return CommonHelper::responseWithData($output);
    }
}
