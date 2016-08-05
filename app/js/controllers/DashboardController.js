'use strict';

angular.module('demoApp')
    .controller('DashboardCtrl', ['$scope','$http','$rootScope','homeService','$log', 'usSpinnerService', '$timeout',
        function($scope, $http, $rootScope, homeService, $log, usSpinnerService, $timeout){

    	var self = this;
        $rootScope.bodybg = 'none';
        self.homespn = true;
        self.testvariable = "Hello Yogesh";
        /* factory service call */
        homeService.dashboard().then(function(data){
            //$log.log(data);
            $timeout(function () {
                self.homespn = false;
                self.homedata = data;
            }, 5000);
        });

        
    
}]);


