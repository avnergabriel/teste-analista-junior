define(['app/router','jquery', 'ractive-loader!app/index/menu-tpl.html','ractive','moment','framework7'],function (router, $, menuTemplate, Ractive, moment) {
    router.init();


    var ractiveConfig = function () {
        Ractive.DEBUG_PROMISES = false;
        var helpers = Ractive.defaults.data;
        helpers.getDay = function(timeString){
            return moment(timeString).format('D');
        };

        helpers.getMonth = function(timeString){
            return moment(timeString).format('MMM');
        };

        helpers.getTime = function(timeString){
            return moment(timeString, 'HH:mm:ss').format('HH:mm');
        };
        helpers.getDate = function(timeString){
            return moment(timeString).format('DD/MM/YYYY');
        };
        helpers.formatDateTime = function(timeString){
            return moment(timeString).format('DD/MM/YYYY - HH:mm');
        }
    };
    var ajaxConfig = function () {
        var $$ = Dom7;
        $.ajaxSetup({
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function (xhr, options) {
                app.f7.showIndicator();

                var token = localStorage.getItem('token');
                if(token){
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                }
            },
            complete: function (response) {
                app.f7.hideIndicator();

                var status = [200, 201, 203, 204];
                var msg = "Falha na comunicação com o servidor.";
                if($.inArray(response.status, status) === -1){
                    if(response.responseJSON){
                        var res = response.responseJSON;
                        if (res && res.error) {
                            msg = res.error.message;
                        }
                    }else{
                        msg = 'Erro de comunicação com o servidor. Código ' + response.status;
                    }
                    app.showNotification(msg);
                }
            }
        })
    };



    var app = {
        urlBase: function () {
            var servidor = localStorage.getItem('servidor');
            if(servidor){
                servidor = JSON.parse(servidor);
                return 'http://' + servidor.endereco + ':' + servidor.porta  + '/tms/xdata/';
            }else{
                app.showNotification('Configurações do Servidor não encontradas.');
            }
            return false;

        },
        init: function () {
            ajaxConfig();
            ractiveConfig();

            this.f7 = new Framework7({
                pushState: true,
                // swipePanel: 'left',
                material: true,
                notificationCloseButtonText: 'OK',
                preroute: function (view, options) {
                    var urlLogin = 'pages/login.html';
                    var token = localStorage.getItem('token');

                    app.f7.allowPanelOpen = (token !== null);
                    if(options.url != urlLogin && !token){
                        view.router.loadPage({url: 'pages/login.html', reload: true});
                        return false;
                    }
                }
            });

            this.mainView = this.f7.addView('.view-main', {
            });

            this.showNotification = function (msg, timeout) {
                timeout = timeout || 5000;
                var notificacao = app.f7.addNotification({
                    message: msg
                });

                setTimeout(function () {
                    app.f7.closeNotification(notificacao);
                }, timeout)

            };


            var token = localStorage.getItem('token');
            app.f7.allowPanelOpen = (token !== null);
            if(!token){
                this.mainView.router.loadPage({url: 'pages/login.html', reload: true});
            }
        },
        router: router
    };

    var onBackButtonClick = function (e) {
        var telas = ['index', 'login'];
        if (app.f7.closePanel() !== undefined) {
            if (!app.f7.closeModal()) {
                app.mainView.router.back();
            }else if (telas.indexOf(app.f7.mainView.activePage.name) > -1) {
                e.preventDefault();
                navigator.app.exitApp();
            }
        }
    };

    document.addEventListener("backbutton", onBackButtonClick, false);

    var menuView = new Ractive({
        el: '.menu-app',
        template: menuTemplate,
        data: {},
        oncomplete: function () {
            app.menuView = menuView;
            app.init();
        },
        config: function () {
            var ConfigView = require('app/config/ConfigView');
            var configView = new ConfigView();

        }
    });
    return app;
});
