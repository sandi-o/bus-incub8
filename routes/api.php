<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
    });
});

Route::get('/buses','BusController@index');
Route::post('/buses', 'BusController@store');
Route::post('/buses/{bus}/stop', 'BusController@apply');
Route::post('/buses/{bus}/stops', 'BusController@applyToAll');
Route::patch('/buses/{bus}', 'BusController@update');

Route::get('/stops','StopController@index');
Route::post('/stops', 'StopController@store');
Route::patch('/stops/{stop}', 'StopController@update');
Route::delete('/stops/{stop}', 'StopController@destroy');