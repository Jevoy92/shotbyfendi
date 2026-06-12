import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import SocialRow from './SocialRow'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/case-study', label: 'Case Study' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-ink-950/85 backdrop-blur-xl border-b border-bone/5'
            : 'bg-gradient-to-b from-ink-950/80 via-ink-950/35 to-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5 md:py-6">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-display italic text-2xl md:text-3xl font-normal tracking-tight">
              Shop by Fendi
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 bg-ember rounded-full group-hover:scale-150 transition-transform" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative text-xs tracking-[0.25em] uppercase transition-colors pb-1 ${
                    isActive ? 'text-bone' : 'text-bone/60 hover:text-bone'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 right-0 -bottom-0.5 h-px bg-ember"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary !py-2.5 !px-5">
              Book
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-bone p-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/98 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-start justify-center gap-6 h-full px-10">
              {[{ to: '/', label: 'Home' }, ...links].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `font-display text-5xl ${isActive ? 'italic text-ember' : 'text-bone'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <SocialRow size={22} />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
