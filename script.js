const cityInput = document.getElementById("cityInput");

/* -------- CLEAR OLD DATA WHEN USER TYPES -------- */

cityInput.addEventListener("input", function () {

document.getElementById("weatherInfo").style.display = "none";

document.getElementById("tempC").textContent = "--";
document.getElementById("tempF").textContent = "--";
document.getElementById("humidity").textContent = "--";
document.getElementById("wind").textContent = "--";
document.getElementById("condition").textContent = "--";
document.getElementById("sunrise").textContent = "--";
document.getElementById("sunset").textContent = "--";
document.getElementById("aqi").textContent = "--";
document.getElementById("pop").textContent = "--";

});

function getWeather(){

const city = document.getElementById("cityInput").value;

if(city.trim() === ""){
alert("Please enter a city name");
return;
}

const API_KEY = "5fd396a481e71917b5941729d6aabfdb";

const weatherURL =
"https://api.openweathermap.org/data/2.5/weather?q=" +
city +
"&appid=" +
API_KEY +
"&units=metric";

fetch(weatherURL)
.then(response => response.json())
.then(data => {

if(data.cod == "404"){
alert("Please enter a valid city name");
return;
}

document.getElementById("weatherInfo").style.display = "block";

const temp = data.main.temp;

document.getElementById("tempC").textContent = temp;
document.getElementById("tempF").textContent = (temp * 9/5 + 32).toFixed(2);

document.getElementById("humidity").textContent = data.main.humidity;
document.getElementById("wind").textContent = data.wind.speed;

const condition = data.weather[0].main;
document.getElementById("condition").textContent = condition;

const sunriseTime = new Date(data.sys.sunrise * 1000);
const sunsetTime = new Date(data.sys.sunset * 1000);

document.getElementById("sunrise").textContent = sunriseTime.toLocaleTimeString();
document.getElementById("sunset").textContent = sunsetTime.toLocaleTimeString();

changeBackground(condition);

/* ---------- AQI ---------- */

const lat = data.coord.lat;
const lon = data.coord.lon;

const aqiURL =
"https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
lat +
"&lon=" +
lon +
"&appid=" +
API_KEY;

fetch(aqiURL)
.then(response => response.json())
.then(aqiData => {

const aqi = aqiData.list[0].main.aqi;

let aqiText = "";

if(aqi === 1) aqiText = "Good";
else if(aqi === 2) aqiText = "Fair";
else if(aqi === 3) aqiText = "Moderate";
else if(aqi === 4) aqiText = "Poor";
else if(aqi === 5) aqiText = "Very Poor";

document.getElementById("aqi").textContent = aqiText;

});

/* ---------- PRECIPITATION PROBABILITY ---------- */

const forecastURL =
"https://api.openweathermap.org/data/2.5/forecast?q=" +
city +
"&appid=" +
API_KEY +
"&units=metric";

fetch(forecastURL)
.then(response => response.json())
.then(forecastData => {

const pop = forecastData.list[0].pop * 100;

document.getElementById("pop").textContent = pop.toFixed(0);

});

})
.catch(error => {
console.log(error);
alert("Error loading weather data");
});

}

function changeBackground(condition){

const body = document.body;

if(condition === "Clear"){
body.style.background = "linear-gradient(to right,#56ccf2,#2f80ed)";
}
else if(condition === "Clouds"){
body.style.background = "linear-gradient(to right,#757f9a,#d7dde8)";
}
else if(condition === "Rain"){
body.style.background = "linear-gradient(to right,#314755,#26a0da)";
}
else if(condition === "Snow"){
body.style.background = "linear-gradient(to right,#e6dada,#274046)";
}
else if(condition === "Thunderstorm"){
body.style.background = "linear-gradient(to right,#232526,#414345)";
}
else{
body.style.background = "#000";
}

}
