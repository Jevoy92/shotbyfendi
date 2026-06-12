import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink-950/80 backdrop-blur-xl border-b border-bone/5' : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5 md:py-6">
          <a href="#top" className="group flex items-baseline gap-2">
            <span className="font-display italic text-2xl md:text-3xl font-normal tracking-tight">
              Shop by Fendi
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 bg-ember rounded-full group-hover:scale-150 transition-transform" />
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs tracking-[0.25em] uppercase text-bone/70 hover:text-bone transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary !py-2.5 !px-5">
              Book
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-bone p-2"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-display italic text-2xl">Shop by Fendi</span>
              <button onClick={() => setOpen(false)} className="p-2" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center gap-8 pt-20">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="font-display text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
