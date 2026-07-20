// config.example.js
// ------------------------------------------------------------------
// Template for js/config.js — copy this file, rename it to config.js,
// and drop in your own Google Maps API key.
//
//   cp js/config.example.js js/config.js
//
// js/config.js is gitignored, so your real key never gets committed.
// ------------------------------------------------------------------

export const CONFIG = {
  // Google Cloud API key with Maps JavaScript API, Places API (New),
  // Geocoding API, and Distance Matrix API enabled + restricted.
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY_HERE',

  // Default search radius in meters when browsing "nearby" cafes.
  DEFAULT_SEARCH_RADIUS_METERS: 5000,

  // Default map zoom level on load.
  DEFAULT_MAP_ZOOM: 14,

  // Default map center (used only until we get the user's location).
  // Currently set to a neutral fallback — Dhaka, Bangladesh.
  DEFAULT_CENTER: { lat: 23.8103, lng: 90.4125 },
};
