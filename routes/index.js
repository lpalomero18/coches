var express = require('express'),
    jsdom = require('jsdom'),
    request = require('request'),
    url = require('url');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//funcion que extrae los coches de un html de coches.net
// primer parametro es un array de coches
// segundo parametro error
// tercer parametro el body procesado por jsdom
function extraeCochesCochesPuntoNet(coches, err, window) {
    //Use jQuery just as in a regular HTML page

    var $ = window.jQuery;
    var $tarjetas = $('.mt-Card-body')
    return coches.concat($tarjetas.map(function(i, item) {
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
        coche.vidaPorDelante = Math.min(Math.round((200000 - coche.kilometros) / 15000), 12 + coche.year - 2016);
        coche.costeAnual = Math.round(coche.precio / coche.vidaPorDelante.toFixed(0));
        return coche;
    }).get());
}
// funcion para aplanar el array de resultados
function aplanaCoches(total, e) {
    return total += '"' + e.marca + '";"' + e.modelo + '";"' + e.precio + '";"' + e.ciudad + '";"' + e.combustible + '";"' + e.year + '";"' + e.enlace + '";"' + e.kilometros + '";"' + e.vidaPorDelante + '";"' + e.costeAnual + '"\n';
}
// funcion que solicita una web
function solicitaWeb(url, res, pagina, items) {
    pagina = pagina || 1;
    items = items || [{
        marca: 'marca',
        modelo: 'modelo',
        precio: 'precio',
        ciudad: 'ciudad',
        combustible: 'combustible',
        year: 'year',
        enlace: 'enlace',
        kilometros: 'kilometros',
        vidaPorDelante: 'vidaPorDelante',
        costeAnual: 'costeAnual'
    }];
    console.log('Procesando página ' + pagina);
    request({
            uri: url + '&pg=' + pagina
        },
        function(err, req, body) {
            if (err /* &&  response.statusCode !== 200*/) {
                console.log('Request error.');
                res.render('error', {message: 'Oops, something happened', error:err});
                return;
            }
            //Send the body param as the HTML code we will parse in jsdom
            //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
            jsdom.env({
                html: body,
                scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
                done: function(err, window) {
                    items = items.concat(extraeCochesCochesPuntoNet([], err, window));
                    console.log('Ya tengo ' + items.length + ' en la barriga.');
                    if (pagina <= 0) {
                        solicitaWeb(url, res, ++pagina, items)
                    } else {
                        //retorno = items.reduce(aplanaCoches,"");
                        //res.end(retorno);
                        res.render('lista', {
                            title: 'Lista de coches',
                            elementos: items
                        });
                    }
                }

            });
        }
    );
}
// Funcion principal que recoge la ruta coches
router.get('/coches', function(req, res) {
    var items;
    //Tell the request that we want to fetch youtube.com, send the results to a callback function
    solicitaWeb('http://www.coches.net/km-0/?MakeId=11&ModelId=427&OfferType=-1', res);
});

module.exports = router;