import { FC, useState, useEffect, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import BreveLogo from '@/components/ui/BreveLogo/BreveLogo'
import Navbar from '@/components/layout/Navbar/Navbar'
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
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const q = searchValue.trim()
    if (q.length < 2) return
    const timer = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchValue('')
    }, 300)
    return () => clearTimeout(timer)
  }, [searchValue, navigate])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchValue.trim()
    if (q.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchValue('')
    }
  }

  return (
    <header
      id="header__container--main"
      className="sticky top-0 z-50 w-full bg-surface border-b border-border h-14 flex items-center px-4 md:px-6"
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <div id="header__brand--wrapper" className="flex items-center gap-2 shrink-0">
          <Link
            to="/"
            id="header__link--home"
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Accueil"
          >
            <BreveLogo className="h-5 w-auto" />
            <span
              id="header__logo--breve"
              className="font-display font-bold text-primary text-sm md:text-base tracking-tight select-none"
            >
              {t.app.name}
            </span>
          </Link>

          <span className="hidden md:block text-border mx-1 select-none" aria-hidden="true">
            |
          </span>
          <Navbar />
        </div>

        <form
          id="header__search--wrapper"
          className="w-80 min-w-0"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <Input
            id="header__input--search"
            type="search"
            placeholder={t.nav.searchPlaceholder}
            aria-label="Rechercher des articles"
            compact
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            startAdornment={
              <MagnifyingGlassIcon className="w-4 h-4 text-text-faint" aria-hidden="true" />
            }
          />
        </form>

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
            className="cursor-pointer"
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
            id="header__button--search-mobile"
            variant="icon"
            className="cursor-pointer"
            onClick={() => navigate('/search')}
            aria-label="Rechercher"
          >
            <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
          </Button>

          <Button
            variant="icon"
            className="cursor-pointer"
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
