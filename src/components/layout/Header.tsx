import { FC } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import { useDarkMode } from '@/hooks/useDarkMode'

const Header: FC = () => {
  const { isDark, toggle } = useDarkMode()

  return (
    <header
      id="header__container--main"
      className="sticky top-0 z-50 w-full bg-surface border-b border-border h-14 md:h-16 flex items-center px-4 md:px-6"
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <span
          id="header__logo--scope"
          className="font-display font-bold text-text text-base md:text-lg tracking-tight select-none"
        >
          Scope
        </span>

        <Button
          variant="icon"
          onClick={toggle}
          aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
          className="w-10 h-10 md:w-11 md:h-11"
        >
          {isDark ? (
            <SunIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <MoonIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header
