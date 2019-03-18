define(['ractive', 'jquery'], function (Ractive, $) {
    return Ractive.extend({
        configurarComandoVoz: function () {
            var me = this;
            this.started = false;
            var onDeviceReady = function () {
                me.recognition = new SpeechRecognition();
                me.recognition.lang = "pt-BR";
                me.recognition.onresult = function (event) {
                    if (event.results.length > 0) {
                        var txt = me.get(me.destino);
                        txt = txt || "";
                        txt += " ";
                        txt += event.results[0][0].transcript;
                        me.set(me.destino, txt);
                    }
                };
                me.recognition.onstart = function () {
                    $(me.btnMic).removeClass('color-gray');
                    $(me.btnMic).addClass('color-red');
                };
                me.recognition.onend = function () {
                    me.started = false;
                    $(me.btnMic).removeClass('color-red');
                    $(me.btnMic).addClass('color-gray');
                }
            };
            document.addEventListener('deviceready', onDeviceReady, false);

        },
        transcrever: function (btnMic, destino) {
            if (!this.started) {
                this.destino = destino;
                this.btnMic = btnMic;
                this.recognition.start();
                this.started = true;
            } else {
                this.recognition.stop();
            }

        },
        removerTexto: function (destino) {
            var app = require('app/app');
            var me = this;
            app.f7.confirm('Remover texto?','Atenção', function () {
                me.set(destino, null);
            });

        }
    });
});