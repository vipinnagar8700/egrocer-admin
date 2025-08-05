<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportedLanguage extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name','code','type'];

    public function getTypeAttribute($value)
    {
        return strtoupper($value);
    }
}
