$(document).ready(function() {
    var map; 

    $.getJSON('GSI_Tour_Content.geojson', function(data) {                 
        
        // Generate Map
        map = L.map('map').setView([39.9394357303,-75.15820773], 13);

        // Create a data point for each marker
        L.geoJson(data, {
            
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<a href="#' + encodeURIComponent(feature.properties['Site Name']) + '">' + feature.properties['Site Name'] + "</a>"
                );
            }
        }).addTo(map);


        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        	subdomains: 'abcd',
        	maxZoom: 19
        }).addTo(map);
    
    });
});