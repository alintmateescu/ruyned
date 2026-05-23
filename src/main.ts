import './style.css'
import { createRouter, type Routes } from './lib/router'
import { navHTML, initNav, setActiveNav } from './components/nav'
import { footerHTML } from './components/footer'
import { home } from './views/home'
import { music } from './views/music'
import { bandView } from './views/band'
import { live } from './views/live'
import { contact } from './views/contact'
import { band } from './data'

const routes: Routes = {
  '/': home,
  '/music': music,
  '/band': bandView,
  '/live': live,
  '/contact': contact,
}

const app = document.getElementById('app')
if (!app) throw new Error('#app mount point missing')

// Build the persistent shell once; the router only swaps #view.
app.innerHTML = `
  ${navHTML()}
  <main id="view" class="view" tabindex="-1"></main>
  ${footerHTML()}
`

const outlet = document.getElementById('view') as HTMLElement

initNav()

createRouter({
  routes,
  outlet,
  fallback: '/',
  titleBase: `${band.name} · ${band.genre}`,
  onNavigate: setActiveNav,
})
