import { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Input from '@/components/ui/Input/Input'
import StoryCard from '@/features/feed/StoryCard'
import StoryCardSkeleton from '@/features/feed/StoryCardSkeleton'
import { useSearch } from '@/features/search/useSearch'

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
          placeholder="Rechercher des brèves..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Rechercher des brèves"
          autoFocus
          startAdornment={
            <MagnifyingGlassIcon className="w-4 h-4 text-text-faint" aria-hidden="true" />
          }
          endAdornment={
            inputValue ? (
              <button
                id="search-page__button--clear"
                type="button"
                onClick={() => setInputValue('')}
                aria-label="Effacer la recherche"
                className="text-text-faint hover:text-text transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            ) : undefined
          }
        />
      </div>

      {loading && (
        <ul id="search-page__list--loading" className="space-y-3 list-none p-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i}>
              <StoryCardSkeleton />
            </li>
          ))}
        </ul>
      )}

      {!loading && hasQuery && stories.length === 0 && (
        <p id="search-page__empty--state" className="text-text-muted text-sm text-center py-12">
          Aucun résultat pour «&nbsp;{trimmed}&nbsp;»
        </p>
      )}

      {!loading && stories.length > 0 && (
        <ul id="search-page__list--results" className="space-y-3 list-none p-0">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} highlight={trimmed} />
          ))}
        </ul>
      )}

      {!loading && !hasQuery && (
        <p id="search-page__hint--text" className="text-text-muted text-sm text-center py-12">
          Saisissez au moins 2 caractères pour rechercher.
        </p>
      )}
    </div>
  )
}

export default SearchPage
