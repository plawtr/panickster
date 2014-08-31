var position;

angular.module('starter.controllers')
    .controller('ReportCtrl', function ($scope, Report, $ionicPopup, $state, Maps) {
        var initPromise = Maps.init();

        $scope.data = {};

        $scope.reportIncident = function (data) {
            initPromise.then(function(){
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
            });
        }
    });