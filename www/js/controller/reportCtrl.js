angular.module('starter.controllers')
    .controller('ReportCtrl', function ($scope, Report, $ionicPopup, $state) {
        $scope.data = {};

        $scope.reportIncident = function (data) {
            Report.incident(data).then(function (res) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Incident reported successfully!'
                });

                alertPopup.then(function (res) {
                    $state.go('tab.heatmap');
                });
            });


        }
    });