const weather = document.querySelector(".js-weather");

// obtained from "https://home.openweathermap.org/api_keys"
const API_KEY = "774b19e72498dd003129d196be510b19";
const COORDINATE = "coords";

// get data without refreshing the page!
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `Temperature: ${temperature} º @ ${place}`;
    });
}

// save coordinate info in local storage
function saveCoordinate(coordsObj) {
  localStorage.setItem(COORDINATE, JSON.stringify(coordsObj));
}

// When allow the popup, create an obj for coords and save at local storage
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoordinate(coordsObj);
  getWeather(latitude, longitude);
}

// prints error message
function handleGeoError() {
  console.log("Cannot access geo location");
}

// creates pop up for asking to allow location
function askForCoordinate() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoordinate() {
  const loadedCoordinate = localStorage.getItem(COORDINATE);
  if (loadedCoordinate === null) {
    askForCoordinate();
  } else {
    // parse to obj since they are string
    const parsedCoords = JSON.parse(loadedCoordinate);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoordinate();
}

init();
