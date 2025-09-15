
// Función para cargar los datos de miembros
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Función para mostrar los miembros
function displayMembers(members) {
    const container = document.getElementById('members-container');
    const template = members.map(member => `
        <article class="member-card">
            <h2 class="member-name">${member.name}</h2>
            <p class="member-info">${member.info}</p>
            <div class="member-contact">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener">Website</a>
            </div>
            <span class="membership-level">
                ${getMembershipLevel(member.membership)}
            </span>
        </article>
    `).join('');
    
    container.innerHTML = template;
}

// Función para obtener el nivel de membresía
function getMembershipLevel(level) {
    const levels = {
        1: "Member",
        2: "Silver Member",
        3: "Gold Member"
    };
    return levels[level] || "Member";
}

// Inicializar todos los event listeners
function initializeEventListeners() {
    // Toggle vista grid/lista
    document.getElementById('grid-view').addEventListener('click', () => {
        document.getElementById('members-container').className = 'grid-view';
        document.getElementById('grid-view').classList.add('active');
        document.getElementById('list-view').classList.remove('active');
    });

    document.getElementById('list-view').addEventListener('click', () => {
        document.getElementById('members-container').className = 'list-view';
        document.getElementById('list-view').classList.add('active');
        document.getElementById('grid-view').classList.remove('active');
    });

    // Toggle del menú móvil
    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('open');
    });
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    initializeEventListeners();
    
    // Actualizar año de copyright y fecha de modificación
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});
