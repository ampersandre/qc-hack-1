var map = L.map('map', {            
  center: [50.454722, -104.60666700000002],
  zoom: 13
});
var points = [];

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
}).addTo(map);

map.on('click', onMapClick);
function onMapClick(e) {
    //$("#form").append(`<input type="hidden" name="point[lat]" value="${e.latlng.lat}" />`);
    //$("#form").append(`<input type="hidden" name="point[lng]" value="${e.latlng.lng}" />`);
    const point = {
      lat: e.latlng.lat,
      lng: e.latlng.lng
    };
    addPoint(point);
    onPointClick(point);
}

function redrawPoints() {
  $('#pointList').empty();
  points = points.sort((a, b) => a.number < b.number ? -1 : 1);
  points.forEach(p => {
    map.removeLayer(p.marker);
    addPoint(p)
  });
}

function addPoint(point) {
  point.marker = L.marker([point.lat, point.lng]).addTo(map);
  point.marker.on('click', function() { onPointClick(point) });
  points.push(point);
  var pointElement = $(`<div class="point">
    <div class="name"><b>Name:</b> ${point.name}</div>
    <input type="hidden" name="points[${point.number}].name" value="${point.name}"/>
    <div class="number"><b>Number:</b> ${point.number}</div>
    <input type="hidden" name="points[${point.number}].number" value="${point.number}"/>
    <input type="hidden" name="points[${point.number}].lat" value="${point.lat}"/>
    <input type="hidden" name="points[${point.number}].lng" value="${point.lng}"/>
    <input type="hidden" name="points[${point.number}].image" value="${point.image}"/>
  </div>`);
  pointElement.on('click', function() { onPointClick(point); });
  $('#pointList').append(pointElement);
}

function onPointClick(point) {
  map.setView({ lat: point.lat, lng: point.lng }, 18);
  var pointEditor = $('#pointEditor');
  pointEditor.find('.pointName').val(point.name);
  pointEditor.find('.pointNumber').val(point.number);
  pointEditor.find('.pointImage').val(point.image);
  $('#savePointButton').on('click', function(e) {
    savePointClick(point);
    e.preventDefault();
    return false;
  });
  $('#pointEditor').slideDown();
}

function savePointClick(point) {
  var pointEditor = $('#pointEditor');
  point.name = pointEditor.find('.pointName').val();
  point.number = pointEditor.find('.pointNumber').val();
  point.image = pointEditor.find('.pointImage').val();
  redrawPoints();
  $('#pointEditor').slideUp();
}
