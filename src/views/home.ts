import { band, latestRelease, releases } from '../data'
import { marquee, divider, sectionHead, linkBtn } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const tickerItems = [
  'BLACK',
  'THRASH',
  'SPEED',
  band.city.toUpperCase(),
  'ROMANIA',
  band.foundedRoman,
  'NO MERCY',
]

const render = (): string => `
  <section class="hero">
    <div class="hero__bg" style="background-image:url('${band.hero}')" aria-hidden="true"></div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner">
      <p class="hero__kicker">${band.genre} — ${band.city}, ${band.country}</p>
      <img class="hero__logo" src="${band.logoMark}" alt="RUYNED"
           width="863" height="327" fetchpriority="high" />
      <p class="hero__tagline">${band.tagline} — est. ${band.foundedRoman}</p>
      <div class="hero__cta">
        ${linkBtn('Listen', latestRelease.bandcamp, 'solid')}
        <a class="btn btn--ghost" href="#/music">Discography</a>
        <a class="btn btn--ghost" href="#/live">Live Raids</a>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><span>scroll</span></div>
  </section>

  ${marquee(tickerItems)}

  <section class="feature" id="latest">
    <div class="feature__art">
      <a href="${latestRelease.bandcamp}" target="_blank" rel="noopener noreferrer"
         aria-label="Listen to ${latestRelease.title} on Bandcamp">
        <img src="${latestRelease.cover}" alt="${latestRelease.title} cover art"
             width="700" height="700" loading="lazy" />
      </a>
    </div>
    <div class="feature__body">
      ${sectionHead('Latest Assault · ' + latestRelease.year, latestRelease.title)}
      <p class="feature__meta">${latestRelease.type} · ${latestRelease.date}</p>
      <p class="feature__blurb">${latestRelease.blurb}</p>
      <ol class="tracklist tracklist--compact">
        ${latestRelease.tracks
          .map(
            (t) => `<li><span class="t-n">${String(t.n).padStart(2, '0')}</span>
              <span class="t-title">${t.title}</span>
              <span class="t-len">${t.length}</span></li>`,
          )
          .join('')}
      </ol>
      <div class="feature__cta">
        ${linkBtn('Get it on Bandcamp', latestRelease.bandcamp, 'solid')}
        <a class="btn btn--ghost" href="#/music">All releases</a>
      </div>
    </div>
  </section>

  ${divider()}

  <section class="manifesto">
    <blockquote>
      “We just write music that we like — this is how we came up with our sound.”
    </blockquote>
    <p class="manifesto__body">${band.bio[0]}</p>
    <a class="btn btn--ghost" href="#/band">Read the full story</a>
  </section>

  <section class="teaser">
    ${sectionHead('The Catalogue', 'Releases')}
    <div class="teaser__grid">
      ${releases
        .map(
          (r) => `
        <a class="teaser__card ${r.bw ? 'is-bw' : ''}" href="#/music" aria-label="${r.title}">
          <img src="${r.cover}" alt="${r.title} cover" width="700" height="700" loading="lazy" />
          <div class="teaser__cap">
            <span class="teaser__type">${r.type}</span>
            <span class="teaser__title">${r.title}</span>
            <span class="teaser__year">${r.year}</span>
          </div>
        </a>`,
        )
        .join('')}
    </div>
  </section>
`

export const home: RouteDef = { title: 'Home', render }
