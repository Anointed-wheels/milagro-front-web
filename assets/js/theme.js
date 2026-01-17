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