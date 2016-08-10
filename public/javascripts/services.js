'use strict';

angular.module('buscaCochesApp')
    .constant('baseURL', 'http://localhost:3004/cochesTest')
    .service('menuFactory', ['$http', 'baseURL',
        function($http,baseURL) {
            this.getCoches = function() {
                return $http.get(baseURL)
            };
        }
    ]);