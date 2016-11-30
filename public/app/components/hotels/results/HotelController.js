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