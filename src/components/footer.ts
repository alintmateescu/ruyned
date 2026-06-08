import { band, links } from '../data'

const year = new Date().getFullYear()

export const footerHTML = (): string => `
  <footer class="footer">
    <div class="footer__top">
      <span class="footer__mark">${band.name}</span>
      <span class="footer__tag">${band.tagline}</span>
    </div>

    <nav class="footer__links" aria-label="External links">
      ${links
        .map(
          (l) =>
            `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`,
        )
        .join('<span class="footer__dot">·</span>')}
    </nav>

    <p class="footer__legal">
      ${band.country} · ${band.label} · MMXXIII—${year}
      <br />
      © ${year} ${band.name}. All artwork © its respective creators.
    </p>
  </footer>`
