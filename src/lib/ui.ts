/** Reusable markup fragments shared across views. */

/** Small typewriter "eyebrow" label that sits above a section title. */
export const eyebrow = (text: string): string =>
  `<span class="eyebrow">${text}</span>`

/** A barbed / blood-drip section divider. */
export const divider = (): string => `
  <div class="divider" aria-hidden="true">
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" role="presentation">
      <path d="M0 12 L1200 12" />
      <path class="barbs" d="M0 12 L30 4 L60 12 L90 20 L120 12 L150 4 L180 12 L210 20 L240 12
        L270 4 L300 12 L330 20 L360 12 L390 4 L420 12 L450 20 L480 12 L510 4 L540 12 L570 20
        L600 12 L630 4 L660 12 L690 20 L720 12 L750 4 L780 12 L810 20 L840 12 L870 4 L900 12
        L930 20 L960 12 L990 4 L1020 12 L1050 20 L1080 12 L1110 4 L1140 12 L1170 20 L1200 12" />
    </svg>
  </div>`

/** Infinite-scroll marquee ticker. `items` is repeated to fill the track. */
export const marquee = (items: string[]): string => {
  const sep = '<span class="tick-sep">✠</span>'
  const run = items.join(sep)
  const content = `${run}${sep}${run}${sep}` // doubled for seamless loop
  return `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span>${content}</span>
        <span>${content}</span>
      </div>
    </div>`
}

/** External link button. */
export const linkBtn = (
  label: string,
  url: string,
  variant: 'solid' | 'ghost' = 'ghost',
): string =>
  `<a class="btn btn--${variant}" href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`

/** Section title block (eyebrow + heading). */
export const sectionHead = (label: string, title: string): string => `
  <header class="section-head">
    ${eyebrow(label)}
    <h2 class="section-title">${title}</h2>
  </header>`
