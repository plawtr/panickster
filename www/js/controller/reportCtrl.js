var position;

angular.module('starter.controllers')
    .controller('ReportCtrl', function ($scope, Report, $ionicPopup, $state, Maps) {

        $scope.data = {};

        $scope.reportIncident = function (data) {
            var currentLoc = Maps.getCurrentLoc();
            data.lat = currentLoc.lat;
            data.lng = currentLoc.lng;

            Report.incident(data)
                .then(showSuccessMsg);

            function showSuccessMsg() {
                var alertPopup = $ionicPopup.alert({
                    title: 'Incident reported successfully!'
                });

                alertPopup.then(function (res) {
                    $state.go('tab.heatmap');
                });
            }
        }
    });