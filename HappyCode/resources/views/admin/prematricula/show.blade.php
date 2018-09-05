@extends('layouts.sidebar')

@section('content')

<h1 class="ls-title-intro ls-ico-edit-admin">Ficha de Pré-Matrícula</h1>

<form action="{{url('/store/prematricula')}}" class="ls-form ls-form-horizontal row" method="POST}}" disabled>
  {{ csrf_field() }}
  <legend class="ls-title-2}}" disabled>Dados do Aluno</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Nome</b>
      <input type="text" name="alu_nome" placeholder="Nome" class="ls-field" value="{{$dados->alu_nome}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Data Nascimento:</b>
      <input type="date" name="alu_nascimento" placeholder="Data Nascimento" class="ls-field" value="{{$dados->alu_nascimento}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Escola</b>
      <input type="text" name="alu_escola" placeholder="Escola" class="ls-field" value="{{$dados->alu_escola}}" disabled>
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Série</b>
      <input type="text" name="alu_serie" placeholder="Série" class="ls-field" value="{{$dados->alu_serie}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>CPF:</b>
      <input type="text" name="alu_cpf" placeholder="CPF" class="ls-field" value="{{$dados->alu_cpf}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>RG</b>
      <input type="text" name="alu_rg" placeholder="RG" class="ls-field" value="{{$dados->alu_rg}}" disabled>
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Telefone</b>
      <input type="text" name="alu_telefone" placeholder="Telefone" class="ls-field" value="{{$dados->alu_telefone}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Endereço:</b>
      <input type="text" name="alu_endereco" placeholder="Endereço" class="ls-field" value="{{$dados->alu_endereco}}" disabled>
    </label>
  </fieldset>
  <legend class="ls-title-2}}" disabled>Dados do Responsável</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Nome</b>
      <input type="text" name="res_nome" placeholder="Nome" class="ls-field" value="{{$dados->res_nome}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>CPF:</b>
      <input type="text" name="res_cpf" placeholder="CPF" class="ls-field" value="{{$dados->res_cpf}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>RG</b>
      <input type="text" name="res_rg" placeholder="RG" class="ls-field" value="{{$dados->res_rg}}" disabled>
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Endereço:</b>
      <input type="text" name="res_endereco" placeholder="Endereço" class="ls-field" value="{{$dados->res_endereco}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Celular:</b>
      <input type="text" name="res_celular" placeholder="Celular" class="ls-field" value="{{$dados->res_celular}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>E-mail:</b>
      <input type="text" name="res_email" placeholder="E-mail" class="ls-field" value="{{$dados->res_email}}" disabled>
    </label>
  </fieldset>
  <legend class="ls-title-2}}" disabled>Oficinas</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Curso:</b>
      <input type="text" name="ofi_curso" placeholder="Curso" class="ls-field" value="{{$dados->ofi_curso}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Data:</b>
      <input type="date" name="ofi_data" placeholder="Data" class="ls-field" value="{{$dados->ofi_data}}" disabled>
    </label>
    <label class="ls-label col-md-4 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Hora:</b>
      <input type="text" name="ofi_hora" placeholder="Hora" class="ls-field" value="{{$dados->ofi_hora}}" disabled>
    </label>
  </fieldset>
  <legend class="ls-title-2}}" disabled>Outros</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-6 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Cursos:</b>
      <textarea name="cur_cursos" rows="4" disabled>{{$dados->cur_cursos}}</textarea>
    </label>
    <label class="ls-label col-md-6 col-xs-12}}" disabled>
      <b class="ls-label-text}}" disabled>Preferências:</b>
      <textarea name="pre_preferencias" rows="4" disabled>{{$dados->pre_preferencias}}</textarea>
    </label>
  </fieldset>

  <a href="{{url('/prematricula')}}" class="ls-btn">Voltar</a>
  <hr>
  <hr>
</form>




@endsection
