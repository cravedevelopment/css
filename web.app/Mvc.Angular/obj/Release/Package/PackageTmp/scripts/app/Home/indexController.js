(function () {
    'use strict';

    angular
        .module('cssApp')
        .controller('indexController', indexController);

    indexController.$inject = [
        '$scope',
        'bankTransactionService',
        'bankTransferInstructionService'
    ];

    function indexController($scope, bankTransactionService, bankTransferInstructionService) {
        $scope.initializeDashoard = function () {
            // Transaction Count Summary
            
            bankTransactionService.getNumberOfTransactions().then(function (resp) {
                    $scope.noOfTransactions = resp.data.NoOfTransactions;
                    $scope.pendingTransactionCount = resp.data.PendingTransactionsCount;
                    $scope.settledTransactionCount = resp.data.SettledTransactionsCount;
                });

            bankTransferInstructionService.getNumberOfInstructions()
                .then(function(resp) {
                    $scope.noOfInstructions = resp.data.NoOfInstructionsCount;
                    $scope.pendingInstructionsCount = resp.data.PendingInstructionsCount;
                    $scope.settledInstructionsCount = resp.data.SettledInstructionsCount;
                });
        };
    }
})();