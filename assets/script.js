console.log("JS connected");
// find the city by using click function on search button
var APIkey = "198a22f2c9df51736e5b079afd6d3dd6";
// variables set to store forecast data
var forecastsByDay;
var mappedResults;

// retrieve city name from local storage and displey city names
var savedCityName = JSON.parse(localStorage.getItem("cityNames")) || [];

// function to create history button
function createHistoryBtn(cityName) {
    var historyBtn = $("<button>")
        .text(cityName)
        .addClass("history-button list-group-item list-group-item-action")
        .attr("style", "background-color: gray");
    $("#history").append(historyBtn);
}

historyBtn.on("click", function (event) {
    event.preventDefault();
    
})
// for each function to get names displayed in history section
savedCityName.forEach(function (cityName) {
    createHistoryBtn(cityName);
});


// click function for search button, to retrieve data from once user presses search button
$("#search-button").on("click", function (event) {
    // prevent page from refreshing once the search button is pressed
    event.preventDefault();
     
    // variable name created to get city's name as user input
    var name = $("#search-input").val();
    // save the city name to local storage
    saveToLocalStorage("cityName", name);
    // add the city name to the savedCityNames array
    savedCityName.push(name);
    // save the updated city names array to local storage
    saveToLocalStorage("cityNames", JSON.stringify(savedCityName));

    // create and display a history button for the new city name
    createHistoryBtn(name);

    $("#today").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + APIkey + "&units=metric";
    // fetching weather data from queryURL
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // console.log(queryURL);
     console.log(data);
      // var created for name of the city
        var cityName = data.name; 
         // var created for current date
        var currentDt = dayjs().format("D-M-YYYY");
        console.log(currentDt);
        // cityEl added to display cityName and currentDt inside html page (<h2>) element
        var cityEl = $("<h2 class='city'>").text(cityName + " " + currentDt);

        // weather icon added
        if (data.weather && data.weather[0] && data.weather[0].icon) {
            // icon var created to get the icon from queryURL data
            var icon = data.weather[0].icon;
            // icon url added from openweathermap.org
            var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
            // var created to add icon url to the <img> element within html page
            var weatherIcon = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");
            // weather icon appended to be displayed next to date
            cityEl.append(weatherIcon);
        }
        // console.log(cityEl);

        // temp, wind, humidity variables are set using data from console array
        var temp = data.main.temp.toFixed(1) + " °C";
        console.log(temp);
        var wind = data.wind.speed.toFixed(1) + " KPH";
        console.log(wind);
        var humidity = data.main.humidity + "%";
        console.log(humidity);
        // temp, wind, humidity are added as elements to html
        var pTemp = $("<p class='temp'>").text("Temp: " + temp);
        var pWind = $("<p class='wind'>").text("Wind: " + wind);
        var pHumidity = $("<p class='humidity'>").text("Humidity: " + humidity);
        // append all the p elements to the cityEl div
        cityEl.append(pTemp);
        cityEl.append(pWind);
        cityEl.append(pHumidity);

        // checking whether there are user search results
        var results = data && data.name;
        // 'bordered' class based on the search results
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
});
// function created to save items to local Storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// function created to fetch ofrecast data by citys latitude and longitude
function displayForecast(latitude, longitude) {
    $("#forecast").empty();
    // queery URL for forecast data
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + APIkey;
    // getting weather data from queryURL
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("API data: ", data);
            // call the groupforecastbyday function
            forecastsByDay = groupForecastsByDay(data.list);
            console.log(forecastsByDay);
            // call mapResults function 
            mappedResults = mapResults();

           
            var forecastEl = $("<h3 class='forecast-title'>").text("5 Day Forecast");
            $("#forecast").append(forecastEl);
            var div = $("<div class='input-forecast flex-container'>");

          //  display mapResults
            for (var i = 0; i < mappedResults.length; i++) {
                var date = mappedResults[i].date;
                console.log(date);
                var minTemp = mappedResults[i].minTemp.toFixed(2) + " °C";
                console.log("Min Temp:", minTemp);
                var maxTemp = mappedResults[i].maxTemp.toFixed(2) + " °C";
                console.log("Max Temp: ", maxTemp);
                var temp;
                // need to check if maxTemp is positive or negative
                if (parseFloat(minTemp) < 0) {
                    temp = minTemp;
                    // console.log(minTemp);
                } else {
                    temp = maxTemp;
                    // console.log(maxTemp);
                };
                console.log("Displayed temp: ", temp);

                var humidity = mappedResults[i].maxHum.toFixed(0) + " %";
                console.log("Humidity: ", humidity);
                var windSpeed = mappedResults[i].maxWindSpd.toFixed(2) + " KPH";
                console.log("Wind Speed: ", windSpeed);
                var iconUrl = mappedResults[i].iconUrl;
                console.log("Icon URL: ", iconUrl);
                // add it to html
                var dateEl = $("<h5 class='date'>").text(date);
                var pTemp = $("<p class='temp'>").text("Temp: " + temp);
                var pWind = $("<p class='wind'>").text("Wind Speed: " + windSpeed);
                var pHumidity = $("<p class='humidity'>").text("Humidity: " + humidity);
                var iconImg = $("<img>").attr("src", iconUrl).attr("alt", "Weather Icon");

                // new div element to store each days forecast within the container
                var dayContainer = $("<div class='day-container'>");

                // append to get it displayed
                dayContainer.append(dateEl);
                dayContainer.append(iconImg);
                dayContainer.append(pTemp);
                dayContainer.append(pWind);
                dayContainer.append(pHumidity);

                // append container to the forecast element
                div.append(dayContainer);
            };
            $("#forecast").append(div);
        });
};

// ! need to group forecast data into a new array, each array would be different day 
function groupForecastsByDay(forecasts) {
    // set var for new array
    var forecastsByDay = {};
    // console.log(forecastsByDay);

    // loop to go through each forecast in the array
    forecasts.forEach(forecast => {
        // for each forecast take a date and time and convert it to local date and time
        var date = forecast.dt_txt.split(' ')[0];
        // console.log(date);
        // if the same date array doesn't exist, then create a new one
        if (!forecastsByDay[date]) {
            forecastsByDay[date] = [];
        };
        // push current forecast into the array dependant on the date
        forecastsByDay[date].push(forecast);
    });
    return forecastsByDay;
};
// console.log("return: ", forecastsByDay);

// can map() results from new array to get average temp, humidity, and icon
// function to calculate min max temperature, humidity, wind speed
function calculateMinMax(forecasts) {
    // Initialize minTemp and maxTemp with the first temperature value
    var firstTemp = forecasts[0].main.temp;
    var minTemp = firstTemp;
    var maxTemp = firstTemp;

    var minHum = Number.MAX_VALUE;
    var maxHum = Number.MIN_VALUE;
    var minWindSpd = Number.MAX_VALUE;
    var maxWindSpd = Number.MIN_VALUE;
    // for each function to go through each dates array and get min/max
    forecasts.forEach(forecast => {
        var temp = forecast.main.temp;
        var humidity = forecast.main.humidity;
        var windSpeed = forecast.wind.speed;
        // get min/max for temp, humidity, wind speed
        minTemp = Math.min(minTemp, temp);
        maxTemp = Math.max(maxTemp, temp);

        minHum = Math.min(minHum, humidity);
        maxHum = Math.max(maxHum, humidity);

        minWindSpd = Math.min(minWindSpd, windSpeed);
        maxWindSpd = Math.max(maxWindSpd, windSpeed);
    });

    return {
        minTemp,
        maxTemp,
        minHum,
        maxHum,
        minWindSpd,
        maxWindSpd
    };
}

// create a function to map all over an array of each day 
// get object with the date and min/max temp
function mapResults() {
    // get forecastsByDay data date object
    var mappedResults = Object.keys(forecastsByDay).map(date => {
        var forecastForDate = forecastsByDay[date];
    var { minTemp, maxTemp, minHum, maxHum, minWindSpd, maxWindSpd } = calculateMinMax(forecastsByDay[date]);
    // console.log("Mapped Min Temp:", minTemp);
    //     console.log("Mapped Max Temp:", maxTemp);

    if (maxTemp !== null) {
        // use 3pm time for the icon
        var forecast3PM = forecastForDate.find(forecast => forecast.dt_txt.includes('15:00:00'));
        // check if forecast3PM.weather exist before accesing properties
        if (forecast3PM && forecast3PM.weather && forecast3PM.weather[0]) {
            // set var for icon
        var icon = forecast3PM.weather[0].icon;
        // add icon URL
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        // return mapResults as an array
        return {
            date: date,
            minTemp: minTemp,
            maxTemp: maxTemp,
            // minHum: minHum,
            maxHum: maxHum,
            // minWindSpd: minWindSpd,
            maxWindSpd: maxWindSpd,
            iconUrl
        };
    } else {
        return null;
    }};
});
    console.log(mappedResults);
    // filter the results
    return mappedResults.filter(result => result !== null);
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