<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Twilio;

class TwoFactorVerify {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user = Auth::user();
        if ($user->token_2fa_expiry > \Carbon\Carbon::now()) {
            return $next($request);
        }

        $user->token_2fa = str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_LEFT);
        $user->save();

        // Send Code Via Twilio
        Twilio::message($user->phone, 'Two Factor Code: ' . $user->token_2fa);

        return redirect('/2fa');
    }

}
