const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const weatherCard = document.getElementById("weatherCard");
const weatherEmoji = document.getElementById("weatherEmoji");
const historySection = document.getElementById("historySection");
const historyButtons = document.getElementById("historyButtons");

const API_KEY = "9183edc464cdf289bf8cfbcd6276b86d";

async function fetchWeather() {
  const city = cityInput.value.trim(); //value : acceder conteniu input ; trim() : supprimer espaces debut/fin
  if (!city) return;

  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("weatherCard").classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ville non trouvée !"); //trhow : creer une nouvelle erreur
    }

    const data = await response.json();

    document.getElementById("loader").classList.add("hidden");

    displayWeather(data);
    
    saveToHistory(data.name);

  } catch (error) {
    document.getElementById("loader").classList.add("hidden");
    alert(error.message);
    weatherCard.classList.add("hidden");
  }
}

function displayWeather(data) {
  const { name, main, weather } = data; //destructuration de l'objet data
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

function saveToHistory(city) {
  //recup historique
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  //localStorage : stockage local du navigateur
  //json pour transformer le str de localstorage en tableau JS


  //retirer la ville si elle existe deja
  history = history.filter(c => c.toLowerCase() !== city.toLowerCase());

  //ajouter  ville début
  history.unshift(city);

  //max 5 villes
  history = history.slice(0, 5);

  //sauvegarder historique
  localStorage.setItem("searchHistory", JSON.stringify(history));

  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || []; //recup historique

  if (history.length === 0) {
    historySection.classList.add("hidden");
    return;
  }

  // Afficher la section
  historySection.classList.remove("hidden");

  // Vider les anciens boutons
  historyButtons.innerHTML = "";

  // Créer un bouton par ville
  history.forEach(city => {
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

searchForm?.addEventListener("submit", (event) => {
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