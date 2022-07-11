let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);

let todayIs = document.querySelector("h2");
todayIs.innerHTML = `It is ${day}, ${hours}:${minutes}`;
console.log({ todayIs });

function searchCity(city) {
  let apiKey = "5a2bc0f119fac6979037fb48f0277d71";
  let units = "metric";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(searchApiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector(`#main-city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
}
let searchResult = document.querySelector("#search-form");
searchResult.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let currentButton = document.querySelector(`#current-location`);
currentButton.addEventListener("click", showCurrentPosition);

function changeToFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector(`#temperature`);

  degrees.innerHTML = `90`;
}

function backToCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector(`#temperature`);

  degrees.innerHTML = `32`;
}

let fahrenheit = document.querySelector(`#fahrenheit-link`);
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector(`#celsius-link`);
celsius.addEventListener("click", backToCelsius);

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5a2bc0f119fac6979037fb48f0277d71";
  let units = "metric";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(currentApiUrl).then(showTemperature);
}

searchCity("New York");
