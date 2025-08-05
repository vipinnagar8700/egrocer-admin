<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LiveTracking extends Model
{
    use HasFactory; // Define the table name if it's not the default plural form
    protected $table = 'live_tracking';

    // Define the fillable attributes to allow mass assignment
    protected $fillable = [
        'order_id',
        'latitude',
        'longitude',
        'tracked_at',
    ];

    // Specify the type of the columns
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'tracked_at' => 'datetime',
    ];

    /**
     * Define the relationship to the Order model
     * Assuming LiveTracking is related to an Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}