var position;

angular.module('starter.controllers')
    .controller('ReportCtrl', function ($scope, Report, $ionicPopup, $state) {

        $scope.data = {};

        navigator.geolocation.getCurrentPosition(getPosition, noCoords);

        $scope.reportIncident = function (data) {

            data.lat = position.coords.latitude;
            data.lng = position.coords.longitude;
            
            Report.incident(data).then(function (res) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Incident reported successfully!'
                    });

                    alertPopup.then(function (res) {
                        $state.go('tab.heatmap');
                    });
                },
            function (error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Something went wrong! Please try again'
                    });

                    alertPopup.then(function (error) { });
                }
            );
        }
    });

getPosition = function(pos) {
        position = pos;
}

noCoords = function(error) { 
    return alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
