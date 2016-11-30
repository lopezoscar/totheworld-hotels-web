var hotelFilters = angular.module('HotelFilterModule');

hotelFilters.directive('nameFilter',['HotelService',function(HotelService) {
    return {
        restrict:'E'
        ,replace:true
        ,templateUrl:'/app/components/hotels/filters/name-filter/name-filter.html'
        ,scope:{

        }
        ,controller: ['$scope',function($scope) {
            var _this = this;
            this.filter = function() {
                //Call to HotelService
            }

            $scope.$watch('search', function (newVal, oldVal) {
                var opts = {};
                if ($scope.search !== null && typeof $scope.search !== "undefined") {
                    opts[$scope.key] = $scope.search;
                }
                if (typeof newVal !== "undefined" && newVal !== null && newVal.length > 3) {
                    _this.filter(opts);
                }
                if (oldVal !== null && newVal == "") {
                    _this.filter(opts);//Cuando no hay nada y vuelvo al inicio
                }
            }, true);
        }]
        /**
         * http://stackoverflow.com/questions/15676614/directive-link-vs-compile-vs-controller
         **/
        ,link: ['scope', 'element', 'attrs', 'controllers', function(scope, element, attrs, controllers) {

        }]
    }
}]);