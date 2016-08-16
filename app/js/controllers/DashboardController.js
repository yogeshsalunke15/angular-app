'use strict';

angular.module('demoApp')
    .controller('DashboardCtrl', ['$scope','$http','$rootScope','homeService','$log', 'usSpinnerService', '$timeout',
        function($scope, $http, $rootScope, homeService, $log, usSpinnerService, $timeout){

    	var self = this;
        $rootScope.bodybg = 'none';
        self.homespn = true;
       
        /* factory service call */
        homeService.dashboard().then(function(data){
            //$log.log(data);
            $timeout(function () {
                self.homespn = false;
                self.homedata = data;
            }, 2000);
        });
        
        $scope.map = { center: { latitude: 20.5937, longitude: 78.9629 }, zoom: 4 };
        $scope.marker = {
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

                      $scope.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                      };
                    }
                  }
    };
        
    
}]);


