/* Tiny generative audio sampler for the soundtrack question.
   Everything is synthesized live with the Web Audio API — no files, no
   licensing, instant playback. Volumes are intentionally subtle.

   Browser autoplay policy: an AudioContext only runs after a user gesture,
   so ensureAudio() is called from quiz click handlers (Roll camera / picks).
   By the time the visitor reaches the soundtrack question, hover previews work. */

type SampleKind = 'rnb' | 'hiphop' | 'ambient' | 'pop'

let ctx: AudioContext | null = null
let current: { stop: () => void } | null = null

export function ensureAudio() {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctx = new AC()
    }
    if (ctx.state === 'suspended') void ctx.resume()
  } catch {
    ctx = null
  }
  return ctx
}

export function stopSample() {
  current?.stop()
  current = null
}

function master(c: AudioContext, level: number) {
  const g = c.createGain()
  g.gain.setValueAtTime(0, c.currentTime)
  g.gain.linearRampToValueAtTime(level, c.currentTime + 0.25)
  g.connect(c.destination)
  return g
}

function fadeOutAndDisconnect(c: AudioContext, g: GainNode, nodes: AudioNode[], timers: number[]) {
  return () => {
    timers.forEach((t) => clearInterval(t))
    const t = c.currentTime
    g.gain.cancelScheduledValues(t)
    g.gain.setValueAtTime(g.gain.value, t)
    g.gain.linearRampToValueAtTime(0, t + 0.12)
    setTimeout(() => {
      nodes.forEach((n) => {
        try {
          ;(n as OscillatorNode).stop?.()
        } catch { /* already stopped */ }
        n.disconnect()
      })
      g.disconnect()
    }, 180)
  }
}

function noiseBuffer(c: AudioContext) {
  const b = c.createBuffer(1, c.sampleRate * 0.5, c.sampleRate)
  const d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  return b
}

/* ── recipes ─────────────────────────────────────────────── */

function rnb(c: AudioContext) {
  // warm Bbmaj7 pad with slow tremolo
  const g = master(c, 0.05)
  const lp = c.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 900
  lp.connect(g)
  const freqs = [116.54, 174.61, 233.08, 293.66, 349.23]
  const nodes: AudioNode[] = [lp]
  freqs.forEach((f, i) => {
    const o = c.createOscillator()
    o.type = i === 0 ? 'sine' : 'triangle'
    o.frequency.value = f
    o.detune.value = (i - 2) * 4
    const og = c.createGain()
    og.gain.value = i === 0 ? 0.5 : 0.22
    o.connect(og)
    og.connect(lp)
    o.start()
    nodes.push(o, og)
  })
  const lfo = c.createOscillator()
  lfo.frequency.value = 0.6
  const lfoG = c.createGain()
  lfoG.gain.value = 0.015
  lfo.connect(lfoG)
  lfoG.connect(g.gain)
  lfo.start()
  nodes.push(lfo, lfoG)
  return { stop: fadeOutAndDisconnect(c, g, nodes, []) }
}

function hiphop(c: AudioContext) {
  // kick on the half-second, hats on 8ths, sustained sub
  const g = master(c, 0.09)
  const nodes: AudioNode[] = []
  const noise = noiseBuffer(c)

  const sub = c.createOscillator()
  sub.type = 'sine'
  sub.frequency.value = 58.27
  const subG = c.createGain()
  subG.gain.value = 0.12
  sub.connect(subG)
  subG.connect(g)
  sub.start()
  nodes.push(sub, subG)

  const kick = () => {
    const t = c.currentTime
    const o = c.createOscillator()
    const og = c.createGain()
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(48, t + 0.11)
    og.gain.setValueAtTime(0.9, t)
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.14)
    o.connect(og)
    og.connect(g)
    o.start(t)
    o.stop(t + 0.16)
  }
  const hat = () => {
    const t = c.currentTime
    const s = c.createBufferSource()
    s.buffer = noise
    const hp = c.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 7000
    const hg = c.createGain()
    hg.gain.setValueAtTime(0.18, t)
    hg.gain.exponentialRampToValueAtTime(0.001, t + 0.04)
    s.connect(hp)
    hp.connect(hg)
    hg.connect(g)
    s.start(t)
    s.stop(t + 0.05)
  }
  kick()
  const kTimer = window.setInterval(kick, 500)
  const hTimer = window.setInterval(hat, 250)
  return { stop: fadeOutAndDisconnect(c, g, nodes, [kTimer, hTimer]) }
}

function ambient(c: AudioContext) {
  // detuned drone + airy filtered noise, slow swell
  const g = master(c, 0.05)
  const nodes: AudioNode[] = []
  ;[220, 220.9, 329.63].forEach((f, i) => {
    const o = c.createOscillator()
    o.type = 'sine'
    o.frequency.value = f
    const og = c.createGain()
    og.gain.value = i === 2 ? 0.12 : 0.3
    o.connect(og)
    og.connect(g)
    o.start()
    nodes.push(o, og)
  })
  const s = c.createBufferSource()
  s.buffer = noiseBuffer(c)
  s.loop = true
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 1200
  bp.Q.value = 0.6
  const ng = c.createGain()
  ng.gain.value = 0.03
  s.connect(bp)
  bp.connect(ng)
  ng.connect(g)
  s.start()
  nodes.push(s, bp, ng)
  const lfo = c.createOscillator()
  lfo.frequency.value = 0.18
  const lfoG = c.createGain()
  lfoG.gain.value = 0.02
  lfo.connect(lfoG)
  lfoG.connect(g.gain)
  lfo.start()
  nodes.push(lfo, lfoG)
  return { stop: fadeOutAndDisconnect(c, g, nodes, []) }
}

function pop(c: AudioContext) {
  // bright plucked arpeggio
  const g = master(c, 0.07)
  const notes = [523.25, 659.25, 783.99, 987.77, 783.99, 659.25]
  let i = 0
  const pluck = () => {
    const t = c.currentTime
    const o = c.createOscillator()
    o.type = 'square'
    o.frequency.value = notes[i % notes.length]
    i++
    const lp = c.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(3200, t)
    lp.frequency.exponentialRampToValueAtTime(600, t + 0.16)
    const og = c.createGain()
    og.gain.setValueAtTime(0.25, t)
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
    o.connect(lp)
    lp.connect(og)
    og.connect(g)
    o.start(t)
    o.stop(t + 0.2)
  }
  pluck()
  const timer = window.setInterval(pluck, 170)
  return { stop: fadeOutAndDisconnect(c, g, [], [timer]) }
}

const recipes: Record<SampleKind, (c: AudioContext) => { stop: () => void }> = {
  rnb,
  hiphop,
  ambient,
  pop,
}

export function playSample(kind: SampleKind) {
  const c = ensureAudio()
  if (!c || c.state !== 'running') return
  stopSample()
  current = recipes[kind](c)
}
