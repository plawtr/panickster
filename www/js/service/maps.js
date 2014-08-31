var mapStyle = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#165c64"
            },
            {
                "saturation": 34
            },
            {
                "lightness": -69
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#b7caaa"
            },
            {
                "saturation": -14
            },
            {
                "lightness": -18
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#cbdac1"
            },
            {
                "saturation": -6
            },
            {
                "lightness": -9
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#8d9b83"
            },
            {
                "saturation": -89
            },
            {
                "lightness": -12
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#d4dad0"
            },
            {
                "saturation": -88
            },
            {
                "lightness": 54
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#bdc5b6"
            },
            {
                "saturation": -89
            },
            {
                "lightness": -3
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#bdc5b6"
            },
            {
                "saturation": -89
            },
            {
                "lightness": -26
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#c17118"
            },
            {
                "saturation": 61
            },
            {
                "lightness": -45
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#8ba975"
            },
            {
                "saturation": -46
            },
            {
                "lightness": -28
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#a43218"
            },
            {
                "saturation": 74
            },
            {
                "lightness": -51
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#3a3935"
            },
            {
                "saturation": 5
            },
            {
                "lightness": -57
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#cba923"
            },
            {
                "saturation": 50
            },
            {
                "lightness": -46
            },
            {
                "visibility": "on"
            }
        ]
    }
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

            google.maps.event.addListener(marker, 'dragend', function(evt) {
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


