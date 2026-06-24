import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import UserMenu from './UserMenu'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockSignOut = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signOut: mockSignOut,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    resetPassword: vi.fn(),
  }),
}))

const testUser = {
  id: 'user-1',
  email: 'alice@example.com',
  user_metadata: { full_name: 'Alice Bernard' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: '',
} as User

const renderMenu = () =>
  render(
    <MemoryRouter>
      <UserMenu user={testUser} />
    </MemoryRouter>,
  )

describe('UserMenu', () => {
  beforeEach(() => {
    mockNavigate.mockReset()
    mockSignOut.mockReset()
  })

  it('renders avatar trigger button', () => {
    renderMenu()
    expect(screen.getByRole('button', { name: 'Menu utilisateur' })).toBeInTheDocument()
  })

  it('dropdown is hidden by default', () => {
    renderMenu()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens dropdown on avatar click', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Menu utilisateur' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /préférences/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /se déconnecter/i })).toBeInTheDocument()
  })

  it('closes dropdown on second click', async () => {
    const user = userEvent.setup()
    renderMenu()
    const trigger = screen.getByRole('button', { name: 'Menu utilisateur' })
    await user.click(trigger)
    await user.click(trigger)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('navigates to /settings on Préférences click', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Menu utilisateur' }))
    await user.click(screen.getByRole('menuitem', { name: /préférences/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/settings')
  })

  it('calls signOut and navigates to /auth on Se déconnecter click', async () => {
    const user = userEvent.setup()
    mockSignOut.mockResolvedValue(undefined)
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Menu utilisateur' }))
    await user.click(screen.getByRole('menuitem', { name: /se déconnecter/i }))
    expect(mockSignOut).toHaveBeenCalledOnce()
    await vi.waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/auth'))
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Menu utilisateur' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes on click outside', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <div>
          <UserMenu user={testUser} />
          <button id="outside">Outside</button>
        </div>
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button', { name: 'Menu utilisateur' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
