const apiKey = "ec22983b81775466a44e6a26f59a3d8e"; // Replace with your OpenWeather API key

// Auto-load current location weather on start
$(document).ready(getWeatherByLocation);

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      fetchWeather(url);
    }, () => {
      showError("Unable to get location.");
    });
  } else {
    showError("Geolocation not supported.");
  }
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    showError("Enter a city name.");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}

function fetchWeather(url) {
  $.getJSON(url, function(data) {
    $("#location").text(data.name);
    $("#description").text(data.weather[0].description);
    $("#temp").html(`${Math.round(data.main.temp)}<sup>°C</sup>`);
    $("#icon").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  }).fail(function() {
    showError("City not found.");
  });
}

function showError(message) {
  $("#location").text("Error");
  $("#description").text(message);
  $("#temp").text("--");
  $("#icon").attr("src", "");
}
