define(['class.js'], function (Class) {
    var Filtro = new Class({

        init: function (campo, operador, conectivo,valor) {
            this.$type = 'Filtro.TFiltro';
            var _campo = campo.split('.');
            if(_campo.length > 1){
                this.campo = _campo[1];
                this.entidade = _campo[0];
            }else{
                this.campo = campo;
            }
            this.operador = operador;
            this.valor = valor;
            this.conectivo = 'AND';
        },
        campo: '',
        operador: '',
        valor: '',
        conectivo: ''
    });

    return Filtro;
});