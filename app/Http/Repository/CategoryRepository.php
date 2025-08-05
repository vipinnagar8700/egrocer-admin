<?php

namespace App\Http\Repository;


use App\Helpers\CategoryHelper;
use App\Models\Category;
use App\Models\Product;

class CategoryRepository
{
    public function getCategoryTreeForParentId($parent_id, $level)
    {
        $level++;
        $categories = array();

        $result = Category::where('parent_id', $parent_id)
            ->where('status',1)
            ->orderBy('row_order')
            ->get();

        foreach ($result as $mainCategory) {


            $count = CategoryHelper::getProductAvailableCount($mainCategory->id);

            if ($count == 0) {
                //continue;
            }

            $category = array();
            $category['id'] = $mainCategory->id;
            $category['name'] = $mainCategory->name;
            $category['subtitle'] = $mainCategory->subtitle;
            $category['image_url'] = $mainCategory->image_url;
            $category['parent_id'] = $mainCategory->parent_id;
            $category['level'] = $level;
            $category['all_childs'] = $this->getCategoryTreeForParentId($category['id'], $level);

            array_push($categories, $category);
        }

        return $categories;
    }

}
