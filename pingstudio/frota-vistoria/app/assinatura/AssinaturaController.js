define(['app/base/Controller','app/assinatura/AssinaturaView'], function (Controller, AssinaturaView) {
    return Controller.extend({
        init: function () {
            this._parent(AssinaturaView);
        },
        renderView: function (query) {

            this._parent(query);
            var app = require('app/app');
            this.view.on('saved', function (assinatura) {
                app.mainView.router.back({query: {assinatura: assinatura}});
            });
        }
    })
});