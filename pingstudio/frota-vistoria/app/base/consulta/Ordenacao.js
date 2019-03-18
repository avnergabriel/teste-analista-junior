define(['class.js'], function (Class) {
    var Ordenacao = new Class({
        init: function (campo, desc) {
            this.$type = 'Ordenacao.TOrdenacao';
            var _campo = campo.split('.');
            if(_campo.length > 1){
                this.campo = _campo[1];
                this.entidade = _campo[0];
            }else{
                this.campo = campo;
            }
            this.desc = desc;
        },
        desc: false,
        campo: ''
    });

    return Ordenacao;
});