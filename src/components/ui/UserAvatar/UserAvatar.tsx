import { FC } from 'react'
import type { User } from '@supabase/supabase-js'
import Button from '@/components/ui/Button/Button'

interface Props {
  user: User
  size?: 'sm' | 'md'
  onClick?: () => void
  isOpen?: boolean
}

function getInitials(user: User): string {
  const fullName = user.user_metadata?.full_name as string | undefined
  if (fullName) {
    const parts = fullName.trim().split(' ')
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    return parts[0][0].toUpperCase()
  }
  return (user.email?.[0] ?? '?').toUpperCase()
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
}

const UserAvatar: FC<Props> = ({ user, size = 'md', onClick, isOpen = false }) => {
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const sizeClass = sizeClasses[size]

  return (
    <Button
      id="user-avatar__button--trigger"
      variant="avatar"
      onClick={onClick}
      aria-label="Menu utilisateur"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      className={`${sizeClass} ${isOpen ? 'border-primary' : 'border-border hover:border-primary'}`}
    >
      {avatarUrl ? (
        <img
          id="user-avatar__img--photo"
          src={avatarUrl}
          alt="Avatar utilisateur"
          className="w-full h-full object-cover"
        />
      ) : (
        <span
          id="user-avatar__span--initials"
          className="flex items-center justify-center w-full h-full bg-primary-subtle text-primary font-semibold"
          aria-hidden="true"
        >
          {getInitials(user)}
        </span>
      )}
    </Button>
  )
}

export default UserAvatar
