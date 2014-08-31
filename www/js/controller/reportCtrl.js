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
                    .then(showSuccessMsg, somethingWentWrong);

                function showSuccessMsg() {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Incident reported successfully.',
                        subTitle: 'Thank you',
                        buttons: [
                            {
                                text: 'OK' ,
                                type: 'button-positive button-outline'
                            }
                        ]
                    });

                    alertPopup.then(function (res) {
                        $state.go('tab.heatmap');
                    });
                }

                function somethingWentWrong(error) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Something went wrong.',
                        subTitle: 'Please try again'
                    });

                    alertPopup.then(function (error) { });
                }
            });
        }
    });
