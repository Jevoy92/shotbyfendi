import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const phases = [
  {
    num: '01',
    name: 'Discovery & Treatment',
    desc: 'Goals, audience, references — distilled into a one-page creative treatment so every stakeholder signs off before a single frame is shot.',
  },
  {
    num: '02',
    name: 'Pre-Production',
    desc: 'Shot lists, locations, talent, schedule, and music licensing locked in advance. Surprises belong in the edit, not on set.',
  },
  {
    num: '03',
    name: 'Production',
    desc: 'Directed sessions with redundant 4K capture and clean audio — run to the schedule, with room for the unplanned moment that makes the cut.',
  },
  {
    num: '04',
    name: 'Post & Delivery',
    desc: 'Color grade, sound mix, and titles — delivered in every aspect ratio your channels need, with revision rounds built into the quote.',
  },
]

export default function Process() {
  return (
    <section className="py-24 md:py-36 bg-ink-950 border-y border-bone/10">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              The process
            </p>
            <h2 className="display text-4xl md:text-6xl">
              A media partner,
              <br />
              <span className="italic">not just a camera.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-bone/60 leading-relaxed">
              Agencies and brands buy certainty. Every project — from a single
              session to a quarterly campaign — runs through the same four
              phases, so you always know what happens next.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10">
          {phases.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="group bg-ink-950 hover:bg-ink-900 transition-colors duration-500 p-7 md:p-8 min-h-[260px] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-display italic text-4xl md:text-5xl text-ember leading-none">
                  {p.num}
                </span>
                <span className="flex-1 h-px bg-bone/15 group-hover:bg-ember/50 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-xl md:text-2xl mb-3">{p.name}</h3>
              <p className="text-sm text-bone/55 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
