// Gallery entries edited in Pages CMS are stored in gallery-data.json.
(async () => {
  const grids = new Map(
    [...document.querySelectorAll("[data-gallery-category]")].map(grid => [grid.dataset.galleryCategory, grid])
  );
  if (!grids.size) return;

  // Only repository media paths are accepted; never treat CMS text as HTML.
  const mediaPath = (value, extension) => {
    if (typeof value !== "string") return null;
    const path = value.trim();
    if (!/^\/?images\/gallery\/[a-zA-Z0-9_./-]+$/.test(path) || path.includes("..")) return null;
    if (!extension.test(path)) return null;
    return path.startsWith("/") ? path : `/${path}`;
  };

  try {
    const response = await fetch("gallery-data.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Gallery data unavailable");
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error("Invalid gallery data");

    for (const entry of entries) {
      if (!entry || !grids.has(entry.category)) continue;
      const title = typeof entry.title === "string" ? entry.title.trim() : "Gallery project";
      const imagePath = mediaPath(entry.image, /\.(?:jpe?g|png|webp)$/i);
      const videoPath = mediaPath(entry.video, /\.mp4$/i);
      const posterPath = mediaPath(entry.poster, /\.(?:jpe?g|png|webp)$/i);
      if (!imagePath && !videoPath) continue;
      const grid = grids.get(entry.category);
      // Replace "coming soon" after the first published item in a section.
      grid.querySelector(".gallery-placeholder")?.remove();

      if (videoPath) {
        const container = document.createElement("div");
        container.className = "gallery-item";
        const video = document.createElement("video");
        video.controls = true;
        video.preload = "metadata";
        video.setAttribute("aria-label", title);
        if (posterPath) video.poster = posterPath;
        const source = document.createElement("source");
        source.src = videoPath;
        source.type = "video/mp4";
        video.append(source);
        container.append(video);
        grid.prepend(container);
      } else {
        const link = document.createElement("a");
        link.className = "gallery-item";
        link.href = imagePath;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        const image = document.createElement("img");
        image.src = imagePath;
        image.alt = title;
        image.loading = "lazy";
        image.decoding = "async";
        link.append(image);
        grid.prepend(link);
      }
    }
  } catch (error) {
    console.warn("Gallery additions could not be loaded:", error);
  }
})();
