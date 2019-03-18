define(['app/base/View', 'ractive-loader!app/vistoria-select/vistoria-select-tpl.html',
'ractive-loader!app/vistoria-select/vistoria-select-edicao-tpl.html', 'jquery', 'moment', 'app/base/Utils', 'app/recurso/RecursoView'], function (View, template,templateEdicao, $, moment, Utils, RecursoView) {
    return View.extend({
        template: template,
        el: '.content-vistoria-select',
        oncomplete: function () {
            var app = require("app/app");
            var me = this;
            this.observe('data.Verificacao.Itens', function (itens) {
                if(itens){
                    var possuiSsm = false;
                    itens.forEach(function (item) {
                        if(item.Ssm){
                            possuiSsm = true;
                        }
                    });
                    me.set('possuiSsm', possuiSsm);

                }
            });

            me.mySwiper = app.f7.swiper('.swiper-container-vistoria', {
                pagination: '.swiper-pagination-vistoria',
                allowSwipeToNext: false,
                autoHeight: true,
                followFinger: false,
                paginationType: 'progress',
                onInit: function (swiper) {
                    setTimeout(function () {
                        swiper.update();
                    }, 100)
                }
            });
            me.mySwiper.on('slideChangeStart', function () {
                $('.btn-salvar-vistoria').addClass('hide');
                $('.btn-enviar-vistoria').addClass('hide');

                if(me.mySwiper.activeIndex === 2){
                    $('.btn-salvar-vistoria').removeClass('hide');
                }else if(me.mySwiper.activeIndex === 3){
                    $('.btn-enviar-vistoria').removeClass('hide');
                }
                app.mainView.hideToolbar();
                me.mySwiper.lockSwipeToNext();
                me.atualizarSwipe();
            });


            $('.btn-vistoria-voltar').on('click', function () {
                if (me.mySwiper.activeIndex > 0) {
                    me.telaAnterior()
                } else {
                    app.mainView.router.back();
                }
            });
            $('.btn-revisar').on('click', function () {
                me.telaAnterior();
            });

            $('.btn-salvar-vistoria').on('click', function () {
                if(me.validar()){
                    me.proximaTela();
                    app.mainView.showToolbar();
                }

            });


            $('.btn-enviar-vistoria').on('click', function () {
                me.salvarVistoria();
                app.mainView.router.back();//<alteracao>
            });

            $('.btn-back-vistoria').on('click', function () {
                var myApp = new Framework7(); 
                myApp.modal({
                    title:  'Deseja Voltar?',
                    text: '',
                    buttons: [
                      {
                        text: 'Cancelar',
                        onClick: function() {
                          
                        }
                      },
                      {
                        text: 'Ok',
                        onClick: function() {
                            app.mainView.router.back();
                        }
                      },
                    ]
                  })
            });

        },
        atualizarSwipe: function () {
            var me = this;
            setTimeout(function () {
                var $$ =  Dom7;
                me.mySwiper.update();
                $$('.content-vistoria-select').scrollTop(0)
            }, 200);
        },
        selecionarVeiculo: function (verificacaoId) {
            this.set('dados.Verificacao', {Id: parseInt(verificacaoId)});
            this.proximaTela();
            setTimeout(function () {
                $('#numeroVeiculo').focus();
            }, 500);
        },
        proximaTela: function () {
            this.mySwiper.unlockSwipeToNext();
            this.mySwiper.slideNext();
            this.atualizarSwipe();
        },
        telaAnterior: function () {
            this.mySwiper.slidePrev();
        },
        abrirVistoria: function (Id) {
            this.fire('abrirvistoria', Id);
            // this.proximaTela();
        },
        listarVistorias: function () {
            this.fire('listarVistorias');
            // this.proximaTela();
        },
        listarVerificacoes: function () {
            this.fire('listarVerificacoes');
            // this.proximaTela();
        },
        exibirTelaVistoria: function () {
            var app = require("app/app");
            var me = this;
            this.proximaTela();
            app.mainView.showToolbar();
            $('.btn-salvar-vistoria').removeClass('hide');
            var $$ = Dom7;
            $$('.list-ssm .accordion-list .accordion-item').once('accordion:closed accordion:opened', function (e) {
                me.atualizarSwipe();
            });

            var itens = this.get('data.Verificacao.Itens');
            itens.forEach(function (t, index) {
                t.Arquivos = t.Arquivos || [];
                // var view = new RecursoView({el: '.vistoria-imagens-' + index, data: {bgColor: 'bg-grey'}});
            });
            this.set('data.Verificacao.Itens', itens);

        },
        toggleSsm: function () {
            var me = this;
            $('.list-ssm').animate({
                height: "toggle"
            }, {
                complete: function () {
                    me.atualizarSwipe();
                }
            });

        },
        adicionarSsm: function (index) {

            var me = this;
            var app = require('app/app');
            var vistoria = this.get('data');
            var veiculoId = this.get('VeiculoId');
            var veiculo = {Id: veiculoId, Numero: vistoria.VeiculoNumero};
            app.mainView.router.loadPage({url: 'pages/ssm.html', query: veiculo});
            var back = app.f7.onPageAfterAnimation('vistoria-select', function (page) {
                if (page.query.ssmPreenchida) {
                    var itens = me.get('data.Verificacao.Itens');
                    if(itens[index].Ssm){
                        itens[index].Ssm.push(page.query);
                    }else{
                        itens[index].Ssm = [page.query];
                    }

                    me.set('data.Verificacao.Itens', itens);
                    me.atualizarSwipe();
                }
                app.mainView.showToolbar();

                back.remove();
            });

        },
        anexarArquivo: function (item) {
            var me = this;
            item.Arquivos = item.Arquivos || [];
            var success = function (data) {
                item.Arquivos.push("data:image/jpeg;base64," + data);
                me.update();
                me.mySwiper.update();

            };

            var error = function (data) {
                console.log(data);
            };
            //destinationType: Camera.DestinationType.DATA_URL,
            navigator.camera.getPicture(success, error,{destinationType: Camera.DestinationType.DATA_URL, quality: 25, correctOrientation: true, encodingType: Camera.EncodingType.JPEG });

        },
        abrirFoto: function (item) {
            item.Arquivos = item.Arquivos || [];
            var app = require('app/app');
            var myPhotoBrowser = app.f7.photoBrowser({
                zoom: 400,
                photos: item.Arquivos,
                exposition: false,
                toolbar: true,
                type: 'popup',
                ofText: 'de',
                backLinkText: 'Voltar'

            });
            myPhotoBrowser.open();

        },
        removerFoto: function (item) {
            item.Arquivos.splice(0, item.Arquivos.length);
            this.update();
            this.mySwiper.update();

        },
        obterDescricaoRespostaVistoria: function (codigo) {
            return Utils.obterDescricaoRespostaVistoria(codigo);
        },
        validar: function () {
            var vistoria = this.get('data');
            var app = require('app/app');
            var ok = true;

            vistoria.Verificacao.Itens.forEach(function (item) {
                if(!item.Valor){
                    ok = false;
                }
            });

            if(!ok){
                app.showNotification("Favor responder os itens obrigatórios.");
            }
            return ok;
        },
        salvarVistoria: function () {
            var obj = {};
            var vistoria = this.get('data');
            var veiculoId = this.get('VeiculoId');
            var data = moment(vistoria.DataHora, 'DD/MM/YYYY HH:mm');
            var vistoriador = JSON.parse(localStorage.getItem('usuario'));
            obj["Vistoriador@xdata.ref"] = "Colaborador(" + vistoriador.Colaborador + ")";
            obj["Lista@xdata.ref"] = "ListaVerificacao(" + vistoria.Verificacao.Id + ")";
            obj["Ativo@xdata.ref"] = "Veiculo(" + parseInt(veiculoId) + ")";
            obj["Atualizador@xdata.ref"] = "Usuario(" + vistoriador.Id + ")";
            obj.Data = data.format('YYYY-MM-DD');
            obj.Hora = data.format('HH:mm:ss');
            obj.Assinatura = vistoria.assinatura ? vistoria.assinatura.replace('data:image/png;base64,', '') : null;
            obj.Itens = [];
            vistoria.Verificacao.Itens.forEach(function (item) {
                if (item.Ssm) {
                    item.Ssm.forEach(function (it) {
                        delete it.Defeito;
                        delete it.ssmPreenchida;
                        delete it.Solicitante;
                    });

                }
                var fotos = [];
                if (item.Arquivos) {
                    item.Arquivos.forEach(function (_foto) {
                        var conteudo = _foto.replace("data:image/jpeg;base64,", "");
                        var foto = {
                            "@xdata.type": "XData.Default.VistoriaRecurso",
                            "Conteudo": conteudo
                        };
                        fotos.push(foto);
                    });
                }

                obj.Itens.push({
                    "Item@xdata.ref": "ItemVerificacao(" + item.Id + ")",
                    "Atualizador@xdata.ref": obj["Atualizador@xdata.ref"],
                    Valor: item.Valor,
                    "Ssm": item.Ssm || [],
                    Arquivos: fotos
                })
            });
            this.fire('salvar', obj);
        },
        adicionarAssinatura: function (recurso) {
            var me = this;
            var app = require('app/app');
            app.mainView.router.loadPage({url: 'pages/assinatura.html'});
            var backAssinatura = app.f7.onPageAfterAnimation('assinatura', function (page) {
                backAssinatura.remove();
            });
            var back = app.f7.onPageAfterAnimation('vistoria-select', function (page) {
                if(page.query.assinatura){

                    me.set('data.assinatura', page.query.assinatura);
                }
                screen.orientation.lock('portrait');
                screen.orientation.unlock();
                back.remove();
            });

        },
        abrirAssinatura: function () {

            var assinatura = this.get('data.assinatura');
            var app = require('app/app');
            var myPhotoBrowser = app.f7.photoBrowser({
                zoom: 400,
                photos: [assinatura],
                exposition: false,
                toolbar: false

            });
            myPhotoBrowser.open();
        },
        removerAssinatura: function () {
            this.set('data.assinatura', null);
        },
        removerItemSsm: function (index, indexItem) {
            var app = require('app/app');
            var me = this;
            app.f7.confirm('Remover Solicitação de Serviço?','Atenção', function () {
                var itens = me.get('data.Verificacao.Itens');
                var item = itens[indexItem];
                item.Ssm.splice(index, 1);
                me.set('data.Verificacao.Itens', itens);
            });


        }
    })
});