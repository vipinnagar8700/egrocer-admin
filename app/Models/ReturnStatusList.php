<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReturnStatusList extends Model
{
    use HasFactory;

    public $timestamps = false;

    public static $rPending = 1;
    public static $rApproved = 2;
    public static $rRejected = 3;

    public static $requestPending = "Request Pending";
    public static $requestApproved = "Request Approved";
    public static $requestRejected = "Request Rejected";
}
