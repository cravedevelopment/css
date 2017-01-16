angular
    .module("cssApp")
    .service("bankTransferInstructionService", ["$http",
        function ($http) {
            var getAllTransferInstructions = function (obj) {
                return $http.post("/BankTransferInstruction/GetTransferInstructions", obj);
            },
                addInstruction = function (instruction) {
                    return $http.post("/BankTransferInstruction/AddTransferInstruction", instruction);
                },
                getTransferInstruction = function(id) {
                    return $http.get("/BankTransferInstruction/GetTransferInstruction/" + id);
                },
                updateInstruction=function(instruction) {
                    return $http.post("/BankTransferInstruction/UpdateTransferInstruction", instruction);
                }, 
                 getNumberOfInstructions = function () {
                     return $http.get("/BankTransferInstruction/GetNumberOfTransferInstructions");
                 }
            return {
                getAllTransferInstructions: getAllTransferInstructions,
                getTransferInstruction: getTransferInstruction,
                addInstruction: addInstruction,
                updateInstruction: updateInstruction,
                getNumberOfInstructions: getNumberOfInstructions
            };
        }]);