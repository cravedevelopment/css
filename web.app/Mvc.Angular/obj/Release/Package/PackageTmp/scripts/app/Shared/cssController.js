
angular.module('cssApp').controller('cssController',
    ['$routeParams', '$location', 'applicationConfiguration',
        function ($routeParams, $location, applicationConfiguration) {

            var vm = this;

            this.initializeController = function () {
                vm.applicationVersion = applicationConfiguration.version;
            }
        }]);