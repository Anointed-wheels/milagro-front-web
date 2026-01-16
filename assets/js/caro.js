document.addEventListener('DOMContentLoaded', () => {
  const caro = document.getElementById('carousel');
  const items = caro.children;
  const totalItems = items.length;
  let angle = 360 / totalItems;
  let currRotation = 0;

  // Responsive Z distance
  function getTranslateZ() {
    if (window.innerWidth <= 768) return 200;
    return 350;
  }

  // Position items in 3D circle
  function setupCaro() {
    const z = getTranslateZ();
    for (let i = 0; i < totalItems; i++) {
      items[i].style.transform = `rotateY(${i * angle}deg) translateZ(${z}px)`;
    }
    updateFrontCard(); // show info for front card
  }
  setupCaro();

  // Rotate carousel
  function rotateCaro(dir) {
    if (dir === 'next') {
      currRotation -= angle;
    } else {
      currRotation += angle;
    }
    caro.style.transform = `rotateY(${currRotation}deg)`;
    updateFrontCard();
  }

  // Show info only for front card
  function updateFrontCard() {
    // Normalize rotation
    let normalizedRotation = (currRotation % 360 + 360) % 360;
    const z = getTranslateZ();

    for (let i = 0; i < totalItems; i++) {
      // Calculate this card's angle relative to front
      const cardAngle = (i * angle + normalizedRotation) % 360;
      // Card is at front if angle is near 0 (±half angle)
      if (cardAngle < angle / 2 || cardAngle > 360 - angle / 2) {
        items[i].querySelector('.staff-info').style.opacity = 1;
      } else {
        items[i].querySelector('.staff-info').style.opacity = 0;
      }
    }
  }

  // Button Events
  document.getElementById('next').addEventListener('click', () => rotateCaro('next'));
  document.getElementById('prev').addEventListener('click', () => rotateCaro('prev'));

  // Auto-rotate slowly
  setInterval(() => {
    currRotation -= 0.2;
    caro.style.transform = `rotateY(${currRotation}deg)`;
    updateFrontCard();
  }, 30);

  // Touch support
  let startX = 0;
  let endX = 0;
  caro.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  caro.addEventListener('touchmove', e => endX = e.touches[0].clientX);
  caro.addEventListener('touchend', () => {
    const diff = endX - startX;
    if (Math.abs(diff) > 30) {
      rotateCaro(diff > 0 ? 'prev' : 'next');
    }
    startX = endX = 0;
  });

  // Recalculate Z on resize
  window.addEventListener('resize', setupCaro);
});
const navToggle = document.getElementById('navToggle');
const ulHolder = document.querySelector('.ul-holder');

// navToggle.addEventListener('click', () => {
//     ulHolder.classList.toggle('open');
//     navToggle.classList.toggle('active');

// });

// // Close menu when clicking a nav item (mobile)
// menuItems.forEach(item => {
//     item.addEventListener('click', () => {
//         ulHolder.classList.remove('open');
//     });
// });

// const navToggle = document.getElementById('navToggle');
// const ulHolder = document.querySelector('.ul-holder');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
    ulHolder.classList.remove('open');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

function openMenu() {
    ulHolder.classList.add('open');
    navToggle.classList.add('active');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

navToggle.addEventListener('click', () => {
    ulHolder.classList.contains('open') ? closeMenu() : openMenu();
});
