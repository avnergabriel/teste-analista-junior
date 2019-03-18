define(['app/base/View','ractive-loader!app/config/config-tpl.html', 'jquery'], function (View,template, $) {
    return View.extend({
        template: template,
        el: '.content-popup-config',
        oncomplete: function () {
            console.log('complete');
            var me = this;
            $('.btn-definir').on('click', function () {
                me.definirServidor();
            });

            var servidor = localStorage.getItem('servidor');
            if(servidor){
                servidor = JSON.parse(servidor);
                this.set('data.servidor', servidor);
            }

        },
        definirServidor: function () {
            localStorage.setItem('servidor', this.get('data.servidor'));
            window.location.reload();
        },
        salvar: function () {
            localStorage.setItem('servidor', JSON.stringify(this.get('data.servidor')));
            var app = require('app/app');
            app.showNotification('Configurações salvas com sucesso.');
        }
    })
});