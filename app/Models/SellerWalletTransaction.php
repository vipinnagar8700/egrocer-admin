<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class SellerWalletTransaction extends Model
{
    use HasFactory;

    public static $rules = [
        'order_item_id' => 'unique:seller_wallet_transactions',
        
    ];
}
