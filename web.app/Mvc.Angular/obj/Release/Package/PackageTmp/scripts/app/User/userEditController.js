(function () {
    'use strict';
    angular
        .module('cssApp')
        .controller('userEditController', userEditController);

    userEditController.$inject = ['userService', "alertService", "roleService", "$stateParams"];
    function userEditController(userService, alertService, roleService, $stateParams) {
        var vm = this;
        this.initializeController = function () {
            vm.messageBox = "";
            vm.alerts = [];
            var userId = ($stateParams.id || "");
            vm.title = "User Maintenance";
            vm.UserId = userId;

            userService.getUser(userId)
                .then(function (resp) {
                    vm.userMasterDetail = resp.data.UserMaster;
                    console.log(vm.userMasterDetail);
                    $.each(resp.data.UserMaster.Roles,
                        function (key, val) {
                            vm.selectedRoles.push(val.RoleId);
                        });
                });


            roleService.getRoles()
                .success(function (data) {
                    vm.roles = data.roles;
                });
        }
        vm.selectedRoles = [];
        this.clearValidationErrors = function () {
            vm.UserNameInputError = false;
            vm.PasswordInputError = false;
            vm.FirstNameInputError = false;
            vm.LastNameInputError = false;
        }
        this.displaySuccessMessage = function (msg) {
            vm.clearValidationErrors();
            alertService.renderSuccessMessage(msg);
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
            vm.UserId = data.UserId;
        }

        this.displayErrorMessage = function (msg) {
            vm.clearValidationErrors();
            alertService.renderErrorMessage(msg);
            vm.messageBox = alertService.returnFormattedMessage();
            vm.alerts = alertService.returnAlerts();
        }

        this.closeAlert = function (index) {
            vm.alerts.splice(index, 1);
        };
        this.saveUser = function () {
            var userRoles = [];
            $.each(vm.selectedRoles,
                function (key, val) {
                    userRoles.push({ RoleId: val, UserMasterId: vm.userMasterDetail.UserId });
                });
            vm.userMasterDetail.Roles = userRoles;
            userService.updateUser(vm.userMasterDetail)
                .success(function (data) {
                    if (data.ReturnStatus) {
                        vm.displaySuccessMessage(data.ReturnMessage);
                        vm.RequirementId = data.RequirementId;
                    } else {
                        vm.displayErrorMessage(data.ReturnMessage);
                        alertService.setValidationErrors(vm, data.ValidationErrors);
                    }
                });
        }
        this.toggleSelection = function (selectedArr, id) {
            var idx = selectedArr.indexOf(id);
            if (idx > -1) {
                selectedArr.splice(idx, 1);
            } else {
                selectedArr.push(id);
            }
            console.log(selectedArr);
        };
    }
})();