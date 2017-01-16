angular.module("cssApp")
    .controller('uploaderController',
    ['$scope', '$log', 'uiUploader', "alertService", "bankService",
        function ($scope, $log, uiUploader, alertService, bankService) {
            "use strict";
            var vm = this;

            this.initializeController = function () {
                vm.title = "Upload Bank Report";
                bankService.getBanksDropdown()
                    .success(function (data) {
                        vm.banks = data.Banks;
                    });
            }
            this.displaySuccessMessage = function (msg) {
                alertService.renderSuccessMessage(msg);
                vm.messageBox = alertService.returnFormattedMessage();
                vm.alerts = alertService.returnAlerts();
            }
            this.displayErrorMessage = function (msg) {
                alertService.renderWarningMessage(msg);
                vm.messageBox = alertService.returnFormattedMessage();
                vm.alerts = alertService.returnAlerts();
            }
            this.closeAlert = function (index) {
                vm.alerts.splice(index, 1);
            };
            $scope.btn_remove = function (file) {
                $log.info('deleting=' + file);
                uiUploader.removeFile(file);
            };
            $scope.btn_clean = function () {
                uiUploader.removeAll();
            };
            $scope.btn_upload = function () {
                var transaction = {};
                var bank = vm.Bank.split("|");
                var bankId = bank[0];
                var bankCode = bank[1];
                var transactionDto = { BankTransaction: transaction };
                $log.info("uploading...");
                uiUploader.startUpload({
                    type: "post",
                    contentType: "application/json; charset=utf-8",
                    url: "/BankTransaction/Import/",
                    data: { bankId: bankId, bankCode: bankCode },
                    //concurrency: 2,
                    onProgress: function (file) {
                        $log.info(file.name + '=' + file.humanSize);
                        $scope.$apply();
                    },
                    onCompleted: function (file, response) {
                        //$log.info(file + 'response' + data);
                        var data = new Object();
                        var responseJson = jQuery.parseJSON(response);
                        if (typeof responseJson != "object") {
                            data = JSON.parse(responseJson);
                        } else {
                            data = responseJson;
                        }
                        if (data.ReturnStatus) {
                            vm.displaySuccessMessage(data.ReturnMessage);
                        }
                        else {
                            vm.displayErrorMessage(data.ReturnMessage);
                        }
                        $scope.files = [];
                        uiUploader.removeAll();
                        $scope.$apply();
                    }
                });
            };
            $scope.files = [];
            var element = document.getElementById('file1');
            element.addEventListener('change', function (e) {
                var files = e.target.files;
                uiUploader.addFiles(files);
                $scope.files = uiUploader.getFiles();
                $scope.$apply();
            });

        }]);