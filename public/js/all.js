"use strict";var hotelsResultsApp=angular.module("hotelsResultsApp",["resultsModule"]),resultsModule=angular.module("resultsModule",["app.config"]);angular.module("app.config",[]).constant("EnvironmentConfig",{API:"http://myproduction.com/api"});var hotelServiceModules=angular.module("HotelServicesModule",[]);hotelServiceModules.factory("HotelService",["$http",function(e){return{getHotelRate:function(e){}}}]);var resultsModule=angular.module("resultsModule");resultsModule.directive("cluster",[function(){return{restrict:"E",replace:!0,templateUrl:"/app/components/hotels/results/cluster/cluster.html",scope:{},controller:function(e){},link:function(e,t,l){}}}]);
//# sourceMappingURL=all.js.map