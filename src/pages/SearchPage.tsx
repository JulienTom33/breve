import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import Accordion from '@/components/ui/Accordion/Accordion'
import HighlightText from '@/features/search/HighlightText'
import StoryCard from '@/features/feed/StoryCard'
import StoryCardSkeleton from '@/features/feed/StoryCardSkeleton'
import { useSearch } from '@/features/search/useSearch'
import { t } from '@/lib/i18n'

const SearchPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '')
  const { stories, loading } = useSearch(inputValue)

  useEffect(() => {
    const trimmed = inputValue.trim()
    if (trimmed.length >= 2) {
      setSearchParams({ q: trimmed }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [inputValue, setSearchParams])

  const trimmed = inputValue.trim()
  const hasQuery = trimmed.length >= 2

  return (
    <div id="search-page__container--main" className="p-4 md:p-6 max-w-2xl mx-auto">
      <div id="search-page__search--wrapper" className="mb-6">
        <Input
          id="search-page__input--query"
          type="search"
          placeholder={t.search.inputPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label={t.search.inputAriaLabel}
          autoFocus
          startAdornment={
            <MagnifyingGlassIcon className="w-4 h-4 text-text-faint" aria-hidden="true" />
          }
          endAdornment={
            inputValue ? (
              <Button
                id="search-page__button--clear"
                variant="icon"
                onClick={() => setInputValue('')}
                aria-label={t.search.clearAriaLabel}
                className="cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </Button>
            ) : undefined
          }
        />
      </div>

      {loading && (
        <Accordion
          id="search-page__accordion--loading"
          items={Array.from({ length: 3 }, (_, i) => ({
            id: `loading-${i}`,
            trigger: <div className="h-4 bg-surface-2 rounded w-2/3 animate-pulse" />,
            content: <StoryCardSkeleton />,
          }))}
        />
      )}

      {!loading && hasQuery && stories.length === 0 && (
        <p id="search-page__empty--state" className="text-text-muted text-sm text-center py-12">
          {t.search.emptyState} «&nbsp;{trimmed}&nbsp;»
        </p>
      )}

      {!loading && stories.length > 0 && (
        <Accordion
          key={trimmed}
          id="search-page__accordion--results"
          items={stories.map((story) => ({
            id: story.id,
            trigger: trimmed ? (
              <HighlightText text={story.title} highlight={trimmed} />
            ) : (
              story.title
            ),
            content: <StoryCard story={story} highlight={trimmed} />,
            defaultOpen: true,
          }))}
        />
      )}

      {!loading && !hasQuery && (
        <p id="search-page__hint--text" className="text-text-muted text-sm text-center py-12">
          {t.search.hint}
        </p>
      )}
    </div>
  )
}

export default SearchPage
