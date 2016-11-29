'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule','HotelServicesModule','HotelFilterModule']);
var resultsModule = angular.module('resultsModule',['app.config']);
var hotelServiceModules = angular.module('HotelServicesModule',[]);
var hotelFilters = angular.module('HotelFilterModule',[]);

hotelsResultsApp.config(['$interpolateProvider',
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    }]);