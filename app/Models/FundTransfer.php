<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundTransfer extends Model
{
    use HasFactory;

    public static $typeDebit = "debit";
    public static $typeCredit  = "credit";

        protected $guarded = [];

}
