
var hotelServiceModules = angular.module('HotelServicesModule',[]);

hotelServiceModules.factory('HotelService',['$http',function($http){
    
    return {
        getHotelRate: function(params){
            
        }
    }
}]);