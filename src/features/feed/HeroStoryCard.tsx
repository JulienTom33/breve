import { FC } from 'react'
import Badge from '@/components/ui/Badge/Badge'
import SourcePill from '@/components/ui/SourcePill/SourcePill'
import TagChip from '@/components/ui/TagChip/TagChip'
import type { Story } from '@/types/story'
import { CATEGORY_TO_BADGE } from '@/types/story'

interface HeroStoryCardProps {
  story: Story
}

const HeroStoryCard: FC<HeroStoryCardProps> = ({ story }) => {
  const badgeCategory = CATEGORY_TO_BADGE[story.category] ?? 'world'

  return (
    <article
      id={`hero-story-card__container--${story.id}`}
      className="bg-surface rounded-lg shadow-card overflow-hidden mb-6"
    >
      <div className="p-5 md:p-8">
        <div id={`hero-story-card__header--${story.id}`} className="mb-4">
          <Badge category={badgeCategory} />
        </div>

        <h1
          id={`hero-story-card__title--${story.id}`}
          className="text-xl md:text-2xl font-display font-bold text-text mb-3 leading-snug"
        >
          {story.title}
        </h1>

        <p
          id={`hero-story-card__summary--${story.id}`}
          className="text-text-muted text-sm md:text-base leading-relaxed mb-4"
        >
          {story.summary}
        </p>

        {story.tags.length > 0 && (
          <div
            id={`hero-story-card__tags--${story.id}`}
            className="flex flex-wrap gap-1.5 mb-4"
            role="list"
            aria-label="Tags"
          >
            {story.tags.map((tag) => (
              <div key={tag.slug} role="listitem">
                <TagChip label={tag.label} slug={tag.slug} />
              </div>
            ))}
          </div>
        )}

        {story.sources.length > 0 && (
          <div
            id={`hero-story-card__sources--${story.id}`}
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Sources"
          >
            {story.sources.map((source) => (
              <div key={source.url} role="listitem">
                <SourcePill name={source.name} url={source.url} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default HeroStoryCard
