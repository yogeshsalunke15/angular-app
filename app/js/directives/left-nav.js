'use strict';

angular.module('demoApp').
	directive('headerNav', function () {
		return {
			restrict: 'EA',
			replace: true,
            transclude: true,
            controller: 'NavCtrl as nav',
    		templateUrl: 'templates/header.html'
  		};
	});
	
angular.module('demoApp').
	directive('leftNav', function () {
		return {
			restrict: 'EA',
			replace: true,
            transclude: true,
            controller: 'NavCtrl as nav',
    		templateUrl: 'templates/left-nav.html'
  		};
	});

angular.module('demoApp').
	directive('footerNav', function () {
		return {
			restrict: 'EA',
			replace: true,
            transclude: true,
            controller: 'NavCtrl as nav',
    		templateUrl: 'templates/footer.html'
  		};
	});
