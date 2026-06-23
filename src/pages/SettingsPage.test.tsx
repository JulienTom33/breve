import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from './SettingsPage'

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
})

describe('SettingsPage', () => {
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
    expect(screen.getByRole('button', { name: 'Science' })).toHaveAttribute('aria-pressed', 'true')
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

  it('has main container with correct id', () => {
    renderPage()
    expect(document.getElementById('settings-page__container--main')).toBeInTheDocument()
  })
})
