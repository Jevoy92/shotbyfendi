import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageShell from '../components/PageShell'
import { socials } from '../data/site'
import { InstagramIcon, YouTubeIcon, FacebookIcon } from '../components/SocialIcons'

const ease = [0.22, 1, 0.36, 1] as const

const cards = [
  {
    ...socials.instagram,
    icon: InstagramIcon,
    primary: true,
    note: 'Send a DM with what you want to make, your timeline, and a rough budget — replies usually land within 24 hours.',
  },
  {
    ...socials.youtube,
    icon: YouTubeIcon,
    primary: false,
    note: 'The full catalog of films, recaps, and behind-the-scenes process videos.',
  },
  {
    ...socials.facebook,
    icon: FacebookIcon,
    primary: false,
    note: 'Updates, community, and booking inquiries if Facebook is your home turf.',
  },
]

export default function Contact() {
  return (
    <PageShell title="Contact">
      <section className="pt-36 md:pt-48 pb-16 md:pb-20 bg-ink-950">
        <div className="container-wide">
          <p className="eyebrow mb-5">
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            Contact
          </p>
          <h1 className="display text-[clamp(3rem,9vw,9rem)]">
            Slide into
            <br />
            <span className="italic text-ember">the DMs.</span>
          </h1>
          <p className="text-bone/60 text-base md:text-lg leading-relaxed max-w-xl mt-8">
            No forms, no ticket queues. Every booking starts as a conversation —
            pick whichever platform you already live on.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-36 bg-ink-950">
        <div className="container-wide grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a
                key={c.label}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.1, ease }}
                className={`group relative p-8 md:p-10 min-h-[340px] md:min-h-[420px] flex flex-col justify-between transition-colors duration-500 ${
                  c.primary
                    ? 'bg-ember text-ink-950'
                    : 'bg-ink-900 hover:bg-ink-800 border border-bone/10 hover:border-ember/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-10">
                    <Icon size={28} className={c.primary ? 'text-ink-950' : 'text-ember'} />
                    <ArrowUpRight
                      size={22}
                      className={`transition-transform duration-300 group-hover:rotate-45 ${
                        c.primary ? 'text-ink-950' : 'text-bone/50 group-hover:text-ember'
                      }`}
                    />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl mb-2">{c.label}</h2>
                  <p className={`font-mono text-xs tracking-[0.2em] mb-6 ${c.primary ? 'text-ink-950/70' : 'text-ember'}`}>
                    {c.handle}
                  </p>
                  <p className={`text-sm md:text-base leading-relaxed ${c.primary ? 'text-ink-950/80' : 'text-bone/60'}`}>
                    {c.note}
                  </p>
                </div>
                <p
                  className={`mt-8 pt-5 border-t font-mono text-[10px] tracking-[0.3em] uppercase ${
                    c.primary ? 'border-ink-950/20 text-ink-950/70' : 'border-bone/10 text-bone/40'
                  }`}
                >
                  {c.primary ? '★ Fastest reply' : c.cta}
                </p>
              </motion.a>
            )
          })}
        </div>

        <div className="container-tight mt-16 text-center">
          <p className="text-bone/40 text-sm font-mono tracking-wide">
            Booking from out of state? Mention your city — travel shoots are on the table.
          </p>
        </div>
      </section>
    </PageShell>
  )
}
