angular.module('starter.controllers')
    .controller('HeatMapCtrl', function ($scope, Maps) {
        Maps.init();
    });