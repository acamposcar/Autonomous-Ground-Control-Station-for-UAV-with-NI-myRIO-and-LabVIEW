$(document).ready(function(){


// Variables antena
var latitud_read;
var longitud_read;
var altitud_read;
var latitud_write;
var longitud_write;
var altitud_write;

// Variables señal GPS drone

var latitud_avion;
var longitud_avion;
var altitud_avion;

var path = [];
var i=0;

// Escribir en Labview
$("#antena_boton").on("click", function() {
	var latitud_write = $('#antena_latitud').val()
	var longitud_write = $('#antena_longitud').val()
  var altitud_write = $('#antena_altitud').val()
  $.post( "LatitudAntena/update_latitud", { AntenaLatitud: latitud_write } );
  $.post( "LongitudAntena/update_longitud", { AntenaLongitud: longitud_write } );
  $.post( "AltitudAntena/update_altitud", { AntenaAltitud: altitud_write } );
});


// Leer de LabView y escribir en la web
 setInterval(function() {
   	$.get("LatitudAntena/read_latitud", function (xml) {
    	$(xml).find('Terminal').each(function () {
        	latitud_read = $(this).find('Value').text();
       		$("#antena_latitud_global").val(latitud_read);
    	});
	});

 	$.get("LongitudAntena/read_longitud", function (xml) {
    	$(xml).find('Terminal').each(function () {
        	longitud_read = $(this).find('Value').text();
       		$("#antena_longitud_global").val(longitud_read);  
    	});
	});

  $.get("AltitudAntena/read_altitud", function (xml) {
      $(xml).find('Terminal').each(function () {
          altitud_read = $(this).find('Value').text();
          $("#antena_altitud_global").val(altitud_read);  
      });
  });


  // SEÑAL GPS

  $.get("LatitudAvion/read_latitud_av", function (xml) {
      $(xml).find('Terminal').each(function () {
          latitud_avion = $(this).find('Value').text();
          $("#avion_latitud").val(latitud_avion);  
      });
  });

  $.get("LongitudAvion/read_longitud_av", function (xml) {
      $(xml).find('Terminal').each(function () {
          longitud_avion = $(this).find('Value').text();
          $("#avion_longitud").val(longitud_avion);  
      });
  });

    $.get("AltitudAvion/read_altitud_av", function (xml) {
      $(xml).find('Terminal').each(function () {
          altitud_avion = $(this).find('Value').text();
          $("#avion_altitud").val(altitud_avion);  
      });
  });

}, 500);



// Representar en Google Maps

 setInterval(function() {

  // var myLatLng = {lat: -25.363, lng: 131.044};
  latitud_avion = parseFloat(latitud_avion);
  longitud_avion = parseFloat(longitud_avion);

  var myLatLng = {lat: latitud_avion, lng: longitud_avion};
  path[i] = myLatLng;
  console.log(path);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
  i=i+1;

  var flightPath = new google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);

}, 5000);

});








