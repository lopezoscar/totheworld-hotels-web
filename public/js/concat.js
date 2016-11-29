'use strict';


var hotelsResultsApp = angular.module('hotelsResultsApp',['resultsModule','HotelServicesModule']);
var resultsModule = angular.module('resultsModule',['app.config']);
var hotelServiceModules = angular.module('HotelServicesModule',[]);

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

