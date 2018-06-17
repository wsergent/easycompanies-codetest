<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function authenticated(\Illuminate\Http\Request $request)
    {
        $user = \Auth::user();
        $user->token_2fa_expiry = \Carbon\Carbon::now();
        $user->token_2fa = str_pad(mt_rand(0, 999999), 6, "0", STR_PAD_LEFT);
        $user->save();
        $request->session()->put('user_id', $user->id);
        
        // Send Code Via Twilio
        $twilio = new \Aloha\Twilio\Twilio(getenv('TWILIO_SID'), getenv('TWILIO_TOKEN'), getenv('TWILIO_FROM'));
        $twilio->message($user->phone, 'Your code to login: ' . $user->token_2fa);

        return $user;
    }

}
