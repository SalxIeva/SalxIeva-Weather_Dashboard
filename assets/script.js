console.log("JS connected");
// find the city by using click function on search button
var APIKey = "198a22f2c9df51736e5b079afd6d3dd6";

// click function for search button, to retrieve data from once user presses search button
$("#search-button").on("click", function (event) {
    // prevent page from refreshing once the search button is pressed
    event.preventDefault();
     
    // variable name created to get city's name as user input
    var name = $("#search-input").val();

    // var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=" + APIkey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + APIKey + "&units=metric";
    // fetching weather data from queryURL
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //  console.log(queryURL);
     console.log(data);
     
    // var lat = data.coord.lat.toFixed(2);
    // console.log(lat);
    // var lon = data.coord.lon.toFixed(2);
    // console.log(lon);
    //  var results = data;
     
    //  for (var i = 0; i < results.length; i++) {
        // var currentDt = dayjs("D-M-YYYY");
        // var cityDiv = $("<div class='city'>").text(data.main.name + currentDt);
        //      // var pOne = $("<p>").text("Temp: " + )
        //      console.log(currentDt);
        //     }

        var cityName = data.name;
        // var created for current date
        var currentDt = dayjs().format("D-M-YYYY");
        console.log(currentDt);
        var cityEl = $("<h2 class='city'>").text(cityName + " " + currentDt);

        // weather icon added
        if (data.weather && data.weather[0] && data.weather[0].icon) {
            var icon = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            var weatherIcon = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");
            cityEl.append(weatherIcon);
        }
        // console.log(cityEl);

        // temp, wind, humidity variables are set using data from console array
        var temp = data.main.temp.toFixed(0) + " °C";
        console.log(temp);
        var wind = data.wind.speed.toFixed(1) + " KPH";
        console.log(wind);
        var humidity = data.main.humidity + "%";
        console.log(humidity);
        // temp, wind, humidity are added as elements to html
        var pTemp = $("<p id='temp'>").text("Temp: " + temp);
        var pWind = $("<p id='wind'>").text("Wind: " + wind);
        var pHumidity = $("<p id='humidity'>").text("Humidity: " + humidity);
        // append all the p elements to the cityEl div
        cityEl.append(pTemp);
        cityEl.append(pWind);
        cityEl.append(pHumidity);

        // checking whether there are user search results
        var results = data && data.name;
        // add or remove the 'bordered' class based on the search results
        $("#today").toggleClass('bordered', results);

        // $("#today").empty();
        $("#today").append(cityEl);
   
        // Call displayForecast with lat and lon
        if (results) {
            var lat = data.coord.lat.toFixed(2);
            var lon = data.coord.lon.toFixed(2);
            displayForecast(lat, lon);
        }
    });
})

// function created to fetch ofrecast data by citys latitude and longitude
function displayForecast(latitude, longitude) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + APIKey;
    
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("API data: ", data);
           
       
            // map(day, index) {
            // }
        });
}


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
