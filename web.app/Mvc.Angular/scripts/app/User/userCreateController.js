(function () {
    'use strict';
    angular
        .module('cssApp')
        .controller('userCreateController', userCreateController);
    userCreateController.$inject = ['userService', 'alertService', "roleService"];
    function userCreateController(userService, alertService, roleService) {
        var vm = this;
        this.initializeController = function () {
            vm.messageBox = "";
            vm.alerts = [];
            vm.title = "New User";
            vm.userMasterDetail = {};
            vm.user = {};
            vm.selectedRoles = [];
            // load all dropdown values here
            roleService.getRoles()
              .success(function (data) {
                  vm.roles = data.roles;
              });
        };
        this.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };

        this.clearValidationErrors = function () {
            vm.UserNameInputError = false;
            vm.PasswordInputError = false;
            vm.FirstNameInputError = false;
            vm.LastNameInputError = false;
        };
        this.displaySuccessMessage = function (msg) {
            vm.clearValidationErrors();
            alertService.renderSuccessMessage(msg);
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
        };
        this.displayErrorMessage = function (msg) {
            vm.clearValidationErrors();
            alertService.renderErrorMessage(msg);
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
        };
        this.saveUser = function () {
            var userRoles = [];
            $.each(vm.selectedRoles,
                function (key, val) {
                    userRoles.push({ RoleId: val });
                });
            vm.userMasterDetail.Roles = userRoles;
            userService.addUser(vm.userMasterDetail)
                .success(function (data) {
                    if (data.ReturnStatus) {
                        vm.displaySuccessMessage(data.ReturnMessage);
                        vm.UserMasterId = data.UserMasterId;
                    } else {
                        vm.displayErrorMessage(data.ReturnMessage);
                        alertService.setValidationErrors(vm, data.ValidationErrors);
                    }
                })
                .error(function (error) {
                    displayErrorMessage(error);
                });
        };

        this.toggleSelection = function (selectedArr, id) {
            var idx = selectedArr.indexOf(id);
            if (idx > -1) {
                selectedArr.splice(idx, 1);
            } else {
                selectedArr.push(id);
            }
        };
    }
})();