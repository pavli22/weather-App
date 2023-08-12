"use strict";
let allLinks = document.querySelectorAll("nav ul li");
let data = {};

getWeather("cairo");

function getMonth(date) {
  const months = [
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
  const d = new Date(date);
  return months[d.getMonth()];
}

function getDay(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date(date);
  return days[d.getDay()];
}

for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener("click", function () {
    for (let j = 0; j < allLinks.length; j++) {
      if (allLinks[j].classList.contains("active")) {
        allLinks[j].classList.remove("active");
      }
    }
    allLinks[i].classList.add("active");
  });
}
document.querySelector("input").addEventListener("keyup", function () {
  getWeather(this.value);
});

async function getWeather(location) {
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=da95e38f8f5b4ee4b60183749230708&q=${location}&days=7`
  );
  data = await req.json();
  getCurrentWeather();
  getAfterCurrentWeather();
  getAfterAfterCurrentWeather();
}

function getCurrentWeather() {
  let currentLocation;
  let currentDay;
  let currentDate;
  let currentMonth;
  let currentDayOfMonth;
  let currentTemp;
  let currentCondition;
  let currentConditionImg;
  currentLocation = data.location.name;
  currentDate = data.location.localtime;
  currentDay = getDay(data.location.localtime);
  currentMonth = getMonth(data.location.localtime);
  let d = new Date(currentDate);
  currentDayOfMonth = d.getDate();
  currentCondition = data.current.condition.text;
  currentConditionImg = data.current.condition.icon;
  currentTemp = data.current.temp_c;
  document.querySelector(".location").innerHTML = currentLocation;
  document.querySelector(".heading .day").innerHTML = currentDay;
  document.querySelector(".heading .month .MN").innerHTML = currentMonth;
  document.querySelector(".heading .month .MD").innerHTML = currentDayOfMonth;
  document
    .querySelector(".temp-content img")
    .setAttribute("src", currentConditionImg);
  document.querySelector(".temp-content .temp").innerHTML = currentTemp + "°C";
  document.querySelector(".condition").innerHTML = currentCondition;
}

function getAfterCurrentWeather() {
  let afterCurrentDay = getDay(data.forecast.forecastday[1].date);
  let afterCurrentTempMax = data.forecast.forecastday[1].day.maxtemp_c;
  let afterCurrentTempMin = data.forecast.forecastday[1].day.mintemp_c;
  let afterCurrentCondition = data.forecast.forecastday[1].day.condition.text;
  let afterCurrentConditionImg =
    data.forecast.forecastday[1].day.condition.icon;
  document.querySelector(".After-current .heading span").innerHTML =
    afterCurrentDay;
  document
    .querySelector(".After-current div img")
    .setAttribute("src", afterCurrentConditionImg);
  document.querySelector(".After-current .temp-max").innerHTML =
    afterCurrentTempMax;
  document.querySelector(".After-current .temp-min").innerHTML =
    afterCurrentTempMin;
  document.querySelector(".After-current .condition span").innerHTML =
    afterCurrentCondition;
}
function getAfterAfterCurrentWeather() {
  let afterAfterCurrentDay = getDay(data.forecast.forecastday[2].date);
  let afterAfterCurrentTempMax = data.forecast.forecastday[2].day.maxtemp_c;
  let afterAfterCurrentTempMin = data.forecast.forecastday[2].day.mintemp_c;
  let afterAfterCurrentCondition =
    data.forecast.forecastday[2].day.condition.text;
  let afterAfterCurrentConditionImg =
    data.forecast.forecastday[2].day.condition.icon;
  document.querySelector(".After-after-current .heading span").innerHTML =
    afterAfterCurrentDay;
  document
    .querySelector(".After-after-current div img")
    .setAttribute("src", afterAfterCurrentConditionImg);
  document.querySelector(".After-after-current .temp-max").innerHTML =
    afterAfterCurrentTempMax;
  document.querySelector(".After-after-current .temp-min").innerHTML =
    afterAfterCurrentTempMin;
  document.querySelector(".After-after-current .condition span").innerHTML =
    afterAfterCurrentCondition;
}


const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);