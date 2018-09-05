<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use App\Prematricula;

class PrematriculaController extends Controller
{
    public function index(){
      $dados = Prematricula::all();
      return view ('admin.prematricula.index', compact('dados'));
    }

    public function create(){
      return view ('admin.prematricula.create');
    }

    public function store(Request $request){
      $store = new Prematricula;
      $store->fill($request->all());
      // dd($store);
      $store->save();
      return redirect('/prematricula');
    }

    public function show($id){
      $dados = Prematricula::where('id', $id)->first();
      return view ('admin.prematricula.show', compact('dados'));
    }

    public function edit($id){
      $dados = Prematricula::where('id', $id)->first();
      return view ('admin.prematricula.edit', compact('dados'));
    }

    public function update(Request $request, $id){
      $store = Prematricula::where('id', $id)->first();
      $store->fill($request->all());
      $store->save();
      return redirect('/prematricula');
    }

    public function delete($id){
      $delete = Prematricula::where('id', $id)->first();
      return redirect('/prematricula');
    }
}
