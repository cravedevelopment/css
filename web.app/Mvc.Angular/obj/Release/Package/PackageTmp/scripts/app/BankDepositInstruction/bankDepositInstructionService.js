angular
        .module("cssApp")
        .service("bankDepositInstructionService", ["$http",
           function ($http) {
               var getAllDepositInstructions = function (obj) {
                   return $http.post("/BankDepositInstruction/GetDepositInstructions", obj);
               },
               addInstruction = function (instruction) {
                   return $http.post("/BankDepositInstruction/AddDepositInstruction", instruction);
               },
                getDepositInstruction = function (id) {
                    return $http.get("/BankDepositInstruction/GetDepositInstruction/" + id);
                },
                updateInstruction = function (instruction) {
                    return $http.post("/BankDepositInstruction/UpdateDepositInstruction", instruction);
                }
               return {
                   getAllDepositInstructions: getAllDepositInstructions,
                   addInstruction: addInstruction,
                   getDepositInstruction: getDepositInstruction,
                   updateInstruction: updateInstruction
               };
           }]);