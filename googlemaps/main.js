var map;

function initialize() {
    var mapOptions = {
      center: { lat: 49.4210880, lng: -101.111656},
      zoom: 10
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

}

function submit() {

    var address = document.querySelector('#address');
    var notes = document.querySelector('#notes');

    console.log(address.value);
    console.log(notes.value)

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        'address' : address.value

    }, function(location) {
        console.log(location);

        var infowindow = new google.maps.InfoWindow({
            content : notes.value,
            position : location[0].geometry.location
        });

        var marker = new google.maps.Marker({
            map : map,
            position : location[0].geometry.location,
            title : notes.value
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

    });

}

google.maps.event.addDomListener(window, 'load', initialize);
