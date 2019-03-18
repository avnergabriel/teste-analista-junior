define(['app/base/View','ractive-loader!app/vistoria/vistoria-detalhe-tpl.html', 'app/base/Utils'], function (View,template, Utils) {
    return View.extend({
        template: template,
        el: '.list-vistoria-detalhe',
        oncomplete: function () {
            const app = require('app/app');
            app.f7.popup('.popover-vistoria-detalhe');
        },
        obterDescricaoRespostaVistoria: function (codigo) {
            return Utils.obterDescricaoRespostaVistoria(codigo);
        }
    })
});