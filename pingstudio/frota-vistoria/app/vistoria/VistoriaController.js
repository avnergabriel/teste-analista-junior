define(['app/base/Controller', 'app/vistoria/VistoriaView', 'jquery', 'app/vistoria/VistoriaDetalheView', 'moment'], function (Controller, VistoriaView, $, VistoriaDetalheView, moment) {
    return Controller.extend({
        init: function () {
            this._parent(VistoriaView);
        },
        renderView: function (query) {
            this._parent(query);
            var me = this;
            const app = require('app/app');
            this.view.on('novaVistoria', function () {
                app.mainView.router.loadPage({url: 'pages/vistoria-select.html', query: {}});
            });
            this.view.on('listarVistorias', function () {
                me.obterVistorias();
            });
            this.view.on('visualizar', function (id) {
                me.visualizar(id);
            });
        },
        obterVistorias: function () {
            var usuario = JSON.parse(localStorage.getItem('usuario'));
            console.log(usuario);
            var data = moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss');
            const app = require('app/app');
            $.getJSON(app.urlBase() + 'Vistoria', {
                $expand: 'Ativo',
                $filter: "Atualizacao ge '"+data+"' and Vistoriador/Id eq " + usuario.Id
            }, function (result) {
                me.view.set('data', result.value);

            });

            var me = this;
/*
            $.getJSON(app.urlBase() + 'VistoriaService/Listar', {
                Start: 0,
                Limit: 100,
                Consulta: '\'' + JSON.stringify({
                    "$type": "Consulta.TConsulta",
                    ordenacoes: [
                        {
                            "$type": "Ordenacao.TOrdenacao",
                            "campo": "Data",
                            "desc": true
                        },
                        {
                            "$type": "Ordenacao.TOrdenacao",
                            "campo": "Hora",
                            "desc": true
                        }
                    ]
                }) + '\''
            }, function (result) {
                me.view.set('data', result.Data);

            });
*/
        },
        visualizar: function (id) {
            const app = require('app/app');
            $.getJSON(app.urlBase() + 'Vistoria(' + id + ')', {
                $expand: 'Itens/Ssm/Defeito, Itens/Ssm/Solicitante, Itens/Item, Lista, Ativo'
            }, function (result) {
                result.Itens.forEach(function (item) {
                    if(item.Ssm.length > 0){
                        result.possuiSsm = true;
                    }
                });

                var viewDetalhe = new VistoriaDetalheView({
                    data: function () {
                        return {
                            dados: result
                        }
                    }
                });

            });

        }
    })
});