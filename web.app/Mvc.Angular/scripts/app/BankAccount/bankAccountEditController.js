angular.module("cssApp")
    .controller('bankAccountEditController',
    ['alertService', 'bankAccountService', "$stateParams", "bankService", "$q",
        function (alertService, bankAccountService, $stateParams, bankService, $q) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                var accountId = ($stateParams.id || "");
                bankService.getBanksDropdown()
                    .success(function(data) {
                        vm.banks = data.Banks;
                    });
                console.log(accountId);

                vm.title = "Account Maintenance";
                vm.AccountId = accountId;
                bankAccountService.getBankAccount(accountId)
                    .success(function (data) {
                        vm.AccountId = data.BankAccount.AccountId;
                        vm.AccountName = data.BankAccount.AccountName;
                        vm.AccountNickName = data.BankAccount.AccountNickName;
                        vm.AccountNumber = data.BankAccount.AccountNumber;
                        vm.AvailableBalance = data.BankAccount.AvailableBalance;
                        vm.BankId = data.BankAccount.BankId;
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });

                this.closeAlert = function (index) {
                    vm.alerts.splice(index, 1);
                };

                this.saveAccount = function () {
                    var account = {};
                    account.AccountId = vm.AccountId;
                    account.AccountName = vm.AccountName;
                    account.AccountNickName = vm.AccountNickName;
                    account.AccountNumber = vm.AccountNumber;
                    account.AvailableBalance = vm.AvailableBalance;
                    account.BankId = vm.BankId;

                    bankAccountService.updateBankAccount(account)
                        .success(function (data) {
                            if (data.ReturnStatus) {
                                vm.displaySuccessMessage(data.ReturnMessage);
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
                    vm.AccountId = data.AccountId;
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
            }
        }]);
