import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import OnboardingCategoriesPage from './OnboardingCategoriesPage'

const mockSavePreferredCategories = vi.fn()
vi.mock('@/hooks/useUserProfile', () => ({
  useUserProfile: () => ({
    preferredCategories: [],
    loading: false,
    savePreferredCategories: mockSavePreferredCategories,
  }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderPage = () =>
  render(
    <MemoryRouter>
      <OnboardingCategoriesPage />
    </MemoryRouter>,
  )

beforeEach(() => {
  vi.clearAllMocks()
})

describe('OnboardingCategoriesPage', () => {
  it('renders all 8 selectable categories', () => {
    renderPage()
    expect(screen.getByText('Monde')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Politique')).toBeInTheDocument()
    expect(screen.getByText('Économie')).toBeInTheDocument()
    expect(screen.getByText('Technologie')).toBeInTheDocument()
    expect(screen.getByText('Sport')).toBeInTheDocument()
    expect(screen.getByText('Santé')).toBeInTheDocument()
    expect(screen.getByText('Faits divers')).toBeInTheDocument()
  })

  it('renders step indicator and title', () => {
    renderPage()
    expect(screen.getByText('Étape 2 sur 2')).toBeInTheDocument()
    expect(screen.getByText("Vos centres d'intérêt")).toBeInTheDocument()
  })

  it('renders submit and skip buttons', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /Commencer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Passer cette étape/i })).toBeInTheDocument()
  })

  it('toggles category selection on click', async () => {
    const user = userEvent.setup()
    renderPage()
    const chip = screen.getByRole('button', { name: 'Monde' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    await user.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    await user.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'false')
  })

  it('saves selected categories and navigates on submit', async () => {
    mockSavePreferredCategories.mockResolvedValue(null)
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: 'Monde' }))
    await user.click(screen.getByRole('button', { name: 'Sport' }))
    await user.click(screen.getByRole('button', { name: /Commencer/i }))
    await waitFor(() =>
      expect(mockSavePreferredCategories).toHaveBeenCalledWith(['monde', 'sport']),
    )
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'))
  })

  it('navigates without saving on skip', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /Passer cette étape/i }))
    expect(mockNavigate).toHaveBeenCalledWith('/')
    expect(mockSavePreferredCategories).not.toHaveBeenCalled()
  })

  it('shows error when save fails', async () => {
    mockSavePreferredCategories.mockResolvedValue(new Error('DB error'))
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /Commencer/i }))
    await waitFor(() =>
      expect(screen.getByText('Impossible de sauvegarder vos préférences.')).toBeInTheDocument(),
    )
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('has main container with correct id', () => {
    renderPage()
    expect(document.getElementById('onboarding-categories__container--main')).toBeInTheDocument()
  })
})
