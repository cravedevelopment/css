angular.module("cssApp")
    .controller('bankTransferInstructionEditController',
    ['alertService', 'bankTransferInstructionService', "$stateParams", "bankAccountService",
        function (alertService, bankTranserInstructionService, $stateParams, bankAccountService) {
            "use strict";
            var vm = this;
            vm.popupDateTransfered = {};
            vm.popupTransactionDate = {};
            vm.popupVerifiedDate = {};
            this.initializeController = function () {
                vm.popupDateTransfered = { opened: false };
                vm.popupVerifiedDate = { opened: false };
                vm.messageBox = "";
                vm.alerts = [];
                var instructionId = ($stateParams.id || "");
                vm.title = "Update Instruction Details";
                vm.InstructionId = instructionId;
                vm.transStatus = [
                    {
                        "StatusId": 1,
                        "Status": "Pending"
                    },
                    {
                        "StatusId": 2,
                        "Status": "Settled"
                    },
                    {
                        "StatusId": 3,
                        "Status": "Verified"
                    }
                ];

                bankTranserInstructionService.getTransferInstruction(instructionId)
                    .success(function (data) {
                        vm.Id = data.BankTransferInstruction.Id;
                        vm.BankSourceId = data.BankTransferInstruction.BankSourceId;
                        vm.BankDestinationId = data.BankTransferInstruction.BankDestinationId;
                        vm.BankSourceCode = data.BankTransferInstruction.BankSourceCode;
                        vm.BankDestinationCode = data.BankTransferInstruction.BankDestinationCode;

                        bankAccountService.getBankAccount(data.BankTransferInstruction.AccountId).success(function (data) {
                            vm.SourceAccount = data.BankAccount;
                            console.log(data);
                        });

                        bankAccountService.getBankAccount(data.BankTransferInstruction.P2PUserAccountId).success(function (data) {
                            vm.DestinationAccount = data.BankAccount;
                        });

                        vm.Amount = data.BankTransferInstruction.Amount;
                        vm.TransactionNumber = data.BankTransferInstruction.TransactionNumber;
                        vm.AccountId = data.BankTransferInstruction.AccountId;
                        vm.P2PUserAccountId = data.BankTransferInstruction.P2PUserAccountId;
                        vm.P2PLendingRefNo = data.BankTransferInstruction.P2PLendingRefNo;
                        vm.Status = data.BankTransferInstruction.Status;
                        vm.DateTransferred = vm.formatDate(data.BankTransferInstruction.DateTransferred);
                        vm.DateCreated = data.BankTransferInstruction.DateCreated;
                        vm.CreatedBy = data.BankTransferInstruction.CreatedBy;
                        vm.Remarks = data.BankTransferInstruction.Remarks;
                        vm.StatusId = data.BankTransferInstruction.Status;
                        vm.AmountVerified = data.BankTransferInstruction.AmountVerified;
                        vm.VerifiedDate = vm.formatDate(data.BankTransferInstruction.VerifiedDate);
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });

                this.closeAlert = function (index) {
                    vm.alerts.splice(index, 1);
                };

                this.saveInstruction = function () {
                    var instruction = {};
                    instruction.Id = vm.Id;
                    instruction.BankSourceId = vm.BankSourceId;
                    instruction.BankDestinationId = vm.BankDestinationId;

                    instruction.TransactionNumber = vm.TransactionNumber;
                    instruction.BankSourceCode = vm.BankSourceCode;
                    instruction.BankDestinationCode = vm.BankDestinationCode;
                    instruction.Amount = vm.Amount;
                    instruction.TransactionNumber = vm.TransactionNumber;
                    instruction.AccountId = vm.AccountId;
                    instruction.P2PUserAccountId = vm.P2PUserAccountId;
                    instruction.P2PLendingRefNo = vm.P2PLendingRefNo;
                    instruction.Status = vm.Status;
                    instruction.DateTransferred = vm.DateTransferred;
                    instruction.DateCreated = vm.DateCreated;
                    instruction.CreatedBy = vm.CreatedBy;
                    instruction.Remarks = vm.Remarks;
                    instruction.Status = vm.StatusId;
                    instruction.DateTransferred = vm.DateTransferred;
                    instruction.VerifiedDate = vm.VerifiedDate;
                    instruction.AmountVerified = vm.AmountVerified;

                    bankTranserInstructionService.updateInstruction(instruction)
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
                this.openDateTransfered = function () {
                    vm.popupDateTransfered.opened = true;
                   
                };
                this.openVerifiedDate = function() {
                    vm.popupVerifiedDate.opened = true;
                }

                this.formatDate = function (date) {
                    if (date != null) {
                        var dateOut = new Date(date);
                        return dateOut;
                    }
                    return null;
                };
            }
        }]);
