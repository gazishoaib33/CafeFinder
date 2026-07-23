# ☕ CafeFinder

A modern, responsive web app for discovering nearby cafes — built with vanilla JavaScript and the Google Maps Platform. Designed around a warm, coffee-inspired visual identity ("Roast & Cherry") rather than a generic SaaS template.

> **Status: In active development.** This README reflects what's actually built today, plus a transparent roadmap of what's next. See [Progress](#-progress) below.

---

## ✨ Overview

CafeFinder helps people find great cafes near them — searchable by city, area, zip code, or current location — with real-time ratings, hours, distance, and directions surfaced through the Google Maps and Places APIs.

No frameworks, no build step: pure HTML5, CSS3, and ES6+ JavaScript modules, designed to run anywhere a browser can reach — including as a lightweight Docker container.

## 🖼️ Screenshots

_Add screenshots or a short GIF of the hero section and map here once you have them — e.g. drag images into this section on GitHub, or reference `assets/images/`._

```
assets/images/hero-preview.png
assets/images/map-preview.png
```

## 🚧 Progress

| Step | Feature | Status |
|---|---|---|
| 1 | Project planning & architecture | ✅ Done |
| 2 | Project setup & skeleton | ✅ Done |
| 3 | Landing page UI (hero, search bar, geolocation) | ✅ Done |
| 4 | Google Maps integration | ✅ Done |
| 5 | Cafe search (Places API) | ⏳ Planned |
| 6 | Cafe cards | ⏳ Planned |
| 7 | Filters & sorting | ⏳ Planned |
| 8 | Favorites (Local Storage) | ⏳ Planned |
| 9 | Dark mode | ⏳ Planned |
| 10 | Extra features (weather, travel time, nearby POIs) | ⏳ Planned |
| 11 | Performance & accessibility pass | ⏳ Planned |
| 12 | Final polish & v1.0.0 release | ⏳ Planned |

## 🔧 What Works Right Now

- Responsive navbar with mobile hamburger menu
- Animated hero section with a search bar and a working **"Use My Location"** button (browser Geolocation API)
- Interactive Google Map with graceful loading and error/retry states
- Warm, custom "Roast & Cherry" design system — no template styling

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3 (CSS custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+ modules — no bundler required)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) (loaded via Google's dynamic `importLibrary` bootstrap loader)
- [Places API (New)](https://developers.google.com/maps/documentation/places/web-service/op-overview) *(wiring lands in Step 5)*

**Fonts & Icons**
- [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Manrope](https://fonts.google.com/specimen/Manrope), [Space Mono](https://fonts.google.com/specimen/Space+Mono) via Google Fonts
- [Font Awesome](https://fontawesome.com/)

**Infra**
- Docker + Nginx (static file serving)
- No backend / database — fully client-side

## 📁 Folder Structure

```
CafeFinder/
├── index.html              # Main page
├── favorites.html          # (planned — Step 8)
├── Dockerfile               # Nginx-based static file server
├── docker-compose.yml      # Local dev convenience wrapper
├── .dockerignore
├── .gitignore
├── README.md
├── css/
│   └── style.css            # Design tokens + all component styles
├── js/
│   ├── config.js             # Your local API key (gitignored, not committed)
│   ├── config.example.js   # Template — copy this to create config.js
│   ├── api.js                 # Google Maps / Places API wrapper functions
│   ├── ui.js                   # DOM rendering (cards, map markers, skeletons)
│   ├── storage.js            # Local Storage helpers (favorites, theme, history)
│   ├── filters.js              # Filter/sort logic (pure functions)
│   └── main.js                # App entry point — wires everything together
└── assets/
    ├── images/
    └── icons/
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/CafeFinder.git
cd CafeFinder
```

### 2. Get a Google Maps API key

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create (or select) a project
2. Enable these APIs under **APIs & Services → Library**:
   - Maps JavaScript API
   - Places API (New)
   - Geocoding API
   - Distance Matrix API
3. Create an API key under **APIs & Services → Credentials**
4. **Restrict it** — HTTP referrers (`localhost`, your deployed domain) + limit to the 4 APIs above

### 3. Add your API key locally

```bash
cp js/config.example.js js/config.js
```

Open `js/config.js` and paste your key:

```js
GOOGLE_MAPS_API_KEY: 'your-real-key-here',
```

> `js/config.js` is gitignored on purpose — your key never gets committed. Only `config.example.js` (the template) is tracked in git.

### 4. Run it

**Option A — Docker (recommended)**

```bash
docker compose up --build
```

Visit **http://localhost:8080**

**Option B — Any static file server**

Because the app uses native ES modules (`<script type="module">`), it must be served over HTTP — opening `index.html` directly as a `file://` path will fail with a CORS error in the browser.

```bash
python3 -m http.server 8000
# or: npx serve
```

Visit **http://localhost:8000**

## ♿ Accessibility & Performance

Baked in from the start, expanded further in Step 11:
- Semantic HTML, ARIA labels on interactive controls
- Visible keyboard focus states throughout
- `prefers-reduced-motion` respected on all animations
- Fonts and scripts loaded with `preconnect` / `defer`-friendly patterns

## 🗺️ Roadmap

- [ ] Places API-powered nearby & text search
- [ ] Cafe result cards with ratings, hours, distance, and photos
- [ ] Filtering (rating, price, distance, open now, cafe type) and sorting
- [ ] Favorites with Local Storage persistence
- [ ] Full dark mode
- [ ] Weather, travel time, and nearby-POI extras
- [ ] AI-powered "Recommended For You" suggestions
- [ ] Deployment (GitHub Pages / Netlify / Vercel)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙋 About

Built as a portfolio project to explore the Google Maps Platform, vanilla JS architecture, and original UI design work outside typical component-library defaults.
