var resultsModule = angular.module('resultsModule');

resultsModule.controller('HotelController', ['$scope', 'HotelService', function ($scope, HotelService) {

    this.getHotelRate = function () {
        $scope.hotels = [
            {
                "name": "Hotel Emperador",
                "stars": "3",
                "price": "1596"
            },
            {
                "name": "Petit Palace San Bernardo",
                "stars": "4",
                "price": "2145"
            },
            {
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