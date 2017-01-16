angular.module('cssApp')
    .service('dateService', ['$rootScope', function ($rootScope) {
        this.opened = false;

        //this.today = function () {
        //    $rootScope.dt = new Date();
        //    return $rootScope.dt;
        //};

        //this.setDate = function (year, month, day) {

        //    $rootScope.dt = new Date(year, month, day);
        //    return $rootScope.dt;
        //};

        this.openCalendar = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.opened = true;
        };
    }]);