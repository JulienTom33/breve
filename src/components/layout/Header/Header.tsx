import { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import UserMenu from '@/components/layout/UserMenu/UserMenu'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useTime } from '@/hooks/useTime'
import { useAuth } from '@/hooks/useAuth'
import { t } from '@/lib/i18n'

const Header: FC = () => {
  const { isDark, toggle } = useDarkMode()
  const time = useTime()
  const timeString = time.toLocaleTimeString('fr-FR')
  const { user, loading } = useAuth()

  return (
    <header
      id="header__container--main"
      className="sticky top-0 z-50 w-full bg-surface border-b border-border h-14 flex items-center px-4 md:px-6"
    >
      <div className="flex items-center gap-3 w-full">
        {/* Brand: logo + nom + nav desktop */}
        <div id="header__brand--wrapper" className="flex items-center gap-2 shrink-0">
          <BreveLogo className="h-5 w-auto" />
          <span
            id="header__logo--breve"
            className="font-display font-bold text-primary text-sm md:text-base tracking-tight select-none"
          >
            {t.app.name}
          </span>

          {/* Nav desktop uniquement */}
          <span className="hidden md:block text-border mx-1 select-none" aria-hidden="true">
            |
          </span>
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

        {/* Search: visible partout, prend l'espace restant */}
        <div
          id="header__search--wrapper"
          className="flex-1 flex items-center gap-2 bg-surface-2 border border-border rounded-full px-3 h-9 min-w-0"
        >
          <MagnifyingGlassIcon className="w-4 h-4 text-text-faint shrink-0" aria-hidden="true" />
          <input
            id="header__input--search"
            type="search"
            placeholder={t.nav.searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent text-text placeholder:text-text-faint text-sm outline-none"
            aria-label="Rechercher des articles"
          />
        </div>

        {/* Actions desktop uniquement */}
        <div id="header__actions--desktop" className="hidden md:flex items-center gap-2 shrink-0">
          <span
            id="header__time--display"
            className="text-text-muted text-sm font-mono tabular-nums"
            aria-label="Heure actuelle"
          >
            {timeString}
          </span>
          <Button
            variant="icon"
            onClick={toggle}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {isDark ? (
              <SunIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>

          {!loading &&
            (user ? (
              <UserMenu user={user} />
            ) : (
              <Link
                to="/auth"
                id="header__button--connexion"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-full px-4 h-9 transition-colors duration-150 shrink-0"
              >
                {t.nav.connexion}
              </Link>
            ))}
        </div>

        <div id="header__actions--mobile" className="md:hidden flex items-center gap-2 shrink-0">
          <Button
            variant="icon"
            onClick={toggle}
            aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            {isDark ? (
              <SunIcon className="w-5 h-5" aria-hidden="true" />
            ) : (
              <MoonIcon className="w-5 h-5" aria-hidden="true" />
            )}
          </Button>

          {!loading &&
            (user ? (
              <UserMenu user={user} />
            ) : (
              <Link
                to="/auth"
                id="header__button--connexion-mobile"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-full px-3 h-8 transition-colors duration-150 shrink-0"
              >
                {t.nav.connexion}
              </Link>
            ))}
        </div>
      </div>
    </header>
  )
}

export default Header
