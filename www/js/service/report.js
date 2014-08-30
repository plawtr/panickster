angular.module('starter.services')

/**
 * A simple example service that returns some data.
 */
.factory('Report', function($http) {
  return {
    incident: function(data){
      return $http.post('http://localhost:3000/incidents/report', data).then(function(res){
        return res.data;
      });
    }
  }
});


