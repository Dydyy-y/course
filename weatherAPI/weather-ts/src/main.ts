import { getWeatherByCity } from "./utils/api";
import { displayWeather, showLoader, hideLoader, hideWeatherCard } from "./utils/dom";
import { saveHistoryToStorage, displayHistory } from "./utils/storage";

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const weatherCard = document.getElementById("weatherCard") as HTMLElement;
const weatherEmoji = document.getElementById("weatherEmoji") as HTMLElement;

async function handleSearch(): Promise<void> {
  const city = cityInput.value.trim();
  if (!city) return;

  showLoader();
  hideWeatherCard();

  try {
    const weatherData = await getWeatherByCity(city);

    hideLoader();

    displayWeather(weatherData);
    saveHistoryToStorage(weatherData.city);
  } catch (error) {
    hideLoader();
    if (error instanceof Error) {
      alert(error.message);
    }
    hideWeatherCard();
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
