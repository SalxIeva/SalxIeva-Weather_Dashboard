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
    //  console.log(queryURL);
     console.log(data);
     
    //  var results = data;
     
    //  for (var i = 0; i < results.length; i++) {
        // var currentDt = dayjs("D-M-YYYY");
        // var cityDiv = $("<div class='city'>").text(data.main.name + currentDt);
        //      // var pOne = $("<p>").text("Temp: " + )
        //      console.log(currentDt);
        //     }
        var cityName = data.name;
        var currentDt = dayjs().format("D-M-YYYY");
        console.log(currentDt);
        var cityDiv = $("<div class='city'>").text(cityName + currentDt);
        console.log(cityDiv);
        var temp = data.main.temp.toFixed(0) + " °C";
        console.log(temp);
        var wind = data.wind.speed.toFixed(1) + " KPH";
        console.log(wind);
        var humidity = data.main.humidity + "%";
        console.log(humidity);

        var pTemp = $("<p id='temp'>").text("Temp: " + temp);
        var pWind = $("<p id='wind'>").text("Wind: " + wind);
        var pHumidity = $("<p id='humidity'>").text("Humidity: " + humidity);

        cityDiv.append(pTemp);
        cityDiv.append(pWind);
        cityDiv.append(pHumidity);
        $("#today").empty();
        $("#today").append(cityDiv);
        
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
