function changeBackground() {
  if (currentHour > 18) {
    document.querySelector("#weatherContainer").style = "white";
  } else {
    document.querySelector("#weatherContainer").style = "red";
  }
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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

function search(city) {
  let apiKey = "e3705025ac4df4eec8448cea876a48b3";
  let units = "metric";
  let apiStart = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlCity = `${apiStart}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCity).then(showTemperature);
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
  temperature.innerHTML = "20";
}

let tempCelcius = document.querySelector("#celcius-link");
tempCelcius.addEventListener("click", showCelcius);

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = "68";
}

let tempFahrenheit = document.querySelector("#fahrenheit-link");
tempFahrenheit.addEventListener("click", showFahrenheit);

search("New York");
changeBackground();
