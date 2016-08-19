'use strict';

angular.module('demoApp')
    .controller('GooglemapCtrl', ['$scope','$state','$http','$rootScope', 'usSpinnerService','$log','NgMap',
        function($scope, $state, $http, $rootScope, usSpinnerService, $log, NgMap){

    	var self = this;
    	self.mapLocations = "";
    	//self.state = $state.current;
  		self.center = {lat:'20.5937', long:'78.9629'};
        self.showDirection = false;

    	self.getDirection = function () {
    /* Invoke google map api service for getting distance & time required to reach between source & destination*/
    		self.showDirection = true;
    		self.mapLocations = {origin: self.source, destination:self.destination};

    		var Gmapservice = new google.maps.DistanceMatrixService();
				Gmapservice.getDistanceMatrix({
			    origins: [self.source],
			    destinations: [self.destination],
			    travelMode: google.maps.TravelMode.DRIVING,
			    unitSystem: google.maps.UnitSystem.METRIC,
			    avoidHighways: false,
			    avoidTolls: false,
			  	}, distancecallback);

				function distancecallback(response, status) {
					if(status === 'OK'){ 
						self.distance = response.rows[0].elements[0].distance.text;
						self.time = response.rows[0].elements[0].duration.text;
					}
				}
    	}
    	
}]);


