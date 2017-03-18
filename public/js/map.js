var  map  =  L.map('map',   {            
    center:  [50.454722,  -104.60666700000002],
                zoom:  13

            
});
var points = [];
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
}).addTo(map);

function onMapClick(e) {
    $("#form").append('<input type="hidden" name="points" value="' + e.latlng.lat + ',' + e.latlng.lng + '" />');
    console.log(e);
    points.push(L.marker([e.latlng.lat, e.latlng.lng]).addTo(map))
}

map.on('click', onMapClick);