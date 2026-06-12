import { socials } from '../data/site'
import { InstagramIcon, YouTubeIcon, FacebookIcon } from './SocialIcons'

export default function SocialRow({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a
        href={socials.instagram.url}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="text-bone/50 hover:text-ember transition-colors"
      >
        <InstagramIcon size={size} />
      </a>
      <a
        href={socials.youtube.url}
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
        className="text-bone/50 hover:text-ember transition-colors"
      >
        <YouTubeIcon size={size} />
      </a>
      <a
        href={socials.facebook.url}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="text-bone/50 hover:text-ember transition-colors"
      >
        <FacebookIcon size={size} />
      </a>
    </div>
  )
}
