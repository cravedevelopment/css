angular.module("cssApp")
    .controller('bankDepositInstructionEditController',
    ['alertService', 'bankDepositInstructionService', "$stateParams", "bankService",
        function (alertService, bankDepositInstructionService, $stateParams, bankService) {
            "use strict";
            var vm = this;
            this.initializeController = function () {
                vm.messageBox = "";
                vm.alerts = [];
                var instructionId = ($stateParams.id || "");
                vm.title = "Update Deposit Instruction Details";
                vm.InstructionId = instructionId;
                vm.transactionTypes = [
                    {
                        "TypeId": 1,
                        "typeName": "Cash"
                    }, {
                        "TypeId": 2,
                        "typeName": "Cheque"
                    }
                ];

                 bankService.getBanksDropdown().success(function (data) {
                    vm.banks = data.Banks;
                });
                bankDepositInstructionService.getDepositInstruction(instructionId)
                    .success(function (data) {
                        vm.Id = data.BankDepositInstruction.Id;
                        vm.AccountNumber = data.BankDepositInstruction.AccountNumber;
                        vm.AccountName = data.BankDepositInstruction.AccountName;
                        vm.Amount = data.BankDepositInstruction.Amount;
                        vm.TypeId = data.BankDepositInstruction.DepositType;
                        vm.BankId = data.BankDepositInstruction.Bank.BankId;
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });

            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.saveInstruction = function () {
                var instruction = {};
                instruction.Id = vm.Id;
                instruction.AccountNumber = vm.AccountNumber;
                instruction.AccountName = vm.AccountName;
                instruction.Amount = vm.Amount;
                instruction.TypeId = vm.DepositType;
                instruction.DepositType = vm.TypeId;
                instruction.BankId = vm.BankId;
                bankDepositInstructionService.updateInstruction(instruction)
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
            }

        }]);
