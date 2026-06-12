import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  title: string
  children: ReactNode
}

/** Wraps every page: sets the document title and animates entry/exit. */
export default function PageShell({ title, children }: Props) {
  useEffect(() => {
    document.title = `${title} — ShotByFendi`
    // AnimatePresence mode="wait" mounts this after the old page exits, so
    // resetting here (not on route change) guarantees the new page starts at top.
    window.scrollTo(0, 0)
  }, [title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
