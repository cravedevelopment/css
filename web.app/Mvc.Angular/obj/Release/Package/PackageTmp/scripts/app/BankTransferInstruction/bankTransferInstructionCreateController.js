angular.module("cssApp").controller("bankTransferInstructionCreateController",
    ["alertService", "bankTransferInstructionService", "bankService", "bankAccountService", "dateService",
        function (alertService, bankTransferInstructionService, bankService, bankAccountService, dateService) {
            "use strict";
            var vm = this;
            var bankAccountList = [];
            vm.popupDateTransfered = {};
            vm.popupTransactionDate = {};
            this.initializeController = function () {
                vm.popupDateTransfered = { opened: false };
                vm.popupTransactionDate = { opened: false };
                vm.messageBox = "";
                vm.alerts = [];
                vm.sourceAccounts = [];
                vm.title = "New Bank Transfer Instruction";
                bankAccountService.getBankAccountsDropdown()
                    .success(function (data) {
                        vm.sourceAccounts = data.BankAccounts;
                        vm.destinationAccounts = data.BankAccounts;
                        bankAccountList = data.BankAccounts;
                    });

            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.saveInstrunc = function () {
                var instruction = {};
                var bankDestination = vm.DestinationBankId.split("|");


                instruction.BankSourceId = vm.selectedBankAccount.BankId;
                instruction.BankDestinationId = bankDestination[0];
                instruction.Amount = vm.Amount;
                instruction.TransactionNumber = vm.TransactionNumber;
                instruction.AccountId = vm.selectedBankAccount.AccountId;
                instruction.P2PUserAccountId = bankDestination[1];
                instruction.P2PLendingRefNo = vm.P2PLendingRefNo;
                instruction.Status = vm.Status;
                instruction.DateCreated = vm.DateCreated;
                instruction.CreatedBy = vm.CreatedBy;
                instruction.Remarks = vm.Remarks;
                instruction.BankSourceCode = vm.selectedBankAccount.Bank.BankCode;
                instruction.BankDestinationCode = bankDestination[2];

                instruction.LenderId = vm.LenderId;
                instruction.BorrowerId = vm.BorrowerId;
                instruction.P2PTransactionNumber = vm.P2PTransactionNumber;
                instruction.TransactionDate = vm.TransactionDate;
                //instruction.DateTransferred = vm.DateTransferred;
                
                bankTransferInstructionService.addInstruction(instruction)
                    .success(function (data) {
                        if (data.ReturnStatus) {
                            vm.displaySuccessMessage(data.ReturnMessage);
                            vm.AccountId = data.AccountId;
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
                vm.AmmountInputInputError = false;
                vm.P2PLendingRefNoInputError = false;
            };
            this.sourceAccountChange = function (selectedItem) {
                var newDestinationAccounts = [];
                if (selectedItem) {
                    $.each(bankAccountList,
                        function (key, val) {
                            if (val.AccountId != selectedItem.AccountId)
                                newDestinationAccounts.push(val);
                        });
                }
                vm.destinationAccounts = newDestinationAccounts;
            };
            this.openTransactionDate = function () {
                vm.popupTransactionDate.opened = true;
                console.log("TA RUPAM!!!");
            };
            this.openDateTransfered = function () {
                vm.popupDateTransfered.opened = true;
            };
        }])