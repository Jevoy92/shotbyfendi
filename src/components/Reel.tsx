import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'

export default function Reel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden bg-ink-950">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-12 md:mb-20">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              01 · The Reel
            </p>
            <h2 className="display text-4xl md:text-6xl">
              A 30 second
              <br />
              <span className="italic">first impression.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-bone/60 text-base md:text-lg leading-relaxed">
              Music gets you halfway there. The cut earns the rest. Every frame is
              chosen to make your audience stop scrolling and pay attention — because
              the first three seconds decide whether the next thirty matter.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-video w-full overflow-hidden bg-ink-900 group cursor-pointer"
        >
          <motion.div style={{ y }} className="absolute inset-[-10%]">
            <img
              src="/images/bts-tripod-skyline.jpg"
              alt="Behind the camera in Seattle"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-700"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950/30 via-ink-950/10 to-ink-950/50" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-bone/20 animate-ping" />
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-bone text-ink-950 flex items-center justify-center group-hover:bg-ember transition-colors duration-300">
                <Play size={28} className="ml-1.5" fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex items-end justify-between text-bone/80">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
                SHOWREEL 2026
              </p>
              <p className="font-display italic text-2xl md:text-3xl">A Year in Frames</p>
            </div>
            <div className="hidden md:block font-mono text-xs text-right">
              <p>00:00 / 00:30</p>
              <p className="text-bone/40 mt-1">4K · DOLBY VISION</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
