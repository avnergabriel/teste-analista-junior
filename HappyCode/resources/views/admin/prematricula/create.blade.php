@extends('layouts.sidebar')

@section('content')

<h1 class="ls-title-intro ls-ico-edit-admin">Ficha de Pré-Matrícula</h1>

<form action="{{url('/store/prematricula')}}" class="ls-form ls-form-horizontal row" method="POST">
  {{ csrf_field() }}
  <legend class="ls-title-2">Dados do Aluno</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Nome</b>
      <input type="text" name="alu_nome" placeholder="Nome" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Data Nascimento:</b>
      <input type="date" name="alu_nascimento" placeholder="Data Nascimento" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Escola</b>
      <input type="text" name="alu_escola" placeholder="Escola" class="ls-field">
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Série</b>
      <input type="text" name="alu_serie" placeholder="Série" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">CPF:</b>
      <input type="text" name="alu_cpf" placeholder="CPF" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">RG</b>
      <input type="text" name="alu_rg" placeholder="RG" class="ls-field">
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Telefone</b>
      <input type="text" name="alu_telefone" placeholder="Telefone" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Endereço:</b>
      <input type="text" name="alu_endereco" placeholder="Endereço" class="ls-field">
    </label>
  </fieldset>
  <legend class="ls-title-2">Dados do Responsável</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Nome</b>
      <input type="text" name="res_nome" placeholder="Nome" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">CPF:</b>
      <input type="text" name="res_cpf" placeholder="CPF" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">RG</b>
      <input type="text" name="res_rg" placeholder="RG" class="ls-field">
    </label>
  </fieldset>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Endereço:</b>
      <input type="text" name="res_endereco" placeholder="Endereço" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Celular:</b>
      <input type="text" name="res_celular" placeholder="Celular" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">E-mail:</b>
      <input type="text" name="res_email" placeholder="E-mail" class="ls-field">
    </label>
  </fieldset>
  <legend class="ls-title-2">Oficinas</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Curso:</b>
      <input type="text" name="ofi_curso" placeholder="Curso" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Data:</b>
      <input type="date" name="ofi_data" placeholder="Data" class="ls-field">
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Hora:</b>
      <input type="text" name="ofi_hora" placeholder="Hora" class="ls-field">
    </label>
  </fieldset>
  <legend class="ls-title-2">Outros</legend>
  <hr>
  <fieldset>
    <label class="ls-label col-md-6 col-xs-12">
      <b class="ls-label-text">Cursos:</b>
      <textarea name="cur_cursos" rows="4"></textarea>
    </label>
    <label class="ls-label col-md-6 col-xs-12">
      <b class="ls-label-text">Preferências:</b>
      <textarea name="pre_preferencias" rows="4"></textarea>
    </label>
  </fieldset>

  <button type="submit" class="ls-btn-primary">Salvar</button>
  <a href="{{url('/prematricula')}}" class="ls-btn">Cancelar</a>
  <hr>
  <hr>
</form>




@endsection
