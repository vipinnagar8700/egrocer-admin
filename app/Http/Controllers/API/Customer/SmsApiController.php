<?php

// namespace App\Http\Controllers\Api\Customer;
namespace App\Http\Controllers\API\Customer;


use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\SmsVerification;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Helpers\TwilioHelper;
use App\Helpers\CommonHelper;
use Illuminate\Support\Facades\Validator;


class SmsApiController extends Controller
    {
     
    public function store(Request $request)
    {
        $otp = rand(100000, 999999); //generate random code
        $request->validate([
            'phone' => 'required|string',
        ]);
        $appName = Setting::where('variable', 'app_name')->value('value');

        $phone = $request->input('phone');
        $message = "$otp is your verification code from $appName";
        $success = TwilioHelper::sendSms($phone, $message);
       
        if($success == true){
            // Set OTP expiration time, for example, 10 minutes
            $expiresAt = Carbon::now()->addMinutes(10);

            // Store the OTP in the database
           SmsVerification::insert([
                'phone' => $phone,
                'otp' => $otp,
                'status' => 'pending',
                'expires_at' => $expiresAt,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
            return CommonHelper::responseSuccess("OTP sent Successfully!");
        }
        return CommonHelper::responseError("Sms Gateway error!");
    
    }
    public function verifyContact(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'phone' => 'required|numeric',
            'otp' => 'required|string',
            'country_code' => 'required|string',
        ]);
        
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
    
        $phone = $request->input('country_code').$request->input('phone');
        $otp = $request->input('otp');
    
        // Retrieve the OTP record
        $otpRecord = SmsVerification::where('phone', $phone)
                ->latest('created_at') // Fetch the latest record based on created_at
                ->first();
    
        if ($otpRecord && $otpRecord->otp == $otp && $otpRecord->status == 'pending' && $otpRecord->expires_at > Carbon::now()) {
            $otpRecord->status = 'verified';
            $otpRecord->save();
            // Retrieve the user from the users table where mobile = phone and type = phone
            $phone =$request->input('phone');
            $user = User::where('mobile', $phone)->where('type', 'phone')->first();
            if ($user) {
                $accessToken = $user->createToken('authToken')->accessToken;
                $res = ['user' => $user, 'access_token' => $accessToken];
                return CommonHelper::responseSuccessWithData("OTP is valid! User found.", $res);
            } else {
                return CommonHelper::responseSuccess("otp_valid_but_user_not_found");
            }
        } else {
            return CommonHelper::responseError("OTP is invalid or has expired.");
        }
    }
   
}
