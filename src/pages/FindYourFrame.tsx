import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Mail, Copy, Check, RotateCcw } from 'lucide-react'
import PageShell from '../components/PageShell'
import {
  questions,
  archetypes,
  scoreAnswers,
  scoreTotals,
  recommendPackage,
  buildBrief,
  readiness,
  playbook,
} from '../data/quiz'
import { ensureAudio, playSample, stopSample } from '../components/quiz/audio'
import type { Option, ArchetypeKey } from '../data/quiz'
import { socials, bookingEmail } from '../data/site'
import { InstagramIcon } from '../components/SocialIcons'
import {
  ClapperIcon,
  VinylIcon,
  PhoneBatchIcon,
  CrowdIcon,
  PhoneVerticalIcon,
  PlayScreenIcon,
  BrowserIcon,
  MultiDeviceIcon,
  LightSwatch,
  Waveform,
  Filmstrip,
  LiquidCapsule,
  Aperture,
  Viewfinder,
} from '../components/quiz/Graphics'

const ease = [0.22, 1, 0.36, 1] as const

/* per-question visual config, keyed by question id + option index */
const typeIcons = [ClapperIcon, VinylIcon, PhoneBatchIcon, CrowdIcon]
const platformIcons = [PhoneVerticalIcon, PlayScreenIcon, BrowserIcon, MultiDeviceIcon]
const swatchVariants = ['golden', 'hard', 'clean', 'moody'] as const
const waveVariants = ['rnb', 'hiphop', 'ambient', 'pop'] as const
const liquidLevels = [1, 0.72, 0.45, 0.18]

export default function FindYourFrame() {
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState<Option[]>([])
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)
  const [paceVal, setPaceVal] = useState(50)
  const [budgetVal, setBudgetVal] = useState(50)
  const advancing = useRef(false)

  const done = step >= questions.length
  const archetype = useMemo(() => (done ? scoreAnswers(answers) : null), [done, answers])
  const totals = useMemo(() => (done ? scoreTotals(answers) : null), [done, answers])
  const pkg = useMemo(
    () => (archetype ? recommendPackage(archetype, answers, questions) : ''),
    [archetype, answers],
  )
  const brief = useMemo(
    () => (archetype ? buildBrief(archetype, pkg, answers, questions, name) : ''),
    [archetype, pkg, answers, name],
  )
  const status = useMemo(() => (done ? readiness(answers, questions) : null), [done, answers])
  const moves = useMemo(
    () => (archetype ? playbook(archetype, answers, questions) : []),
    [archetype, answers],
  )

  const setAnswer = (opt: Option) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
  }

  /** Tap-kinds: select, let the graphic react, then advance. */
  const pickAndAdvance = (opt: Option, delay = 550) => {
    if (advancing.current) return
    advancing.current = true
    ensureAudio() // user gesture — unlocks hover audio previews for later questions
    stopSample()
    setAnswer(opt)
    setTimeout(() => {
      advancing.current = false
      setStep((s) => s + 1)
    }, delay)
  }

  const back = () => setStep((s) => Math.max(-1, s - 1))
  const restart = () => {
    setAnswers([])
    setName('')
    setStep(-1)
    setCopied(false)
    setPaceVal(50)
    setBudgetVal(50)
  }

  const mailto = () => {
    const subject = `Shoot inquiry — ${archetype?.name ?? 'Find Your Frame'}${name ? ` (${name})` : ''}`
    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`
  }

  const copyForDM = async () => {
    try {
      await navigator.clipboard.writeText(brief)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
      window.open(socials.instagram.url, '_blank', 'noopener')
    } catch {
      setCopied(false)
    }
  }

  const q = step >= 0 && !done ? questions[step] : null
  const paceIdx = paceVal < 34 ? 0 : paceVal < 67 ? 2 : 1 // slow / build / fast (slider order)
  const budgetIdx = budgetVal < 34 ? 0 : budgetVal < 67 ? 1 : 2
  const progress = Math.max(0, Math.min(step, questions.length)) / questions.length

  return (
    <PageShell title="Find Your Frame">
      <section className="min-h-screen flex flex-col bg-ink-950 pt-28 md:pt-36 pb-16">
        {/* Timecode progress */}
        <div className="container-wide w-full mb-10 md:mb-14">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-3">
            <span>Find Your Frame</span>
            <span>
              {done
                ? 'CUT — that’s a wrap'
                : step < 0
                  ? 'Standing by'
                  : `Q${String(step + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`}
            </span>
          </div>
          <div className="h-px bg-bone/10 relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ember"
              animate={{ width: `${(done ? 1 : progress) * 100}%` }}
              transition={{ duration: 0.5, ease }}
            />
          </div>
        </div>

        <div className="container-wide w-full flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* ─────────── Intro */}
            {step === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
                className="grid lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7">
                  <p className="eyebrow mb-6">
                    <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                    60 seconds · 7 questions
                  </p>
                  <h1 className="display text-[clamp(3rem,7.5vw,7.5rem)] mb-8">
                    What does your
                    <br />
                    <span className="italic text-ember">story look like?</span>
                  </h1>
                  <p className="text-bone/60 text-base md:text-lg leading-relaxed max-w-xl mb-10">
                    Seven quick picks — light, sound, pace — and we'll cut together
                    your visual style, match it to a package, and build a shoot
                    brief you can send straight to Fendi. No wrong answers, only
                    wrong lenses.
                  </p>
                  <button
                    onClick={() => {
                      ensureAudio()
                      setStep(0)
                    }}
                    className="btn-primary"
                  >
                    Roll camera <ArrowRight size={14} />
                  </button>
                </div>
                <div className="hidden lg:flex lg:col-span-5 justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Viewfinder />
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ─────────── Questions */}
            {q && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease }}
                className="w-full max-w-5xl"
              >
                <p className="eyebrow mb-5">
                  <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                  {q.briefLabel}
                </p>
                <h2 className="display text-4xl md:text-6xl mb-10 md:mb-12">{q.prompt}</h2>

                {/* icons — custom SVG cards */}
                {q.kind === 'icons' && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {q.options.map((opt, i) => {
                      const Icon = (q.id === 'type' ? typeIcons : platformIcons)[i]
                      const selected = answers[step]?.label === opt.label
                      return (
                        <motion.button
                          key={opt.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease }}
                          onClick={() => pickAndAdvance(opt)}
                          className={`group border p-5 md:p-6 text-left min-h-[180px] md:min-h-[210px] flex flex-col justify-between transition-all duration-300 ${
                            selected
                              ? 'border-ember bg-ember/10 text-ember'
                              : 'border-bone/15 text-bone/70 hover:border-ember hover:text-bone hover:bg-ink-900'
                          }`}
                        >
                          <Icon className="w-12 h-12 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                          <span className="text-sm md:text-base leading-snug text-bone/85 mt-6">
                            {opt.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {/* swatch — light scenes */}
                {q.kind === 'swatch' && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {q.options.map((opt, i) => {
                      const selected = answers[step]?.label === opt.label
                      return (
                        <motion.button
                          key={opt.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease }}
                          onClick={() => pickAndAdvance(opt)}
                          className={`group text-left border transition-all duration-300 overflow-hidden ${
                            selected ? 'border-ember' : 'border-bone/15 hover:border-ember'
                          }`}
                        >
                          <div className="h-28 md:h-36 w-full transition-transform duration-700 group-hover:scale-[1.04]">
                            <LightSwatch variant={swatchVariants[i]} />
                          </div>
                          <span className="block px-4 py-3.5 text-sm md:text-base text-bone/85 leading-snug bg-ink-900">
                            {opt.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {/* wave — animated genre waveforms */}
                {q.kind === 'wave' && (
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    {q.options.map((opt, i) => {
                      const selected = answers[step]?.label === opt.label
                      return (
                        <motion.button
                          key={opt.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease }}
                          onClick={() => pickAndAdvance(opt)}
                          onMouseEnter={() => playSample(waveVariants[i])}
                          onMouseLeave={stopSample}
                          onFocus={() => playSample(waveVariants[i])}
                          onBlur={stopSample}
                          className={`border px-6 py-5 flex items-center justify-between gap-6 transition-all duration-300 ${
                            selected
                              ? 'border-ember bg-ember/10'
                              : 'border-bone/15 hover:border-ember hover:bg-ink-900'
                          }`}
                        >
                          <span className="text-sm md:text-base text-bone/85 text-left leading-snug">
                            {opt.label}
                          </span>
                          <Waveform variant={waveVariants[i]} active={selected} />
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {/* slider — edit pace with live filmstrip */}
                {q.kind === 'slider' && (
                  <div className="max-w-2xl">
                    <div className="mb-10">
                      <Filmstrip speed={paceVal / 100} />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={paceVal}
                      onChange={(e) => setPaceVal(Number(e.target.value))}
                      className="quiz-slider"
                      aria-label="Edit pace"
                    />
                    <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40 mt-3">
                      <span>Slow burn</span>
                      <span>Rapid fire</span>
                    </div>
                    <p className="font-display italic text-2xl md:text-3xl text-ember mt-8 min-h-[2.5rem]">
                      {q.options[paceIdx].label}
                    </p>
                    <button onClick={() => pickAndAdvance(q.options[paceIdx], 250)} className="btn-primary mt-8">
                      Lock it in <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {/* liquid — urgency capsules */}
                {q.kind === 'liquid' && (
                  <div className="flex flex-wrap gap-6 md:gap-10">
                    {q.options.map((opt, i) => {
                      const selected = answers[step]?.label === opt.label
                      return (
                        <motion.button
                          key={opt.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease }}
                          onClick={() => pickAndAdvance(opt, 1000)}
                          className="group flex flex-col items-center gap-4 text-center"
                        >
                          <LiquidCapsule level={liquidLevels[i]} active={selected} />
                          <span
                            className={`text-xs md:text-sm max-w-[7.5rem] leading-snug transition-colors ${
                              selected ? 'text-ember' : 'text-bone/65 group-hover:text-bone'
                            }`}
                          >
                            {opt.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                )}

                {/* aperture — budget */}
                {q.kind === 'aperture' && (
                  <div className="grid md:grid-cols-12 gap-10 items-center max-w-3xl">
                    <div className="md:col-span-5 flex justify-center">
                      <Aperture open={budgetVal / 100} />
                    </div>
                    <div className="md:col-span-7">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={budgetVal}
                        onChange={(e) => setBudgetVal(Number(e.target.value))}
                        className="quiz-slider"
                        aria-label="Budget range"
                      />
                      <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40 mt-3">
                        <span>f/16</span>
                        <span>Wide open</span>
                      </div>
                      <p className="font-display italic text-2xl md:text-3xl text-ember mt-8 min-h-[2.5rem]">
                        {q.options[budgetIdx].label}
                      </p>
                      <div className="flex flex-wrap items-center gap-5 mt-8">
                        <button onClick={() => pickAndAdvance(q.options[budgetIdx], 250)} className="btn-primary">
                          Lock it in <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={() => pickAndAdvance(q.options[3], 250)}
                          className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 hover:text-bone transition-colors"
                        >
                          Not sure — advise me
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={back}
                  className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 hover:text-bone transition-colors"
                >
                  <ArrowLeft size={12} /> Back
                </button>
              </motion.div>
            )}

            {/* ─────────── Results */}
            {done && archetype && totals && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="w-full"
              >
                {/* Letterboxed hero — image stays clean, title sits below */}
                <div className="relative w-full h-[46vh] md:h-[60vh] overflow-hidden bg-ink-900">
                  <div className="absolute top-0 inset-x-0 h-5 md:h-8 bg-ink-950 z-10" />
                  <div className="absolute bottom-0 inset-x-0 h-5 md:h-8 bg-ink-950 z-10" />
                  <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease }}
                    src={archetype.image}
                    alt={archetype.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-ink-950/45" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-8 md:bottom-12 right-5 md:right-8 z-10 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/70 bg-ink-950/50 backdrop-blur-sm px-3 py-2"
                  >
                    Your frame · {String(new Date().getFullYear())}
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mt-12 md:mt-16">
                  {/* Left — title, tagline, DNA */}
                  <div className="lg:col-span-7">
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.7, ease }}
                      className="eyebrow mb-4"
                    >
                      <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                      {archetype.tagline}
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8, ease }}
                      className="display text-[clamp(2.6rem,6vw,6rem)] mb-6"
                    >
                      {archetype.name.startsWith('The ') ? (
                        <>
                          <span className="text-bone/45">The </span>
                          <span className="italic">{archetype.name.slice(4)}</span>
                        </>
                      ) : (
                        archetype.name
                      )}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.8, ease }}
                      className="text-bone/65 text-base md:text-lg leading-relaxed max-w-xl mb-12"
                    >
                      {archetype.description}
                    </motion.p>

                    {/* Production status — the quick-win verdict */}
                    {status && (
                      <div className="max-w-xl mb-12 border border-bone/15 bg-ink-900 p-6 md:p-7 relative overflow-hidden">
                        <div className="flex flex-wrap items-center gap-5 mb-4">
                          <motion.div
                            initial={{ scale: 2.2, opacity: 0, rotate: 6 }}
                            animate={{ scale: 1, opacity: 1, rotate: -3 }}
                            transition={{ delay: 1.1, type: 'spring', stiffness: 220, damping: 15 }}
                            className="border-2 border-ember text-ember font-mono text-sm md:text-base tracking-[0.3em] uppercase px-4 py-2"
                          >
                            {status.tier}
                          </motion.div>
                          <div className="flex-1 min-w-[120px]">
                            <div className="flex justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40 mb-1.5">
                              <span>Production readiness</span>
                              <span className="text-ember">{status.pct}%</span>
                            </div>
                            <div className="h-1.5 bg-bone/10 overflow-hidden">
                              <motion.div
                                className="h-full bg-ember"
                                initial={{ width: 0 }}
                                animate={{ width: `${status.pct}%` }}
                                transition={{ delay: 1.3, duration: 1, ease }}
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-bone/65 leading-relaxed">{status.note}</p>
                      </div>
                    )}

                    {/* First three moves — personalized playbook */}
                    {moves.length > 0 && (
                      <div className="max-w-xl mb-12">
                        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-5">
                          Your first three moves
                        </p>
                        <ol className="space-y-5">
                          {moves.map((m, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.4 + i * 0.15, duration: 0.7, ease }}
                              className="flex gap-5 items-baseline"
                            >
                              <span className="font-display italic text-3xl md:text-4xl text-ember leading-none">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <p className="text-sm md:text-base text-bone/70 leading-relaxed">{m}</p>
                            </motion.li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Style DNA meters */}
                    <div className="max-w-xl">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-5">
                        Your style DNA
                      </p>
                      {(Object.keys(archetypes) as ArchetypeKey[]).map((k, i) => {
                        const sum = Object.values(totals).reduce((a, b) => a + b, 0) || 1
                        const pct = Math.round((totals[k] / sum) * 100)
                        const winner = k === archetype.key
                        return (
                          <div key={k} className="mb-4">
                            <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase mb-1.5">
                              <span className={winner ? 'text-ember' : 'text-bone/50'}>
                                {archetypes[k].name.replace('The ', '')}
                              </span>
                              <span className={winner ? 'text-ember' : 'text-bone/35'}>{pct}%</span>
                            </div>
                            <div className="h-1.5 bg-bone/10 overflow-hidden">
                              <motion.div
                                className={`h-full ${winner ? 'bg-ember' : 'bg-bone/30'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ delay: 0.6 + i * 0.12, duration: 1, ease }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Right — call sheet + send */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, ease }}
                    className="lg:col-span-5"
                  >
                    <div className="border border-bone/15 bg-ink-900">
                      {/* slate stripe header */}
                      <div
                        className="h-4"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(135deg,#e8e4dc 0,#e8e4dc 14px,#0c0c0c 14px,#0c0c0c 28px)',
                        }}
                      />
                      <div className="p-6 md:p-7">
                        <div className="flex items-baseline justify-between mb-5">
                          <p className="font-display italic text-xl">Call Sheet</p>
                          <p className="font-mono text-[10px] tracking-[0.25em] text-bone/40 uppercase">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        <ul className="space-y-2 text-sm text-bone/75 font-mono">
                          {questions.map((qq, i) => (
                            <li key={qq.id} className="flex justify-between gap-6 border-b border-bone/5 pb-2">
                              <span className="text-bone/40">{qq.briefLabel}</span>
                              <span className="text-right">{answers[i]?.brief}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 bg-ember/10 border border-ember/40 px-4 py-3 flex items-baseline justify-between">
                          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/50">
                            Recommended
                          </span>
                          <span className="font-display italic text-lg text-ember">{pkg}</span>
                        </div>

                        <label className="block mt-6 mb-6">
                          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/50 block mb-2">
                            Your name or brand (optional)
                          </span>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="So Fendi knows who's reaching out"
                            className="w-full bg-transparent border-b border-bone/20 focus:border-ember outline-none py-2.5 text-bone placeholder:text-bone/30 transition-colors"
                          />
                        </label>

                        <div className="flex flex-col gap-3">
                          <button onClick={mailto} className="btn-primary justify-center">
                            <Mail size={14} /> Email this to Fendi
                          </button>
                          <button onClick={copyForDM} className="btn-ghost justify-center">
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied — paste it in the DM' : 'Copy & DM on Instagram'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 hover:text-bone transition-colors"
                      >
                        <RotateCcw size={12} /> Run it back
                      </button>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 hover:text-ember transition-colors"
                      >
                        See packages <ArrowRight size={12} />
                      </Link>
                    </div>
                    <p className="mt-5 flex items-center gap-2 text-bone/35 text-xs">
                      <InstagramIcon size={13} /> Prefer to just talk?{' '}
                      <a
                        href={socials.instagram.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-bone/60 hover:text-ember transition-colors"
                      >
                        {socials.instagram.handle}
                      </a>
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  )
}
