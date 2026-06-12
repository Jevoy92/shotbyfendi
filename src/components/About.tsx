import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-40 bg-ink-950 overflow-hidden">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
              <img
                src="/images/about-fendi.jpg"
                alt="Joshua 'Fendi' Buck"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 hidden md:block font-display italic text-bone/10 text-[10rem] leading-none pointer-events-none">
              JB
            </div>
          </motion.div>

          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              04 · About
            </p>
            <h2 className="display text-4xl md:text-6xl mb-8">
              Behind the
              <br />
              <span className="italic">camera.</span>
            </h2>

            <div className="space-y-5 text-bone/70 text-base md:text-lg leading-relaxed">
              <p>
                <span className="text-bone">Joshua "Fendi" Buck</span> is the founder
                of Shop by Fendi, a videography studio building clean, modern
                visuals for brands, artists, and creatives.
              </p>
              <p>
                Originally from Port Gibson, Mississippi, Joshua didn't come from a
                traditional media background. His creativity started with music —
                making beats, experimenting with sound, learning how to build
                something from nothing. That same instinct followed him into
                videography.
              </p>
              <p>
                Today, Shop by Fendi helps clients tell their story through visuals
                that feel real, polished, and worth pausing for.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-bone/10 pt-8">
              {[
                { k: '4+', v: 'Years shooting' },
                { k: '70+', v: 'Projects delivered' },
                { k: 'PNW', v: 'Home base' },
              ].map((s) => (
                <div key={s.v}>
                  <p className="font-display text-3xl md:text-5xl mb-1">{s.k}</p>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
