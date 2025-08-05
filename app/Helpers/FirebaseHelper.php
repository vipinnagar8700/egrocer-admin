<?php

namespace App\Helpers;

use App\Models\Setting;
use App\Models\UserToken;
use Illuminate\Support\Facades\Log;
use Google\Client;
use Exception;

class FirebaseHelper
{
    public static function send($platform, $registration_ids, $fcm_msg, $notification)
    {
        // Correct comparison operator
        if ($platform == "android" || $platform == "web") {
            $fields = [
                "message" => [
                    "token" => $registration_ids,
                    "data" => $fcm_msg
                ]
            ];
        } elseif ($platform == "ios") {
            $fields = [
                "message" => [
                    "token" => $registration_ids,
                    "data" => $fcm_msg,
                    "notification" => [
                        "title" => $fcm_msg["title"] ?? '',
                        "body" => $fcm_msg["body"] ?? '',
                    ],
                    "apns" => [
                        "payload" => [
                            "aps" => [
                                "sound" => isset($fcm_msg["type"]) && ($fcm_msg["type"] == "new_order" || $fcm_msg["type"] == "assign_order")
                                    ? "order_sound.aiff"
                                    : "default"
                            ]
                        ]
                    ]
                ]
            ];
        } else {
            Log::error("Invalid platform specified for Firebase push notification.");
            return false;
        }

        return self::sendPushNotification($fields);
    }

    public static function sendPushNotification($fields)
    {
        $data1 = json_encode($fields);

        $access_token = self::getAccessToken();
        $projectID = optional(Setting::where('variable', 'projectId')->first())->value;

        if (!$projectID) {
            Log::error("Firebase project ID not found in settings.");
            return false;
        }

        $url = 'https://fcm.googleapis.com/v1/projects/' . $projectID . '/messages:send';

        $headers = [
            'Authorization: Bearer ' . $access_token,
            'Content-Type: application/json',
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data1);

        // Execute post
        $result = curl_exec($ch);
        
        if ($result === false) {
            Log::error('FCM request failed: ' . curl_error($ch));
            curl_close($ch);
            return false;
        }

        curl_close($ch);

        Log::info('Firebase Push Notification Sent', ['response' => $result]);

          $response = json_decode($result, true);
          if (isset($response['error']) && isset($response['error']['code'])) {
            $errorCode = $response['error']['code'];
    
            if ($response['error']['code'] == 404 || $response['error']['code'] == 400 ) {
    
                // Delete the expired token from the database
                $token = $fields['message']['token'];
                UserToken::where('fcm_token', $token)->delete();
    
                Log::warning("Deleted expired FCM token: " . $fields['message']['token']);
            }
        }
    
        Log::info('Firebase Push Notification Sent', ['response' => $response]);
    
        return $response;
    }

    private static function getAccessToken()
    {
        $filePath = base_path('config/firebase.json');

        if (!file_exists($filePath)) {
            throw new Exception('Service account file not found');
        }

        $client = new Client();
        $client->setAuthConfig($filePath);
        $client->setScopes(['https://www.googleapis.com/auth/firebase.messaging']);

        $accessToken = $client->fetchAccessTokenWithAssertion();

        return $accessToken['access_token'] ?? null;
    }

   
}
