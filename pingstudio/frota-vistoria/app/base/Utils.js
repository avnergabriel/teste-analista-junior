define(['jquery'], function ($) {
    return {
        obterSolicitacoesServicoVeiculo: function (params) {
            const app = require('app/app');
            var promise = new $.Deferred();
            $.getJSON(app.urlBase() + 'SolicitacaoServicoService/ObterSolicitacoesPorVeiculo', params, function (solicitacoesServico) {
                promise.resolve(solicitacoesServico);
            });

            return promise;

        },obterSolicitacoesServicoDefeito: function (params) {
            const app = require('app/app');
            var promise = new $.Deferred();
            $.getJSON(app.urlBase() + 'SolicitacaoServicoService/ObterSolicitacoesPorDefeito', params, function (solicitacoesServico) {
                promise.resolve(solicitacoesServico);
            });

            return promise;

        },
        trimCanvas: function trim(c) {
            var ctx = c.getContext('2d'),
                copy = document.createElement('canvas').getContext('2d'),
                pixels = ctx.getImageData(0, 0, c.width, c.height),
                l = pixels.data.length,
                i,
                bound = {
                    top: null,
                    left: null,
                    right: null,
                    bottom: null
                },
                x, y;

            for (i = 0; i < l; i += 4) {
                if (pixels.data[i+3] !== 0) {
                    x = (i / 4) % c.width;
                    y = ~~((i / 4) / c.width);

                    if (bound.top === null) {
                        bound.top = y;
                    }

                    if (bound.left === null) {
                        bound.left = x;
                    } else if (x < bound.left) {
                        bound.left = x;
                    }

                    if (bound.right === null) {
                        bound.right = x;
                    } else if (bound.right < x) {
                        bound.right = x;
                    }

                    if (bound.bottom === null) {
                        bound.bottom = y;
                    } else if (bound.bottom < y) {
                        bound.bottom = y;
                    }
                }
            }

            var trimHeight = bound.bottom - bound.top,
                trimWidth = bound.right - bound.left,
                trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

            copy.canvas.width = trimWidth;
            copy.canvas.height = trimHeight;
            copy.putImageData(trimmed, 0, 0);

            // open new window with trimmed image:
            return copy.canvas;
        },
        obterDescricaoRespostaVistoria: function (codigo) {
            var descricoes = {
                0: 'Não',
                1: 'Sim'
            };
            return descricoes[codigo];
        },
        base64Encode: function (file) {
            var readFile = function (fileEntry) {

                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function() {
                        console.log("Successful file read: " + this.result);
                        displayFileData(fileEntry.fullPath + ": " + this.result);
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);
            };

            var errorReadFile = function (err) {
                console.log("errorReadFile",err);
            };
            var errorLoadFile = function (err) {
                console.log("errorLoadFile",err);
            };

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

                console.log('file system open: ' + fs.name);
                fs.root.getFile(file, { create: false, exclusive: false }, readFile, errorReadFile);

            }, errorLoadFile);
        }
    }
});