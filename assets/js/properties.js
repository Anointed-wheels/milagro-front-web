// --- SMART SCROLL HEADER & BROKERAGE FILTER SYSTEM ---
document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = document.getElementById('mainHeader');
  let lastScrollY = window.scrollY;

  // Smart Header Hide/Show on Scroll Up/Down
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY) {
        // Scroll DOWN -> Hide main navbar
        mainHeader.classList.add('header-hidden');
        document.body.classList.remove('header-visible');
      } else {
        // Scroll UP -> Reveal main navbar
        mainHeader.classList.remove('header-hidden');
        document.body.classList.add('header-visible');
      }
    } else {
      mainHeader.classList.remove('header-hidden');
      document.body.classList.add('header-visible');
    }

    lastScrollY = currentScrollY;
  });

  // Bookmark toggle state
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const svg = btn.querySelector('svg');
      if (btn.classList.contains('saved')) {
        btn.classList.remove('saved');
        svg.setAttribute('fill', 'none');
      } else {
        btn.classList.add('saved');
        svg.setAttribute('fill', 'currentColor');
      }
    });
  });
});

// ================= PROPERTIES DIRECTORY ENGINE =================
document.addEventListener('DOMContentLoaded', () => {
  const mainHeader = document.getElementById('mainHeader');
  const subnavSearchInput = document.getElementById('subnavSearchInput');
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const propertyCards = document.querySelectorAll('.property-card');
  const propertyCountElem = document.getElementById('propertyCount');

  let lastScrollY = window.scrollY;

  // --- 1. Smart Hide/Show Navigation on Scroll ---
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY) {
        mainHeader.classList.add('header-hidden');
        document.body.classList.remove('header-visible');
      } else {
        mainHeader.classList.remove('header-hidden');
        document.body.classList.add('header-visible');
      }
    } else {
      mainHeader.classList.remove('header-hidden');
      document.body.classList.add('header-visible');
    }
    lastScrollY = currentScrollY;
  });

  // --- 2. Read URL Parameters on Page Load ---
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type') || 'all';
  const searchParam = urlParams.get('search') || '';

  // Pre-fill subnav search input if query exists
  if (searchParam && subnavSearchInput) {
    subnavSearchInput.value = decodeURIComponent(searchParam);
  }

  // Sync Segment Switcher UI
  segmentBtns.forEach(btn => {
    if (btn.getAttribute('data-intent') === typeParam) {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });

  // Perform initial filter on load
  filterListings(typeParam, searchParam.toLowerCase());

  // --- 3. Segment Filter Clicks ---
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const intent = btn.getAttribute('data-intent');
      filterListings(intent, subnavSearchInput ? subnavSearchInput.value.toLowerCase() : '');
    });
  });

  // --- 4. Sub-Nav Live Typing Filter ---
  if (subnavSearchInput) {
    subnavSearchInput.addEventListener('input', (e) => {
      const activeType = document.querySelector('.segment-btn.active')?.getAttribute('data-intent') || 'all';
      filterListings(activeType, e.target.value.toLowerCase());
    });
  }

  // --- Core Filtering Logic ---
  function filterListings(type, query) {
    let matchCount = 0;

    propertyCards.forEach(card => {
      const cardType = card.getAttribute('data-category') || 'all';
      const cardText = card.textContent.toLowerCase();

      const matchesType = (type === 'all' || cardType === type);
      const matchesSearch = !query || cardText.includes(query);

      if (matchesType && matchesSearch) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (propertyCountElem) {
      propertyCountElem.textContent = matchCount;
    }
  }
});