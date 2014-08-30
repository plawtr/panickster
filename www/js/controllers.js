angular.module('starter.controllers', [])

.controller('HeatMapCtrl', function($scope) {
})

.controller('ReportCtrl', function($scope, Report, $ionicPopup) {
	$scope.data = {};

	$scope.reportIncident = function(data){

		console.log('reporting', data);

		var alertPopup = $ionicPopup.alert({
	     	title: 'Incident reported successfully!'
	   	});

	    alertPopup.then(function(res) {
	    	
	   	});

    }	
})

.controller('InfoCtrl', function($scope) {
})

.controller('PanicCtrl', function($scope) {
});
