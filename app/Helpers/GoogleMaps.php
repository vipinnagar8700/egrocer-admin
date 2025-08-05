<?php
namespace App\Helpers;

use App\Models\Setting;

class GoogleMaps
{
    var $secret_key = "";
    var $url = "";

    function __construct()
    {
        $this->secret_key = Setting::get_value('apiKey');
        $this->url = "https://maps.googleapis.com/maps/api/";
    }

    public function getCredentials()
    {
        $data['secret_key'] = $this->secret_key;
        $data['url'] = $this->url;
        return $data;
    }

    public function searchPlaces($input = "", $types = "textquery")
    {
        $input = trim($input);
        $final_url = $this->url . 'place/findplacefromtext/json?input=' . $input . '&inputtype=' . $types . '&fields=formatted_address%2Cname%2Copening_hours%2Cgeometry&key=' . $this->secret_key;
        $result = self::curl($final_url,"GET");
        return $result;
    }

    public function findGoogleMapDistance($origins = "", $destinations = "")
    {
        $origins = trim($origins);
        $destinations = trim($destinations);
        $final_url = $this->url . 'distancematrix/json?origins=' . $origins . '&destinations=' . $destinations . '&key=' . $this->secret_key;
        $result = self::curl($final_url,"GET");
        return $result;
    }

    public function curl($url, $method = 'GET', $data = [])
    {
        $ch = curl_init();
        $curl_options = array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded',
                'Authorization: Basic ' . base64_encode($this->secret_key . ':')
            )
        );
        if (strtolower($method) == 'post') {
            $curl_options[CURLOPT_POST] = 1;
            $curl_options[CURLOPT_POSTFIELDS] = http_build_query($data);
        } else {
            $curl_options[CURLOPT_CUSTOMREQUEST] = 'GET';
        }
        curl_setopt_array($ch, $curl_options);
        $result = array(
            'body' => curl_exec($ch),
            'http_code' => curl_getinfo($ch, CURLINFO_HTTP_CODE),
        );
        return $result;
    }

}
?>
