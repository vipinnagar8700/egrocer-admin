<?php
namespace App\Helpers;

use Twilio\Rest\Client;
use App\Models\Setting;
use Exception;
use Response;
use App\Helpers\CommonHelper;
use Illuminate\Http\Exceptions\HttpResponseException;

class TwilioHelper
{
    protected static $client;
    protected static $from;

    public static function initialize()
    {
        $twilioSid = Setting::where('variable', 'twilio_sid')->value('value');
        $twilioAuthToken = Setting::where('variable', 'twilio_auth_token')->value('value');
        $twilioPhoneNumber = Setting::where('variable', 'twilio_phone_number')->value('value');

        // Check if any of the settings are missing or empty
        if ( $twilioSid == 'null') {

            static::throwJsonException('Twilio SID not found or is empty.');
        }

        if (empty($twilioAuthToken)) {
            static::throwJsonException('Twilio Auth Token not found or is empty.');
        }

        if (empty($twilioPhoneNumber)) {
            static::throwJsonException('Twilio Phone Number not found or is empty.');
        }

        static::$client = new Client($twilioSid, $twilioAuthToken);
        static::$from = $twilioPhoneNumber;
    }

    protected static function throwJsonException($message)
    {
        throw new HttpResponseException(response()->json([
            'status' => 0,
            'message' => $message,
        ], 200)); 
    }

    public static function sendSms($to, $message)
    {
        try {
            
            static::initialize();
             static::$client->messages->create($to, [
                'from' => static::$from,
                'body' => $message,
            ]);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

}