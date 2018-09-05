@extends('layouts.sidebar')

@section('content')


  <h1 class="ls-title-intro ls-ico-edit-admin">Pré-Matrícula</h1>

  <a href="{{url('/create/prematricula')}}" class="ls-btn-primary">Cadastrar novo</a>
  <table class="ls-table">
    <thead>
      <tr>
        <th>Nome do Aluno</th>
        <th class="ls-txt-center hidden-xs">Telefone</th>
        <th class="ls-txt-center">Nome do Responsável</th>
        <th class="ls-txt-center"></th>
      </tr>
    </thead>
    <tbody>
      @foreach($dados as $value)
      <tr>
        <td>
          {{$value->alu_nome}}
        </td>
        <td class="ls-txt-center hidden-xs">{{$value->alu_telefone}}</td>
        <td class="ls-txt-center">
          {{$value->res_nome}}
        </td>
        <td class="ls-txt-right ls-regroup">
          <a href="{{url('/show/prematricula')}}/{{$value->id}}" class="ls-color-info ls-btn ls-btn-sm">Visualizar</a>
          <div data-ls-module="dropdown" class="ls-dropdown ls-pos-right">
            <a href="#" class="ls-btn ls-btn-sm" role="combobox" aria-expanded="false"></a>
            <ul class="ls-dropdown-nav" aria-hidden="true">
              <li><a href="{{url('/edit/prematricula')}}/{{$value->id}}" class="ls-color-warning" role="option">Editar</a></li>
              <li><a href="{{url('/delete/prematricula')}}/{{$value->id}}" class="ls-color-danger" role="option">Excluir</a></li>
            </ul>
          </div>
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>


@endsection
