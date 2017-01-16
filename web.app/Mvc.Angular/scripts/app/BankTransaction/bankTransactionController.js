angular.module("cssApp")
    .controller('bankTransactionController',
    ['$location', 'dataGridService', 'alertService', 'bankTransactionService',
        function ($location, dataGridService, alertService, bankTransactionService) {

            "use strict";

            var vm = this;

            this.initializeController = function () {

                vm.title = "Transaction Inquiry";

                vm.alerts = [];
                vm.closeAlert = alertService.closeAlert;

                dataGridService.initializeTableHeaders();
               
                dataGridService.addHeader("Bank Code", "BankCode");
                dataGridService.addHeader("Transaction Date", "TransactionDate");
                dataGridService.addHeader("Credit Amount", "CreditAmount");
                dataGridService.addHeader("Status", "TransactionStatus");
                //dataGridService.addHeader("Description", "TransactionDescription");
                //dataGridService.addHeader("Details", "TransactionDetails");
                //dataGridService.addHeader("TransactionType", "TransactionType");
              
                //dataGridService.addHeader("Debit Amount", "DebitAmount");
                dataGridService.addHeader("", "TransactionId");

                vm.tableHeaders = dataGridService.setTableHeaders();
                vm.defaultSort = dataGridService.setDefaultSort("Account Code");

                vm.currentPageNumber = 1;
                vm.sortExpression = "AccountCode";
                vm.sortDirection = "ASC";
                vm.pageSize = 10;

                this.executeInquiry();

            }

            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };

            this.changeSorting = function (column) {

                dataGridService.changeSorting(column, vm.defaultSort, vm.tableHeaders);

                vm.defaultSort = dataGridService.getSort();
                vm.sortDirection = dataGridService.getSortDirection();
                vm.sortExpression = dataGridService.getSortExpression();
                vm.currentPageNumber = 1;

                vm.executeInquiry();

            };

            this.setSortIndicator = function (column) {
                return dataGridService.setSortIndicator(column, vm.defaultSort);
            };

            this.pageChanged = function () {
                this.executeInquiry();
            }

            this.executeInquiry = function () {
                var inquiry = vm.prepareSearch();
                bankTransactionService.getAllBankTransactions(inquiry)
                    .success(function (data) {
                        vm.transactions = data.BankTransactions;
                        vm.totalTransactions = data.TotalRows;
                        vm.totalPages = data.TotalPages;
                    })
                    .error(function (error) {
                        alertService.RenderErrorMessage(error.ReturnMessage);
                    });
            }

            this.prepareSearch = function () {

                var inquiry = new Object();

                inquiry.CurrentPageNumber = vm.currentPageNumber;
                inquiry.SortExpression = vm.sortExpression;
                inquiry.SortDirection = vm.sortDirection;
                inquiry.PageSize = vm.pageSize;

                return inquiry;

            }
        }]);
