document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const agentCards = document.querySelectorAll(".agent-card");
  const searchInput = document.getElementById("agentSearchInput");
  const directoryTitle = document.getElementById("directoryTitle");
  const resultsCount = document.getElementById("resultsCount");

  // Read URL query parameters passed from header links
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter"); // e.g. "local-agents", "global-offices"

  // Helper function to apply active tab and perform filter
  function applyFilter(category) {
    let visibleCount = 0;

    // Update active UI tab button
    tabBtns.forEach(btn => {
      if (btn.dataset.tab === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Directory Title
    if (category === "offices" || category === "local-offices" || category === "global-offices") {
      directoryTitle.textContent = "Regional Offices & Agencies";
    } else if (category === "local-agents") {
      directoryTitle.textContent = "Your Local Advisors";
    } else if (category === "global-agents") {
      directoryTitle.textContent = "Global Luxury Network";
    } else {
      directoryTitle.textContent = "All Advisors & Offices";
    }

    // Filter Agent Cards
    agentCards.forEach(card => {
      const cardCategory = card.dataset.category;
      
      if (
        category === "all" || 
        cardCategory === category ||
        (category.includes("office") && cardCategory === "offices") ||
        (category.includes("agent") && cardCategory.includes("agent"))
      ) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Update count display
    resultsCount.textContent = `Showing ${visibleCount} Result${visibleCount === 1 ? '' : 's'}`;
  }

  // Handle Tab Click Events
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.tab);
    });
  });

  // Handle Real-time Search Input Filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      agentCards.forEach(card => {
        const textContent = card.textContent.toLowerCase();
        if (textContent.includes(query)) {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      resultsCount.textContent = `Showing ${visibleCount} Result${visibleCount === 1 ? '' : 's'}`;
    });
  }

  // Execute Initial Filter based on URL parameter on page load
  if (filterParam) {
    applyFilter(filterParam);
  } else {
    applyFilter("all");
  }
});