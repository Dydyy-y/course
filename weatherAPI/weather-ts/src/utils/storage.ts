export function loadHistoryFromStorage(): string[] {
  return JSON.parse(localStorage.getItem("searchHistory") || "[]");
}

export function saveHistoryToStorage(city: string): void {
  let history: string[] = loadHistoryFromStorage();

  //retirer ville si existe
  history = history.filter(
    (c: string) => c.toLowerCase() !== city.toLowerCase()
  );

  //ajouter ville au début
  history.unshift(city);

  //max 5
  history = history.slice(0, 5);

  //sauvegarder histo
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

  //afficher la section
  historySection.classList.remove("hidden");

  //vider ancien boutons
  historyButtons.innerHTML = "";

  //créer vbouton par ville
  history.forEach((city: string) => {
    const button = document.createElement("button");
    button.textContent = city;

    //recherche ville au clic
    button.addEventListener("click", () => {
      const cityInput = document.getElementById("cityInput") as HTMLInputElement;
      cityInput.value = city;
      const event = new Event("submit", { bubbles: true, cancelable: true });
      const searchForm = document.getElementById("searchForm") as HTMLFormElement;
      searchForm.dispatchEvent(event);
    });

    historyButtons.appendChild(button);
  });
}
