<!--<h1 style="line-height: 24px; margin-bottom:15px; font-size: 20px;">Forgot Password </h1>-->
<h1 style="line-height: 24px; margin-bottom:15px; font-size: 20px;">{{ ucwords(str_replace('_', ' ', $type)) }} </h1>

Hello,<br><br>

You are receiving this email because we received a password reset request for your account.<br>

<br>
<a href="{{ url('/reset-password?token='.$token) }}">Reset Password</a>

<br><br>
If you didn’t make this request, then you can ignore this email.
