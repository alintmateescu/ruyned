/**
 * Tiny hash-based client-side router.
 *
 * Hash routing is a deliberate choice: GitHub Pages serves static files only,
 * so deep links like /ruyned/music would 404 on refresh with a history router.
 * With `#/music` the browser always loads index.html and we route in-app.
 */

export interface RouteDef {
  /** Title suffix shown in the browser tab. */
  title: string
  /** Returns the view's inner HTML. */
  render: () => string
  /** Optional hook run after the HTML is injected (wire up listeners, etc.). */
  onMount?: (outlet: HTMLElement) => void
}

export type Routes = Record<string, RouteDef>

interface RouterOptions {
  routes: Routes
  outlet: HTMLElement
  fallback: string
  titleBase: string
  onNavigate?: (path: string) => void
}

const normalize = (raw: string): string => {
  const h = raw.replace(/^#/, '')
  if (h === '' || h === '/') return '/'
  return ('/' + h.replace(/^\/+/, '')).replace(/\/+$/, '') || '/'
}

export function currentPath(): string {
  return normalize(window.location.hash)
}

export function navigate(path: string): void {
  const target = path.startsWith('#') ? path : `#${path}`
  if (window.location.hash === target) {
    // same route — force a re-render
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = target
  }
}

export function createRouter(opts: RouterOptions): () => void {
  const { routes, outlet, fallback, titleBase, onNavigate } = opts

  const resolve = (path: string): RouteDef => routes[path] ?? routes[fallback]

  const render = (): void => {
    const path = currentPath()
    const route = resolve(path)
    const activePath = routes[path] ? path : fallback

    document.title = `${route.title} · ${titleBase}`

    // Replace content and re-trigger the entrance animation.
    outlet.innerHTML = route.render()
    outlet.classList.remove('view-enter')
    void outlet.offsetWidth // reflow so the animation restarts
    outlet.classList.add('view-enter')

    route.onMount?.(outlet)

    // Jump to top on navigation (but leave in-page anchor jumps alone).
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })

    onNavigate?.(activePath)
  }

  window.addEventListener('hashchange', render)
  // First paint.
  render()

  return render
}
