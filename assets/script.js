console.log("JS connected");
// find the city by using click function on search button
$("#search-button").on("click", function (event) {
    event.preventDefault();
     
    var name = $("#search-input").val();
    var APIKey = "";

    // var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=" + APIkey;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     console.log(queryURL);
     console.log(data);
    });

})


// Create a weather dashboard with form inputs.
// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:
// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed
// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// When a user click on a city in the search history they are again presented with current and future conditions for that city