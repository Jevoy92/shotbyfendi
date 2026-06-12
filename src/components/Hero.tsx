import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-ink-950"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src="/images/hero-fendi.jpg"
          alt="Joshua 'Fendi' Buck shooting on location in Seattle"
          className="w-full h-full object-cover object-[60%_40%] md:object-[55%_45%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/30 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-ink-950/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 container-wide flex flex-col justify-end min-h-screen pt-32 pb-16 md:pb-24"
      >
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="eyebrow mb-6 md:mb-10"
          >
            <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
            Cinematic videography · Seattle · est. 2021
          </motion.p>

          <h1 className="display text-[clamp(3rem,11vw,12rem)] mb-8 md:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Visuals that
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-bone/90"
            >
              make you
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              <span className="text-ember">look</span> like the brand
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="block italic"
            >
              you're trying to be.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16"
          >
            <p className="text-base md:text-lg max-w-md text-bone/70 leading-relaxed">
              Brand films, music videos, and creative direction for people building
              something worth watching.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">
                See the work
              </a>
              <a href="#contact" className="btn-ghost">
                Book a shoot
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-3 text-bone/40"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
