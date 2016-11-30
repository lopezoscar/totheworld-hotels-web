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