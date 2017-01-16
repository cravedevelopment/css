angular.module("cssApp")
    .controller('bankAccountController',
    ['$location','dataGridService', 'alertService','bankAccountService',
    function ($location, dataGridService, alertService, bankAccountService) {
        "use strict";
        var vm = this;

        this.initializeController = function () {
            vm.title = "Account Inquiry";
            vm.alerts = [];
            vm.closeAlert = alertService.closeAlert;

            dataGridService.initializeTableHeaders();
            
            dataGridService.addHeader("Account Name", "AccountName");
            dataGridService.addHeader("Account Number", "AccountNumber");
            dataGridService.addHeader("Available Balance", "AvailableBalance");
            dataGridService.addHeader("Bank", "Bank");
            dataGridService.addHeader("", "AccountId");
            vm.tableHeaders = dataGridService.setTableHeaders();
            vm.defaultSort = dataGridService.setDefaultSort("Account Name");

            vm.currentPageNumber = 1;
            vm.sortExpression = "AccountName";
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
            bankAccountService.getBankAccountsCompleteInfo(inquiry)
            .success(function (data) {
                vm.accounts = data.BankAccounts;
                vm.totalAccounts = data.TotalRows;
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
