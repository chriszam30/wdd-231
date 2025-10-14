const LOCAL_DATA_URL = 'data/characters.json';

async function getCharacters() {
    const container = document.getElementById('characters-container');
    if (!container) return;

    // Mostrar estado de carga
    container.innerHTML = '<div class="loading">Loading characters</div>';

    try {
        const response = await fetch(LOCAL_DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.results) {
            displayCharacters(data.results);
        } else {
            throw new Error("Invalid data structure from API");
        }
    } catch (error) {
        console.error('Failed to fetch characters:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Failed to load characters. Please try again later.</p>
                <button onclick="retryLoad()" class="retry-button">Try Again</button>
            </div>
        `;
    }
}

function displayCharacters(characters) {
    const container = document.getElementById('characters-container');
    
    if (!container) {
        console.error('Container element not found!');
        return;
    }
    
    container.innerHTML = ''; 

    // Display characters
    characters.forEach((character) => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';

        const name = document.createElement('h2');
        name.textContent = character.name;

        // Crear y configurar la imagen
        const image = document.createElement('img');
        image.alt = `Portrait of ${character.name}`;
        image.loading = 'lazy';
        
        // Añadir clase de carga
        image.classList.add('loading');

        // Configurar el evento onload
        image.onload = () => {
            image.classList.remove('loading');
            image.classList.add('loaded');
        };

        // Configurar la imagen con el CDN correcto
        const imageId = character.id || Math.floor(Math.random() * 15) + 1;
        image.src = `https://cdn.thesimpsonsapi.com/500/character/${imageId}.webp`;

        // Manejar errores de carga
        image.onerror = () => {
            // Crear avatar si la imagen falla
            const avatar = document.createElement('div');
            avatar.className = 'character-avatar';
            const initials = character.name.split(' ').map(word => word[0]).join('').substring(0, 2);
            avatar.textContent = initials;
            const hue = Math.abs(character.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 360;
            avatar.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
            avatar.setAttribute('aria-label', `Avatar for ${character.name}`);
            image.replaceWith(avatar);
        }

        const age = document.createElement('p');
        age.textContent = `Age: ${character.age || 'Unknown'}`;

        const occupation = document.createElement('p');
        occupation.textContent = `Occupation: ${character.occupation || 'Unknown'}`;
        
        const status = document.createElement('p');
        status.className = 'character-status';
        status.textContent = `Status: ${character.status || 'Unknown'}`;
        // Add visual indicator for status
        if (character.status === 'Alive') {
            status.style.color = '#4CAF50';
        } else if (character.status === 'Deceased') {
            status.style.color = '#f44336';
        }

        characterCard.appendChild(name);
        characterCard.appendChild(image);
        characterCard.appendChild(age);
        characterCard.appendChild(occupation);
        characterCard.appendChild(status);

        container.appendChild(characterCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getCharacters();
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});
