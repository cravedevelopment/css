angular
        .module("cssApp")
        .service("bankAccountService", ["$http",
           function ($http) {
               var getAllAccounts = function (obj) {
                   return $http.post("/BankAccount/GetBankAccounts", obj);
               },
               getBankAccount = function (id) {
                   return $http.get("/BankAccount/GetAccount/" + id);
               },
               getBankAccountsCompleteInfo = function (obj) {
                   return $http.post("/BankAccount/GetBankAccountsCompleteInfo", obj);
               },
               getBankAccountsDropdown = function () {
                   return $http.get("/BankAccount/GetBankAccountsDropdown");
               },
               addBankAccount = function (account) {
                   return $http.post("/BankAccount/AddAccount/", account);
               },
               updateBankAccount = function (account) {
                   return $http.post("/BankAccount/UpdateAccount/", account);
               }
               return {
                   getAllAccounts: getAllAccounts,
                   getBankAccount: getBankAccount,
                   addBankAccount: addBankAccount,
                   updateBankAccount: updateBankAccount,
                   getBankAccountsCompleteInfo: getBankAccountsCompleteInfo,
                   getBankAccountsDropdown: getBankAccountsDropdown
               };
           }]);