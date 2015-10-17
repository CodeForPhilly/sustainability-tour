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
    map = L.map('map').setView([39.9394357303,-75.15820773], 13);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        subdomains: 'abcd',
        maxZoom: 19
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
                layer.bindPopup('<a href="#' + encodeURIComponent(feature.properties['Site Name']) + '">' + feature.properties['Site Name'] + "</a>"
                );
            }
        }).addTo(map);

    });
});
