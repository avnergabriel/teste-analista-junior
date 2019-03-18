define(['app/base/View', 'ractive-loader!app/index/index-tpl.html', 'jquery'], function (View, template, $) {
    return View.extend({
        template: template,
        el: '.content-index',
        adicionarAssinatura: function (index) {
            var me = this;
            var app = require('app/app');
            app.mainView.router.loadPage({url: 'pages/assinatura.html'});
            var back = app.f7.onPageAfterAnimation('index', function (page) {

                if (page.query.assinatura) {
                    console.log(page.query.assinatura)
                }
                back.remove();
            });

        }
    })
});