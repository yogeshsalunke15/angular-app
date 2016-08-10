'use strict';

angular.module('demoApp')
    .controller('NavCtrl', ['$scope','$http','$rootScope','homeService',
        function($scope, $http, $rootScope, homeService){

    	var self = this;
        self.dash_active = true;
        self.menu = 'dash';

        self.menuActive = function (selectedMenu) {
            self.menu = selectedMenu;
        }
}]);