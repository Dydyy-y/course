export function loadHistoryFromStorage() {
    return JSON.parse(localStorage.getItem("searchHistory") || "[]");
}
export function saveHistoryToStorage(city) {
    let history = loadHistoryFromStorage();
    //retirer ville si existe
    history = history.filter((c) => c.toLowerCase() !== city.toLowerCase());
    //ajouter ville au début
    history.unshift(city);
    //max 5
    history = history.slice(0, 5);
    //sauvegarder histo
    localStorage.setItem("searchHistory", JSON.stringify(history));
    displayHistory();
}
export function displayHistory() {
    const historySection = document.getElementById("historySection");
    const historyButtons = document.getElementById("historyButtons");
    const history = loadHistoryFromStorage();
    if (history.length === 0) {
        historySection.classList.add("hidden");
        return;
    }
    //afficher la section
    historySection.classList.remove("hidden");
    //vider ancien boutons
    historyButtons.innerHTML = "";
    //créer vbouton par ville
    history.forEach((city) => {
        const button = document.createElement("button");
        button.textContent = city;
        //recherche ville au clic
        button.addEventListener("click", () => {
            const cityInput = document.getElementById("cityInput");
            cityInput.value = city;
            const event = new Event("submit", { bubbles: true, cancelable: true });
            const searchForm = document.getElementById("searchForm");
            searchForm.dispatchEvent(event);
        });
        historyButtons.appendChild(button);
    });
}
//# sourceMappingURL=storage.js.map