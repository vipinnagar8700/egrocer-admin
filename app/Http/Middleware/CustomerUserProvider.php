<?php

namespace App\Http\Middleware;

use App\Helpers\CommonHelper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CustomerUserProvider
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        config(['auth.guards.api.provider' => 'users']);

        $currentRoute = $request->path();
       
        $ignoreRoute = array('customer/paypal_payment_url', 'customer/paypal_redirect/success', 'customer/paypal_redirect/fail', 'customer/paypal_redirect/pending','customer/ipn', 'customer/distance_test');

        if(!in_array($currentRoute,$ignoreRoute)) {
            if ($request->header('x-access-key') != 903361) {
               
            }
        }

        return $next($request);
    }
}
