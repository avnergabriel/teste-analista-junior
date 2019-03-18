define(['app/base/View','ractive-loader!app/vistoria/vistoria-tpl.html', 'jquery'], function (View,template, $) {
    return View.extend({
        template: template,
        el: '.content-vistoria',
        novaVistoria: function () {
            this.fire('novaVistoria');
        },
        oncomplete: function () {
            var me = this;
            $('.btn-add-vistoria').on('click', function () {
                me.novaVistoria();
            });
            var app = require('app/app');

/*
            var init = app.f7.onPageInit('vistoria', function (page) {
                me.fire('listarVistorias');
                init.remove();
            });
*/
            var back = app.f7.onPageAfterAnimation('vistoria', function (page) {
                setTimeout(function () {
                    me.fire('listarVistorias');
                    back.remove();
                }, 1000);

            });

        },
        visualizar: function (id) {
            this.fire('visualizar', id);
        }
    })
});