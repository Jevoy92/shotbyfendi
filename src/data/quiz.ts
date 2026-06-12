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

/** How the question is rendered: each kind has a custom interactive graphic. */
export type QuestionKind = 'icons' | 'swatch' | 'wave' | 'slider' | 'liquid' | 'aperture'

export type Question = {
  id: string
  /** Label used in the emailed brief, e.g. "Project type" */
  briefLabel: string
  prompt: string
  kind: QuestionKind
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 'type',
    briefLabel: 'Project type',
    prompt: 'What are we making?',
    kind: 'icons',
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
    kind: 'swatch',
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
    kind: 'icons',
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
    kind: 'wave',
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
    kind: 'slider',
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
    kind: 'liquid',
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
    prompt: 'Open up the budget.',
    kind: 'aperture',
    options: [
      { label: 'Under $1k — starting out', brief: 'Under $1k', weights: {} },
      { label: '$1k – $3k — ready to invest', brief: '$1k–$3k', weights: {} },
      { label: '$3k+ — ongoing content', brief: '$3k+', weights: {} },
      { label: 'Not sure yet — advise me', brief: 'TBD', weights: {} },
    ],
  },
]

const tieOrder: ArchetypeKey[] = ['golden', 'street', 'polished', 'auteur']

export function scoreTotals(answers: Option[]): Record<ArchetypeKey, number> {
  const totals: Record<ArchetypeKey, number> = { golden: 0, street: 0, polished: 0, auteur: 0 }
  for (const a of answers) {
    for (const [k, w] of Object.entries(a.weights)) {
      totals[k as ArchetypeKey] += w ?? 0
    }
  }
  return totals
}

export function scoreAnswers(answers: Option[]): Archetype {
  const totals = scoreTotals(answers)
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

/* ───────── Tailored quick-win results ───────── */

export type Readiness = { pct: number; tier: string; note: string }

/** Film-style production readiness, scored from timeline, budget, and platform clarity. */
export function readiness(answers: Option[], qs: Question[]): Readiness {
  const get = (id: string) => answers[qs.findIndex((q) => q.id === id)]?.brief ?? ''
  const t = get('timeline')
  const b = get('budget')
  const p = get('platform')
  const tPts = t === 'ASAP' || t === 'This month' ? 3 : t === 'This quarter' ? 2 : 1
  const bPts = b === '$3k+' || b === '$1k–$3k' ? 3 : b === 'Under $1k' ? 2 : 1
  const pPts = p === 'Multi-platform' ? 2 : 3
  const pct = Math.round(((tPts + bPts + pPts) / 9) * 100)
  if (pct >= 85)
    return {
      pct,
      tier: 'Greenlit',
      note: 'Clear goal, real budget, live deadline. You are one DM away from a call sheet — projects like this turn around fast.',
    }
  if (pct >= 60)
    return {
      pct,
      tier: 'Pre-Production',
      note: 'The vision is there; a couple of details are still soft. One quick conversation locks the scope, then it goes straight to scheduling.',
    }
  return {
    pct,
    tier: 'In Development',
    note: 'You are in the idea stage — the perfect time to talk. Bring this brief to a free consult and leave with a direction and a number.',
  }
}

const archetypeTips: Record<ArchetypeKey, string> = {
  golden:
    'Build your next shoot around the hour after sunrise or before sunset — one location, three looks, zero artificial light.',
  street:
    'Scout two blocks, not ten. Repeatable locations with strong texture beat variety every single time.',
  polished:
    'Lock a simple brand kit first — two colors, one font, one color grade — so every video reads as yours within a second.',
  auteur:
    'Storyboard the hook: the first three seconds deserve more planning time than the other twenty-seven combined.',
}

const platformTips: Record<string, string> = {
  'IG / TikTok': 'Shoot everything 4K vertical and frame for the center 80% — captions and UI eat the edges.',
  YouTube: 'Open cold, mid-action. Save the intro for second twenty, not second one.',
  Website: 'One hero film, 60–90 seconds, autoplay muted with captions — it outperforms a wall of clips.',
  'Multi-platform': 'Shoot horizontal masters with safe vertical crops in mind — one session, every aspect ratio.',
}

const paceTips: Record<string, string> = {
  'Slow & intentional': 'Give each shot a full breath — four to six seconds — and let the music do the cutting.',
  'Fast cuts': 'Bank three times more b-roll than feels necessary. Rapid edits starve slow shoots.',
  'Dynamic build': 'Map the energy curve before the shoot — calm establish, rising motion, payoff — then shoot to that curve.',
}

/** Three concrete, personalized moves composed from their answers. */
export function playbook(archetype: Archetype, answers: Option[], qs: Question[]): string[] {
  const get = (id: string) => answers[qs.findIndex((q) => q.id === id)]?.brief ?? ''
  return [
    archetypeTips[archetype.key],
    platformTips[get('platform')] ?? platformTips['Multi-platform'],
    paceTips[get('pace')] ?? paceTips['Dynamic build'],
  ]
}

export function buildBrief(
  archetype: Archetype,
  pkg: string,
  answers: Option[],
  qs: Question[],
  name: string,
): string {
  const r = readiness(answers, qs)
  const moves = playbook(archetype, answers, qs)
  const lines = [
    'SHOOT BRIEF — SHOTBYFENDI',
    '------------------------------',
    `Visual style: ${archetype.name}`,
    ...qs.map((q, i) => `${q.briefLabel}: ${answers[i]?.brief ?? '—'}`),
    `Recommended package: ${pkg}`,
    `Production status: ${r.tier.toUpperCase()} (${r.pct}%)`,
    '------------------------------',
    'FIRST THREE MOVES:',
    ...moves.map((m, i) => `${i + 1}. ${m}`),
    '------------------------------',
    name ? `From: ${name}` : 'From: (add your name / brand)',
    'Sent from the Find Your Frame quiz at the ShotByFendi site',
  ]
  return lines.join('\n')
}
