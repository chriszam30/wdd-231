// thankyou.js
// Display submitted form data from URL params

document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('nav').classList.toggle('open');
    });
  }

  // Parse URL params
  const params = new URLSearchParams(window.location.search);
  const summary = document.getElementById('form-summary');
  if (!summary) return;

  // Only show required fields
  const fields = [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Email', key: 'email' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Business/Organization', key: 'organization' },
    { label: 'Submitted', key: 'timestamp' }
  ];
  let html = '<h2>Submitted Information</h2><ul class="summary-list">';
  fields.forEach(f => {
    const val = params.get(f.key);
    if (val) {
      html += `<li><strong>${f.label}:</strong> ${f.key === 'timestamp' ? new Date(val).toLocaleString() : val}</li>`;
    }
  });
  html += '</ul>';
  summary.innerHTML = html;
});
