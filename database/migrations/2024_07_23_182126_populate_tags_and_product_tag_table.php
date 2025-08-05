    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Schema;

    class PopulateTagsAndProductTagTable extends Migration
    {
        /**
         * Run the migrations.
         *
         * @return void
         */
        public function up()
        {
            // Get all products
            $products = DB::table('products')->select('id', 'tags')->get();

            // Track inserted tags
            $tagIds = [];

            foreach ($products as $product) {
                $productTags = explode(',', $product->tags);

                foreach ($productTags as $tag) {
                    $trimmedTag = trim($tag);

                    // Check if the tag is already in the tags table
                    if (!isset($tagIds[$trimmedTag])) {
                        $tagRecord = DB::table('tags')->where('name', $trimmedTag)->first();

                        // Insert the tag if it doesn't exist
                        if (!$tagRecord) {
                            $tagId = DB::table('tags')->insertGetId([
                                'name' => $trimmedTag,
                                'created_at' => now(),
                                'updated_at' => now()
                            ]);
                        } else {
                            $tagId = $tagRecord->id;
                        }

                        $tagIds[$trimmedTag] = $tagId;
                    }

                    // Check if the product-tag relationship already exists
                $exists = DB::table('product_tag')
                ->where('product_id', $product->id)
                ->where('tag_id', $tagIds[$trimmedTag])
                ->exists();

            if (!$exists) {
                // Insert into the pivot table if it doesn't exist
                DB::table('product_tag')->insert([
                    'product_id' => $product->id,
                    'tag_id' => $tagIds[$trimmedTag],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
                }
            }
        }

        /**
         * Reverse the migrations.
         *
         * @return void
         */
        public function down()
        {
            // Optionally, define logic to reverse the operation
            DB::table('product_tag')->truncate();
            DB::table('tags')->truncate();
        }
    }