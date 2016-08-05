'use strict';

var demoApp = angular.module('demoApp', ['ui.bootstrap',
                                          'ui.router',
                                          'ngAnimate',
                                          'LocalStorageModule',
                                          'toastr',
                                          'angularSpinner'
                                        ]
                            );

demoApp.constant("httpConfig", {
        "serviceApi": "web_services/",
        "login": ""
  });

  demoApp.config(function ($stateProvider, $urlRouterProvider,localStorageServiceProvider, usSpinnerConfigProvider){

    localStorageServiceProvider.setPrefix('angularApp').
                                setStorageType('localStorage').
                                setNotify(true, true).
                                setStorageCookie(30, '/');;
    usSpinnerConfigProvider.setDefaults({ color: '#af2927'});

    $stateProvider
      .state('login', {
          url: '/',
          templateUrl: 'templates/login.html',
      })
      .state('register', {
          url: '/register',
          controller: 'AuthenticationCtrl as register',
          templateUrl: 'templates/register.html'
      })
      .state('dashboard', {
        url: "/dashboard",
        controller: 'DashboardCtrl as dash',
        templateUrl: "templates/dashboard.html",
        // resolve: {
        //   isLoggedIn: isLoggedIn
        // }
      })
      .state('contact', {
        url: "/contact",
        templateUrl: "templates/contact.html",
        resolve: {
          isLoggedIn: isLoggedIn
        }
      });

    $urlRouterProvider.otherwise('/');

    /**
      * @name isLoggedIn
      * @desc check for user log in
      * @param
      * @returns deferred.promise
      */
    function isLoggedIn ($q, $location, localStorageService) {
      var deferred = $q.defer();
      var token = localStorageService.get('loginToken');
        if(token){
          deferred.resolve();
        }
        else {
          $location.path('/login');
        }
        return deferred.promise;
    }

  });