// "Find Your Frame" — quiz data, archetypes, and scoring.
// Each option carries weights toward one or more archetypes; highest total wins.

export type ArchetypeKey = 'golden' | 'street' | 'polished' | 'auteur'

export type Archetype = {
  key: ArchetypeKey
  name: string
  tagline: string
  description: string
  image: string
  recommendedPackage: string
}

export const archetypes: Record<ArchetypeKey, Archetype> = {
  golden: {
    key: 'golden',
    name: 'The Golden Hour Editorial',
    tagline: 'Warm. Intimate. Unhurried.',
    description:
      'Your story breathes in natural light. Soft sun, honest texture, and a pace that lets every frame land. Think lifestyle film with a magazine finish — visuals that feel like a memory, not an ad.',
    image: '/images/work-alley-golden.jpg',
    recommendedPackage: 'Content Package',
  },
  street: {
    key: 'street',
    name: 'The Street Cinema',
    tagline: 'Raw. Kinetic. Unfiltered.',
    description:
      'Concrete, motion, and hard light. Your content belongs in the city — handheld energy, real locations, and edits that move like the block does. Built for audiences that can smell a studio set a mile away.',
    image: '/images/work-stairs-lowangle.jpg',
    recommendedPackage: 'Content Package',
  },
  polished: {
    key: 'polished',
    name: 'The Polished Brand Story',
    tagline: 'Clean. Confident. Considered.',
    description:
      'Every detail intentional. Crisp compositions, controlled color, and messaging that lands exactly where you aim it. The look that makes customers assume you are twice your actual size.',
    image: '/images/work-greatwheel-portrait.jpg',
    recommendedPackage: 'Monthly Retainer',
  },
  auteur: {
    key: 'auteur',
    name: 'The Music Video Auteur',
    tagline: 'Bold. Rhythmic. Unforgettable.',
    description:
      'Cuts on the beat, color that commits, and frames built around performance. Whether it is your single or your launch, the visuals hit like a hook — designed to be rewatched, clipped, and shared.',
    image: '/images/work-alley-green.jpg',
    recommendedPackage: 'The Basic Shoot',
  },
}

export type Option = {
  label: string
  /** Short value used in the emailed brief */
  brief: string
  weights: Partial<Record<ArchetypeKey, number>>
}

export type Question = {
  id: string
  /** Label used in the emailed brief, e.g. "Project type" */
  briefLabel: string
  prompt: string
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 'type',
    briefLabel: 'Project type',
    prompt: 'What are we making?',
    options: [
      { label: 'A brand film that sells without shouting', brief: 'Brand film', weights: { polished: 3, golden: 1 } },
      { label: 'A music video for my next drop', brief: 'Music video', weights: { auteur: 3, street: 1 } },
      { label: 'A month of social content in one shoot', brief: 'Social content batch', weights: { street: 2, golden: 2 } },
      { label: 'An event recap that actually gets watched', brief: 'Event recap', weights: { street: 2, auteur: 1 } },
    ],
  },
  {
    id: 'mood',
    briefLabel: 'Mood',
    prompt: 'Pick the light.',
    options: [
      { label: 'Golden hour, sun-flared and warm', brief: 'Golden hour / warm', weights: { golden: 3 } },
      { label: 'Hard shadows and city concrete', brief: 'Hard light / urban', weights: { street: 3 } },
      { label: 'Clean, even, premium studio feel', brief: 'Clean / polished', weights: { polished: 3 } },
      { label: 'Moody color, deep contrast, neon edges', brief: 'Moody / high contrast', weights: { auteur: 3 } },
    ],
  },
  {
    id: 'platform',
    briefLabel: 'Where it lives',
    prompt: 'Where does this live first?',
    options: [
      { label: 'Instagram & TikTok — vertical, fast', brief: 'IG / TikTok', weights: { street: 2, auteur: 1 } },
      { label: 'YouTube — people press play on purpose', brief: 'YouTube', weights: { auteur: 2, golden: 1 } },
      { label: 'My website — first impressions for clients', brief: 'Website', weights: { polished: 3 } },
      { label: 'Everywhere — cut it for every platform', brief: 'Multi-platform', weights: { polished: 1, street: 1, golden: 1 } },
    ],
  },
  {
    id: 'sound',
    briefLabel: 'Soundtrack',
    prompt: 'What is playing underneath?',
    options: [
      { label: 'Smooth R&B — let it glide', brief: 'Smooth R&B', weights: { golden: 3 } },
      { label: 'Hard-hitting hip-hop — let it knock', brief: 'Hip-hop', weights: { auteur: 2, street: 2 } },
      { label: 'Ambient & cinematic — let it swell', brief: 'Ambient cinematic', weights: { polished: 2, golden: 1 } },
      { label: 'Upbeat & bright — let it bounce', brief: 'Upbeat pop', weights: { street: 1, polished: 2 } },
    ],
  },
  {
    id: 'pace',
    briefLabel: 'Edit pace',
    prompt: 'How should the edit move?',
    options: [
      { label: 'Slow and intentional — every frame earns its time', brief: 'Slow & intentional', weights: { golden: 2, polished: 2 } },
      { label: 'Quick cuts — keep thumbs off the scroll', brief: 'Fast cuts', weights: { street: 2, auteur: 2 } },
      { label: 'Build from calm to chaos', brief: 'Dynamic build', weights: { auteur: 2, golden: 1 } },
    ],
  },
  {
    id: 'timeline',
    briefLabel: 'Timeline',
    prompt: 'When do you need it?',
    options: [
      { label: 'Yesterday — ASAP', brief: 'ASAP', weights: {} },
      { label: 'Within the month', brief: 'This month', weights: {} },
      { label: 'This quarter — planning ahead', brief: 'This quarter', weights: {} },
      { label: 'Just exploring for now', brief: 'Exploring', weights: {} },
    ],
  },
  {
    id: 'budget',
    briefLabel: 'Budget range',
    prompt: 'Rough budget range?',
    options: [
      { label: 'Under $1k — starting out', brief: 'Under $1k', weights: {} },
      { label: '$1k – $3k — ready to invest', brief: '$1k–$3k', weights: {} },
      { label: '$3k+ — ongoing content', brief: '$3k+', weights: {} },
      { label: 'Not sure yet — advise me', brief: 'TBD', weights: {} },
    ],
  },
]

const tieOrder: ArchetypeKey[] = ['golden', 'street', 'polished', 'auteur']

export function scoreAnswers(answers: Option[]): Archetype {
  const totals: Record<ArchetypeKey, number> = { golden: 0, street: 0, polished: 0, auteur: 0 }
  for (const a of answers) {
    for (const [k, w] of Object.entries(a.weights)) {
      totals[k as ArchetypeKey] += w ?? 0
    }
  }
  let best = tieOrder[0]
  for (const k of tieOrder) {
    if (totals[k] > totals[best]) best = k
  }
  return archetypes[best]
}

/** Adjust package recommendation using budget/timeline signals. */
export function recommendPackage(archetype: Archetype, answers: Option[], qs: Question[]): string {
  const get = (id: string) => answers[qs.findIndex((q) => q.id === id)]?.brief ?? ''
  const budget = get('budget')
  if (budget === '$3k+') return 'Monthly Retainer'
  if (budget === 'Under $1k') return 'The Basic Shoot'
  return archetype.recommendedPackage
}

export function buildBrief(
  archetype: Archetype,
  pkg: string,
  answers: Option[],
  qs: Question[],
  name: string,
): string {
  const lines = [
    'SHOOT BRIEF — SHOTBYFENDI',
    '------------------------------',
    `Visual style: ${archetype.name}`,
    ...qs.map((q, i) => `${q.briefLabel}: ${answers[i]?.brief ?? '—'}`),
    `Recommended package: ${pkg}`,
    '------------------------------',
    name ? `From: ${name}` : 'From: (add your name / brand)',
    'Sent from the Find Your Frame quiz at the ShotByFendi site',
  ]
  return lines.join('\n')
}
