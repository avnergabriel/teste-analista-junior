
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Endereços</h1>
<a href="{{url('/create/endereco')}}/{{$id}}" class="ls-btn-primary">Cadastrar novo</a>
<table class="ls-table">
  <thead>
    <tr>
      <th>Endereço</th>
      <th>Principal</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    @foreach($dados as $value)
    <tr>
      <td><a href="" title="">{{$value->endereco}}</a></td>
      @if($value->principal === 0)
      <td>Não</td>
      @else
      <td>Sim</td>
      @endif
      <td class="ls-txt-right ls-regroup">
        <div data-ls-module="dropdown" class="ls-dropdown">
          <a href="#" class="ls-btn" role="combobox" aria-expanded="false"></a>
          <ul class="ls-dropdown-nav" aria-hidden="true">
            <li><a href="{{url('/edit/endereco')}}/{{$value->id}}/{{$id}}" class="ls-color-warning" role="option">Editar</a></li>
            <li><a href="{{url('/delete/endereco')}}/{{$value->id}}/{{$id}}" class="ls-color-danger" role="option">Excluir</a></li>
          </ul>
        </div>
      </td>
    </tr>
    @endforeach
  </tbody>

</table>


@endsection
