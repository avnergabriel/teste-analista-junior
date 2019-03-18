define(['string','framework7'],function(S) {
    var $ = Framework7.$;
    var eventos = function () {
        $(document).on('page:init', function (e) {
            var page = e.detail.page;
            if(page.name === 'vistoria-select'){
                window.plugins.insomnia.keepAwake();
            }
        });

        $(document).on('page:back', function (e) {
            var page = e.detail.page;
            if(page.name === 'vistoria-select'){
                window.plugins.insomnia.allowSleepAgain();
            }
        })
    };

    function init() {
        $(document).on('page:beforeinit', function (e) {
            var page = e.detail.page;
            var controller = null;
            if(page.name.indexOf('autocomplete') === -1){
                var Controller = load(page.name);
                controller = new Controller();
                controller.renderView(page.query);
            }
        });

        eventos();
    }

    function load(controller) {

        var controllerName = S(S(controller).capitalize().s).camelize().s;
        return require('app/' + controller + '/'+ controllerName + 'Controller');
    }

    return {
        init: init,
        load: load
    };
}); 