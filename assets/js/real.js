document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DUMMY DATASET WITH UNIQUE URLS ---
  const propertiesData = [
    { 
      id: "sovereign-glass-villa",
      title: "The Sovereign Glass Villa", 
      location: "New York", 
      type: "buy", 
      price: "$4,800,000", 
      url: "properties.html#sovereign-glass-villa" 
    },
    { 
      id: "penthouse-horizon",
      title: "Penthouse Horizon", 
      location: "London", 
      type: "rent", 
      price: "$12,500 / mo", 
      url: "properties.html?id=penthouse-horizon" 
    },
    { 
      id: "elysian-eco-tower",
      title: "Elysian Eco-Tower", 
      location: "Dubai", 
      type: "developments", 
      price: "Starting at $1,200,000", 
      url: "properties.html?id=elysian-eco-tower" 
    },
    { 
      id: "coastal-haven-estate",
      title: "Coastal Haven Estate", 
      location: "Los Angeles", 
      type: "sell", 
      price: "$6,500,000", 
      url: "properties.html?id=coastal-haven-estate" 
    },
    { 
      id: "avenue-commercial-suites",
      title: "Avenue Commercial Suites", 
      location: "Paris", 
      type: "more", 
      price: "Upon Request", 
      url: "properties.html?id=avenue-commercial-suites" 
    }
  ];

  // --- 2. DROPDOWN MEGA MENU LOGIC ---
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  const closeDropdownBtns = document.querySelectorAll('.close-dropdown-btn');

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      
      document.querySelectorAll('.dropdown-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });

      parent.classList.toggle('active');
    });
  });

  closeDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.dropdown-item').classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-item')) {
      document.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
    }
  });

  // --- 3. SEARCH OVERLAY & JS FILTERING ---
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchResults = document.getElementById('searchResults');

  let currentCategory = 'all';

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
      performSearch(); // Show initial items when opening modal
    });
  }

  if (closeSearchBtn && searchOverlay) {
    closeSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
    });
  }

  // Filter Category Switching - STAYS IN MODAL
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevents any accidental page navigation
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-type');
      performSearch(); // Filters list right inside the search drawer
    });
  });

  if (searchInput) {
    searchInput.addEventListener('keyup', performSearch);
  }

  function performSearch() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = propertiesData.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.type === currentCategory;
      const matchesQuery = item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    renderResults(filtered);
  }

  // RENDER CLICKABLE LIST ITEMS
  function renderResults(results) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = `<p class="search-hint" style="padding:1.5rem; text-align:center; color:var(--text-muted);">No listings found matching your search criteria.</p>`;
      return;
    }

    // Wrap each result in an <a href="..."> tag
    searchResults.innerHTML = results.map(item => `
      <a href="${item.url}" class="search-result-item" style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.9rem 1rem;
        border-bottom: 1px solid var(--border-color);
        text-decoration: none;
        color: inherit;
        transition: background 0.2s ease;
      ">
        <div>
          <strong style="color:var(--text-main); display:block; font-size: 0.95rem;">${item.title}</strong>
          <small style="color:var(--text-muted); font-size: 0.8rem;">${item.location} • <span style="text-transform:uppercase; color:var(--accent-gold);">${item.type}</span></small>
        </div>
        <span style="color:var(--accent-gold); font-weight:700; font-size: 0.9rem;">${item.price}</span>
      </a>
    `).join('');
  }

  // --- 4. LIGHT / DARK THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Check if there is a hash in the URL (e.g., #sovereign-glass-villa)
  const targetId = window.location.hash.substring(1);

  if (targetId) {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Delay slightly to ensure layout/images are loaded
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center' // Places target in the vertical middle of the screen
        });

        // Optional: Briefly highlight the target card
        targetElement.classList.add('highlight-card');
        setTimeout(() => targetElement.classList.remove('highlight-card'), 2000);
      }, 300);
    }
  }
});