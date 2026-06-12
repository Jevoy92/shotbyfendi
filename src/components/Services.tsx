import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    num: '01',
    name: 'The Basic Shoot',
    desc: 'One to two hour shoot, one polished edit. Great for a single product, an artist single, or a personal brand refresh.',
    deliverables: ['1 location', '1 edited video', '60s + 30s + 15s cutdowns'],
    starting: '$650',
  },
  {
    num: '02',
    name: 'Content Package',
    desc: 'A half day on location producing a battery of vertical and horizontal clips designed to fuel a month of social.',
    deliverables: ['Half-day shoot', '5–8 short-form pieces', 'Reels · TikTok · Shorts ready'],
    starting: '$1,800',
  },
  {
    num: '03',
    name: 'Monthly Retainer',
    desc: 'A monthly partnership for brands that need to stay visible. Consistent shoots, priority turnaround, and creative direction baked in.',
    deliverables: ['Ongoing shoots', 'Priority delivery', 'Creative direction'],
    starting: '$3,200/mo',
    featured: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-40 bg-ink-900">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-12 md:mb-20">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              05 · Services
            </p>
            <h2 className="display text-4xl md:text-7xl">
              How we
              <br />
              <span className="italic">work together.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-bone/60 leading-relaxed">
              Three ways in. Every package can be tailored to fit the actual shape
              of your project — these are the shells, not the cage.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-bone/10">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative p-8 md:p-10 flex flex-col justify-between min-h-[420px] md:min-h-[520px] transition-colors duration-500 ${
                s.featured ? 'bg-ember text-ink-950' : 'bg-ink-900 hover:bg-ink-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-10 md:mb-14">
                  <span
                    className={`font-mono text-xs tracking-[0.3em] ${
                      s.featured ? 'text-ink-950/70' : 'text-bone/40'
                    }`}
                  >
                    {s.num}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className={`opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45 ${
                      s.featured ? 'text-ink-950' : 'text-bone'
                    }`}
                  />
                </div>
                <h3 className="font-display text-3xl md:text-4xl mb-4">{s.name}</h3>
                <p
                  className={`text-sm md:text-base leading-relaxed mb-8 ${
                    s.featured ? 'text-ink-950/80' : 'text-bone/60'
                  }`}
                >
                  {s.desc}
                </p>
                <ul
                  className={`space-y-2 text-sm ${
                    s.featured ? 'text-ink-950/80' : 'text-bone/70'
                  }`}
                >
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-baseline gap-3">
                      <span
                        className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${
                          s.featured ? 'bg-ink-950' : 'bg-ember'
                        }`}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`mt-10 pt-6 border-t flex items-end justify-between ${
                  s.featured ? 'border-ink-950/20' : 'border-bone/10'
                }`}
              >
                <div>
                  <p
                    className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-1 ${
                      s.featured ? 'text-ink-950/60' : 'text-bone/40'
                    }`}
                  >
                    Starting at
                  </p>
                  <p className="font-display text-2xl md:text-3xl">{s.starting}</p>
                </div>
                {s.featured && (
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase px-2 py-1 border border-ink-950/30">
                    Most popular
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-bone/40 mt-10 text-sm font-mono tracking-wide">
          Custom packages available — every project is quoted to scope.
        </p>
      </div>
    </section>
  )
}
