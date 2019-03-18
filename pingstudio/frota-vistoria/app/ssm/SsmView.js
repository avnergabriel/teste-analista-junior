define(['app/base/View', 'ractive-loader!app/ssm/ssm-tpl.html', 'jquery', 'app/base/consulta/Consulta', 'string', 'moment', 'app/base/Utils', 'app/recurso/RecursoView'],
    function (View, template, $, Consulta, S, moment, Utils, RecursoView) {
        return View.extend({
            template: template,
            el: '.content-ssm',
            oncomplete: function () {
                var me = this;
                this.set({});
                var app = require('app/app');
                this.configurarComandoVoz();
                this.definirAutocompleteSolicitante();
                $('.btn-salvar-ssm').on('click', function () {
                    me.salvar();
                });

                $('.btn-ssm-voltar').on('click', function () {
                    app.mainView.router.back({query: {}});
                });

                this.recursoView = new RecursoView({el: '.ssm-imagens'});

            },
            salvar: function () {
                var usuario = JSON.parse(localStorage.getItem('usuario'));
                var data = this.get();
                var ssm = {
                    "@xdata.type": "XData.Default.SolicitacaoServico",
                    'Atualizador@xdata.ref': 'Usuario(' + usuario.Id + ')',
                    'Data': moment(data.dados.Data).format('YYYY-MM-DD'),
                    'Hora': moment(data.dados.Data).format('HH:mm:ss'),
                    'Informacoes': data.dados.Informacoes,
                    'Ativo@xdata.ref': 'Veiculo(' + data.defeito.Grupo.Veiculo.Id + ')',
                    'Defeito@xdata.ref': 'Categoria(' + data.defeito.Id + ')',
                    'Solicitante@xdata.ref': 'Colaborador(' + $('#autocomplete-standalone-popup').find('input').val() + ')',
                    'Defeito': data.defeito,
                    'Solicitante': data.solicitante
                };

                var _fotos = this.recursoView.get('data.fotos');
                var fotos = [];
                if (_fotos) {
                    _fotos.forEach(function (_foto) {
                        var conteudo = _foto.replace("data:image/png;base64,", "");
                        var foto = {
                            "@xdata.type": "XData.Default.Arquivo",
                            "Conteudo": conteudo
                        };
                        fotos.push(foto);
                    });
                    ssm.Arquivos = fotos;
                }

                this.fire("salvar", ssm);

            },
            abrirTelaDefeitos: function (grupo) {
                this.fire('obterDefeitos', grupo);
            },
            exibirTelaSsm: function () {
                this.proximaTela();
                $('.btn-salvar-ssm').removeClass('hide');

            },
            proximaTela: function () {
                this.mySwiper.unlockSwipeToNext();
                this.mySwiper.slideNext();
                this.atualizarSwipe();
            },
            telaAnterior: function () {
                this.mySwiper.slidePrev();
            },
            exibirTelaGrupos: function () {
                var app = require("app/app");
                var me = this;
                me.mySwiper = app.f7.swiper('.swiper-container-ssm', {
                    pagination: '.swiper-pagination-ssm',
                    allowSwipeToNext: false,
                    autoHeight: true,
                    paginationType: 'progress'
                });

                me.mySwiper.on('slideChangeStart', function () {
                    $('.btn-salvar-ssm').addClass('hide');
                    me.mySwiper.lockSwipeToNext();
                });
            },
            atualizarSwipe: function () {
                var me = this;
                setTimeout(function () {
                    me.mySwiper.update();
                }, 100);
            },
            abrirTelaSsm: function (defeito) {
                var grupo = this.get('grupo');
                this.fire('abrirTelaSsm', {Id: defeito.Id, Nome: defeito.Nome, Codigo: defeito.Codigo, Grupo: grupo});
            },
            definirAutocompleteSolicitante: function () {
                var me = this;
                var app = require('app/app');
                var usuario = JSON.parse(localStorage.getItem('usuario'));
                var template = "{{Matricula}} - {{Nome}}";
                var itemSelecionado = {Id: usuario.Colaborador, Nome: S(template).template(usuario).s};

                var autocompleteStandalonePopup = app.f7.autocomplete({
                    openIn: 'popup', //open in popup
                    opener: $('#autocomplete-standalone-popup'), //link that opens autocomplete
                    preloader: true, //enable preloader
                    valueProperty: 'Id', //object's "value" property name
                    textProperty: 'Nome', //object's "text" property name
                    limit: 20, //limit to 20 results
                    expandInput: true, // expand input
                    backOnSelect: true, //go back after we select something
                    searchbarPlaceholderText: 'Pesquisar...',
                    searchbarCancelText: 'Cancelar',
                    notFoundText: 'Não encontrado',
                    requestSourceOnOpen: true,
                    openWithAnimation: false,
                    autoFocus: true,
                    value: [itemSelecionado],
                    source: function (autocomplete, query, render) {

                        var results = [];
                        if (query.length === 0) {
                            render(results);
                            return;
                        }
                        var consulta = new Consulta();
                        consulta.adicionarFiltro('Matricula', consulta.Operador.CONTEM, consulta.Conectivo.OU, query);
                        consulta.adicionarFiltro('Nome', consulta.Operador.CONTEM, consulta.Conectivo.OU, query);

                        // Show Preloader
                        autocomplete.showPreloader();
                        // Do Ajax request to Autocomplete data
                        $.ajax({
                            url: app.urlBase() + 'ColaboradorService/Listar',
                            method: 'GET',
                            dataType: 'json',
                            //send "query" to server. Useful in case you generate response dynamically
                            data: {
                                Start: 0,
                                Limit: autocomplete.params.limit,
                                consulta: '\'' + JSON.stringify(consulta) + '\''
                            },
                            success: function (result) {
                                var data = result.Data;
                                // Hide Preoloader

                                data.forEach(function (p1, p2, p3) {
                                    p1.Nome = S(template).template(p1).s;
                                });
                                autocomplete.hidePreloader();
                                // Render items by passing array with result items
                                render(data);
                            }
                        });
                    },
                    onChange: function (autocomplete, value) {
                        var obj = value[0];
                        setValues(obj, autocomplete);
                    },
                    onOpen: function () {
                        $('.searchbar input[type=search]').attr('type', 'number');
                    }
                });

                var setValues = function (obj, autocomplete) {
                    me.set('solicitante', obj);
                    // Add item text value to item-after
                    $('#autocomplete-standalone-popup').find('.item-after').text(obj[autocomplete.params.textProperty]);
                    // Add item value to input value
                    $('#autocomplete-standalone-popup').find('input').val(obj[autocomplete.params.valueProperty]);

                };

                setValues(itemSelecionado, autocompleteStandalonePopup);
            }

        })
    });