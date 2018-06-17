<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class TwoFactorController extends Controller {

    public function verifyTwoFactor(\Illuminate\Http\Request $request) {
        $request->validate([
            'twofa' => 'required',
            'user_id' => 'required',
        ]);

        \Auth::loginUsingId($request->input('user_id'));

        if ($request->input('twofa') == \Auth::user()->token_2fa) {
            $user = \Auth::user();
            $user->token_2fa_expiry = \Carbon\Carbon::now()->addMinutes(config('session.lifetime'));
            $dt = new \DateTime;
            $user->last_login = $dt->format('Y-m-d H:i:s');
            $user->save();
            return $user;
        } else {
            throw new \Illuminate\Auth\Access\AuthorizationException;
        }
    }

}
