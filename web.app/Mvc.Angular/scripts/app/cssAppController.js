(function () {
    'use strict';

    angular
        .module('cssApp')
        .controller('cssAppController', cssAppController);

    cssAppController.$inject = ['$scope'];

    function cssAppController($scope) {
        var vm = this;

        this.initializeController = function () {
        }
    }
})();