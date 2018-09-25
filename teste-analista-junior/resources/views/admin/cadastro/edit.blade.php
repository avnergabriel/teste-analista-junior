
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Editar</h1>
<form action="{{url('/update/cadastro')}}/{{$dados->id}}" method="POST" class="ls-form ls-form-horizontal row">
  {{ csrf_field() }}
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Nome</b>
      <input type="text" name="nome" placeholder="Primeiro nome" class="ls-field" value="{{$dados->nome}}" required>
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Sobrenome</b>
      <input type="text" name="sobrenome" placeholder="Sobrenome" class="ls-field" value="{{$dados->sobrenome}}" required>
    </label>  <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Titulação</b>
      <input type="text" name="titulacao" placeholder="Titulação" class="ls-field" value="{{$dados->titulacao}}" required>
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">CPF</b>
      <input type="text" name="cpf" placeholder="CPF" class="ls-field" value="{{$dados->cpf}}" required>
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">RG</b>
      <input type="text" name="rg" placeholder="RG" class="ls-field" value="{{$dados->rg}}" required>
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Email</b>
      <input type="email" name="email" placeholder="Email" class="ls-field" value="{{$dados->email}}" required>
    </label>
  </fieldset>
  <div class="ls-actions-btn">
    <button class="ls-btn">Salvar</button>
    <!-- <button class="ls-btn-danger">Cancelar</button> -->
  </div>
</form>


@endsection
