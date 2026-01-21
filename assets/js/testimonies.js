document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById('testimonialCarousel');
  const btnLeft = document.querySelector('.carousel-btn.left');
  const btnRight = document.querySelector('.carousel-btn.right');

  if (!carousel || !btnLeft || !btnRight) return;

  // Wait until images load to get correct width
  function getScrollAmount() {
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return 0;
    const style = window.getComputedStyle(card);
    const gap = parseInt(style.marginRight) || 20; // fallback
    return card.offsetWidth + gap;
  }

  // BUTTON SCROLL
  btnLeft.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    const scrollAmount = getScrollAmount();
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // DRAG TO SCROLL
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return; // don't drag when clicking buttons
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });
  carousel.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // TOUCH SCROLL
  carousel.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON') return; // ignore buttons
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('touchend', () => {
    isDown = false;
  });
  carousel.addEventListener('touchmove', (e) => {
    if(!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
// ===== FAQ TOGGLE =====
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const icon = btn.querySelector(".icon");

    // Toggle visibility
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.textContent = "+";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = "x";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop(); // gets current file name
    const navItems = document.querySelectorAll('.ul-holder div p a');

    navItems.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
            link.parentElement.parentElement.classList.add('active'); // keep your indicator styling
        }
    });
});