var jsdom = require('jsdom'),
    request = require('request'),
    url = require('url'),
    Promise = require('promise');

var exports = module.exports = {};
const ruta='http://www.coches.net/';
 
/*
 * Function to extract the results from coches.net website. This is the function where a great deal of the page Business Logic is implemented
 * cwindow: the HTML window as parsed by jsdom.env()
 * 
 * return: the Array of results for the given winwod in the proper JSON format
 */
function extractCochesDotNet(window) {
    //Use jQuery just as in a regular HTML page
    var $ = window.jQuery;
    var $tarjetas = $('.mt-Card-body')
    // we map each of the '.mt-Card-body' elemets to a function that returns the JSON card
    return ($tarjetas.map(function(i, item) {
        var $atributos = $(item).find('.mt-CardAd-attributesList');
        titulo = $(item).find('.mt-CardAd-title').text().trim();
        var index = titulo.indexOf(" ")
        coche = {
            marca: titulo.substr(0, index),
            modelo: titulo.substr(index),
            precio: $(item).find('.mt-CardAd-price').text().replace('.', '').trim().substr(0, 5).trim(),
            ciudad: $($atributos.children('li')[0]).text().trim(),
            combustible: $($atributos.children('li')[1]).text().trim(),
            year: $($atributos.children('li')[2]).text().trim(),
            kilometros: $($atributos.children('li')[3]).text().replace(/km/i, '').replace('.', '').trim(),
            enlace: 'http://www.coches.net/' + $(item).find('a').attr('href')
        }
        return coche;
    }).get());
}
//
exports.getResults=function(options){
quieroMuchasWebs(webs).then(
    function(exito) {

//        console.log('EXITO: ' + exito);
        return exito;
    },
    function(error) {
//        console.log('ERROR');
        return error;

    });
}

function iWantAWeb(url) {
    console.log('LOG 3. Requesting: ' + url);
    return new Promise(function(fulfill, reject) {
        request({
                uri: url
            },
            function(err, req, body) {
//                console.log('LOG 3. Request callback for ' + url);
                if (err /* &&  response.statusCode !== 200*/ ) {
//                    console.log('LOG Request error.');
                    reject('Oops, something happened');
                }
                jsdom.env({
                    html: body,
                    scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
                    done: function(err, window) {
//                        console.log('LOG 4. Analizado jsdom.env() de ' + url);
                        fulfill(extraeTitle(window));

                    }

                });

            });
    });
}

function iWantManyWebs(urls, titulos) {
    titulos = titulos || "";
    return new Promise(function(fulfill, reject) {
        quieroUnaWeb(urls.shift()).then(
            function(exito) {
                if (urls.length > 0) {
                    fulfill(quieroMuchasWebs(urls, titulos+ " |+| " +exito));
                } else {
                    fulfill(titulos+ " " +exito);
                }
            }, function(error) {
                reject(error);
            });
    });
}