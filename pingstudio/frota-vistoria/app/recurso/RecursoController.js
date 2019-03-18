define(['app/base/Controller','app/recurso/RecursoView'], function (Controller, RecursoView) {
    return Controller.extend({
        init: function () {
            this._parent(RecursoView);
        },
        renderView: function (query) {
            this._parent(query);
        }
    })
});