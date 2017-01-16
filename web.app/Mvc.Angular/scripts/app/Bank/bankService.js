angular
        .module("cssApp")
        .service("bankService", ["$http",
           function ($http) {
               var getAllBanks = function (obj) {
                   return $http.post("/Bank/GetBanks", obj);
               },
               getBanksDropdown = function(){
                   return $http.get("/Bank/GetBanksDropdown");
               },
               getBank = function(id){
                   return $http.get("/Bank/GetBank/" + id);
               },
               addBank = function(bank){
                   return $http.post("/Bank/AddBank/", bank);
               },
               updateBank = function(bank){
                   return $http.post("/Bank/UpdateBank/", bank);
               }
               return {
                   getAllBanks: getAllBanks,
                   getBank: getBank,
                   addBank: addBank,
                   updateBank: updateBank,
                   getBanksDropdown: getBanksDropdown
               };
           }]);