import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFeed } from '@/features/feed/useFeed'
import StoryCard from '@/features/feed/StoryCard'
import StoryCardSkeleton from '@/features/feed/StoryCardSkeleton'

const FeedPage: FC = () => {
  const [searchParams] = useSearchParams()
  const cat = searchParams.get('cat')
  const { stories, loading, loadingMore, sentinelRef } = useFeed(cat)

  return (
    <div id="feed-page__container--main" className="px-4 md:px-8 py-4 md:py-6 max-w-6xl mx-auto">
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
            {cat
              ? `Aucune story disponible dans cette catégorie.`
              : 'Aucune story disponible pour le moment.'}
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
        </>
      )}
    </div>
  )
}

export default FeedPage
