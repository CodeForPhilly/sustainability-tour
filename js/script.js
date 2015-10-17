var map;
var indegoIcon = L.icon({
    // values from cac-map-overlays.js
    // https://github.com/azavea/cac-tripplanner
    iconUrl: 'img/map_marker_indego.png',
    iconRetinaUrl: 'img/map_marker_indego@2x.png',
    iconSize: [32, 46],
    iconAnchor: [16, 46],
    popupAnchor: [1, -32],
    shadowSize: [36, 16],
    shadowAnchor: [10, 14]
});

$(document).ready(function() {
    // Generate Map
    map = L.map('map').setView([39.9394357303,-75.15820773], 14);

    var userLocationMarker = makeUserLocationMarker();

    if (userLocationMarker) {
        userLocationMarker.addTo(map);
    }

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    // indego markers
    $.getJSON('https://api.phila.gov/bike-share-stations/v1', function(data) {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
               return L.marker(latlng, {icon: indegoIcon, zIndexOffset: -1000 });
            },
            onEachFeature: function (feature, layer) {
                var available = feature.properties.bikesAvailable;
                layer.bindPopup(available + ' ' + (available !== 1 ? 'bikes' : 'bike') +
                                ' available');
            }
        }).addTo(map);
    });

    // tour content markers
    $.getJSON('json/GSI_Tour_Content.geojson', function(data) {

        // Create a data point for each marker
        L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                var popUpContent = $('<a href="#' + encodeURIComponent(feature.properties['Site Name']) + '">' + 
                    feature.properties['Site Name'] + 
                    "</a>").click(function() {
                        shrikMap();
                })[0];

                layer.bindPopup(popUpContent);
            }
        }).addTo(map);
        
        var content = $("#content");

        for (var i = 0; i < data.features.length; i++) {
            console.log(data.features[i]);
            //Insert Anchor

            //Site Name
            var h3 = document.createElement("h3");
            h3.innerHTML = data.features[i].properties['Site Name'];
            content.append(h3);
            //Completion date
            var h5 = document.createElement("h5");
            h5.innerHTML = data.features[i].properties['address'];
            content.append(h5);
            //Neighborhood
            var h5 = document.createElement("h5");
            h5.innerHTML = data.features[i].properties['Neighborhood'];
            content.append(h5);
            //Description
            var p = document.createElement("p");
            p.innerHTML = data.features[i].properties['Description'];
            content.append(p);
        }
    });


    // Shrink map when user clicks single point
    function shrikMap() {
        $('#map').animate({
            bottom: "65%",
        }, 200, function() {
            $('#map').addClass('map-small');
            map.invalidateSize()
            map.panTo([39.9394357303,-75.15820773]);
        });
    }
});
