'use strict';
angular.module("buscaCochesApp", ['angular-bacon'])
    .controller('CochesController', function($scope) {

 
    	// Cuando se clica en el boton se invoca a esta funcion
        $scope.search = function() {
            //$scope.coches = [];
            var sources = ['http://localhost:5000/coches'];
            // Construimos un stream con las fuentes y los espaciamos unos segundos para no acogotar al servidor
            var filter = Bacon.sequentially(2000, sources);

            function buscaResultados(argument) {
                return Bacon.fromPromise($.ajax({
                    url: argument,
                    type: 'get',
                    data: $scope.formData
                }));
            }
            //flatMap para mapear las fuentes con la función que va a buscar resultados por ajax 
            //scan para concatenar los resultaros
            //digest para enlazar el observable con el $scope
            filter.flatMap(buscaResultados).scan([], function(a,b){return a.concat(b)}).digest($scope, 'coches');
        };

    })

;
