var loc = "Dhaka";

let apiKey = "44149fa9931c4737024864f5b6c14a28";
let apiUrl =
  "api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=" + apiKey;

async function getWeather() {
  let result = await fetch(apiUrl);
  console.log(result);
}

getWeather();
