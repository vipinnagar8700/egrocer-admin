<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FirebaseApiController extends Controller
{
    public function index()
    {
        $firebase = CommonHelper::getFirebaseKeys();
        return CommonHelper::responseWithData($firebase);
    }

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'apiKey' => 'required',
            'authDomain' => 'required',
            'projectId' => 'required',
            'storageBucket' => 'required',
            'messagingSenderId' => 'required',
            'appId' => 'required',
            'measurementId' => 'required',
            'jsonFile' => $request->hasFile('jsonFile')?'mimes:json':'',
        ]);
        if ($validator->fails()) {

            return CommonHelper::responseError($validator->errors()->first());
        }

        if($request->hasFile('jsonFile'))
        {
            $file = $request->file('jsonFile');
            if( $file == false ) {
                return CommonHelper::responseError("Error in opening file");
            }
            $fileName = $file->getRealPath();
            $data = file_get_contents($fileName);
            $value = json_decode($data, true);
            $jsonFileValue = json_encode($value);
            file_put_contents(base_path('config/firebase.json'), $jsonFileValue);
        }

        foreach ($request->all() as $key => $value){
            $value = $value ?? " ";
            $setting = Setting::where('variable', $key)->first();
            if ($setting) {
                $setting->variable = $key;
                $setting->value = ($key=='jsonFile' && isset($jsonFileValue)) ? $jsonFileValue : $value;
                $setting->save();
            } else {
                $setting = new Setting();
                $setting->variable = $key;
                $setting->value = ($key=='jsonFile' && isset($jsonFileValue)) ? $jsonFileValue : $value;
                $setting->save();
            }
        }
        return CommonHelper::responseSuccess("Firebase Settings Saved Successfully!");
    }

    public function firebaseMessagingJsCode(){

        $apiKey = \App\Models\Setting::get_value('apiKey') ?? "";
        $projectId = \App\Models\Setting::get_value('projectId') ?? "";
        $messagingSenderId = \App\Models\Setting::get_value('messagingSenderId') ?? "";
        $appId = \App\Models\Setting::get_value('appId') ?? "";

        $jsCode = 'importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
             importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");
                firebase.initializeApp({
                    apiKey: '.$apiKey.',
                    projectId: '.$projectId.',
                    messagingSenderId: '.$messagingSenderId.',
                    appId: '.$appId.',
                });
            const messaging = firebase.messaging();
            messaging.setBackgroundMessageHandler(function (payload) {
                const notification = payload.data;
                const title = notification.title;
                const options = {
                    body: notification.body,
                    icon: notification.icon,
                };
                return self.registration.showNotification(title, options);
                //return self.registration.showNotification(title,{body,icon});
            });';
        echo $jsCode;
    }
}
