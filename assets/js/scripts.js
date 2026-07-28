document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.split-container');
  const panelEstate = document.getElementById('panelEstate');
  const panelCleaning = document.getElementById('panelCleaning');
  const overlay = document.getElementById('transitionOverlay');
  const portalBtns = document.querySelectorAll('.portal-btn');

  // Hover animations driving split expansion
  panelEstate.addEventListener('mouseenter', () => {
    container.classList.add('hover-estate');
    container.classList.remove('hover-cleaning');
  });

  panelCleaning.addEventListener('mouseenter', () => {
    container.classList.add('hover-cleaning');
    container.classList.remove('hover-estate');
  });

  container.addEventListener('mouseleave', () => {
    container.classList.remove('hover-estate', 'hover-cleaning');
  });

  // Smooth liquid page transition
  portalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = btn.getAttribute('data-link');
      
      // Determine accent color for transition fill based on button class
      if (btn.classList.contains('btn-estate')) {
        overlay.style.background = 'linear-gradient(135deg, #080D1A, #182238)';
      } else {
        overlay.style.background = 'linear-gradient(135deg, #031D16, #0D3B2E)';
      }

      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 750);
    });
  });
});