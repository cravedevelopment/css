angular.module("cssApp").controller("chequeMonitoringCreateController",
    ["alertService", "chequeMonitoringService","bankService",
        function (alertService, chequeMonitoringService, bankService) {
            "use strict";
            var vm = this;
            vm.popupChequeDate = {};
            this.initializeController = function () {
                vm.popupChequeDate = { opened: false };
                vm.messageBox = "";
                vm.alerts = [];
                vm.title = "New Cheque";
                bankService.getBanksDropdown()
                    .success(function(data) {
                        vm.banks = data.Banks;
                    });
            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.addCheque = function () {
                var cheque = {};
                cheque.AccountNumber = vm.AccountNumber;
                cheque.AccountName = vm.AccountName;
                cheque.ChequeNumber = vm.ChequeNumber;
                cheque.ChequeDate = vm.ChequeDate;
                cheque.ChequeAmount = vm.ChequeAmount;
                cheque.PayToTheOrderOf = vm.PayToTheOrderOf;
                cheque.Name = vm.Name;
                cheque.ChequeId = vm.ChequeId;
                cheque.BankId = vm.BankId;
                cheque.BranchName = vm.BranchName;

                chequeMonitoringService.addCheque(cheque)
                    .success(function (data) {
                        if (data.ReturnStatus) {
                            vm.displaySuccessMessage(data.ReturnMessage);
                            vm.ChequeId = data.ChequeId;
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
            this.openChequeDate = function () {
                vm.popupChequeDate.opened = true;
            };
        }])