import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { User } from '@supabase/supabase-js'
import UserAvatar from './UserAvatar'

vi.mock('@/assets/default-avatar.png', () => ({ default: 'default-avatar.png' }))

const baseUser = {
  id: 'user-1',
  email: 'alice@example.com',
  user_metadata: {},
  app_metadata: {},
  aud: 'authenticated',
  created_at: '',
} as User

describe('UserAvatar', () => {
  it('renders default cat avatar when no avatar_url', () => {
    render(<UserAvatar user={baseUser} />)
    const img = screen.getByRole('img', { name: 'Avatar utilisateur' })
    expect(img).toHaveAttribute('src', 'default-avatar.png')
  })

  it('renders user photo when avatar_url is present', () => {
    const user = {
      ...baseUser,
      user_metadata: { avatar_url: 'https://example.com/photo.jpg' },
    } as User
    render(<UserAvatar user={user} />)
    const img = screen.getByRole('img', { name: 'Avatar utilisateur' })
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('has aria-label "Menu utilisateur"', () => {
    render(<UserAvatar user={baseUser} />)
    expect(screen.getByRole('button', { name: 'Menu utilisateur' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<UserAvatar user={baseUser} onClick={handleClick} />)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('sets aria-expanded when isOpen', () => {
    render(<UserAvatar user={baseUser} isOpen />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true')
  })
})
