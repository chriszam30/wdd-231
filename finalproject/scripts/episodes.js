const API_URL = 'https://thesimpsonsapi.com/api/episodes';

// Object to store all episodes by season
let episodesBySeason = {};
let isLoading = false;
let currentPage = 1;
let totalPages = 0;

async function fetchEpisodesPage(page) {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Create an episode card
function createEpisodeCard(episode) {
    const card = document.createElement('div');
    card.className = 'episode-card';
    
    const content = `
        <div class="episode-image">
            <img src="https://cdn.thesimpsonsapi.com/200${episode.image_path}" 
                 alt="${episode.name}"
                 onerror="this.src='https://via.placeholder.com/300x200/FFD90F/333.png?text=The+Simpsons'">
        </div>
        <div class="episode-content">
            <h3>${episode.name}</h3>
            <div class="episode-info">
                <p><strong>Episode:</strong> ${episode.episode_number}</p>
                <p><strong>Air Date:</strong> ${formatDate(episode.airdate)}</p>
            </div>
            <p class="episode-description">${episode.synopsis || 'No description available'}</p>
        </div>
    `;
    
    card.innerHTML = content;
    return card;
}

// Format date to a readable string
function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update the season filter dropdown
function updateSeasonFilter() {
    const seasonFilter = document.getElementById('season-filter');
    seasonFilter.innerHTML = ''; // Clear existing options
    
    const seasons = Object.keys(episodesBySeason).sort((a, b) => parseInt(a) - parseInt(b));
    
    if (seasons.length > 0) {
        seasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season;
            option.textContent = `Season ${season}`;
            seasonFilter.appendChild(option);
        });
        
        // Show the first season by default
        filterEpisodes(seasons[0]);
    }
}

// Filter and display episodes for a specific season
function filterEpisodes(season) {
    const container = document.getElementById('episodes-container');
    container.innerHTML = '';

    const seasonEpisodes = episodesBySeason[season];
    if (seasonEpisodes) {
        const seasonSection = document.createElement('div');
        seasonSection.className = 'season-section';
        seasonSection.id = `season-${season}`;

        const seasonTitle = document.createElement('h2');
        seasonTitle.textContent = `Season ${season}`;
        seasonSection.appendChild(seasonTitle);

        const episodesGrid = document.createElement('div');
        episodesGrid.className = 'episodes-grid';

        // Sort episodes by episode number
        const sortedEpisodes = [...seasonEpisodes].sort((a, b) => a.episode_number - b.episode_number);

        sortedEpisodes.forEach(episode => {
            const episodeCard = createEpisodeCard(episode);
            episodesGrid.appendChild(episodeCard);
        });

        seasonSection.appendChild(episodesGrid);
        container.appendChild(seasonSection);
    }
}

// Fetch all episodes
async function getAllEpisodes() {
    const container = document.getElementById('episodes-container');
    container.innerHTML = '<div class="loading">Loading episodes...</div>';
    isLoading = true;

    try {
        // Get first page to know total number of pages
        const firstPageData = await fetchEpisodesPage(1);
        totalPages = firstPageData.pages;

        // Create an array of promises for all pages
        const pagePromises = [];
        for (let page = 1; page <= totalPages; page++) {
            pagePromises.push(fetchEpisodesPage(page));
        }

        // Wait for all pages to load
        const allPagesData = await Promise.all(pagePromises);

        // Process all episodes
        allPagesData.forEach(pageData => {
            if (pageData && pageData.results) {
                pageData.results.forEach(episode => {
                    const season = episode.season;
                    if (!episodesBySeason[season]) {
                        episodesBySeason[season] = [];
                    }
                    episodesBySeason[season].push(episode);
                });
            }
        });

        // Sort episodes within each season
        Object.keys(episodesBySeason).forEach(season => {
            episodesBySeason[season].sort((a, b) => a.episode_number - b.episode_number);
        });

        // Update the filter and display episodes
        updateSeasonFilter();
        
    } catch (error) {
        console.error('Failed to fetch episodes:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Failed to load episodes. Please try again later.</p>
                <button onclick="getAllEpisodes()" class="retry-button">Try Again</button>
            </div>
        `;
    } finally {
        isLoading = false;
    }
}

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    getAllEpisodes();
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    
    // Add event listener for the season filter
    document.getElementById('season-filter').addEventListener('change', (e) => {
        filterEpisodes(e.target.value);
    });
});