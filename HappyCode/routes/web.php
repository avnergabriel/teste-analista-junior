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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


//Prematricula
Route::get('/prematricula', 'PrematriculaController@index');
Route::get('/create/prematricula', 'PrematriculaController@create');
Route::post('/store/prematricula', 'PrematriculaController@store');
Route::get('/edit/prematricula/{id}', 'PrematriculaController@edit');
Route::post('/update/prematricula/{id}', 'PrematriculaController@update');
Route::get('/delete/prematricula/{id}', 'PrematriculaController@delete');
Route::get('/show/prematricula/{id}', 'PrematriculaController@show');
