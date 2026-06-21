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

const BottomNav: FC = () => (
  <nav
    id="bottom-nav__container--main"
    className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border md:hidden"
    aria-label="Navigation principale"
  >
    <ul
      id="bottom-nav__list--items"
      className="flex items-stretch h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]"
      role="list"
    >
      {NAV_ITEMS.map(({ to, icon: Icon, label, id }) => (
        <li key={to} className="flex-1" role="listitem">
          <NavLink
            to={to}
            end={to === '/'}
            id={`bottom-nav__link--${id}`}
            className={({ isActive }) =>
              [
                'flex flex-col items-center justify-center gap-0.5 w-full h-full min-h-[44px] text-xs transition-colors duration-150',
                isActive ? 'text-primary' : 'text-text-muted hover:text-text',
              ].join(' ')
            }
            aria-label={label}
          >
            <Icon className="w-6 h-6" aria-hidden="true" />
            <span className="text-[10px] leading-none">{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
)

export default BottomNav
