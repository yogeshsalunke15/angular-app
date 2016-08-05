 'use strict';

angular.module('demoApp').
    	factory('homeService', function($http, httpConfig) {
        	
      	return {
            		dashboard : function() {

	    						var promise = $http({ method: 'GET', url: httpConfig.serviceApi+'home.json'
									}).then(function (response) {
    									return response.data;								
  									}, function (response) {
    									return response.statusText;
  									});
  									
	    					return promise;
            		}

        		}
       
});
