'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule','HotelServicesModule','HotelFilterModule','ngCookies','ngRoute']);
var resultsModule = angular.module('resultsModule',['app.config']);
var hotelServiceModules = angular.module('HotelServicesModule',[]);
var hotelFilters = angular.module('HotelFilterModule',[]);

hotelsResultsApp.config(['$interpolateProvider',
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }]);

hotelsResultsApp.run(["$rootScope","$cookies", function ($rootScope,$cookies) {

    // AuthService.auth().then(function (result) {
        $cookies.put('token',window.token);//TODO Check if the token exists and it is correct.
    // }, function (err) {
    //     console.log("No se encuentra al usuario", err);
    // });

}]);
//
hotelsResultsApp.factory('httpRequestInterceptor', ["$cookies", function ($cookies) {
    return {
        request: function (config) {
            config.headers['Authorization'] = $cookies.get('token');
            return config;
        }
    };
}]);

hotelsResultsApp.config(['$routeProvider', '$locationProvider', "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);
angular.module("app.config", [])
.constant("EnvironmentConfig", {"api":"http://localhost:9090"});

var hotelServiceModules = angular.module('HotelServicesModule');

hotelServiceModules.factory('AuthService',['$http','EnvironmentConfig',function($http,EnvironmentConfig){

    return {
        auth: function(){
            return $http({
                method:'GET',
                url:"/v2/auth"
            });
        }
    }
}]);

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
        
        HotelService.getHotelRate()
            .then(function (result) {
                console.log(result);
                $scope.hotels = result.data.hotels || [];
            })
            .catch(function (err) {
                console.log(err);
            })
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

