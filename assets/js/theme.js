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
