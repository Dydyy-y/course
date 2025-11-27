const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const weatherEmoji = document.getElementById("weatherEmoji");

//message console dans console
searchButton?.addEventListener("click", () => {
  console.log("Recherche lancée !");
  weatherCard?.classList.remove("hidden");
});

//agrandir l'emoji survol
weatherEmoji?.addEventListener("mouseenter", () => {
  weatherEmoji.style.transform = "scale(1.3)";
});

//réduire
weatherEmoji?.addEventListener("mouseleave", () => {
  weatherEmoji.style.transform = "scale(1)";
});

//mode sombre
weatherCard?.addEventListener("click", () => {
  weatherCard.classList.toggle("dark-mode");
});

//lancer recherche
cityInput?.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    console.log("Recherche lancée via Entrée !");
    weatherCard?.classList.remove("hidden");
  }
});
