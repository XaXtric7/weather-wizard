const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "your-api-key"; // Use your valid API key
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Get weather condition text
      const weatherCondition = json.current.condition.text;

      // Assign images based on condition
      if (weatherCondition.includes("Sunny")) {
        image.src = "Images/sunny.png";
      } else if (weatherCondition.includes("Clear")) {
        image.src = "Images/clear.png";
      } else if (
        weatherCondition.includes("Partly cloudy") ||
        weatherCondition.includes("Cloudy") ||
        weatherCondition.includes("Overcast")
      ) {
        image.src = "Images/cloud.png";
      } else if (weatherCondition.includes("Mist")) {
        image.src = "Images/mist.png";
      } else if (weatherCondition.includes("Thunderstorm")) {
        image.src = "Images/thunderstorm.png";
      } else if (
        weatherCondition.includes("Patchy rain possible") ||
        weatherCondition.includes("Light rain") ||
        weatherCondition.includes("Moderate rain") ||
        weatherCondition.includes("Heavy rain")
      ) {
        image.src = "Images/rain.png";
      } else if (
        weatherCondition.includes("Snowy") ||
        weatherCondition.includes("Light snow")
      ) {
        image.src = "Images/snow.png";
      } else {
        image.src = "Images/unknown.png"; // Provide a default weather image
      }

      // Update weather details
      temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
      description.innerHTML = `${json.current.condition.text}`;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${parseInt(json.current.wind_kph)} Km/h`;

      // Display weather details
      weatherBox.style.display = "block";
      weatherDetails.style.display = "flex";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => console.error("Error fetching weather data:", error));
});
