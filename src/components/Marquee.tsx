const tags = [
  'Brand Films',
  'Music Videos',
  'Short-Form Content',
  'Creative Direction',
  'Product · Lifestyle · Editorial',
  'Available Worldwide',
]

export default function Marquee() {
  const items = [...tags, ...tags, ...tags]
  return (
    <section className="border-y border-bone/10 py-8 md:py-10 overflow-hidden bg-ink-950">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {items.map((t, i) => (
          <span
            key={i}
            className="font-display italic text-3xl md:text-5xl text-bone/80 px-8 md:px-12 flex items-center gap-8 md:gap-12"
          >
            {t}
            <span className="text-ember">✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}
