import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, MagnifyingGlassIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

interface NavItem {
  to: string
  icon: FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
  label: string
  id: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: HomeIcon, label: 'Accueil', id: 'home' },
  { to: '/search', icon: MagnifyingGlassIcon, label: 'Recherche', id: 'search' },
  { to: '/settings', icon: Cog6ToothIcon, label: 'Paramètres', id: 'settings' },
]

const Sidebar: FC = () => (
  <aside
    id="sidebar__container--main"
    className="hidden md:flex flex-col w-56 shrink-0 bg-surface border-r border-border pt-4 px-2"
    aria-label="Navigation principale"
  >
    <nav id="sidebar__nav--main">
      <ul id="sidebar__list--items" className="flex flex-col gap-1" role="list">
        {NAV_ITEMS.map(({ to, icon: Icon, label, id }) => (
          <li key={to} role="listitem">
            <NavLink
              to={to}
              end={to === '/'}
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

export default Sidebar
