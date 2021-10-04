// first i need to capture users input
// i will need to target button and have it assing inner text as a string and assign it a var to use
var searchedCity = document.getElementById("city-name");
var searchButton = document.getElementById("search-city");
var currentCity;
var allCities = JSON.parse(localStorage.getItem("saved-city")) || [];

// when clicking on search button it should know to pull info from input box
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // alert('ayyyyy you clicked me')
  currentCity = searchedCity.value;
  console.log(currentCity);
  getLonLat();
});

// save input to local storage
// when city is searched it will add it to the search history
function saveCity() {
  allCities.unshift(searchedCity.value);
  showCity();
  localStorage.setItem("saved-city", JSON.stringify(allCities));
}

// pull from storage
function showCity() {
  if (allCities.length > 4) {
    allCities.pop();
  }
  console.log(allCities);
  document.getElementById("first-city").innerHTML = allCities[0];
  document.getElementById("second-city").innerHTML = allCities[1];
  document.getElementById("third-city").innerHTML = allCities[2];
  document.getElementById("fourth-city").innerHTML = allCities[3];
  // if allCities.length is greater than 4, pop
}

// function ran at top when page loads
function init() {
  showCity();
}

var lat;
var lon;
console.log(lat);
console.log(lon);

// get lon and lat
function getLonLat() {
  var geoApiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    currentCity +
    "&limit=1&appid=bcf0f3e083d40c7832b737bfb3c1e368";
  $.ajax({
    url: geoApiUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    if (response.length == 0) {
      alert("Please enter a valid city name.");
    } else {
      console.log(response[0].lon);
      console.log(response[0].lat);
      lon = response[0].lon;
      lat = response[0].lat;
      saveCity();
      getWeatherInfo(lat, lon);
    }
  });
}
// fetch(geoApiUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// use lat and lon to get weather information to update page

// function timeConverter(UNIX_timestamp){
//   var a = new Date(UNIX_timestamp * 1000);
//   var date = a.getDate();
//   var time = date;
//   return time;
// }

function getWeatherInfo(lat, lon) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&units=imperial&appid=bcf0f3e083d40c7832b737bfb3c1e368";
  $.ajax({
    url: weatherUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.daily[1].dt);
    // weather info for current day
    $("#current-city").text(currentCity);
    $("#current-date").text(moment.unix(response.current.dt).format("dddd"));
    var icon =
      "http://openweathermap.org/img/wn/" +
      response.current.weather[0].icon +
      "@2x.png";
    $("#current-icon").attr("src", icon);
    $("#current-temp").text("Temp: " + response.current.temp);
    $("#current-humidity").text("Humidity: " + response.current.humidity);
    $("#current-windspeed").text("Wind: " + response.current.wind_speed);
    $("#current-uv").text("UV index: " + response.current.uvi);

    // weather info for the 5 day fourcast
    // first day
    $("#date-one").text(moment.unix(response.daily[1].dt).format("dddd"));
    var iconOne =
      "http://openweathermap.org/img/wn/" +
      response.daily[1].weather[0].icon +
      "@2x.png";
    $("#icon-one").attr("src", iconOne);
    $("#temp-one").text("Temp: " + response.daily[1].temp.day);
    $("#humidity-one").text("Humidity: " + response.daily[1].humidity);

    //second day
    $("#date-two").text(moment.unix(response.daily[2].dt).format("dddd"));
    var iconTwo =
      "http://openweathermap.org/img/wn/" +
      response.daily[2].weather[0].icon +
      "@2x.png";
    $("#icon-two").attr("srv", iconTwo);
    $("#temp-two").text("Temp: " + response.daily[2].temp.day);
    $("#humidity-two").text("Humidity: " + response.daily[2].humidity);

    //third day
    $("#date-three").text(moment.unix(response.daily[2].dt).format("dddd"));
    var iconThree =
      "http://openweathermap.org/img/wn/" +
      response.daily[3].weather[0].icon +
      "@2x.png";
    $("#icon-three").attr("src", iconThree);
    $("#temp-three").text("Temp: " + response.daily[3].temp.day);
    $("#humidity-three").text("Humidity: " + response.daily[3].humidity);

    // fourth day
    $("#date-four").text(moment.unix(response.daily[2].dt).format("dddd"));
    var iconFour =
      "http://openweathermap.org/img/wn/" +
      response.daily[3].weather[0].icon +
      "@2x.png";
    $("#icon-four").attr("src", iconFour);
    $("#temp-four").text("Temp: " + response.daily[3].temp.day);
    $("#humidity-four").text("Humidity: " + response.daily[3].humidity);

    // fifth day
    $("#date-five").text(moment.unix(response.daily[2].dt).format("dddd"));
    var iconFive =
      "http://openweathermap.org/img/wn/" +
      response.daily[3].weather[0].icon +
      "@2x.png";
    $("#icon-five").attr("src", iconFive);
    $("#temp-five").text("Temp: " + response.daily[3].temp.day);
    $("#humidity-five").text("Humidity: " + response.daily[3].humidity);
  });
}

var firstCityButton = document.getElementById("first-city")
var secondCityButton = document.getElementById("second-city")
var thirdCityButton = document.getElementById("third-city")
var fourthCityButton = document.getElementById("fourth-city")

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // alert('ayyyyy you clicked me')
  currentCity = searchedCity.value;
  console.log(currentCity);
  getLonLat();
});

// when searching for a city it will update the current and future conditions for that city

// current weather conditions should include -city name, the date, an icon of the weather, the temp, the humidity, the wind speed and the UV index
// TODO: when viewing the uv index a color should indicate the condition as favorable, moderater or sever
// 5 day forecast should display date, icon of the weather, the temp and humidity
// TODO: when clicking on city in the search history the page should populate that citys current and future conditions

// one page load it should populate previously searched citys on list with a max of 4
// run function to display cits at page load
init();
