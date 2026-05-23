import { releases } from '../data'
import { sectionHead, linkBtn, divider } from '../lib/ui'
import type { RouteDef } from '../lib/router'
import type { Release } from '../data'

const releaseBlock = (r: Release, i: number): string => `
  <article class="release ${i % 2 === 1 ? 'release--flip' : ''} ${r.bw ? 'is-bw' : ''}" id="${r.id}">
    <div class="release__art">
      <span class="release__badge ${r.preorder ? 'release__badge--pre' : ''}">${
        r.preorder ? 'Pre-Order' : r.type
      }</span>
      <img src="${r.cover}" alt="${r.title} cover art" width="700" height="700" loading="lazy" />
    </div>
    <div class="release__info">
      <p class="release__date">${r.preorder ? 'Out ' : ''}${r.date}${
        r.label ? ' · ' + r.label : ''
      }</p>
      <h3 class="release__title">${r.title}</h3>
      <p class="release__blurb">${r.blurb}</p>
      <ol class="tracklist">
        ${r.tracks
          .map(
            (t) => `<li>
              <span class="t-n">${String(t.n).padStart(2, '0')}</span>
              <span class="t-title">${t.title}</span>
              ${
                t.length
                  ? `<span class="t-dots" aria-hidden="true"></span><span class="t-len">${t.length}</span>`
                  : ''
              }
            </li>`,
          )
          .join('')}
      </ol>
      <div class="release__cta">
        ${linkBtn(r.preorder ? 'Pre-order' : 'Listen / Buy', r.bandcamp, 'solid')}
      </div>
    </div>
  </article>`

const render = (): string => `
  <div class="page page--music">
    ${sectionHead('Discography · 2023 — 2025', 'The Catalogue Of Torment')}
    <div class="releases">
      ${releases.map((r, i) => releaseBlock(r, i)).join(divider())}
    </div>
  </div>
`

export const music: RouteDef = { title: 'Music', render }
