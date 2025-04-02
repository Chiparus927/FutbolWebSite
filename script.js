document.addEventListener("DOMContentLoaded", function () {
    // Asigură-te că bara de căutare este funcțională
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", filterTeams);
    }

    // Asigură-te că butoanele de „Află mai multe” sunt funcționale
    const buttons = document.querySelectorAll(".green-button");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            toggleDetails(this);
        });
    });

    // Asigură-te că butoanele de „Adaugă la favorite” sunt funcționale
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    favoriteButtons.forEach(button => {
        button.addEventListener("click", function () {
            toggleFavorite(this);
        });
    });

    // Inițializează favoritele din localStorage
    loadFavorites();
});

// Funcția care arată sau ascunde detaliile echipei atunci când se apasă pe butonul "Află mai multe"
function toggleDetails(button) {
    const details = button.nextElementSibling; // Obține div-ul cu detalii care urmează butonul
    if (details && details.classList.contains("details")) {
        details.style.display = (details.style.display === "none" || details.style.display === "") ? "block" : "none";
    }
}

// Funcția care filtrează echipele pe baza textului introdus în câmpul de căutare
function filterTeams() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase().trim(); // Normalizează textul introdus
    const teams = document.querySelectorAll(".team-card"); // Selectează toate cardurile de echipă
    
    teams.forEach(team => {
        const name = team.getAttribute("data-name"); // Obține numele echipei din atributul "data-name"
        if (name && name.toLowerCase().includes(searchTerm)) { // Dacă numele echipei include termenul de căutare
            team.style.display = "block"; // Afișează echipa
        } else {
            team.style.display = "none"; // Ascunde echipa
        }
    });
}

// Funcția care adaugă sau elimină echipele favorite
function toggleFavorite(button) {
    const teamCard = button.closest(".team-card");
    const teamName = teamCard.getAttribute("data-name");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(teamName)) {
        favorites = favorites.filter(fav => fav !== teamName);
        button.textContent = "⭐"; // Modifică textul la stea goală
    } else {
        favorites.push(teamName);
        button.textContent = "✅"; // Modifică textul la stea plină
    }

    // Salvează din nou lista de favorite
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Reordonăm echipele pe pagină după ce adăugăm sau eliminăm favoritele
    loadFavorites();
}

// Funcția care încarcă favoritele la inițializarea paginii
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach(button => {
        const teamCard = button.closest(".team-card");
        const teamName = teamCard.getAttribute("data-name");
        if (favorites.includes(teamName)) {
            button.textContent = "✅"; // Modifică textul la stea plină dacă este favorit
        }
    });

    // După ce favoritele sunt încărcate, sortăm echipele
    sortTeams();
}

// Funcția care sortează echipele favorite pentru a fi afișate primele
function sortTeams() {
    const teamsContainer = document.getElementById("teams-container"); // Asigură-te că ai un container pentru echipe
    const teams = Array.from(teamsContainer.getElementsByClassName("team-card"));

    // Citește echipele favorite din localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Reorganizează echipele: favoritele vor fi puse la început
    const sortedTeams = [];
    const nonFavoriteTeams = [];

    // Împărțim echipele în două grupuri: favorite și non-favorite
    teams.forEach(team => {
        const teamName = team.getAttribute("data-name");
        if (favorites.includes(teamName)) {
            sortedTeams.push(team); // Adaugă la lista de favorite
        } else {
            nonFavoriteTeams.push(team); // Adaugă la lista de non-favorite
        }
    });

    // Combinăm echipele favorite și non-favorite în ordinea dorită
    const allTeams = [...sortedTeams, ...nonFavoriteTeams];

    // Adăugăm echipele reordonate înapoi în container
    allTeams.forEach(team => teamsContainer.appendChild(team));
}
