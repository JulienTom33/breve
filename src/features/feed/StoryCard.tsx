import { FC, useState } from 'react'
import Badge from '@/components/ui/Badge/Badge'
import SourcePill from '@/components/ui/SourcePill/SourcePill'
import TagChip from '@/components/ui/TagChip/TagChip'
import type { Story } from '@/types/story'
import { CATEGORY_TO_BADGE } from '@/types/story'

interface StoryCardProps {
  story: Story
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const [expanded, setExpanded] = useState(false)
  const badgeCategory = CATEGORY_TO_BADGE[story.category] ?? 'world'
  const date = new Date(story.published_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })

  return (
    <li
      id={`story-card__container--${story.id}`}
      className="bg-surface rounded-lg shadow-card overflow-hidden list-none flex flex-col"
    >
      {story.image_url && (
        <img
          id={`story-card__image--${story.id}`}
          src={story.image_url}
          alt=""
          className="w-full h-40 object-cover"
          aria-hidden="true"
        />
      )}

      <div className="p-4 flex flex-col flex-1">
        <div id={`story-card__meta--${story.id}`} className="flex items-center gap-2 mb-2">
          <Badge category={badgeCategory} />
          <time
            id={`story-card__date--${story.id}`}
            dateTime={story.published_at}
            className="text-text-faint text-xs"
          >
            {date}
          </time>
        </div>

        <h2
          id={`story-card__title--${story.id}`}
          className="font-display font-semibold text-text text-sm md:text-base mb-2 leading-snug"
        >
          {story.title}
        </h2>

        <div id={`story-card__summary-wrapper--${story.id}`} className="mb-3">
          <p
            id={`story-card__summary--${story.id}`}
            className={`text-text-muted text-xs md:text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}
          >
            {story.summary}
          </p>
          <button
            id={`story-card__expand-btn--${story.id}`}
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-1 text-xs text-text-faint hover:text-text transition-colors cursor-pointer"
            aria-expanded={expanded}
            aria-controls={`story-card__summary--${story.id}`}
          >
            {expanded ? 'Réduire ↑' : 'Lire plus ↓'}
          </button>
        </div>

        {story.tags.length > 0 && (
          <div
            id={`story-card__tags--${story.id}`}
            className="flex flex-wrap gap-1 mb-3"
            role="list"
            aria-label="Tags"
          >
            {story.tags.slice(0, 3).map((tag) => (
              <div key={tag.slug} role="listitem">
                <TagChip label={tag.label} slug={tag.slug} />
              </div>
            ))}
          </div>
        )}

        {story.sources.length > 0 && (
          <div
            id={`story-card__sources--${story.id}`}
            className="flex flex-wrap gap-1.5 mt-auto"
            role="list"
            aria-label="Sources"
          >
            {story.sources.slice(0, 3).map((source) => (
              <div key={source.url} role="listitem">
                <SourcePill name={source.name} url={source.url} />
              </div>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

export default StoryCard
