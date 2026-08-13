import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Project is published as a GitHub Pages *project* site at
// https://<user>.github.io/ruyned/ — hence the base path below.
// If you fork/rename the repo, change `base` to "/<repo-name>/".
const BASE = '/'

export default defineConfig({
  base: BASE,
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      // We register the worker ourselves in src/lib/sw.ts so we control the
      // update checks and the one-shot reload; don't inject a second script.
      injectRegister: null,
      includeAssets: [
        'favicon-64.png',
        'icons/apple-touch-icon.png',
        'covers/*.jpg',
        'logo.png',
        'hero.jpg',
      ],
      manifest: {
        name: 'RUYNED — Romanian Black/Thrash/Speed Metal',
        short_name: 'RUYNED',
        description:
          'Official site of RUYNED. Black/Thrash/Speed Metal assault from Timișoara, Romania.',
        lang: 'en',
        theme_color: '#0a0908',
        background_color: '#050403',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: BASE,
        start_url: BASE,
        categories: ['music', 'entertainment'],
        icons: [
          { src: 'icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // HTML is deliberately absent from the precache: index.html is the one
        // file that must never be served from a stale cache, because it points
        // at the hashed JS/CSS of a particular build. It is handled
        // network-first by the navigation route below instead.
        globPatterns: ['**/*.{js,css,png,jpg,jpeg,svg,webp,woff2}'],
        // vite-plugin-pwa otherwise defaults this to 'index.html', which would
        // register a precache-backed navigation route ahead of ours and hand
        // every visitor the cached shell again (and throw, now that index.html
        // is not precached at all).
        navigateFallback: null,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            // The app shell. Online, a visitor always gets the current build;
            // if the network is slow or gone, the last good copy is served.
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ruyned-html',
              networkTimeoutSeconds: 4,
              // Revalidate with the server rather than trusting the browser's
              // HTTP cache — GitHub Pages sends max-age=600 on HTML.
              fetchOptions: { cache: 'no-cache' },
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            // Google Fonts stylesheet — cheap to revalidate in the background.
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            // The font files themselves are immutable and hashed by Google.
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 24, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
})
