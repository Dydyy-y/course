var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";
function mapApiWeatherToCondition(raw) {
    switch (raw) {
        case "Clear":
            return "Clear";
        case "Clouds":
            return "Clouds";
        case "Rain":
            return "Rain";
        case "Drizzle":
            return "Drizzle";
        case "Thunderstorm":
            return "Thunderstorm";
        case "Snow":
            return "Snow";
        case "Mist":
        case "Smoke":
        case "Haze":
        case "Dust":
        case "Fog":
        case "Sand":
        case "Ash":
        case "Squall":
        case "Tornado":
            return "Mist";
        default:
            return "Other";
    }
}
export function getWeatherByCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error("Ville non trouvée !");
        }
        const data = yield response.json();
        return {
            city: data.name,
            temperature: Math.round(data.main.temp),
            weather: mapApiWeatherToCondition(data.weather[0].main),
        };
    });
}
export function getWeatherByCoords(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`;
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error("Impossible de récupérer la météo pour cette position !");
        }
        const data = yield response.json();
        return {
            city: data.name,
            temperature: Math.round(data.main.temp),
            weather: mapApiWeatherToCondition(data.weather[0].main),
        };
    });
}
//# sourceMappingURL=api.js.map