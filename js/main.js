// ======================================
// NJ VISUAL STUDIO - DESIGN PORTFOLIO
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.getElementById("portfolio-grid");
    const loadMoreBtn = document.getElementById("load-more-btn");
    const searchInput = document.getElementById("portfolio-search");

    if (!gallery || !loadMoreBtn) return;

    const designsPerLoad = 20;
    let allDesigns = [];
    let visibleDesigns = [];
    let currentVisibleCount = 20;

    function buildDesignList() {
        const designNames = [
            "DN01.jpeg","DN02.jpeg","DN03.jpeg","DN04.jpeg","DN05.jpg","DN06.jpg","DN07.jpg","DN08.jpg","DN09.jpeg","DN10.jpeg",
            "DN11.jpg","DN12.jpg","DN13.jpeg","DN14.jpg","DN15.jpg","DN16.jpg","DN17.jpg","DN18.jpg","DN19.jpg","DN20.jpg",
            "DN21.jpg","DN22.jpg","DN23.jpeg","DN24.jpg","DN25.jpg","DN26.jpg","DN27.jpg","DN28.jpg","DN29.jpeg","DN30.jpg",
            "DN31.jpeg","DN32.jpeg","DN33.jpg","DN34.jpg","DN35.jpg","DN36.jpeg","DN37.jpg","DN38.jpg","DN39.jpg","DN40.jpg",
            "DN41.jpg","DN42.jpeg","DN43.jpeg","DN44.jpeg","DN45.jpeg","DN46.jpeg","DN47.jpg","DN48.jpg","DN49.jpg","DN50.jpeg",
            "DN51.jpg","DN52.jpg","DN53.jpg","DN54.jpg","DN55.jpg","DN56.jpg","DN57.jpg","DN58.jpg","DN59.jpg","DN60.jpg",
            "DN61.jpg","DN62.jpg","DN63.jpg","DN64.jpeg","DN65.jpeg","DN66.jpg","DN67.jpg","DN68.jpg","DN69.jpg","DN70.jpeg",
            "DN71.jpeg","DN72.jpeg","DN73.jpg","DN74.jpg","DN75.jpg","DN76.jpeg","DN77.jpeg","DN78.jpeg","DN79.jpg","DN80.jpg",
            "DN81.jpg","DN82.jpg","DN83.jpeg","DN84.jpeg","DN85.jpg","DN86.jpg","DN87.jpg","DN88.jpeg","DN89.jpg","DN90.jpeg",
            "DN91.jpeg","DN92.jpeg","DN93.jpg","DN94.jpg","DN95.jpg","DN96.jpeg","DN97.jpeg","DN98.jpeg","DN99.jpeg","DN100.jpeg",
            "DN101.jpeg","DN102.jpeg","DN103.jpeg","DN104.jpeg","DN105.jpeg","DN106.jpeg","DN107.jpeg","DN108.jpeg","DN109.jpeg","DN110.jpeg",
            "DN111.jpeg","DN112.jpeg","DN113.jpeg","DN114.jpeg","DN115.jpeg","DN116.jpeg","DN117.jpeg","DN118.jpeg","DN119.jpeg","DN120.jpeg",
            "DN121.jpeg","DN122.jpeg","DN123.jpeg","DN124.jpeg","DN125.jpeg","DN126.jpeg","DN127.jpeg","DN128.jpeg","DN129.png","DN130.jpeg",
            "DN131.jpeg","DN132.jpeg","DN133.jpeg","DN134.jpeg","DN135.jpeg","DN136.jpeg","DN137.jpeg","DN138.jpeg","DN139.jpeg","DN140.jpeg",
            "DN141.jpeg","DN142.jpeg","DN143.jpeg","DN144.jpeg","DN145.jpeg","DN146.jpeg","DN147.jpeg","DN148.jpeg","DN149.jpeg","DN150.jpeg",
            "DN151.jpeg","DN152.jpeg"
        ];

        const keywordPool = [
            "festival sale poster banner outside banner retail branding promo offer discount standee sticker hoarding display fashion shop opening new arrival",
            "sale festival discount poster retail banner storefront branding promotion hoarding standee sticker outside media flyer campaign",
            "fashion sale banner poster store branding offer discount festival exhibition standee sticker outside signage hoarding",
            "sale poster discount banner festival retail shop opening branding promotion standee hoarding sticker outside display fashion",
            "mega sale offer banner poster brand campaign discount festival retail poster standee sticker display hoarding promotional",
            "sale banner poster fashion discount festival retail brand store outdoor hoarding standee sticker promotion offer signage",
            "poster sale banner branding festival promotion retail display standee sticker outside hoarding discount offer fashion campaign",
            "retail branding sale banner poster festival offer discount sticker standee hoarding display outside sign promotion campaign"
        ];

        allDesigns = designNames.map((name, index) => {
            const baseText = name
                .replace(/\.[^.]+$/, "")
                .replace(/[_-]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            const fileKeywordText = baseText
                .toLowerCase()
                .split(/\s+/)
                .filter((word) => word.length > 2)
                .join(" ");

            const keywordText = `${keywordPool[index % keywordPool.length]} ${fileKeywordText}`;
            const description = keywordText
                .replace(/(dn\d+)/gi, "")
                .replace(/\s+/g, " ")
                .trim();

            return {
                serial: `DN${String(index + 1).padStart(2, "0")}`,
                file: name,
                category: "design",
                sub: "portfolio",
                description,
                tags: description,
                searchableText: `${description} ${baseText}`
            };
        });
    }

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/-/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getFilteredDesigns() {
        if (!searchInput) {
            return allDesigns;
        }

        const rawQuery = searchInput.value;
        const query = normalizeText(rawQuery).split(/\s+/).filter(Boolean);

        if (!query.length) {
            return allDesigns;
        }

        const filtered = allDesigns.filter((item) => {
            const hay = normalizeText(`${item.serial} ${item.category} ${item.sub} ${item.description} ${item.tags} ${item.searchableText}`);
            return query.every((word) => hay.includes(word));
        });

        if (!filtered.length) {
            return [...allDesigns].sort(() => Math.random() - 0.5).slice(0, Math.min(20, allDesigns.length));
        }

        return filtered;
    }

    function createDesignCard(item) {
        const card = document.createElement("div");
        card.className = "portfolio-item";

        const img = document.createElement("img");
        img.src = `${item.file}`;
        img.alt = item.serial;
        img.loading = "lazy";
        img.onerror = () => {
            card.style.display = "none";
        };

        const title = document.createElement("h3");
        title.textContent = item.serial;

        card.appendChild(img);
        card.appendChild(title);
        gallery.appendChild(card);
    }

    function renderVisibleItems() {
        gallery.innerHTML = "";

        const filtered = getFilteredDesigns();
        const itemsToShow = filtered.slice(0, currentVisibleCount);
        visibleDesigns = itemsToShow;

        itemsToShow.forEach((item) => createDesignCard(item));

        if (!filtered.length) {
            loadMoreBtn.style.display = "none";
            return;
        }

        if (currentVisibleCount >= filtered.length) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
    }

    function loadMoreDesigns() {
        const filtered = getFilteredDesigns();
        if (!filtered.length) {
            loadMoreBtn.style.display = "none";
            return;
        }

        currentVisibleCount = Math.min(currentVisibleCount + designsPerLoad, filtered.length);
        renderVisibleItems();
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            currentVisibleCount = designsPerLoad;
            renderVisibleItems();
        });
    }

    loadMoreBtn.addEventListener("click", loadMoreDesigns);

    buildDesignList();
    renderVisibleItems();
});
