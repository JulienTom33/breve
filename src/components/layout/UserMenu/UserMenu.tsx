import { FC, useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { Cog6ToothIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
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
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') close()
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
      <UserAvatar user={user} isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />

      {isOpen && (
        <div
          id="user-menu__container--dropdown"
          role="menu"
          aria-label="Menu utilisateur"
          className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-md overflow-hidden z-50"
        >
          <button
            id="user-menu__item--preferences"
            role="menuitem"
            type="button"
            onClick={handlePreferences}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-text hover:bg-surface-2 transition-colors duration-150 focus:outline-none focus:bg-surface-2"
          >
            <Cog6ToothIcon className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
            {t.nav.preferences}
          </button>

          <div className="border-t border-divider" />

          <button
            id="user-menu__item--signout"
            role="menuitem"
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-error hover:bg-error-subtle transition-colors duration-150 focus:outline-none focus:bg-error-subtle"
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            {t.nav.signOut}
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
