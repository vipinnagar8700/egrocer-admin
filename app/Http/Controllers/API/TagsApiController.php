<?php
namespace App\Http\Controllers\API;
use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;

class TagsApiController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('search');
        $tags = Tag::where('name', 'like', "%{$query}%")->select('id', 'name')->get();
        $total = $tags->count();
        return CommonHelper::responseWithData($tags,$total);
    }
}