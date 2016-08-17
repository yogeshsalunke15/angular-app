'use strict';

angular.module('demoApp')
    .controller('GooglemapCtrl', ['$scope','$state','$http','$rootScope', 'usSpinnerService', '$timeout',
        function($scope, $state, $http, $rootScope, usSpinnerService, $timeout){

    	var self = this;
    	self.state = $state.current;
       	self.map = { center: { latitude: 20.5937, longitude: 78.9629 }, zoom: 4 };
        self.marker = {
                  id: 0,
                  coords: {
                    latitude: 19.0176,
                    longitude: 72.8562
                  },
                  options: { draggable: true },
                  events: {
                    dragend: function (marker, eventName, args) {
                      $log.log('marker dragend');
                      var lat = marker.getPosition().lat();
                      var lon = marker.getPosition().lng();
                      $log.log(lat);
                      $log.log(lon);

                      self.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + self.marker.coords.latitude + ' ' + 'lon: ' + self.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                      };
                    }
                  }
    	};
        
    
}]);


