import { links, band } from '../data'
import { sectionHead } from '../lib/ui'
import type { RouteDef } from '../lib/router'
import type { Link } from '../data'

const group = (title: string, kind: Link['kind']): string => {
  const items = links.filter((l) => l.kind === kind)
  if (!items.length) return ''
  return `
    <div class="link-group">
      <h3 class="link-group__title">${title}</h3>
      <ul class="link-list">
        ${items
          .map(
            (l) => `<li>
              <a class="link-row" href="${l.url}" target="_blank" rel="noopener noreferrer">
                <span class="link-row__label">${l.label}</span>
                <span class="link-row__arrow" aria-hidden="true">↗</span>
              </a>
            </li>`,
          )
          .join('')}
      </ul>
    </div>`
}

const render = (): string => `
  <div class="page page--contact">
    ${sectionHead('Spread The Plague', 'Listen · Follow · Book')}

    <div class="links-grid">
      ${group('Listen', 'listen')}
      ${group('Follow', 'social')}
      ${group('Archive', 'archive')}
    </div>

    <div class="booking">
      <h3>Booking & Contact</h3>
      <p>For shows, distro and unholy alliances, reach out through any of the channels above —
        messages via Instagram or Facebook reach the band directly.</p>
      <p class="booking__sig">${band.name} · ${band.city}, ${band.country} · ${band.label}</p>
    </div>
  </div>
`

export const contact: RouteDef = { title: 'Contact', render }
