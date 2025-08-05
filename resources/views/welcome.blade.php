@php
use Illuminate\Support\Facades\Crypt;

    $logo="";
    $app_name="";
    $support_email="";
    $support_number="";
    $google_place_api_key = "";
    $currency = "";
    $purchase_code = "";
    $logo_full_path = "";
    $delivery_boy_bonus_settings = 0;
    $isDemoMode = 0;

    $website_url = "";
    $copyright_details = "";



    // Firebase keys
    $apiKey = "";
    $authDomain = "";
    $projectId = "";
    $storageBucket = "";
    $messagingSenderId = "";
    $appId = "";
    $measurementId = "";


    if(isInstalled()){
        $app_name = \App\Models\Setting::get_value('app_name');
        if($app_name == "" || $app_name == null){
            $app_name = "eGrocer";
        }
        $support_email = \App\Models\Setting::get_value('support_email');
        if($support_email == "" || $support_email == null){
            $support_email = "";
        }
        $support_number = \App\Models\Setting::get_value('support_number');
        if($support_number == "" || $support_number == null){
            $support_number = "";
        }

        $logo = \App\Models\Setting::get_value('logo') ?? "";
        if($logo!==""){
            $logo_full_path =  url('/').'/storage/'.$logo;
        }else{
            $logo_full_path =  asset('images/favicon.png');
        }

        $panel_login_background_img = \App\Models\Setting::get_value('panel_login_background_img') ?? "";
        $panel_login_background_img_full_path = '';
        if($panel_login_background_img!==""){
            $panel_login_background_img_full_path =  url('/').'/storage/'.$panel_login_background_img;
        }else{
            $panel_login_background_img_full_path =  asset('images/panel_login_background_img.jpg');
        }

        $google_place_api_key = \App\Models\Setting::get_value('google_place_api_key') ?? "";
        //$google_place_api_key = Crypt::encryptString($google_place_api_key);
        $currency = \App\Models\Setting::get_value('currency') ?? "$";
        $purchase_code = \App\Models\Setting::get_value('purchase_code') ?? "";
        $purchase_code = Crypt::encryptString($purchase_code);

        $website_url = \App\Models\Setting::get_value('website_url') ?? "";
        $copyright_details = \App\Models\Setting::get_value('copyright_details') ?? "";

        $delivery_boy_bonus_settings = \App\Models\Setting::get_value('delivery_boy_bonus_settings') ?? 0;

        // Firebase keys
        $apiKey = \App\Models\Setting::get_value('apiKey') ?? "";
        $authDomain = \App\Models\Setting::get_value('authDomain') ?? "";
        $projectId = \App\Models\Setting::get_value('projectId') ?? "";
        $storageBucket = \App\Models\Setting::get_value('storageBucket') ?? "";
        $messagingSenderId = \App\Models\Setting::get_value('messagingSenderId') ?? "";
        $appId = \App\Models\Setting::get_value('appId') ?? "";
        $measurementId = \App\Models\Setting::get_value('measurementId') ?? "";
        $isDemoMode = isDemoMode() ?? 0;
    }
@endphp

<!DOCTYPE html>
<html  class="{{ app()->isLocale('ar') ? 'rtl' : '' }}"> 
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>{{ $app_name??'eGrocer' }}</title>
    <link rel="shortcut icon" href="{{ $logo_full_path }}">

<!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.css')}}">
    <link rel="stylesheet" href="{{ asset('assets/js/tinymce/content.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/js/tinymce/skin.min.css') }}">


    <link rel="stylesheet" href="{{ asset('assets/vendors/iconly/bold.css') }}">
{{--        <link rel="stylesheet" href="{{ asset('assets/vendors/fontawesome/all.min.css') }}">--}}
    <link rel="stylesheet" href="{{ asset('assets/vendors/perfect-scrollbar/perfect-scrollbar.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendors/bootstrap-icons/bootstrap-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/boostrap_vue.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/form-element-select.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <!-- Auth -->
    <link rel="stylesheet" href="{{ asset('assets/css/pages/auth.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/pages/error.css') }}">
    <!-- Styles -->

    <link rel="stylesheet" href="{{ asset('assets/css/custom/common.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/dark-mode/app-dark.css') }}">
  
    @if (isDemoMode())
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CZZ7MV8RBB"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-CZZ7MV8RBB');
        </script>
    @endif

</head>
<body >
{{-- <script src="{{ asset('assets/dark-mode/initTheme.js') }}"></script> --}}
<div id="app">
    <router-view></router-view>
</div>

<!--You can comment this or remove these 3 lines so popup update will stop-->
@if(auth()->user() && auth()->user()->role_id==1)
    @include('vendor.laraupdater.notification')
@endif

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="{{ asset('assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js') }}"></script>
<script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}"></script>
<script src="{{ asset('assets/js/mazer.js') }}"></script>
<script src="{{ asset('assets/js/extensions/form-element-select.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/tinymce.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/theme.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/model.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/icons.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/anchor/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/autolink/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/charmap/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/codesample/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/emoticons/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/image/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/link/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/lists/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/media/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/searchreplace/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/table/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/visualblocks/plugin.min.js') }}"></script>
<script src="{{ asset('assets/js/tinymce/wordcount/plugin.min.js') }}"></script>

<script>
    window.baseUrl = '{{ url('/') }}';
    window.appName = "{{ $app_name }}";
    window.supportEmail = "{{ $support_email }}";
    window.supportNumber = "{{ $support_number }}";
    window.MapApiKey = "{{ $google_place_api_key }}";
    window.appLogo = "{{ $logo }}";
    window.panelLoginBackgroundImg = "{{ $panel_login_background_img_full_path ?? '' }}";
    window.currency = "{{ $currency }}";
    window.isInstalled = "{{ isInstalled() }}";
    window.purchase_code = "{{ $purchase_code }}";

    window.websiteUrl = "{{ $website_url }}";
    window.copyrightDetails = "{!! $copyright_details !!}";


    window.deliveryBoyBonusSettings = "{{ $delivery_boy_bonus_settings }}";
    window.isDemo = "{{ $isDemoMode }}";
    window.currentVersion = "{{ currentVersion() }}";

    @auth
    /* Login*/
    window.UserPermissions = {!! json_encode(Auth::user()->allPermissions, true) !!};
    window.Role = "{!! Auth::user()->role->name !!}";
    @else
    /* Not Login*/
    window.UserPermissions = [];
    window.Role = '';
    @endauth
</script>
<script src="{{ asset('js/app.js') }}"></script>
{{--<script src="{{ mix('js/app.js') }}" ></script>
<script src="{{ route('assets.lang')  }}"></script>
--}}

{{--<script src="{{ route('assets.lang')  }}"></script>--}}


@if(isInstalled())
{{--<script src="{{ route('assets.firebase-messaging-sw')  }}"></script>--}}
@endif
<!--Web Push-->
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.2/firebase.js"></script>

@php
    // Get the currently selected language from session or default config
   
    $lang = session('app_locale') ?? 'en';
if(isInstalled()){
    if(!$lang){
        $default = \DB::table('languages')->where('is_default', 1)->where('system_type', 4)->value('json_data');
        if (!$default) {
            $lang = session('app_locale', config('app.locale', 'en'));
       
    } else {
        // Get supported language details from DB
        $supported_language_id = \DB::table('languages')
            ->where('is_default',1)
            ->where('system_type', 4)
            ->value('supported_language_id');

        $code = \DB::table('supported_languages')->where('id', $supported_language_id)->value('code');
        $lang =$code;
    }
	}
    }
  
    session(['app_locale' => $lang]);
    $file = file_get_contents(resource_path('lang/' . $lang . '.json'));
@endphp

<script>

     let lang = JSON.stringify(<?php  echo $file; ?>);
     localStorage.setItem('language', lang);


    @if($apiKey!='' && $authDomain!='' && $authDomain!='' && $projectId!='' && $storageBucket!='' && $messagingSenderId!='' && $appId!='' && $measurementId!='')

        var firebaseConfig = {
            apiKey: "{{ $apiKey }}",
            authDomain: "{{ $authDomain }}",
            projectId: "{{ $projectId }}",
            storageBucket: "{{ $storageBucket }}",
            messagingSenderId: "{{ $messagingSenderId }}",
            appId: "{{ $appId }}",
            measurementId: "{{ $measurementId }}"
        };

        var firebaseCheck =  firebase.initializeApp(firebaseConfig);

        if ('Notification' in window) {

            if (firebase.messaging.isSupported()) {
                const messaging = firebase.messaging();
                startFCM();

                function startFCM() {
                    messaging
                        .requestPermission()
                        .then(function () {
                            return messaging.getToken()
                        })
                        .then(function (response) {
                            $.ajaxSetup({
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                }
                            });
                            $.ajax({
                                url: '{{ route("fcmToken") }}',
                                type: 'POST',
                                data: {
                                    token: response
                                },
                                dataType: 'JSON',
                                success: function (response) {
                                    
                                },
                                error: function (error) {
                                    
                                },
                            });
                        }).catch(function (error) {
                      
                    });
                }

                messaging.onMessage(function (payload) {
                    console.log(payload);
                    if(payload.data.type == 'new_order'){
                        var url = "{{ asset('assets/order_sound.wav') }}";
                        var audio = new Audio(url);
                        audio.play();
                        toastr.options = {
                            "onclick": function() { window.open(payload.data.click_action, '_blank');  },
                            "showDuration": "60000",
                            "hideDuration": "20000",
                            "timeOut": "60000",
                            "extendedTimeOut": "10000",
                            "closeButton": true,
                        };
                        toastr.info(payload.data.message,payload.data.title);
                    }

                    const notification = payload.data;
                    console.log(notification);
                    //prevent notification on other tabs
                    if (document.hidden) {
                        return false;
                    }

                    const title = notification.title;
                    const options = {
                        body: notification.body,
                        icon: notification.icon,
                       
                    };
                    
                    new Notification(title, options);
                });
            }
        }

    @endif
</script>

</body>
</html>
