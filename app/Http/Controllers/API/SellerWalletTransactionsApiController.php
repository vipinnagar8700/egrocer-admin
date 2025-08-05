<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\WalletTransaction;
use App\Models\Seller;
use App\Models\SellerWalletTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SellerWalletTransactionsApiController extends Controller
{
    public function getSellerWalletTransactions(Request $request){
        if(isset(auth()->user()->seller->id) && auth()->user()->seller->id != null){
            //for seller app with limit offset
            $limit = ($request->limit)??12;
            $offset = ($request->offset)??0;
            $search = $request->search ?? null;
            $SellerWalletTransaction = SellerWalletTransaction::select('sellers.name', 'seller_wallet_transactions.*','order_items.product_name','order_items.variant_name')
                ->leftJoin('sellers', 'seller_wallet_transactions.seller_id', '=', 'sellers.id')
                ->leftJoin('order_items', 'seller_wallet_transactions.order_item_id', '=', 'order_items.id')
                ->where('sellers.id', auth()->user()->seller->id)
                ->when($search, function ($query, $search) {
                    return $query->where(function($q) use ($search) {
                        $q->where('order_items.product_name', 'like', '%' . $search . '%')
                        ->orWhere('order_items.variant_name', 'like', '%' . $search . '%')
                        ->orWhere('seller_wallet_transactions.type', 'like', '%' . $search . '%')
                        ->orWhere('seller_wallet_transactions.amount', 'like', '%' . $search . '%')
                        ->orWhere('seller_wallet_transactions.message', 'like', '%' . $search . '%')
                        ->orWhere('seller_wallet_transactions.order_id', 'like', '%' . $search . '%')
                        ->orWhere('seller_wallet_transactions.order_item_id', 'like', '%' . $search . '%');
                    });
                })
                ->orderBy('seller_wallet_transactions.id', 'DESC');

               
                $total =  $SellerWalletTransaction->count();
                $SellerWalletTransaction = $SellerWalletTransaction->skip($offset)->limit($limit)->get();
            return CommonHelper::responseWithData($SellerWalletTransaction,$total);
        }else{
            //for admin panel with sellers list
           
            $sellers = Seller::orderBy('id','DESC')->get();
            $SellerWalletTransaction = SellerWalletTransaction::select('sellers.name', 'seller_wallet_transactions.*','order_items.product_name','order_items.variant_name')
                ->leftJoin('sellers', 'seller_wallet_transactions.seller_id', '=', 'sellers.id')
                ->leftJoin('order_items', 'seller_wallet_transactions.order_item_id', '=', 'order_items.id')
                ->orderBy('seller_wallet_transactions.id','DESC')->get();
            $data = array(
                'sellers' => $sellers,
                'walletTransactions' => $SellerWalletTransaction
            );
            return CommonHelper::responseWithData($data);
        }
    }
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'seller' => 'required|json',
            'type' => 'required',
            'amount' => 'required',
        ]);
    
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
    
        $sellerData = json_decode($request->seller);
    
        // Check for JSON decoding errors
        if (json_last_error() !== JSON_ERROR_NONE || $sellerData === null) {
            return CommonHelper::responseError('Please select Seller');
        }
    
        $sellerWalletTransactions = new SellerWalletTransaction();
        $sellerWalletTransactions->seller_id = $sellerData->id;
        $sellerWalletTransactions->type = $request->type;
        $sellerWalletTransactions->amount = $request->amount;
        $sellerWalletTransactions->message = $request->message;
        $sellerWalletTransactions->status = 1;
        $sellerWalletTransactions->save();
        $seller = Seller::find($sellerData->id);
    
        // Check if the seller is found
        if ($seller !== null) {
            $seller->balance = ($request->type == 'debit') ? ($seller->balance - $request->amount) : ($seller->balance + $request->amount);
            $seller->save();
            return CommonHelper::responseSuccess("Seller Wallet Transaction Saved Successfully!");
        } else {
            return CommonHelper::responseError("Seller not found");
        }
    }
}
