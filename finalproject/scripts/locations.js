const API_URL = 'https://thesimpsonsapi.com/api/locations';

async function getLocations() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.results) {
            displayLocations(data.results);
        } else {
            throw new Error("Invalid data structure from API");
        }
    } catch (error) {
        console.error('Failed to fetch locations:', error);
        const container = document.getElementById('locations-container');
        container.innerHTML = '<p>Failed to load locations. Please try again later.</p>';
    }
}

function displayLocations(locations) {
    const container = document.getElementById('locations-container');
    container.innerHTML = '';

    locations.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.className = 'location-card';

        const content = `
            <div class="location-image">
                <img src="https://cdn.thesimpsonsapi.com/1280${location.image_path}"
                     alt="${location.name}"
                     onerror="this.src='https://via.placeholder.com/1280x720/FFD90F/333.png?text=Location'">
            </div>
            <div class="location-content">
                <h2>${location.name}</h2>
                <p class="location-description">${location.description || 'No description available'}</p>
            </div>
        `;

        locationCard.innerHTML = content;
        container.appendChild(locationCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getLocations();
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
});