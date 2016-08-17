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

// funcion para aplanar el array de resultados
function aplanaCoches(total, e) {
    return total += '"' + e.marca + '";"' + e.modelo + '";"' + e.precio + '";"' + e.ciudad + '";"' + e.combustible + '";"' + e.year + '";"' + e.enlace + '";"' + e.kilometros + '";"' + e.vidaPorDelante + '";"' + e.costeAnual + '"\n';
}

// Funcion principal que recoge la ruta coches
router.get('/coches', function(req, res) {
    res.render('lista',{
        title: 'Welcome to buscacochesquetecagas'
    });
    //var items;
    //Tell the request that we want to fetch youtube.com, send the results to a callback function
    //solicitaWeb('http://www.coches.net/km-0/?MakeId=11&ModelId=427&OfferType=-1', res);
});

module.exports = router;