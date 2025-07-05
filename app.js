// Datos de ejemplo (simulando una API)
const animes = [
    {
        id: 1,
        title: "KOBAYASHI'S DRAGON MAID",
        image: "https://cdn.myanimelist.net/images/anime/5/85434.jpg",
        synopsis: "Mientras Kobayashi se dirige a otro día de trabajo, abre la puerta de su apartamento y se encuentra con una vista inusualmente aterradora —la cabeza de un dragón, mirándola desde el otro lado del balcón. El dragón se transforma inmediatamente en una joven linda, tetona y enérgica vestida con un traje de sirvienta, presentándose como Tooru.",
        episodes: [
            { title: "Episodio 1", video: "episodio/2671_1.mp4" },
            { title: "Episodio 2", video: "episodio/1_2.mp4" }
        ]
    },
    {
        id: 2,
        title: "Death Note",
        image: "https://via.placeholder.com/300x450",
        synopsis: "Un cuaderno que mata...",
        episodes: [
            { title: "Episodio 1", video: "episodio/2_1.mp4" },
            { title: "Episodio 2", video: "episodio/2_2.mp4" }
            // ...más episodios
        ]
    }
];

// Cargar animes en el grid
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("anime-container");
    const searchInput = document.getElementById("search");

    function renderAnimes(list) {
        container.innerHTML = "";
        list.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.className = "anime-card";
            animeCard.innerHTML = `
                <img src="${anime.image}" alt="${anime.title}">
                <h3>${anime.title}</h3>
            `;
            animeCard.addEventListener("click", () => {
                localStorage.setItem("selectedAnime", JSON.stringify(anime));
                window.location.href = "listaDeEpisodios.html";
            });
            container.appendChild(animeCard);
        });
    }

    renderAnimes(animes);

    searchInput.addEventListener("input", function() {
        const value = this.value.toLowerCase();
        const filtered = animes.filter(anime => anime.title.toLowerCase().includes(value));
        renderAnimes(filtered);
    });
});
