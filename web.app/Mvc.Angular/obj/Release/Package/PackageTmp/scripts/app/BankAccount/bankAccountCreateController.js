angular.module("cssApp").controller("bankAccountCreateController",
    ["alertService", "bankAccountService", "bankService",
        function (alertService, bankAccountService, bankService) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                bankService.getBanksDropdown()
                    .success(function(data) {
                        vm.banks = data.Banks;
                    });
                vm.title = "New Account";
            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };
            this.clearFields = function () {
                vm.AccountId = "";
                vm.AccountName = "";
                vm.AccountNickName = "";
                vm.AccountNumber = "";
                vm.AvailableBalance = "";
                vm.BankId = "";
            }
            this.saveAccount = function () {
                var account = {};
                account.AccountId = vm.AccountId;
                account.AccountName = vm.AccountName;
                account.AccountNickName = vm.AccountNickName;
                account.AccountNumber = vm.AccountNumber;
                account.AvailableBalance = vm.AvailableBalance;
                account.BankId = vm.BankId;

                bankAccountService.addBankAccount(account)
                    .success(function (data) {
                        if (data.ReturnStatus) {
                            vm.displaySuccessMessage(data.ReturnMessage);
                            vm.AccountId = data.AccountId;
                            vm.clearFields();
                        }
                        else {
                            vm.displayErrorMessage(data.ReturnMessage);
                            alertService.setValidationErrors(vm, data.ValidationErrors);
                        }
                    })
                    .error(function (error) {
                        vm.displayErrorMessage(error);
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
                vm.AccountNumberInputError = false;
                vm.BankInputError = false;
            }
        }])