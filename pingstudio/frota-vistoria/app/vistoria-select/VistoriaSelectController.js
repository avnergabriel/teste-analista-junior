define(['app/base/Controller','app/vistoria-select/VistoriaSelectView', 'jquery', 'app/base/Utils', 'moment'], function (Controller, VistoriaSelectView, $, Utils, moment) {
    return Controller.extend({
        init: function () {
            this._parent(VistoriaSelectView);
        },
        renderView: function (query) {
            this._parent(query);
            var me = this;

            this.view.on('complete', function () {
                this.set('vistorias', query.value);
            });

            this.view.on('salvar',function (obj) {
                me.salvar(obj);
            });

            var app = require('app/app');
            var obterListaVerificacaoVeiculo = function (params) {
                var promise = new $.Deferred();
                $.getJSON(app.urlBase() + 'ListaVerificacaoService/ObterListaVerificacaoVeiculoPorNumero', params, function (verificacao, textStatus, xhr) {
                    var veiculoId = xhr.getResponseHeader('veiculo');
                    verificacao.VeiculoId = veiculoId;
                    promise.resolve(verificacao);
                });

                return promise;

            };


            var obterListaVerificacao = function (params) {
                var promise = new $.Deferred();
                $.ajax({
                    url:app.urlBase() + 'ListaVerificacaoService/ObterListaVerificacao',
                    data: params,
                    success: function (vistoria, textStatus, xhr) {
                        promise.resolve(vistoria);
                    }
                });

                return promise;

            };
            var listarVistorias = function () {
                const app = require('app/app');
                var veiculo = me.view.get('dados.Veiculo.Numero');
                $.getJSON(app.urlBase() + 'ListaVerificacaoService/ObterListaVerificacao', {
                    VeiculoNumero: '\'' + veiculo + '\''
                }, function (data) {
                    me.view.set("vistorias", data.value);
                    me.view.proximaTela();
                })

            };

            function abrirVistoria(Id) {
                var numero = me.view.get('dados.Veiculo.Numero');
                var params = {
                    Verificacao: Id,
                    $expand: 'Itens',
                    VeiculoNumero: '\'' + numero + '\''
                };
                $.when(Utils.obterSolicitacoesServicoVeiculo({
                        VeiculoNumero:  '\'' + numero + '\'',
                        $expand: 'Defeito, Defeito/Grupo'
                    }),
                    obterListaVerificacao({
                        Verificacao: Id,
                        $expand: 'Itens'
                    })).done(function (solicitacoesServico, verificacao, vistoria) {
                    var dados = {
                        SolicitacoesServico: solicitacoesServico.value,
                        Verificacao: verificacao,
                        VeiculoNumero: numero,
                        DataHora: moment().format('DD/MM/YYYY - HH:mm')
                    };

                    me.view.set("data", dados);
                    var usuario = JSON.parse(localStorage.getItem('usuario'));
                    var u = usuario.Matricula + ' - ' + usuario.Nome;
                    $('.usuario').html(u);

                    me.view.exibirTelaVistoria();

                });
            }

            this.view.on('abrirvistoria', function (Id) {

                abrirVistoria(Id);
            });

            this.view.on('listarVistorias', function () {
                listarVistorias();
            });

            this.view.on('listarVerificacoes', function () {
                var veiculo = me.view.get('dados.Veiculo.Numero');
                var params = {
                    VeiculoNumero: '\'' + veiculo + '\''
                };
                if(!veiculo){
                    app.showNotification("Favor informar o número do veículo.");
                }else{
                    obterListaVerificacaoVeiculo(params).then(function (data) {
                        me.view.set("vistorias", data.value);
                        me.view.set("VeiculoId", data.VeiculoId);
                        me.view.proximaTela();

                    });
                }
            });

        },
        salvar: function (vistoria) {
            var app = require("app/app");
            $.ajax({
                url:app.urlBase() + 'VistoriaService/Inserir',
                data: JSON.stringify(vistoria),
                method: 'POST',
                success: function () {
                    var app = require('app/app');
                    // window.location = "#!/pages/vistoria.html";
                    app.mainView.router.loadPage({url: 'pages/vistoria.html', force: true});
                    // app.mainView.router.loadPage({url: 'pages/vistoria.html', reload: true});

                }
            });
        }
    })
});