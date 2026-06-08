import { upcomingShows, pastShows, links } from '../data'
import { sectionHead, linkBtn } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const social = links.filter((l) => l.kind === 'social')

const showItem = (s: { date: string; billing: string; venue: string; city: string }): string => `
  <li class="show">
    <span class="show__date">${s.date}</span>
    <span class="show__main">
      <span class="show__billing">${s.billing}</span>
      <span class="show__venue">${s.venue}</span>
    </span>
    <span class="show__city">${s.city}</span>
  </li>`

const render = (): string => `
  <div class="page page--live">
    ${sectionHead('On Stage', 'Shows')}

    <div class="shows">
      <section class="shows__group">
        <h3 class="shows__heading">Upcoming Shows</h3>
        <ul class="show-list">
          ${upcomingShows.map(showItem).join('')}
        </ul>
      </section>

      <section class="shows__group">
        <h3 class="shows__heading">Past Shows</h3>
        <p class="shows__lead">In the works — the full archive of past raids is being
          compiled. A few documented appearances below for now.</p>
        <ul class="show-list">
          ${pastShows.map(showItem).join('')}
        </ul>
      </section>

      <div class="shows__cta">
        ${social.map((s) => linkBtn(s.label, s.url, 'ghost')).join('')}
      </div>
    </div>
  </div>
`

export const live: RouteDef = { title: 'Shows', render }
