'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule']);
var resultsModule = angular.module('resultsModule',['app.config']);


var hotelServiceModules = angular.module('HotelServicesModule',[]);

hotelServiceModules.factory('HotelService',['$http',,function($http){
    
    return {
        getHotelRate:[function(){

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

        },
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {
            // Best Practice: use controller when you want to expose an API to other directives. Otherwise use link.
            // https://docs.angularjs.org/guide/directive
        }]
    }
}]);

