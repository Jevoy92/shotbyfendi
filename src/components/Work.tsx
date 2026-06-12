import { motion } from 'framer-motion'
import { works } from '../data/work'

export default function Work() {
  return (
    <section id="work" className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-12 md:mb-20">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              02 · Selected work
            </p>
            <h2 className="display text-4xl md:text-7xl">
              The catalog,
              <br />
              <span className="italic">on display.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-bone/60 leading-relaxed">
              A rotating selection of recent shoots — brand campaigns, editorial,
              and lifestyle work from across Seattle and beyond.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-5 [grid-auto-flow:dense]">
          {works.map((w, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.9,
                delay: (i % 4) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden bg-ink-800 cursor-pointer ${
                w.span === 'tall' ? 'row-span-2' : ''
              } ${w.span === 'wide' ? 'col-span-2' : ''}`}
            >
              <img
                src={w.src}
                alt={w.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-bone/60 mb-1">
                      {w.category}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl italic">{w.title}</h3>
                  </div>
                  <span className="font-mono text-[10px] text-bone/40">{w.year}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 md:mt-16 flex justify-center">
          <a
            href="https://instagram.com/shot_by_fendi"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            See more on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
