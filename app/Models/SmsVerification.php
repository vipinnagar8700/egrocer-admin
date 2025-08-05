<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_number','code','status' 
    ];
    public function store($request)
        {
        $this->fill($request->all());
        $sms = $this->save();
        return response()->json($sms, 200);
        }
        public function updateModel($request)
        {
        $this->update($request->all());
        return $this;
        }
}
