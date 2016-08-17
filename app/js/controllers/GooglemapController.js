'use strict';

angular.module('demoApp')
    .controller('GooglemapCtrl', ['$scope','$state','$http','$rootScope', 'usSpinnerService', '$timeout','$log','NgMap',
        function($scope, $state, $http, $rootScope, usSpinnerService, $timeout, $log, NgMap){

    	var self = this;
    	//self.state = $state.current;

    	//NgMap.getMap().then(function(map) {
		// });
  		self.center = {lat:'20.5937', long:'78.9629'};
  		$rootScope.directions = [
          {origin:"Palo Alto", destination:"Gilroy", panelName:"p1"},
          {origin:"San Jose", destination:"Mountain View", panelName:"p2"}
        ];
        self.mapDirection = true;
    	
     
        
    
}]);


