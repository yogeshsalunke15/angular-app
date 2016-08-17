'use strict';

var demoApp = angular.module('demoApp', ['ui.bootstrap',
                                          'ui.router',
                                          'ngAnimate',
                                          'LocalStorageModule',
                                          'toastr',
                                          'angularSpinner',
                                          'ngMap'
                                        ]
                            );

demoApp.constant("httpConfig", {
        "serviceApi": "web_services/",
        "images" : "../images",
        "login": ""
  });

  demoApp.config(function ($stateProvider, $urlRouterProvider,localStorageServiceProvider, 
                            usSpinnerConfigProvider){

    localStorageServiceProvider.setPrefix('angularApp').
                                setStorageType('sessionStorage').
                                setNotify(true, true).
                                setStorageCookie(30, '/');
                                
    usSpinnerConfigProvider.setDefaults({ color: '#af2927'});

    $stateProvider
      .state('login', {
          url: '/',
          templateUrl: 'templates/login.html',
           resolve: {
            onLogin: onLogin
          }
      })
      .state('register', {
          url: '/register',
          controller: 'AuthenticationCtrl as register',
          templateUrl: 'templates/register.html',
          resolve: {
              onLogin: onLogin
            }
      })
      .state('dashboard', {
        url: "/dashboard",
        controller: 'DashboardCtrl as dash',
        templateUrl: "templates/dashboard.html",
        resolve: {
          isLoggedIn: isLoggedIn
        }
      })
      .state('googlemap', {
        url: "/googlemap",
        controller: 'GooglemapCtrl as gmap',
        templateUrl: "templates/map.html",
        resolve: {
          isLoggedIn: isLoggedIn
        }
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

    function onLogin ($rootScope) {
      $rootScope.bodybg = 'bodybg';
    }

  });