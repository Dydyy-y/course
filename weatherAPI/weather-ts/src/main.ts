import { getWeatherByCity, getWeatherByCoords } from "./utils/api.js";
import type { WeatherData } from "./utils/api.js";
import { displayWeather, showLoader, hideLoader, hideWeatherCard } from "./utils/dom.js";
import { saveHistoryToStorage, displayHistory } from "./utils/storage.js";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const geoBtn = document.getElementById("geoBtn") as HTMLButtonElement;
const weatherCard = document.getElementById("weatherCard") as HTMLElement;
const weatherEmoji = document.getElementById("weatherEmoji") as HTMLElement;

async function handleSearch(): Promise<WeatherData | null> {
  const city = cityInput.value.trim();
  if (!city) return null;

  showLoader();
  hideWeatherCard();

  try {
    const weatherData = await getWeatherByCity(city);

    hideLoader();

    displayWeather(weatherData);
    saveHistoryToStorage(weatherData.city);

    return weatherData;
  } catch (error) {
    hideLoader();
    if (error instanceof Error) {
      alert(error.message);
    }
    hideWeatherCard();
    return null;
  }
}

async function handleGeolocation(): Promise<WeatherData | null> {
  if (!navigator.geolocation) {
    alert("La géolocalisation n'est pas supportée par votre navigateur !");
    return null;
  }

  showLoader();
  hideWeatherCard();

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const weatherData = await getWeatherByCoords(
      position.coords.latitude,
      position.coords.longitude
    );

    hideLoader();
    displayWeather(weatherData);
    saveHistoryToStorage(weatherData.city);

    return weatherData;
  } catch (error) {
    hideLoader();
    if (error instanceof Error) {
      alert("Impossible d'obtenir votre position : " + error.message);
    }
    hideWeatherCard();
    return null;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  displayHistory();
});

searchForm?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("Recherche lancée (submit) !");
  handleSearch();
});

geoBtn?.addEventListener("click", () => {
  handleGeolocation();
});

// Agrandir l'emoji au survol
weatherEmoji?.addEventListener("mouseenter", () => {
  weatherEmoji.style.transform = "scale(1.3)";
});

// Réduire l'emoji
weatherEmoji?.addEventListener("mouseleave", () => {
  weatherEmoji.style.transform = "scale(1)";
});

// Mode sombre
weatherCard?.addEventListener("click", () => {
  weatherCard.classList.toggle("dark-mode");
});
