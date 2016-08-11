'use strict';

angular.module('demoApp')
    .controller('NavCtrl', ['$scope','$http','$rootScope','homeService',
        function($scope, $http, $rootScope, homeService){

    	var self = this;
        self.dash_active = true;
        self.menu = 'dash';
        self.menumin = false;

        self.menuActive = function (selectedMenu) {
            self.menu = selectedMenu;
        }
        
        self.toggleSidebar = function (){
        	if(self.menumin){
        		self.menumin = false;
        	}
        	else {
        		self.menumin = true;
        	}
        }

}]);