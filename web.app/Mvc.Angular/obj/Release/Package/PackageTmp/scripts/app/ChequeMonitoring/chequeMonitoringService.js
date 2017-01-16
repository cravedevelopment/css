angular
    .module("cssApp")
    .service("chequeMonitoringService", ["$http",
        function ($http) {
            var getAllCheques = function (obj) {
                return $http.post("/ChequeMonitoring/GetChequeMonitorings", obj);
            },
                getCheque = function (id) {
                    return $http.get("/ChequeMonitoring/GetChequeMonitoring/" + id);
                },
                addCheque = function (cheque) {
                    return $http.post("/ChequeMonitoring/AddCheque/", cheque);
                },
                updateCheque = function (cheque) {
                    return $http.post("/ChequeMonitoring/UpdateCheque/", cheque)
                }
            return {
                getAllCheques: getAllCheques,
                getCheque: getCheque,
                addCheque: addCheque,
                updateCheque: updateCheque
            };
        }]);