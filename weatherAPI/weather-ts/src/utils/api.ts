const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";

export interface WeatherData {
  city: string;
  temperature: number;
  weather: string;
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
    weather: data.weather[0].main,
  };
}
