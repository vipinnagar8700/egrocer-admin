<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Seller;
use App\Models\SeoSetting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;


class SeoSettingsApiController extends Controller
{
    /*public function index(Request $request){}*/

    public function getSeoSettings(Request $request){
        $limit = $request->input('limit'); // Default items per page
        $offset = (($request->input('offset'))-1)*$limit; // Default page
        $filter = $request->input('filter', ''); // Filter query
    
       
            $seoSettingsQuery = SeoSetting::orderBy('id', 'DESC');
        
        
        if ($filter) {
            $seoSettingsQuery = $seoSettingsQuery->where(function($query) use ($filter) {
                $query->where('page_name', 'like', "%{$filter}%")
                      ->orWhere('page_type', 'like', "%{$filter}%")
                      ->orWhere('meta_title', 'like', "%{$filter}%")
                      ->orWhere('meta_keyword', 'like', "%{$filter}%")
                      ->orWhere('meta_description', 'like', "%{$filter}%");
            });
        }
        $total = $seoSettingsQuery->count();
        if (isset($limit) && !is_null($limit)) {
            $seoSettings = $seoSettingsQuery->orderBy('id', 'desc')->skip($offset)->take($limit)->get();
        } else {
            $seoSettings = $seoSettingsQuery->orderBy('id', 'desc')->get();
        }
    
        if($seoSettings->isEmpty()){
            return CommonHelper::responseError('page not found.');
        }
    
        return CommonHelper::responseWithData($seoSettings, $total);
    }

   
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'page_type' => 'required|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_keyword' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        try {
            $seo = new SeoSetting($request->only([
                'page_type', 'meta_title', 'meta_keyword', 'schema_markup', 'meta_description'
            ]));
             $image = '';
            if($request->hasFile('image')){
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('seo_settings', $file, $fileName);
            }
            $seo->og_image = $image;

            $seo->save();

            return CommonHelper::responseSuccess("SEO setting saved successfully.");
        } catch (QueryException $e) {
            // Duplicate entry error code is 1062 for MySQL
            if ($e->getCode() == 23000) {
                return CommonHelper::responseError("This page type already exists.", 409);
            }

            // Optional: return generic error for other DB exceptions
            return CommonHelper::responseError("Something went wrong while saving.", 500);
        }
    }
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:web_seo_pages,id',
            'page_type' => 'required|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_keyword' => 'nullable|string',
            'schema_markup' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);

        $seo = SeoSetting::find($request->id);
        $seo->fill($request->only([
            'page_type', 'meta_title', 'meta_keyword', 'schema_markup', 'meta_description'
        ]));
        if($request->hasFile('og_image')){
                //@Storage::disk('public')->delete($seo->image);
                $file = $request->file('og_image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('seo_settings', $file, $fileName);
                $seo->og_image = $image;
            }

        $seo->save();
        return CommonHelper::responseSuccess("SEO setting updated successfully.");

    }
    public function delete(Request $request){
        if(isset($request->id)){
            $SeoSetting = SeoSetting::find($request->id);
            if($SeoSetting){
               //@Storage::disk('public')->delete($SeoSetting->image);
                $SeoSetting->delete();
                return CommonHelper::responseSuccess("SeoSetting Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("SeoSetting Already Deleted!");
            }
        }
    }


    public function getOptions(Request  $request){
        echo"<option value='0' selected >Select Category</option>";
        $options = CommonHelper::categoryTree(0,'',null,array(), false,array(),$request->exclude_id,0);
    }

    public function updateCategoriesOrder(Request $request){
        $categories = $request->all();
        foreach ($categories as $key => $category){
            $data = Category::find($category["id"]);
            $data->row_order = $category["row_order"];
            $data->save();
        }
        return CommonHelper::responseSuccess("Category Order Updated Successfully!");
    }
    public function countProductCategoryWise(){
        $categories = Category::select('id','name',DB::raw('(SELECT count(id) from `products` WHERE products.category_id = categories.id) AS product_count'))
            ->orderBy('id','ASC')->get();
        return CommonHelper::responseWithData($categories);
    }

    public function getSellerCategories(Request $request){

        CommonHelper::categoryTree(0,'',null,array(), true,array(),'', $request->seller_id);
    }
    public function checkSlug(Request $request, $slug)
    {
        try {
            // Query the database to count the documents that match the slug pattern
            $existingDocumentCount = Category::where('slug', 'like', $slug . '%')->count();

            // Construct the response data
            $responseData = [
                'unique' => $existingDocumentCount === 0,
                'count' => $existingDocumentCount
            ];

            return response()->json($responseData);
        } catch (\Exception $e) {
            \Log::error('Error checking slug uniqueness: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while checking slug uniqueness'], 500);
        }
    }

}
