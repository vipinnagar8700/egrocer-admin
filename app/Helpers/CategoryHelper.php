<?php

namespace App\Helpers;

use App\Enums\BranchType;
use App\Enums\ProductStatus;
use App\Models\BranchProductDetail;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryHelper
{

    public static function array_flatten($array)
    {
        if (!is_array($array)) {
            return false;
        }
        $result = array();
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $result = array_merge($result, self::array_flatten($value));
            } else {
                $result[$key] = $value;
            }
        }
        return $result;
    }

    public static function getChildCat($allChilds)
    {
        $temp = array();
        if (count($allChilds) > 0) {

            foreach ($allChilds as $child) {
                $cat_childs = $child->allChilds->pluck('id')->toArray();
                array_push($temp, $cat_childs);

                foreach ($child->allChilds as $c) {

                    if (isset($c) and count($c->allChilds) > 0) {
                        array_push($temp, $c->allChilds->pluck('id')->toArray());
                        $cat_childs3 = self::getChildCat($c->allChilds);
                        array_push($temp, $cat_childs3);
                    }
                }
            }
        }
        return $temp;
    }

    public static function getActiveChildCat($allActiveChilds)
    {
        $temp = array();
        if (count($allActiveChilds) > 0) {

            foreach ($allActiveChilds as $child) {
                $cat_childs = $child->allActiveChilds->pluck('id')->toArray();
                array_push($temp, $cat_childs);

                foreach ($child->allActiveChilds as $c) {

                    if (isset($c) and count($c->allActiveChilds) > 0) {
                        array_push($temp, $c->allActiveChilds->pluck('id')->toArray());
                        $cat_childs3 = self::getActiveChildCat($c->allActiveChilds);
                        array_push($temp, $cat_childs3);
                    }
                }
            }
        }
        return $temp;
    }


    public static function getAllChildCatID($category_id = 0)
    {
        $categories = Category::with('allChilds')->where('id', $category_id)->get();

        $catList = array();
        array_push($catList, $category_id);
        foreach ($categories as $cat) {

            if (isset($cat->allChilds) and count($cat->allChilds) > 0) {
                $cat_childs = $cat->allChilds->pluck('id')->toArray();
                array_push($catList, $cat_childs);
                if (isset($cat->allChilds) and count($cat->allChilds) > 0) {

                    $cat_childs = self::getChildCat($cat->allChilds);
                    array_push($catList, $cat_childs);
                }
            }
        }
        $catArray = self::array_flatten($catList);
        return $catArray;
    }

    public static function getAllActiveChildCatID($category_id = 0)
    {

        $categories = Category::with('allActiveChilds')
            ->where('id', $category_id)
            ->where('status',1)
            ->get();

        $catList = array();
        array_push($catList, $category_id);
        foreach ($categories as $cat) {
            if (isset($cat->allActiveChilds) and count($cat->allActiveChilds) > 0) {
                $cat_childs = $cat->allActiveChilds->pluck('id')->toArray();
                array_push($catList, $cat_childs);
                if (isset($cat->allActiveChilds) and count($cat->allActiveChilds) > 0) {

                    $cat_childs = self::getActiveChildCat($cat->allActiveChilds);
                    array_push($catList, $cat_childs);
                }
            }
        }
        $catArray = self::array_flatten($catList);
        return $catArray;
    }


    public static function getParentCat($category_id,$parent_category_limit = 0)
    {
        $category_ids = array();
        $category = Category::where('id',$category_id)->value('parent_id');
        array_push($category_ids,$category_id);
        if(isset($category) && $category != $parent_category_limit){
            $category = self::getParentCat($category,$parent_category_limit);
            array_push($category_ids,$category);
        }
        $catArray = self::array_flatten($category_ids);
        return $catArray;
    }


    public static function getParentCatID($category_id)
    {
        $category_id = self::getParentCat($category_id);
        return $category_id;
    }

    public static function getProductAvailableCount($cat_id)
    {
        $catArray = CategoryHelper::getAllActiveChildCatID($cat_id);

        $productArray = Product::whereIn('category_id', $catArray)
                ->where('status', 1)
                ->count();
        return $productArray;
    }


}
