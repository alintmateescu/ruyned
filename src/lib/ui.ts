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

/** The speed-metal wheel glyph, drawn inline so it inherits `currentColor`. */
const speedWheel = `<svg class="tick-wheel" viewBox="0 0 238.12 238.13" role="presentation" aria-hidden="true"><path fill="currentColor" d="M -0.00499987,119.06508 H 107.20104 l -59.543349,40.1627 c -0.585956,-0.97397 -1.151602,-1.96002 -1.696573,-2.9575 -1.240472,-2.43725 -2.358276,-4.93501 -3.349219,-7.48393 -0.990973,-2.5488 -1.853861,-5.14556 -2.585425,-7.78057 -0.339865,-1.35197 -0.645206,-2.71239 -0.915727,-4.07992 L 3.1643824,146.35492 C 10.691349,178.3208 31.087121,205.75814 59.5275,222.1782 l 53.60302,-92.84326 5.01427,71.70664 c -2.42872,-0.0135 -4.85565,-0.13491 -7.27361,-0.36381 -2.72095,-0.27303 -5.42655,-0.68196 -8.10665,-1.22527 -2.68011,-0.54326 -5.331382,-1.22022 -7.943869,-2.02833 -0.09687,-0.0351 -0.193685,-0.0704 -0.290426,-0.10594 l -9.784106,35.75978 c 31.446761,9.46437 65.406001,5.5202 93.846371,-10.89981 l -53.6025,-92.84222 64.55865,31.48761 c -0.88117,1.5482 -1.81255,3.0673 -2.79265,4.55485 -1.54402,2.25697 -3.19994,4.43531 -4.96156,6.52686 -1.7618,2.09167 -3.6271,4.09392 -5.58892,5.99925 -0.55597,0.50206 -1.11879,0.99649 -1.68831,1.48314 l 26.12402,26.40099 c 23.91979,-22.50147 37.48377,-53.8835 37.48377,-86.7236 h -37.04244 -70.16154 l 59.54232,-40.161675 c 0.5856,0.973638 1.1509,1.959342 1.69554,2.956469 1.24048,2.437248 2.35828,4.935013 3.34922,7.483931 0.99098,2.548799 1.85386,5.145563 2.58543,7.780562 0.33986,1.351977 0.6452,2.712397 0.91572,4.079943 l 35.94637,-9.429078 C 227.42865,59.809357 207.03288,32.37201 178.5925,15.951959 l -53.6025,92.842211 5.3e-4,-0.002 -5.01376,-71.703543 c 2.42821,0.01357 4.85462,0.134956 7.27206,0.36381 2.72096,0.273032 5.42655,0.681967 8.10666,1.225273 2.68011,0.543267 5.33138,1.220226 7.94386,2.02834 0.0969,0.03513 0.19369,0.07044 0.29043,0.105939 L 153.37387,5.0521443 C 121.92712,-4.4122285 87.96788,-0.46804946 59.5275,15.951959 L 113.13001,108.79417 48.571351,77.306569 c 0.881173,-1.548206 1.812553,-3.067297 2.792651,-4.554852 1.544019,-2.256969 3.19994,-4.435312 4.96156,-6.526867 1.761797,-2.091669 3.627101,-4.093916 5.588922,-5.999239 0.55597,-0.502068 1.11879,-0.996498 1.688304,-1.483144 L 37.478771,32.341473 C 13.558979,54.84295 -0.00499987,86.224979 -0.00499987,119.06508 Z"/><circle fill="currentColor" transform="rotate(30)" cx="162.64148" cy="43.583313" r="33.073612"/></svg>`

/** Infinite-scroll marquee ticker. `items` is repeated to fill the track. */
export const marquee = (items: string[]): string => {
  const sep = `<span class="tick-sep">${speedWheel}</span>`
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
