import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Project is published as a GitHub Pages *project* site at
// https://<user>.github.io/ruyned/ — hence the base path below.
// If you fork/rename the repo, change `base` to "/<repo-name>/".
const BASE = '/ruyned/'

export default defineConfig({
  base: BASE,
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
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
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      devOptions: { enabled: false },
    }),
  ],
})
