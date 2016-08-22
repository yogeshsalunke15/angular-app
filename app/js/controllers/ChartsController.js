'use strict';

angular.module('demoApp')
    .controller('ChartsCtrl', ['$scope','$state','$rootScope','httpConfig',
        function($scope, $state, $rootScope, httpConfig){

        var self = this;

        /*Pie Chart*/
        self.pielabels = ["Laravel", "Symfony", "CodeIgniter",'CakePHP','Zend Framework'];
  		self.piedata = [800, 200, 150,100,60];
  		self.piecolors = ['#F45C5B','#8085E9','#8D4654','#7699BF','#AAEEED'];
  		
  		/*Line Chart*/
		self.linelabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  		self.lineseries = ['Series A', 'Series B'];
		self.linedata = [ [65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90] ];
	  	self.linedatasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
		self.lineoptions = {
			    scales: {
			      yAxes: [
			        {
			          id: 'y-axis-1',
			          type: 'linear',
			          display: true,
			          position: 'left'
			        },
			        {
			          id: 'y-axis-2',
			          type: 'linear',
			          display: true,
			          position: 'right'
			        }
			      ]
			    }
			  };

		/*Bar Chart*/
		self.barlabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  		self.barseries = ['Series A', 'Series B'];
  		self.bardata = [[65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90]];

  		/*Mixed type chart*/
  		self.mixcolors = ['#45b7cd', '#ff6384', '#ff8e72'];
		self.mixlabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    	self.mixdata = [[65, -59, 80, 81, -56, 55, -40],[28, 48, -40, 19, 86, 27, 90]];
    	self.mixdatasetOverride = [
			      {
			        label: "Bar chart",
			        borderWidth: 1,
			        type: 'bar'
			      },
			      {
			        label: "Line chart",
			        borderWidth: 3,
			        hoverBackgroundColor: "rgba(255,99,132,0.4)",
			        hoverBorderColor: "rgba(255,99,132,1)",
			        type: 'line'
			      }
		    ];

		/* Angular Js SLider*/
		self.imageArray = [	httpConfig.images+'/slider1.jpg',
		  						httpConfig.images+'/slider2.jpg',
		  						httpConfig.images+'/slider3.jpg',
		  						httpConfig.images+'/slider4.jpg',
		  						httpConfig.images+'/slider5.jpg'
		  					];
		self.active = true;
		self.myInterval = 5000;
    }]);

