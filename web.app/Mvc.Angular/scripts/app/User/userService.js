angular.module("cssApp").service("userService", ["$http",
    function ($http) {
        var getAllUsers = function (obj) {
            return $http.post("/User/GetUsers", obj);
        },
        getUser = function(id){
            return $http.get("User/GetUser/" + id);
        },
        getUsersDropdown= function(){
            return $http.get("/User/GetUsersDropdown");
        },
        addUser = function (userMasterDetail) {
            return $http.post("/User/Save/", userMasterDetail);
        },
        updateUser = function (userMasterDetail) {
            return $http.post("User/Update/", userMasterDetail);
        }
        return {
            getAllUsers: getAllUsers,
            getUser: getUser,
            getUsersDropdown: getUsersDropdown,
            addUser: addUser,
            updateUser: updateUser
        };
    }]);