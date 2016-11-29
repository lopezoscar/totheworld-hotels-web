
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