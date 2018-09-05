<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrematriculasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prematriculas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('alu_nome')->nullable();
            $table->date('alu_nascimento')->nullable();
            $table->string('alu_escola')->nullable();
            $table->string('alu_serie')->nullable();
            $table->string('alu_cpf')->nullable();
            $table->string('alu_rg')->nullable();
            $table->string('alu_telefone')->nullable();
            $table->string('alu_endereco')->nullable();
            $table->string('res_nome')->nullable();
            $table->string('res_cpf')->nullable();
            $table->string('res_rg')->nullable();
            $table->string('res_endereco')->nullable();
            $table->string('res_celular')->nullable();
            $table->string('res_email')->nullable();

            $table->string('ofi_curso')->nullable();
            $table->date('ofi_data')->nullable();
            $table->string('ofi_hora')->nullable();

            $table->longText('cur_cursos')->nullable();

            $table->longText('pre_preferencias')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prematriculas');
    }
}
