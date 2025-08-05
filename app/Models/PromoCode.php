<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $appends = ['image_url','is_applicable','validity'];
    protected $hidden = [];

    public function getImageUrlAttribute(){

        $image_url = '';
        if($this->image){
            $image_url = asset('storage/'.$this->image);
        }
        return $image_url;
    }

    public function getIsApplicableAttribute()
    {
        $start_date = $this->start_date;
        $end_date = $this->end_date;
        $date = date('Y-m-d h:i:s a');

        $is_applicable = 1;
        if ($date < $start_date) {
            $is_applicable = 0;
        }

        if ($date > $end_date) {
            $is_applicable = 0;
        }

        if ($date = $end_date) {
            $is_applicable = 1;
        }

        return $is_applicable;
    }

    public function getValidityAttribute(){
        return ($this->is_applicable == 1) ? 'Acceptable' : 'Expired' ;
    }



}
