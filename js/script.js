// elements to work with start
const go = document.getElementById("go");
const locationInput = document.getElementById("location");
const loca = document.getElementById("loc");
const sunr = document.getElementById("sunr");
const suns = document.getElementById("suns");
const ctempe = document.getElementById("ctempe");
const maxtempe = document.getElementById("maxtempe");
const mintempe = document.getElementById("mintempe");
const weather = document.getElementById("weather");
// elements to work with end

let loc = "Dhaka";

const apiKey = "05d8da51ea2c2995c01b6c0650f02eba";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;

// gets weather data
async function getWeather() {
  const result = await fetch(apiUrl);
  const data = await result.json();
  return data;
}

// get data in array with fix
function modifyData(data) {
  const frontLocation = data.name;
  const frontCountry = data.sys.country;
  const timestampSunrise = data.sys.sunrise;
  const timestampSunset = data.sys.sunset;
  const apiCurrentTemp = data.main.temp;
  const apiMaxTemp = data.main.temp_max;
  const apiMinTemp = data.main.temp_min;
  const frontDesctiption = data.weather[0].description;

  return {
    location: frontLocation + ", " + frontCountry,
    weather: frontDesctiption,
    sunrise: timestampToTime(timestampSunrise),
    sunset: timestampToTime(timestampSunset),
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

async function getData() {
  const data = await getWeather();

  if (data.cod != 200) {
    locationNotFound(loc);
  }

  const weatherData = modifyData(data);
  updateData(weatherData);
}

// time functions

function timestampToTime(ts) {
  // console.log(format(new Date(), ""));

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

// location not found error handler

const locationNotFound = (loc) => {
  document.getElementById(
    "locationToastBody"
  ).innerHTML = `"<span class='text-danger'>${loc}</span>" not found`;
  $(".toast").toast("show");
  throw new Error("Location Not found");
};

getData();
