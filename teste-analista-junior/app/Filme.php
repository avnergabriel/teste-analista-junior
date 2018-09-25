<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filme extends Model
{
  protected $fillable = [
    'id','titulo','ano','diretor','nota','sinopse','cadastros_id',
  ];

  protected $table = 'filmes';

  public function cadastro(){
  return $this->belongsTo('App\Cadastro', 'cadastros_id');
  }
}
