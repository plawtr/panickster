angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Report', function($http) {


  return {
    incident: function(reportData){
      $http.post('http://localhost:3000/incident/report')
    }
  }
});


