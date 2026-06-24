import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import Header from './Header'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockSignOut = vi.fn()
const mockUseAuth = vi.fn()
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}))

const authDefaults = {
  loading: false,
  signIn: vi.fn(),
  signUp: vi.fn(),
  signInWithGoogle: vi.fn(),
  signOut: mockSignOut,
  resetPassword: vi.fn(),
}

const testUser = {
  id: 'user-1',
  email: 'alice@example.com',
  user_metadata: { full_name: 'Alice Bernard' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: '',
} as User

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  mockNavigate.mockReset()
  mockSignOut.mockReset()
  mockUseAuth.mockReturnValue({ ...authDefaults, user: null })
})

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )

describe('Header', () => {
  it('renders logo Brèves', () => {
    renderWithRouter()
    expect(screen.getByText('Brèves')).toBeInTheDocument()
  })

  it('renders search input', () => {
    renderWithRouter()
    expect(screen.getByRole('searchbox', { name: 'Rechercher des articles' })).toBeInTheDocument()
  })

  it('renders sections nav', () => {
    renderWithRouter()
    expect(
      screen.getByRole('navigation', { name: "Sections de l'application" }),
    ).toBeInTheDocument()
  })

  it('renders Actualités nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Actualités' })).toBeInTheDocument()
  })

  it('renders Météo nav link', () => {
    renderWithRouter()
    expect(screen.getByRole('link', { name: 'Météo' })).toBeInTheDocument()
  })

  it('renders time display', () => {
    renderWithRouter()
    expect(screen.getByLabelText('Heure actuelle')).toBeInTheDocument()
  })

  it('renders dark mode toggle buttons', () => {
    renderWithRouter()
    const btns = screen.getAllByRole('button', { name: /mode clair|mode sombre/ })
    expect(btns.length).toBeGreaterThanOrEqual(1)
  })

  it('toggles theme on click', async () => {
    const user = userEvent.setup()
    renderWithRouter()
    const btn = screen.getAllByRole('button', { name: /mode clair|mode sombre/ })[0]
    const initialLabel = btn.getAttribute('aria-label')
    await user.click(btn)
    expect(btn.getAttribute('aria-label')).not.toBe(initialLabel)
  })

  it('has sticky positioning', () => {
    renderWithRouter()
    const header = screen.getByRole('banner')
    expect(header.className).toContain('sticky')
  })

  it('renders search placeholder', () => {
    renderWithRouter()
    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('placeholder', 'Rechercher...')
  })

  describe('non connecté', () => {
    it('renders Connexion links when not authenticated', () => {
      renderWithRouter()
      const links = screen.getAllByRole('link', { name: 'Connexion' })
      expect(links.length).toBeGreaterThanOrEqual(1)
      links.forEach((link) => expect(link).toHaveAttribute('href', '/auth'))
    })

    it('does not render avatar trigger when not authenticated', () => {
      renderWithRouter()
      expect(screen.queryByRole('button', { name: 'Menu utilisateur' })).not.toBeInTheDocument()
    })
  })

  describe('connecté', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({ ...authDefaults, user: testUser })
    })

    it('renders avatar trigger when authenticated', () => {
      renderWithRouter()
      expect(screen.getAllByRole('button', { name: 'Menu utilisateur' }).length).toBeGreaterThan(0)
    })

    it('does not render Connexion link when authenticated', () => {
      renderWithRouter()
      expect(screen.queryByRole('link', { name: 'Connexion' })).not.toBeInTheDocument()
    })

    it('shows initials when no avatar_url', () => {
      renderWithRouter()
      expect(screen.getAllByText('AB').length).toBeGreaterThan(0)
    })

    it('opens dropdown on avatar click', async () => {
      const user = userEvent.setup()
      renderWithRouter()
      await user.click(screen.getAllByRole('button', { name: 'Menu utilisateur' })[0])
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('calls signOut and navigates to /auth on sign out', async () => {
      const user = userEvent.setup()
      mockSignOut.mockResolvedValue(undefined)
      renderWithRouter()
      await user.click(screen.getAllByRole('button', { name: 'Menu utilisateur' })[0])
      await user.click(screen.getByRole('menuitem', { name: /se déconnecter/i }))
      expect(mockSignOut).toHaveBeenCalledOnce()
      await vi.waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/auth'))
    })
  })

  describe('loading', () => {
    it('hides auth section while loading', () => {
      mockUseAuth.mockReturnValue({ ...authDefaults, loading: true, user: null })
      renderWithRouter()
      expect(screen.queryByRole('link', { name: 'Connexion' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Menu utilisateur' })).not.toBeInTheDocument()
    })
  })
})
