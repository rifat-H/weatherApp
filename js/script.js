// elements to work with start
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

// updates data to dom
function updateData(data) {}

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
  console.log(data);
}

getWeather().then((data) => {
  let weatherDataArr = modifyData(data);
});
