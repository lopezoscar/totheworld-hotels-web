'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule']);
var resultsModule = angular.module('resultsModule',['app.config']);

angular.module("app.config", [])
.constant("EnvironmentConfig", {"API":"http://myproduction.com/api"});


var hotelServiceModules = angular.module('HotelServicesModule',[]);

hotelServiceModules.factory('HotelService',['$http',function($http){
    
    return {
        getHotelRate: function(params){
            
        }
    }
}]);

var resultsModule = angular.module('resultsModule');

resultsModule.directive('cluster',[function(){
    return {
        restrict:'E'
        ,replace:true
        ,templateUrl:'/app/components/hotels/results/cluster/cluster.html'
        ,scope:{

        }
        ,controller: function($scope){

        }
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: function(scope,element,attrs){

        }
    }
}]);

