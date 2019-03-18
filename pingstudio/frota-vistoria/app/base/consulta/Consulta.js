define(['app/base/consulta/Filtro', 'app/base/consulta/Ordenacao','class.js'], function (Filtro, Ordenacao, Class) {
    var Consulta =  new Class({
        ordenacoes: [],
        init: function () {
            this.$type = 'Consulta.TConsulta';
            this.filtros = [];
        },
        adicionarFiltro: function (campo, operador, conectivo, valor) {
            this.filtros.push(new Filtro(campo, operador, conectivo, valor));
        },
        adicionarOrdenacao: function (campo, desc) {
            var ordenacao = new Ordenacao(campo, desc);
            this.ordenacoes.push(ordenacao);
        },
        Operador: {
            CONTEM: 'CONTEM',
            IGUAL: 'IGUAL',
            DIFERENTE: "DIFERENTE"
        },
        Conectivo: {
            E:'E',
            OU: 'OU'
        }
    });

    return Consulta;
});