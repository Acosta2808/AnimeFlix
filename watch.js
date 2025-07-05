document.addEventListener("DOMContentLoaded", () => {
    const anime = JSON.parse(localStorage.getItem("selectedAnime"));
    const episodeIdx = parseInt(localStorage.getItem("selectedEpisode"), 10);

    const player = document.getElementById("anime-player");
    const episodeTitle = document.getElementById("episode-title");

    if (anime && anime.episodes && anime.episodes[episodeIdx]) {
        player.src = anime.episodes[episodeIdx].video;
        episodeTitle.textContent = `${anime.title} - ${anime.episodes[episodeIdx].title}`;
    } else {
        episodeTitle.textContent = "Episodio no encontrado";
    }
});