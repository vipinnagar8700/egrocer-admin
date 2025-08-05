<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;

class ProductsImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Product([
            'name' => $row[0], // product name
            'category_id' => $row[1], // category id
            'indicator' => $row[3], // indicator
            'manufacturer' => $row[4], // manufacturer
            'made_in' => $row[5], // made in
            'return_status' => $row[6], // return status
            'cancelable_status' => $row[7], // cancel status
            'till_status' => $row[8], // till status
            'description' => $row[9], // description
            'image' => $row[10], // image
            'seller_id' => $row[11], // seller_id
            'is_approved' => $row[12], // is_approved
            'standard_shipping' => $row[13], // deliverable_type
            'pincodes' => $row[14], // pincodes
            'return_days' => $row[15], // return_days
            'tax_id' => $row[16], // tax_id
        ]);
    }
}
