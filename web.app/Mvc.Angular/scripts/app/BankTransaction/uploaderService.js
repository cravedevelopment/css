angular
        .module("cssApp")
        .service("uploaderService", ["$http",
           function ($http) {
               var uploadFiles = function (obj) {
                   return $http.post("/BankTransaction/Import", obj);
               }
               return {
                   uploadFiles: uploadFiles
                
               };
           }]);