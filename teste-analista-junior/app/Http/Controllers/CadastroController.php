<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cadastro;
use App\Endereco;
use App\Filme;

class CadastroController extends Controller
{
    public function index(){
      $dados = Cadastro::all();
      return view ('admin.cadastro.index', compact('dados'));
    }

    public function create(){
      return view ('admin.cadastro.create');
    }

    public function store(Request $request){
      $store = new Cadastro;
      $store->fill($request->all());
      $store->save();
      return redirect('/cadastro');
    }

    public function edit($id){
      $dados = Cadastro::where('id', $id)->first();
      return view ('admin.cadastro.edit', compact('dados'));
    }

    public function update(Request $request, $id){
      $update = Cadastro::where('id', $id)->first();
      $update->fill($request->all());
      $update->save();
      return redirect('/cadastro');
    }

    public function show($id){
      $dados = Cadastro::where('id', $id)->first();
      $enderecos = Endereco::where('cadastros_id', $id)->get();
      $filmes = Filme::where('cadastros_id', $id)->get();
      return view ('admin.cadastro.show', compact('dados','enderecos','filmes'));
    }

    public function delete($id){
      $delete = Cadastro::where('id', $id)->first();
      $delete->delete();
      return redirect('/cadastro');
    }
}
