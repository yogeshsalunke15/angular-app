'use strict';

angular.module('demoApp')
    .controller('AuthenticationCtrl', ['$scope','$state','localStorageService','$rootScope','toastr','usSpinnerService','$timeout', 
        function($scope, $state, localStorageService, $rootScope, toastr, usSpinnerService, $timeout){
        
            var self = this;
            self.username="";
            self.password="";
            self.loginspn = false;
            $rootScope.bodybg = 'bodybg';

            self.login = function () {

                if(angular.isDefined(self.username) && angular.isDefined(self.password)){

                        if(self.username.length == 0 || self.password.trim().length == 0){
                            toastr.error('Empty value or only spaces are not accepted !',{
                                    closeButton:true,
                                    timeOut: 4000
                                });
                            return;      
                        }
                        self.username = self.username;
                        self.password = self.password;
                        self.loginspn = true;
                        var randomToken = self.token();
                        var dateToken = new Date();
                        dateToken = Date.parse(dateToken);
                        var loginToken = randomToken+dateToken;
                        localStorageService.set('loginToken', loginToken);
                        $timeout(function () {
                            self.loginspn = false;
                            toastr.success('You have logged in successfully !',{
                                closeButton:true,
                                timeOut: 4000
                            });
                            $state.go('dashboard');
                        }, 1000);

                }
                else {

                    toastr.error('All fields are compulsory !',{
                            closeButton:true,
                            timeOut: 4000
                        });
                }
            }

            self.register = function (){

                if(angular.isDefined(self.name) && angular.isDefined(self.username) && angular.isDefined(self.password) && angular.isDefined(self.email)){
                    console.log(self.password);
                    if(self.name.length == 0 || self.username.length == 0 || self.password.trim().length == 0 || self.email.length == 0){
                            toastr.error('Empty value or only spaces are not accepted !',{
                                    closeButton:true,
                                    timeOut: 4000
                                });
                            return;      
                    }
                    self.loginspn = true;
                    var randomToken = self.token();
                    var dateToken = new Date();
                    dateToken = Date.parse(dateToken);
                    var loginToken = randomToken+dateToken;
                    localStorageService.set('loginToken', loginToken);
                    $timeout(function () {
                            self.loginspn = false;
                            toastr.success('You have registered successfully !',{
                                closeButton:true,
                                timeOut: 4000
                            });
                            $state.go('home');
                        }, 1000);
                        
                }
                else {
                    toastr.error('All fields are compulsory !',{
                                closeButton:true,
                                timeOut: 4000
                            });   
                }
                
            }

            self.token = function () {
              return self.generatetoken() + self.generatetoken();
            };

            self.generatetoken = function () {
              return Math.random().toString(36).substr(2);
            };

    }]);
