import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { t } from '@/lib/i18n'

const Navbar: FC = () => (
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
)

export default Navbar
