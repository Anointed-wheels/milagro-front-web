// search.js - Handles routing from the Search Overlay
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.search-filter-pills .filter-btn');
  const searchInput = document.getElementById('searchInput');

  // Handle Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.getAttribute('data-type');
      
      if (filterType === 'sell') {
        // Redirect to seller inquiry section
        window.location.href = 'properties.html#sell-section';
      } else {
        // Redirect with URL parameter
        window.location.href = `properties.html?type=${filterType}`;
      }
    });
  });

  // Handle Input Search on Enter Key
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `properties.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});

// ================= SEARCH OVERLAY ENGINE =================
document.addEventListener('DOMContentLoaded', () => {
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchResults = document.getElementById('searchResults');
  const filterBtns = document.querySelectorAll('.search-filter-pills .filter-btn');

  // Sample Mock Database for Live Search Preview
  const propertiesData = [
    { id: 1, title: "The Grand Imperial Villa", type: "buy", location: "Lekki Phase 1, Lagos", price: "$299,110,752 USD", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80" },
    { id: 2, title: "Bodija Luxury Executive Penthouse", type: "rent", location: "Old Bodija, Ibadan", price: "$18,000/yr", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80" },
    { id: 3, title: "Maitama Presidential Heights", type: "buy", location: "Maitama, Abuja", price: "$210,000,000 USD", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=200&q=80" },
    { id: 4, title: "Milagro Tech & Commercial Hub", type: "developments", location: "Ikeja GRA, Lagos", price: "Price Upon Request", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80" }
  ];

  let currentCategory = 'all';

  // --- 1. Close Overlay Trigger ---
  if (closeSearchBtn && searchOverlay) {
    closeSearchBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scrolling
    });

    // Close on backdrop click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 2. Filter Pills Handling & Navigation ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.getAttribute('data-type');

      if (currentCategory === 'sell') {
        // Redirect to selling inquiry page or section
        window.location.href = 'properties.html?action=sell';
        return;
      }

      if (currentCategory === 'more') {
        // Redirect and trigger advanced filter drawer on properties page
        window.location.href = 'properties.html?filter=advanced';
        return;
      }

      // If user clicks pill and input is empty, navigate straight to filtered results page
      if (!searchInput.value.trim()) {
        window.location.href = `properties.html?type=${currentCategory}`;
      } else {
        // Re-render live preview results based on active pill
        renderLiveResults(searchInput.value.trim(), currentCategory);
      }
    });
  });

  // --- 3. Live Search Input Handling ---
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      renderLiveResults(query, currentCategory);
    });

    // Press Enter to navigate to main properties directory page
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        window.location.href = `properties.html?type=${currentCategory}&search=${encodeURIComponent(query)}`;
      }
    });
  }

  // --- 4. Render Live Preview Drawer Results ---
  function renderLiveResults(query, category) {
    if (!query) {
      searchResults.innerHTML = `<p class="search-hint">Type above or click a filter category to see matching property listings.</p>`;
      return;
    }

    const filtered = propertiesData.filter(item => {
      const matchesCategory = (category === 'all' || item.type === category);
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                           item.location.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (filtered.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No listings match "<strong>${query}</strong>" in <em>${category.toUpperCase()}</em>.</p>
          <a href="properties.html?search=${encodeURIComponent(query)}" class="see-all-btn">Search Entire Database &rarr;</a>
        </div>
      `;
      return;
    }

    let html = `<div class="live-results-list">`;
    filtered.forEach(item => {
      html += `
        <a href="properties.html?id=${item.id}" class="live-result-item">
          <img src="${item.img}" alt="${item.title}" class="live-result-thumb">
          <div class="live-result-info">
            <h4>${item.title}</h4>
            <p>${item.location}</p>
          </div>
          <div class="live-result-price">${item.price}</div>
        </a>
      `;
    });
    html += `</div>
      <div class="live-results-footer">
        <a href="properties.html?type=${category}&search=${encodeURIComponent(query)}">View all matching results (${filtered.length}) &rarr;</a>
      </div>`;

    searchResults.innerHTML = html;
  }
});

