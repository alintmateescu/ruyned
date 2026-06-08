import { asset, band, members } from '../data'
import { sectionHead, divider } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const render = (): string => `
  <div class="page page--band">
    ${sectionHead('The Cult · est. ' + band.foundedRoman, 'Who We Are')}

    <div class="band-grid">
      <div class="band-bio">
        ${band.bio.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <figure class="band-figure">
        <img src="${asset('band-angel.jpg')}" alt="RUYNED" loading="lazy" />
      </figure>
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
            ${m.note ? `<p class="member__note">${m.note}</p>` : ''}
          </article>`,
          )
          .join('')}
      </div>
    </section>
  </div>
`

export const bandView: RouteDef = { title: 'Band', render }
