<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    use HasFactory;
    // Specify the table if it's different from the default plural form
    protected $table = 'web_seo_pages';

    // Specify the fields that are mass assignable
     protected $fillable = [
        'page_type', 'meta_title', 'meta_keyword', 'schema_markup', 'meta_description'
    ];
     protected $appends = ['og_image_url']; 

    public function getOgImageUrlAttribute(){

        if($this->og_image){
            $og_image_url = asset('storage/'.$this->og_image);
            return $og_image_url;
        }
        return $this->og_image;
    }

}
