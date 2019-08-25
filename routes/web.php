<?php

use App\Http\Controllers\CardController;

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

Route::get('/', function () {
    return view('welcome');
});

Route::post('/cards/{id}', 'CardController@destroy');

Route::resource('cards', "CardController");

Route::post('/slists/{id}', 'SlistController@destroy');

Route::resource('slists', "SlistController");
