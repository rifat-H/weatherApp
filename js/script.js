// elements to work with start
let go = document.getElementById("go");
let locationInput = document.getElementById("location");
let loca = document.getElementById("loc");
let sunr = document.getElementById("sunr");
let suns = document.getElementById("suns");
let ctempe = document.getElementById("ctempe");
let maxtempe = document.getElementById("maxtempe");
let mintempe = document.getElementById("mintempe");
let weather = document.getElementById("weather");
// elements to work with end

var loc = "Dhaka";

// let apiKey = "44149fa9931c4737024864f5b6c14a28";
let apiKey = "05d8da51ea2c2995c01b6c0650f02eba";

let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  loc +
  "&appid=" +
  apiKey;

// gets weather data
async function getWeather() {
  let result = await fetch(apiUrl);
  let data = await result.json();
  return data;
}

// get data in array with fix
function modifyData(data) {
  let frontLocation = data.name;
  let frontCountry = data.sys.country;
  let timestampSunrise = data.sys.sunrise;
  let timestampSunset = data.sys.sunset;
  let apiCurrentTemp = data.main.temp;
  let apiMaxTemp = data.main.temp_max;
  let apiMinTemp = data.main.temp_min;
  let frontDesctiption = data.weather[0].description;

  return {
    location: frontLocation + ", " + frontCountry,
    weather: frontDesctiption,
    sunrise: tsTot(timestampSunrise),
    sunset: tsTot(timestampSunset),
    tempNow: apiCurrentTemp,
    maxTemp: apiMaxTemp,
    minTemp: apiMinTemp,
  };
}

// updates data to dom
function updateData(data) {
  loca.innerHTML = data.location;
  weather.innerHTML = data.weather.toUpperCase();
  sunr.innerHTML = data.sunrise;
  suns.innerHTML = data.sunset;
  ctempe.innerHTML = data.tempNow;
  maxtempe.innerHTML = data.maxTemp;
  mintempe.innerHTML = data.minTemp;
}

function getData() {
  getWeather().then((data) => {
    let weatherData = modifyData(data);
    updateData(weatherData);
  });
}

// time functions

function tsTot(ts) {
  return moment.unix(ts).format("Do MMMM, h:mm:ss a");
}

// start search functionality

go.addEventListener("click", initSearch);

locationInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    initSearch();
  }
});

function initSearch() {
  loc = locationInput.value;
  apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    loc +
    "&appid=" +
    apiKey;

  getData();
}

getData();
