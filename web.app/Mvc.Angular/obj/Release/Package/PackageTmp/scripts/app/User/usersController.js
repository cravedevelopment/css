
angular.module("cssApp")
    .controller('usersController',
    ['$location', 'dataGridService', 'alertService', 'userService',
    function ($location, dataGridService, alertService, userService) {
        "use strict";
        var vm = this;
        this.initializeController = function () {
            vm.title = "User Inquiry";
            vm.alerts = [];
            vm.closeAlert = alertService.closeAlert;
            dataGridService.initializeTableHeaders();
           
            dataGridService.addHeader("First Name", "FirstName");
            dataGridService.addHeader("Last Name", "LastName");
            dataGridService.addHeader("Email Address", "EmailAddress");

            dataGridService.addHeader("", "UserId");

            vm.tableHeaders = dataGridService.setTableHeaders();
            vm.defaultSort = dataGridService.setDefaultSort("First Name");

            vm.currentPageNumber = 1;
            vm.sortExpression = "UserName";
            vm.sortDirection = "ASC";
            vm.pageSize = 10;
            this.executeInquiry();
        };

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
        };

        this.executeInquiry = function () {
            var inquiry = vm.prepareSearch();
            userService.getAllUsers(inquiry)
               .success(function (data) {
                   vm.users = data.UserMasters;
                   vm.totalUsers = data.TotalRows;
                   vm.totalPages = data.TotalPages;
               }).error(function (error) {
                   alertService.RenderErrorMessage(error.ReturnMessage);
               });
        };

        this.prepareSearch = function () {

            var inquiry = new Object();

            inquiry.CurrentPageNumber = vm.currentPageNumber;
            inquiry.SortExpression = vm.sortExpression;
            inquiry.SortDirection = vm.sortDirection;
            inquiry.PageSize = vm.pageSize;

            return inquiry;

        }
    }]);