import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Mail, Copy, Check, RotateCcw } from 'lucide-react'
import PageShell from '../components/PageShell'
import { questions, scoreAnswers, recommendPackage, buildBrief } from '../data/quiz'
import type { Option } from '../data/quiz'
import { socials, bookingEmail } from '../data/site'
import { InstagramIcon } from '../components/SocialIcons'

const ease = [0.22, 1, 0.36, 1] as const

export default function FindYourFrame() {
  const [step, setStep] = useState(-1) // -1 = intro, 0..n-1 = questions, n = results
  const [answers, setAnswers] = useState<Option[]>([])
  const [name, setName] = useState('')
  const [copied, setCopied] = useState(false)

  const done = step >= questions.length
  const archetype = useMemo(() => (done ? scoreAnswers(answers) : null), [done, answers])
  const pkg = useMemo(
    () => (archetype ? recommendPackage(archetype, answers, questions) : ''),
    [archetype, answers],
  )
  const brief = useMemo(
    () => (archetype ? buildBrief(archetype, pkg, answers, questions, name) : ''),
    [archetype, pkg, answers, name],
  )

  const pick = (opt: Option) => {
    const next = [...answers]
    next[step] = opt
    setAnswers(next)
    setStep(step + 1)
  }

  const back = () => setStep(Math.max(-1, step - 1))

  const restart = () => {
    setAnswers([])
    setName('')
    setStep(-1)
    setCopied(false)
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

  const progress = Math.max(0, Math.min(step, questions.length)) / questions.length

  return (
    <PageShell title="Find Your Frame">
      <section className="min-h-screen flex flex-col bg-ink-950 pt-28 md:pt-36 pb-16">
        {/* Timecode progress bar */}
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
            {/* ───────── Intro */}
            {step === -1 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
                className="max-w-3xl"
              >
                <p className="eyebrow mb-6">
                  <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                  60 seconds · 7 questions
                </p>
                <h1 className="display text-[clamp(3rem,8vw,8rem)] mb-8">
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
                <button onClick={() => setStep(0)} className="btn-primary">
                  Roll camera <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* ───────── Questions */}
            {step >= 0 && !done && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease }}
                className="max-w-3xl"
              >
                <p className="eyebrow mb-6">
                  <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                  {questions[step].briefLabel}
                </p>
                <h2 className="display text-4xl md:text-6xl mb-10">{questions[step].prompt}</h2>
                <div className="grid gap-3 md:gap-4">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={opt.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease }}
                      onClick={() => pick(opt)}
                      className={`group text-left border px-6 py-5 transition-all duration-300 ${
                        answers[step]?.label === opt.label
                          ? 'border-ember bg-ember/10'
                          : 'border-bone/15 hover:border-ember hover:bg-ink-900'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-bone/85 text-base md:text-lg">{opt.label}</span>
                        <ArrowRight
                          size={16}
                          className="text-bone/30 group-hover:text-ember group-hover:translate-x-1 transition-all flex-shrink-0"
                        />
                      </span>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={back}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 hover:text-bone transition-colors"
                >
                  <ArrowLeft size={12} /> Back
                </button>
              </motion.div>
            )}

            {/* ───────── Results */}
            {done && archetype && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  {/* Result image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease }}
                    className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-ink-800"
                  >
                    <img
                      src={archetype.image}
                      alt={archetype.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ember mb-1">
                        Your frame
                      </p>
                      <p className="font-display italic text-2xl md:text-3xl">{archetype.name}</p>
                    </div>
                  </motion.div>

                  {/* Result copy + brief */}
                  <div className="lg:col-span-6 lg:col-start-7">
                    <p className="eyebrow mb-4">
                      <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
                      {archetype.tagline}
                    </p>
                    <h1 className="display text-4xl md:text-6xl mb-6">
                      {archetype.name.replace('The ', 'The ')}
                    </h1>
                    <p className="text-bone/65 text-base md:text-lg leading-relaxed mb-8">
                      {archetype.description}
                    </p>

                    <div className="border border-bone/15 bg-ink-900 p-6 md:p-7 mb-8">
                      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-4">
                        Your shoot brief
                      </p>
                      <ul className="space-y-1.5 text-sm text-bone/75 font-mono">
                        {questions.map((q, i) => (
                          <li key={q.id} className="flex justify-between gap-6">
                            <span className="text-bone/40">{q.briefLabel}</span>
                            <span className="text-right">{answers[i]?.brief}</span>
                          </li>
                        ))}
                        <li className="flex justify-between gap-6 pt-2 border-t border-bone/10 mt-2">
                          <span className="text-bone/40">Recommended</span>
                          <span className="text-ember text-right">{pkg}</span>
                        </li>
                      </ul>
                    </div>

                    <label className="block mb-6">
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

                    <div className="flex flex-wrap gap-3">
                      <button onClick={mailto} className="btn-primary">
                        <Mail size={14} /> Email this to Fendi
                      </button>
                      <button onClick={copyForDM} className="btn-ghost">
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied — paste it in the DM' : 'Copy & DM on Instagram'}
                      </button>
                    </div>

                    <div className="mt-8 flex items-center gap-8">
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

                    <p className="mt-6 flex items-center gap-2 text-bone/35 text-xs">
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
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  )
}
