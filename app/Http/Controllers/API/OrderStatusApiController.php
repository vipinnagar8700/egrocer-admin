<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\OrderStatusList;
use Illuminate\Http\Request;

class OrderStatusApiController extends Controller
{
    public function getOrderStatus(){
        $statuses = OrderStatusList::orderBy('id','ASC')->get();
        if(!empty($statuses)){
            return CommonHelper::responseWithData($statuses);
        }else{
            return CommonHelper::responseError('Status not found.');
        }
    }
}
