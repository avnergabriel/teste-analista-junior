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

//Cadastro
Route::get('/cadastro', 'CadastroController@index');
Route::get('/create/cadastro', 'CadastroController@create');
Route::post('/store/cadastro', 'CadastroController@store');
Route::get('/edit/cadastro/{id}', 'CadastroController@edit');
Route::post('/update/cadastro/{id}', 'CadastroController@update');
Route::get('/show/cadastro/{id}', 'CadastroController@show');
Route::get('/delete/cadastro/{id}', 'CadastroController@delete');

//Endereço
Route::get('/endereco/{id}', 'EnderecoController@index');
Route::get('/create/endereco/{id}', 'EnderecoController@create');
Route::post('/store/endereco/{id}', 'EnderecoController@store');
Route::get('/edit/endereco/{id}/{cad_id}', 'EnderecoController@edit');
Route::post('/update/endereco/{id}/{cad_id}', 'EnderecoController@update');
// Route::get('/show/endereco/{id}/{cad_id}', 'EnderecoController@show');
Route::get('/delete/endereco/{id}/{cad_id}', 'EnderecoController@delete');

//Filme
Route::get('/filme/{id}', 'FilmeController@index');
Route::get('/create/filme/{id}', 'FilmeController@create');
Route::post('/store/filme/{id}', 'FilmeController@store');
Route::get('/edit/filme/{id}/{cad_id}', 'FilmeController@edit');
Route::post('/update/filme/{id}/{cad_id}', 'FilmeController@update');
Route::get('/show/filme/{id}/{cad_id}', 'FilmeController@show');
Route::get('/delete/filme/{id}/{cad_id}', 'FilmeController@delete');
