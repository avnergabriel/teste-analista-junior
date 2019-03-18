define(['app/base/Controller','app/login/LoginView', 'jquery', 'sha256'], function (Controller, LoginView, $, sha256) {
    return Controller.extend({
        init: function () {
            this._parent(LoginView);
        },
        renderView: function (query) {
            this._parent(query);
            var app = require('app/app');
            if(query && query.sair){
                localStorage.removeItem('usuario');
                localStorage.removeItem('token');
                window.location.reload();
            }
            this.view.on('login', function (login) {
                var msg = [];
                if(!login.conta){
                    msg.push('Informe a conta de usuário.');
                }
                if(!login.senha){
                    msg.push('Informe a senha.');
                }
                if(msg.length > 0){
                    app.showNotification(msg.join('<br>'));
                }else{

                    var auth = btoa(String(login.conta) + ':' + login.senha);

                    $.ajax({
                        url: app.urlBase() + 'UsuarioService/Login',
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + auth
                        },
                        success: function (data, statusText, xhr) {
                            var token = xhr.getResponseHeader('Authorization');
                            token = token.replace('Bearer ', '');
                            localStorage.setItem('token', token);
                            var tokenArr = token.split('.');
                            var payload = atob(tokenArr[1]);
                            payload = JSON.parse(payload);
                            var usuario = payload.usuario;
                            localStorage.setItem('usuario', usuario);
                            app.mainView.router.load({url: 'pages/index.html', reload: true});

                        }
                    });
                }
            })
        }
    })
});