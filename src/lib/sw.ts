/**
 * Service-worker registration and update policy.
 *
 * The service worker is what makes the site installable and usable offline, but
 * left to its defaults it also serves returning visitors the build they saw last
 * time. Two things stop that:
 *
 *  1. `vite.config.ts` handles navigations network-first, so an online visitor
 *     gets the freshly deployed HTML — and with it the new hashed JS/CSS.
 *  2. This module re-checks for a newer worker when the page is reopened or
 *     brought back to the foreground, and reloads once when one takes over.
 *     That covers the tab that has been sitting in the background for days.
 *
 * The goal is that nobody ever has to press Ctrl+Shift+R.
 */

const SW_URL = `${import.meta.env.BASE_URL}sw.js`

/** How often a tab left open keeps looking for a new deploy. */
const CHECK_INTERVAL_MS = 60 * 60 * 1000
/** Floor between checks, so tab-switching doesn't hammer the server. */
const CHECK_THROTTLE_MS = 60 * 1000

export function initServiceWorker(): void {
  if (!('serviceWorker' in navigator)) return

  // A page that is *already* controlled is rendering whatever the old worker
  // had cached, so when a newer worker claims it the markup on screen is stale
  // and we reload. A first visit starts uncontrolled — being claimed then is
  // not an update, and reloading would flash the page for no reason.
  const wasControlled = Boolean(navigator.serviceWorker.controller)
  let reloading = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!wasControlled || reloading) return
    reloading = true
    window.location.reload()
  })

  window.addEventListener('load', () => {
    navigator.serviceWorker
      // updateViaCache: 'none' — GitHub Pages serves sw.js with max-age=600, and
      // a ten-minute-old copy must not be what decides whether an update exists.
      .register(SW_URL, { scope: import.meta.env.BASE_URL, updateViaCache: 'none' })
      .then((reg) => {
        let lastCheck = Date.now()

        const check = (): void => {
          if (Date.now() - lastCheck < CHECK_THROTTLE_MS) return
          lastCheck = Date.now()
          void reg.update().catch(() => {
            /* offline — try again on the next trigger */
          })
        }

        window.setInterval(check, CHECK_INTERVAL_MS)
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') check()
        })
        // Restored from the back/forward cache (common on phones): the DOM is
        // whatever it was when the tab was backgrounded, so check right away.
        window.addEventListener('pageshow', (e) => {
          if (e.persisted) check()
        })
      })
      .catch(() => {
        /* Registration failed (private mode, unsupported browser). The site is
           a plain static page without it, so there is nothing to recover. */
      })
  })
}
