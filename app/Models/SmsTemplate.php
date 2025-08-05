<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsTemplate extends Model
{
    use HasFactory;
    // Specify the table if it's different from the default plural form
    protected $table = 'sms_templates';

    // Specify the fields that are mass assignable
    protected $fillable = [
        'title',
        'message',
        'type',
    ];
}
