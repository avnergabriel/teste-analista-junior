define(['app/base/View','ractive-loader!app/login/login-tpl.html', 'jquery', 'app/config/ConfigView'], function (View,template, $, ConfigView) {
    return View.extend({
        template: template,
        el: '.content-login',
        oncomplete: function () {
            var me = this;
            $('.btn-entrar').on('click', function () {
                me.fire('login', me.get('login'));
            });

            $('.btn-config').on('click', function () {
                var configView = new ConfigView();
            });
        }
    })
});