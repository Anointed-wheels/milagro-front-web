(function () {
  const toggle = document.getElementById("themeSwitch");
  if (!toggle) return;

  const THEME_KEY = "milagro-theme";
  const body = document.body;

  // ---------- HELPERS ----------
  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // ---------- INITIAL LOAD ----------
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getSystemTheme();
  setTheme(initialTheme);

  // ---------- TOGGLE CLICK ----------
  toggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  // ---------- OPTIONAL: SYNC WITH SYSTEM CHANGES ----------
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!getSavedTheme()) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
})();

document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     FADE-UP ANIMATION
  ================================ */
  const fadeUpElements = document.querySelectorAll(".fade-up");

  const fadeUpObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeUpElements.forEach(el => fadeUpObserver.observe(el));

});

document.addEventListener("DOMContentLoaded", () => {

  const animatedElements = document.querySelectorAll("[data-animate]");

  const animationObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const delay = entry.target.dataset.delay || 0;

          setTimeout(() => {
            entry.target.classList.add("animate-show");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach(el => animationObserver.observe(el));

});

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".quote-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".contact-section")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

});
const section = document.querySelector(".testimonial-scroll");
const track = document.getElementById("testimonialTrack");
const wrapper = document.querySelector(".testimonial-wrapper");

window.addEventListener("scroll", () => {
  const sectionRect = section.getBoundingClientRect();
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // Total horizontal scroll distance
  const maxScroll = track.scrollWidth - wrapper.clientWidth;

  // Pinning logic
  if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
    // Keep wrapper sticky while scrolling through the section
    wrapper.style.position = "sticky";
    wrapper.style.top = "0";

    // Progress of scroll inside section
    const progress = Math.min(
      Math.max((scrollY - sectionTop) / (sectionHeight - window.innerHeight), 0),
      1
    );

    // Move track horizontally
    track.style.transform = `translateX(-${progress * maxScroll}px)`;
  } else {
    // Remove sticky after scrolling past section
    wrapper.style.position = "relative";

    // Reset horizontal transform if before section
    if (scrollY < sectionTop) track.style.transform = `translateX(0)`;
    // Snap to end if scrolled past section
    if (scrollY > sectionTop + sectionHeight) track.style.transform = `translateX(-${maxScroll}px)`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      item.classList.toggle('active');

      // Optional: close others when one opens
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });
    });
  });
});

const backToTop = document.getElementById("backToTop");

// Show button on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Scroll to top smoothly
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


