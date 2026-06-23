import { FC } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { t } from '@/lib/i18n'
import { SELECTABLE_CATEGORIES } from '@/lib/categories'

interface CategoryTab {
  id: string
  label: string
  cat: string | null
}

const CATEGORIES: CategoryTab[] = [
  { id: 'tout', label: t.nav.categories.tout, cat: null },
  ...SELECTABLE_CATEGORIES,
]

const CategoryTabs: FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const currentCat = searchParams.get('cat')
  const isFeedRoute = location.pathname === '/'

  return (
    <nav
      id="category-tabs__container--main"
      className="bg-surface border-b border-border w-full overflow-x-auto"
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
