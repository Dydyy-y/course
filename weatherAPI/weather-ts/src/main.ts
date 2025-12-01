const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const weatherCard = document.getElementById("weatherCard") as HTMLElement;
const weatherEmoji = document.getElementById("weatherEmoji") as HTMLElement;
const loader = document.getElementById("loader") as HTMLElement;
const historySection = document.getElementById("historySection") as HTMLElement;
const historyButtons = document.getElementById("historyButtons") as HTMLElement;
const cityName = document.getElementById("cityName") as HTMLElement;
const temperature = document.getElementById("temperature") as HTMLElement;
const description = document.getElementById("description") as HTMLElement;

const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";

async function fetchWeather(): Promise<void> {
  const city = cityInput.value.trim(); //value : acceder conteniu input ; trim() : supprimer espaces debut/fin
  if (!city) return;

  loader.classList.remove("hidden");
  weatherCard.classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ville non trouvée !"); //trhow : creer une nouvelle erreur
    }

    const data = await response.json();

    loader.classList.add("hidden");

    displayWeather(data);
    
    saveToHistory(data.name);

  } catch (error) {
    loader.classList.add("hidden");
    if (error instanceof Error) {
      alert(error.message);
    }
    weatherCard.classList.add("hidden");
  }
}

function displayWeather(data: any): void {
  const { name, main, weather } = data; //destructuration de l'objet data
  const temp = Math.round(main.temp);
  const desc = weather[0].description;
  const weatherMain = weather[0].main;

  cityName.textContent = name;
  temperature.textContent = `${temp}°C`;
  description.textContent = desc;
  weatherEmoji.textContent = getWeatherEmoji(weatherMain);

  weatherCard.classList.remove("hidden");
}

function getWeatherEmoji(weatherMain: string): string {
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

function saveToHistory(city: string): void {
  //recup historique
  let history: string[] = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  //localStorage : stockage local du navigateur
  //json pour transformer le str de localstorage en tableau JS


  //retirer la ville si elle existe deja
  history = history.filter((c: string) => c.toLowerCase() !== city.toLowerCase());

  //ajouter  ville début
  history.unshift(city);

  //max 5 villes
  history = history.slice(0, 5);

  //sauvegarder historique
  localStorage.setItem("searchHistory", JSON.stringify(history));

  displayHistory();
}

function displayHistory(): void {
  const history: string[] = JSON.parse(localStorage.getItem("searchHistory") || "[]"); //recup historique

  if (history.length === 0) {
    historySection.classList.add("hidden");
    return;
  }

  // Afficher la section
  historySection.classList.remove("hidden");

  // Vider les anciens boutons
  historyButtons.innerHTML = "";

  // Créer un bouton par ville
  history.forEach((city: string) => {
    const button = document.createElement("button");
    button.textContent = city;
    
    // Rechercher la ville au clic
    button.addEventListener("click", () => {
      cityInput.value = city;
      fetchWeather();
    });
    
    historyButtons.appendChild(button);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayHistory();
});

searchForm?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("Recherche lancée (submit) !");
  fetchWeather();
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