import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { User } from '@supabase/supabase-js'
import UserAvatar from './UserAvatar'

const baseUser = {
  id: 'user-1',
  email: 'alice@example.com',
  user_metadata: {},
  app_metadata: {},
  aud: 'authenticated',
  created_at: '',
} as User

describe('UserAvatar', () => {
  it('renders initials when no avatar_url', () => {
    const user = { ...baseUser, user_metadata: { full_name: 'Alice Bernard' } } as User
    render(<UserAvatar user={user} />)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders single initial when single name', () => {
    const user = { ...baseUser, user_metadata: { full_name: 'Alice' } } as User
    render(<UserAvatar user={user} />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('falls back to email initial when no full_name', () => {
    render(<UserAvatar user={baseUser} />)
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders img when avatar_url is present', () => {
    const user = {
      ...baseUser,
      user_metadata: { avatar_url: 'https://example.com/photo.jpg', full_name: 'Alice Bernard' },
    } as User
    render(<UserAvatar user={user} />)
    expect(screen.getByRole('img', { name: 'Avatar utilisateur' })).toBeInTheDocument()
    expect(screen.queryByText('AB')).not.toBeInTheDocument()
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
