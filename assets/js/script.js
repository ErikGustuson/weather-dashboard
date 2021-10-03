// first i need to capture users input
// i will need to target button and have it assing inner text as a string and assign it a var to use
var searchedCity = document.getElementById("city-name");
var searchButton = document.getElementById("search-city");

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // alert('ayyyyy you clicked me')
  var currentCity = searchedCity.value;
  console.log(currentCity);
});


// TODO: when searching for a city it will update the current and future conditions for that city
// when entering city it should save to local store
// TODO: when city is searched it will add it to the search history
// one page load it should populate previously searched citys on list with a max of 4
// when clicking on search button it should know to pull info from input box
// TODO: current weather conditions should include -city name, the date, an icon of the weather, the temp, the humidity, the wind speed and the UV index
// TODO: when viewing the uv index a color should indicate the condition as favorable, moderater or sever
// TODO: 5 day forecast should display date, icon of the weather, the temp and humidity
// TODO: when clicking on city in the search history the page should populate that citys current and future conditions
