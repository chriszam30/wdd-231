// discover.js
// Load cards from JSON and handle visitor message

document.addEventListener('DOMContentLoaded', () => {
  // Visitor message logic
  const msg = document.getElementById('visitor-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  let message = '';
  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const diff = now - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = 'Back so soon! Awesome!';
    } else if (days === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${days} days ago.`;
    }
  }
  msg.textContent = message;
  localStorage.setItem('lastVisit', now);

  // Load cards from JSON
  fetch('data/discover.json')
    .then(res => res.json())
    .then(data => {
      const gallery = document.getElementById('discover-gallery');
      gallery.innerHTML = '';
      data.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        card.style.gridArea = `card${i+1}`;
        card.innerHTML = `
          <h2>${item.title}</h2>
          <figure><img src="${item.image}" alt="${item.title}"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank"><button>Learn More</button></a>
        `;
        gallery.appendChild(card);
      });
    });

  // Menu toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  }
});
