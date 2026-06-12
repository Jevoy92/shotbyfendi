import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { videos, shorts, socials } from '../data/site'

const ease = [0.22, 1, 0.36, 1] as const

export default function Work() {
  const featured = videos.find((v) => v.featured) ?? videos[0]
  const rest = videos.filter((v) => v.id !== featured.id)

  return (
    <PageShell title="Work">
      <section className="pt-36 md:pt-48 pb-16 md:pb-24 bg-ink-950">
        <div className="container-wide">
          <p className="eyebrow mb-5">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            Selected work
          </p>
          <h1 className="display text-5xl md:text-8xl max-w-4xl">
            Films, not
            <br />
            <span className="italic">filler.</span>
          </h1>
          <p className="text-bone/60 text-base md:text-lg leading-relaxed max-w-xl mt-8">
            Every piece here is real, published work — directed, shot, and edited
            by Shop by Fendi. Press play on anything.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-20 md:pb-28 bg-ink-950">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <YouTubeEmbed videoId={featured.id} title={featured.title} />
            <div className="mt-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <h2 className="font-display italic text-3xl md:text-4xl">
                {featured.client && <span className="not-italic text-bone/50">{featured.client} · </span>}
                {featured.title}
              </h2>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember">
                {featured.category} · {featured.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid of long-form */}
      <section className="pb-20 md:pb-28 bg-ink-950">
        <div className="container-wide grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {rest.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease }}
            >
              <YouTubeEmbed videoId={v.id} title={v.title} />
              <div className="mt-4">
                <h3 className="font-display italic text-xl md:text-2xl leading-tight mb-1">{v.title}</h3>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40">
                  {v.category} · {v.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Shorts */}
      <section className="pb-20 md:pb-28 bg-ink-950">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-3">Short-form</p>
              <h2 className="display text-3xl md:text-5xl italic">Vertical work.</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {shorts.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
              >
                <YouTubeEmbed videoId={s.id} title={s.title} vertical />
                <p className="mt-3 text-sm text-bone/70 leading-snug">{s.title}</p>
              </motion.div>
            ))}

            {/* See-more card */}
            <a
              href={socials.youtube.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[9/16] bg-ink-800 border border-bone/10 hover:border-ember flex flex-col items-center justify-center gap-4 transition-colors col-span-2 md:col-span-1"
            >
              <span className="font-display italic text-2xl text-center px-6">
                More on
                <br />
                YouTube
              </span>
              <ArrowUpRight
                size={22}
                className="text-ember group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
