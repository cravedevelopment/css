(function () {
    'use strict';

    angular
        .module('cssApp')
        .service('cssModuleService', cssModuleService);

    cssModuleService.$inject = ['$http', 'blockUI'];
    function cssModuleService($http, blockUI) {
        this.servicePost = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            $http.post(route, data).success(function (response, status, headers, config) {
                blockUI.stop();
                successFunction(response, status);
            }).error(function (response) {
                blockUI.stop();
                errorFunction(response);
            });

        };
        this.serviceGet = function (data, route, successFunction, errorFunction) {
            blockUI.start();
            $http.get(route, data).success(function (response, status, headers, config) {
                blockUI.stop();
                successFunction(response, status);
            }).error(function (response) {
                blockUI.stop();
                errorFunction(response);
            });
        };
    }
})();