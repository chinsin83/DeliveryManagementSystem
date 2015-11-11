/// <reference path="jquery-1.9.1.js" />
/// <reference path="jquery.mobile-1.3.0.js" />
/// <reference path="msls-2.5.3.js" />

(function ($) {
    var _credentialsKey = "AIzaSyDqg_7ht_CvGaAWBpem1OPMq0rZSWMBJIE";
    var map;
    var employeeMarkers = [];
    var hubMarkers = [];
    var circles = [];
    var geocoder;
    var directionsDisplay;
    var directionsService;
    var weatherLayer;
    var cloudLayer;
    var trafficLayer;
    var Singapore = new google.maps.LatLng(1.370518, 103.821985)
    var markerClusterer;
    var placeSearch;
    var autocomplete;

    var pmimage = {
        url: '/HTMLClient/Content/Images/pastamania.ico',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
    };

    var zalimage = {
        url: '/HTMLClient/Content/Images/zalora.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 25),
    };

    var kfcimage = {
        url: '/HTMLClient/Content/Images/kfc.jpg',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
    };

    var popeyesimage = {
        url: '/HTMLClient/Content/Images/popeyes.jpg',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
    };

    $.widget("msls.lightswitchGoogleMapsControl", {
        options: {
            center: Singapore,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        },
        _create: function () {
        },

        _init: function () {
            this.createMap();
        },

        destroy: function () {
            this._destroyGoogleMapsControl();
        },

        //loadScript: function () {
        //    var script = document.createElement('script');
        //    script.type = 'text/javascript';
        //    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
        //        'callback=initialize';
        //    document.body.appendChild(script);
        //},

        createMap: function () {
            this.htmlMapElement = this.element[0];

            geocoder = new google.maps.Geocoder();

            // create empty map
            map = new google.maps.Map(this.htmlMapElement,
                {
                    center: this.options.center,
                    zoom: this.options.zoom,
                    MapTypeId: this.options.mapTypeId,
                });

            // create weather layer
            weatherLayer = new google.maps.weather.WeatherLayer({
                temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS,
                windSpeedUnits: google.maps.weather.WindSpeedUnit.KILOMETERS_PER_HOUR
            });
            //weatherLayer.setMap(map);

            // create cloud layer
            cloudLayer = new google.maps.weather.CloudLayer();
            cloudLayer.setMap(map);

            // create traffic layer
            trafficLayer = new google.maps.TrafficLayer();
            //trafficLayer.setMap(map);

            // create direction display and services
            directionsDisplay = new google.maps.DirectionsRenderer({
                //suppressMarkers: true,
                //polylineOptions: {
                //    strokeColor: "yellow"
                //},
            });
            directionsDisplay.setMap(map);
            directionsService = new google.maps.DirectionsService();

            // create MarkerClusterer layer
            var mcOptions = {
                gridSize: 50,
                //maxZoom: 15,
            };
            markerClusterer = new MarkerClusterer(map, [], mcOptions);

            // added - 20150810
        },
        
        // redraw the map with zoom=12 and center at Singapore
        refreshMap: function () {
            google.maps.event.trigger(map, 'resize');
            map.setZoom(12);
            map.setCenter(Singapore);
        },


        // remove all the hub and employee markers
        resetMap: function () {

            // remove all hub markers
            for (var i = 0; i < hubMarkers.length; i++) {
                hubMarkers[i].setMap(null);
            }
            hubMarkers.length = 0;

            // remove all employees marker
            for (var i = 0; i < employeeMarkers.length; i++) {
                employeeMarkers[i].setMap(null);
            }
            employeeMarkers.length = 0;

            // remove all circles
            for (var i = 0; i < circles.length; i++) {
                circles[i].setMap(null);
            }
            circles.length = 0;

            // reset zoom and center to Singapore
            google.maps.event.trigger(map, 'resize');
            map.setZoom(12);
            map.setCenter(Singapore);
        },

        _handleError: function (error) {
            alert("An error occurred.  " + error.message);
        },

        _destroyGoogleMapsControl: function () {
            if (map != null) {
                map.dispose();
                map = null;
            }
        },

        // toggle on/off the weather layer
        toggleWeather: function () {
            if (weatherLayer.getMap() != null) {
                weatherLayer.setMap(null);
            }
            else {
                weatherLayer.setMap(map);
            }
        },

        // toggle on/off the traffic layer
        toggleTraffic: function () {
            if (trafficLayer.getMap() != null) {
                trafficLayer.setMap(null);
            }
            else {
                trafficLayer.setMap(map);
            }
        },

        _handleNoGeolocation: function (errorFlag) {
            if (errorFlag == true) {
                alert("Geolocation service failed.");
            } else {
                alert("Your browser doesn't support geolocation.");
            }
            this.map.setCenter(Singapore);
        },

        //addMarker: function (lat, long, infoText, markerType) {
        //    var hubLocation = new google.maps.LatLng(lat, long);

        //    if (markerType == "Hub") {
        //        var marker = new google.maps.Marker({
        //            map: map,
        //            position: new google.maps.LatLng(lat, long),
        //            animation: google.maps.Animation.DROP,
        //            icon: '/HTMLClient/Content/Images/hub2.png',
        //        });
        //        hubMarkers.push(marker);
        //    }
        //    else if (markerType == "BP") {
        //        var marker = new google.maps.Marker({
        //            map: map,
        //            position: new google.maps.LatLng(lat, long),
        //            animation: google.maps.Animation.DROP,
        //            icon: '/HTMLClient/Content/Images/delivery2.png',
        //        });
        //        employeeMarkers.push(marker);
        //    }

        //    var infoWindow = new google.maps.InfoWindow({
        //        content: infoText,
        //    });

        //    infoWindow.open(map, marker);

        //    //hubInfoArray.push(infoWindow);

        //    google.maps.event.addListener(marker, 'click', function () {
        //        infoWindow.open(map, marker);
        //    })

        //    // Add 2 zones
        //    var ZoneOptions1 = {
        //        strokeColor: '#000000',
        //        strokeOpacity: 0.5,
        //        strokeWeight: 0.5,
        //        fillColor: '#FFFF00',
        //        fillOpacity: 0.3,
        //        map: map,
        //        center: hubLocation,
        //        radius: 5000
        //    };
        //    var ZoneOptions2 = {
        //        strokeColor: '#000000',
        //        strokeOpacity: 0.5,
        //        strokeWeight: 0.5,
        //        fillColor: '#FF0000',
        //        fillOpacity: 0.15,
        //        map: map,
        //        center: hubLocation,
        //        radius: 7000
        //    };

        //    //new google.maps.Circle(ZoneOptions2);
        //    //new google.maps.Circle(ZoneOptions1);
        //},

        // Add Hub MarkerWithLabel
        addHubMarker: function (lat, lng, hub) {
            address = new google.maps.LatLng(lat, lng);

            company = hub.substring(0, hub.length - 3).toUpperCase();
            hub = hub.substring(hub.length - 3, hub.length).toUpperCase();

            company = company.toUpperCase();
            hub = hub.toUpperCase();

            image = null;
            
            if (company == "ZAL") {
                image = zalimage;

                var marker = new MarkerWithLabel({
                    position: address,
                    map: map,
                    icon: image,
                    animation: google.maps.Animation.DROP,
                    labelContent: hub,
                    labelAnchor: new google.maps.Point(15, 10),
                    labelClass: "labels", // the CSS class for the label
                    labelStyle: { opacity: 0.75 },
                    labelInBackground: true,
                });
                hubMarkers.push(marker);
            }
            else {
                if (company == "PM") {
                    image = pmimage;
                }
                else if (company == "KFC") {
                    image = kfcimage;
                }
                else if (company == "POP") {
                    image = popeyesimage;
                }

                var marker = new MarkerWithLabel({
                    position: address,
                    map: map,
                    icon: image,
                    animation: google.maps.Animation.DROP,
                    labelContent: hub,
                    labelAnchor: new google.maps.Point(27, 10),
                    labelClass: "labels", // the CSS class for the label
                    labelStyle: { opacity: 0.75 }
                });
                hubMarkers.push(marker);
            }
        },

        clearHubMarkers: function () {
            // remove all hub markers
            for (var i = 0; i < hubMarkers.length; i++) {
                hubMarkers[i].setMap(null);
            }
            hubMarkers.length = 0;
        },

        addCircle: function (address, radius, color) {
            //myLocation = new google.maps.LatLng(lat, long);
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var circleOption = {
                        strokeColor: '#000000',
                        strokeOpacity: 0.5,
                        strokeWeight: 0.5,
                        fillColor: color,//'#FF0000',
                        fillOpacity: 0.15,
                        map: map,
                        center: results[0].geometry.location,
                        radius: radius*1000,
                        editable: true,
                    };
                    var circle = new google.maps.Circle(circleOption);

                    circles.push(circle);

                    //var marker = new google.maps.Marker({
                    //    map: map,
                    //    position: results[0].geometry.location,
                    //    animation: google.maps.Animation.DROP,
                    //    //icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                    //});
                }
            });
        },

        clearCircles: function () {
            for (var i = 0; i < circles.length; i++) {
                circles[i].setMap(null);
            }
        },

        centerMapOverHub: function (lat, lng) {
            console.log(lat + " " + lng);
            google.maps.event.trigger(map, 'resize');
            map.setZoom(11);
            map.setCenter(new google.maps.LatLng(lat, lng));
            //console.log(lat + " " + lng);
        },

        // Calculate distance from Hub's lat & lng to postal code
        calculateDistance: function (lat, lng, address, callback) {
            try {
                var basicSearch = new BasicSearch;
                basicSearch.searchVal = address;
                basicSearch.returnGeom = '1';
                basicSearch.GetSearchResults(function (resultData) {
                    var results = resultData.results;
                    if (results == 'No results') {
                        console.log("No result(s) found");
                    }
                    else {
                        for (var i = 0; i < results.length; i++) {
                            var row = results[i];
                        }

                        var CoordConvertorObj = new CoordConvertor();
                        CoordConvertorObj.ConvertCoordinate(results[0].X + "," + results[0].Y, 3414, 4326, function (value) {
                            temp = value.split(",");

                            var hub = new google.maps.LatLng(lat, lng);
                            var address2 = new google.maps.LatLng(temp[1], temp[0]);

                            var waypts = [];
                            waypts.push({
                                //location: address,
                                location: address2,
                                stopover: true,
                            })
                            var request = {
                                origin: hub,
                                destination: hub,
                                waypoints: waypts,
                                optimizeWaypoints: true,
                                travelMode: google.maps.TravelMode.DRIVING,
                                provideRouteAlternatives: true,
                                //region: "SG",
                            };

                            directionsService.route(request, function (result, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(result);
                                    callback(result);
                                }
                                else {
                                    alert('Geocode was not successful for the following reason: ' + status);
                                }
                            });
                        });

                        


                    }
                });
            }
            catch (err) {
                console.log(err);
                var hub = new google.maps.LatLng(lat, lng);

                var waypts = [];
                waypts.push({
                    location: address,
                    stopover: true,
                })
                var request = {
                    origin: hub,
                    destination: hub,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true,
                    region: "SG",
                };

                directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        callback(result);
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
            

            
        },

        // Calculate the Latitude & Longitude of the hub
        calculateLatLng: function (address, callback) {
            try {
                var basicSearch = new BasicSearch;
                basicSearch.searchVal = address;
                basicSearch.returnGeom = '1';
                basicSearch.GetSearchResults(function (resultData) {
                    var results = resultData.results;
                    if (results == 'No results') {
                        alert("No result(s) found");
                    }
                    else {
                        for (var i = 0; i < results.length; i++) {
                            var row = results[i];
                        }
                        //callback(results[0].Y, results[0].X);

                        var CoordConvertorObj = new CoordConvertor();
                        CoordConvertorObj.ConvertCoordinate(results[0].X + "," + results[0].Y, 3414, 4326, function (value) {
                            temp = value.split(",");
                            callback(temp[1], temp[0]);
                        });
                    }
                });
            }
            catch (err) {
                console.log(err);
                geocoder.geocode({
                    'address': address,
                    'region': "SG"
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        callback(results[0].geometry.location.k, results[0].geometry.location.D);
                    }
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                })
            }

        },

        clearDirection: function () {

            directionsDisplay.setMap(null);
        },
        
        checkLocation: function(lat, lng, addresses) {
            var waypts = [];
            var origin = new google.maps.LatLng(lat, lng);
            for (var i = 0; i < addresses.length; i++) {
                waypts.push({
                    location: addresses[i],
                    stopover: true,
                })
            }
            var request = {
                origin: origin,
                destination: origin,
                waypoints: waypts,
                //optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                avoidHighways: true,
                region: "SG",
            };

            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
            directionsDisplay.setMap(map);
        },

        setDirectionsDisplayPanel: function (panel) {
            directionsDisplay.setPanel(panel);
        },

        // create Marker Clusterer
        createMarkerClusterer: function (deliveryorders) {
            markerClusterer.clearMarkers();
            var markers = [];

            var infoWindow = new google.maps.InfoWindow();
            console.log("deliveryorders.data.length = " + deliveryorders.data.length);
            for (var i = 0; i < deliveryorders.data.length; i++) {
                if (deliveryorders.data[i].Latitude != null && deliveryorders.data[i].Longitude != null) {
                    var latLng = new google.maps.LatLng(deliveryorders.data[i].Latitude,
                    deliveryorders.data[i].Longitude);


                    var marker = new google.maps.Marker({
                        position: latLng,
                        //icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent("<h5>DO#:</h5> " + deliveryorders.data[i].DeliveryOrderNumber + "<br><h5>Time:</h5> " + deliveryorders.data[i].DeliveryOrderTime + "<br><h5>Postal:</h5> " + deliveryorders.data[i].PostalCode);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));

                    markers.push(marker);
                }
            }
            
            var mcOptions = {
                gridSize: 25,
                //maxZoom: 15,
            };
            markerClusterer.addMarkers(markers);
        },

        // Auto Complete
        initAutocomplete: function (callback) {
            // Create the autocomplete object, restricting the search to geographical location types.
            
            autocomplete = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById("autocomplete")),
                { types: ['geocode'] });
            
            // When the user selects an address from the dropdown, populate the address fields in the form.
            //autocomplete.addListener('place_changed', fillInAddress);
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace();

                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        //document.getElementById(addressType).value = val;
                        console.log(val);
                    }
                }
            });
        },

        fillInAddress: function() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();

            console.log(place);

            //for (var component in componentForm) {
            //    document.getElementById(component).value = '';
            //    document.getElementById(component).disabled = false;
            //}

            //// Get each component of the address from the place details
            //// and fill the corresponding field on the form.
            //for (var i = 0; i < place.address_components.length; i++) {
            //    var addressType = place.address_components[i].types[0];
            //    if (componentForm[addressType]) {
            //        var val = place.address_components[i][componentForm[addressType]];
            //        document.getElementById(addressType).value = val;
            //    }
            //}
        },

        geolocate: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var geolocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    
                    autocomplete.setBounds(circle.getBounds());
                });
            }
        },
    })

}(jQuery));