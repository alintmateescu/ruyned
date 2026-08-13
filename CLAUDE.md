# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page **PWA** for RUYNED (a metal band), built with **Vite 6 + TypeScript (strict)**.
No UI framework — plain DOM string templates and a hand-rolled hash router. Zero runtime
dependencies. Deployed to GitHub Pages on the custom domain **ruynedband.com** (see the
root `CNAME`), so `base` is `/` — it is no longer served from a `/ruyned/` project subpath.

## Commands

```bash
npm install
npm run dev      # dev server at http://localhost:5173/
npm run build    # tsc --noEmit (type-check) THEN vite build → dist/
npm run preview  # serve the built dist/ locally
```

There is **no test runner and no linter** configured. `npm run build` is the only
correctness gate — it runs `tsc --noEmit` first, so a type error fails the build. The
TypeScript config is strict and additionally enforces `noUnusedLocals` /
`noUnusedParameters`, so dead variables/params break the build too.

## Architecture

The whole app is rendered by composing functions that return HTML strings, then assigning
them to `innerHTML`. There is no virtual DOM, no reactivity, no components-as-objects.

- **`src/data.ts`** — single source of truth for *all* content: `band`, `members`,
  `releases`, `shows`, `links`. Views import from here; they don't hold their own copy of
  facts. To change site content (add a release, update lineup, etc.), edit this file. The
  `latestRelease` export is just `releases[0]`, so **order matters** — `releases[0]` drives
  the home-page feature block. Each typed interface (`Release`, `Member`, `Track`, `Show`,
  `Link`) lives here too.

- **`asset(path)`** in `src/data.ts` resolves a public asset against Vite's
  `import.meta.env.BASE_URL`. **Always** wrap `public/` asset paths with `asset()`. It is a
  no-op today because `base` is `/`, but it is what keeps the site movable back onto a
  subpath (a `github.io/ruyned/` preview, say) without hunting down hardcoded URLs.

- **`src/main.ts`** — entry point. Builds the persistent shell (`nav` + `<main id="view">` +
  `footer`) once, then hands the `#view` outlet to the router. Only `#view` is swapped on
  navigation; nav/footer persist.

- **`src/lib/router.ts`** — ~80-line hash router. A view is a `RouteDef`:
  `{ title, render: () => string, onMount?: (outlet) => void }`. On `hashchange` it resolves
  the path, sets `document.title`, replaces `outlet.innerHTML`, replays the `view-enter`
  animation, then calls `onMount`. **Hash routing is deliberate** — GitHub Pages serves
  static files only, so a history-API route like `/music` would 404 on refresh; `#/music`
  always loads `index.html`. Don't switch to a history router.

- **`src/lib/sw.ts`** — service-worker registration and the update policy (see *Caching*
  below). Registered from `main.ts`; `vite.config.ts` sets `injectRegister: null` so the
  plugin does not also inject its own registration script.

- **`src/views/*.ts`** — one file per route (`home`, `music`, `band`, `live`, `contact`),
  each exporting a `RouteDef`. Routes are wired in `src/main.ts`. If a view needs event
  listeners after render, add an `onMount` hook (current views are pure `render` and use no
  JS-driven interactivity beyond the shell).

- **`src/lib/ui.ts`** — shared markup-fragment helpers (`sectionHead`, `divider`, `marquee`,
  `linkBtn`, `eyebrow`). Reuse these instead of re-authoring markup; they carry the design
  system's class names.

- **`src/components/nav.ts` / `footer.ts`** — shell pieces. `nav.ts` also owns the only
  stateful client behaviour: `initNav()` (mobile toggle + shrink-on-scroll) and
  `setActiveNav()` (active-link highlight), called from the router's `onNavigate`.

- **`src/style.css`** — the entire design system in one file.

### Content is interpolated as raw HTML

Views build markup by string-concatenating values straight from `data.ts` (e.g.
`${r.title}`) with no escaping. That's fine because all content is author-controlled in this
repo. **Do not** feed user input or fetched/remote data through these templates without
escaping — it would be an XSS hole.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: it runs `npm ci && npm run build`
and publishes `dist/` to GitHub Pages (the workflow self-enables Pages via
`configure-pages`). Pages **Source must be "GitHub Actions"**.

`devOptions.enabled: false` means the service worker does **not** run in `npm run dev` —
test PWA/offline behaviour against `npm run preview` on the built output.

### Caching — don't regress this

A returning visitor used to see the *previous* build until they hard-refreshed, because the
service worker precached `index.html` and served it cache-first. Three settings prevent
that, and they only work together:

1. `workbox.globPatterns` **excludes `html`**, and `navigateFallback: null` disables the
   plugin's default precache-backed navigation route (its default is `'index.html'`, which
   would both take priority over our route and throw, since `index.html` is no longer
   precached). Navigations are instead handled by a `NetworkFirst` runtime route with a
   4s timeout, so the current HTML wins when online and the cached copy still works offline.
2. `fetchOptions: { cache: 'no-cache' }` on that route forces revalidation with the server;
   GitHub Pages sends `max-age=600` on HTML, which would otherwise cap freshness.
3. `src/lib/sw.ts` registers with `updateViaCache: 'none'`, re-checks for a new worker on
   `visibilitychange` / `pageshow` / hourly, and reloads the page **once** when a new worker
   claims it — the case where a phone has kept the tab open for days.

Everything else (hashed JS/CSS, images, fonts) stays precached or cache-first; only the HTML
entry point is treated as volatile. If you add a route to `runtimeCaching`, keep the
navigation route first.

**Changing where the site is served from** means changing `BASE` in `vite.config.ts` (it
feeds `base`, plus the manifest `scope`/`start_url`) — and the root `CNAME`, if the domain
changes. Reach the base via `BASE_URL`/`asset()`; never hardcode it.
