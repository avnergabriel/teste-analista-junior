
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros</h1>
<a href="{{url('/create/cadastro')}}" class="ls-btn-primary">Cadastrar novo</a>
<table class="ls-table">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Titulação</th>
      <th>CPF</th>
      <th>E-mail</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @foreach($dados as $value)
    <tr>
      <td><a href="" title="">{{$value->nome}}</a></td>
      <td>{{$value->titulacao}}</td>
      <td>{{$value->cpf}}</td>
      <td>{{$value->email}}</td>
      <td class="ls-txt-right ls-regroup">
        <div data-ls-module="dropdown" class="ls-dropdown">
          <a href="#" class="ls-btn" role="combobox" aria-expanded="false"></a>
          <ul class="ls-dropdown-nav" aria-hidden="true">
            <li><a href="{{url('/show/cadastro')}}/{{$value->id}}" class="" role="option">Visualizar</a></li>
            <li><a href="{{url('/endereco')}}/{{$value->id}}" role="option">Endereços</a></li>
            <li><a href="{{url('/filme')}}/{{$value->id}}" role="option">Filmes</a></li>
            <li><a href="{{url('/edit/cadastro')}}/{{$value->id}}" class="ls-color-warning" role="option">Editar</a></li>
            <li><a href="{{url('/delete/cadastro')}}/{{$value->id}}" class="ls-color-danger" role="option">Excluir</a></li>
          </ul>
        </div>
      </td>
    </tr>
    @endforeach
  </tbody>

</table>


@endsection
