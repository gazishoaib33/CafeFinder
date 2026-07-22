// main.js
// ------------------------------------------------------------------
// Application entry point. Loaded as a native ES module from
// index.html, so it can `import` the other js/ files directly —
// no bundler needed.
//
// Responsibilities that live here (grows with each step):
//   - Import + wire up the other modules
//   - Top-level event listeners that don't belong to one module
//   - App bootstrap (runs once the DOM is ready)
// ------------------------------------------------------------------

import { CONFIG } from './config.js';
import { Storage } from './storage.js';
import { CafeAPI } from './api.js';
import { UI } from './ui.js';
import { Filters } from './filters.js';

/**
 * Minimal shared app state. Small enough to live here for now — if it
 * keeps growing (Step 5+ will add search results, filters, etc.) we'll
 * split it into its own state.js module.
 */
const AppState = {
  userLocation: null, // { lat, lng } once "Use My Location" succeeds
};

/**
 * Toggles the mobile navigation menu open/closed and keeps the
 * hamburger icon + aria-expanded state in sync with it.
 */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu automatically if a nav link is tapped.
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Writes a message into the hero's status line beneath the search bar.
 * `state` controls the color: 'info' | 'success' | 'error'.
 */
function setStatus(message, state = 'info') {
  const statusEl = document.getElementById('search-status');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.dataset.state = state;
}

/**
 * Toggles the loading spinner + disabled state on the locate button.
 */
function setLocateLoading(isLoading) {
  const locateBtn = document.getElementById('locate-btn');
  if (!locateBtn) return;
  locateBtn.classList.toggle('is-loading', isLoading);
  locateBtn.disabled = isLoading;
}

/**
 * Wires the "Use My Location" button to the browser's Geolocation API.
 * NOTE: this only captures coordinates into AppState for now — it isn't
 * connected to the map or a places search yet. That wiring happens once
 * the map exists (Step 4) and the search logic is built (Step 5).
 */
function initLocationButton() {
  const locateBtn = document.getElementById('locate-btn');
  const searchInput = document.getElementById('search-input');
  if (!locateBtn) return;

  locateBtn.addEventListener('click', () => {
    if (!('geolocation' in navigator)) {
      setStatus("This browser doesn't support geolocation — try typing a location instead.", 'error');
      return;
    }

    setLocateLoading(true);
    setStatus('Locating you…', 'info');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        AppState.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (searchInput) searchInput.value = 'Your current location';
        setLocateLoading(false);
        setStatus('📍 Location found — nearby search unlocks in Step 5.', 'success');
      },
      (error) => {
        setLocateLoading(false);
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location access was denied — you can still search by typing a city or zip code.'
            : "Couldn't get your location — please try typing a location instead.";
        setStatus(message, 'error');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}

/**
 * Wires the hero search form. Real Places-backed search is Step 5 —
 * for now this just confirms input capture and gives the person
 * honest feedback instead of silently doing nothing.
 */
function initSearchForm() {
  const form = document.getElementById('hero-search-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();

    if (!query) {
      setStatus('Type a city, area, zip code, or cafe name to search.', 'error');
      return;
    }

    console.log('Search submitted (Places API wiring lands in Step 5):', query);
    setStatus(`Got it — we'll search for "${query}" once Step 5 connects the Places API.`, 'info');
  });
}

/**
 * App bootstrap — runs once, on initial page load.
 */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function init() {
  initMobileNav();
  initLocationButton();
  initSearchForm();
  setFooterYear();

  // Sanity check: confirms module wiring + config loading works.
  // Safe to remove once later steps add real console feedback.
  console.log('CafeFinder skeleton wired up ✅', {
    CONFIG,
    Storage,
    CafeAPI,
    UI,
    Filters,
    AppState,
  });
}

document.addEventListener('DOMContentLoaded', init);
