'use strict';

angular.module('demoApp').
	directive('leftNav', function () {
		return {
			restrict: 'EA',
			replace: true,
            transclude: true,
            //controller: 'NavCtrl as nav'
    		templateUrl: 'templates/left-nav.html'
  		};
	});