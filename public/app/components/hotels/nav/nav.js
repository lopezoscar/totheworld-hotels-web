var hotelFilters = angular.module('hotelsResultsApp');

hotelFilters.directive('nav',[function() {
    return {
        restrict:'EA'
        ,replace:true
        ,templateUrl:'/app/components/hotels/nav/nav.html'
        ,scope:{

        }
        ,controller: ['$scope', function($scope){
            $scope.menues = [
                'Hoteles',
                'Vuelos',
                'Vuelo + Hotel',
                'Paquetes',
                'Disney',
                'Escapadas',
                'Seguros',
                'Autos',
                'Cruceros',
                'OFERTAS',
                'Más'
            ]
        }]
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {

        }]
    }
}]);