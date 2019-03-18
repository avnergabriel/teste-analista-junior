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

        },
        definirServidor: function () {
            sessionStorage.setItem('servidor', this.get('data.servidor'));
        }
    })
});