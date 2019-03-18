define(['app/base/Controller', 'app/ssm/SsmView', 'jquery', 'app/base/Utils'], function (Controller, SsmView, $, Utils, RecursoView) {
    return Controller.extend({
        init: function () {
            this._parent(SsmView);
        },
        renderView: function (query) {
            var app = require('app/app');

            this._parent(query);
            this.view.set('grupo', {Veiculo: query});
            var me = this;
            this.view.on('salvar', function (dados) {
                dados.ssmPreenchida = true;
                app.mainView.router.back({query: dados});
            });
            this.view.on('obterDefeitos', function (grupo) {
                me.obterDefeitos(grupo.Id).then(function (data) {
                    me.view.set('defeitos', data);
                    me.view.proximaTela();
                });
            });

            this.view.on('abrirTelaSsm', function (dados) {
                me.view.set('defeito', dados);
                me.view.set('dados.Data', Date.now());
                Utils.obterSolicitacoesServicoDefeito({DefeitoId: dados.Id,VeiculoNumero: '\'' + dados.Grupo.Veiculo.Numero + '\'', $expand: 'Defeito, Defeito/Grupo'}).then(function (data) {
                    me.view.set("solicitacoesServico", data.value);
                    me.view.exibirTelaSsm();
                });
            });

            var rows = [];

            this.obterGruposManutencao().then(function (grupos) {
                var cols = [];
                rows.push(cols);
                grupos.value.forEach(function (grupo, index, arr) {
                    if (index % 2 === 0 && index > 0) {
                        cols = [];
                        rows.push(cols);
                    }
                    cols.push(grupo);
                });

                me.view.set('grupos', rows);
                me.view.exibirTelaGrupos();

            });


        },
        obterGruposManutencao: function () {
            var promise = new $.Deferred();
            var app = require('app/app');
            $.getJSON(app.urlBase() + 'Categoria/?$filter=Classe eq 181', {}, function (grupos) {
                promise.resolve(grupos);
            });

            return promise;
        },
        obterDefeitos: function (grupo) {
            var promise = new $.Deferred();
            var app = require('app/app');
            $.getJSON(app.urlBase() + 'Categoria/?$filter=Grupo eq ' + grupo, {}, function (defeitos) {
                promise.resolve(defeitos.value);
            });

            return promise;
        }
    })
});