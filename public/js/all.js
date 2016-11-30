"use strict";var hotelsResultsApp=angular.module("hotelsResultsApp",["resultsModule","HotelServicesModule","HotelFilterModule","ngCookies","ngRoute"]),resultsModule=angular.module("resultsModule",["app.config"]),hotelServiceModules=angular.module("HotelServicesModule",[]),hotelFilters=angular.module("HotelFilterModule",[]);hotelsResultsApp.config(["$interpolateProvider",function(e){e.startSymbol("[[").endSymbol("]]")}]),hotelsResultsApp.run(["$rootScope","$cookies",function(e,t){t.put("token",window.token)}]),hotelsResultsApp.factory("httpRequestInterceptor",["$cookies",function(e){return{request:function(t){return t.headers.Authorization=e.get("token"),t}}}]),hotelsResultsApp.config(["$routeProvider","$locationProvider","$httpProvider",function(e,t,o){t.html5Mode(!0),o.interceptors.push("httpRequestInterceptor")}]),angular.module("app.config",[]).constant("EnvironmentConfig",{api:"http://localhost:9090"});var hotelServiceModules=angular.module("HotelServicesModule");hotelServiceModules.factory("HotelService",["$http","EnvironmentConfig",function(e,t){return{getHotelRate:function(){return e({method:"GET",url:t.api+"/v1/hotels"})}}}]);var hotelFilters=angular.module("hotelsResultsApp");hotelFilters.directive("nav",[function(){return{restrict:"EA",replace:!0,templateUrl:"/app/components/hotels/nav/nav.html",scope:{},controller:["$scope",function(e){e.menues=["Hoteles","Vuelos","Vuelo + Hotel","Paquetes","Disney","Escapadas","Seguros","Autos","Cruceros","OFERTAS","Más"]}],link:["scope","element","attrs","controllers",function(e,t,o,l){}]}}]);var resultsModule=angular.module("resultsModule");resultsModule.controller("HotelController",["$scope","HotelService",function(e,t){this.getHotelRate=function(){t.getHotelRate().then(function(t){console.log(t),e.hotels=t.data.hotels||[]}).catch(function(e){console.log(e)})},this.init=function(){this.getHotelRate()}}]);var hotelFilters=angular.module("HotelFilterModule");hotelFilters.directive("nameFilter",["HotelService",function(e){return{restrict:"E",replace:!0,templateUrl:"/app/components/hotels/filters/name-filter/name-filter.html",scope:{},controller:["$scope",function(e){var t=this;this.filter=function(){},e.$watch("search",function(o,l){var r={};null!==e.search&&"undefined"!=typeof e.search&&(r[e.key]=e.search),"undefined"!=typeof o&&null!==o&&o.length>3&&t.filter(r),null!==l&&""==o&&t.filter(r)},!0)}],link:["scope","element","attrs","controllers",function(e,t,o,l){}]}}]);var resultsModule=angular.module("resultsModule");resultsModule.directive("cluster",function(){return{restrict:"E",replace:!0,templateUrl:"/app/components/hotels/results/cluster/cluster.html",scope:{hotel:"="},controller:["$scope",function(e){console.log(e.hotel),e.stars=[];for(var t=0;t<e.hotel.stars;t++)e.stars.push(t)}],link:["scope","element","attrs","controllers",function(e,t,o,l){e.stars=[];for(var r=0;r<e.hotel.stars;r++)e.stars.push(r)}]}});
//# sourceMappingURL=all.js.map
