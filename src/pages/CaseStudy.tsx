import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import YouTubeEmbed from '../components/YouTubeEmbed'
import { caseStudyFilmId } from '../data/site'

const ease = [0.22, 1, 0.36, 1] as const

function Block({
  num,
  title,
  children,
}: {
  num: string
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease }}
    >
      <p className="eyebrow mb-3">
        <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
        {num}
      </p>
      <h2 className="display text-3xl md:text-5xl mb-5 italic">{title}</h2>
      <div className="text-bone/65 text-base md:text-lg leading-relaxed space-y-4">{children}</div>
    </motion.div>
  )
}

function Photo({ src, alt, caption, className = '' }: { src: string; alt: string; caption?: string; className?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease }}
      className={`relative overflow-hidden bg-ink-800 ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
      {caption && (
        <figcaption className="absolute bottom-0 inset-x-0 p-4 md:p-5 bg-gradient-to-t from-ink-950/85 to-transparent">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/70">{caption}</p>
        </figcaption>
      )}
    </motion.figure>
  )
}

export default function CaseStudy() {
  const stripRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stripRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-25%'])

  return (
    <PageShell title="Case Study — Downtown Seattle">
      {/* Title */}
      <section className="pt-36 md:pt-48 pb-16 md:pb-20 bg-ink-950">
        <div className="container-wide">
          <p className="eyebrow mb-5">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            Case study · One shoot, documented
          </p>
          <h1 className="display text-[clamp(2.8rem,8vw,8rem)] max-w-5xl">
            A day on the
            <br />
            <span className="italic">Seattle waterfront.</span>
          </h1>
          <div className="grid md:grid-cols-12 gap-8 mt-10">
            <p className="md:col-span-5 text-bone/65 text-base md:text-lg leading-relaxed">
              What does it actually look like to hire ShotByFendi? This is one
              production, end to end — a cinematic model shoot through Pike Place,
              Pier 57, and the alleys of downtown Seattle.
            </p>
            <div className="md:col-span-4 md:col-start-9 font-mono text-xs text-bone/50 space-y-2">
              <p><span className="text-bone/30">LOCATION</span> — Downtown Seattle, WA</p>
              <p><span className="text-bone/30">SETUPS</span> — Waterfront · Alley · Stairs</p>
              <p><span className="text-bone/30">DELIVERED</span> — Film + photo set</p>
              <p><span className="text-bone/30">STILLS</span> — Jevoy Palmer</p>
            </div>
          </div>
        </div>
      </section>

      {/* The film it became */}
      <section className="pb-24 md:pb-32 bg-ink-950">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <YouTubeEmbed videoId={caseStudyFilmId} title="Cinematic Model Shoot in Downtown Seattle" />
            <p className="mt-5 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40">
              The finished film — watch first, then see how it was made
            </p>
          </motion.div>
        </div>
      </section>

      {/* 01 — The setting */}
      <section className="pb-24 md:pb-32 bg-ink-950">
        <div className="container-wide grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <Block num="01 · The setting" title="Chasing hard light.">
              <p>
                Midday sun, no diffusion, no crew of ten. The brief was to make
                downtown Seattle feel like a film set — using only what the city
                gives you: concrete, graffiti, water, and the Great Wheel turning
                in the background.
              </p>
            </Block>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Photo
              src="/images/bts-greatwheel.jpg"
              alt="Framing the shot against the Seattle Great Wheel"
              caption="Pier 57 — blocking the first setup"
              className="aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* 02 — Direction */}
      <section className="pb-24 md:pb-32 bg-ink-950">
        <div className="container-wide grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <Photo
              src="/images/bts-directing.jpg"
              alt="Fendi directing the shoot"
              caption="Direction is half the job"
              className="aspect-[4/5]"
            />
          </div>
          <div className="md:col-span-5 md:col-start-8 order-1 md:order-2">
            <Block num="02 · Direction" title="Talent over takes.">
              <p>
                A model is only as comfortable as the direction is clear. Wardrobe
                pulls, pose references, and constant playback — every setup is a
                conversation, not a command.
              </p>
            </Block>
          </div>
        </div>
      </section>

      {/* Horizontal photo strip */}
      <section ref={stripRef} className="py-20 md:py-28 bg-ink-900 overflow-hidden">
        <div className="container-wide mb-10">
          <p className="eyebrow mb-3">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            03 · The frames
          </p>
          <h2 className="display text-3xl md:text-5xl italic">What the day produced.</h2>
        </div>
        <motion.div style={{ x }} className="flex gap-4 md:gap-6 pl-6 md:pl-10 will-change-transform">
          {[
            { src: '/images/work-alley-golden.jpg', cap: 'Golden hour, found alley' },
            { src: '/images/work-stairs-lowangle.jpg', cap: 'Low angle, downtown stairs' },
            { src: '/images/work-greatwheel-portrait.jpg', cap: 'The Great Wheel backdrop' },
            { src: '/images/work-waterfront-laugh.jpg', cap: 'Between takes' },
            { src: '/images/work-alley-green.jpg', cap: 'Green wall, hard shadow' },
            { src: '/images/work-cherry-blossom.jpg', cap: 'First of spring' },
          ].map((p, i) => (
            <figure
              key={i}
              className="relative flex-shrink-0 w-[70vw] md:w-[30vw] aspect-[3/4] overflow-hidden bg-ink-800"
            >
              <img src={p.src} alt={p.cap} loading="lazy" className="w-full h-full object-cover" />
              <figcaption className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink-950/85 to-transparent">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/70">
                  {String(i + 1).padStart(2, '0')} — {p.cap}
                </p>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </section>

      {/* 04 — Result + CTA */}
      <section className="py-24 md:py-36 bg-ink-950">
        <div className="container-tight text-center">
          <p className="eyebrow mb-6">04 · Your turn</p>
          <h2 className="display text-4xl md:text-7xl mb-8">
            This could be
            <br />
            <span className="italic text-ember">your shoot day.</span>
          </h2>
          <p className="text-bone/60 text-base md:text-lg max-w-xl mx-auto mb-10">
            Same process, your brand. One day on location becomes a film, a photo
            set, and a month of content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Book a shoot <ArrowRight size={14} />
            </Link>
            <Link to="/services" className="btn-ghost">
              See packages
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
