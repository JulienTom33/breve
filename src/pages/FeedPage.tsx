import { FC, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { t } from '@/lib/i18n'
import { useAuth } from '@/hooks/useAuth'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useFeed } from '@/features/feed/useFeed'
import StoryCard from '@/features/feed/StoryCard'
import StoryCardSkeleton from '@/features/feed/StoryCardSkeleton'
import Button from '@/components/ui/Button/Button'

const FeedPage: FC = () => {
  const [searchParams] = useSearchParams()
  const cat = searchParams.get('cat')

  const { user } = useAuth()
  const { preferredCategories, loading: prefLoading } = useUserProfile()
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setShowAll(false)
  }, [cat])

  const isPersonalized =
    !!user && !prefLoading && preferredCategories.length > 0 && !cat && !showAll

  const filterCategories: string[] | null = cat
    ? [cat]
    : isPersonalized
      ? preferredCategories
      : null

  const { stories, loading, loadingMore, hasMore, sentinelRef } = useFeed(filterCategories)

  return (
    <div id="feed-page__container--main" className="px-4 md:px-8 py-4 md:py-6 max-w-6xl mx-auto">
      {isPersonalized && (
        <div
          id="feed-page__banner--personalized"
          className="flex items-center gap-2 mb-3 text-xs text-text-faint"
        >
          <span id="feed-page__banner-text--personalized">
            {t.feed.personalizedBanner} ·{' '}
            <Link
              id="feed-page__link--settings"
              to="/settings"
              className="text-primary hover:opacity-80"
            >
              {t.feed.settingsLink}
            </Link>
          </span>
          <span aria-hidden="true">·</span>
          <Button
            id="feed-page__button--show-all"
            variant="custom"
            type="button"
            onClick={() => setShowAll(true)}
            className="text-xs text-primary hover:opacity-80 cursor-pointer p-0"
          >
            {t.feed.showAll}
          </Button>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <StoryCardSkeleton key={i} variant="card" />
          ))}
        </div>
      )}

      {!loading && stories.length === 0 && (
        <div id="feed-page__empty--state" className="text-center py-16">
          <p id="feed-page__empty--text" className="text-text-muted">
            {cat ? t.feed.emptyCategory : t.feed.emptyGeneric}
          </p>
        </div>
      )}

      {!loading && stories.length > 0 && (
        <>
          <ul
            id="feed-page__list--stories"
            className="p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </ul>
          <div ref={sentinelRef} id="feed-page__sentinel--scroll" aria-hidden="true" />
          {loadingMore && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {[0, 1, 2].map((i) => (
                <StoryCardSkeleton key={i} variant="card" />
              ))}
            </div>
          )}
          {!loadingMore && !hasMore && (
            <p id="feed-page__end--message" className="text-center text-text-faint text-xs py-6">
              {t.feed.endOfFeed}
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default FeedPage
