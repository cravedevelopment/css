angular.module("cssApp")
    .controller('chequeMonitoringController',
    ['$location','dataGridService', 'alertService','chequeMonitoringService',
    function ($location, dataGridService, alertService, chequeMonitoringService) {
        "use strict";
        var vm = this;

        this.initializeController = function () {
            vm.title = "Cheque Monitoring";
            vm.alerts = [];
            vm.closeAlert = alertService.closeAlert;

            dataGridService.initializeTableHeaders();
            
            dataGridService.addHeader("Account Number", "AccountNumber");
            dataGridService.addHeader("Account Name", "AccountName");
            dataGridService.addHeader("Cheque Number", "ChequeNumber");
            dataGridService.addHeader("Cheque Date", "ChequeDate");
            dataGridService.addHeader("Cheque Amount", "ChequeAmount");
            dataGridService.addHeader("Pay to the order of", "PayToTheOrderOf");
            dataGridService.addHeader("Bank Branch", "BankBranch");
            dataGridService.addHeader("", "ChequeId");
            vm.tableHeaders = dataGridService.setTableHeaders();
            vm.defaultSort = dataGridService.setDefaultSort("Account Number");

            vm.currentPageNumber = 1;
            vm.sortExpression = "AccountNumber";
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
            chequeMonitoringService.getAllCheques(inquiry)
            .success(function (data) {
                vm.cheques = data.ChequeMonitorings;
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
