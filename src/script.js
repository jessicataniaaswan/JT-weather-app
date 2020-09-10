function changeBackground() {
  console.log(currentHour);
  if (currentHour > 18) {
    document.getElementById("weatherContainer").style.backgroundImage =
      "linear-gradient(to top, #09203f 0%, #537895 100%)";
  } else {
    document.getElementById("weatherContainer").style.backgroundImage =
      "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";
    var alles = document
      .getElementById("weatherContainer")
      .querySelectorAll("a, div, span, p, h1");
    for (var i = 0; i < alles.length; i++) {
      alles[i].style.color = "black";
    }

    var alles = document.getElementById("forecast").getElementsByTagName("*");
    for (var i = 0; i < alles.length; i++) {
      alles[i].style.color = "black";
    }

    var alles = document
      .getElementById("weatherContainer")
      .querySelectorAll("hr");
    for (var i = 0; i < alles.length; i++) {
      alles[i].style.border = "1px solid #b3b3b3";

      var alles = document
        .getElementById("weatherContainer")
        .querySelectorAll("button");
      for (var i = 0; i < alles.length; i++) {
        alles[i].style.backgroundColor = "#d9d9d9";
      }
    }
  }
}

let weatherIcons = {};
weatherIcons["01d"] =
  "https://gist.githubusercontent.com/AlexBlack88/71646c046ba64fa40ce47eea3035b5df/raw/a37d18972c301462c172da1e79f0fc1da94859a0/day.svg";
weatherIcons["01n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/night.svg";
weatherIcons["02d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-2.svg";
weatherIcons["02n"] =
  "hhttps://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-night-2.svg";
weatherIcons["03d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
weatherIcons["03n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
weatherIcons["04d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
weatherIcons["04n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
weatherIcons["09d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-6.svg";
weatherIcons["09n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-6.svg";
weatherIcons["10d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-3.svg";
weatherIcons["10n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-5.svg";
weatherIcons["11d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg";
weatherIcons["11n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/thunder.svg";
weatherIcons["13d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg";
weatherIcons["13n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg";
weatherIcons["50d"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";
weatherIcons["50n"] =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg";

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(celciusTemperature);
  let heading = document.querySelector(".temperature");
  let iconElement = document.querySelector("#icon");
  heading.innerHTML = temperature;
  document.querySelector("#windNumber").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidityNumber").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#currentSituation").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `${weatherIcons[response.data.weather[0].icon]}`
  );
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e3705025ac4df4eec8448cea876a48b3";
  let units = "metric";
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiStart}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[currentTime.getDay()];
let currentDate = currentTime.getDate();
let currentMonth = months[currentTime.getMonth()];
let currentYear = currentTime.getFullYear();
let currentHour = currentTime.getHours();

let nowDate = document.querySelector("#currentDate");
nowDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;

function displayForecast(response) {
  console.log(currentTime.getDay());
  forecastElement = document.querySelector("#forecast");

  // H+1
  let forecast = response.data.list[7];
  let dayName = days[(currentTime.getDay() + 1) % 7].substring(0, 3);

  forecastElement.innerHTML = `
   <div class="p-2 extraPadding">
      <div class="day">${dayName}</div>
      <img
       class="upcomingIcon"
       src="${weatherIcons[forecast.weather[0].icon]}"
       alt="sunnyIcon"
       />
       <div class="temperature">${Math.round(forecast.main.temp_max)}°c</div>
       </div>
  `;

  forecast = response.data.list[16];
  dayName = days[(currentTime.getDay() + 2) % 7].substring(0, 3);
  console.log(forecast.weather[0]);
  forecastElement.innerHTML += `
   <div class="p-2 extraPadding">
      <div class="day">${dayName}</div>
      <img
       class="upcomingIcon"
       src="${weatherIcons[forecast.weather[0].icon]}"
       alt="sunnyIcon"
       />
       <div class="temperature">${Math.round(forecast.main.temp_max)}°c</div>
       </div>
  `;

  forecast = response.data.list[24];
  dayName = days[(currentTime.getDay() + 3) % 7].substring(0, 3);
  forecastElement.innerHTML += `
   <div class="p-2 extraPadding">
      <div class="day">${dayName}</div>
      <img
       class="upcomingIcon"
       src="${weatherIcons[forecast.weather[0].icon]}"
       alt="sunnyIcon"
       />
       <div class="temperature">${Math.round(forecast.main.temp_max)}°c</div>
       </div>
  `;

  forecast = response.data.list[32];
  dayName = days[(currentTime.getDay() + 4) % 7].substring(0, 3);
  forecastElement.innerHTML += `
   <div class="p-2 extraPadding">
      <div class="day">${dayName}</div>
      <img
       class="upcomingIcon"
       src="${weatherIcons[forecast.weather[0].icon]}"
       alt="sunnyIcon"
       />
       <div class="temperature">${Math.round(forecast.main.temp_max)}°c</div>
       </div>
  `;

  forecast = response.data.list[39];
  dayName = days[(currentTime.getDay() + 5) % 7].substring(0, 3);
  forecastElement.innerHTML += `
   <div class="p-2 extraPadding">
      <div class="day">${dayName}</div>
      <img
       class="upcomingIcon"
       src="${weatherIcons[forecast.weather[0].icon]}"
       alt="sunnyIcon"
       />
       <div class="temperature">${Math.round(forecast.main.temp_max)}°c</div>
       </div>
  `;
}

function search(city) {
  let apiKey = "e3705025ac4df4eec8448cea876a48b3";
  let units = "metric";
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlCity = `${apiStart}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCity).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let units = "metric";
  let apiKey = "e3705025ac4df4eec8448cea876a48b3";
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlCity = `${apiStart}?q=${city}&appid=${apiKey}&units=${units}`;
  let city = document.querySelector("#search-text-input");
  axios.get(apiUrlCity).then(showTemperature);
  search(city);
}

function showCity(value) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  search(searchInput.value);
}

let insertCity = document.querySelector("#search-form");
insertCity.addEventListener("submit", showCity);

function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}

let tempCelcius = document.querySelector("#celcius-link");
tempCelcius.addEventListener("click", showCelcius);

let celciusTemperature = null;

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let tempFahrenheit = document.querySelector("#fahrenheit-link");
tempFahrenheit.addEventListener("click", showFahrenheit);

search("New York");
changeBackground();
