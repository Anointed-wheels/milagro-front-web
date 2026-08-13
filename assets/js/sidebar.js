document.addEventListener("DOMContentLoaded", () => {
  // Navigation & Drawer Elements
  const mobileToggle = document.getElementById("mobileToggle");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const navMenu = document.getElementById("navMenu");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  
  // Search Overlay Elements
  const searchToggle = document.getElementById("searchToggle");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const searchInput = document.getElementById("searchInput");

  // Dropdown Triggers (Desktop + Mobile)
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const closeDropdownBtns = document.querySelectorAll(".close-dropdown-btn");
  const nearMeLink = document.getElementById("nearMeLink");

  // --- MOBILE SIDEBAR HANDLERS ---
  function openMobileMenu() {
    if (navMenu) navMenu.classList.add("mobile-active");
    if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove("mobile-active");
    if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (mobileToggle) mobileToggle.addEventListener("click", openMobileMenu);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeMobileMenu);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeMobileMenu);

  // --- SEARCH MODAL HANDLERS ---
  function openSearchModal() {
    closeMobileMenu(); // Close mobile drawer if open
    if (searchOverlay) {
      searchOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
    }
  }

  function closeSearchModal() {
    if (searchOverlay) {
      searchOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (searchToggle) searchToggle.addEventListener("click", openSearchModal);
  if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearchModal);

  // --- UNIVERSAL DROPDOWN TOGGLES (DESKTOP & MOBILE) ---
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".dropdown-trigger");
    
    if (trigger) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Close other open dropdowns
        dropdownItems.forEach((otherItem) => {
          if (otherItem !== item) otherItem.classList.remove("open");
        });

        // Toggle current dropdown
        item.classList.toggle("open");
      });
    }
  });

  // Mega-menu close buttons inside dropdowns
  closeDropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const parentItem = btn.closest(".dropdown-item");
      if (parentItem) parentItem.classList.remove("open");
    });
  });

  // Close active dropdowns when clicking outside (Desktop)
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-item")) {
      dropdownItems.forEach((item) => item.classList.remove("open"));
    }
  });

  // Keyboard Escape Handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeSearchModal();
      closeMobileMenu();
      dropdownItems.forEach((item) => item.classList.remove("open"));
    }
  });

  // --- "PROPERTIES NEAR ME" GEOLOCATION HANDLER ---
  if (nearMeLink) {
    nearMeLink.addEventListener("click", function (e) {
      e.preventDefault();

      const defaultFallbackURL = "properties.html?filter=all";

      if ("geolocation" in navigator) {
        // Fetch GPS coordinates
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Redirect with user coordinates
            window.location.href = `properties.html?lat=${lat}&lng=${lng}`;
          },
          (error) => {
            console.warn("Location access denied or unavailable. Fallback to all properties.", error);
            window.location.href = defaultFallbackURL;
          },
          { timeout: 6000, maximumAge: 60000 }
        );
      } else {
        // Browser lacks Geolocation support
        window.location.href = defaultFallbackURL;
      }
    });
  }
});