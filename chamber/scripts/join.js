// join.js
// Set timestamp on form load
document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  }
  const ts = document.getElementById('timestamp');
  if (ts) {
    ts.value = new Date().toISOString();
  }

  // Modal logic
  document.querySelectorAll('.modal-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('href');
      const modal = document.querySelector(modalId);
      if (modal) modal.style.display = 'block';
    });
  });
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});
