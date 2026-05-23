import { shows, links } from '../data'
import { sectionHead, linkBtn } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const social = links.filter((l) => l.kind === 'social')

const render = (): string => `
  <div class="page page--live">
    ${sectionHead('On Stage', 'Live Raids')}

    <div class="shows">
      <p class="shows__lead">Documented appearances. No upcoming dates are announced here —
        follow the band on socials for the next strike.</p>

      <ul class="show-list">
        ${shows
          .map(
            (s) => `
          <li class="show">
            <span class="show__date">${s.date}</span>
            <span class="show__main">
              <span class="show__billing">${s.billing}</span>
              <span class="show__venue">${s.venue}</span>
            </span>
            <span class="show__city">${s.city}</span>
          </li>`,
          )
          .join('')}
      </ul>

      <div class="shows__upcoming">
        <h3>Next Raid</h3>
        <p>To Be Summoned.</p>
        <div class="shows__cta">
          ${social.map((s) => linkBtn(s.label, s.url, 'ghost')).join('')}
        </div>
      </div>
    </div>
  </div>
`

export const live: RouteDef = { title: 'Live', render }
