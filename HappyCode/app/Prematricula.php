<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prematricula extends Model
{
    protected $fillable = [
      'id','alu_nome','alu_nascimento','alu_escola','alu_serie',
      'alu_cpf','alu_rg','alu_telefone','alu_endereco','res_nome',
      'res_cpf','res_rg','res_endereco','res_celular','res_email',
      'ofi_curso','ofi_data','ofi_hora','cur_cursos','pre_preferencias',
    ];

  protected $primaryKey = 'id';
  protected $table = 'prematriculas';

}
