export function loadHistoryFromStorage(): string[] {
  return JSON.parse(localStorage.getItem("searchHistory") || "[]");
}

export function saveHistoryToStorage(city: string): void {
  let history: string[] = loadHistoryFromStorage();

  // Retirer la ville si elle existe déjà
  history = history.filter(
    (c: string) => c.toLowerCase() !== city.toLowerCase()
  );

  // Ajouter la ville au début
  history.unshift(city);

  // Maximum 5 villes
  history = history.slice(0, 5);

  // Sauvegarder l'historique
  localStorage.setItem("searchHistory", JSON.stringify(history));

  displayHistory();
}

export function displayHistory(): void {
  const historySection = document.getElementById(
    "historySection"
  ) as HTMLElement;
  const historyButtons = document.getElementById(
    "historyButtons"
  ) as HTMLElement;

  const history: string[] = loadHistoryFromStorage();

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
      const cityInput = document.getElementById("cityInput") as HTMLInputElement;
      cityInput.value = city;
      // Déclencher la recherche
      const event = new Event("submit", { bubbles: true, cancelable: true });
      const searchForm = document.getElementById("searchForm") as HTMLFormElement;
      searchForm.dispatchEvent(event);
    });

    historyButtons.appendChild(button);
  });
}
