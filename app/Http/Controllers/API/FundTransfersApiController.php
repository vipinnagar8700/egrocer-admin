<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;

use App\Models\DeliveryBoy;
use App\Models\FundTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FundTransfersApiController extends Controller
{
    public function index(){
        $deliveryBoys = DeliveryBoy::orderBy('id','DESC')->get();
        $fundTransfers = FundTransfer::select('delivery_boys.name','delivery_boys.mobile','delivery_boys.address', 'fund_transfers.*')
            ->leftJoin('delivery_boys', 'fund_transfers.delivery_boy_id', '=', 'delivery_boys.id')
            ->orderBy('fund_transfers.id','DESC')->get();
        $data = array(
            'deliveryBoys' => $deliveryBoys,
            'fundTransfers' => $fundTransfers
        );
        return CommonHelper::responseWithData($data);
    }
    public function save(Request $request){
        $validator = Validator::make($request->all(),[
            'deliveryBoy' => 'required',
            'amount' => 'required',

        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        $deliveryBoyData = json_decode($request->deliveryBoy);
        CommonHelper::addFundTransfers($deliveryBoyData->id, $request->amount, FundTransfer::$typeDebit, $request->message);
        return CommonHelper::responseSuccess("Fund Transfer Saved Successfully!");
    }
}
