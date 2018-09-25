
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Filmes / Visualizar</h1>
<div class="ls-list">
  <header class="ls-list-header">
    <div class="ls-list-title col-md-9">
      <a href="#" >{{$dados->titulo}}</a>
      <small>Título do Filme: </small>
    </div>
    <div class="col-md-3 ls-txt-right">
      <a href="{{url('/edit/filme')}}/{{$dados->id}}/{{$cad_id}}" class="ls-btn-warning">Editar</a>
    </div>
  </header>
  <div class="ls-list-content ">
    <div class="col-xs-12 col-md-4">
      <span class="ls-list-label">{{$dados->ano}}</span>
      <strong>Ano de Lançamento:</strong>
    </div>
    <div class="col-xs-12 col-md-4">
      <span class="ls-list-label">{{$dados->diretor}}</span>
      <strong>Diretor:</strong>
    </div>
    <div class="col-xs-12 col-md-4">
      <span class="ls-list-label">{{$dados->nota}}</span>
      <strong>Nota do Filme:</strong>
    </div>
    <div class="col-xs-12 col-md-4">
      <span class="ls-list-label">{{$dados->sinopse}}</span>
      <strong>Sinopse:</strong>
    </div>
  </div>
</div>



@endsection
