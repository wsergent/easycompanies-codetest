<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//2FA
Route::post('api/2fa', 'Auth\TwoFactorController@verifyTwoFactor');

//Everything else through React:
Route::get('{slug}', function() {
    return view('index');
})
->where('slug', '(?!api)([A-z\d-\/_.]+)?');
 
Auth::routes();
