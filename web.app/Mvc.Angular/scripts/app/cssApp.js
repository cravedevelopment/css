(function () {
    var app = angular.module('cssApp',
        [
            'ui.bootstrap',
            'ui.router',
            'ngSanitize',
            'ui.uploader',
            'blockUI'
        ]);

    app.config(
        [
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider) {
            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('login',
                {
                    url: '/login',
                    templateUrl: '/Login'
                })
                .state('dashboard',
                {
                    url: '/dashboard',
                    templateUrl: '/Home/Dashboard'
                })
                .state('users',
                {
                    url: '/users',
                    templateUrl: '/User/List'
                })
                .state('editUser',
                {
                    url: '/users/user/edit/:id',
                    templateUrl: '/User/Edit'
                })
                .state('newUser',
                {
                    url: '/users/user/new',
                    templateUrl: '/User/Create'
                })
                .state('accounts',
                {
                    url: '/accounts',
                    templateUrl: '/BankAccount/List'
                })
                .state('account',
                {
                    url: "/accounts/edit/:id",
                    templateUrl: '/BankAccount/Edit'
                })
                .state('newAccount',
                {
                    url: '/accounts/account/newAccount',
                    templateUrl: '/BankAccount/Create'
                })
                .state('transactions',
                {
                    url: '/transactions',
                    templateUrl: '/BankTransaction/List'
                })
                .state('transaction',
                {
                    url: '/transactions/transaction/:id',
                    templateUrl: '/BankTransaction/Edit'
                })
                .state('newTrans',
                {
                    url: '/transactions/transaction/new',
                    templateUrl: '/BankTransaction/Create'
                })
                .state("reportimports",
                {
                    url: "/transactions/import",
                    templateUrl: '/BankTransaction/ReportImport'
                })
                .state("validateTrans",
                {
                    url: "/transactions/validate",
                    templateUrl: "BankTransaction/Validate"
                })
                .state("transferinstructions",
                {
                    url: "/transferinstructions",
                    templateUrl: '/BankTransferInstruction/List'
                })
                .state("newTransferInstruction",
                {
                    url: "/transferinstructions/transferinstruction/new",
                    templateUrl: '/BankTransferInstruction/Create'
                })
                .state('transferinstruction',
                {
                    url: '/transferinstructions/transferinstruction/:id',
                    templateUrl: '/BankTransferInstruction/Edit'
                })
                .state("depositinstructions",
                {
                    url: "/depositinstructions",
                    templateUrl: '/BankDepositInstruction/List'
                })
                .state("newDepositInstruction",
                {
                    url: "/depositinstructions/depositinstruction/new",
                    templateUrl: '/BankDepositInstruction/Create'
                })
                .state("depositinstruction",
                {
                    url: "/depositinstructions/depositinstruction/:id",
                    templateUrl: '/BankDepositInstruction/Edit'
                })
                .state("cheques",
                {
                    url: "/cheques",
                    templateUrl: '/ChequeMonitoring/List'
                })
                .state('newCheque',
                {
                    url: '/cheques/cheque/new',
                    templateUrl: '/ChequeMonitoring/Create'
                })
                .state('cheque',
                {
                    url: '/cheques/cheque/:id',
                    templateUrl: '/ChequeMonitoring/Edit'
                })
                .state('banks',
                {
                    url: '/banks',
                    templateUrl: '/Bank/List'
                })
                .state('newBank',
                {
                    url: '/banks/bank/new',
                    templateUrl: '/Bank/Create'
                })
                .state('bank',
                {
                    url: '/banks/bank/:id',
                    templateUrl: '/Bank/Edit'
                });
        }]);

})();



