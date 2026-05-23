import { band, members } from '../data'
import { sectionHead, divider } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const factRow = (k: string, v: string): string =>
  `<div class="fact"><dt>${k}</dt><dd>${v}</dd></div>`

const render = (): string => `
  <div class="page page--band">
    ${sectionHead('The Cult · est. ' + band.foundedRoman, 'Who We Are')}

    <div class="band-grid">
      <div class="band-bio">
        ${band.bio.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <aside class="band-facts">
        <dl>
          ${factRow('Origin', `${band.city}, ${band.country}`)}
          ${factRow('Formed', band.formed)}
          ${factRow('Genre', band.genre)}
          ${factRow('Themes', band.themes)}
          ${factRow('Label', band.label)}
          ${factRow('Status', band.status)}
        </dl>
      </aside>
    </div>

    ${divider()}

    <section class="lineup">
      <header class="section-head section-head--center">
        <span class="eyebrow">The Trinity</span>
        <h2 class="section-title">Lineup</h2>
      </header>
      <div class="lineup__grid">
        ${members
          .map(
            (m) => `
          <article class="member ${m.former ? 'member--former' : ''}">
            <h3 class="member__name">${m.name}</h3>
            <p class="member__role">${m.role}</p>
            ${
              m.influences.length
                ? `<ul class="member__inf">${m.influences
                    .map((i) => `<li>${i}</li>`)
                    .join('')}</ul>`
                : ''
            }
            ${m.note ? `<p class="member__note">${m.note}</p>` : ''}
          </article>`,
          )
          .join('')}
      </div>
      <p class="lineup__foot">Influences span Bütcher, Hellripper, Midnight, Kreator, Bathory, Sarcófago and the wider speed/thrash underground.</p>
    </section>
  </div>
`

export const bandView: RouteDef = { title: 'Band', render }
