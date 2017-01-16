(function () {
    'use strict';
    angular
         .module('cssApp')
         .service('roleService', ['$http',
            function ($http) {
                var getRoles = function () {
                    return $http.get('/Role/GetRoles');
                },
                getRoleById = function (id) {
                    return $http.get('/Role/GetRole/' + id);
                },
                saveRole = function (role) {
                    return $http.post('/Role/Save', role);
                },
                updateRole = function (role) {
                    return $http.post('/Role/Update', role);
                }
                return {
                    getRoles: getRoles,
                    getRoleById: getRoleById,
                    saveRole: saveRole,
                    updateRole: updateRole
                };
            }]);
})();