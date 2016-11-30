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