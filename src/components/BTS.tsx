import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const photos = [
  { src: '/images/bts-tripod-skyline.jpg', caption: 'Setting marks on Alaskan Way' },
  { src: '/images/bts-directing.jpg', caption: 'Directing — Pier 57' },
  { src: '/images/bts-greatwheel.jpg', caption: 'Block the shot, find the light' },
  { src: '/images/bts-tripod-2.jpg', caption: 'Take two, in the wind' },
]

export default function BTS() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])

  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-ink-900 overflow-hidden">
      <div className="container-wide mb-12 md:mb-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              03 · Behind the lens
            </p>
            <h2 className="display text-4xl md:text-7xl">
              On location,
              <br />
              <span className="italic">downtown Seattle.</span>
            </h2>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-bone/60 leading-relaxed">
              Pier 57, the Great Wheel, Mariners Landing — a half day chasing
              shadow and Puget Sound light. This is what hiring me actually looks
              like.
            </p>
          </div>
        </div>
      </div>

      <motion.div style={{ x }} className="flex gap-4 md:gap-6 pl-6 md:pl-10 will-change-transform">
        {photos.map((p, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
            className="relative flex-shrink-0 w-[75vw] md:w-[42vw] lg:w-[36vw] aspect-[4/5] overflow-hidden bg-ink-800"
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 inset-x-0 p-5 md:p-7 flex items-end justify-between gap-3">
              <p className="font-display italic text-xl md:text-2xl">{p.caption}</p>
              <span className="font-mono text-[10px] tracking-[0.3em] text-bone/50">
                0{i + 1} / 0{photos.length}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}
