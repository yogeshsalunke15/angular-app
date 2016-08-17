'use strict';

angular.module('demoApp')
    .controller('GooglemapCtrl', ['$scope','$state','$http','$rootScope', 'usSpinnerService', '$timeout','$log','NgMap',
        function($scope, $state, $http, $rootScope, usSpinnerService, $timeout, $log, NgMap){

    	var self = this;
    	//self.state = $state.current;
    	
    	/*Google map API Integration*/
    	NgMap.getMap().then(function(map) {
		    // console.log(map.getCenter());
		    // console.log('markers', map.markers);
		    // console.log('shapes', map.shapes);
		  });
    	
     
        
    
}]);


