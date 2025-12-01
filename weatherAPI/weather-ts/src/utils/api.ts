const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";

export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Other";

export interface WeatherData {
  city: string;
  temperature: number;
  weather: WeatherCondition;
}

function mapApiWeatherToCondition(raw: string): WeatherCondition {
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

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=fr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Ville non trouvée !");
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    weather: mapApiWeatherToCondition(data.weather[0].main),
  };
}

export async function getWeatherByCoords(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Impossible de récupérer la météo pour cette position !");
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    weather: mapApiWeatherToCondition(data.weather[0].main),
  };
}
