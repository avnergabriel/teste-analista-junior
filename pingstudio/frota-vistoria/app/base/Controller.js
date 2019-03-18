define(['class.js', 'jquery'], function (Class, $) {
    return new Class({
        init: function (View) {
            this.View = View;
        },
        renderView: function (query) {
            var me = this;
            me.view = new me.View({
                params: query
            });
        }
    })
});