// const menuItems = document.querySelectorAll('.ul-holder div');

// // Create indicators inside each menu item
// menuItems.forEach(item => {
//     const indicator = document.createElement('div');
//     indicator.classList.add('indicator');
//     item.appendChild(indicator);
// });

// // Function to activate and apply color
// function activateItem(el) {
//     menuItems.forEach(item => {
//         item.classList.remove('active');
//         const ind = item.querySelector('.indicator');
//         if (ind) ind.style.backgroundColor = 'transparent';
//     });

//     el.classList.add('active');
//     const color = el.getAttribute('data-color');
//     const text = el.querySelector('p');
//     const indicator = el.querySelector('.indicator');

//     if (text) text.style.color = color;
//     if (indicator) indicator.style.backgroundColor = color;
    
//     // Reset others' text color
//     menuItems.forEach(item => {
//         if (item !== el) {
//             const p = item.querySelector('p');
//             if (p) p.style.color = '#999'; // Default
//         }
//     });
// }

// Initialize
const menuItems = document.querySelectorAll('.ul-holder div');

// create indicators once
menuItems.forEach(item => {
  if (!item.querySelector('.indicator')) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    item.appendChild(indicator);
  }
});

function activateItem(el) {
  menuItems.forEach(item => {
    item.classList.remove('active');

    const ind = item.querySelector('.indicator');
    const p = item.querySelector('p');

    if (ind) ind.style.backgroundColor = 'transparent';
    if (p) p.style.color = '#999';
  });

  el.classList.add('active');

  const color = el.dataset.color;
  const indicator = el.querySelector('.indicator');
  const text = el.querySelector('p');

  if (indicator) indicator.style.backgroundColor = color;
  if (text) text.style.color = color;
}

// URL-based activation (THIS IS THE MAGIC)
const currentPage =
  window.location.pathname.split('/').pop() || 'index.html';

menuItems.forEach(item => {
  if (item.dataset.page === currentPage) {
    activateItem(item);
  }
});




const carousel = document.querySelector('.carousel');
let items = Array.from(document.querySelectorAll('.carousel-item'));

const totalItems = items.length;
const visibleSides = 2;
const slideInterval = 1000;

// Clone all items to the start and end for seamless effect
const clonesBefore = items.map(item => item.cloneNode(true));
const clonesAfter = items.map(item => item.cloneNode(true));

clonesBefore.forEach(clone => carousel.insertBefore(clone, carousel.firstChild));
clonesAfter.forEach(clone => carousel.appendChild(clone));

// Update the items array after cloning
items = Array.from(document.querySelectorAll('.carousel-item'));

// Start index at the first original item
let currentIndex = clonesBefore.length;

function updateCarousel(transition = true) {
  items.forEach((item, index) => {
    item.classList.remove('center', 'adjacent');

    let distance = index - currentIndex;

    // Wrap-around for distance
    if (distance < -Math.floor(items.length / 2)) distance += items.length;
    if (distance > Math.floor(items.length / 2)) distance -= items.length;

    if (distance === 0) item.classList.add('center');
    else if (Math.abs(distance) <= visibleSides) item.classList.add('adjacent');
  });

  // Set transition
  carousel.style.transition = transition ? 'transform 0.5s ease' : 'none';

  // Move the carousel
  const offset = -(currentIndex * (items[0].offsetWidth + 40)) + carousel.offsetWidth / 2 - items[0].offsetWidth / 2;
  carousel.style.transform = `translateX(${offset}px)`;
}

// Auto-slide with pause and seamless loop
setInterval(() => {
  currentIndex++;
  updateCarousel(true);

  // After transition ends, check if we're in the cloned section
  if (currentIndex >= clonesBefore.length + totalItems) {
    // Wait for transition to complete before resetting
    setTimeout(() => {
      currentIndex = clonesBefore.length; // reset to first original
      updateCarousel(false); // no transition so it’s invisible
    }, 500); // match your transition duration
  }
}, slideInterval);

// Initialize
updateCarousel(false);


document.querySelectorAll('.info-card.clickable').forEach(card => {
  card.addEventListener('click', () => {
    const action = card.dataset.action;

    if (action === 'call') {
      window.location.href = 'tel:+2348146930404';
    }

    if (action === 'whatsapp') {
      window.open('https://wa.me/2348146930404', '_blank');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // run once
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });
});


