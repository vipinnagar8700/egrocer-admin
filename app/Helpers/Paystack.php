<?php
namespace App\Helpers;

use App\Models\Setting;
use Illuminate\Support\Facades\Log;

class Paystack
{
	private $secret_key,$public_key,$curl;
	public $temp = array();
    private $url;

    function __construct()
    {
        $this->secret_key = Setting::get_value("paystack_secret_key")??'';
		$this->public_key = Setting::get_value("paystack_public_key")??'';
        $this->url = "https://api.paystack.co/";

        Log::info("URL : ".$this->url);
    }
    public function get_credentials(){
        $this->temp['secret_key'] = $this->secret_key;
        $this->temp['public_key'] = $this->public_key;
        return $this->temp;
    }
	public function get_banks($slug=''){
		$end_point = $this->url."bank/".$slug;
		$method = "Get";
		$banks = $this->curl_request($end_point,$method);
		return $banks;
	}

	public function create_transfer_receipt($data){
		$end_point = $this->url."transferrecipient";
		$method = "post";

		/* // sample data array
		$data = array('type' => 'nuban',
			'name' => 'Zombie',
			'description' => 'Zombier',
			'account_number' => '0100000010',
			'bank_code' => '044',
			'currency' => 'NGN'
		); */

		$transfer = $this->curl_request($end_point,$method,$data);
		return $transfer;
	}

	public function transfer($data){
		$end_point = $this->url."transfer";
		$method = "post";

		/* // sample data array
		$data = array(
			'source' => 'balance',
			'amount' => '1000',
			'currency' => 'NGN',
			'recipient' => 'RCP_3y2cnqfj9tvg861',
			'reason' => 'Refer.ng Fund Transfer'
		);
		 */
		$transfer = $this->curl_request($end_point,$method,$data);
		return $transfer;
	}

	public function finalize_transfer($data){
		$end_point = $this->url."transfer/finalize_transfer";
		$method = "post";
		/*  // Sample data array
        $data = array( 'transfer_code'=>'TRF_14eqck4p0346omf', 'otp' => '123456' ); */
		$transfer = $this->curl_request($end_point,$method,$data);
		return $transfer;
	}

	public function list_transfers($transfer_code = ''){
		$end_point = $this->url."transfer";
		$end_point .= (!empty($transfer_code))?"/".$transfer_code:"";
		$method = "get";
		$transfer = $this->curl_request($end_point,$method);
		return $transfer;
	}

	public function disable_otp(){
		$end_point = $this->url."transfer/disable_otp";
		$method = "post";

		$transfer = $this->curl_request($end_point,$method);
		return $transfer;
	}

	public function disable_otp_finalize($data){
		$end_point = $this->url."transfer/disable_otp_finalize";
		$method = "post";
		/*  // sample data array
        $data = array('otp'=>'123456'); */
		$transfer = $this->curl_request($end_point,$method,$data);
		return $transfer;
	}

	public function verify_transfer($reference = ''){
		$end_point = $this->url."transfer/verify";
		$end_point .= (!empty($reference))?"/".$reference:"";
		$method = "get";
		$transfer = $this->curl_request($end_point,$method);
		return $transfer;
	}
	public function resolve_bank($data){
		$end_point = $this->url."bank/resolve";
		$end_point .=(!empty($data))?"?account_number=".$data['account_number']."&bank_code=".$data['bank_code']:"";
		$method = "get";
		$bank_details = $this->curl_request($end_point,$method);
        return $bank_details;
	}

    public function verify_transaction($reference = ''){
		$end_point = $this->url."transaction/verify";
		$end_point .= (!empty($reference))?"/".$reference:"";
		$method = "get";
		$transfer = $this->curl_request($end_point,$method);
		return $transfer;
	}
	public function curl_request($end_point,$method,$data = array()){
		$this->curl = curl_init();

		curl_setopt_array($this->curl, array(
			CURLOPT_URL => $end_point,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_CUSTOMREQUEST => strtoupper($method),
			CURLOPT_POSTFIELDS => $data,   /* array('test_key' => 'test_value_1') */
			CURLOPT_HTTPHEADER => array(
				"Authorization: Bearer ".$this->secret_key
			),
		));

		$response = curl_exec($this->curl);

		curl_close($this->curl);
		return $response;
	}
}
?>
