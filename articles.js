// Fetch article list from GitHub and render them in the container
async function loadArticles() {
    const container = document.getElementById('articlesContainer');
    const apiUrl = 'https://api.github.com/repos/hsuehyt/YutingPodcast/contents/articles';

    try {
        const res = await fetch(apiUrl);
        const files = await res.json();

        files
            .filter(file => file.name.endsWith('.txt'))
            .sort((a, b) => b.name.localeCompare(a.name)) // Newest first
            .forEach(file => {
                const title = file.name
                    .replace('.txt', '')
                    .replace(/_/g, ' ')
                    .replace(/(\d{4}) (\d{4}) (\d{2})/, (_, y, m, d) => `${y}.${m}.${d}`);

                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';
                articleDiv.innerHTML = `
                    <button onclick="toggleRead('${file.path}', this)">▶️ Play</button>
                    <div class="title">${title}</div>
                `;
                container.appendChild(articleDiv);
            });
    } catch (err) {
        console.error('Failed to load article list:', err);
        container.innerHTML = '<p>Failed to load articles.</p>';
    }
}

// Run it on load
loadArticles();
