let now = new Date();

let time = document.querySelector("#right-now");

let date = now.getDate();
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
let hour = now.getHours();
let minutes = now.getMinutes();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

time.innerHTML = `${day} ${date} ${month} ${hour}:${minutes}`;

function updateTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `${temp}&degC`;
  let humidity = response.data.main.humidity;
  let humidityToday = document.querySelector("#hum");
  humidityToday.innerHTML = `Humidity: ${humidity}%`;
  let main = response.data.weather[0].main;
  let mainToday = document.querySelector("#main-now");
  mainToday.innerHTML = `${main}`;
}

function updateData(response) {
  let location = document.querySelector("h1");
  let updatedLocation = response.data.name;
  location.innerHTML = `${updatedLocation}`;
  let temp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `${temp}&degC`;
  let humidity = response.data.main.humidity;
  let humidityToday = document.querySelector("#hum");
  humidityToday.innerHTML = `Humidity: ${humidity}%`;
  let main = response.data.weather[0].main;
  let mainToday = document.querySelector("#main-now");
  mainToday.innerHTML = `${main}`;
}

function cityOverwritting(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  let apiKey = "342444b367d13cc01160f5e0ec42822b";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateTemp);
}

function updateLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let apiKey = "342444b367d13cc01160f5e0ec42822b";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(updateData);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(updateLocation);
}

let cityRequest = document.querySelector("#search-bar");
cityRequest.addEventListener("submit", cityOverwritting);

let locationRequest = document.querySelector("#location");
locationRequest.addEventListener("click", getCurrentPosition);
