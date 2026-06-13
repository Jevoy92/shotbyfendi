import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import SocialRow from '../components/SocialRow'

const ease = [0.22, 1, 0.36, 1] as const

export default function About() {
  return (
    <PageShell title="About">
      <section className="pt-36 md:pt-48 pb-24 md:pb-36 bg-ink-950">
        <div className="container-wide">
          <p className="eyebrow mb-5">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            About
          </p>
          <h1 className="display text-5xl md:text-8xl mb-16 md:mb-24">
            Behind the
            <br />
            <span className="italic">camera.</span>
          </h1>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="md:col-span-5"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
                <img
                  src="/images/about-fendi.jpg"
                  alt="Joshua 'Fendi' Buck on location"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40">
                Joshua "Fendi" Buck · Founder
              </p>
            </motion.div>

            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
              <div className="space-y-6 text-bone/70 text-base md:text-lg leading-relaxed">
                <p>
                  <span className="text-bone">Joshua "Fendi" Buck</span> is the
                  founder of ShotByFendi, a videography studio building clean,
                  modern visuals for brands, artists, and creatives.
                </p>
                <p>
                  Originally from Port Gibson, Mississippi, Joshua didn't come
                  from a traditional media background. His creativity started
                  with music — making beats, experimenting with sound, learning
                  how to build something from nothing. That same instinct
                  followed him into videography.
                </p>
                <p>
                  Today, ShotByFendi operates as a full media partner —
                  strategy, pre-production, production, and post — for brands,
                  agencies, and artists who need broadcast-quality work without
                  agency overhead. A media specialist who just happens to carry
                  the camera too.
                </p>
              </div>

              <div className="mt-10">
                <p className="eyebrow mb-4">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Creative direction',
                    'Pre-production planning',
                    '4K cinema capture',
                    'Licensed music & audio mix',
                    'Color grading',
                    'Interview & doc lighting',
                    'Multi-platform deliverables',
                    'On location or studio',
                  ].map((c) => (
                    <span
                      key={c}
                      className="border border-bone/15 px-3 py-1.5 text-xs text-bone/65 hover:border-ember hover:text-bone transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-bone/10 pt-8">
                {[
                  { k: '4+', v: 'Years shooting' },
                  { k: '70+', v: 'Projects delivered' },
                  { k: 'PNW', v: 'Home base' },
                ].map((s) => (
                  <div key={s.v}>
                    <p className="font-display text-3xl md:text-5xl mb-1">{s.k}</p>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40">{s.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-8">
                <SocialRow size={20} />
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-bone/70 hover:text-ember transition-colors"
                >
                  Work with me
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
