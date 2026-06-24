import { FC } from 'react'
import Badge from '@/components/ui/Badge/Badge'
import SourcePill from '@/components/ui/SourcePill/SourcePill'
import TagChip from '@/components/ui/TagChip/TagChip'
import type { Story } from '@/types/story'
import { CATEGORY_TO_BADGE } from '@/types/story'

interface StoryCardProps {
  story: Story
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const badgeCategory = CATEGORY_TO_BADGE[story.category] ?? 'world'
  const date = new Date(story.published_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  })

  return (
    <li
      id={`story-card__container--${story.id}`}
      className="bg-surface rounded-lg shadow-card overflow-hidden p-4 list-none"
    >
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
        className="font-display font-semibold text-text text-sm md:text-base mb-1.5 leading-snug"
      >
        {story.title}
      </h2>

      <p
        id={`story-card__summary--${story.id}`}
        className="text-text-muted text-xs md:text-sm leading-relaxed mb-3 line-clamp-2"
      >
        {story.summary}
      </p>

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
          className="flex flex-wrap gap-1.5"
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
    </li>
  )
}

export default StoryCard
