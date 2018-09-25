<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
  protected $fillable = [
    'id','endereco','principal','cadastros_id',
  ];

  protected $table = 'enderecos';

  public function cadastro(){
  return $this->belongsTo('App\Cadastro', 'cadastros_id');
  }
}
