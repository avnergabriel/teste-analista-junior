
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Visualizar</h1>




<div class="ls-collapse-group">
  <div data-ls-module="collapse" data-target="#accordeon0" class="ls-collapse ">
    <a href="#" class="ls-collapse-header">
      <h3 class="ls-collapse-title">Dados do Usuário</h3>
    </a>
    <div class="ls-collapse-body" id="accordeon0">
      <div class="ls-list">
        <header class="ls-list-header">
          <div class="ls-list-title col-md-9">
            <a href="#" >{{$dados->nome}} {{$dados->sobrenome}}</a>
            <small>{{$dados->email}}</small>
          </div>
        </header>
        <div class="ls-list-content">
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">Titulação:</span>
            <strong>{{$dados->titulacao}}</strong>
          </div>
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">CPF</span>
            <strong>{{$dados->cpf}}</strong>
          </div>
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">RG:</span>
            <strong>{{$dados->rg}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-ls-module="collapse" data-target="#accordeon1" class="ls-collapse ">
    <a href="#" class="ls-collapse-header">
      <h3 class="ls-collapse-title">Endereços do Usuários</h3>
    </a>
    <div class="ls-collapse-body" id="accordeon1">
      @foreach($enderecos as $endereco)
      <div class="ls-list">
        <header class="ls-list-header">
          <div class="ls-list-title col-md-9">
            <a href="#" >{{$endereco->endereco}}</a>
          </div>
        </header>
        <div class="ls-list-content">
          <div class="col-xs-12 col-md-3">
            <span class="ls-list-label">Principal:</span>
            @if($endereco->principal === 0)
            <strong>Não</strong>
            @else
            <strong>Sim</strong>
            @endif
          </div>
        </div>
      </div>
      @endforeach
    </div>
  </div>
  <div data-ls-module="collapse" data-target="#accordeon2" class="ls-collapse ">
    <a href="#" class="ls-collapse-header">
      <h3 class="ls-collapse-title">Filmes Assistidos</h3>
    </a>
    <div class="ls-collapse-body" id="accordeon2">
      @foreach($filmes as $filme)
      <div class="ls-list">
        <header class="ls-list-header">
          <div class="ls-list-title col-md-9">
            <a href="#" >{{$filme->titulo}}</a>
          </div>
        </header>
        <div class="ls-list-content">
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">Ano de Lançamento:</span>
            <strong>{{$filme->ano}}</strong>
          </div>
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">Diretor:</span>
            <strong>{{$filme->diretor}}</strong>
          </div>
          <div class="col-xs-12 col-md-4">
            <span class="ls-list-label">Nota do Filme:</span>
            <strong>{{$filme->ano}}</strong>
          </div>
          <div class="col-xs-12 col-md-12">
            <span class="ls-list-label">Sinopse do Filme:</span>
            <strong>{{$filme->sinopse}}</strong>
          </div>
        </div>
      </div>
      @endforeach
    </div>
  </div>
</div>

@endsection
