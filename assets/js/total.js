// --- SCROLL REVEAL ANIMATION FOR EXPERTS SECTION ---
document.addEventListener('DOMContentLoaded', () => {
  const revealTarget = document.querySelector('.experts-image-wrapper');

  if (revealTarget) {
    const observerOptions = {
      root: null,
      threshold: 0.25 // Triggers when 25% of the image is visible in view
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target); // Runs animation once cleanly
        }
      });
    }, observerOptions);

    revealObserver.observe(revealTarget);
  }
});