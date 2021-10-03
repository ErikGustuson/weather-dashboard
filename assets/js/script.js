// run function to display cits at page load
init();
// first i need to capture users input
// i will need to target button and have it assing inner text as a string and assign it a var to use
var searchedCity = document.getElementById("city-name");
var searchButton = document.getElementById("search-city");
var currentCity;

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // alert('ayyyyy you clicked me')
  currentCity = searchedCity.value;
  console.log(currentCity);
  getLonLat();
});

// save input to local storage
function saveCity() {
  var savedCity = {
    city: searchedCity.value,
  };
  localStorage.setItem("saved-city", JSON.stringify(savedCity));
  showCity();
}

// pull from storage
function showCity() {
  var lastCity = JSON.parse(localStorage.getItem("saved-city"));
  document.getElementById("first-city").innerHTML = lastCity.city;
}

// function ran at top when page loads
function init() {
  showCity();
}
var lat;
var lon;

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
      for (let i = 0; i < response.length; i++) {
        console.log(response[i].lon);
        console.log(response[i].lat);
        response[i].lon = lon;
        response[i].lat = lat;
        saveCity();
      }
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

// TODO: when searching for a city it will update the current and future conditions for that city
// when entering city it should save to local store
// TODO: when city is searched it will add it to the search history
// one page load it should populate previously searched citys on list with a max of 4
// when clicking on search button it should know to pull info from input box
// TODO: current weather conditions should include -city name, the date, an icon of the weather, the temp, the humidity, the wind speed and the UV index
// TODO: when viewing the uv index a color should indicate the condition as favorable, moderater or sever
// TODO: 5 day forecast should display date, icon of the weather, the temp and humidity
// TODO: when clicking on city in the search history the page should populate that citys current and future conditions
