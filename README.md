# RUYNED — official site

A single-page **PWA** for **RUYNED**, a Black/Thrash/Speed Metal band from
Timișoara, Romania. Built with **Vite + TypeScript** (no UI framework — a tiny
hand-rolled hash router), deployed to **GitHub Pages**.

> Fan-built tribute site. All artwork © its respective creators.

## Stack

- **Vite 6** + **TypeScript** (strict)
- Vanilla DOM + a ~70-line hash router (`src/lib/router.ts`)
- **PWA** via [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/) — installable, offline-capable, auto-updating service worker
- Zero runtime dependencies

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/ruyned/
```

## Build & preview

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the built site locally
```

## Project structure

```
public/            static assets (logo, covers, hero, PWA icons, .nojekyll)
src/
  data.ts          single source of truth: band, releases, members, shows, links
  main.ts          mounts the shell + boots the router
  style.css        the whole design system
  lib/
    router.ts      hash-based client-side router
    ui.ts          shared markup fragments (marquee, dividers, buttons…)
  components/       nav + footer
  views/            home · music · band · live · contact
```

## Deployment (GitHub Pages)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to Pages.

1. Create a repo named **`ruyned`** and push this code to `main`.
2. In **Settings → Pages**, set **Source = GitHub Actions**.
3. The site goes live at `https://<your-user>.github.io/ruyned/`.

**Renaming the repo?** Update `base` in `vite.config.ts` (and `scope` /
`start_url` in the PWA manifest there) to `"/<new-repo-name>/"`.

Hash routing (`#/music`, `#/band`, …) is intentional: it keeps deep links and
page refreshes working on static Pages hosting without a custom 404 fallback.

## Why hash routing?

GitHub Pages serves static files only. With a history-API router, refreshing
`/ruyned/music` would 404. Routing entirely within `index.html` via the URL
hash avoids that with zero server config.
