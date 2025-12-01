import type { WeatherData /*, WeatherCondition */ } from "./api.js";

export function displayWeather(data: WeatherData): void {
  const cityName = document.getElementById("cityName") as HTMLElement;
  const temperature = document.getElementById("temperature") as HTMLElement;
  const description = document.getElementById("description") as HTMLElement;
  const weatherEmoji = document.getElementById("weatherEmoji") as HTMLElement;
  const weatherCard = document.getElementById("weatherCard") as HTMLElement;

  cityName.textContent = data.city;
  temperature.textContent = `${data.temperature}°C`;
  description.textContent = data.weather;
  weatherEmoji.textContent = getWeatherEmoji(data.weather);

  weatherCard.classList.remove("hidden");
}

export function getWeatherEmoji(weather: string): string {
  switch (weather) {
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

export function showLoader(): void {
  const loader = document.getElementById("loader") as HTMLElement;
  loader.classList.remove("hidden");
}

export function hideLoader(): void {
  const loader = document.getElementById("loader") as HTMLElement;
  loader.classList.add("hidden");
}

export function hideWeatherCard(): void {
  const weatherCard = document.getElementById("weatherCard") as HTMLElement;
  weatherCard.classList.add("hidden");
}
