angular.module('starter.services')

.factory('Report', function($http) {
  return {
    incident: function(data){
      return $http.post('http://mapster-panickster.herokuapp.com/incidents/report.json', data).then(function(res){
        return res.data;
      });
    }
  }
});


