angular.module("cssApp")
    .controller('bankTransactionEditController',
    ['alertService', 'bankTransactionService', "$stateParams", "dateService",
        function (alertService, bankTransactionService, $stateParams, dateService) {
            "use strict";
            var vm = this;
            vm.popupPostingDate = {};
            vm.popupDateVerified = {};
            this.initializeController = function () {
                vm.popupPostingDate = { opened: false };
                vm.popupDateVerified = { opened: false };
                vm.messageBox = "";
                vm.alerts = [];
                var transId = ($stateParams.id || "");
                vm.title = "Update Settled Deposit Transaction Status";
                vm.TransactionId = transId;
                vm.transTypes = [
                    {
                        "TypeId": 1,
                        "typeName": "Debit"
                    }, {
                        "TypeId": 2,
                        "typeName": "Credit"
                    }
                ];
                vm.transStatus = [
                    {
                        "StatusId": 1,
                        "Status": "Pending"
                    }, {
                        "StatusId": 2,
                        "Status": "Settled"
                    }
                ];
                bankTransactionService.getBankTransaction(transId)
                    .success(function (data) {
                        vm.AccountId = data.BankTransaction.AccountId;
                        vm.AccountNumber = data.BankTransaction.AccountNumber;
                        vm.TransactionDate = vm.formatDate(data.BankTransaction.TransactionDate);
                        vm.TransactionDescription = data.BankTransaction.TransactionDescription;
                        vm.TypeId = data.BankTransaction.TransactionType;
                        vm.CreditAmount = data.BankTransaction.CreditAmount;
                        vm.DebitAmount = data.BankTransaction.DebitAmount;
                        vm.TransactionId = data.BankTransaction.TransactionId;
                        vm.AccountName = data.BankTransaction.AccountName;
                        vm.AccountType = data.BankTransaction.AccountType;
                        vm.CurrencyType = data.BankTransaction.CurrencyType;
                        vm.CheckNumber = data.BankTransaction.CheckNumber;
                        vm.GeneratedBy = data.BankTransaction.GeneratedBy;
                        vm.PeriodCoveredDateFrom = data.BankTransaction.PeriodCoveredDateFrom;
                        vm.PeriodCoveredDateTo = data.BankTransaction.PeriodCoveredDateTo;
                        vm.Currency = data.BankTransaction.Currency;
                        vm.RunningBalance = data.BankTransaction.RunningBalance;
                        vm.Branch = data.BankTransaction.Branch;
                        vm.StatusId = data.BankTransaction.TransactionStatus;
                        vm.VerificationNumber = data.BankTransaction.VerificationNumber;
                        vm.DateVerified = vm.formatDate(data.BankTransaction.DateVerified);
                        vm.PostingDate = vm.formatDate(data.BankTransaction.PostingDate);
                        vm.DateUploaded = vm.formatDate(data.BankTransaction.DateUploaded);
                        vm.TransactionRemarks = data.BankTransaction.TransactionRemarks;
                        vm.P2PTransactionNumber = data.BankTransaction.P2PTransactionNumber;
                        vm.P2PUserId = data.BankTransaction.P2PUserId;
                        vm.BankCode = data.BankTransaction.BankCode;

                        console.log(vm);
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });

                this.closeAlert = function (index) {
                    vm.alerts.splice(index, 1);
                };

                this.saveTransaction = function () {
                    var transaction = {};
                    transaction.AccountId = vm.AccountId;
                    transaction.TransactionId = vm.TransactionId;
                    transaction.TransactionStatus = vm.TransactionStatus;
                    transaction.AccountNumber = vm.AccountNumber;
                    transaction.TransactionDate = vm.TransactionDate;
                    transaction.TransactionDescription = vm.TransactionDescription;
                    transaction.TransactionType = vm.TypeId;
                    transaction.CreditAmount = vm.CreditAmount;
                    transaction.DebitAmount = vm.DebitAmount;

                    transaction.AccountName = vm.AccountName;
                    transaction.AccountType = vm.AccountType;
                    transaction.CurrencyType = vm.CurrencyType;
                    transaction.CheckNumber = vm.CheckNumber;
                    transaction.GeneratedBy = vm.GeneratedBy;
                    transaction.PeriodCoveredDateFrom = vm.PeriodCoveredDateFrom;
                    transaction.PeriodCoveredDateTo = vm.PeriodCoveredDateTo;
                    transaction.Currency = vm.Currency;
                    transaction.RunningBalance = vm.RunningBalance;
                    transaction.Branch = vm.Branch;
                    transaction.TransactionStatus = vm.StatusId;
                    transaction.VerificationNumber = vm.VerificationNumber;
                    transaction.DateVerified = vm.DateVerified;
                    transaction.PostingDate = vm.PostingDate;
                    transaction.DateUploaded = vm.DateUploaded;
                    transaction.TransactionRemarks = vm.TransactionRemarks;
                    transaction.P2PTransactionNumber = vm.P2PTransactionNumber;
                    transaction.P2PUserId = vm.P2PUserId;
                    transaction.BankCode = vm.BankCode;

                    bankTransactionService.updateBankTransaction(transaction)
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
                this.openPostingDate = function () {
                    vm.popupPostingDate.opened = true;
                };
                this.openDateVerified = function () {
                    vm.popupDateVerified.opened = true;
                };
                this.formatDate = function (date) {
                    if (date != null) {
                        var dateOut = new Date(date);
                        return dateOut;
                    }
                    return null;
                };
            }
        }]);
