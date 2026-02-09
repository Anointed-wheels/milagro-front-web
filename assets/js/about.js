/* ========== TYPEWRITER EFFECT ========== */
const words = [
  "Milagro",
  "Professionals",
  "Problem Solvers",
  "Environmental Experts"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

const typedText = document.getElementById("typed-text");

function typeEffect() {
  currentWord = words[i];

  if (!isDeleting) {
    typedText.textContent = currentWord.substring(0, j++);
  } else {
    typedText.textContent = currentWord.substring(0, j--);
  }

  if (!isDeleting && j === currentWord.length + 1) {
    isDeleting = true;
    setTimeout(() => {}, 800);
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

/* ========== SCROLL REVEALS ========== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(
  ".animate-slide-left, .animate-slide-right, .timeline-item"
).forEach(el => observer.observe(el));



const heroImg = document.querySelector(".hero-right img");

if(heroImg){
  let pos = 0;
  setInterval(()=>{
    pos = pos === 0 ? -10 : 0;
    heroImg.style.transform = `translateY(${pos}px)`;
  },3000);
}
