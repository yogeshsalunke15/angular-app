'use strict';

angular.module('demoApp')
    .controller('GooglemapCtrl', ['$scope','$state','$http','$rootScope', 'usSpinnerService', '$timeout','$log','NgMap',
        function($scope, $state, $http, $rootScope, usSpinnerService, $timeout, $log, NgMap){

    	var self = this;
    	self.mapLocations = "";
    	//self.state = $state.current;

  		self.center = {lat:'20.5937', long:'78.9629'};
        self.showDirection = false;
        
        // self.getpos = function (event) {
        // 	alert("marker draged by user");
        // 	console.log("Inside Function of Drag Yogesh");
        // }
        self.addMarker = function () {alert("Yogesh Salunek");}
    	self.getDirection = function () {
    		self.showDirection = true;
    		self.mapLocations = {origin: self.source, destination:self.destination};
    	}
        
    
}]);


