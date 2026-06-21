import { FC } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { t } from '@/lib/i18n'

interface Category {
  id: string
  label: string
  cat: string | null
}

const CATEGORIES: Category[] = [
  { id: 'tout', label: t.nav.categories.tout, cat: null },
  { id: 'monde', label: t.nav.categories.monde, cat: 'monde' },
  { id: 'france', label: t.nav.categories.france, cat: 'france' },
  { id: 'economie', label: t.nav.categories.economie, cat: 'economie' },
  { id: 'science', label: t.nav.categories.science, cat: 'science' },
  { id: 'technologie', label: t.nav.categories.technologie, cat: 'technologie' },
  { id: 'environnement', label: t.nav.categories.environnement, cat: 'environnement' },
]

const CategoryTabs: FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const currentCat = searchParams.get('cat')
  const isFeedRoute = location.pathname === '/'

  return (
    <nav
      id="category-tabs__container--main"
      className="bg-surface border-b border-border overflow-x-auto"
      aria-label="Catégories d'actualités"
    >
      <ul
        id="category-tabs__list--main"
        className="flex items-center gap-1 px-4 md:px-6 min-w-max"
        role="list"
      >
        {CATEGORIES.map(({ id, label, cat }) => {
          const isActive = isFeedRoute && (cat === null ? !currentCat : currentCat === cat)
          const to = cat ? `/?cat=${cat}` : '/'

          return (
            <li key={id} role="listitem">
              <Link
                to={to}
                id={`category-tabs__tab--${id}`}
                className={[
                  'inline-flex items-center h-10 px-4 text-sm font-medium transition-colors duration-150 border-b-2 whitespace-nowrap',
                  isActive
                    ? 'text-primary border-primary'
                    : 'text-text-muted border-transparent hover:text-text hover:border-border',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoryTabs
