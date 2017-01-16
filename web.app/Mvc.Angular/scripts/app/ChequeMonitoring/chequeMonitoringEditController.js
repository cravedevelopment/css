angular.module("cssApp").controller("chequeMonitoringEditController",
    ["alertService", "chequeMonitoringService", "$stateParams", "bankService",
        function (alertService, chequeMonitoringService, $stateParams, bankService) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                vm.title = "Cheque Maintenance";
                var chequeId = ($stateParams.id || "");
                vm.ChequeId = chequeId;
                chequeMonitoringService.getCheque(chequeId)
                    .success(function (data) {
                        vm.ChequeId = data.ChequeMonitoring.ChequeId;
                        vm.AccountNumber = data.ChequeMonitoring.AccountNumber;
                        vm.AccountName = data.ChequeMonitoring.AccountName;
                        vm.ChequeNumber = data.ChequeMonitoring.ChequeNumber;
                        vm.ChequeDate = data.ChequeMonitoring.ChequeDate;
                        vm.ChequeAmount = data.ChequeMonitoring.ChequeAmount;
                        vm.PayToTheOrderOf = data.ChequeMonitoring.PayToTheOrderOf;
                        vm.BankId = data.ChequeMonitoring.BankId;
                        vm.BranchName = data.ChequeMonitoring.BranchName;
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });
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
                chequeMonitoringService.updateCheque(cheque)
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
            this.clearValidationErrors = function() {
                vm.AccountNumberInputError = false;
                vm.BankInputError = false;
            };
            this.formatDate = function (date) {
                if (date != null) {
                    var dateOut = new Date(date);
                    return dateOut;
                }
                return null;
            };
        }])