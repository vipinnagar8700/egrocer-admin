<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterApiController extends Controller
{
    public function index()
    {
        $newsletter = Newsletter::orderBy('id','DESC')->get();
        return CommonHelper::responseWithData($newsletter);
    }
}
