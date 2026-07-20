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
 * App bootstrap — runs once, on initial page load.
 */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function init() {
  initMobileNav();
  setFooterYear();

  // Sanity check: confirms module wiring + config loading works.
  // Safe to remove once later steps add real console feedback.
  console.log('CafeFinder skeleton wired up ✅', {
    CONFIG,
    Storage,
    CafeAPI,
    UI,
    Filters,
  });
}

document.addEventListener('DOMContentLoaded', init);
