

$(document).ready(function() {
  var longitude, latitude, weatherURL, weather, fahrenheit, celsius, weatherDesc, temperature;
  var tempToggle = true;
  
  //get locale information from ipinfo.io
  $.getJSON("http://ipinfo.io/json", function(response) {
    //set latitude and longitude
    latitude = (response.loc).substring(0, (response.loc).indexOf(","));
    longitude = (response.loc).substring(((response.loc).indexOf(",") + 1));
    //set city info
   // $("#city").html(response.city + ', ' + response.region);

    //getWeather from OpenWeather
    //build URL for OpenWeather
    weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=3e24d71944ac2d7f1bdddb569985a87c';
    //retrieve weather data from OpenWeather
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=22.3964&lon=114.1095&appid=3e24d71944ac2d7f1bdddb569985a87c", function(data) {

       //temperature conversions
      fahrenheit = toFahrenheit(data.main.temp);
      celsius = toCelsius(data.main.temp);
      weatherDesc = data.weather[0].main;
            
      //set data on page
      $('#desc').html(weatherDesc);
      $('#temp').html(fahrenheit + "&deg" + "F");
      $('#temp-toggle').html('<i class="fa fa-toggle-off" aria-hidden="true"></i>');
    }); //end get weather from open weather
  }); // end get from ipinfo.io  
  
  //toggle C to F
  $("#temp-toggle").on('click', function() {
    if (tempToggle) {
      $("#temp-toggle").html('<i class="fa fa-toggle-on" aria-hidden="true"></i>');
      tempToggle = false;
      $('#temp').html(fahrenheit + "&deg" + "F");      
    } else {
      $("#temp-toggle").html('<i class="fa fa-toggle-off" aria-hidden="true"></i>');
      tempToggle = true;      
      $('#temp').html(celsius + "&deg" + "C");
    }
  });
}); // end document.ready

//convert kelvin to fahrenheit
function toFahrenheit(kelvin) {
  return Math.round(kelvin * (9 / 5) - 459.67);
}

//convert kelvin to celsius
function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
 