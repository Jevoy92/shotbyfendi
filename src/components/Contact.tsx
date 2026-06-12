import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const [k, v] of data.entries()) {
      if (typeof v === 'string') params.set(k, v)
    }
    const subject = `New booking inquiry — ${params.get('name') || 'Website'}`
    const body = [
      `Name: ${params.get('name') || ''}`,
      `Email: ${params.get('email') || ''}`,
      `Project type: ${params.get('project') || ''}`,
      `Budget: ${params.get('budget') || ''}`,
      '',
      params.get('message') || '',
    ].join('\n')
    window.location.href = `mailto:hello@shotbyfendi.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-ink-950">
      <div className="container-wide">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="eyebrow mb-4">
              <span className="inline-block w-6 h-px bg-ember mr-3 align-middle" />
              06 · Get in touch
            </p>
            <h2 className="display text-5xl md:text-8xl mb-8 md:mb-12">
              Let's
              <br />
              <span className="italic">work.</span>
            </h2>

            <p className="text-bone/60 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              The fastest reply is via Instagram DM. For serious project inquiries,
              drop the details below — I'll be back within 24 hours.
            </p>

            <div className="space-y-5">
              <a
                href="https://instagram.com/shot_by_fendi"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 text-bone hover:text-ember transition-colors"
              >
                <div className="w-12 h-12 border border-bone/20 group-hover:border-ember flex items-center justify-center transition-colors">
                  <InstagramIcon size={18} />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-0.5">
                    Instagram
                  </p>
                  <p className="font-display italic text-xl">@shot_by_fendi</p>
                </div>
              </a>
              <a
                href="mailto:hello@shotbyfendi.com"
                className="group flex items-center gap-4 text-bone hover:text-ember transition-colors"
              >
                <div className="w-12 h-12 border border-bone/20 group-hover:border-ember flex items-center justify-center transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/40 mb-0.5">
                    Email
                  </p>
                  <p className="font-display italic text-xl">hello@shotbyfendi.com</p>
                </div>
              </a>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            onSubmit={handleSubmit}
            className="md:col-span-6 md:col-start-7 space-y-8"
          >
            <Field name="name" label="Your name" required />
            <Field name="email" type="email" label="Email" required />
            <Field
              name="project"
              label="What are we making?"
              placeholder="Brand film · music video · monthly content…"
            />
            <Field name="budget" label="Budget range (optional)" placeholder="$ — $$$ " />
            <div>
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/50 block mb-3">
                The details
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full bg-transparent border-b border-bone/20 focus:border-ember outline-none py-3 text-bone placeholder:text-bone/30 resize-none transition-colors"
                placeholder="Tell me about the project, the vibe, the deadline…"
              />
            </div>

            <button type="submit" className="btn-primary w-full md:w-auto">
              {sent ? 'Opening email…' : 'Send the inquiry'}
              <ArrowRight size={14} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-bone/50 block mb-3">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-bone/20 focus:border-ember outline-none py-3 text-bone placeholder:text-bone/30 transition-colors"
      />
    </div>
  )
}
