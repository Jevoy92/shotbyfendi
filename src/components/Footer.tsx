import { Link } from 'react-router-dom'
import { socials } from '../data/site'
import { InstagramIcon, YouTubeIcon, FacebookIcon } from './SocialIcons'

const pages = [
  { to: '/work', label: 'Work' },
  { to: '/case-study', label: 'Case Study' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-ink-950 border-t border-bone/10">
      <div className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <p className="font-display italic text-5xl md:text-7xl leading-none mb-6">
              Shop by Fendi
            </p>
            <p className="text-bone/50 text-sm max-w-sm">
              Cinematic videography for brands, artists, and creatives. Based in
              Seattle — available worldwide.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Pages</p>
            <ul className="space-y-2 text-sm text-bone/70">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="hover:text-ember transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Follow</p>
            <ul className="space-y-3 text-sm text-bone/70">
              <li>
                <a
                  href={socials.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-ember transition-colors"
                >
                  <InstagramIcon size={16} /> {socials.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={socials.youtube.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-ember transition-colors"
                >
                  <YouTubeIcon size={16} /> {socials.youtube.handle}
                </a>
              </li>
              <li>
                <a
                  href={socials.facebook.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-ember transition-colors"
                >
                  <FacebookIcon size={16} /> {socials.facebook.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-bone/40 font-mono text-[10px] tracking-[0.25em] uppercase">
          <p>© {year} Joshua Buck · Shop by Fendi</p>
          <p>Seattle, WA</p>
        </div>
      </div>
    </footer>
  )
}
