import { band, latestRelease, releases } from '../data'
import { marquee, divider, sectionHead, linkBtn } from '../lib/ui'
import type { RouteDef } from '../lib/router'

const tickerItems = [
  'BLACK',
  'THRASH',
  'SPEED',
  'ROMANIA',
  band.foundedRoman,
  'NO MERCY',
]

const render = (): string => `
  <section class="hero">
    <div class="hero__bg" style="background-image:url('${band.hero}')" aria-hidden="true"></div>
    <div class="hero__veil" aria-hidden="true"></div>

    <div class="hero__inner">
      <img class="hero__logo" src="${band.logoMark}" alt="RUYNED"
           width="3000" height="1075" fetchpriority="high" />
      <p class="hero__tagline">${band.tagline} — est. ${band.foundedRoman}</p>
      <div class="hero__cta">
        ${linkBtn('Listen', 'https://open.spotify.com/artist/05h5BfOz6eeltzw1Ewl8U5', 'solid')}
        <a class="btn btn--ghost" href="#/music">Discography</a>
        <a class="btn btn--ghost" href="#/live">Live Raids</a>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><span>scroll</span></div>
  </section>

  ${marquee(tickerItems)}

  <section class="feature" id="latest">
    <div class="feature__art">
      ${latestRelease.preorder ? '<span class="feature__flag">Pre-Order</span>' : ''}
      <a href="${latestRelease.bandcamp}" target="_blank" rel="noopener noreferrer"
         aria-label="${latestRelease.preorder ? 'Pre-order' : 'Listen to'} ${latestRelease.title} on Bandcamp">
        <img src="${latestRelease.cover}" alt="${latestRelease.title} cover art"
             width="700" height="700" loading="lazy" />
      </a>
    </div>
    <div class="feature__body">
      ${sectionHead(
        (latestRelease.preorder ? 'Out ' + latestRelease.date : 'Latest Assault · ' + latestRelease.year),
        latestRelease.title,
      )}
      <p class="feature__meta">${latestRelease.type} · ${latestRelease.date}${
        latestRelease.label ? ' · ' + latestRelease.label : ''
      }</p>
      <p class="feature__blurb">${latestRelease.blurb}</p>
      <ol class="tracklist tracklist--compact">
        ${latestRelease.tracks
          .map(
            (t) => `<li><span class="t-n">${String(t.n).padStart(2, '0')}</span>
              <span class="t-title">${t.title}</span>
              ${t.length ? `<span class="t-len">${t.length}</span>` : ''}</li>`,
          )
          .join('')}
      </ol>
      <div class="feature__cta">
        ${linkBtn(
          'Order at Bandcamp',
          latestRelease.bandcamp,
          'solid',
        )}
        ${linkBtn(
  'Order at Headbangershop.ro',
  'https://www.headbangershop.ro/?s=Ruyned+Profanum+Sacrificium&post_type=product&dgwt_wcas=1',
  'solid',
)}
${linkBtn(
  'Order at Osmose',
  'https://www.osmoseproductions.com/liste/index.cfm?what=all&lng=2&tete=ruyned',
  'solid',
)}
        <a class="btn btn--ghost" href="#/music">All releases</a>
      </div>
    </div>
  </section>

  <section class="press">
  ${sectionHead('As heard by', 'Press')}
  <div class="press__grid">
    <blockquote class="press__item">
      <p>&ldquo;Plays thrash the way the old school intended&mdash;at furious speeds with the subtlety of an uppercut to the jawbone.&rdquo;</p>
      <a href="https://www.angrymetalguy.com/ruyned-profanum-sacrificium-review/" target="_blank" rel="noopener noreferrer" class="press__source">Angry Metal Guy</a>
    </blockquote>
    <blockquote class="press__item">
      <p>&ldquo;The two halves of &lsquo;Profanum Sacrificium&rsquo; compliment one another in linear progression wherein the scale and cruelty of the killing portrayed lines up with the riff count.&rdquo;</p>
      <a href="https://mystificationzine.com/2026/06/19/ruyned-profanum-sacrificium-2026-review/" target="_blank" rel="noopener noreferrer" class="press__source">Mystification Zine</a>
    </blockquote>
    <blockquote class="press__item">
  <p>&ldquo;... trupa din Timi&#537;oara face parte din categoria restr&acirc;ns&#259; a forma&#539;iilor rom&acirc;ne&#537;ti de thrash metal care pot sta f&#259;r&#259; complexe al&#259;turi de multe dintre numele actuale ale scenei interna&#539;ionale.&rdquo;</p>
  <a href="https://metalfan.ro/2026/07/21/ruyned-profanum-sacrificium/" target="_blank" rel="noopener noreferrer" class="press__source">MetalFan</a>
</blockquote>
    <a href="https://www.instagram.com/reel/DZqI6mVJ5BQ/" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">Deaf Sparrow &mdash; Review</a>
  </div>
  ${sectionHead('Recognition', 'Features')}
  <ul class="press__features">
    <li><a href="https://www.facebook.com/thrashmania666/posts/pfbid0264hsx66FThj2yCWQjanqqkBd3qUriVRXWT9FXcLp42VBW8dkkDN5ifTnzS2LmUQfl" target="_blank" rel="noopener noreferrer">>Thrashmania&#92;m/ &mdash; The Top 100 Thrash Metal Albums of the 1st Half of 2026</a></li>
    <li><a href="https://antichrist-magazine.bandcamp.com/album/antichrist-magazine-vol-vi" target="_blank" rel="noopener noreferrer">Antichrist Magazine &mdash; Compilation Vol. VI</a></li>
  </ul>
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
          ${r.preorder ? '<span class="teaser__flag">Pre-Order</span>' : ''}
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
