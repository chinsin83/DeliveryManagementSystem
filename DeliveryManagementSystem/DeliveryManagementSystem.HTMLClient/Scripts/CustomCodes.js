function SGDateTime(element, contentItem) {
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("DD/MM/YY HH:mm"));
        }
    });
}

function SGDate(element, contentItem) {
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(moment(value).format("DD/MM/YY"));
        }
    });
}

function geolocate(autocomplete) {
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
            if (autocomplete != 'undefined' && autocomplete != null && autocomplete != 'off') {
                autocomplete.setBounds(circle.getBounds());
            }
                
        });
    }
}

function initAutoComplete(element, id, placeholder, callback) {
    $("<input id='" + id + "' placeholder='" + placeholder + "' type='text'/>").appendTo($(element));

    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById(id)),
        {
            //types: ['geocode'],
            componentRestrictions: { country: 'SG' }
        });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        console.log(place);
        if (place != 'undefined' && place != null) {

            lat = "" + place.geometry.location.lat();
            lng = "" + place.geometry.location.lng();
            if (place.formatted_address.search(place.name) == -1) {
                address = place.name + "\n" + place.formatted_address;
            }
            else {
                address = place.formatted_address;
            }
            

            callback(lat, lng, address);
        }
    });
}

function CalculateDistanceBetween2Places(StartAddress, StartLat, StartLng, DestinationAddress, DestinationLat, DestinationLng, callback) {
    //var geocoder = new google.maps.Geocoder();
    //geocoder.geocode({
    //    'address': StartAddress,
    //    'region': "SG"
    //}, function (results, status) {
    //    if (status == google.maps.GeocoderStatus.OK) {
    //        console.log(results);
    //        //callback(results[0].geometry.location.k, results[0].geometry.location.D);
    //    }
    //    else {
    //        alert('Geocode was not successful for the following reason: ' + status);
    //    }
    //})

    if (StartLat == 'undefined' || StartLat == null || StartLng == 'undefined' || StartLng == null) {
        return;
    }
    if (DestinationLat == 'undefined' || DestinationLat == null || DestinationLng == 'undefined' || DestinationLng == null) {
        return;
    }
    var start = new google.maps.LatLng(StartLat, StartLng);
    var destination = new google.maps.LatLng(DestinationLat, DestinationLng);

    var request = {
        origin: start,
        destination: destination,
        //waypoints: waypts,
        //optimizeWaypoints: true,
        provideRouteAlternatives: true,
        region: "SG",
        travelMode: google.maps.TravelMode.DRIVING,
    };
    var directionsService  = new google.maps.DirectionsService();
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //directionsDisplay.setDirections(result);

            // calculate distance and duration
            var distance = 0.0;
            var duration = 0.0;

            // calculate average distance and duration of routes provided
            for (var i = 0; i < result.routes.length; i++) {
                distance += result.routes[i].legs[0].distance.value;
                duration += result.routes[i].legs[0].duration.value;
            }
            
            var myresult = {
                distance: Math.ceil(distance / result.routes.length / 10) / 100,
                duration: Math.ceil(duration / result.routes.length / 60)
            };

            callback(myresult);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}