'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule','HotelServicesModule','HotelFilterModule']);
var resultsModule = angular.module('resultsModule',['app.config']);
var hotelServiceModules = angular.module('HotelServicesModule',[]);
var hotelFilters = angular.module('HotelFilterModule',[]);

hotelsResultsApp.config(['$interpolateProvider',
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }]);
angular.module("app.config", [])
.constant("EnvironmentConfig", {"api":"http://localhost:9090"});


var hotelServiceModules = angular.module('HotelServicesModule');

hotelServiceModules.factory('HotelService',['$http','EnvironmentConfig',function($http,EnvironmentConfig){
    
    return {
        getHotelRate: function(){
            return $http({
                method:'GET',
                url:EnvironmentConfig.api + "/v1/hotels"
            })
        }
    }
}]);
var hotelFilters = angular.module('hotelsResultsApp');

hotelFilters.directive('nav',[function() {
    return {
        restrict:'EA'
        ,replace:true
        ,templateUrl:'/app/components/hotels/nav/nav.html'
        ,scope:{

        }
        ,controller: ['$scope', function($scope){
            $scope.menues = [
                'Hoteles',
                'Vuelos',
                'Vuelo + Hotel',
                'Paquetes',
                'Disney',
                'Escapadas',
                'Seguros',
                'Autos',
                'Cruceros',
                'OFERTAS',
                'Más'
            ]
        }]
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {

        }]
    }
}]);
var resultsModule = angular.module('resultsModule');

resultsModule.controller('HotelController', ['$scope', 'HotelService', function ($scope, HotelService) {

    this.getHotelRate = function () {
        $scope.hotels = [
            {
                "_id": 1,
                "name": "Hotel Emperador",
                "stars": "3",
                "price": "1596"
            },
            {
                "_id": 2,
                "name": "Petit Palace San Bernardo",
                "stars": "4",
                "price": "2145"
            },
            {
                "_id": 3,
                "name": "Hotel Nuevo Boston",
                "stars": "2",
                "price": "861"
            }
        ];

        // HotelService.getHotelRate()
        //     .then(function (result) {
        //         console.log(result);
        //         $scope.hotels = [
        //             {
        //                 "name": "Hotel Emperador",
        //                 "stars": "3",
        //                 "price": "1596"
        //             },
        //             {
        //                 "name": "Petit Palace San Bernardo",
        //                 "stars": "4",
        //                 "price": "2145"
        //             },
        //             {
        //                 "name": "Hotel Nuevo Boston",
        //                 "stars": "2",
        //                 "price": "861"
        //             }
        //         ];
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //         $scope.hotels = [
        //             {
        //                 "name": "Hotel Emperador",
        //                 "stars": "3",
        //                 "price": "1596"
        //             },
        //             {
        //                 "name": "Petit Palace San Bernardo",
        //                 "stars": "4",
        //                 "price": "2145"
        //             },
        //             {
        //                 "name": "Hotel Nuevo Boston",
        //                 "stars": "2",
        //                 "price": "861"
        //             }
        //         ];
        //     })
    };

    this.init = function () {
        this.getHotelRate();
    }

}]);
var hotelFilters = angular.module('HotelFilterModule');

hotelFilters.directive('nameFilter',['HotelService',function(HotelService) {
    return {
        restrict:'E'
        ,replace:true
        ,templateUrl:'/app/components/hotels/filters/name-filter/name-filter.html'
        ,scope:{

        }
        ,controller: ['$scope',function($scope) {
            var _this = this;
            this.filter = function(hotelName) {
                //Call to HotelService
            }

            $scope.$watch('search', function (newVal, oldVal) {
                var opts = {};
                if ($scope.search !== null && typeof $scope.search !== "undefined") {
                    opts[$scope.key] = $scope.search;
                }
                if (typeof newVal !== "undefined" && newVal !== null && newVal.length > 3) {
                    _this.filter(opts);
                }
                if (oldVal !== null && newVal == "") {
                    _this.filter(opts);//Cuando no hay nada y vuelvo al inicio
                }
            }, true);
        }]
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {

        }]
    }
}]);

var resultsModule = angular.module('resultsModule');

resultsModule.directive('cluster',[function(){
    return {
        restrict:'E'
        ,replace:true
        ,templateUrl:'/app/components/hotels/results/cluster/cluster.html'
        ,scope:{
            hotel:'='
        }
        ,controller: function($scope){
            console.log($scope.hotel);
            $scope.stars = [];
            for(var i = 0; i < $scope.hotel.stars; i++){
                $scope.stars.push(i);
            }

        }
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {
            // Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.
            // https://docs.angularjs.org/guide/directive

            scope.stars = [];
            for(var i = 0; i < scope.hotel.stars; i++){
                scope.stars.push(i);
            }

            // console.log(scope.stars);
        }]
    }
}]);

