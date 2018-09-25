
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Filmes</h1>
<a href="{{url('/create/filme')}}/{{$id}}" class="ls-btn-primary">Cadastrar novo</a>
<table class="ls-table">
  <thead>
    <tr>
      <th>Título</th>
      <th>Ano de Lançamento</th>
      <th>Diretor</th>
      <th>Nota</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @foreach($dados as $value)
    <tr>
      <td><a href="" title="">{{$value->titulo}}</a></td>
      <td>{{$value->ano}}</td>
      <td>{{$value->diretor}}</td>
      <td>{{$value->nota}}</td>
      <td class="ls-txt-right ls-regroup">
        <div data-ls-module="dropdown" class="ls-dropdown">
          <a href="#" class="ls-btn" role="combobox" aria-expanded="false"></a>
          <ul class="ls-dropdown-nav" aria-hidden="true">
            <li><a href="{{url('/show/filme')}}/{{$value->id}}/{{$id}}" class="ls-color-info" role="option">Visualizar</a></li>
            <li><a href="{{url('/edit/filme')}}/{{$value->id}}/{{$id}}" class="ls-color-warning" role="option">Editar</a></li>
            <li><a href="{{url('/delete/filme')}}/{{$value->id}}/{{$id}}" class="ls-color-danger" role="option">Excluir</a></li>
          </ul>
        </div>
      </td>
    </tr>
    @endforeach
  </tbody>

</table>


@endsection
