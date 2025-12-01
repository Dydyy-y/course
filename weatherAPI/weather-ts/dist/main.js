var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getWeatherByCity, getWeatherByCoords } from "./utils/api.js";
import { displayWeather, showLoader, hideLoader, hideWeatherCard } from "./utils/dom.js";
import { saveHistoryToStorage, displayHistory } from "./utils/storage.js";
const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const geoBtn = document.getElementById("geoBtn");
const weatherCard = document.getElementById("weatherCard");
const weatherEmoji = document.getElementById("weatherEmoji");
function handleSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        const city = cityInput.value.trim();
        if (!city)
            return;
        showLoader();
        hideWeatherCard();
        try {
            const weatherData = yield getWeatherByCity(city);
            hideLoader();
            displayWeather(weatherData);
            saveHistoryToStorage(weatherData.city);
        }
        catch (error) {
            hideLoader();
            if (error instanceof Error) {
                alert(error.message);
            }
            hideWeatherCard();
        }
    });
}
function handleGeolocation() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur !");
            return;
        }
        showLoader();
        hideWeatherCard();
        navigator.geolocation.getCurrentPosition((position) => __awaiter(this, void 0, void 0, function* () {
            try {
                const weatherData = yield getWeatherByCoords(position.coords.latitude, position.coords.longitude);
                hideLoader();
                displayWeather(weatherData);
                saveHistoryToStorage(weatherData.city);
            }
            catch (error) {
                hideLoader();
                if (error instanceof Error) {
                    alert(error.message);
                }
                hideWeatherCard();
            }
        }), (error) => {
            hideLoader();
            alert("Impossible d'obtenir votre position : " + error.message);
            hideWeatherCard();
        });
    });
}
window.addEventListener("DOMContentLoaded", () => {
    displayHistory();
});
searchForm === null || searchForm === void 0 ? void 0 : searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Recherche lancée (submit) !");
    handleSearch();
});
geoBtn === null || geoBtn === void 0 ? void 0 : geoBtn.addEventListener("click", () => {
    handleGeolocation();
});
// Agrandir l'emoji au survol
weatherEmoji === null || weatherEmoji === void 0 ? void 0 : weatherEmoji.addEventListener("mouseenter", () => {
    weatherEmoji.style.transform = "scale(1.3)";
});
// Réduire l'emoji
weatherEmoji === null || weatherEmoji === void 0 ? void 0 : weatherEmoji.addEventListener("mouseleave", () => {
    weatherEmoji.style.transform = "scale(1)";
});
// Mode sombre
weatherCard === null || weatherCard === void 0 ? void 0 : weatherCard.addEventListener("click", () => {
    weatherCard.classList.toggle("dark-mode");
});
//# sourceMappingURL=main.js.map