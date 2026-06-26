import { FC, useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { Cog6ToothIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button/Button'
import UserAvatar from '@/components/ui/UserAvatar/UserAvatar'
import { useAuth } from '@/hooks/useAuth'
import { t } from '@/lib/i18n'

interface Props {
  user: User
}

const UserMenu: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen, close])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') close()
    },
    [close],
  )

  const handlePreferences = useCallback(() => {
    close()
    navigate('/settings')
  }, [close, navigate])

  const handleSignOut = useCallback(async () => {
    close()
    await signOut()
    navigate('/auth')
  }, [close, signOut, navigate])

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <UserAvatar
        user={user}
        isOpen={isOpen}
        onClick={() => setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen)}
      />

      {isOpen && (
        <div
          id="user-menu__container--dropdown"
          role="menu"
          aria-label="Menu utilisateur"
          className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-md overflow-hidden z-50"
        >
          <Button
            id="user-menu__item--preferences"
            variant="menuItem"
            role="menuitem"
            className="cursor-pointer gap-2"
            onClick={handlePreferences}
          >
            <Cog6ToothIcon className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
            {t.nav.preferences}
          </Button>

          <div className="border-t border-divider" />

          <Button
            id="user-menu__item--signout"
            variant="menuItem"
            role="menuitem"
            onClick={handleSignOut}
            className="cursor-pointer gap-2 text-error hover:bg-error-subtle"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            {t.nav.signOut}
          </Button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
