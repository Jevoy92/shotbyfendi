// TODO: replace with Fendi's real booking email before launch.
export const bookingEmail = 'bookings@shotbyfendi.com'

export const socials = {
  instagram: {
    label: 'Instagram',
    handle: '@shot_by_fendi',
    url: 'https://www.instagram.com/shot_by_fendi',
    cta: 'DM for bookings — fastest reply',
  },
  youtube: {
    label: 'YouTube',
    handle: '@shot_by_fendi',
    url: 'https://youtube.com/@shot_by_fendi',
    cta: 'Watch the full catalog',
  },
  facebook: {
    label: 'Facebook',
    handle: 'ShotByFendi',
    url: 'https://www.facebook.com/share/14U46BcwdXT/',
    cta: 'Follow for updates',
  },
} as const

export type Video = {
  id: string
  title: string
  client?: string
  category: string
  year: string
  format: 'long' | 'short'
  featured?: boolean
}

export const videos: Video[] = [
  {
    id: '0Z59JQFoYTM',
    title: 'The Real Me',
    client: 'KGodd',
    category: 'Music Video — Directed',
    year: '2026',
    format: 'long',
    featured: true,
  },
  {
    id: '7ysmsnZn8pA',
    title: 'Cinematic Model Shoot in Downtown Seattle',
    category: 'Fashion Film',
    year: '2026',
    format: 'long',
  },
  {
    id: 'cJbBXGvBkXA',
    title: 'Seattle Color Festival 2026 Recap',
    category: 'Event Recap',
    year: '2026',
    format: 'long',
  },
  {
    id: 'nEX3hDil9gI',
    title: 'Everything I Use To Shoot Cinematic Content',
    category: 'Process — Gear',
    year: '2026',
    format: 'long',
  },
]

export const shorts: Video[] = [
  {
    id: 'm9SiTqrRlEo',
    title: 'Brenda in Motion — Cinematic Beach Shoot',
    category: 'Short',
    year: '2026',
    format: 'short',
  },
  {
    id: 'O_n_uXtA8IQ',
    title: 'Blackout Runway in Seattle',
    category: 'Short',
    year: '2026',
    format: 'short',
  },
]

export const caseStudyFilmId = '7ysmsnZn8pA'
