angular.module("cssApp")
    .controller("bankEditController", ["alertService", "bankService", "$stateParams",
        function (alertService, bankService, $stateParams) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                var bankId = ($stateParams.id || "");
                vm.title = "Bank Maintenance";
                vm.BankId = bankId;
                bankService.getBank(bankId).success(function (data) {
                    vm.BankId = data.Bank.BankId;
                    vm.BankCode = data.Bank.BankCode;
                    vm.BankName = data.Bank.BankName;
                }).error(function (error) {
                    alertService.RenderErrorMessage(error.ReturnMessage);
                });
            };

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.saveBank = function () {
                var bank = {};
                bank.BankId = vm.BankId;
                bank.BankCode = vm.BankCode;
                bank.BankName = vm.BankName;

                bankService.updateBank(bank).success(function (data) {
                    if (data.ReturnStatus) {
                        vm.displaySuccessMessage(data.ReturnMessage);
                    } else {
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
        }
    ]);