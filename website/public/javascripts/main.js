var foodTruckMarker;
var map;

$(document).ready(function() {
	
	var lat = 41.148204;
    var lon = -81.340697;
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
    
        center:       new google.maps.LatLng(lat, lon),
        zoom:         16,
        mapTypeId:    google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions)
    
    var image = 'images/foodTruck.png'
    
    //custom marker yo
    foodTruckMarker = new google.maps.Marker({
        position:   new google.maps.LatLng(41.144644, -81.340328),
        icon:       image,
        map:        map,
        title:      'Food Truck yo'
    });
  
	//google.maps.event.addDomListener(window, 'load', initializeMap);

	setInterval(updateMarker, 5000);
	
});

function updateMarker() {
	
	$.ajax({
		
		url: "/location/test",
		success: function(data) {
			
			console.log(data[0].lat);
			console.log(data[0].lon);
			foodTruckMarker.setPosition( new google.maps.LatLng( data[0].lat, data[0].lon ) );
			
			$('#data').html("Lat : " + data[0].lat + "<br>" + "Lon : " + data[0].lon + "<br>" + "Alt : " + data[0].alt + "<br>" + "Bat : " + data[0].bat + "<br>" + "Sig : " + data[0].sig + "<br>");		
			
			map.setCenter( new google.maps.LatLng( data[0].lat, data[0].lon ) );
			
		}
		
	})
	
// 	
	
}
