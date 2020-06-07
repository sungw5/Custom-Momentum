const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1"),
  clockampm = clockContainer.querySelector("span");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  clockampm.innerText = `${ampm}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
