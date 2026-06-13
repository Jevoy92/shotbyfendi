import { motion } from 'framer-motion'

/* ──────────────────────────────────────────────────────────────────────────
   Custom quiz graphics — all hand-drawn SVG, stroke = currentColor so they
   inherit the card's hover/selected color. No emoji, no icon library.
   ────────────────────────────────────────────────────────────────────────── */

type IconProps = { className?: string }
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ───────── Q1 — project type */

export function ClapperIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="6" y="20" width="36" height="20" rx="2" />
      <path d="M6 20 L40 12 L42 19" />
      <path d="M12 18.6 L16 11.5 M20 16.8 L24 9.7 M28 15 L32 7.9 M36 13.2 L40 12" strokeWidth="2.4" />
      <path d="M12 28 h12" opacity="0.5" />
    </svg>
  )
}

export function VinylIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <circle cx="22" cy="26" r="16" />
      <circle cx="22" cy="26" r="3" />
      <path d="M11.5 22 a11 11 0 0 1 6.5 -6.5" opacity="0.5" />
      <path d="M38 8 v14" />
      <path d="M38 8 c4 0 6 2 6 5" opacity="0.7" />
      <circle cx="36" cy="23" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function PhoneBatchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="15" y="6" width="18" height="34" rx="3" />
      <path d="M11 12 v24 a4 4 0 0 0 2 3.4" opacity="0.45" />
      <path d="M37 12 v24 a4 4 0 0 1 -2 3.4" opacity="0.45" />
      <path d="M20 18 l8 5 -8 5 z" fill="currentColor" stroke="none" />
      <path d="M21 33 h6" opacity="0.6" />
    </svg>
  )
}

export function CrowdIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <circle cx="24" cy="21" r="5" />
      <path d="M15 40 c0 -6 4 -9 9 -9 s9 3 9 9" />
      <circle cx="10" cy="25" r="4" opacity="0.55" />
      <path d="M3 40 c0 -5 3 -7.5 7 -7.5" opacity="0.55" />
      <circle cx="38" cy="25" r="4" opacity="0.55" />
      <path d="M45 40 c0 -5 -3 -7.5 -7 -7.5" opacity="0.55" />
      <path d="M24 6 v4 M14 9 l2.5 3 M34 9 l-2.5 3" strokeWidth="2.4" />
    </svg>
  )
}

/* ───────── Q3 — platform */

export function PhoneVerticalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="14" y="5" width="20" height="38" rx="4" />
      <path d="M21 19 l9 5.5 -9 5.5 z" fill="currentColor" stroke="none" />
      <path d="M22 9 h4" opacity="0.6" />
      <path d="M40 16 c2 2.5 2 13.5 0 16 M44 12 c3.5 4.5 3.5 19.5 0 24" opacity="0.45" />
    </svg>
  )
}

export function PlayScreenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="4" y="10" width="40" height="28" rx="6" />
      <path d="M20 18 l11 6 -11 6 z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BrowserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="5" y="8" width="38" height="32" rx="3" />
      <path d="M5 16 h38" />
      <circle cx="11" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 24 h14 M12 30 h10" opacity="0.5" />
      <path d="M30 26 l7 7 -3 .8 2 4 -2.6 1.2 -2 -4.3 -2.4 2.3 z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MultiDeviceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...stroke}>
      <rect x="4" y="9" width="30" height="21" rx="2.5" />
      <path d="M14 36 h10 M19 30 v6" />
      <rect x="32" y="20" width="12" height="20" rx="2.5" fill="#0c0c0c" />
      <path d="M36 36 h4" opacity="0.6" />
    </svg>
  )
}

/* ───────── Q2 — light swatches: tiny lighting "scenes" */

export function LightSwatch({ variant }: { variant: 'golden' | 'hard' | 'clean' | 'moody' }) {
  if (variant === 'golden')
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(160deg,#f3bd6d 0%,#d98a3d 45%,#5d2f12 100%)' }}>
        <motion.div
          className="absolute rounded-full"
          style={{ width: 64, height: 64, top: 8, right: 12, background: 'radial-gradient(circle,#fff7e0 0%,#ffd789 35%,transparent 70%)' }}
          animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.12, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(to top,rgba(20,8,0,.55),transparent)' }} />
        <motion.div
          className="absolute h-px w-full"
          style={{ top: '38%', background: 'linear-gradient(90deg,transparent,#ffe9b8,transparent)' }}
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    )
  if (variant === 'hard')
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ background: '#c9cdd1' }}>
        <div className="absolute inset-0" style={{ background: '#101114', clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 22% 100%)' }} />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 5px,rgba(0,0,0,.18) 5px,rgba(0,0,0,.18) 6px)' }} />
        <motion.div
          className="absolute top-3 w-2 h-2 rounded-full bg-[#101114]"
          animate={{ left: ['18%', '30%', '18%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    )
  if (variant === 'clean')
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#f2efe8 0%,#d8d2c4 100%)' }}>
        <motion.div
          className="absolute rounded-full"
          style={{ width: 110, height: 60, top: '24%', left: '14%', background: 'radial-gradient(ellipse,rgba(255,255,255,.9),transparent 70%)' }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute bottom-0 inset-x-0 h-1/4" style={{ background: 'linear-gradient(to top,rgba(120,112,96,.30),transparent)' }} />
      </div>
    )
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(150deg,#0b1020 0%,#14233b 55%,#061018 100%)' }}>
      <motion.div
        className="absolute inset-y-0 right-0 w-1.5"
        style={{ background: 'linear-gradient(to bottom,#e94f9e,#5ad7e8)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 70, height: 70, bottom: -22, left: 10, background: 'radial-gradient(circle,rgba(90,215,232,.5),transparent 70%)', filter: 'blur(2px)' }}
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 34px rgba(0,0,0,.8)' }} />
    </div>
  )
}

/* ───────── Q4 — animated waveforms, one rhythm per genre */

const wavePatterns: Record<string, { peaks: number[]; dur: number; stagger: number; ease: 'easeInOut' | 'circOut' | 'linear' }> = {
  rnb: { peaks: [0.45, 0.6, 0.75, 0.9, 1, 0.9, 0.75, 0.6, 0.5, 0.6, 0.75, 0.9, 1, 0.85, 0.65, 0.5], dur: 2.4, stagger: 0.12, ease: 'easeInOut' },
  hiphop: { peaks: [1, 0.35, 0.85, 0.3, 1, 0.4, 0.9, 0.3, 1, 0.35, 0.8, 0.3, 1, 0.4, 0.9, 0.35], dur: 0.5, stagger: 0.03, ease: 'circOut' },
  ambient: { peaks: [0.5, 0.55, 0.62, 0.7, 0.78, 0.85, 0.9, 0.95, 0.95, 0.9, 0.85, 0.78, 0.7, 0.62, 0.55, 0.5], dur: 4.5, stagger: 0.2, ease: 'easeInOut' },
  pop: { peaks: [0.6, 0.9, 0.5, 0.95, 0.55, 0.85, 0.6, 1, 0.6, 0.9, 0.5, 0.95, 0.55, 0.85, 0.6, 1], dur: 0.9, stagger: 0.06, ease: 'easeInOut' },
}

export function Waveform({ variant, active }: { variant: keyof typeof wavePatterns; active?: boolean }) {
  const p = wavePatterns[variant]
  return (
    <div className="flex items-center gap-[3px] h-12">
      {p.peaks.map((peak, i) => (
        <motion.span
          key={i}
          className={`w-[3px] rounded-full ${active ? 'bg-ember' : 'bg-bone/55'}`}
          style={{ height: '100%', originY: 0.5 }}
          animate={{ scaleY: [peak * 0.3, peak, peak * 0.3] }}
          transition={{ duration: p.dur, delay: i * p.stagger, repeat: Infinity, ease: p.ease }}
        />
      ))}
    </div>
  )
}

/* ───────── Q5 — film strip that flickers faster as the slider moves */

export function Filmstrip({ speed }: { speed: number }) {
  // speed 0..1 → frame cycle 1.6s (slow burn) → 0.22s (rapid fire)
  const dur = 1.6 - speed * 1.38
  const frames = 8
  return (
    <div key={Math.round(speed * 10)} className="w-full select-none">
      <div className="flex justify-between mb-1 px-0.5">
        {Array.from({ length: frames * 2 }).map((_, i) => (
          <span key={i} className="w-1 h-1 bg-bone/25 rounded-[1px]" />
        ))}
      </div>
      <div className="relative flex gap-1.5 border-y-2 border-bone/20 py-1.5">
        {Array.from({ length: frames }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 aspect-[4/3] bg-ember/80"
            animate={{ opacity: [0.12, 1, 0.12] }}
            transition={{ duration: dur, delay: (i * dur) / frames, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <motion.div
          className="absolute inset-y-0 w-0.5 bg-bone"
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="flex justify-between mt-1 px-0.5">
        {Array.from({ length: frames * 2 }).map((_, i) => (
          <span key={i} className="w-1 h-1 bg-bone/25 rounded-[1px]" />
        ))}
      </div>
    </div>
  )
}

/* ───────── Q6 — liquid capsules that fill on tap */

export function LiquidCapsule({ level, active }: { level: number; active: boolean }) {
  return (
    <div
      className={`relative w-16 h-32 md:w-20 md:h-40 rounded-full border overflow-hidden transition-colors duration-300 ${
        active ? 'border-ember' : 'border-bone/20'
      }`}
    >
      <motion.div
        className="absolute bottom-0 inset-x-0"
        initial={false}
        animate={{ height: active ? `${level * 100}%` : '6%' }}
        transition={{ duration: 0.9, ease: [0.34, 1.3, 0.5, 1] }}
        style={{ background: 'linear-gradient(to top,#a95f2e,#c87f4a 60%,#e0a06a)' }}
      >
        {/* bobbing liquid surface */}
        <motion.svg
          viewBox="0 0 80 12"
          preserveAspectRatio="none"
          className="absolute -top-[9px] left-0 w-[200%] h-[10px]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M0 6 Q10 0 20 6 T40 6 T60 6 T80 6 V12 H0 Z" fill="#e0a06a" />
        </motion.svg>
        <motion.div
          className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ y: [0, -10], opacity: [0.7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>
      <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 14px rgba(0,0,0,.55)' }} />
    </div>
  )
}

/* ───────── Q7 — aperture that opens with budget */

export function Aperture({ open }: { open: number }) {
  // Trapezoid-blade iris (adapted from the UX Pilot concept): blades retreat
  // outward as `open` grows, and a glowing light core widens behind them.
  const cx = 100
  const cy = 100
  const outerR = 82
  const innerR = 14 + open * 52 // 14 → 66
  const bladeCount = 6
  const spring = { type: 'spring' as const, stiffness: 170, damping: 22 }

  const bladePoints = (i: number) => {
    const angle = (i / bladeCount) * Math.PI * 2
    const nextAngle = ((i + 1) / bladeCount) * Math.PI * 2
    const midAngle = (angle + nextAngle) / 2
    const bladeInset = innerR + 2
    const bladeOuter = outerR - 2
    const p1x = cx + Math.cos(angle) * bladeOuter
    const p1y = cy + Math.sin(angle) * bladeOuter
    const p2x = cx + Math.cos(nextAngle) * bladeOuter
    const p2y = cy + Math.sin(nextAngle) * bladeOuter
    const p3x = cx + Math.cos(midAngle + 0.25) * bladeInset
    const p3y = cy + Math.sin(midAngle + 0.25) * bladeInset
    const p4x = cx + Math.cos(midAngle - 0.25) * bladeInset
    const p4y = cy + Math.sin(midAngle - 0.25) * bladeInset
    return `${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`
  }

  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2 - Math.PI / 2
    const isLong = i % 4 === 0
    const r1 = outerR + 2
    const r2 = outerR + (isLong ? 9 : 5)
    return (
      <line
        key={i}
        x1={cx + Math.cos(angle) * r1}
        y1={cy + Math.sin(angle) * r1}
        x2={cx + Math.cos(angle) * r2}
        y2={cy + Math.sin(angle) * r2}
        stroke={isLong ? '#c87f4a' : '#3a3a3a'}
        strokeWidth={isLong ? 1.2 : 0.6}
        opacity={isLong ? 0.8 : 0.4}
      />
    )
  })

  return (
    <svg viewBox="0 0 200 200" className="w-52 h-52 md:w-64 md:h-64" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="apv3-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0a06a" stopOpacity={0.15 + open * 0.55} />
          <stop offset="60%" stopColor="#c87f4a" stopOpacity={(0.15 + open * 0.55) * 0.5} />
          <stop offset="100%" stopColor="#c87f4a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="apv3-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9c4" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#e0a06a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8b4513" stopOpacity="0.4" />
        </radialGradient>
        <filter id="apv3-blur">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="apv3-clip">
          <circle cx={cx} cy={cy} r={outerR} />
        </clipPath>
      </defs>

      {/* outer decorative rings + ticks */}
      <circle cx={cx} cy={cy} r={outerR + 12} fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.6" />
      <circle cx={cx} cy={cy} r={outerR + 6} fill="none" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.4" />
      {ticks}

      {/* lens body */}
      <circle cx={cx} cy={cy} r={outerR} fill="#0e0e0e" stroke="#3a3a3a" strokeWidth="1.5" />

      {/* light core behind the blades */}
      <motion.circle
        cx={cx}
        cy={cy}
        fill="url(#apv3-core)"
        filter="url(#apv3-blur)"
        animate={{ r: innerR }}
        transition={spring}
      />
      <motion.circle cx={cx} cy={cy} fill="url(#apv3-glow)" animate={{ r: innerR + 10 }} transition={spring} />

      {/* iris blades */}
      <g clipPath="url(#apv3-clip)">
        {Array.from({ length: bladeCount }, (_, i) => (
          <motion.polygon
            key={i}
            fill="#26262a"
            stroke="#141416"
            strokeWidth="0.8"
            animate={{ points: bladePoints(i) }}
            transition={spring}
          />
        ))}
      </g>

      {/* aperture edge highlight */}
      <motion.circle
        cx={cx}
        cy={cy}
        fill="none"
        stroke="#c87f4a"
        strokeWidth="0.9"
        opacity="0.65"
        animate={{ r: innerR }}
        transition={spring}
      />
      <circle cx={cx} cy={cy} r="2" fill="#c87f4a" opacity="0.8" />
    </svg>
  )
}

/* ───────── Intro — viewfinder ornament */

export function Viewfinder() {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72">
      {/* corner brackets */}
      {[
        'top-0 left-0 border-t-2 border-l-2',
        'top-0 right-0 border-t-2 border-r-2',
        'bottom-0 left-0 border-b-2 border-l-2',
        'bottom-0 right-0 border-b-2 border-r-2',
      ].map((pos) => (
        <div key={pos} className={`absolute w-8 h-8 border-bone/50 ${pos}`} />
      ))}
      {/* crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-px bg-bone/30 absolute -left-5 top-0" />
        <div className="h-10 w-px bg-bone/30 absolute left-0 -top-5" />
      </div>
      {/* REC */}
      <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-bone/60">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        REC
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.25em] text-bone/40">
        4K · 23.98
      </div>
      <motion.div
        className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.25em] text-ember"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        A·CAM
      </motion.div>
    </div>
  )
}
