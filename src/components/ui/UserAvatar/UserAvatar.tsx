import { FC } from 'react'
import type { User } from '@supabase/supabase-js'
import Button from '@/components/ui/Button/Button'
import defaultAvatar from '@/assets/default-avatar.png'

interface Props {
  user: User
  size?: 'sm' | 'md'
  onClick?: () => void
  isOpen?: boolean
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
        <img
          id="user-avatar__img--default"
          src={defaultAvatar}
          alt="Avatar utilisateur"
          className="w-full h-full object-cover"
        />
      )}
    </Button>
  )
}

export default UserAvatar
