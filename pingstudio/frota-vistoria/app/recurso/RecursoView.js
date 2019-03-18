define(['app/base/View', 'ractive-loader!app/recurso/recurso-tpl.html'], function (View, template) {
    return View.extend({
        template: template,
        el: '.content-recurso',
        oncomplete: function () {
            this.set("data.fotos", []);
            this.configurarComandoVoz();
        },
        adicionarFoto: function () {
            var me = this;
            var success = function (data) {
                me.push('data.fotos', "data:image/png;base64," + data);

            };

            var error = function (data) {
                console.log(data);
            };
            //destinationType: Camera.DestinationType.DATA_URL,
            navigator.camera.getPicture(success, error,{destinationType: Camera.DestinationType.DATA_URL, quality: 25, correctOrientation: true, encodingType: Camera.EncodingType.JPEG });
        },
        removerFoto: function () {
            this.splice('data.fotos', 0, this.get('data.fotos').length);
        },
        abrirFoto: function () {
            var fotos = this.get('data.fotos');
            var app = require('app/app');
            var myPhotoBrowser = app.f7.photoBrowser({
                zoom: 400,
                photos: fotos,
                exposition: false,
                toolbar: true,
                type: 'popup'

            });
            myPhotoBrowser.open();

        },
        adicionarAssinatura: function (recurso) {
            var me = this;
            var app = require('app/app');
            app.mainView.router.loadPage({url: 'pages/assinatura.html'});
            var backAssinatura = app.f7.onPageAfterAnimation('assinatura', function (page) {
                screen.orientation.lock('landscape');
                backAssinatura.remove();
            });

            var back = app.f7.onPageAfterAnimation('recurso', function (page) {
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
                toolbar: true,
                ofText: 'de',
                backLinkText: 'Voltar'
            });
            myPhotoBrowser.open();
        },
        removerAssinatura: function () {
            this.set('data.assinatura', null);
        }
    })
});