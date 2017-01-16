angular.module("cssApp").controller("bankDepositInstructionCreateController",
    ["alertService", "bankDepositInstructionService", "bankService", "bankAccountService",
        function (alertService, bankDepositInstructionService, bankService, bankAccountService) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                vm.title = "New Bank Deposit Instruction";
                // bankAccountService.getBankAccountsDropdown()
                //     .success(function (data) {
                //         vm.bankAccounts = data.BankAccounts;
                //     });
                bankService.getBanksDropdown().success(function (data) {
                    vm.banks = data.Banks;
                });

                vm.transactionTypes = [{
                    "TypeId": 1,
                    "typeName": "Cash"
                }, {
                    "TypeId": 2,
                    "typeName": "Cheque"
                }
                ]
            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.saveInstrunc = function () {
                var instruction = {};
                // var bankSource = vm.SourceBankId.split("|");

                instruction.Id = vm.Id;
                instruction.ReferenceNo = vm.ReferenceNo;
                instruction.BankId = vm.Bank.BankId;
                instruction.DateDeposit = vm.DateDeposit;
                instruction.AccountNumber = vm.AccountNumber;
                instruction.AccountName = vm.AccountName;
                instruction.Amount = vm.Amount;
                instruction.DepositType = vm.TypeId;

                bankDepositInstructionService.addInstruction(instruction)
                    .success(function (data) {
                        if (data.ReturnStatus) {
                            vm.displaySuccessMessage(data.ReturnMessage);
                            vm.Id = data.Id;
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

            }
        }])