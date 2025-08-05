<?php

// namespace App\Http\Controllers\Api\Customer;
namespace App\Http\Controllers\API\Customer;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Cart;
use App\Models\Setting;
use App\Models\UserToken;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Kreait\Firebase\Factory;
use Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmail;
use Carbon\Carbon;
use Illuminate\Support\Str;


class CustomerAuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type'    => 'required|in:phone,google,apple,email',
            'id'      => 'required', // mobile for phone, email for google/apple/email
            'phone_auth_type' => 'required_if:type,phone|in:phone_auth_otp,phone_auth_password',
            'password' => [
                'required_if:type,email',
            
            ],
        ], [
            'password.min' => 'invalid_password',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if($request->type == 'phone'){
            $user = User::where('mobile', $request->id)
                ->where('type', $request->type)
                ->where('status', 0)
                ->first();
                if ($user) {
                    return CommonHelper::responseSuccess('user_deactivated');
                }
            $user = User::where('mobile', $request->id)
                        ->where('type', $request->type)
                        ->first();

            if (!$user) {
                return CommonHelper::responseError('user_not_exist');
            }
            

            if($request->phone_auth_type == 'phone_auth_password'){
                if (empty($user->password)) {
                    return CommonHelper::responseError('user_exist_password_blank');
                }
            }
            Auth::login($user);
            if (
                ($request->type == 'email' || ($request->type == 'phone' && $request->phone_auth_type == 'phone_auth_password'))
            ) {
                if (empty($user->password) || !password_verify($request->password, $user->password)) {
                    return CommonHelper::responseError(__('invalid_password'));
                }
            }
            $accessToken = $user->createToken('authToken')->accessToken;
            $user->referral_code = $user->referral_code ?? "";
            $user->status = intval($user->status) ?? 0;
            $res = ['user' => $user, 'access_token' => $accessToken];
             // **Update or create FCM token**
            if (isset($request->fcm_token)) {
                $token = UserToken::where("fcm_token", $request->fcm_token)->first();
                if ($token) {
                    $token->user_id = auth()->user()->id;
                    $token->platform = $request->platform;
                    $token->fcm_token = $request->fcm_token;
                    $token->save();
                } elseif (UserToken::where('user_id', auth()->user()->id)->where('platform', $request->platform)->exists()) {
                    $existingToken = UserToken::where('user_id', auth()->user()->id)->where('platform', $request->platform)->first();
                    $existingToken->fcm_token = $request->fcm_token;
                    $existingToken->save();
                } else {
                    UserToken::firstOrCreate([
                        'user_id' => auth()->user()->id,
                        'type'    => 'customer',
                        'fcm_token' => $request->fcm_token,
                        'platform'  => $request->platform
                    ]);
                }
            }
            
            return CommonHelper::responseSuccessWithData('user_already_exist', $res);
        }

        if ($request->type === 'email') {
            $user =  User::where('email', $request->id)
                ->where('type', $request->type)
                ->where('status', 0)
                ->first();
                if ($user) {
                    return CommonHelper::responseSuccess('user_deactivated');
                }
            $user = User::where('email', $request->id)
                ->where('is_verified', 0)
                ->where('type', $request->type)
                ->first();

            if ($user) {
                $verificationCode = rand(100000, 999999);
                $user->email_verification_code = $verificationCode;
                $user->is_verified = false; // Initially not verified

                try {
                    $data = ['type' => 'verify_email', 'code' => $verificationCode];
                    $subject = 'Mail from ' . env('APP_NAME');

                    commonHelper::sendMail($user->email, $subject, $data);
                    Log::info('Verification email sent to ' . $user->email);

                    $user->save();
                } catch (\Exception $e) {
                    Log::error('Failed to send verification email: ' . $e->getMessage());
                    return CommonHelper::responseError('Failed to send verification email.');
                }

                return CommonHelper::responseError('email_not_verified');
            }
        }

        if (in_array($request->type, ['google', 'apple'])) {

            $user =  User::where('email', $request->id)
            ->where('type', $request->type)
            ->where('status', 0)
            ->first();
            if ($user) {
                return CommonHelper::responseSuccess('user_deactivated');
            }
            $user = User::where('email', $request->id)->first();

            if ($user) {
                if (strtolower($user->type) !== strtolower($request->type)) {
                    Auth::login($user);
                    return CommonHelper::responseError('user_exist_with_' . $user->type);
                }
            }
        }

        if ($request->type === 'phone') {
            $user = User::select('id', 'name', 'email', 'country_code', 'mobile', 'profile', 'balance', 'referral_code', 'status', 'type', 'password')
                ->where('type', $request->type)
                ->where('mobile', $request->id)
                ->first();
        } elseif (in_array($request->type, ['google', 'apple'])) {
            $user = User::select('id', 'name', 'email', 'country_code', 'mobile', 'profile', 'balance', 'referral_code', 'status', 'type')
                ->where('type', $request->type)
                ->where('email', $request->id)
                ->first();
        } elseif ($request->type === 'email') {
            $user = User::select('id', 'name', 'email', 'password', 'country_code', 'mobile', 'profile', 'balance', 'referral_code', 'status', 'type')
                ->where('type', $request->type)
                ->where('email', $request->id)
                ->where('is_verified', 1)
                ->first();
        }

        if ($user) {
            // **For email login and phone login with password**
            if (
                ($request->type == 'email' || ($request->type == 'phone' && $request->phone_auth_type == 'phone_auth_password'))
            ) {
                if (empty($user->password) || !password_verify($request->password, $user->password)) {
                    return CommonHelper::responseError(__('invalid_password'));
                }
            }

            // **Check if the user is inactive**
            if ($user->status == User::$deactive) {
                return CommonHelper::responseError(__('this_customer_account_is_deactivated_kindly_contact_admin'));
            }

            // **Login user and create access token**
            Auth::login($user);
            $accessToken = $user->createToken('authToken')->accessToken;
            $user->referral_code = $user->referral_code ?? "";
            $user->status = intval($user->status) ?? 0;
            $res = ['user' => $user, 'access_token' => $accessToken];

            // **Update or create FCM token**
            if (isset($request->fcm_token)) {
                $token = UserToken::where("fcm_token", $request->fcm_token)->first();
                if ($token) {
                    $token->user_id = auth()->user()->id;
                    $token->platform = $request->platform;
                    $token->fcm_token = $request->fcm_token;
                    $token->save();
                } elseif (UserToken::where('user_id', auth()->user()->id)->where('platform', $request->platform)->exists()) {
                    $existingToken = UserToken::where('user_id', auth()->user()->id)->where('platform', $request->platform)->first();
                    $existingToken->fcm_token = $request->fcm_token;
                    $existingToken->save();
                } else {
                    UserToken::firstOrCreate([
                        'user_id' => auth()->user()->id,
                        'type'    => 'customer',
                        'fcm_token' => $request->fcm_token,
                        'platform'  => $request->platform
                    ]);
                }
            }

            return CommonHelper::responseWithData($res);
        } else {
            return CommonHelper::responseError(__('user_does_not_exist'));
        }
}


    public function register(Request $request)
    {
        $requestData = $request->all();

        $validator = Validator::make($requestData, [
            'type'            => 'required|in:phone,apple,google,email',
            'mobile'          => 'required_if:type,phone|numeric',
            'email'           => 'required_if:type,apple,google,email|email',
            'phone_auth_type' => 'nullable|in:phone_auth_otp,phone_auth_password',
            'password'        => [
                'nullable',
                'min:6',
                function ($attribute, $value, $fail) use ($request) {
                    if (
                        ($request->type == 'phone' && $request->phone_auth_type == 'phone_auth_password') ||
                        $request->type == 'email'
                    ) {
                        if (empty($value)) {
                            $fail('The password field is required.');
                        }
                    }
                }
            ],
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        try {
            if($request->type == 'phone'){
                $user = User::where('mobile', $request->mobile)
                            ->where('type', $request->type)
                            ->first();
    
                // if (!$user) {
                //     return CommonHelper::responseError('user_not_exist');
                // }
                // if($request->phone_auth_type == 'phone_auth_password'){
                //     if (empty($user->password)) {
                //         return CommonHelper::responseError('user_exist_password_blank');
                //     }
                // }
                // Auth::login($user);
                // if (
                //     ($request->type == 'email' || ($request->type == 'phone' && $request->phone_auth_type == 'phone_auth_password'))
                // ) {
                //     if (empty($user->password) || !password_verify($request->password, $user->password)) {
                //         return CommonHelper::responseError(__('invalid_password'));
                //     }
                // }
                // $accessToken = $user->createToken('authToken')->accessToken;
                // $user->referral_code = $user->referral_code ?? "";
                // $user->status = intval($user->status) ?? 0;
                // $res = ['user' => $user, 'access_token' => $accessToken];
                if($user){
                return CommonHelper::responseError('user_already_exist');
                }
            }
            if (in_array($request->type, ['email'])) {
                $user = User::where('email', $request->email)
                    ->where('is_verified', 0)
                    ->where('type', $request->type)
                    ->first();

                if ($user) {
                    return CommonHelper::responseError('email_not_verified');
                }
            }

            if (in_array($request->type, ['google', 'apple', 'email'])) {
                $user = User::where('email', $request->email)->first();

                if ($user) {
                    return CommonHelper::responseError('user_exist_with_' . $user->type);
                }
            }

            if ($request->type == 'phone') {
                $user = User::where('type', $request->type)
                    ->where('mobile', $request->mobile)
                    ->where('is_verified', 1)
                    ->first();
            } elseif (in_array($request->type, ['google', 'apple', 'email'])) {
                $user = User::where('type', $request->type)
                    ->where('email', $request->email)
                    ->first();
            }

            if ($user) {
                if ($user->status == User::$deactive) {
                    return CommonHelper::responseError(__('this_customer_account_is_deactivated_kindly_contact_admin'));
                }
            } else {
                // Create a new user
                $referral_code = strtoupper(substr(sha1(microtime()), 0, 6));

                $user = new User();
                $user->name = $request->get('name', '');
                $user->email = $request->get('email', '');
                $user->profile = $request->get('profile', '');
                $user->referral_code = $referral_code;
                $user->status = 1;
                $user->country_code = $request->get('country_code', '');
                $user->mobile = $request->get('mobile', '');
                $user->password = $request->password ? bcrypt($request->password) : null;
                $user->type = $request->type;

                // Email Verification Process
                if ($request->type == 'email') {
                    $verificationCode = rand(100000, 999999);
                    $user->email_verification_code = $verificationCode;
                    $user->is_verified = false;

                    try {
                        $data = [
                            'type' => 'verify_email',
                            'code' => $verificationCode,
                        ];
                        $subject = 'Mail from ' . env('APP_NAME');
                        CommonHelper::sendMail($user->email, $subject, $data);
                        Log::info('Verification email sent to ' . $user->email);

                        $user->save();
                        return CommonHelper::responseSuccess('verification_mail_sent_successfully');
                    } catch (\Exception $e) {
                        Log::error('Failed to send verification email: ' . $e->getMessage());
                        return CommonHelper::responseError('Failed to send verification email.');
                    }
                }

                // Handle Stripe customer creation
                $stripeSettings = CommonHelper::getSettings(['stripe_payment_method']);
                $stripePaymentMethod = $stripeSettings['stripe_payment_method'] ?? null;

                if ($stripePaymentMethod == 1) {
                    try {
                        $user->createOrGetStripeCustomer();
                    } catch (\Exception $e) {
                        Log::error('Stripe Error: ' . $e->getMessage());
                    }
                } else {
                    Log::warning('Stripe Payment Method setting not found or disabled.');
                }

                $user->save();
            }

            // Authenticate user
            Auth::login($user);
            $accessToken = $user->createToken('authToken')->accessToken;
            $res = ['user' => $user, 'access_token' => $accessToken];

            // Save FCM token if provided
           if ($request->has('fcm_token') && filled($request->fcm_token)) {
                UserToken::updateOrCreate(
                    ['fcm_token' => $request->fcm_token],
                    [
                        'user_id' => auth()->user()->id,
                        'platform' => $request->platform ?? 'unknown',
                        'type' => 'customer',
                    ]
                );
            }

            return CommonHelper::responseWithData($res);
        } catch (\Exception $e) {
            Log::error('Register : ' . $e->getMessage());
            return CommonHelper::responseError($e->getMessage());
        }
    }


    public function logout (Request $request)
    {
        if(isset($request->fcm_token)){
            $userToken = UserToken::where('type','customer')
                ->where('user_id',$request->user()->id)
                ->where('fcm_token',$request->fcm_token)->first();
            if($userToken){
                $userToken->delete();
            }
        }

        $token = $request->user()->token();
        $token->revoke();

        return CommonHelper::responseSuccess(__('you_have_been_successfully_logged_out'));
    }

    public function notLogin(){
        return CommonHelper::responseError(__('unauthorized'));
    }

    public function deleteAccount(Request $request){       
        try{
            $user_id = auth()->user()->id;
            $user = User::where('id', $user_id)->first();

            if($user->mobile == '9876543210'){
               return CommonHelper::responseError("This function is not available in demo mode!");
            }

            $user->delete();
            return CommonHelper::responseSuccess("Your account deleted successfully!");
        }catch ( \Exception $e){
            Log::error('Login : '.$e->getMessage());
            return CommonHelper::responseError($e->getMessage());
        }
    }

    public function editProfile(Request $request){

        $user = auth()->user();
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$user->id.',id,deleted_at,NULL',
        ],[
            'email.unique' => 'The :attribute has already been taken.',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if(isset($request->mobile) && $user->type != 'phone') {
            $user->mobile = $request->mobile;
        }

        if($request->hasFile('profile')){
            $file = $request->file('profile');

            $fileName = time().'_'.$user->id.'.'.$file->getClientOriginalExtension();

            $image = Storage::disk('public')->putFileAs('customers', $file, $fileName);
            $user->profile = $image;
        }

        if($user->status == 2){
            if(isset($request->referral_code)) {
                $validCode = User::where('status', 1)
                    ->where('referral_code', $request->referral_code)->first();
                if ($validCode) {
                    $user->friends_code = $request->referral_code;
                }
            }
            $user->status = 1;
            CommonHelper::setDefaultMailSetting($user->id, 0);
        }

        $user->save();

        return  CommonHelper::responseSuccess(__('profile_updated_successfully'));
    }

    public function ResetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ], [
            'new_password.confirmed' => __('The new password confirmation does not match.')
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = auth()->user();

        // Verify that the old password matches the current password in the database
        if (!Hash::check($request->old_password, $user->password)) {
            return CommonHelper::responseError(__('The old password is incorrect.'));
        }

        // Update password to new password
        $user->password = bcrypt($request->new_password);
        $user->save();

        return CommonHelper::responseSuccess(__('password_updated_successfully'));
    }

    public function uploadProfile(Request $request){

        $validator = Validator::make($request->all(),[
            'profile' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = auth()->user();
        if($request->hasFile('profile')){
            $file = $request->file('profile');
            $image = Storage::disk('public')
                ->putFileAs('customers', $file, $user->id.".jpg");
            $user->profile = $image;
            $user->save();
        }
        return  CommonHelper::responseSuccess(__('profile_updated_successfully'));
    }

    public function addFcmToken(Request $request)
{
    $validator = Validator::make($request->all(), [
        'fcm_token' => 'required|string',
        'platform' => 'required|string|in:android,ios,web', // Adjust platform types as per your app
    ]);

    if ($validator->fails()) {
        return CommonHelper::responseError($validator->errors()->first());
    }

    $user = $request->user('api-customers');
    $user_id = $user ? $user->id : 0;

    $token = UserToken::where('fcm_token', $request->fcm_token)->first();

    if ($token) {
        if ($token->user_id == 0 && $user_id != 0) {
            // Link anonymous token to logged-in user
            $token->user_id = $user_id;
            $token->platform = $request->platform;
            $token->save();
            return CommonHelper::responseSuccess(__('token_updated_successfully'));
        }

        // Token already exists and is correctly linked
        return CommonHelper::responseSuccess(__('token_already_exists'));
    }

    // Create new token
    UserToken::create([
        'user_id' => $user_id,
        'type' => 'customer',
        'fcm_token' => $request->fcm_token,
        'platform' => $request->platform,
    ]);

    return CommonHelper::responseSuccess(__('token_added_successfully'));
}

    public function updateFcmToken(Request $request){
        $validator = Validator::make($request->all(),[
            'fcm_token' => 'required',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : '';

        $token = UserToken::where("fcm_token", $request->fcm_token)->first();

        if(isset($user_id) && $user_id != "" && !empty($token) && ($token->user_id == 0 || $token->user_id == "")){
            $token->user_id = $user_id;
            $token->platform = $request->platform;
            $token->save();
            return CommonHelper::responseSuccess(__('token_updated_successfully'));
        }else{
            UserToken::firstOrCreate([
                'user_id' => 0,
                'type' => 'customer',
                'fcm_token' => $request->fcm_token,
                'platform' => $request->platform
            ]);
            return CommonHelper::responseSuccess(__('token_added_successfully'));
        }
    }

    public function getLoginUserDetails(Request $request){
        $user_id = $request->user('api-customers') ? $request->user('api-customers')->id : '';
        $total = Cart::select(DB::raw('COUNT(carts.id) AS total'))->Join('products', 'carts.product_id', '=', 'products.id')->where('carts.save_for_later','=',0)->where('user_id','=',$user_id)->first();
        $total = $total->makeHidden(['image_url']);
        $user = User::select('id','name','email','country_code','mobile','profile','balance','referral_code','status')->where('id', $user_id)->first();
        if(!empty($user)){
            return Response::json(array('status' => 1, 'message' => 'success','total'=> 1, 'cart_items_count' => $total->total, 'user' => $user));
        }else{
            return CommonHelper::responseError(__('unauthorized'));
        }
    }

    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'code' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_verification_code != $request->code) {
            return CommonHelper::responseError(__('Invalid verification code'));
        }

        // Mark the user as verified
        $user->is_verified = true;
        $user->email_verification_code = null; // Clear the verification code
        $user->save();
 
            $accessToken = $user->createToken('authToken')->accessToken;
            
            $res = ['user' => $user, 'access_token' => $accessToken];
        return CommonHelper::responseWithData($res);
    }
    public function forgetPasswordOtp(Request $request){

        $requestData = $request->all();
        $validator = Validator::make($requestData,[
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

       
            $user = User::where('type', 'email')
                ->where('email', $request->email)
                ->where('is_verified', 1)
                ->first();
        

            if($user){
                $verificationCode = rand(100000, 999999);
                
                $user->email_verification_code = $verificationCode;

                // Send forgot password code to email
                try {
                    $data = [];
                    $data['type']='verify_email';
                    $data['code']=$verificationCode;
                    $subject = 'Mail from '.env('APP_NAME');
                // Mail::to($user->email)->send(new VerifyEmail($verificationCode));
                    commonHelper::sendMail($user->email, $subject ,$data);
                    // Email sent successfully, you can log this or proceed as needed
                    Log::info('Verification email sent to ' . $user->email);
                    // Save the user record
                    $user->save();
                    return CommonHelper::responseSuccess('verification_mail_sent_successfully');
                } catch (\Exception $e) {
                    // Handle any errors that occur during sending
                    Log::error('Failed to send verification email: ' . $e->getMessage());
                    return CommonHelper::responseError('Failed to send verification email.');
                }
            }else{
                return CommonHelper::responseError('email_is_not_registered');
            }
       
       
    }

    public function forgotPassword(Request $request)
{
    $requestData = $request->all();

    // Validation rules
    $validator = Validator::make($requestData, [
        'type'    => 'required|in:phone,google,apple,email',
        'email'   => 'required_if:type,email|email',
        'mobile'  => 'required_if:type,phone|numeric',
        'otp_verify_method' => 'required_if:type,phone|in:twilio,firebase',
        'otp'               => 'required_if:otp_verify_method,twilio|integer',
        'password' => 'required|string|min:6|confirmed',
        'password_confirmation' => 'required'
    ]);

    if ($validator->fails()) {
        return CommonHelper::responseError($validator->errors()->first());
    }

    if ($request->type === 'email') {
        // Check OTP in users table for email
        $user = User::where('email', $request->email)
                    ->where('email_verification_code', $request->otp)
                    ->first();
    
        if (!$user) {
            return CommonHelper::responseError('Invalid or expired OTP');
        }
    } elseif ($request->type === 'phone') {
        if ($request->otp_verify_method === 'twilio') {
            // Check OTP in sms_verifications table for phone
            $smsVerification = DB::table('sms_verifications')
                                 ->where('phone', $request->mobile)
                                 ->where('otp', $request->otp)
                                 ->first();
    
            if (!$smsVerification) {
                return CommonHelper::responseError('Invalid or expired OTP');
            }
        }
        
        // If otp_verify_method is 'firebase', skip OTP check
        // Find the user based on mobile after OTP verification (or directly for Firebase)
        $user = User::where('mobile', $request->mobile)->first();
    
        if (!$user) {
            return CommonHelper::responseError('User not found');
        }
    }
    
    if (!$user) {
        return CommonHelper::responseError('Invalid request');
    }
    
    // Reset password
    $user->password = Hash::make($request->password);
    $user->email_verification_code = null; // Clear OTP for email
    $user->save();
    
    return CommonHelper::responseSuccess(__('password_updated_successfully'));
    
}
    public function verifyUserExist(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mobile' => 'required|string',
            'country_code' => 'required|string',
            'type'    => 'required|in:phone,google,apple,email',
        ]);

        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        $user = User::where('mobile', $request->mobile)
                    ->where('country_code', $request->country_code)
                    ->where('type', $request->type)
                    ->first();

        if (!$user) {
            return CommonHelper::responseError('user_not_exist');
        }

        // if (empty($user->password)) {
        //     return CommonHelper::responseSuccessWithData('user_exist_password_blank', $user);
        // }

        return CommonHelper::responseSuccess('user_already_exist');
    }
}
