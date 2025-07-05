document.addEventListener("DOMContentLoaded", () => {
    const anime = JSON.parse(localStorage.getItem("selectedAnime"));
    const episodeIdx = parseInt(localStorage.getItem("selectedEpisode"), 10);
    const playerWrapper = document.getElementById("player-wrapper");
    const episodeTitle = document.getElementById("episode-title");

    if (anime && anime.episodes && anime.episodes[episodeIdx]) {
        const videoUrl = anime.episodes[episodeIdx].video;
        episodeTitle.textContent = `${anime.title} - ${anime.episodes[episodeIdx].title}`;
        playerWrapper.innerHTML = "";
        if (videoUrl && (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"))) {
            // Mostrar iframe de YouTube
            const iframe = document.createElement("iframe");
            iframe.width = "100%";
            iframe.height = "500";
            iframe.src = videoUrl;
            iframe.title = anime.episodes[episodeIdx].title;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            playerWrapper.appendChild(iframe);
        } else if (videoUrl && videoUrl.includes("drive.google.com")) {
            // Mostrar iframe de Google Drive (solo si es un archivo, no carpeta)
            // Si es un enlace a carpeta, mostrar botón para abrir en Drive
            const fileIdMatch = videoUrl.match(/\/d\/([\w-]+)/) || videoUrl.match(/id=([\w-]+)/);
            if (fileIdMatch) {
                const fileId = fileIdMatch[1];
                const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                const iframe = document.createElement("iframe");
                iframe.width = "100%";
                iframe.height = "500";
                iframe.src = embedUrl;
                iframe.allow = "autoplay";
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                playerWrapper.appendChild(iframe);
            } else {
                // No es un archivo, es una carpeta: mostrar botón para abrir en Drive
                playerWrapper.innerHTML = `<a href="${videoUrl}" target="_blank" style="color:#fff; background:#a259ec; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold;">Ver carpeta en Google Drive</a>`;
            }
        } else if (videoUrl) {
            // Mostrar reproductor de video local
            const video = document.createElement("video");
            video.controls = true;
            video.width = 900;
            video.src = videoUrl;
            video.style.maxWidth = "100%";
            playerWrapper.appendChild(video);
        } else {
            playerWrapper.innerHTML = '<p style="color:#fff">No hay video disponible para este episodio.</p>';
        }
    } else {
        episodeTitle.textContent = "Episodio no encontrado";
        playerWrapper.innerHTML = '';
    }
});