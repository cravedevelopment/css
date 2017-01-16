angular.module("cssApp")
    .controller("bankCreateController", ["alertService", "bankService",
        function (alertService, bankService) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                vm.title = "New Bank";
            };

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.saveBank = function () {
                var bank = {};
                bank.BankId = vm.BankId;
                bank.BankCode = vm.BankCode;
                bank.BankName = vm.BankName;

                bankService.addBank(bank).success(function (data) {
                    if (data.ReturnStatus) {
                        vm.displaySuccessMessage(data.ReturnMessage);
                        vm.BankId = data.BankId;
                    }
                    else {
                        vm.displayErrorMessage(data.ReturnMessage);
                        alertService.setValidationErrors(vm, data.ValidationErrors);
                    }
                }).error(function (error) {
                    vm.displayErrorMessage(error);
                });
            };

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
                vm.BankCodeInputError = false;
                vm.BankNameInputError = false;
            }
        }]);