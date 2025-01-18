/* WEATHER APPLICATION */

// Select DOM elements using querySelector.
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
// REMOVED API KEY FOR PRIVACY, REPLACE WITH YOUR OWN FOUND AT: https://openweathermap.org/.
const apiKey = "example";

// Add an event listener for form submissions.
weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the city name from the input.
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city!");
  }
});

// Fetch weather data.
async function getWeatherData(city) {
  // Construct URL for OpenWeatherMap API.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Couldn't fetch weather data!");
  }
  // Return JSON response data.
  return await response.json();
}

// Display weather information.
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  weatherCard.textContent = "";

  // Create new DOM elements for each piece of information.
  const cityDisplay = document.createElement("h1");
  const temperatureDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  // Set the text content for each element.
  cityDisplay.textContent = city;
  temperatureDisplay.textContent = `${((temp - 273.15) * (9 / 5)).toFixed(
    1
  )}°F`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descriptionDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  // Add CSS classes to the elements.
  cityDisplay.classList.add("weatherCard__h1");
  temperatureDisplay.classList.add("temperatureDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  // Append elements to the weather card.
  weatherCard.appendChild(cityDisplay);
  weatherCard.appendChild(temperatureDisplay);
  weatherCard.appendChild(humidityDisplay);
  weatherCard.appendChild(descriptionDisplay);
  weatherCard.appendChild(weatherEmoji);
}

// Select a weather emoji taking weather ID numbers.
function getWeatherEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return "⛈️";
    case id >= 300 && id < 400:
      return "🌦️";
    case id >= 500 && id < 600:
      return "☔";
    case id >= 600 && id < 700:
      return "🌨️";
    case id >= 700 && id < 800:
      return "💨";
    case id === 800:
      return "☀️";
    case id >= 801 && id < 810:
      return "☁️";
    default:
      return "🤔";
  }
}

// Handle errors.
function displayError(error) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = error;
  errorDisplay.classList.add("errorDisplay");

  weatherCard.textContent = "";
  weatherCard.appendChild(errorDisplay);
}
