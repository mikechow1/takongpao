

$('document').ready(function() {
  
  // get location using IP API
  //var location = "http://ip-api.com/json";
var location = "https:freegeoip.net/json/github.com";
  $.getJSON(location, function(data) {
    var lat = data.lat;
    var lon = data.lon;
    var city = data.city;
    var country = data.country;
    
    // Use location data to get weather data from open weather API
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + 22.3964 + "&lon=" + 114.1095 + "&appid=3e24d71944ac2d7f1bdddb569985a87c", function(data) {
      
      // Our Data
      var icon = deriveIcon(data.weather[0].icon);  
      
      var tempInCelsius = Math.round(((data.main.temp) - 273.15 ));
      var tempInFarenheit = tempInCelsius + 32;
      tempInCelsius = tempInCelsius.toFixed(1);
      tempInFarenheit = tempInFarenheit.toFixed(1);
      
      var windSpeed = data.wind.speed;
      windSpeed = windSpeed.toFixed(1);
      
      var description = data.weather[0].description;

      // Apply Data To Page
      $("#weather-icon").attr("src", icon);
      $("#wind-speed").text(windSpeed + " mph");
      $("#weather-description").text(description); 
      $("#city").text(city);   
      $("#temperature").text(tempInCelsius + "°C");

      $("#farenheit").on("click", function () {
        $("#farenheit").addClass("active");
        $("#celsius").removeClass("active");
        $("#temperature").text(tempInFarenheit + "°F");
      })
      $("#celsius").on("click", function () {
        $("#celsius").addClass("active");
        $("#farenheit").removeClass("active");
        $("#temperature").text(tempInCelsius + "°C");
      })
    });
  })
})
  
function deriveIcon(iconCode) {
// Determine which icon to use depending on the icon code returned 
// by the API call. All icons from Max Randall's Weather collection on Noun Project here: https://thenounproject.com/maxrandall/collection/weather/?oq=weather&cidx=0
  switch(iconCode) {
    case "01d": // clear sky, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77878-200.png";
    case "01n": // clear sky, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77869-200.png";
    case "02d": // some clouds, day
    case "03d": // scattered clouds, day  
    case "04d": // broken clouds, day  
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77877-200.png";
    case "02n": // some clouds, night
    case "03n": // scattered clouds, night  
    case "04n": // broken clouds, night  
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77866-200.png";  
    case "09d": // shower rain, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77876-200.png";
    case "09n": // shower rain, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77867-200.png";
    case "10d": // rain, day
    case "10n": // rain, night  
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77857-200.png";
    case "11d": // thunderstorm, day
    case "11n": // thunderstorm, night  
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77858-200.png";
    case "13d": // snow, day
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77860-200.png";
    case "13n": // snow, night
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77872-200.png"; 
    case "50n": // misr, night
    case "50d": // mist, day  
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77881-200.png";   
    default: // default make it sunny
      return "https://d30y9cdsu7xlg0.cloudfront.net/png/77878-200.png";
  }
}

