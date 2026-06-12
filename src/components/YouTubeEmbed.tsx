import { useState } from 'react'
import { Play } from 'lucide-react'

type Props = {
  videoId: string
  title: string
  vertical?: boolean
  className?: string
}

/**
 * Lite YouTube embed — shows the thumbnail until clicked, then swaps in the
 * real iframe with autoplay. Keeps page load fast and avoids YouTube cookies
 * until the visitor opts in by pressing play.
 */
export default function YouTubeEmbed({ videoId, title, vertical = false, className = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  const aspect = vertical ? 'aspect-[9/16]' : 'aspect-video'

  if (playing) {
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-ink-900 ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
      className={`group relative ${aspect} w-full overflow-hidden bg-ink-900 cursor-pointer text-left ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/${vertical ? 'oar2' : 'maxresdefault'}.jpg`}
        onError={(e) => {
          const img = e.currentTarget
          if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        }}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink-950/30 group-hover:bg-ink-950/15 transition-colors duration-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bone/95 text-ink-950 flex items-center justify-center group-hover:bg-ember group-hover:scale-110 transition-all duration-300">
          <Play size={22} className="ml-1" fill="currentColor" />
        </div>
      </div>
    </button>
  )
}
