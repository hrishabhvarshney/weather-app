document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector(".button");
    let inputvalue = document.querySelector(".search-box");
    let temp = document.querySelector(".current .temp span");
    let description = document.querySelector(".current .weather");
    let city = document.querySelector(".location .city");
    let date = document.querySelector(".location .date");
  
    // Event listener for button click
    button.addEventListener("click", fetchWeather);
  
    // Event listener for Enter key press
    inputvalue.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        fetchWeather();
      }
    });
  
    function fetchWeather() {
      let cityName = inputvalue.value.trim();
      if (cityName === "") {
        alert("Please enter a city name");
        return;
      }
  
      displayLoading();
  
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=03a094de2fbed757402784c8ab602833`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then(displayData)
        .catch((err) => {
          displayError();
          console.error(err);
        });
    }
  
    const displayData = (weather) => {
      temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
      description.innerText = `${weather.weather[0].description}`;
      city.innerText = `${weather.name}, ${weather.sys.country}`;
      let now = new Date();
      date.innerText = dateBuilder(now);
      removeLoading();
    };
  
    function dateBuilder(d) {
      let months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      let days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`;
    }
  
    function displayLoading() {
      temp.innerHTML = "Loading...";
      description.innerText = "";
      city.innerText = "";
      date.innerText = "";
    }
  
    function removeLoading() {
      // Clear the loading state if necessary
    }
  
    function displayError() {
      temp.innerHTML = "";
      description.innerText = "City not found. Please try again.";
      city.innerText = "";
      date.innerText = "";
    }
  });
  