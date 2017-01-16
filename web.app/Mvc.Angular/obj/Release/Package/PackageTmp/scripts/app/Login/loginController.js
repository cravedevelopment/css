angular.module("cssApp")
    .controller("loginController",
    ["alertService", "loginService",'$rootScope','$state', '$stateParams',
        function (alertService, loginService, $rootScope, $state, $stateParams) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.alerts = [];
                vm.login = {};
            }
            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };
            this.loginAttempt = function () {
                var login = {};
                login.UsernameOrEmail = vm.UserName;
                login.Password = vm.Password;
                loginService.loginAttempt(login)
                    .success(function (data) {
                        if (data.ReturnStatus) {
                            window.location.href = "/home";
                            //$state.go("home");
                        } else {
                            vm.displayErrorMessage(data.ReturnMessage);
                            alertService.setValidationErrors(vm, data.ValidationErrors);
                        }
                    });
            }
            this.displaySuccessMessage = function (msg) {
                vm.clearValidationErrors();
                alertService.renderSuccessMessage(msg);
                vm.messageBox = alertService.returnFormattedMessage();
                vm.alerts = alertService.returnAlerts();
            }
            this.displayErrorMessage = function (msg) {
                vm.clearValidationErrors();
                alertService.renderErrorMessage(msg);
                vm.messageBox = alertService.returnFormattedMessage();
                vm.alerts = alertService.returnAlerts();
            }
            this.clearValidationErrors = function () {
                vm.UserNameInputError = false;
                vm.UserPasswordInputError = false;
            }
        }])