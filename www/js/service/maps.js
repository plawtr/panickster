var mapStyle = [
    {"featureType": "landscape", "stylers": [
        {"saturation": -100},
        {"lightness": 65},
        {"visibility": "on"}
    ]},
    {"featureType": "poi", "stylers": [
        {"saturation": -100},
        {"lightness": 51},
        {"visibility": "simplified"}
    ]},
    {"featureType": "road.highway", "stylers": [
        {"saturation": -100},
        {"visibility": "simplified"}
    ]},
    {"featureType": "road.arterial", "stylers": [
        {"saturation": -100},
        {"lightness": 30},
        {"visibility": "on"}
    ]},
    {"featureType": "road.local", "stylers": [
        {"saturation": -100},
        {"lightness": 40},
        {"visibility": "on"}
    ]},
    {"featureType": "transit", "stylers": [
        {"saturation": -100},
        {"visibility": "simplified"}
    ]},
    {"featureType": "administrative.province", "stylers": [
        {"visibility": "off"}
    ]},
    {"featureType": "water", "elementType": "labels", "stylers": [
        {"visibility": "on"},
        {"lightness": -25},
        {"saturation": -100}
    ]},
    {"featureType": "water", "elementType": "geometry", "stylers": [
        {"hue": "#ffff00"},
        {"lightness": -25},
        {"saturation": -97}
    ]}
];

angular.module('starter.services')
    .factory('Maps', function ($q, $http) {

        var deferredInit = $q.defer();
        var currentLoc, myOptions, incidentLocation;

        var getMapWithGPS = function () {
            navigator.geolocation.getCurrentPosition(onGPSSuccess, onGPSError);
            return deferredInit.promise;
        };

        var onGPSSuccess = function (position) {
            incidentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            myOptions = {
                zoom: 16,
                center: incidentLocation,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapStyle,
                disableDefaultUI: true
            };

            currentLoc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            deferredInit.resolve(currentLoc);
        };

        var onGPSError = function (error) {
            deferredInit.reject('code: ' + error.code + '\n' + 'message: ' + error.message + '\n', error);
        };


        function getHeatMapResults() {
            return $http.get('http://localhost:3000/heatmap', {params: currentLoc})
                .then(function (res) {
                    return res.data.result
                });
        }

        function processIncidentData(res) {
            var incidentData = [];
            angular.forEach(res, function (val) {
                incidentData.push(new google.maps.LatLng(val.lat, val.lng));
            });
            return incidentData;
        }

        function publishResultsIntoMap(incidentData) {
            var map = new google.maps.Map(document.getElementById("map"), myOptions);
            var marker = new google.maps.Marker({
                position: incidentLocation,
                draggable: true,
                map: map
            });

            google.maps.event.addListener(marker, 'dragend', function (evt) {
                currentLoc = {
                    lat: evt.latLng.lat(),
                    lng: evt.latLng.lng()
                };

                console.log('Current Location Updated', currentLoc);
            });
            var pointArray = new google.maps.MVCArray(incidentData);

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: pointArray
            });

            heatmap.setMap(map);
        }

        return {
            init: function () {
                return getMapWithGPS()
                    .then(getHeatMapResults)
                    .then(processIncidentData)
                    .then(publishResultsIntoMap)
                    .then(function (data) {
                        console.log('MAP INITIALIZED', currentLoc);
                        return data;
                    });
            },
            getCurrentLoc: function () {
                return currentLoc;
            }
        };
    });


