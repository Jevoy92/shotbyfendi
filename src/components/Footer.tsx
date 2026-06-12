export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-ink-950 border-t border-bone/10">
      <div className="container-wide py-10 md:py-14">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="font-display italic text-5xl md:text-8xl leading-none">
              Shop by Fendi
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="eyebrow mb-3">Studio</p>
              <ul className="space-y-1.5 text-bone/70">
                <li>Seattle, WA</li>
                <li>Available worldwide</li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Follow</p>
              <ul className="space-y-1.5 text-bone/70">
                <li>
                  <a
                    href="https://instagram.com/shot_by_fendi"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ember transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@shotbyfendi.com"
                    className="hover:text-ember transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-bone/40 font-mono text-[10px] tracking-[0.25em] uppercase">
          <p>© {year} Joshua Buck · Shop by Fendi</p>
          <p>Built in Seattle · {new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()} {year}</p>
        </div>
      </div>
    </footer>
  )
}
