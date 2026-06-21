import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useTime } from '@/hooks/useTime'
import { t } from '@/lib/i18n'

const Header: FC = () => {
  const { isDark, toggle } = useDarkMode()
  const time = useTime()
  const timeString = time.toLocaleTimeString('fr-FR')

  return (
    <header
      id="header__container--main"
      className="sticky top-0 z-50 w-full bg-surface border-b border-border h-14 flex items-center px-4 md:px-6"
    >
      <div className="flex items-center gap-3 w-full mx-auto">
        {/* Logo + brand + nav links */}
        <div id="header__brand--wrapper" className="flex items-center gap-2 shrink-0">
          <BreveLogo className="h-6 w-auto" />
          <span
            id="header__logo--breve"
            className="font-display font-bold text-primary text-base tracking-tight select-none"
          >
            {t.app.name}
          </span>
          <span className="hidden md:block text-border mx-1 select-none">|</span>
          <nav
            id="header__nav--links"
            className="hidden md:flex items-center gap-3"
            aria-label="Sections de l'application"
          >
            <NavLink
              to="/"
              end
              id="header__link--actualites"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-text' : 'text-text-muted hover:text-text'}`
              }
            >
              {t.nav.actualites}
            </NavLink>
            <NavLink
              to="/meteo"
              id="header__link--meteo"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-text' : 'text-text-muted hover:text-text'}`
              }
            >
              {t.nav.meteo}
            </NavLink>
          </nav>
        </div>

        {/* Search */}
        <div
          id="header__search--wrapper"
          className="flex-1 flex items-center gap-2 bg-surface-2 border border-border rounded-full px-4 h-9 max-w-md mx-auto"
        >
          <MagnifyingGlassIcon className="w-4 h-4 text-text-faint shrink-0" aria-hidden="true" />
          <input
            id="header__input--search"
            type="search"
            placeholder={t.nav.searchPlaceholder}
            className="flex-1 bg-transparent text-text placeholder:text-text-faint text-sm outline-none"
            aria-label="Rechercher des articles"
          />
        </div>

        {/* Right actions */}
        <div id="header__actions--right" className="flex items-center gap-2 shrink-0">
          <span
            id="header__time--display"
            className="hidden md:block text-text-muted text-sm font-mono tabular-nums"
            aria-label="Heure actuelle"
          >
            {timeString}
          </span>
          <Button
            variant="icon"
            onClick={toggle}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="hidden md:inline-flex"
          >
            {isDark ? (
              <SunIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>
          <Link
            to="/auth"
            id="header__button--connexion"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-full px-4 h-9 transition-colors duration-150"
          >
            {t.nav.connexion}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
