import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import SocialRow from '../components/SocialRow'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { videos } from '../data/site'

const ease = [0.22, 1, 0.36, 1] as const

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease },
  }),
}

export default function Home() {
  const featured = videos.find((v) => v.featured) ?? videos[0]
  const rest = videos.filter((v) => v.id !== featured.id).slice(0, 2)

  return (
    <PageShell title="Cinematic Videography">
      {/* ───────────────────────── Hero — split editorial, type never covers the subject */}
      <section className="relative min-h-screen grid lg:grid-cols-12 bg-ink-950">
        {/* Type panel */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 md:px-12 lg:pl-16 lg:pr-10 pt-32 pb-16 lg:py-32 order-2 lg:order-1">
          <motion.p variants={reveal} initial="hidden" animate="show" custom={0} className="eyebrow mb-8">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            Cinematic videography · Seattle
          </motion.p>

          <h1 className="display text-[clamp(3.2rem,7.5vw,7.5rem)] mb-10">
            <motion.span variants={reveal} initial="hidden" animate="show" custom={1} className="block">
              Shot in Seattle.
            </motion.span>
            <motion.span variants={reveal} initial="hidden" animate="show" custom={2} className="block italic text-ember">
              Seen everywhere.
            </motion.span>
          </h1>

          <motion.p
            variants={reveal}
            initial="hidden"
            animate="show"
            custom={3}
            className="text-bone/60 text-base md:text-lg leading-relaxed max-w-md mb-10"
          >
            Brand films, music videos, and creative direction for people building
            something worth watching.
          </motion.p>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="/work" className="btn-primary">
              See the work <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Book a shoot
            </Link>
          </motion.div>

          <motion.div variants={reveal} initial="hidden" animate="show" custom={5} className="mt-12">
            <SocialRow size={20} />
          </motion.div>
        </div>

        {/* Image panel — clean, no text overlay */}
        <div className="lg:col-span-5 relative h-[55vh] lg:h-auto order-1 lg:order-2 overflow-hidden">
          <motion.img
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease }}
            src="/images/work-alley-golden.jpg"
            alt="Editorial portrait in golden light — shot by Fendi"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-ink-950/20 lg:bg-gradient-to-r lg:from-ink-950/30 lg:via-transparent lg:to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/60 bg-ink-950/40 backdrop-blur-sm px-3 py-2"
          >
            On location · Downtown Seattle
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── Marquee */}
      <section className="border-y border-bone/10 py-7 md:py-9 overflow-hidden bg-ink-950">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {[...Array(3)].flatMap((_, r) =>
            ['Brand Films', 'Music Videos', 'Short-Form Content', 'Creative Direction', 'Event Recaps', 'Available Worldwide'].map((t, i) => (
              <span
                key={`${r}-${i}`}
                className="font-display italic text-2xl md:text-4xl text-bone/70 px-7 md:px-10 flex items-center gap-7 md:gap-10"
              >
                {t}
                <span className="text-ember text-lg">✦</span>
              </span>
            )),
          )}
        </div>
      </section>

      {/* ───────────────────────── Featured film (real video) */}
      <section className="py-24 md:py-36 bg-ink-950">
        <div className="container-wide">
          <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4">
                <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                Featured film
              </p>
              <h2 className="display text-4xl md:text-6xl">
                {featured.client && <span className="text-bone/50">{featured.client} — </span>}
                <span className="italic">"{featured.title}"</span>
              </h2>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="text-bone/60 leading-relaxed">
                {featured.category}. Directed, shot, and cut by ShotByFendi.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <YouTubeEmbed videoId={featured.id} title={featured.title} />
          </motion.div>

          <div className="mt-10 flex justify-between items-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40">
              {featured.category} · {featured.year}
            </p>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-bone/70 hover:text-ember transition-colors"
            >
              Full catalog
              <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Two more films */}
      <section className="pb-24 md:pb-36 bg-ink-950">
        <div className="container-wide grid md:grid-cols-2 gap-5 md:gap-8">
          {rest.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
            >
              <YouTubeEmbed videoId={v.id} title={v.title} />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display italic text-xl md:text-2xl">{v.title}</h3>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40 whitespace-nowrap">
                  {v.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Case study teaser */}
      <section className="relative py-28 md:py-44 overflow-hidden">
        <img
          src="/images/bts-tripod-skyline.jpg"
          alt="Behind the scenes on the Seattle waterfront"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/75" />
        <div className="relative container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              Case study
            </p>
            <h2 className="display text-4xl md:text-6xl mb-6">
              One shoot day,
              <br />
              <span className="italic">start to finish.</span>
            </h2>
            <p className="text-bone/70 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Follow a full production on the Seattle waterfront — the planning,
              the light, the direction, and the film it became.
            </p>
            <Link to="/case-study" className="btn-primary">
              Read the case study <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Quiz teaser */}
      <section className="py-24 md:py-36 bg-ink-950 border-t border-bone/10">
        <div className="container-wide grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              Interactive · 60 seconds
            </p>
            <h2 className="display text-4xl md:text-6xl mb-6">
              Not sure what
              <br />
              <span className="italic">your story looks like?</span>
            </h2>
            <p className="text-bone/60 text-base md:text-lg leading-relaxed max-w-lg">
              Seven quick picks — light, sound, pace — and Find Your Frame cuts
              together your visual style, matches it to a package, and writes
              your shoot brief for you.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
            <Link to="/find-your-frame" className="btn-primary">
              Find your frame <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA */}
      <section className="py-24 md:py-36 bg-ink-900">
        <div className="container-tight text-center">
          <p className="eyebrow mb-6">Ready when you are</p>
          <h2 className="display text-4xl md:text-7xl mb-10">
            Let's make something
            <br />
            <span className="italic text-ember">worth watching.</span>
          </h2>
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
