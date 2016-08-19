var express = require('express'),
    jsdom = require('jsdom'),
    request = require('request'),
    url = require('url'),
    broker = require('../middlewares/broker.js');
var router = express.Router();



router.get('/coches', function(req, res) {
    // GetResults tiene como parametros las opciones y un callback al que se llama que imprime los resultados
    driver = broker.getDriver('testDriver');
    console.log('ruta de busqueda: '+ req.query);
    // console.log('tenemos driver: '+driver);
    driver.getResults(
        //primero el callback
        function(resultados) {
            res.set('Content-Type', 'application/json');
            res.send(resultados);
        },
        //segundo los parametros debusqueda
        req.query);
});

router.get('/', function(req, res) {
    console.log('solicitada pagina principal');
    res.render('lista', {
        title: 'Welcome to buscacochesquetecagas'
    });
    //var items;
    //Tell the request that we want to fetch youtube.com, send the results to a callback function
    //solicitaWeb('http://www.coches.net/km-0/?MakeId=11&ModelId=427&OfferType=-1', res);
});

module.exports = router;