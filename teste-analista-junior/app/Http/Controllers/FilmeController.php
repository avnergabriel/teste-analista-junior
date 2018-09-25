<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Filme;

class FilmeController extends Controller
{
    public function index($id){
      $dados = Filme::all();
      return view ('admin.filme.index', compact('dados','id'));
    }

    public function create($id){
      return view ('admin.filme.create', compact('id'));
    }

    public function store(Request $request, $id){
      $store = new Filme;
      $store->fill($request->all());
      $store->cadastros_id = $id;
      $store->save();
      return redirect("/filme/$id");
    }

    public function edit($id, $cad_id){
      $dados = Filme::where('id', $id)->first();
      return view ('admin.filme.edit', compact('dados','cad_id'));
    }

    public function update(Request $request, $id, $cad_id){
      $update = Filme::where('id', $id)->first();
      $update->fill($request->all());
      $update->save();
      return redirect ("/filme/$cad_id");
    }

    public function show($id, $cad_id){
      $dados = Filme::where('id', $id)->first();
      return view ('admin.filme.show', compact('dados','cad_id'));
    }

    public function delete($id, $cad_id){
      $delete = Filme::where('id', $id)->first();
      $delete->delete();
      return redirect("/filme/$id");
    }
}
