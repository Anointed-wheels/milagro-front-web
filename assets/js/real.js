document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DUMMY DATASET FOR JS FRONTEND SEARCH ---
  const propertiesData = [
    { title: "The Sovereign Glass Villa", location: "New York", type: "buy", price: "$4,800,000" },
    { title: "Penthouse Horizon", location: "London", type: "rent", price: "$12,500 / mo" },
    { title: "Elysian Eco-Tower", location: "Dubai", type: "developments", price: "Starting at $1,200,000" },
    { title: "Coastal Haven Estate", location: "Los Angeles", type: "sell", price: "$6,500,000" },
    { title: "Avenue Commercial Suites", location: "Paris", type: "more", price: "Upon Request" }
  ];

  // --- 2. DROPDOWN MEGA MENU LOGIC ---
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  const closeDropdownBtns = document.querySelectorAll('.close-dropdown-btn');

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = trigger.parentElement;
      
      // Close other dropdowns
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

  // Close menus when clicking outside
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

  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
  });

  closeSearchBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });

  // Filter Category Switching
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-type');
      performSearch();
    });
  });

  // Search Input Keyup Listener
  searchInput.addEventListener('keyup', performSearch);

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = propertiesData.filter(item => {
      const matchesCategory = currentCategory === 'all' || item.type === currentCategory;
      const matchesQuery = item.title.toLowerCase().includes(query) || item.location.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    renderResults(filtered);
  }

  function renderResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = `<p class="search-hint">No listings found matching your search criteria.</p>`;
      return;
    }

    searchResults.innerHTML = results.map(item => `
      <div style="padding:0.8rem 0; border-bottom: 1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:var(--text-main); display:block;">${item.title}</strong>
          <small style="color:var(--text-muted);">${item.location} • <span style="text-transform:uppercase;">${item.type}</span></small>
        </div>
        <span style="color:var(--accent-gold); font-weight:700;">${item.price}</span>
      </div>
    `).join('');
  }

  // --- 4. LIGHT / DARK THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
  });

});