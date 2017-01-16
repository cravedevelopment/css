angular
    .module("cssApp")
    .service("loginService", ["$http",
    function($http){
        var loginAttempt = function(login) {
            return $http.post("/Security/Login/", login);
        }
        return {
            loginAttempt: loginAttempt
        };
    }])