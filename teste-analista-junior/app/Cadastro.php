<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cadastro extends Model
{
  protected $fillable = [
    'id','nome','sobrenome','titulacao','cpf','rg','email',
  ];

  protected $table = 'cadastros';

}
