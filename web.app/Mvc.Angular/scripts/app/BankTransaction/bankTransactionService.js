angular
        .module("cssApp")
        .service("bankTransactionService", ["$http",
           function ($http) {
               var getAllBankTransactions = function (obj) {
                   return $http.post("/BankTransaction/GetBankTransactions", obj);
               },
               getBankTransaction =function(id){
                   return $http.get("/BankTransaction/GetBankTransaction/" + id);
               },
               addBankTransaction = function(trans) {
                   return $http.post("/BankTransaction/AddBankTransaction/", trans);
               },
               updateBankTransaction = function(trans) {
                   return $http.post("/BankTransaction/UpdateBankTransaction/", trans);
               },
               getNumberOfTransactions = function() {
                   return $http.get("/BankTransaction/GetNumberOfTransactions");
               }
               return {
                   getAllBankTransactions: getAllBankTransactions,
                   getBankTransaction: getBankTransaction,
                   addBankTransaction: addBankTransaction,
                   updateBankTransaction: updateBankTransaction,
                   getNumberOfTransactions: getNumberOfTransactions
               };
           }]);