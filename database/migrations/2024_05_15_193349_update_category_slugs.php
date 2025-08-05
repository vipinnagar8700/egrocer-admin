<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\Category;

class UpdateCategorySlugs extends Migration
{
    public function up()
    {

        // Update existing category slugs
        $categories = Category::all();

        foreach ($categories as $category) {
            $slug = Str::slug($category->name);
            $uniqueSlug = $this->makeUniqueSlug($slug, $category->id);
            $category->slug = $uniqueSlug;
            $category->save();
        }
    }

    public function down()
    {
       
    }

    private function makeUniqueSlug($slug, $categoryId)
    {
        $newSlug = $slug;
        $count = 1;

        while (Category::where('slug', $newSlug)->where('id', '!=', $categoryId)->exists()) {
            $newSlug = $slug . '-' . $count;
            $count++;
        }

        return $newSlug;
    }
}
