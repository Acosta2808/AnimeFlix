document.addEventListener("DOMContentLoaded", () => {
    const anime = JSON.parse(localStorage.getItem("selectedAnime"));
    if (!anime) return;
    document.getElementById("anime-title").textContent = anime.title;
    document.getElementById("anime-cover").src = anime.image;
    document.getElementById("anime-name").textContent = anime.title;
    document.getElementById("anime-synopsis").textContent = anime.synopsis;

    const episodesList = document.getElementById("episodes-list");
    episodesList.innerHTML = "";
    anime.episodes.forEach((ep, idx) => {
        const episode = document.createElement("div");
        episode.className = "episode";
        episode.textContent = ep.title;
        episode.addEventListener("click", () => {
            localStorage.setItem("selectedEpisode", idx);
            window.location.href = "watch.html";
        });
        episodesList.appendChild(episode);
    });
});