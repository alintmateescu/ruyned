import { band } from '../data'

interface NavItem {
  label: string
  path: string
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Music', path: '/music' },
  { label: 'Band', path: '/band' },
  { label: 'Shows', path: '/live' },
  { label: 'Contact', path: '/contact' },
]

export const navHTML = (): string => `
  <header class="nav" id="nav">
    <a class="nav__brand" href="#/" aria-label="RUYNED — home">
      <img src="${band.logoMark}" alt="RUYNED" width="3000" height="1075" />
    </a>

    <button class="nav__toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <nav class="nav__menu" aria-label="Primary">
      ${navItems
        .map(
          (i) =>
            `<a class="nav__link" href="#${i.path}" data-path="${i.path}">${i.label}</a>`,
        )
        .join('')}
    </nav>
  </header>`

/** Highlight the active nav link and close the mobile menu. */
export const setActiveNav = (path: string): void => {
  document.querySelectorAll<HTMLAnchorElement>('.nav__link').forEach((a) => {
    a.classList.toggle('is-active', a.dataset.path === path)
  })
  const header = document.getElementById('nav')
  header?.classList.remove('is-open')
  header
    ?.querySelector('.nav__toggle')
    ?.setAttribute('aria-expanded', 'false')
}

/** Wire up the mobile menu toggle + shrink-on-scroll behaviour. */
export const initNav = (): void => {
  const header = document.getElementById('nav')
  if (!header) return

  const toggle = header.querySelector<HTMLButtonElement>('.nav__toggle')
  toggle?.addEventListener('click', () => {
    const open = header.classList.toggle('is-open')
    toggle.setAttribute('aria-expanded', String(open))
  })

  const onScroll = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 24)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
