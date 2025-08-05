<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionsApiController extends Controller
{
    public function index(){
        $transactions = Transaction::select('users.name', 'transactions.*')
            ->leftJoin('users', 'transactions.user_id', '=', 'users.id')
            ->orderBy('transactions.id','DESC')->get();
        return CommonHelper::responseWithData($transactions);
    }
}
