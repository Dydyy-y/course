export function displayWeather(data) {
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const weatherEmoji = document.getElementById("weatherEmoji");
    const weatherCard = document.getElementById("weatherCard");
    cityName.textContent = data.city;
    temperature.textContent = `${data.temperature}°C`;
    description.textContent = data.weather;
    weatherEmoji.textContent = getWeatherEmoji(data.weather);
    weatherCard.classList.remove("hidden");
}
export function getWeatherEmoji(weather) {
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
export function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
}
export function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
}
export function hideWeatherCard() {
    const weatherCard = document.getElementById("weatherCard");
    weatherCard.classList.add("hidden");
}
//# sourceMappingURL=dom.js.map