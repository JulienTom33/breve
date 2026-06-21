import { FC } from 'react'
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom'
import {
  Squares2X2Icon,
  ComputerDesktopIcon,
  TrophyIcon,
  BuildingLibraryIcon,
  NewspaperIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

interface Category {
  cat: string | null
  label: string
  id: string
  icon: FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
}

interface UtilityLink {
  to: string
  label: string
  id: string
  icon: FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
}

const CATEGORIES: Category[] = [
  { cat: null, label: 'Toutes', id: 'toutes', icon: Squares2X2Icon },
  { cat: 'tech', label: 'Tech', id: 'tech', icon: ComputerDesktopIcon },
  { cat: 'sport', label: 'Sport', id: 'sport', icon: TrophyIcon },
  { cat: 'politique', label: 'Politique', id: 'politique', icon: BuildingLibraryIcon },
  { cat: 'faits-divers', label: 'Faits divers', id: 'faits-divers', icon: NewspaperIcon },
]

const UTILITY_LINKS: UtilityLink[] = [
  { to: '/search', label: 'Recherche', id: 'search', icon: MagnifyingGlassIcon },
  { to: '/settings', label: 'Paramètres', id: 'settings', icon: Cog6ToothIcon },
]

const Sidebar: FC = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const currentCat = searchParams.get('cat')
  const isFeedRoute = location.pathname === '/'

  return (
    <aside
      id="sidebar__container--main"
      className="hidden md:flex flex-col w-56 shrink-0 bg-surface border-r border-border pt-4 px-2"
      aria-label="Navigation principale"
    >
      <nav id="sidebar__nav--categories" aria-label="Catégories">
        <p
          id="sidebar__label--categories"
          className="px-3 mb-2 text-xs font-semibold text-text-faint uppercase tracking-wider"
        >
          Catégories
        </p>
        <ul id="sidebar__list--categories" className="flex flex-col gap-1" role="list">
          {CATEGORIES.map(({ cat, label, id, icon: Icon }) => {
            const isActive = isFeedRoute && (cat === null ? !currentCat : currentCat === cat)
            const to = cat ? `/?cat=${cat}` : '/'
            return (
              <li key={id} role="listitem">
                <Link
                  to={to}
                  id={`sidebar__link--${id}`}
                  className={[
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary-subtle text-primary'
                      : 'text-text-muted hover:bg-surface-2 hover:text-text',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <hr id="sidebar__divider--main" className="my-3 border-divider" />

      <nav id="sidebar__nav--utility" aria-label="Navigation utilitaire">
        <ul id="sidebar__list--utility" className="flex flex-col gap-1" role="list">
          {UTILITY_LINKS.map(({ to, label, id, icon: Icon }) => (
            <li key={id} role="listitem">
              <NavLink
                to={to}
                id={`sidebar__link--${id}`}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary-subtle text-primary'
                      : 'text-text-muted hover:bg-surface-2 hover:text-text',
                  ].join(' ')
                }
              >
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
