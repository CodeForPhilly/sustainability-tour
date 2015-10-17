
/*
 * Adds user location marker to map and keeps it updated.
 * returns marker object
 */
function makeUserLocationMarker() {
    var marker = L.circleMarker([0,0]);

    function updateMarker(position) {
        marker.setLatLng([position.coords.latitude,
                          position.coords.longitude]);
    }

    if (!navigator.geolocation) {
        return;
    }

    navigator.geolocation.watchPosition(updateMarker);

    return marker;
};
