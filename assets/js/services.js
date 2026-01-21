document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".read-more-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const serviceText = btn.closest(".service-text");
      const more = serviceText.querySelector(".service-more");

      more.classList.toggle("show");

      btn.textContent = more.classList.contains("show")
        ? "Show less"
        : "Read more";
    });
  });
});
