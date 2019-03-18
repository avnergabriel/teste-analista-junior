define(['app/base/View', 'ractive-loader!app/assinatura/assinatura-tpl.html', 'jquery', 'app/base/Utils'], function (View, template, $, Utils) {
    var position = 0;
    var ctx, color = "#000", x = 0, y = 0, z = 0, etch = 0;
    return View.extend({
        template: template,
        el: '.content-assinatura',
        watchID: null,
        onrender: function () {
            screen.orientation.lock('landscape');
        },
        oncomplete: function () {
            var me = this;
            $('.clear-canvas').on('click', function () {
                me.clearCanvas();
            });
            $('.save-canvas').on('click', function () {
                me.saveCanvas();
            });
            setTimeout(function () {
                me.config();
                me.newCanvas();
                me.startWatch();
                var $$ = Dom7;
                $$('.btn-assinatura').trigger("click");
            }, 1000);

        },
        clearCanvas: function () {
            var canvas = document.getElementById('canvas');
            var contexto = canvas.getContext('2d');
            contexto.clearRect(0,0, canvas.width, canvas.height);
        },
        saveCanvas: function () {
            var canvas = document.getElementById('canvas');
            canvas = Utils.trimCanvas(canvas);
            this.fire('saved', canvas.toDataURL());

        },
        newCanvas: function () {
            //define and resize canvas
            $("#content").height($(".content-assinatura").height());
            var canvas = '<canvas id="canvas" width="' + $('#content').width() + '" height="' + ($('#content').height()) + '"></canvas>';
            $("#content").html(canvas);

            // setup canvas
            ctx = document.getElementById("canvas").getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;

            // set starting point in center
            ctx.beginPath();

            // x = $('#canvas').width() / 2;
            // y = ($('#canvas').height() - 90) / 2;
            ctx.moveTo(x, y);

            // setup to trigger drawing on mouse or touch
            $("#canvas").drawTouch();
            $("#canvas").drawPointer();
            $("#canvas").drawMouse();
        },
        startWatch: function () {
            // Update acceleration every 1 seconds
            var options = {frequency: 100};
            this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

        },
        stopWatch: function () {
            if (this.watchID) {
                navigator.accelerometer.clearWatch(this.watchID);
                this.watchID = null;
            }

        },
        onSuccess: function (acceleration) {
            // for debug purpose to print out accelerometer values
            var element = document.getElementById('debug');
            element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                'Acceleration Y: ' + acceleration.y + '<br />' +
                'Acceleration Z: ' + acceleration.z;

            // hide the accelerometer aka etch on/off button
            $("#etch").show();

            if (!etch) {
                $("#etchHelp").fadeIn();
                stopWatch();
                return;
            }

            // draw based on accelerometer positions
            if (acceleration.x > 2 && Math.abs(acceleration.y) < 2) {
                if (x < 3) {
                    buzzDevice(1);
                    x = 3;
                }
                x = x - Math.abs(acceleration.x);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (acceleration.x < -2 && Math.abs(acceleration.y) < 2) {
                if (x > $(window).width() - 3) {
                    buzzDevice(2);
                    x = $(window).width() - 3;
                }
                x = x + Math.abs(acceleration.x);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (acceleration.y > 2 && Math.abs(acceleration.x) < 2) {
                if (y > $(window).height() - 93) {
                    buzzDevice(3);
                    y = $(window).height() - 93;
                }
                y = y + Math.abs(acceleration.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (acceleration.y < -2 && Math.abs(acceleration.x) < 2) {
                if (y < 3) {
                    buzzDevice(4);
                    y = 3;
                }
                y = y - Math.abs(acceleration.y);
                ctx.lineTo(x, y);
                ctx.stroke();
            }

        },
        onError: function () {
            document.getElementById('debug').innerHTML = 'ERROR';

        },
        buzzDevice: function (pos) {
            if (position !== pos) { // vibrate only once when boudary is reached at a position
                navigator.notification.vibrate(300);
                position = pos;
            }

        },
        config: function () {
            $.fn.drawTouch = function () {
                var start = function (e) {
                    var touches = e.changedTouches;
                    e.preventDefault();
                    for(var i = 0; i < touches.length; i++){
                        ctx.beginPath();
                        ctx.fillRect(touches[i].pageX, touches[i].pageY, 3,3);  // a circle at the start
                        x = touches[i].pageX;
                        y = touches[i].pageY;
                        ctx.moveTo(x,y);
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                };
                var move = function (e) {
                    e.preventDefault();
                    e = e.originalEvent;
                    x = e.changedTouches[0].pageX;
                    y = e.changedTouches[0].pageY;
                    ctx.lineTo(x, y);
                    ctx.lineWidth = 2;
                    ctx.stroke();
                };
                $(this).on("touchstart", start);
                $(this).on("touchmove", move);
            };

            // prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
            $.fn.drawPointer = function () {
                var start = function (e) {
                    e = e.originalEvent;
                    ctx.beginPath();
                    x = e.pageX;
                    y = e.pageY;
                    ctx.moveTo(x, y);
                };
                var move = function (e) {
                    e.preventDefault();
                    e = e.originalEvent;
                    x = e.pageX;
                    y = e.pageY;
                    ctx.lineTo(x, y);
                    ctx.stroke();
                };
                $(this).on("MSPointerDown", start);
                $(this).on("MSPointerMove", move);
            };
            // prototype to	start drawing on mouse using canvas moveTo and lineTo
            $.fn.drawMouse = function () {
                var clicked = 0;
                var start = function (e) {
                    clicked = 1;
                    ctx.beginPath();
                    x = e.pageX;
                    y = e.pageY;
                    ctx.moveTo(x, y);
                };
                var move = function (e) {
                    if (clicked) {
                        x = e.pageX;
                        y = e.pageY;
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }
                };
                var stop = function (e) {
                    clicked = 0;
                };
                $(this).on("mousedown", start);
                $(this).on("mousemove", move);
                $(window).on("mouseup", stop);
            };
        }
    })
});