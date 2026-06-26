/**
 * Single source of truth for everything RUYNED.
 * Facts compiled from the band's Bandcamp, Encyclopaedia Metallum and press
 * (Filthy Dogs of Metal interview, Din Întunerec). Asset paths are resolved
 * against Vite's BASE_URL so they work both in dev and on GitHub Pages.
 */

export const asset = (p: string): string =>
  `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`

export const band = {
  name: 'RUYNED',
  genre: 'Black / Thrash / Speed Metal',
  country: 'Romania',
  formed: 'March 19, 2023',
  foundedRoman: 'MMXXIII',
  label: 'Osmose Productions',
  status: 'Active',
  themes: 'Death · Mental disorders · Morbidity',
  logo: asset('logo.png'), // opaque (favicon / share image)
  logoMark: asset('logo-mark.png'), // transparent, trimmed wordmark
  hero: asset('hero.jpg'),
  tagline: 'Romanian Speed Metal Assault',
  bio: [
    `Forged in Romania in the spring of 2023, RUYNED is a three-headed engine of black, thrash and speed metal — old-school venom sharpened on a modern blade. The members first crossed paths in December 2022 and, by May 2023, had begun carving their name into the Romanian underground.`,
    `Their sound is unforced and instinctive: "we just write music that we like, and this is how we came up with our sound." Lyrically the band circles death, morbid obsession and the unravelling of the mind — blunt, ugly and unrepentant.`,
    `The self-released demo Morbid Pleasures landed in September 2023. The debut full-length Eternal Torment followed in July 2024 to warm reception from crowds and press alike, with the Sex'n Speed assault arriving in May 2025. Their Osmose Productions debut, Profanum Sacrificium — a concept record on the European witch hunts — descends June 26, 2026.`,
  ],
}

export interface Member {
  name: string
  role: string
  influences: string[]
  former?: boolean
  note?: string
}

export const members: Member[] = [
  {
    name: 'Bogdan Mateescu',
    role: 'Guitars · Vocals',
    influences: ['Bütcher', 'Hellripper', 'Cruel Force', 'Sabbat', 'Midnight', 'Kreator', 'Bathory'],
  },
  {
    name: 'Olescher Tiberiu',
    role: 'Bass',
    influences: ['Dying Fetus', 'Mortician', 'Iron Maiden', 'Arch Enemy', 'Bütcher', 'Hellripper'],
  },
  {
    name: 'Mihai Marinescu',
    role: 'Drums',
    influences: ['Sarcófago', 'Discharge', 'Slayer', 'Dream Theater', 'Bütcher', 'Suicidal Tendencies', 'G.I.S.M.'],
  },
]

export interface Track {
  n: number
  title: string
  length?: string // omitted for unreleased / pre-order titles without timings
}

export interface Release {
  id: string
  title: string
  type: 'Demo' | 'Album' | 'Single'
  year: string
  date: string
  cover: string
  blurb: string
  tracks: Track[]
  bandcamp: string
  bw?: boolean // mostly black & white artwork — used to tint the card frame
  preorder?: boolean // not out yet — show as pre-order
  label?: string // releasing label, when notable
  listenOnly?: boolean // show a single "Listen" CTA instead of "Listen / Buy"
}

export const releases: Release[] = [
  {
    id: 'profanum-sacrificium',
    title: 'Profanum Sacrificium',
    type: 'Album',
    year: '2026',
    date: 'June 26, 2026',
    cover: asset('covers/profanum-sacrificium.jpg'),
    blurb:
      'A blasphemous speed metal assault laced with black, thrash and heavy metal — the first half raw violence and decadence, the second a conceptual descent into the European witch hunts of the 15th–17th centuries. The Osmose Productions debut.',
    bandcamp: 'https://www.osmoseproductions.com/liste/index.cfm?what=all&lng=2&tete=ruyned',
    preorder: false,
    label: 'Osmose Productions',
    tracks: [
      { n: 1, title: 'Intro' },
      { n: 2, title: 'Speedchain' },
      { n: 3, title: "Sex'n Speed" },
      { n: 4, title: 'Sex Commander 666' },
      { n: 5, title: 'Orgasm Through Death' },
      { n: 6, title: 'Daemonis Ritualis' },
      { n: 7, title: 'Profanum Sacrificium' },
      { n: 8, title: 'Malleus Maleficarum' },
      { n: 9, title: 'Witches Gallöw' },
      { n: 10, title: 'Outro' },
    ],
  },
  {
    id: 'sexn-speed',
    title: "Sex'n Speed",
    type: 'Demo',
    year: '2025',
    date: 'May 15, 2025',
    cover: asset('covers/sexn-speed.jpg'),
    blurb: 'Blackthrashing speed from Romania — three rounds, no mercy.',
    bandcamp: 'https://ruyned.bandcamp.com/album/sexn-speed',
    bw: true,
    tracks: [
      { n: 1, title: 'Speedchain', length: '3:20' },
      { n: 2, title: "Sex'n Speed", length: '3:05' },
      { n: 3, title: 'Profanum Sacrificium', length: '2:54' },
    ],
  },
  {
    id: 'eternal-torment',
    title: 'Eternal Torment',
    type: 'Album',
    year: '2024',
    date: 'July 12, 2024',
    cover: asset('covers/eternal-torment.jpg'),
    blurb: 'The debut full-length. Ten tracks of Romanian speed metal assault.',
    bandcamp: 'https://ruyned.bandcamp.com/album/eternal-torment',
    tracks: [
      { n: 1, title: 'Onwards To Execution', length: '1:36' },
      { n: 2, title: 'Impaled', length: '3:14' },
      { n: 3, title: 'Ruyned', length: '3:09' },
      { n: 4, title: 'Fleshripper', length: '2:29' },
      { n: 5, title: 'Hellbeast', length: '2:44' },
      { n: 6, title: 'What Lies Beneath', length: '3:25' },
      { n: 7, title: 'Lobotomized', length: '3:32' },
      { n: 8, title: '9th Gate', length: '2:38' },
      { n: 9, title: 'Morbid Pleasures', length: '2:18' },
      { n: 10, title: 'Eternal Torment', length: '3:20' },
    ],
  },
  {
    id: 'morbid-pleasures',
    title: 'Morbid Pleasures',
    type: 'Demo',
    year: '2023',
    date: 'September 22, 2023',
    cover: asset('covers/morbid-pleasures.jpg'),
    blurb: 'The first self-released demo.',
    bandcamp: 'https://ruyned.bandcamp.com/album/morbid-pleasures-demo',
    listenOnly: true,
    tracks: [
      { n: 1, title: 'Intro', length: '0:50' },
      { n: 2, title: 'Impaled', length: '3:02' },
      { n: 3, title: 'Ruyned', length: '3:36' },
      { n: 4, title: 'Morbid Pleasures', length: '2:39' },
    ],
  },
]

export interface Show {
  date: string
  billing: string
  venue: string
  city: string
}

/** Announced upcoming shows. */
export const upcomingShows: Show[] = [
  {
    date: 'Aug 22, 2026',
    billing: 'Live',
    venue: 'Phoenix Club',
    city: 'Constanța, RO',
  },
  {
    date: 'Aug 28, 2026',
    billing: 'Open Air Festival',
    venue: 'Helhammer Open Air',
    city: 'Belgrade, RS',
  },
]

/** Documented past appearances. Full archive is still being compiled. */
export const pastShows: Show[] = [
  {
    date: 'Jan 2024',
    billing: 'Support — Impaled Nazarene',
    venue: 'Quantic',
    city: 'Bucharest, RO',
  },
  {
    date: 'Sep 22, 2023',
    billing: "Demo release — 'Morbid Pleasures'",
    venue: 'Metal Bunker Festival',
    city: 'Craiova, RO',
  },
]

export interface Link {
  label: string
  url: string
  kind: 'listen' | 'social' | 'archive'
}

export const links: Link[] = [
  { label: 'Bandcamp', url: 'https://ruyned.bandcamp.com/', kind: 'listen' },
  { label: 'Spotify', url: 'https://open.spotify.com/artist/05h5BfOz6eeltzw1Ewl8U5', kind: 'listen' },
  { label: 'YouTube', url: 'https://www.youtube.com/channel/UCTiwjOe1MlO1esO0SKQ8cxQ', kind: 'listen' },
  { label: 'TIDAL', url: 'https://tidal.com/browse/artist/44245734', kind: 'listen' },
  { label: 'Instagram', url: 'https://www.instagram.com/ruyned.official/', kind: 'social' },
  { label: 'Facebook', url: 'https://www.facebook.com/p/Ruyned-100091794738465/', kind: 'social' },
  { label: 'Metal Archives', url: 'https://www.metal-archives.com/bands/Ruyned/3540531372', kind: 'archive' },
]

export const latestRelease = releases[0]
