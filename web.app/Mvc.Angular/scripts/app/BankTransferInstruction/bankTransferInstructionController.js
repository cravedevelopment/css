angular.module("cssApp")
    .controller('bankTransferInstructionController',
    ['$location', 'dataGridService', 'alertService', 'bankTransferInstructionService',
        function ($location, dataGridService, alertService, bankTransferInstructionService) {
            "use strict";
            var vm = this;

            this.initializeController = function () {
                vm.title = "Bank Transfer Inquiry";
                vm.alerts = [];
                vm.closeAlert = alertService.closeAlert;

                dataGridService.initializeTableHeaders();
                
                dataGridService.addHeader("Amount", "Amount");
                dataGridService.addHeader("Date Created", "DateCreated");
                dataGridService.addHeader("Date Transfer", "DateTransferred");
                dataGridService.addHeader("Reference No", "P2PLendingRefNo");
                dataGridService.addHeader("Source Account", "BankSourceCode");
                dataGridService.addHeader("Destination Account", "BankDestinationCode");
                dataGridService.addHeader("Status", "Status");
                dataGridService.addHeader("", "Id");
                vm.tableHeaders = dataGridService.setTableHeaders();
                vm.defaultSort = dataGridService.setDefaultSort("Date Created");

                vm.currentPageNumber = 1;
                vm.sortExpression = "DateCreated";
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
                bankTransferInstructionService.getAllTransferInstructions(inquiry)
                    .success(function (data) {
                        console.log(data.BankTransferInstructions)
                        vm.instructions = data.BankTransferInstructions;
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