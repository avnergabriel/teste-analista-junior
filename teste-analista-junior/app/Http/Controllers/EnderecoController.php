<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Endereco;

class EnderecoController extends Controller
{
    public function index($id){
      $dados = Endereco::orderBy('id','desc')->get();
      return view ('admin.endereco.index', compact('dados','id'));
    }

    public function create($id){
      return view ('admin.endereco.create', compact('id'));
    }

    public function store(Request $request, $id){
      $store = new Endereco;
      $store->fill($request->all());
      $store->cadastros_id = $id;
      if ($store->principal === "1") {
        $verifica = Endereco::where('principal', 1)->first();
        if(isset($verifica)){
          $verifica->principal = 0;
          $verifica->save();
        }
      }
      $store->save();
      return redirect ("/endereco/$id");
    }

    public function edit($id, $cad_id){
      $dados = Endereco::where('id', $id)->first();
      return view ('admin.endereco.edit', compact('dados','cad_id'));
    }

    public function update(Request $request, $id, $cad_id){
      $update = Endereco::where('id', $id)->first();
      $update->fill($request->all());
      if ($update->principal === "1") {
        $verifica = Endereco::where('principal', 1)->first();
        if(isset($verifica)){
          $verifica->principal = 0;
          $verifica->save();
        }
      }
      $update->save();
      return redirect ("/endereco/$cad_id");
    }

    public function show($id, $cad_id){
      $dados = Endereco::where('id', $id)->first();
      return view ('admin.endereco.show', compact('dados','cad_id'));
    }

    public function delete($id, $cad_id){
      $delete = Endereco::where('id', $id)->first();
      $delete->delete();
      return redirect("/endereco/$cad_id");
    }
}
