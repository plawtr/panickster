angular.module('starter.controllers', [])

.controller('HeatMapCtrl', function($scope) {
})

.controller('ReportCtrl', function($scope, Report, $ionicPopup, $state) {
	$scope.data = {};
console.log(Report)
	$scope.reportIncident = function(data){


		Report.incident(data).then(function(res){
			var alertPopup = $ionicPopup.alert({
		     	title: 'Incident reported successfully!'
		   	});

		    alertPopup.then(function(res) {
		    	$state.go('tab.heatmap');
		   	});
		});

		
    }
})

.controller('InfoCtrl', function($scope) {
})

.controller('PanicCtrl', function($scope) {
});
