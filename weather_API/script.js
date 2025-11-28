const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const weatherEmoji = document.getElementById("weatherEmoji");

const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ville non trouvée !");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
    weatherCard.classList.add("hidden");
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temp = Math.round(main.temp);
  const description = weather[0].description;
  const weatherMain = weather[0].main;

  document.getElementById("cityName").textContent = name;
  document.getElementById("temperature").textContent = `${temp}°C`;
  document.getElementById("description").textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(weatherMain);

  weatherCard.classList.remove("hidden");
}

function getWeatherEmoji(weatherMain) {
  switch (weatherMain) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Drizzle":
      return "🌦️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
    case "Squall":
    case "Tornado":
      return "🌫️";
    default:
      return "🌈";
  }
}

//message console dans console
searchButton?.addEventListener("click", () => {
  console.log("Recherche lancée !");
  fetchWeather();
});

//agrandir l'emoji survol
weatherEmoji?.addEventListener("mouseenter", () => {
  weatherEmoji.style.transform = "scale(1.3)";
});

//réduire
weatherEmoji?.addEventListener("mouseleave", () => {
  weatherEmoji.style.transform = "scale(1)";
});

//mode sombre
weatherCard?.addEventListener("click", () => {
  weatherCard.classList.toggle("dark-mode");
});

//lancer recherche
cityInput?.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    console.log("Recherche lancée via Entrée !");
    fetchWeather();
  }
});
