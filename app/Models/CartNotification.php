<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cart_id',
        'title',
        'message',
        'sent_at',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Define the relationship with the Cart model
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
