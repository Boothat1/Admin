
// *
// * Coordinates search
// * 2013 - en.marnoto.com
// *

//event to get data in angular


// Required variables.
var map;
var marker;
var geocoder;
var completeAddress = 'test txt'




function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(24.3867662, 54.4185367),
        zoom: 9,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: false
    };
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    // This event detects a click on the map.
    google.maps.event.addListener(map, "click", function (event) {

        // Get lat lng coordinates.
        // This method returns the position of the click on the map.
        var lat = event.latLng.lat().toFixed(6);
        var lng = event.latLng.lng().toFixed(6);

        // Call createMarker() function to create a marker on the map.
        createMarker(lat, lng);

        // getCoords() function inserts lat and lng values into text boxes.
        getCoords(lat, lng);
        geocodePosition(event.latLng);
    });

    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        //infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        var lat = place.geometry.location.lat().toFixed(6);

        var lng = place.geometry.location.lng().toFixed(6);

        // Call createMarker() function to create a marker on the map.
        createMarker(lat, lng);

        // getCoords() function inserts lat and lng values into text boxes.
        getCoords(lat, lng);

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

    });


}

function renderMap() {
    google.maps.event.addDomListener(window, 'load', initialize);
}

function geocodePosition(pos) {
    // console.log(pos);
    geocoder.geocode({
        latLng: pos
    }, function (responses) {
        if (responses && responses.length > 0) {
            let searchBox = document.getElementById('searchTextField')
            searchBox.value = responses[0].formatted_address
            // $("#searchTextField").val(responses[0].formatted_address);
            // console.log(responses)

            completeAddress = responses;
            console.log(responses)
            
        }
    });
}

// google.maps.event.addListener(marker, 'dragend', function() {
//    updateMarkerStatus('Drag ended');
//    geocodePosition(marker.getPosition());
//  });
// Function that creates the marker.
function createMarker(lat, lng) {

    // The purpose is to create a single marker, so
    // check if there is already a marker on the map.
    // With a new click on the map the previous
    // marker is removed and a new one is created.

    // If the marker variable contains a value
    if (marker) {
        // remove that marker from the map
        marker.setMap(null);
        // empty marker variable
        marker = "";
    }

    // Set marker variable with new location
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        draggable: true, // Set draggable option as true
        map: map
    });


    // This event detects the drag movement of the marker.
    // The event is fired when left button is released.
    google.maps.event.addListener(marker, 'dragend', function () {

        // Updates lat and lng position of the marker.
        marker.position = marker.getPosition();

        // Get lat and lng coordinates.
        var lat = marker.position.lat().toFixed(6);
        var lng = marker.position.lng().toFixed(6);

        // Update lat and lng values into text boxes.
        getCoords(lat, lng);

    });
}

// This function updates text boxes values.
function getCoords(lat, lng) {
    /*
        // Reference input html element with id="lat".
        var coords_lat = document.getElementById('lat');
    
        // Update latitude text box.
        coords_lat.value = lat;
    
        // Reference input html element with id="lng".
        var coords_lng = document.getElementById('lng');
    
        // Update longitude text box.
        coords_lng.value = lng;
        */
    // console.log('lat-', lat)
    // console.log('lng-', lng)
}