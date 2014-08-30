angular.module('starter.controllers', [])

.controller('HeatMapCtrl', function($scope) {
})

.controller('ReportCtrl', function($scope, Report, $ionicPopup) {
	$scope.data = {};

	$scope.reportIncident = function(data){

		console.lg('reporting', data);

 	}
// var alertPopup = $ionicPopup.alert({
//      title: 'Incident reported successfully!',
//      template: 'It might taste good'
//    });
//    alertPopup.then(function(res) {
//      console.log('Thank you for not eating my delicious ice cream cone');
//    });
		// here you add loc to data
		//Report.incident(data).then(function(res){
			//here comes the success
		//}, function(error){
			//here comes the error
		//})
})



.controller('InfoCtrl', function($scope) {
})

.controller('PanicCtrl', function($scope) {
});
