angular.module("cssApp")
    .controller('bankDepositInstructionController',
    ['$location', 'dataGridService', 'alertService', 'bankDepositInstructionService',
        function ($location, dataGridService, alertService, bankDepositInstructionService) {
            "use strict";
            var vm = this;

            this.initializeController = function () {
                vm.title = "Bank Deposit Instruction Inquiry";
                vm.alerts = [];
                vm.closeAlert = alertService.closeAlert;

                dataGridService.initializeTableHeaders();
                

                dataGridService.addHeader("Account Number", "AccountNumber");
                dataGridService.addHeader("Account Name", "AccountName");
                dataGridService.addHeader("Amount", "Amount");
                dataGridService.addHeader("Deposit Type", "DepositType");
                dataGridService.addHeader("ReferenceNo", "ReferenceNo");
                dataGridService.addHeader("Date Deposit", "DateDeposit");
                dataGridService.addHeader("", "Id");
                vm.tableHeaders = dataGridService.setTableHeaders();
                vm.defaultSort = dataGridService.setDefaultSort("Account Number");

                vm.currentPageNumber = 1;
                vm.sortExpression = "AccountName";
                vm.sortDirection = "DESC";
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
                bankDepositInstructionService.getAllDepositInstructions(inquiry)
                    .success(function (data) {
                        vm.instructions = data.BankDepositInstructions;
                        vm.totalInstructions = data.TotalRows;
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