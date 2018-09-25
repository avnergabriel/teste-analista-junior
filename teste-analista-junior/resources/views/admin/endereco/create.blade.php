
@extends('layouts.sidebar')

@section('content')
<h1 class="ls-title-intro ls-ico-home">Cadastros / Endereços / Cadastrar novo</h1>
<form action="{{url('/store/endereco')}}/{{$id}}" method="POST" class="ls-form ls-form-horizontal row">
  {{ csrf_field() }}
  <fieldset>
    <label class="ls-label col-md-6 col-xs-12">
      <b class="ls-label-text">Endereço</b>
      <input type="text" name="endereco" placeholder="Endereço" class="ls-field" required>
    </label>
    <label class="ls-label col-md-4 col-xs-12">
      <b class="ls-label-text">Principal</b>
      <div class="ls-custom-select">
        <select name="principal" class="ls-select">
          <option value="0">Não</option>
          <option value="1">Sim</option>
        </select>
      </div>
    </label>
  </fieldset>
  <div class="ls-actions-btn">
    <button class="ls-btn">Salvar</button>
    <!-- <button class="ls-btn-danger">Cancelar</button> -->
  </div>
</form>


@endsection
