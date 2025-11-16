/**
 * Modern Sitemap Application
 * No jQuery, pure vanilla JavaScript with modern ES6+ features
 * Includes: Dark mode, search, accessibility, error handling
 */

// Import sitemap data (injected by Vite)
const SITEMAP_DATA = __SITEMAP_DATA__;

// Configuration
const CONFIG = {
  ossServer: import.meta.env.VITE_OSS_SERVER || '',
  ossApiKey: import.meta.env.VITE_OSS_API_KEY || '',
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  searchDebounce: 300,
};

// ============================================================================
// Theme Management
// ============================================================================

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupToggle();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    this.updateIcons(theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  updateIcons(theme) {
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');

    if (theme === 'dark') {
      darkIcon?.classList.add('d-none');
      lightIcon?.classList.remove('d-none');
    } else {
      darkIcon?.classList.remove('d-none');
      lightIcon?.classList.add('d-none');
    }
  }

  setupToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle?.addEventListener('click', () => {
      const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
    });
  }
}

// ============================================================================
// Search Functionality
// ============================================================================

class SearchManager {
  constructor() {
    this.searchBox = document.getElementById('search-box');
    this.searchResults = document.getElementById('search-results');
    this.searchLoading = document.getElementById('search-loading');
    this.searchError = document.getElementById('search-error');
    this.searchForm = document.getElementById('search-form');
    this.debounceTimer = null;
    this.abortController = null;
    this.init();
  }

  init() {
    if (!this.searchBox) return;

    this.searchBox.addEventListener('input', (e) => this.handleSearch(e));
    this.searchForm?.addEventListener('submit', (e) => e.preventDefault());
  }

  handleSearch(event) {
    const query = event.target.value.trim();

    clearTimeout(this.debounceTimer);

    if (query.length < 2) {
      this.hideResults();
      return;
    }

    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, CONFIG.searchDebounce);
  }

  async performSearch(query) {
    if (!CONFIG.ossServer || !CONFIG.ossApiKey) {
      this.showLocalSearch(query);
      return;
    }

    try {
      this.showLoading();
      this.hideError();

      // Cancel previous request
      if (this.abortController) {
        this.abortController.abort();
      }

      this.abortController = new AbortController();

      const searchUrl = `${CONFIG.ossServer}/autocompletion?use=duyetdev&login=duyetdev&key=${CONFIG.ossApiKey}&name=autocomplete&query=${encodeURIComponent(query)}`;

      const response = await fetch(searchUrl, {
        signal: this.abortController.signal,
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const text = await response.text();
      const results = text.split('\n').filter((line) => line.trim());

      this.displayResults(results, query);
    } catch (error) {
      if (error.name === 'AbortError') return;

      console.error('Search error:', error);
      this.showError('Search is temporarily unavailable. Showing local results.');
      this.showLocalSearch(query);
    } finally {
      this.hideLoading();
    }
  }

  showLocalSearch(query) {
    const results = [];
    const queryLower = query.toLowerCase();

    SITEMAP_DATA.forEach((site) => {
      if (site.node.toLowerCase().includes(queryLower)) {
        results.push(site.node);
      }

      if (site.sub && Array.isArray(site.sub)) {
        site.sub.forEach((sub) => {
          if (sub.node && sub.node.toLowerCase().includes(queryLower)) {
            results.push(`${site.node} - ${sub.node}`);
          }
        });
      }
    });

    this.displayResults(results, query);
  }

  displayResults(results, query) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="list-group-item text-muted">
          No results found for "${this.escapeHtml(query)}"
        </div>
      `;
      this.searchResults.classList.remove('d-none');
      return;
    }

    const html = results
      .slice(0, 10)
      .map((result) => {
        const highlighted = this.highlightQuery(result, query);
        return `
        <button type="button" class="list-group-item list-group-item-action">
          ${highlighted}
        </button>
      `;
      })
      .join('');

    this.searchResults.innerHTML = html;
    this.searchResults.classList.remove('d-none');
  }

  highlightQuery(text, query) {
    const escapedText = this.escapeHtml(text);
    const escapedQuery = this.escapeHtml(query);
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading() {
    this.searchLoading?.classList.remove('d-none');
  }

  hideLoading() {
    this.searchLoading?.classList.add('d-none');
  }

  showError(message) {
    if (!this.searchError) return;
    this.searchError.textContent = message;
    this.searchError.classList.remove('d-none');
  }

  hideError() {
    this.searchError?.classList.add('d-none');
  }

  hideResults() {
    this.searchResults?.classList.add('d-none');
  }
}

// ============================================================================
// Sitemap Rendering
// ============================================================================

class SitemapRenderer {
  constructor(data) {
    this.data = data;
    this.container = document.getElementById('sitemap-container');
  }

  render() {
    if (!this.container) return;

    const html = this.data
      .map((site) => this.renderSite(site))
      .join('');

    this.container.innerHTML = html;
  }

  renderSite(site) {
    const subItems = this.renderSubItems(site.sub || []);

    return `
      <section class="mb-4" aria-labelledby="site-${this.slugify(site.node)}">
        <h2 id="site-${this.slugify(site.node)}" class="h5 mb-3">
          <a
            href="${this.addUtmParams(site.url)}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-decoration-none text-primary"
          >
            ${this.escapeHtml(site.node)}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right ms-1" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </a>
        </h2>
        ${subItems}
      </section>
    `;
  }

  renderSubItems(subItems) {
    if (!subItems || subItems.length === 0) {
      return '<p class="text-muted ps-3">No sub-pages</p>';
    }

    const items = subItems
      .map(
        (sub) => `
        <li class="mb-2">
          <a
            href="${this.addUtmParams(sub.url)}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-decoration-none"
          >
            ${this.escapeHtml(sub.node || 'Home')}
          </a>
        </li>
      `
      )
      .join('');

    return `<ul class="list-unstyled ps-3">${items}</ul>`;
  }

  addUtmParams(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=sitemap.duyet.net&utm_medium=sitemap&utm_campaign=navigation`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// ============================================================================
// Analytics
// ============================================================================

class Analytics {
  constructor() {
    if (CONFIG.gaId) {
      this.loadGA4();
    }
  }

  loadGA4() {
    // GA4 implementation
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', CONFIG.gaId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  }
}

// ============================================================================
// Service Worker Registration
// ============================================================================

class PWAManager {
  constructor() {
    this.register();
  }

  async register() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }
}

// ============================================================================
// Application Initialization
// ============================================================================

class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    // Initialize all components
    new ThemeManager();
    new SearchManager();

    const renderer = new SitemapRenderer(SITEMAP_DATA);
    renderer.render();

    new Analytics();
    new PWAManager();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    console.log('🚀 Sitemap v2.0.0 initialized');
  }
}

// Start the application
new App();
