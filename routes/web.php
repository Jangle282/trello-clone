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
    return view('board');
});

Route::post('/cards/order', 'CardController@reorder');

Route::resource('cards', "CardController");

Route::post('/columns/order', 'ColumnController@reorder');

Route::resource('columns', "ColumnController");
