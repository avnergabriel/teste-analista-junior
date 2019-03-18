define(['app/base/Controller','app/index/IndexView'], function (Controller, IndexView) {
    return Controller.extend({
        init: function () {
            this._parent(IndexView);
        },
        renderView: function (query) {
            this._parent(query);
        }
    })
});