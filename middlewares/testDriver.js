var request = require('request'),
    url = require('url');

var exports = module.exports = {};
var webs = ['http://localhost:3004/cochesTest1'];
exports.test = function() {
    console.log('Driver cargado crrectamente');
};



// Función principal que devuelve un promise. params son los parametros de busqueda
exports.getResults = function(callback, options) {

    iWantManyWebs(webs)
        .then(function(exito) {
                console.log('Ha habido exito, llamamos al callback de routes/index.js!');

                retorno = JSON.parse(exito).filter(function(item) {
                        // console.log('Filtro: item.precio > options[filtro] = ' + item.precio + '>' + options.pastaMin);
                        return (item.precio > (options.pastaMin || 0)) &&
                            (isNaN(options.pastaMax) || (item.precio < options.pastaMax)) &&
                            (item.age > (options.ageMin || 0)) &&
                            (isNaN(options.ageMax) || (item.age < options.ageMax));
                            });
                        console.log('Retornados ' + retorno.length + ' resultados.');
                        callback(retorno);
                    },
                    function(error) {
                        console.log(error);
                    });
            };

            function iWantManyWebs(urls, resultados) {
                resultados = resultados || "";
                return new Promise(function(fulfill, reject) {
                    iWantAWeb(urls[0]).then(
                        function(exito) {
                            if (urls.length > 1) {
                                fulfill(iWantManyWebs(urls.slice(1), resultados + " |+| " + exito));
                            } else {
                                fulfill(resultados + " " + exito);
                            }
                        },
                        function(error) {
                            reject(error);
                        });
                });
            }

            function iWantAWeb(url) {
                console.log('LOG 3. Requesting: ' + url);
                return new Promise(function(fulfill, reject) {
                    request({
                            uri: url
                        },
                        function(err, req, body) {
                            if (err /* &&  response.statusCode !== 200*/ ) {
                                reject('Oops, something happened requesting ' + url);
                            }
                            fulfill(body);
                        });
                });
            }