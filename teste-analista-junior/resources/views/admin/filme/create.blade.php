
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Filmes / Cadastrar novo</h1>
<form action="{{url('/store/filme')}}/{{$id}}" method="POST" class="ls-form ls-form-horizontal row">
  {{ csrf_field() }}
  <fieldset>
    <label class="ls-label col-md-3 col-xs-12">
      <b class="ls-label-text">Título do Filme</b>
      <input type="text" name="titulo" placeholder="Título do Filme" class="ls-field" required>
    </label>
    <label class="ls-label col-md-3 col-xs-12">
      <b class="ls-label-text">Ano de Publicação</b>
      <input type="text" name="ano" placeholder="Ano de Publicação" class="ls-field" required>
    </label>
    <label class="ls-label col-md-3 col-xs-12">
      <b class="ls-label-text">Diretor</b>
      <input type="text" name="diretor" placeholder="Diretor" class="ls-field" required>
    </label>
    <label class="ls-label col-md-3 col-xs-12">
      <b class="ls-label-text">Nota</b>
      <input type="text" name="nota" placeholder="Nota" class="ls-field" required>
    </label>
    <label class="ls-label col-md-12 col-xs-12">
        <b class="ls-label-text">Sinopse:</b>
        <textarea name="sinopse" id="" cols="30" rows="5" class=""></textarea>
      </label>
  </fieldset>
  <div class="ls-actions-btn">
    <button class="ls-btn">Salvar</button>
    <!-- <button class="ls-btn-danger">Cancelar</button> -->
  </div>
</form>


@endsection
