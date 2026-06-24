import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import SettingsPage from './SettingsPage'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const mockSavePreferredCategories = vi.fn()
let mockPreferredCategories: string[] = []
let mockLoading = false

vi.mock('@/hooks/useUserProfile', () => ({
  useUserProfile: () => ({
    preferredCategories: mockPreferredCategories,
    loading: mockLoading,
    savePreferredCategories: mockSavePreferredCategories,
  }),
}))

const mockUpdateUserMetadata = vi.fn()
let mockUser: User | null = null

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: mockUser,
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signInWithGoogle: vi.fn(),
    signOut: vi.fn(),
    resetPassword: vi.fn(),
    updateUserMetadata: mockUpdateUserMetadata,
  }),
}))

vi.mock('@/assets/default-avatar.png', () => ({ default: 'default-avatar.png' }))
vi.mock('@/assets/avatars/avatar-1.png', () => ({ default: 'avatar-1.png' }))
vi.mock('@/assets/avatars/avatar-2.png', () => ({ default: 'avatar-2.png' }))
vi.mock('@/assets/avatars/avatar-3.png', () => ({ default: 'avatar-3.png' }))
vi.mock('@/assets/avatars/avatar-4.png', () => ({ default: 'avatar-4.png' }))
vi.mock('@/assets/avatars/avatar-5.png', () => ({ default: 'avatar-5.png' }))

const baseUser = {
  id: 'user-1',
  email: 'alice@example.com',
  user_metadata: { first_name: 'Alice', last_name: 'Bernard', full_name: 'Alice Bernard' },
  app_metadata: {},
  aud: 'authenticated',
  created_at: '',
} as User

const renderPage = () =>
  render(
    <MemoryRouter>
      <SettingsPage />
    </MemoryRouter>,
  )

beforeEach(() => {
  vi.clearAllMocks()
  mockPreferredCategories = []
  mockLoading = false
  mockUser = baseUser
})

describe('SettingsPage', () => {
  describe('section catégories', () => {
    it('renders section title and subtitle', () => {
      renderPage()
      expect(screen.getByText('Mes catégories')).toBeInTheDocument()
      expect(screen.getByText(/Catégories affichées par défaut/i)).toBeInTheDocument()
    })

    it('renders all selectable categories', () => {
      renderPage()
      expect(screen.getByText('Monde')).toBeInTheDocument()
      expect(screen.getByText('France')).toBeInTheDocument()
      expect(screen.getByText('Économie')).toBeInTheDocument()
      expect(screen.getByText('Science')).toBeInTheDocument()
      expect(screen.getByText('Technologie')).toBeInTheDocument()
      expect(screen.getByText('Environnement')).toBeInTheDocument()
    })

    it('shows loading state', () => {
      mockLoading = true
      renderPage()
      expect(screen.getByText('Chargement…')).toBeInTheDocument()
      expect(screen.queryByText('Monde')).not.toBeInTheDocument()
    })

    it('pre-selects preferred categories from profile', () => {
      mockPreferredCategories = ['france', 'science']
      renderPage()
      expect(screen.getByRole('button', { name: 'France' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('button', { name: 'Science' })).toHaveAttribute(
        'aria-pressed',
        'true',
      )
      expect(screen.getByRole('button', { name: 'Monde' })).toHaveAttribute('aria-pressed', 'false')
    })

    it('toggles category selection', async () => {
      const user = userEvent.setup()
      renderPage()
      const chip = screen.getByRole('button', { name: 'Monde' })
      expect(chip).toHaveAttribute('aria-pressed', 'false')
      await user.click(chip)
      expect(chip).toHaveAttribute('aria-pressed', 'true')
    })

    it('categories stay active after save', async () => {
      mockSavePreferredCategories.mockResolvedValue(null)
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Monde' }))
      await user.click(screen.getByRole('button', { name: 'Sauvegarder' }))
      await waitFor(() => expect(screen.getByText('Préférences sauvegardées.')).toBeInTheDocument())
      expect(screen.getByRole('button', { name: 'Monde' })).toHaveAttribute('aria-pressed', 'true')
    })

    it('saves and shows success message', async () => {
      mockSavePreferredCategories.mockResolvedValue(null)
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Monde' }))
      await user.click(screen.getByRole('button', { name: 'Sauvegarder' }))
      await waitFor(() => expect(screen.getByText('Préférences sauvegardées.')).toBeInTheDocument())
      expect(mockSavePreferredCategories).toHaveBeenCalledWith(['monde'])
    })

    it('shows error when save fails', async () => {
      mockSavePreferredCategories.mockResolvedValue(new Error('DB error'))
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Sauvegarder' }))
      await waitFor(() =>
        expect(screen.getByText('Impossible de sauvegarder vos préférences.')).toBeInTheDocument(),
      )
    })
  })

  describe('section profil', () => {
    it('renders profile section title and subtitle', () => {
      renderPage()
      expect(screen.getByText('Mon profil')).toBeInTheDocument()
      expect(screen.getByText(/Modifiez vos informations personnelles/i)).toBeInTheDocument()
    })

    it('renders cat avatar image', () => {
      renderPage()
      expect(screen.getByAltText('Photo de profil')).toHaveAttribute('src', 'default-avatar.png')
    })

    it('pre-fills first name and last name from user', () => {
      renderPage()
      expect(screen.getByLabelText('Prénom')).toHaveValue('Alice')
      expect(screen.getByLabelText('Nom')).toHaveValue('Bernard')
    })

    it('allows editing first name', async () => {
      const user = userEvent.setup()
      renderPage()
      const input = screen.getByLabelText('Prénom')
      await user.clear(input)
      await user.type(input, 'Bob')
      expect(input).toHaveValue('Bob')
    })

    it('saves profile metadata and shows success message', async () => {
      mockUpdateUserMetadata.mockResolvedValue(null)
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Sauvegarder le profil' }))
      await waitFor(() => expect(screen.getByText('Profil mis à jour.')).toBeInTheDocument())
      expect(mockUpdateUserMetadata).toHaveBeenCalledWith({
        first_name: 'Alice',
        last_name: 'Bernard',
        full_name: 'Alice Bernard',
      })
    })

    it('shows error when profile save fails', async () => {
      mockUpdateUserMetadata.mockResolvedValue(new Error('update failed'))
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Sauvegarder le profil' }))
      await waitFor(() =>
        expect(screen.getByText('Impossible de mettre à jour le profil.')).toBeInTheDocument(),
      )
    })

    it('renders 6 preset avatar options', () => {
      renderPage()
      const grid = screen.getByRole('group', { name: 'Choisir un avatar' })
      expect(grid.querySelectorAll('button').length).toBe(6)
    })

    it('selects a preset avatar on click', async () => {
      const user = userEvent.setup()
      renderPage()
      const btn = screen.getByRole('button', { name: 'Avatar 2' })
      await user.click(btn)
      expect(btn).toHaveAttribute('aria-pressed', 'true')
    })

    it('deselects other presets when one is selected', async () => {
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Avatar 2' }))
      await user.click(screen.getByRole('button', { name: 'Avatar 3' }))
      expect(screen.getByRole('button', { name: 'Avatar 2' })).toHaveAttribute(
        'aria-pressed',
        'false',
      )
      expect(screen.getByRole('button', { name: 'Avatar 3' })).toHaveAttribute(
        'aria-pressed',
        'true',
      )
    })

    it('includes avatar_url when a preset is selected and saved', async () => {
      mockUpdateUserMetadata.mockResolvedValue(null)
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Avatar 4' }))
      await user.click(screen.getByRole('button', { name: 'Sauvegarder le profil' }))
      await waitFor(() =>
        expect(mockUpdateUserMetadata).toHaveBeenCalledWith(
          expect.objectContaining({ avatar_url: 'avatar-3.png' }),
        ),
      )
    })

    it('updates main avatar preview when a preset is selected', async () => {
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Avatar 6' }))
      expect(screen.getByAltText('Photo de profil')).toHaveAttribute('src', 'avatar-5.png')
    })

    it('renders upload photo option', () => {
      renderPage()
      expect(screen.getByText('Importer une photo')).toBeInTheDocument()
    })
  })

  describe('navigation', () => {
    it('renders close button', () => {
      renderPage()
      expect(screen.getByRole('button', { name: 'Fermer les paramètres' })).toBeInTheDocument()
    })

    it('navigates to / on close button click', async () => {
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: 'Fermer les paramètres' }))
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('has main container with correct id', () => {
    renderPage()
    expect(document.getElementById('settings-page__container--main')).toBeInTheDocument()
  })
})
