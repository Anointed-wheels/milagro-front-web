document.addEventListener("DOMContentLoaded", () => {
  // Navigation Elements
  const mobileToggle = document.getElementById("mobileToggle");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const navMenu = document.getElementById("navMenu");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  
  // Mobile Dropdown Triggers
  const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");

  // Helper function to open menu
  function openMobileMenu() {
    if (navMenu) navMenu.classList.add("mobile-active");
    if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent body scroll when drawer is open
  }

  // Helper function to close menu
  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove("mobile-active");
    if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scroll
  }

  // Event Listeners for Opening & Closing Sidebar
  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener("click", closeMobileMenu);
  }

  // Close drawer on Pressing 'Escape' key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("mobile-active")) {
      closeMobileMenu();
    }
  });

  // Mobile Accordion/Dropdown Toggle logic for Properties & Agents sub-menus
  dropdownTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      // Only execute accordions on mobile screens
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const parentItem = this.closest(".dropdown-item");
        
        // Toggle current dropdown item active state
        if (parentItem) {
          parentItem.classList.toggle("open");
        }
      }
    });
  });
});