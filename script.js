<script>
    // Funcția care arată sau ascunde detaliile echipei atunci când se apasă pe butonul "Află mai multe"
    function toggleDetails(button) {
        const details = button.nextElementSibling; // Obține div-ul cu detalii care urmează butonul
        details.style.display = details.style.display === 'none' ? 'block' : 'none'; // Comută între a arăta și a ascunde detaliile
    }

    // Funcția care filtrează echipele pe baza textului introdus în câmpul de căutare
    function filterTeams() {
        const searchTerm = document.getElementById('searchBar').value.toLowerCase(); // Obține textul din câmpul de căutare și îl face litere mici
        const teams = document.querySelectorAll('.team-card'); // Selectează toate cardurile de echipă
        teams.forEach(team => {
            const name = team.getAttribute('data-name'); // Obține numele echipei din atributul "data-name"
            if (name.includes(searchTerm)) { // Dacă numele echipei include termenul de căutare
                team.style.display = 'block'; // Afișează echipa
            } else {
                team.style.display = 'none'; // Ascunde echipa
            }
        });
    }
</script>
